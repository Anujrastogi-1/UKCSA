"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  CONTACT_FIELDS,
  ContactErrors,
  ContactField,
  ContactFormValues,
  emptyContactFormValues,
  validateContactForm
} from "../../lib/contactValidation";

export type RoleId = "students" | "professionals" | "board";

// Maps the UI role id to the canonical membershipType enum the API expects.
const ROLE_TO_MEMBERSHIP_TYPE: Record<RoleId, "student" | "professional" | "board"> = {
  students: "student",
  professionals: "professional",
  board: "board"
};

type RoleFormConfig = {
  id: RoleId;
  label: string;
  contextLabel: string;
  contextPlaceholder: string;
  subjectPrefix: string;
  buttonLabel: string;
  messageLabel: string;
  messagePlaceholder: string;
};

const ROLE_FORMS: Record<RoleId, RoleFormConfig> = {
  students: {
    id: "students",
    label: "Student",
    contextLabel: "Institution / University",
    contextPlaceholder: "e.g. Graphic Era University, Dehradun",
    subjectPrefix: "Student membership",
    buttonLabel: "Start Your Security Journey",
    messageLabel: "Why do you want to join?",
    messagePlaceholder: "Tell us about your interest in cloud security and what you'd like to learn."
  },
  professionals: {
    id: "professionals",
    label: "Professional",
    contextLabel: "Company / Employer",
    contextPlaceholder: "Your current organization",
    subjectPrefix: "Professional membership",
    buttonLabel: "Join the Professional Network",
    messageLabel: "Your background and goals",
    messagePlaceholder: "Briefly share your experience and what you hope to gain from the chapter."
  },
  board: {
    id: "board",
    label: "Board Member",
    contextLabel: "Organization & Designation",
    contextPlaceholder: "Organization and current role",
    subjectPrefix: "Board member application",
    buttonLabel: "Lead the Community",
    messageLabel: "Why are you a good fit?",
    messagePlaceholder: "Share your background and what you can contribute as a board member."
  }
};

type FormStatus = {
  type: "success" | "error";
  message: string;
} | null;

type MembershipValues = ContactFormValues & { context: string };

const emptyMembership: MembershipValues = { ...emptyContactFormValues, context: "" };

const fieldLabels: Record<ContactField, string> = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email Address",
  phone: "Phone",
  subject: "Subject",
  message: "Message"
};

const touchedAllFields = CONTACT_FIELDS.reduce(
  (fields, field) => ({ ...fields, [field]: true }),
  {} as Record<ContactField, boolean>
);

const allUntouched = CONTACT_FIELDS.reduce(
  (fields, field) => ({ ...fields, [field]: false }),
  {} as Record<ContactField, boolean>
);

export function MembershipForm({ role }: { role: RoleId }) {
  const [values, setValues] = useState<MembershipValues>(emptyMembership);
  const [touched, setTouched] = useState<Record<ContactField, boolean>>(allUntouched);
  const [contextTouched, setContextTouched] = useState(false);
  const [serverErrors, setServerErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<FormStatus>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tab = ROLE_FORMS[role] ?? ROLE_FORMS.students;

  // Clear server feedback when the selected role changes (kept entered values).
  useEffect(() => {
    setStatus(null);
    setServerErrors({});
  }, [role]);

  const composedSubject = useMemo(() => {
    const trimmed = values.context.trim().replace(/\s+/g, " ");
    return trimmed ? `${tab.subjectPrefix} — ${trimmed}` : tab.subjectPrefix;
  }, [tab.subjectPrefix, values.context]);

  const submission = useMemo(
    () =>
      validateContactForm({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        subject: composedSubject,
        message: values.message
      }),
    [composedSubject, values.email, values.firstName, values.lastName, values.message, values.phone]
  );

  const contextError = validateContext(values.context);
  const errors = { ...submission.errors, ...serverErrors };
  const isSubmitDisabled = isSubmitting || !submission.isValid || Boolean(contextError);

  const fieldError = (field: ContactField) => (touched[field] ? errors[field] : undefined);
  const showContextError = contextTouched ? contextError : undefined;

  const updateField = (field: ContactField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setTouched((current) => ({ ...current, [field]: true }));
    setServerErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
    setStatus(null);
  };

  const updateContext = (value: string) => {
    setValues((current) => ({ ...current, context: value }));
    setContextTouched(true);
    setServerErrors((current) => {
      const next = { ...current };
      delete next.subject;
      return next;
    });
    setStatus(null);
  };

  const trimField = (field: ContactField) => {
    const nextValues = validateContactForm(values).values;
    setValues((current) => ({ ...current, [field]: nextValues[field] }));
    setTouched((current) => ({ ...current, [field]: true }));
  };

  const trimContext = () => {
    setValues((current) => ({ ...current, context: current.context.trim().replace(/\s+/g, " ") }));
    setContextTouched(true);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(touchedAllFields);
    setContextTouched(true);
    setServerErrors({});
    setStatus(null);

    const result = validateContactForm({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      subject: composedSubject,
      message: values.message
    });

    setValues((current) => ({ ...current, ...result.values }));

    if (!result.isValid || contextError) {
      setServerErrors(result.errors);
      setStatus({ type: "error", message: "Please correct the highlighted fields before submitting." });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...result.values,
          membershipType: ROLE_TO_MEMBERSHIP_TYPE[role],
          context: values.context.trim().replace(/\s+/g, " "),
          website: ""
        })
      });

      // API envelope: { ok: true, data: { message } } | { ok: false, error: { code, message, details? } }
      const payload = (await response.json().catch(() => null)) as
        | { ok: true; data: { message?: string } }
        | { ok: false; error: { code: string; message: string; details?: ContactErrors } }
        | null;

      if (!response.ok || !payload || payload.ok === false) {
        const errorPayload = payload && payload.ok === false ? payload.error : null;
        if (errorPayload?.details && typeof errorPayload.details === "object") {
          setServerErrors(errorPayload.details as ContactErrors);
        }
        setStatus({
          type: "error",
          message:
            errorPayload?.message ??
            "Your application could not be sent. Please try again."
        });
        return;
      }

      setValues(emptyMembership);
      setTouched(allUntouched);
      setContextTouched(false);
      setStatus({
        type: "success",
        message:
          payload.data?.message ??
          "Your application has been sent successfully. We'll be in touch soon."
      });
    } catch {
      setStatus({ type: "error", message: "Network error. Please check your connection and try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="contact-form member-form"
      noValidate
      onSubmit={handleSubmit}
      aria-label={`${tab.label} membership application`}
    >
      {status ? (
        <div
          className={`form-notice form-notice--${status.type}`}
          role={status.type === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          {status.message}
        </div>
      ) : null}

      <div className="contact-form-row">
        <FieldControl
          field="firstName"
          label={fieldLabels.firstName}
          value={values.firstName}
          error={fieldError("firstName")}
          placeholder="First Name"
          autoComplete="given-name"
          onBlur={() => trimField("firstName")}
          onChange={updateField}
        />
        <FieldControl
          field="lastName"
          label={fieldLabels.lastName}
          value={values.lastName}
          error={fieldError("lastName")}
          placeholder="Last Name"
          autoComplete="family-name"
          onBlur={() => trimField("lastName")}
          onChange={updateField}
        />
      </div>

      <div className="contact-form-row">
        <FieldControl
          field="email"
          label={fieldLabels.email}
          type="email"
          value={values.email}
          error={fieldError("email")}
          placeholder="you@example.com"
          autoComplete="email"
          onBlur={() => trimField("email")}
          onChange={updateField}
        />
        <FieldControl
          field="phone"
          label={fieldLabels.phone}
          type="tel"
          value={values.phone}
          error={fieldError("phone")}
          placeholder="+91XXXXXXXXXX"
          autoComplete="tel"
          inputMode="tel"
          onBlur={() => trimField("phone")}
          onChange={updateField}
        />
      </div>

      <label className="contact-field">
        <span>{tab.contextLabel}</span>
        <input
          type="text"
          aria-label={tab.contextLabel}
          aria-describedby={showContextError ? "context-error" : undefined}
          aria-invalid={Boolean(showContextError)}
          className={showContextError ? "is-invalid" : undefined}
          value={values.context}
          placeholder={tab.contextPlaceholder}
          onBlur={trimContext}
          onChange={(event) => updateContext(event.target.value)}
        />
        {showContextError ? (
          <span className="field-error" id="context-error" role="alert">
            {showContextError}
          </span>
        ) : null}
      </label>

      <label className="contact-field">
        <span>{tab.messageLabel}</span>
        <textarea
          aria-label={tab.messageLabel}
          aria-describedby={fieldError("message") ? "message-error" : undefined}
          aria-invalid={Boolean(fieldError("message"))}
          className={fieldError("message") ? "is-invalid" : undefined}
          rows={6}
          value={values.message}
          placeholder={tab.messagePlaceholder}
          onBlur={() => trimField("message")}
          onChange={(event) => updateField("message", event.target.value)}
        />
        {fieldError("message") ? (
          <span className="field-error" id="message-error" role="alert">
            {fieldError("message")}
          </span>
        ) : null}
      </label>

      <input
        className="contact-honeypot"
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <button type="submit" disabled={isSubmitDisabled} aria-busy={isSubmitting}>
        {isSubmitting ? "Submitting..." : tab.buttonLabel}
      </button>
    </form>
  );
}

function validateContext(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "This field is required.";
  if (trimmed.length < 2) return "Please enter at least 2 characters.";
  if (trimmed.length > 150) return "Please keep this under 150 characters.";
  return undefined;
}

type FieldControlProps = {
  field: Exclude<ContactField, "message" | "subject">;
  label: string;
  value: string;
  error?: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "url" | "numeric" | "decimal" | "search";
  onBlur: () => void;
  onChange: (field: ContactField, value: string) => void;
};

function FieldControl({
  field,
  label,
  value,
  error,
  placeholder,
  type = "text",
  autoComplete,
  inputMode,
  onBlur,
  onChange
}: FieldControlProps) {
  const errorId = `${field}-error`;

  return (
    <label className="contact-field">
      <span>{label}</span>
      <input
        type={type}
        aria-label={label}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        className={error ? "is-invalid" : undefined}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        onBlur={onBlur}
        onChange={(event) => onChange(field, event.target.value)}
      />
      {error ? (
        <span className="field-error" id={errorId} role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}
