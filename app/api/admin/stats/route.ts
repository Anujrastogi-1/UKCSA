import { NextRequest } from "next/server";
import { requireAdmin } from "../../../../lib/adminGuard";
import { prisma } from "../../../../lib/db";
import { ok } from "../../../../lib/apiResponse";

export const runtime = "nodejs";

// Dashboard summary stats: counts by type, by status, and recency totals.

export async function GET(request: NextRequest) {
  const result = await requireAdmin(request);
  if ("response" in result) return result.response;

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const [byTypeRows, byStatusRows, total, last7, last30] = await Promise.all([
    prisma.member.groupBy({ by: ["membershipType"], _count: { _all: true } }),
    prisma.member.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.member.count(),
    prisma.member.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.member.count({ where: { createdAt: { gte: thirtyDaysAgo } } })
  ]);

  const byType: Record<string, number> = {};
  for (const r of byTypeRows) byType[r.membershipType] = r._count._all;

  const byStatus: Record<string, number> = {};
  for (const r of byStatusRows) byStatus[r.status] = r._count._all;

  return ok({
    totals: {
      all: total,
      last7Days: last7,
      last30Days: last30
    },
    byType: {
      student: byType.student ?? 0,
      professional: byType.professional ?? 0,
      board: byType.board ?? 0
    },
    byStatus: {
      new: byStatus.new ?? 0,
      reviewing: byStatus.reviewing ?? 0,
      approved: byStatus.approved ?? 0,
      rejected: byStatus.rejected ?? 0,
      archived: byStatus.archived ?? 0
    }
  });
}
