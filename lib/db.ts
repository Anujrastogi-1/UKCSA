import mongoose from "mongoose";

// Serverless connection cache — Next.js + Vercel reuse the same Node process
// across multiple invocations when warm, but module state is per-process.
// Without this cache, each cold invocation would open a fresh Atlas connection
// and quickly exhaust the connection pool.

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongooseConnection: MongooseCache | undefined;
}

const cached: MongooseCache =
  global.mongooseConnection ?? { conn: null, promise: null };
global.mongooseConnection = cached;

function getUri(): string {
  // DATABASE_URL is the canonical name in .env.example; MONGODB_URI is kept
  // for backward compatibility with the original connectDB implementation.
  const uri = process.env.DATABASE_URL ?? process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MongoDB connection string is missing. Set DATABASE_URL in .env.local."
    );
  }
  return uri;
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(getUri(), {
      // Surface real errors instead of buffering ops when the DB is down.
      bufferCommands: false,
      // Atlas free tier handles small pools well; tune per workload.
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 8000
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    // Reset the promise so the next request retries instead of returning the
    // same rejected promise indefinitely.
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

// Alias for readers who prefer the dbConnect() naming.
export const dbConnect = connectDB;
