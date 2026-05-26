import { NextRequest } from "next/server";
import { Prisma, $Enums } from "@prisma/client";
import { requireAdmin } from "../../../../lib/adminGuard";
import { prisma } from "../../../../lib/db";
import { MEMBERSHIP_TYPES } from "../../../../lib/contactValidation";
import { errors, ok } from "../../../../lib/apiResponse";

export const runtime = "nodejs";

// GET /api/admin/members?type=student&q=foo&status=new&page=1&pageSize=20
//
// Returns paginated members with optional filters:
//   - type:   membership category
//   - status: workflow status (new/reviewing/approved/rejected/archived)
//   - range:  recency window — "7d" or "30d" (anything else = all time)
//   - q:      free-text search across firstName/lastName/email
//   - page:   1-based page number (default 1)
//   - pageSize: 1–100, default 20

const MAX_PAGE_SIZE = 100;
const DEFAULT_PAGE_SIZE = 20;
const STATUS_VALUES = ["new", "reviewing", "approved", "rejected", "archived"] as const;
// Whitelist of columns the table is allowed to sort by (prevents arbitrary
// orderBy injection from the query string).
const SORT_FIELDS = new Set(["createdAt", "membershipType", "firstName", "email", "context"]);

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
  const rangeRaw = url.searchParams.get("range") ?? "";
  const page = clampInt(url.searchParams.get("page"), 1, 1, 10_000);
  const pageSize = clampInt(
    url.searchParams.get("pageSize"),
    DEFAULT_PAGE_SIZE,
    1,
    MAX_PAGE_SIZE
  );

  // Sorting — column comes from a whitelist, direction defaults to descending.
  const sortRaw = url.searchParams.get("sort") ?? "createdAt";
  const sortField = SORT_FIELDS.has(sortRaw) ? sortRaw : "createdAt";
  const dir: "asc" | "desc" = url.searchParams.get("dir") === "asc" ? "asc" : "desc";
  // Always tie-break by createdAt so paging stays stable for non-unique keys.
  const orderBy: Prisma.MemberOrderByWithRelationInput[] = [
    { [sortField]: dir } as Prisma.MemberOrderByWithRelationInput
  ];
  if (sortField !== "createdAt") orderBy.push({ createdAt: "desc" });

  const where: Prisma.MemberWhereInput = {};

  if (typeRaw) {
    if (!(MEMBERSHIP_TYPES as readonly string[]).includes(typeRaw)) {
      return errors.badRequest("Invalid `type` filter.");
    }
    where.membershipType = typeRaw as $Enums.MembershipType;
  }

  if (statusRaw) {
    if (!(STATUS_VALUES as readonly string[]).includes(statusRaw)) {
      return errors.badRequest("Invalid `status` filter.");
    }
    where.status = statusRaw as $Enums.MemberStatus;
  }

  if (q) {
    // Cap length; Prisma parameterizes the value so no escaping is needed.
    if (q.length > 80) return errors.badRequest("Search query too long.");
    where.OR = [
      { firstName: { contains: q, mode: "insensitive" } },
      { lastName: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } }
    ];
  }

  // Optional date-range filter ("7d" / "30d"); anything else means all time.
  if (rangeRaw === "7d" || rangeRaw === "30d") {
    const days = rangeRaw === "7d" ? 7 : 30;
    where.createdAt = { gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000) };
  }

  const [total, items] = await Promise.all([
    prisma.member.count({ where }),
    prisma.member.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize
    })
  ]);

  return ok({
    items: items.map((m) => ({
      id: m.id,
      membershipType: m.membershipType,
      firstName: m.firstName,
      lastName: m.lastName,
      email: m.email,
      phone: m.phone,
      context: m.context,
      subject: m.subject,
      message: m.message,
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
