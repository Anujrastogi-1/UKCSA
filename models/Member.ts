import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

// Membership applications captured from /contact.
//
// Design notes:
//  - We do NOT enforce a unique index on email — the same person may legitimately
//    apply for different categories or re-apply. Dedup logic lives in the route
//    handler (per-IP + per-email cooldown).
//  - membershipType is stored as a string enum, not a separate collection,
//    because we only ever have these three values and they map 1:1 to the UI.
//  - timestamps: true gives us createdAt/updatedAt for free; createdAt is the
//    canonical "submitted at" field.
//  - lower-cased email is the right key for any dedup / search.

const MembershipTypes = ["student", "professional", "board"] as const;

const memberSchema = new Schema(
  {
    membershipType: { type: String, enum: MembershipTypes, required: true, index: true },
    firstName: { type: String, required: true, trim: true, maxlength: 50 },
    lastName: { type: String, required: true, trim: true, maxlength: 50 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254, index: true },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    // institution / company / organization — depends on membershipType
    context: { type: String, required: true, trim: true, maxlength: 150 },
    subject: { type: String, required: true, trim: true, maxlength: 200 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },

    // Operational metadata. Useful for abuse investigation.
    ipAddress: { type: String, trim: true, maxlength: 64 },
    userAgent: { type: String, trim: true, maxlength: 256 },

    // Status workflow (currently informational; expand if you build an
    // approval/review pipeline later).
    status: {
      type: String,
      enum: ["new", "reviewing", "approved", "rejected", "archived"],
      default: "new",
      index: true
    },

    // Whether the row was synchronized to Google Sheets. Useful for retry.
    sheetSynced: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// Compound index supports the most common admin query (filter by type,
// newest first) without a full collection scan.
memberSchema.index({ membershipType: 1, createdAt: -1 });
// Free-text search across name and email for the admin search box.
memberSchema.index({ firstName: "text", lastName: "text", email: "text" });

// timestamps:true adds createdAt/updatedAt at runtime but Mongoose's
// InferSchemaType doesn't surface them, so they're declared explicitly here.
export type MemberDoc = InferSchemaType<typeof memberSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

const Member: Model<MemberDoc> =
  (mongoose.models.Member as Model<MemberDoc>) ||
  mongoose.model<MemberDoc>("Member", memberSchema);

export default Member;
