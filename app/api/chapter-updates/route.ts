import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({
      authenticated: false,
      message:
        "Either the content you're seeking doesn't exist or it requires proper authentication before viewing.",
      updates: []
    });
  }

  const updates = await prisma.chapterUpdate.findMany({
    orderBy: { publishedAt: "desc" },
    take: 10
  });

  return NextResponse.json({
    authenticated: updates.length > 0,
    updates
  });
}
