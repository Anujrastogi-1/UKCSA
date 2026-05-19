import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import ChapterUpdate from "../../../models/ChapterUpdate";

export async function GET() {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({
      authenticated: false,
      message:
        "Either the content you're seeking doesn't exist or it requires proper authentication before viewing.",
      updates: []
    });
  }

  await connectDB();
  const updates = await ChapterUpdate.find().sort({ publishedAt: -1 }).limit(10).lean();

  return NextResponse.json({
    authenticated: updates.length > 0,
    updates
  });
}
