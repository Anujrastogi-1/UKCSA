import { NextRequest } from "next/server";
import { requireAdmin } from "../../../../lib/adminGuard";
import { connectDB } from "../../../../lib/db";
import Member from "../../../../models/Member";
import { MEMBERSHIP_TYPES, type MembershipType } from "../../../../lib/contactValidation";
import { errors, ok } from "../../../../lib/apiResponse";

export const runtime = "nodejs";

// GET /api/admin/members?type=student&q=foo&status=new&page=1&pageSize=20
//
// Returns paginated members with optional filters:
//   - type:   membership category
//   - status: workflow status (new/reviewing/approved/rejected/archived)
//   - q:      free-text search across firstName/lastName/email
//   - page:   1-based page number (default 1)
//   - pageSize: 1–100, default 20

const MAX_PAGE_SIZE = 100;
const DEFAULT_PAGE_SIZE = 20;
const STATUS_VALUES = ["new", "reviewing", "approved", "rejected", "archived"] as const;

function clampInt(raw: string | null, def: number, min: number, max: number) {
  const n = Number(raw);
  if (!Number.isFinite(n) || n < min) return def;
  return Math.min(Math.floor(n), max);
}

export async function GET(request: NextRequest) {
  const result = await requireAdmin(request);
  if ("response" in result) return result.response;

  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim() ?? "";
  const typeRaw = url.searchParams.get("type") ?? "";
  const statusRaw = url.searchParams.get("status") ?? "";
  const page = clampInt(url.searchParams.get("page"), 1, 1, 10_000);
  const pageSize = clampInt(
    url.searchParams.get("pageSize"),
    DEFAULT_PAGE_SIZE,
    1,
    MAX_PAGE_SIZE
  );

  const filter: Record<string, unknown> = {};

  if (typeRaw) {
    if (!(MEMBERSHIP_TYPES as readonly string[]).includes(typeRaw)) {
      return errors.badRequest("Invalid `type` filter.");
    }
    filter.membershipType = typeRaw as MembershipType;
  }

  if (statusRaw) {
    if (!(STATUS_VALUES as readonly string[]).includes(statusRaw)) {
      return errors.badRequest("Invalid `status` filter.");
    }
    filter.status = statusRaw;
  }

  if (q) {
    // Defense against attempts to inject an operator object via JSON params.
    if (q.length > 80) return errors.badRequest("Search query too long.");
    // Escape user input before plugging into a regex.
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const rx = new RegExp(escaped, "i");
    filter.$or = [{ firstName: rx }, { lastName: rx }, { email: rx }];
  }

  await connectDB();

  const [total, items] = await Promise.all([
    Member.countDocuments(filter),
    Member.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean()
  ]);

  return ok({
    items: items.map((m) => ({
      id: String(m._id),
      membershipType: m.membershipType,
      firstName: m.firstName,
      lastName: m.lastName,
      email: m.email,
      phone: m.phone,
      context: m.context,
      subject: m.subject,
      status: m.status,
      sheetSynced: m.sheetSynced,
      createdAt: m.createdAt
    })),
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.max(1, Math.ceil(total / pageSize))
    }
  });
}
