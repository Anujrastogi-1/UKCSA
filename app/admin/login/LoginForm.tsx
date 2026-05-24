"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type ApiEnvelope<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: string; message: string; details?: unknown } };

type LoginData = {
  admin: { id: string; username: string; email: string; mustChangePassword: boolean };
};

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<{ type: "error"; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ username, password })
      });
      const payload = (await res.json().catch(() => null)) as ApiEnvelope<LoginData> | null;
      if (!res.ok || !payload || payload.ok === false) {
        setStatus({
          type: "error",
          message: payload && payload.ok === false ? payload.error.message : "Login failed."
        });
        return;
      }
      const next = payload.data.admin.mustChangePassword ? "/admin/password" : "/admin";
      router.push(next);
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
        <div className="form-notice form-notice--error" role="alert" aria-live="polite">
          {status.message}
        </div>
      ) : null}
      <label className="contact-field">
        <span>Username</span>
        <input
          type="text"
          autoComplete="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label className="contact-field">
        <span>Password</span>
        <input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit" disabled={submitting} aria-busy={submitting}>
        {submitting ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
