import mongoose, { Schema } from "mongoose";

const chapterUpdateSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    publishedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.models.ChapterUpdate || mongoose.model("ChapterUpdate", chapterUpdateSchema);
