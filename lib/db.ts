import { PrismaClient } from "@prisma/client";

// Serverless connection cache — Next.js + Vercel reuse the same Node process
// across warm invocations, but module state is per-process. A global singleton
// prevents exhausting the Postgres connection pool by creating a new client on
// every cold start / hot-reload in dev.

declare global {
  // eslint-disable-next-line no-var
  var prismaClient: PrismaClient | undefined;
}

export const prisma =
  global.prismaClient ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prismaClient = prisma;
}

// Backward-compatible helpers. Prisma connects lazily on first query, so these
// simply return the shared client (kept so existing `await connectDB()` calls
// continue to work).
export async function connectDB() {
  return prisma;
}

export const dbConnect = connectDB;
