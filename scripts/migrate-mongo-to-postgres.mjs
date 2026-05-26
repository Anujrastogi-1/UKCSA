// One-off data migration: MongoDB → PostgreSQL (via Prisma).
//
// Copies the `members`, `admins`, and `chapterupdates` collections from your
// old MongoDB into the new Postgres tables. Run AFTER the Postgres schema
// exists (`npx prisma migrate deploy` or `npx prisma db push`).
//
// Usage:
//   1. In .env set BOTH:
//        MONGODB_URI   = mongodb+srv://...        (source, old Mongo)
//        DATABASE_URL  = postgresql://...         (target, used by Prisma)
//      (optional) MONGO_DB = <dbName>  — only if the db isn't in the URI path.
//   2. node --env-file=.env scripts/migrate-mongo-to-postgres.mjs
//        add  --force  to import members/updates even if those tables already
//        have rows (otherwise the script skips them to avoid duplicates).
//
// Notes:
//   - Admins are upserted by username, so this part is safe to re-run.
//   - Original Mongo _id values are NOT preserved — new UUIDs are generated.
//     Nothing external references them (sessions are re-issued on next login).
//   - Collection names assume Mongoose defaults (Member→"members",
//     Admin→"admins", ChapterUpdate→"chapterupdates").

import { MongoClient } from "mongodb";
import { PrismaClient } from "@prisma/client";

const FORCE = process.argv.includes("--force");
const MONGODB_URI = process.env.MONGODB_URI;
const MONGO_DB = process.env.MONGO_DB; // optional override

if (!MONGODB_URI) {
  console.error("✗ Missing MONGODB_URI (source Mongo connection string).");
  process.exit(1);
}
if (!process.env.DATABASE_URL) {
  console.error("✗ Missing DATABASE_URL (target Postgres connection string).");
  process.exit(1);
}

const MEMBERSHIP_TYPES = new Set(["student", "professional", "board"]);
const STATUS_VALUES = new Set(["new", "reviewing", "approved", "rejected", "archived"]);

const str = (v, max) => (v == null ? "" : String(v)).slice(0, max);
const optStr = (v, max) => (v == null ? null : String(v).slice(0, max));
const asDate = (v) => {
  const d = v ? new Date(v) : new Date();
  return Number.isNaN(d.getTime()) ? new Date() : d;
};

const prisma = new PrismaClient();
const mongo = new MongoClient(MONGODB_URI, { serverSelectionTimeoutMS: 10000 });

async function migrateAdmins(db) {
  const docs = await db.collection("admins").find({}).toArray();
  let n = 0;
  for (const a of docs) {
    if (!a.username || !a.email || !a.passwordHash) {
      console.warn(`  • skip admin (missing username/email/passwordHash): ${a._id}`);
      continue;
    }
    const username = String(a.username).toLowerCase();
    const data = {
      email: String(a.email).toLowerCase(),
      passwordHash: String(a.passwordHash),
      mustChangePassword: a.mustChangePassword ?? true,
      lastLoginAt: a.lastLoginAt ? asDate(a.lastLoginAt) : null,
      lastLoginIp: optStr(a.lastLoginIp, 64)
    };
    await prisma.admin.upsert({
      where: { username },
      update: data,
      create: {
        username,
        ...data,
        createdAt: asDate(a.createdAt),
        updatedAt: asDate(a.updatedAt)
      }
    });
    n++;
  }
  console.log(`✓ Admins migrated/updated: ${n} (of ${docs.length} source docs)`);
}

async function migrateMembers(db) {
  const existing = await prisma.member.count();
  const docs = await db.collection("members").find({}).toArray();

  if (existing > 0 && !FORCE) {
    console.warn(
      `! members table already has ${existing} rows — skipping member import. ` +
        `Re-run with --force to insert anyway.`
    );
    return;
  }

  const rows = [];
  for (const m of docs) {
    if (!MEMBERSHIP_TYPES.has(m.membershipType)) {
      console.warn(`  • skip member (bad membershipType "${m.membershipType}"): ${m._id}`);
      continue;
    }
    rows.push({
      membershipType: m.membershipType,
      firstName: str(m.firstName, 50),
      lastName: str(m.lastName, 50),
      email: str(m.email, 254),
      phone: str(m.phone, 20),
      context: str(m.context, 150),
      subject: str(m.subject, 200),
      message: str(m.message, 2000),
      ipAddress: optStr(m.ipAddress, 64),
      userAgent: optStr(m.userAgent, 256),
      status: STATUS_VALUES.has(m.status) ? m.status : "new",
      sheetSynced: Boolean(m.sheetSynced),
      createdAt: asDate(m.createdAt),
      updatedAt: asDate(m.updatedAt)
    });
  }

  let inserted = 0;
  const CHUNK = 500;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const res = await prisma.member.createMany({ data: rows.slice(i, i + CHUNK) });
    inserted += res.count;
  }
  console.log(`✓ Members migrated: ${inserted} (of ${docs.length} source docs)`);
}

async function migrateChapterUpdates(db) {
  const exists = await db.listCollections({ name: "chapterupdates" }).toArray();
  if (!exists.length) {
    console.log("• No chapterupdates collection — skipping.");
    return;
  }

  const existing = await prisma.chapterUpdate.count();
  const docs = await db.collection("chapterupdates").find({}).toArray();

  if (existing > 0 && !FORCE) {
    console.warn(
      `! chapter_updates table already has ${existing} rows — skipping. Re-run with --force.`
    );
    return;
  }

  const rows = docs
    .filter((u) => u.title != null && u.body != null)
    .map((u) => ({
      title: str(u.title, 20000),
      body: str(u.body, 200000),
      publishedAt: asDate(u.publishedAt ?? u.createdAt),
      createdAt: asDate(u.createdAt),
      updatedAt: asDate(u.updatedAt)
    }));

  if (!rows.length) {
    console.log("✓ Chapter updates migrated: 0");
    return;
  }
  const res = await prisma.chapterUpdate.createMany({ data: rows });
  console.log(`✓ Chapter updates migrated: ${res.count} (of ${docs.length} source docs)`);
}

async function main() {
  await mongo.connect();
  const db = MONGO_DB ? mongo.db(MONGO_DB) : mongo.db();
  console.log(`Connected to Mongo db "${db.databaseName}". Importing into Postgres…\n`);

  await migrateAdmins(db);
  await migrateMembers(db);
  await migrateChapterUpdates(db);

  console.log("\n✓ Migration complete.");
}

main()
  .catch((err) => {
    console.error("\n✗ Migration failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await mongo.close();
  });
