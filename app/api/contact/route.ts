import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  validateContactForm,
  validateMembershipForm,
  type MembershipType
} from "../../../lib/contactValidation";
import { connectDB } from "../../../lib/db";
import Member from "../../../models/Member";
import { appendMembershipRow } from "../../../lib/googleSheets";
import { clientIp, rateLimit, sweepRateLimits } from "../../../lib/rateLimit";
import { errors, ok } from "../../../lib/apiResponse";

// /api/contact handles both:
//   1) Legacy plain "contact" form (no membershipType present)  → email only.
//   2) Membership applications from /contact (membershipType set)
//        → validate, persist to MongoDB, append to Google Sheets, send email.
//
// Mongo is the system of record. Sheets and email are best-effort sinks: if
// either fails we still return success to the user as long as the application
// was saved (and we log the failure for ops).

export const runtime = "nodejs";

const MAX_BODY_BYTES = 10_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const DEDUP_WINDOW_MS = 2 * 60 * 1000; // same email cannot resubmit within 2 min

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function stripHeaderUnsafe(value: string) {
  // Prevent header injection on Subject / From by collapsing CR/LF and
  // truncating to a reasonable length.
  return value.replace(/[\r\n]+/g, " ").slice(0, 120);
}

function membershipLabel(type: MembershipType) {
  return type === "student"
    ? "Student"
    : type === "professional"
      ? "Professional"
      : "Board Member";
}

function buildEmailHtml(details: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  timestamp: string;
  membershipType?: MembershipType;
  context?: string;
}) {
  const rows: Array<[string, string]> = [
    ["Name", `${details.firstName} ${details.lastName}`],
    ["Email", details.email],
    ["Phone", details.phone]
  ];
  if (details.membershipType) {
    rows.push(["Membership Type", membershipLabel(details.membershipType)]);
  }
  if (details.context) {
    rows.push(["Organization / Institution", details.context]);
  }
  rows.push(["Subject", details.subject]);
  rows.push(["Submitted At", details.timestamp]);

  return `
    <div style="font-family: Arial, sans-serif; color: #1b1d21; line-height: 1.6;">
      <h2 style="margin: 0 0 16px; color: #075896;">${details.membershipType ? "New CSA Uttarakhand Membership Application" : "New CSA Uttarakhand Contact Inquiry"}</h2>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="width: 180px; padding: 8px 10px; border: 1px solid #e5e7eb; font-weight: 700; background: #f8fafc;">${escapeHtml(label)}</td>
                <td style="padding: 8px 10px; border: 1px solid #e5e7eb;">${escapeHtml(value)}</td>
              </tr>
            `
          )
          .join("")}
      </table>
      <h3 style="margin: 20px 0 8px; color: #075896;">Message</h3>
      <p style="margin: 0; white-space: pre-line;">${escapeHtml(details.message)}</p>
    </div>
  `;
}

async function sendEmail(values: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  membershipType?: MembershipType;
  context?: string;
}) {
  const emailUser = process.env.EMAIL_USER?.trim();
  const emailPass = process.env.EMAIL_PASS?.trim();
  const receiver = process.env.CONTACT_RECEIVER?.trim();
  if (!emailUser || !emailPass || !receiver) {
    console.warn("[contact] email not configured — skipping send");
    return { sent: false };
  }

  const timestamp = new Date().toISOString();
  const subject = stripHeaderUnsafe(
    values.membershipType
      ? `[CSA Uttarakhand Membership] ${values.subject}`
      : `[CSA Uttarakhand Contact] ${values.subject}`
  );
  const senderName = stripHeaderUnsafe(`${values.firstName} ${values.lastName}`);
  const text = [
    values.membershipType
      ? "New CSA Uttarakhand membership application"
      : "New CSA Uttarakhand contact inquiry",
    "",
    `Name: ${values.firstName} ${values.lastName}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    values.membershipType ? `Membership Type: ${membershipLabel(values.membershipType)}` : null,
    values.context ? `Organization / Institution: ${values.context}` : null,
    `Subject: ${values.subject}`,
    `Submitted At: ${timestamp}`,
    "",
    "Message:",
    values.message
  ]
    .filter(Boolean)
    .join("\n");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: emailUser, pass: emailPass }
  });

  await transporter.sendMail({
    from: `"CSA Uttarakhand" <${emailUser}>`,
    to: receiver,
    replyTo: `"${senderName}" <${values.email}>`,
    subject,
    text,
    html: buildEmailHtml({ ...values, timestamp })
  });

  return { sent: true };
}

export async function POST(request: NextRequest) {
  sweepRateLimits();

  // ---- transport-level checks ----------------------------------------------
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) return errors.tooLarge();

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return errors.unsupportedMedia();

  // ---- per-IP rate limit ---------------------------------------------------
  const ip = clientIp(request);
  const limited = rateLimit(ip, {
    scope: "contact",
    windowMs: RATE_LIMIT_WINDOW_MS,
    max: RATE_LIMIT_MAX
  });
  if (!limited.allowed) {
    return errors.rateLimited("Too many submissions. Please try again later.");
  }

  // ---- parse ---------------------------------------------------------------
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errors.badRequest("Malformed JSON request.");
  }
  if (!isPlainObject(body)) return errors.badRequest("Invalid request payload.");

  // ---- honeypot ------------------------------------------------------------
  if (typeof body.website === "string" && body.website.trim()) {
    // Mirror a successful response so spam bots don't learn they were caught.
    return ok({ message: "Your application has been received." });
  }

  // ---- membership-or-plain branch -----------------------------------------
  const isMembership = typeof body.membershipType === "string";

  if (!isMembership) {
    // Legacy contact path — email only.
    const result = validateContactForm(body);
    if (!result.isValid) return errors.validation(result.errors as Record<string, string>);

    try {
      await sendEmail(result.values);
      return ok({ message: "Your message has been sent successfully." });
    } catch (err) {
      console.error("[contact] email send failed:", err);
      return errors.badGateway(
        "We could not send your message right now. Please try again later."
      );
    }
  }

  // ---- membership path -----------------------------------------------------
  const result = validateMembershipForm(body);
  if (!result.isValid) {
    return errors.validation(result.errors as Record<string, string>);
  }
  const v = result.values;

  // Per-email cooldown to stop accidental double-clicks from inserting twice.
  const dedupKey = `${v.email}:${v.membershipType}`;
  const dedup = rateLimit(dedupKey, {
    scope: "contact-dedup",
    windowMs: DEDUP_WINDOW_MS,
    max: 1
  });
  if (!dedup.allowed) {
    return errors.conflict(
      "We already received an application from this email moments ago. Please wait a couple of minutes before trying again."
    );
  }

  // ---- persist to Mongo (system of record) --------------------------------
  let memberId: string;
  try {
    await connectDB();
    const created = await Member.create({
      membershipType: v.membershipType,
      firstName: v.firstName,
      lastName: v.lastName,
      email: v.email,
      phone: v.phone,
      context: v.context,
      subject: v.subject,
      message: v.message,
      ipAddress: ip,
      userAgent: request.headers.get("user-agent")?.slice(0, 256) ?? undefined
    });
    memberId = String(created._id);
  } catch (err) {
    console.error("[contact] mongo insert failed:", err);
    return errors.server(
      "We could not save your application right now. Please try again shortly."
    );
  }

  // ---- best-effort sinks (don't fail the request on errors) ---------------
  const submittedAt = new Date().toISOString();
  const [sheetResult, emailResult] = await Promise.allSettled([
    appendMembershipRow({
      membershipType: v.membershipType,
      firstName: v.firstName,
      lastName: v.lastName,
      email: v.email,
      phone: v.phone,
      context: v.context,
      subject: v.subject,
      message: v.message,
      submittedAt,
      ip
    }),
    sendEmail({
      firstName: v.firstName,
      lastName: v.lastName,
      email: v.email,
      phone: v.phone,
      subject: v.subject,
      message: v.message,
      membershipType: v.membershipType,
      context: v.context
    })
  ]);

  // Mark Sheets-sync status for retry/visibility in the admin dashboard.
  if (sheetResult.status === "fulfilled" && sheetResult.value.ok) {
    try {
      await Member.updateOne({ _id: memberId }, { $set: { sheetSynced: true } });
    } catch {
      /* non-fatal */
    }
  } else if (sheetResult.status === "rejected") {
    console.error("[contact] sheets sync threw:", sheetResult.reason);
  }

  if (emailResult.status === "rejected") {
    console.error("[contact] email notify threw:", emailResult.reason);
  }

  return ok({
    message:
      "Your application has been received. We will be in touch with next steps shortly."
  });
}

// Reject every other method so we don't leak shape via 405-vs-404 ambiguity.
export function GET() {
  return NextResponse.json(
    { ok: false, error: { code: "METHOD_NOT_ALLOWED", message: "Use POST." } },
    { status: 405, headers: { Allow: "POST" } }
  );
}
