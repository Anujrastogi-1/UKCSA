import { NextRequest } from "next/server";
import mongoose from "mongoose";
import { requireAdmin } from "../../../../../lib/adminGuard";
import { connectDB } from "../../../../../lib/db";
import Member from "../../../../../models/Member";
import { errors, ok } from "../../../../../lib/apiResponse";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

function isValidId(id: string) {
  return mongoose.isValidObjectId(id);
}

export async function GET(request: NextRequest, ctx: RouteContext) {
  const result = await requireAdmin(request);
  if ("response" in result) return result.response;

  const { id } = await ctx.params;
  if (!isValidId(id)) return errors.badRequest("Invalid id.");

  await connectDB();
  const member = await Member.findById(id).lean();
  if (!member) return errors.notFound();

  return ok({
    member: {
      id: String(member._id),
      membershipType: member.membershipType,
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
      phone: member.phone,
      context: member.context,
      subject: member.subject,
      message: member.message,
      status: member.status,
      sheetSynced: member.sheetSynced,
      ipAddress: member.ipAddress,
      userAgent: member.userAgent,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt
    }
  });
}

export async function DELETE(request: NextRequest, ctx: RouteContext) {
  const result = await requireAdmin(request, { requireOrigin: true });
  if ("response" in result) return result.response;

  const { id } = await ctx.params;
  if (!isValidId(id)) return errors.badRequest("Invalid id.");

  await connectDB();
  const deleted = await Member.findByIdAndDelete(id).lean();
  if (!deleted) return errors.notFound();

  return ok({ message: "Submission deleted." });
}

// Optional status transition (e.g. mark approved). Wire up to your dashboard
// when you build the review workflow.
export async function PATCH(request: NextRequest, ctx: RouteContext) {
  const result = await requireAdmin(request, { requireOrigin: true });
  if ("response" in result) return result.response;

  const { id } = await ctx.params;
  if (!isValidId(id)) return errors.badRequest("Invalid id.");

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errors.badRequest("Malformed JSON request.");
  }
  if (!body || typeof body !== "object") return errors.badRequest();

  const allowed = ["new", "reviewing", "approved", "rejected", "archived"] as const;
  const next = (body as Record<string, unknown>).status;
  if (typeof next !== "string" || !(allowed as readonly string[]).includes(next)) {
    return errors.validation({ status: "Invalid status value." });
  }

  await connectDB();
  const updated = await Member.findByIdAndUpdate(
    id,
    { $set: { status: next } },
    { new: true, lean: true }
  );
  if (!updated) return errors.notFound();

  return ok({ message: "Status updated.", status: updated.status });
}
