"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Printer,
  FileSpreadsheet,
  RefreshCw,
  LogOut,
  Trash2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Minus,
  Inbox
} from "lucide-react";

type ApiEnvelope<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: string; message: string; details?: unknown } };

type Member = {
  id: string;
  membershipType: "student" | "professional" | "board";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  context: string;
  subject: string;
  status: string;
  sheetSynced: boolean;
  createdAt: string;
};

type ListData = {
  items: Member[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
};

type StatsData = {
  totals: { all: number; last7Days: number; last30Days: number };
  byType: { student: number; professional: number; board: number };
  byStatus: Record<string, number>;
};

const RANGE_FILTERS = [
  { value: "", label: "Total" },
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" }
] as const;

const TYPE_FILTERS = [
  { value: "", label: "All" },
  { value: "student", label: "Students" },
  { value: "professional", label: "Professionals" },
  { value: "board", label: "Board Members" }
] as const;

const PAGE_SIZE = 20;
const EXPORT_BATCH_SIZE = 100;

const TYPE_LABEL: Record<Member["membershipType"], string> = {
  student: "Student",
  professional: "Professional",
  board: "Board"
};

async function apiGet<T>(url: string): Promise<T> {
  const res = await fetch(url, { credentials: "same-origin", cache: "no-store" });
  const payload = (await res.json().catch(() => null)) as ApiEnvelope<T> | null;
  if (!res.ok || !payload || payload.ok === false) {
    const msg = payload && payload.ok === false ? payload.error.message : `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return payload.data;
}

export function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<StatsData | null>(null);
  const [list, setList] = useState<ListData | null>(null);
  const [type, setType] = useState<string>("");
  const [range, setRange] = useState<string>("");
  const [q, setQ] = useState<string>("");
  const [debouncedQ, setDebouncedQ] = useState<string>("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedQ(q.trim()), 300);
    return () => clearTimeout(id);
  }, [q]);

  const filterParams = useMemo(() => {
    const p = new URLSearchParams();
    if (type) p.set("type", type);
    if (range) p.set("range", range);
    if (debouncedQ) p.set("q", debouncedQ);
    return p;
  }, [type, range, debouncedQ]);

  const listUrl = useMemo(() => {
    const p = new URLSearchParams(filterParams);
    p.set("page", String(page));
    p.set("pageSize", String(PAGE_SIZE));
    return `/api/admin/members?${p.toString()}`;
  }, [filterParams, page]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [s, l] = await Promise.all([
        apiGet<StatsData>("/api/admin/stats"),
        apiGet<ListData>(listUrl)
      ]);
      setStats(s);
      setList(l);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load.");
    } finally {
      setLoading(false);
    }
  }, [listUrl]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    setPage(1);
  }, [type, range, debouncedQ]);

  async function onDelete(id: string) {
    if (!confirm("Delete this submission? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/admin/members/${id}`, {
        method: "DELETE",
        credentials: "same-origin"
      });
      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as ApiEnvelope<unknown> | null;
        throw new Error(
          payload && payload.ok === false ? payload.error.message : "Delete failed."
        );
      }
      void load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed.");
    }
  }

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "same-origin" });
    router.push("/admin/login");
    router.refresh();
  }

  function onPrint() {
    window.print();
  }

  async function onExport() {
    setExporting(true);
    setError(null);
    try {
      const all: Member[] = [];
      let pageNum = 1;
      // Loop pages so the export covers every row that matches the active filter,
      // not just the page currently rendered in the table.
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const p = new URLSearchParams(filterParams);
        p.set("page", String(pageNum));
        p.set("pageSize", String(EXPORT_BATCH_SIZE));
        const data = await apiGet<ListData>(`/api/admin/members?${p.toString()}`);
        all.push(...data.items);
        if (pageNum >= data.pagination.totalPages || data.items.length === 0) break;
        pageNum += 1;
        if (pageNum > 500) break; // safety
      }
      downloadCsv(all);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export failed.");
    } finally {
      setExporting(false);
    }
  }

  const total = list?.pagination.total ?? 0;
  const visibleStart = list && list.items.length > 0 ? (list.pagination.page - 1) * list.pagination.pageSize + 1 : 0;
  const visibleEnd = list ? visibleStart + list.items.length - 1 : 0;

  const rangeCount = (v: string): number | null => {
    if (!stats) return null;
    if (v === "7d") return stats.totals.last7Days;
    if (v === "30d") return stats.totals.last30Days;
    return stats.totals.all;
  };

  const typeCount = (v: string): number | null => {
    if (!stats) return null;
    if (v === "student") return stats.byType.student;
    if (v === "professional") return stats.byType.professional;
    if (v === "board") return stats.byType.board;
    return stats.totals.all;
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">CSA Uttarakhand</p>
          <h2 className="admin-title">Membership Submissions</h2>
        </div>
        <button type="button" className="admin-btn admin-btn--ghost" onClick={onLogout}>
          <LogOut size={16} aria-hidden /> Sign out
        </button>
      </header>

      <div className="admin-filters">
        <div className="admin-filter-row" role="group" aria-label="Filter by recency">
          {RANGE_FILTERS.map((f) => {
            const active = range === f.value;
            const count = rangeCount(f.value);
            return (
              <button
                key={f.value || "all-time"}
                type="button"
                className={`admin-chip${active ? " is-active" : ""}`}
                onClick={() => setRange(f.value)}
                aria-pressed={active}
              >
                {f.label}
                {count != null ? <span className="admin-chip__count">{count.toLocaleString()}</span> : null}
              </button>
            );
          })}
        </div>
        <div className="admin-filter-row" role="group" aria-label="Filter by membership type">
          {TYPE_FILTERS.map((f) => {
            const active = type === f.value;
            const count = typeCount(f.value);
            return (
              <button
                key={f.value || "all-types"}
                type="button"
                className={`admin-chip${active ? " is-active" : ""}`}
                onClick={() => setType(f.value)}
                aria-pressed={active}
              >
                {f.label}
                {count != null ? <span className="admin-chip__count">{count.toLocaleString()}</span> : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <Search size={16} aria-hidden className="admin-search__icon" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name or email…"
            aria-label="Search submissions"
          />
        </div>
        <div className="admin-actions">
          <button
            type="button"
            className="admin-icon-btn"
            onClick={() => void load()}
            disabled={loading}
            title="Refresh"
            aria-label="Refresh"
          >
            <RefreshCw size={16} aria-hidden className={loading ? "is-spinning" : ""} />
          </button>
          <button
            type="button"
            className="admin-icon-btn"
            onClick={onPrint}
            title="Print"
            aria-label="Print"
          >
            <Printer size={16} aria-hidden />
            <span className="admin-icon-btn__label">Print</span>
          </button>
          <button
            type="button"
            className="admin-icon-btn admin-icon-btn--primary"
            onClick={() => void onExport()}
            disabled={exporting || total === 0}
            title="Export to Excel (CSV)"
            aria-label="Export to Excel"
          >
            <FileSpreadsheet size={16} aria-hidden />
            <span className="admin-icon-btn__label">
              {exporting ? "Exporting…" : "Export"}
            </span>
          </button>
        </div>
      </div>

      {error ? (
        <div className="form-notice form-notice--error" role="alert">{error}</div>
      ) : null}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Submitted</th>
              <th>Type</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Org / Institution</th>
              <th>Sheet</th>
              <th className="admin-col-actions" aria-label="Actions"></th>
            </tr>
          </thead>
          <tbody>
            {loading && !list ? (
              <tr><td colSpan={8} className="admin-empty">Loading…</td></tr>
            ) : null}
            {list && list.items.length === 0 ? (
              <tr>
                <td colSpan={8} className="admin-empty">
                  <Inbox size={28} aria-hidden />
                  <span>No submissions match the current filters.</span>
                </td>
              </tr>
            ) : null}
            {list?.items.map((m) => (
              <tr key={m.id}>
                <td className="admin-cell-meta">{formatDate(m.createdAt)}</td>
                <td><TypeBadge type={m.membershipType} /></td>
                <td className="admin-cell-name">{m.firstName} {m.lastName}</td>
                <td><a href={`mailto:${m.email}`} className="admin-link">{m.email}</a></td>
                <td className="admin-cell-meta">{m.phone}</td>
                <td className="admin-cell-clip" title={m.context}>{m.context}</td>
                <td className="admin-cell-center">
                  {m.sheetSynced ? (
                    <CheckCircle2 size={16} className="admin-sheet-ok" aria-label="Synced" />
                  ) : (
                    <Minus size={16} className="admin-sheet-no" aria-label="Not synced" />
                  )}
                </td>
                <td className="admin-row-actions">
                  <button
                    type="button"
                    className="admin-icon-btn admin-icon-btn--danger"
                    onClick={() => onDelete(m.id)}
                    title="Delete"
                    aria-label="Delete submission"
                  >
                    <Trash2 size={14} aria-hidden />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {list ? (
        <div className="admin-pagination">
          <span className="admin-pagination__info">
            {total === 0
              ? "0 results"
              : `Showing ${visibleStart}–${visibleEnd} of ${total}`}
          </span>
          <div className="admin-pagination__controls">
            <button
              type="button"
              className="admin-icon-btn"
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              aria-label="Previous page"
            >
              <ChevronLeft size={16} aria-hidden />
            </button>
            <span className="admin-pagination__page">
              Page {list.pagination.page} of {list.pagination.totalPages}
            </span>
            <button
              type="button"
              className="admin-icon-btn"
              disabled={page >= list.pagination.totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
              aria-label="Next page"
            >
              <ChevronRight size={16} aria-hidden />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function TypeBadge({ type }: { type: Member["membershipType"] }) {
  return <span className={`admin-badge admin-badge--type-${type}`}>{TYPE_LABEL[type]}</span>;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function downloadCsv(rows: Member[]) {
  const headers = [
    "Submitted",
    "Type",
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Organisation / Institution",
    "Subject",
    "Status",
    "Sheet Synced"
  ];
  const esc = (val: unknown) => {
    const s = val == null ? "" : String(val);
    return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [
    headers.join(","),
    ...rows.map((r) =>
      [
        new Date(r.createdAt).toISOString(),
        r.membershipType,
        r.firstName,
        r.lastName,
        r.email,
        r.phone,
        r.context,
        r.subject,
        r.status,
        r.sheetSynced ? "yes" : "no"
      ]
        .map(esc)
        .join(",")
    )
  ];
  // UTF-8 BOM so Excel detects encoding for non-ASCII names.
  const csv = "﻿" + lines.join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const stamp = new Date().toISOString().slice(0, 19).replace(/[T:]/g, "-");
  a.download = `members-${stamp}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
