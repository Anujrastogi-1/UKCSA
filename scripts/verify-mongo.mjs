import mongoose from "mongoose";

const uri = process.env.DATABASE_URL ?? process.env.MONGODB_URI;
if (!uri) {
  console.error("DATABASE_URL is not set. Check your .env file.");
  process.exit(1);
}

const redacted = uri.replace(/\/\/([^:]+):([^@]+)@/, "//$1:***@");
console.log(`Connecting to: ${redacted}`);

const start = Date.now();
try {
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 8000,
    bufferCommands: false
  });
  const ping = await mongoose.connection.db.admin().ping();
  console.log(`OK — connected in ${Date.now() - start}ms`);
  console.log("Ping:", ping);
  console.log("DB name:", mongoose.connection.db.databaseName);
  await mongoose.disconnect();
  process.exit(0);
} catch (err) {
  console.error(`FAILED after ${Date.now() - start}ms`);
  console.error(err.message);
  process.exit(1);
}
