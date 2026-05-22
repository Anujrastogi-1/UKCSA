import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { validateContactForm } from "../../../lib/contactValidation";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 10_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

declare global {
  var contactRateLimit: Map<string, RateLimitEntry> | undefined;
}

const rateLimitStore = global.contactRateLimit ?? new Map<string, RateLimitEntry>();
global.contactRateLimit = rateLimitStore;

function getClientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const current = rateLimitStore.get(ip);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return false;
  }

  current.count += 1;
  return true;
}

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
  return value.replace(/[\r\n]+/g, " ").slice(0, 120);
}

function buildEmailHtml(details: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  timestamp: string;
}) {
  const rows = [
    ["Name", `${details.firstName} ${details.lastName}`],
    ["Email", details.email],
    ["Phone", details.phone],
    ["Subject", details.subject],
    ["Submitted At", details.timestamp]
  ];

  return `
    <div style="font-family: Arial, sans-serif; color: #1b1d21; line-height: 1.6;">
      <h2 style="margin: 0 0 16px; color: #075896;">New CSA Uttarakhand Contact Inquiry</h2>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="width: 140px; padding: 8px 10px; border: 1px solid #e5e7eb; font-weight: 700; background: #f8fafc;">${escapeHtml(label)}</td>
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

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");

  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ message: "Request body is too large." }, { status: 413 });
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ message: "Request must be sent as JSON." }, { status: 415 });
  }

  if (!checkRateLimit(getClientIp(request))) {
    return NextResponse.json({ message: "Too many contact attempts. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Malformed JSON request." }, { status: 400 });
  }

  if (!isPlainObject(body)) {
    return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ message: "Unable to process this request." }, { status: 400 });
  }

  const result = validateContactForm(body);
  if (!result.isValid) {
    return NextResponse.json(
      {
        message: "Please correct the highlighted fields.",
        errors: result.errors
      },
      { status: 422 }
    );
  }

  const emailUser = process.env.EMAIL_USER?.trim();
  const emailPass = process.env.EMAIL_PASS?.trim();
  const receiver = process.env.CONTACT_RECEIVER?.trim();

  if (!emailUser || !emailPass || !receiver) {
    return NextResponse.json({ message: "Contact email service is not configured." }, { status: 500 });
  }

  const timestamp = new Date().toISOString();
  const values = result.values;
  const subject = stripHeaderUnsafe(`[CSA Uttarakhand Contact] ${values.subject}`);
  const senderName = stripHeaderUnsafe(`${values.firstName} ${values.lastName}`);
  const text = [
    "New CSA Uttarakhand contact inquiry",
    "",
    `Name: ${values.firstName} ${values.lastName}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    `Subject: ${values.subject}`,
    `Submitted At: ${timestamp}`,
    "",
    "Message:",
    values.message
  ].join("\n");

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });

    await transporter.sendMail({
      from: `"CSA Uttarakhand Contact" <${emailUser}>`,
      to: receiver,
      replyTo: `"${senderName}" <${values.email}>`,
      subject,
      text,
      html: buildEmailHtml({ ...values, timestamp })
    });

    return NextResponse.json({ message: "Your message has been sent successfully." }, { status: 200 });
  } catch (error) {
    console.error("Contact email send failed:", error);
    return NextResponse.json(
      { message: "We could not send your message right now. Please try again later." },
      { status: 502 }
    );
  }
}
