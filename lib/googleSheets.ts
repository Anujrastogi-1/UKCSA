import { JWT } from "google-auth-library";
import sheetsApi from "@googleapis/sheets";

// Google Sheets mirror of MongoDB submissions. This is a "best-effort" sink —
// Mongo is the system of record. If Sheets append fails (quota, key rotated,
// permissions removed), the caller MUST NOT fail the request; we log and
// move on.
//
// Setup is documented end-to-end in BACKEND.md → "Google Sheets setup".

type MembershipType = "student" | "professional" | "board";

type MembershipRow = {
  membershipType: MembershipType;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  context: string;
  subject: string;
  message: string;
  submittedAt: string;
  ip: string;
};

// Column order in the spreadsheet. Keep in sync with HEADER_ROW. If you add
// or reorder columns, also update the header row in your sheet manually (or
// run the bootstrap helper below).
const COLUMNS = [
  "submittedAt",
  "membershipType",
  "firstName",
  "lastName",
  "email",
  "phone",
  "context",
  "subject",
  "message",
  "ip"
] as const;

let client: ReturnType<typeof sheetsApi.sheets> | null = null;

function getConfig() {
  const id = process.env.GOOGLE_SHEETS_ID?.trim();
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  // The private key arrives from env with literal "\n" escapes; convert them
  // to real newlines so the PEM parser is happy.
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, "\n");
  if (!id || !email || !key) return null;
  return { id, email, key };
}

function getClient() {
  if (client) return client;
  const cfg = getConfig();
  if (!cfg) return null;

  const auth = new JWT({
    email: cfg.email,
    key: cfg.key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });

  client = sheetsApi.sheets({ version: "v4", auth });
  return client;
}

export async function appendMembershipRow(row: MembershipRow): Promise<{
  ok: boolean;
  skipped?: boolean;
  error?: string;
}> {
  const cfg = getConfig();
  const sheets = getClient();
  if (!cfg || !sheets) return { ok: false, skipped: true };

  // Map MembershipType to a per-tab sheet name. The tab MUST exist in the
  // spreadsheet — see BACKEND.md for one-time setup.
  const tab =
    row.membershipType === "student"
      ? "Students"
      : row.membershipType === "professional"
        ? "Professionals"
        : "Board Members";

  const values = [COLUMNS.map((col) => row[col] ?? "")];

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: cfg.id,
      // Single-quoted because "Board Members" has a space; A1 lets Sheets
      // pick the next free row.
      range: `'${tab}'!A1`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values }
    });
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    // Log but don't throw — Sheets is a secondary store, not a hard dep.
    console.error("[sheets] append failed:", message);
    return { ok: false, error: message };
  }
}

// Convenience: writes a header row to each membership tab. Call once after
// creating the three tabs in your sheet. Safe to call again — it overwrites
// row 1 only.
export async function bootstrapSheetHeaders() {
  const cfg = getConfig();
  const sheets = getClient();
  if (!cfg || !sheets) throw new Error("Google Sheets is not configured.");

  for (const tab of ["Students", "Professionals", "Board Members"]) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: cfg.id,
      range: `'${tab}'!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [COLUMNS as unknown as string[]] }
    });
  }
}
