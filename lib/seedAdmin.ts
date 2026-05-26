import { Prisma } from "@prisma/client";
import { prisma } from "./db";
import { hashPassword } from "./auth";

// Idempotent admin bootstrap. Called lazily from the admin login endpoint:
//  - If at least one admin already exists → no-op.
//  - Otherwise, create one from ADMIN_USERNAME / ADMIN_PASSWORD env vars and
//    flag it mustChangePassword=true so the first login forces a rotation.
//
// This pattern avoids exposing a public "first-time setup" endpoint while
// still letting the admin bootstrap with zero manual DB writes.

let seededInProcess = false;

export async function ensureAdminSeeded(): Promise<void> {
  if (seededInProcess) return;

  const count = await prisma.admin.count();
  if (count > 0) {
    seededInProcess = true;
    return;
  }

  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD;
  const email = process.env.ADMIN_EMAIL?.trim();

  if (!username || !password || !email) {
    // Don't throw — login will simply return invalid-credentials for now.
    console.warn(
      "[seedAdmin] ADMIN_USERNAME / ADMIN_PASSWORD / ADMIN_EMAIL not set; skipping seed."
    );
    return;
  }

  const passwordHash = await hashPassword(password);

  // Catch the unique-constraint error (P2002) in case two cold invocations race.
  try {
    await prisma.admin.create({
      data: {
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        passwordHash,
        mustChangePassword: true
      }
    });
    console.log(`[seedAdmin] Created initial admin "${username}".`);
  } catch (err: unknown) {
    if (
      !(err instanceof Prisma.PrismaClientKnownRequestError) ||
      err.code !== "P2002"
    ) {
      throw err;
    }
  }

  seededInProcess = true;
}
