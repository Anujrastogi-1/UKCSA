"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type ApiEnvelope =
  | { ok: true; data: { message: string } }
  | { ok: false; error: { code: string; message: string; details?: Record<string, string> } };

export function PasswordChangeForm() {
  const router = useRouter();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<{ type: "error" | "success"; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setFieldError(null);

    if (next !== confirm) {
      setFieldError("New password and confirmation do not match.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ currentPassword: current, newPassword: next })
      });
      const payload = (await res.json().catch(() => null)) as ApiEnvelope | null;
      if (!res.ok || !payload || payload.ok === false) {
        const message =
          payload && payload.ok === false ? payload.error.message : "Could not update password.";
        const detail =
          payload && payload.ok === false
            ? payload.error.details?.newPassword
            : undefined;
        setStatus({ type: "error", message: detail ?? message });
        return;
      }
      setStatus({ type: "success", message: "Password updated. Redirecting…" });
      router.push("/admin");
      router.refresh();
    } catch {
      setStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      {status ? (
        <div
          className={`form-notice form-notice--${status.type}`}
          role={status.type === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          {status.message}
        </div>
      ) : null}
      <label className="contact-field">
        <span>Current password</span>
        <input
          type="password"
          autoComplete="current-password"
          required
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
        />
      </label>
      <label className="contact-field">
        <span>New password (min. 12 chars, letter + digit)</span>
        <input
          type="password"
          autoComplete="new-password"
          required
          value={next}
          onChange={(e) => setNext(e.target.value)}
        />
      </label>
      <label className="contact-field">
        <span>Confirm new password</span>
        <input
          type="password"
          autoComplete="new-password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          aria-invalid={Boolean(fieldError)}
          className={fieldError ? "is-invalid" : undefined}
        />
        {fieldError ? (
          <span className="field-error" role="alert">{fieldError}</span>
        ) : null}
      </label>
      <button type="submit" disabled={submitting} aria-busy={submitting}>
        {submitting ? "Updating..." : "Update password"}
      </button>
    </form>
  );
}
