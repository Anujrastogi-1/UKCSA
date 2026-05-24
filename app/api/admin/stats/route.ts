import { NextRequest } from "next/server";
import { requireAdmin } from "../../../../lib/adminGuard";
import { connectDB } from "../../../../lib/db";
import Member from "../../../../models/Member";
import { ok } from "../../../../lib/apiResponse";

export const runtime = "nodejs";

// Dashboard summary stats. Designed to run in a single round trip via
// aggregation rather than three separate count queries.

export async function GET(request: NextRequest) {
  const result = await requireAdmin(request);
  if ("response" in result) return result.response;

  await connectDB();

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const [byType, byStatus, totals] = await Promise.all([
    Member.aggregate<{ _id: string; count: number }>([
      { $group: { _id: "$membershipType", count: { $sum: 1 } } }
    ]),
    Member.aggregate<{ _id: string; count: number }>([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]),
    Member.aggregate<{ _id: null; total: number; last7: number; last30: number }>([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          last7: {
            $sum: { $cond: [{ $gte: ["$createdAt", sevenDaysAgo] }, 1, 0] }
          },
          last30: {
            $sum: { $cond: [{ $gte: ["$createdAt", thirtyDaysAgo] }, 1, 0] }
          }
        }
      }
    ])
  ]);

  const toMap = (rows: Array<{ _id: string; count: number }>) =>
    rows.reduce<Record<string, number>>((acc, r) => {
      acc[r._id] = r.count;
      return acc;
    }, {});

  const summary = totals[0] ?? { total: 0, last7: 0, last30: 0 };

  return ok({
    totals: {
      all: summary.total,
      last7Days: summary.last7,
      last30Days: summary.last30
    },
    byType: {
      student: toMap(byType).student ?? 0,
      professional: toMap(byType).professional ?? 0,
      board: toMap(byType).board ?? 0
    },
    byStatus: {
      new: toMap(byStatus).new ?? 0,
      reviewing: toMap(byStatus).reviewing ?? 0,
      approved: toMap(byStatus).approved ?? 0,
      rejected: toMap(byStatus).rejected ?? 0,
      archived: toMap(byStatus).archived ?? 0
    }
  });
}
