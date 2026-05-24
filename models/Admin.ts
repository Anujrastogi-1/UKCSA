import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

// Admin users for the dashboard. Kept intentionally small — this is not a
// public user system.
//
// Why select:false on passwordHash: any time we query an admin and forget to
// .select("+passwordHash"), the hash never leaves the DB. Defense in depth.

const adminSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 32,
      // simple — letters, digits, underscore, dash
      match: /^[a-z0-9_-]+$/
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254
    },
    passwordHash: { type: String, required: true, select: false },

    // First login forced to change the seeded password. Cleared after rotate.
    mustChangePassword: { type: Boolean, default: true },

    lastLoginAt: { type: Date },
    lastLoginIp: { type: String, trim: true, maxlength: 64 }
  },
  { timestamps: true }
);

export type AdminDoc = InferSchemaType<typeof adminSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

const Admin: Model<AdminDoc> =
  (mongoose.models.Admin as Model<AdminDoc>) ||
  mongoose.model<AdminDoc>("Admin", adminSchema);

export default Admin;
