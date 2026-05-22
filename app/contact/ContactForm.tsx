"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  CONTACT_FIELDS,
  ContactErrors,
  ContactField,
  ContactFormValues,
  emptyContactFormValues,
  validateContactForm
} from "../../lib/contactValidation";

type FormStatus = {
  type: "success" | "error";
  message: string;
} | null;

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

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(emptyContactFormValues);
  const [touched, setTouched] = useState<Record<ContactField, boolean>>(
    CONTACT_FIELDS.reduce((fields, field) => ({ ...fields, [field]: false }), {} as Record<ContactField, boolean>)
  );
  const [serverErrors, setServerErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<FormStatus>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validation = useMemo(() => validateContactForm(values), [values]);
  const errors = { ...validation.errors, ...serverErrors };
  const isSubmitDisabled = isSubmitting || !validation.isValid;

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

  const trimField = (field: ContactField) => {
    const nextValues = validateContactForm(values).values;
    setValues((current) => ({ ...current, [field]: nextValues[field] }));
    setTouched((current) => ({ ...current, [field]: true }));
  };

  const fieldError = (field: ContactField) => (touched[field] ? errors[field] : undefined);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(touchedAllFields);
    setServerErrors({});
    setStatus(null);

    const result = validateContactForm(values);
    setValues(result.values);

    if (!result.isValid) {
      setServerErrors(result.errors);
      setStatus({ type: "error", message: "Please correct the highlighted fields before sending." });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...result.values, website: "" })
      });
      const data = (await response.json().catch(() => null)) as {
        message?: string;
        errors?: ContactErrors;
      } | null;

      if (!response.ok) {
        if (data?.errors) {
          setServerErrors(data.errors);
        }

        setStatus({
          type: "error",
          message: data?.message ?? "Your message could not be sent. Please try again."
        });
        return;
      }

      setValues(emptyContactFormValues);
      setTouched(CONTACT_FIELDS.reduce((fields, field) => ({ ...fields, [field]: false }), {} as Record<ContactField, boolean>));
      setStatus({ type: "success", message: data?.message ?? "Your message has been sent successfully." });
    } catch {
      setStatus({ type: "error", message: "Network error. Please check your connection and try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form" noValidate onSubmit={handleSubmit}>
      {status ? (
        <div className={`form-notice form-notice--${status.type}`} role={status.type === "error" ? "alert" : "status"} aria-live="polite">
          {status.message}
        </div>
      ) : null}

      <div className="contact-form-row">
        <ContactFieldControl
          field="firstName"
          label={fieldLabels.firstName}
          value={values.firstName}
          error={fieldError("firstName")}
          placeholder="First Name"
          autoComplete="given-name"
          onBlur={() => trimField("firstName")}
          onChange={updateField}
        />
        <ContactFieldControl
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
        <ContactFieldControl
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
        <ContactFieldControl
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

      <ContactFieldControl
        field="subject"
        label={fieldLabels.subject}
        value={values.subject}
        error={fieldError("subject")}
        placeholder="How can we help you?"
        onBlur={() => trimField("subject")}
        onChange={updateField}
      />

      <label className="contact-field">
        <span>{fieldLabels.message}</span>
        <textarea
          aria-label="Your Message"
          aria-describedby={fieldError("message") ? "message-error" : undefined}
          aria-invalid={Boolean(fieldError("message"))}
          className={fieldError("message") ? "is-invalid" : undefined}
          rows={6}
          value={values.message}
          placeholder="Tell us more about your inquiry..."
          onBlur={() => trimField("message")}
          onChange={(event) => updateField("message", event.target.value)}
        />
        {fieldError("message") ? (
          <span className="field-error" id="message-error" role="alert">
            {fieldError("message")}
          </span>
        ) : null}
      </label>

      <input className="contact-honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button type="submit" disabled={isSubmitDisabled} aria-busy={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

type ContactFieldControlProps = {
  field: Exclude<ContactField, "message">;
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

function ContactFieldControl({
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
}: ContactFieldControlProps) {
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
