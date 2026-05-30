export const CONTACT_FIELDS = ["firstName", "lastName", "email", "phone", "subject", "message"] as const;

export type ContactField = (typeof CONTACT_FIELDS)[number];
export type ContactFormValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const MEMBERSHIP_TYPES = ["student", "professional", "board"] as const;
export type MembershipType = (typeof MEMBERSHIP_TYPES)[number];

export type MembershipExtras = {
  membershipType: MembershipType;
  context: string;
};
export type MembershipFormValues = ContactFormValues & MembershipExtras;
export type MembershipErrors = ContactErrors &
  Partial<Record<"membershipType" | "context", string>>;
export type MembershipValidationResult = {
  values: MembershipFormValues;
  errors: MembershipErrors;
  isValid: boolean;
};

export type ContactValidationResult = {
  values: ContactFormValues;
  errors: ContactErrors;
  isValid: boolean;
};

// Letters with optional internal space, apostrophe, or hyphen (e.g. "Mary-Anne", "O'Connor").
const NAME_PATTERN = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;
// University / company / organization: letters, numbers, spaces and a small set of punctuation.
const CONTEXT_PATTERN = /^[A-Za-z0-9 &.,'-]+$/;
const LOCAL_PART_PATTERN = new RegExp("^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$");
const DOMAIN_LABEL_PATTERN = /^[a-z0-9-]+$/i;
const TLD_PATTERN = /^[a-z]{2,24}$/;
const REPEATED_TEXT_PATTERN = /([A-Za-z0-9])\1{5,}/;

// Patterns that indicate XSS / HTML / script / SQL / encoded payloads. Used to reject
// free-text fields (message, subject) that cannot rely on a strict character allowlist.
const UNSAFE_CONTENT_PATTERNS: RegExp[] = [
  /<[^>]*>/, // any HTML / SVG / iframe tag
  /<\s*\/?\s*[a-z]/i, // partial or opening tag such as "<script"
  /javascript:/i, // javascript: URLs
  /\bon[a-z]+\s*=/i, // inline event handlers (onerror=, onclick=)
  /data:\s*text\/html/i, // data: URI carrying HTML
  /&#x?[0-9a-f]+;?/i, // numeric / hex HTML entities (encoded payloads)
  /\\x[0-9a-f]{2}|\\u[0-9a-f]{4}/i, // hex / unicode escape payloads
  /\b(?:union\s+select|insert\s+into|drop\s+table|select\s+.*\s+from|delete\s+from|update\s+.+\s+set)\b/i // SQL
];

function hasUnsafeContent(value: string) {
  return UNSAFE_CONTENT_PATTERNS.some((pattern) => pattern.test(value));
}

export const emptyContactFormValues: ContactFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  message: ""
};

// ---------------------------------------------------------------------------
// Real-time input sanitizers — used by the client to filter characters as the
// user types so disallowed input never reaches the field in the first place.
// ---------------------------------------------------------------------------

const NAME_MAX = 15;
const CONTEXT_MAX = 80;
export const PHONE_MAX_DIGITS = 15;

/** Keep an optional leading "+" and digits only; cap to E.164 max length. */
export function sanitizePhoneInput(raw: string) {
  const hasLeadingPlus = raw.trimStart().startsWith("+");
  const digits = raw.replace(/\D/g, "").slice(0, PHONE_MAX_DIGITS);
  return (hasLeadingPlus ? "+" : "") + digits;
}

/** Keep letters plus internal spaces, apostrophes and hyphens. */
export function sanitizeNameInput(raw: string) {
  return stripUnsafeControlChars(raw)
    .replace(/[^A-Za-z '-]/g, "")
    .replace(/\s{2,}/g, " ")
    .slice(0, NAME_MAX);
}

/** Keep letters, numbers, spaces and the small university punctuation set. */
export function sanitizeContextInput(raw: string) {
  return stripUnsafeControlChars(raw)
    .replace(/[^A-Za-z0-9 &.,'-]/g, "")
    .replace(/\s{2,}/g, " ")
    .slice(0, CONTEXT_MAX);
}

/**
 * Free-text (message) sanitizer: preserves normal prose and line breaks but
 * strips code/markup characters that have no place in a message and are common
 * injection vectors (angle brackets, braces, backtick, backslash).
 */
export function sanitizeMessageInput(raw: string) {
  return stripUnsafeControlChars(raw).replace(/[<>{}`\\]/g, "");
}

/** Truncate free text to at most `max` words (preserving the original spacing). */
export function limitWords(raw: string, max: number) {
  const pattern = /\S+/g;
  let count = 0;
  let endIndex = raw.length;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(raw)) !== null) {
    count += 1;
    if (count === max) {
      endIndex = match.index + match[0].length;
      break;
    }
  }
  if (count < max) return raw;
  // Keep any trailing whitespace the user just typed after the last allowed word.
  const trailing = raw.slice(endIndex).match(/^\s+/)?.[0] ?? "";
  return raw.slice(0, endIndex) + trailing;
}

function readValue(input: Partial<Record<ContactField, unknown>>, field: ContactField) {
  const value = input[field];
  return typeof value === "string" ? value : "";
}

function stripUnsafeControlChars(value: string) {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
}

function normalizeText(value: string) {
  return stripUnsafeControlChars(value).trim().replace(/\s+/g, " ");
}

// Like normalizeText but preserves line breaks (for textarea fields such as the message).
function normalizeMultiline(value: string) {
  return stripUnsafeControlChars(value)
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/[ \t]*\n[ \t]*/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function countWords(value: string) {
  const words = value.match(/[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)?/g);
  return words?.length ?? 0;
}

function hasRepeatedSpam(value: string) {
  return REPEATED_TEXT_PATTERN.test(value);
}

function validateName(value: string, label: string) {
  if (!value) {
    return `${label} is required.`;
  }

  if (value.length < 2) {
    return `${label} must be at least 2 characters.`;
  }

  if (value.length > 15) {
    return `${label} must be 15 characters or fewer.`;
  }

  if (!NAME_PATTERN.test(value)) {
    return `${label} can contain letters, spaces, apostrophes and hyphens only.`;
  }

  return undefined;
}

function validateEmail(value: string) {
  if (!value) {
    return "Email address is required.";
  }

  if (value.length > 254) {
    return "Email address must be 254 characters or fewer.";
  }

  if (/\s/.test(value)) {
    return "Email address cannot contain spaces.";
  }

  const parts = value.split("@");
  if (parts.length !== 2) {
    return "Email address must contain exactly one @ symbol.";
  }

  const [localPart, domain] = parts;
  if (!localPart || !domain) {
    return "Enter a complete email address.";
  }

  if (localPart.length > 64) {
    return "The part before @ must be 64 characters or fewer.";
  }

  if (value.includes("..")) {
    return "Email address cannot contain consecutive dots.";
  }

  if (localPart.startsWith(".") || localPart.endsWith(".")) {
    return "The part before @ cannot start or end with a dot.";
  }

  if (!LOCAL_PART_PATTERN.test(localPart)) {
    return "Email address contains invalid characters.";
  }

  if (domain.length > 253 || domain.startsWith(".") || domain.endsWith(".")) {
    return "Enter a valid email domain.";
  }

  const labels = domain.split(".");
  if (labels.length < 2) {
    return "Email address must include a valid domain extension.";
  }

  for (const label of labels) {
    if (!label || label.length > 63 || !DOMAIN_LABEL_PATTERN.test(label)) {
      return "Enter a valid email domain.";
    }

    if (label.startsWith("-") || label.endsWith("-")) {
      return "Domain labels cannot start or end with a hyphen.";
    }
  }

  const tld = labels[labels.length - 1];
  if (!TLD_PATTERN.test(tld)) {
    return "Email address must include a valid domain extension.";
  }

  return undefined;
}

function validatePhone(value: string) {
  if (!value) {
    return "Phone number is required.";
  }

  if (/\s/.test(value)) {
    return "Phone number cannot contain spaces.";
  }

  if (!/^\+?\d+$/.test(value)) {
    return "Phone number can contain digits only, with an optional leading +.";
  }

  const digits = value.startsWith("+") ? value.slice(1) : value;
  if (digits.length < 7) {
    return "Phone number must contain at least 7 digits.";
  }

  if (digits.length > 15) {
    return "Phone number must contain no more than 15 digits.";
  }

  if (/^(\d)\1+$/.test(digits)) {
    return "Enter a valid phone number.";
  }

  return undefined;
}

function validateSubject(value: string) {
  if (!value) {
    return "Subject is required.";
  }

  if (value.length > 180) {
    return "Subject is too long.";
  }

  if (countWords(value) > 20) {
    return "Subject must be 20 words or fewer.";
  }

  if (hasUnsafeContent(value)) {
    return "Subject contains characters that are not allowed.";
  }

  if (hasRepeatedSpam(value)) {
    return "Subject contains spam-like repeated characters.";
  }

  return undefined;
}

export const MESSAGE_MAX_WORDS = 200;

function validateMessage(value: string) {
  if (!value) {
    return "Message is required.";
  }

  if (value.length < 5) {
    return "Message must be at least 5 characters.";
  }

  if (value.length > 2000) {
    return "Message is too long.";
  }

  if (countWords(value) > MESSAGE_MAX_WORDS) {
    return `Message must be ${MESSAGE_MAX_WORDS} words or fewer.`;
  }

  if (hasUnsafeContent(value)) {
    return "Message contains characters that are not allowed.";
  }

  if (hasRepeatedSpam(value)) {
    return "Message contains spam-like repeated characters.";
  }

  return undefined;
}

export function validateContext(value: string) {
  const trimmed = normalizeText(value);
  if (!trimmed) return "This field is required.";
  if (trimmed.length < 3) return "Please enter between 3 and 80 characters.";
  if (trimmed.length > 80) return "Please enter between 3 and 80 characters.";
  if (!CONTEXT_PATTERN.test(trimmed)) {
    return "Only letters, numbers, spaces and & . , ' - are allowed.";
  }
  if (hasUnsafeContent(trimmed)) {
    return "This field contains characters that are not allowed.";
  }
  if (hasRepeatedSpam(trimmed)) return "Contains spam-like repeated characters.";
  return undefined;
}

function validateMembershipType(value: unknown): MembershipType | undefined {
  if (typeof value !== "string") return undefined;
  return (MEMBERSHIP_TYPES as readonly string[]).includes(value)
    ? (value as MembershipType)
    : undefined;
}

export function validateMembershipForm(
  input: Partial<Record<string, unknown>>
): MembershipValidationResult {
  const base = validateContactForm(input);
  const context = normalizeText(typeof input.context === "string" ? input.context : "");
  const membershipType = validateMembershipType(input.membershipType);

  const errors: MembershipErrors = { ...base.errors };

  const contextErr = validateContext(context);
  if (contextErr) errors.context = contextErr;
  if (!membershipType) errors.membershipType = "Please choose a membership type.";

  return {
    values: {
      ...base.values,
      context,
      membershipType: membershipType ?? ("student" as MembershipType)
    },
    errors,
    isValid: Object.keys(errors).length === 0 && Boolean(membershipType)
  };
}

export function validateContactForm(input: Partial<Record<ContactField, unknown>>): ContactValidationResult {
  const values: ContactFormValues = {
    firstName: normalizeText(readValue(input, "firstName")),
    lastName: normalizeText(readValue(input, "lastName")),
    email: normalizeText(readValue(input, "email")).toLowerCase(),
    phone: normalizeText(readValue(input, "phone")),
    subject: normalizeText(readValue(input, "subject")),
    message: normalizeMultiline(readValue(input, "message"))
  };

  const errors: ContactErrors = {};

  errors.firstName = validateName(values.firstName, "First name");
  errors.lastName = validateName(values.lastName, "Last name");
  errors.email = validateEmail(values.email);
  errors.phone = validatePhone(values.phone);
  errors.subject = validateSubject(values.subject);
  errors.message = validateMessage(values.message);

  for (const field of CONTACT_FIELDS) {
    if (!errors[field]) {
      delete errors[field];
    }
  }

  return {
    values,
    errors,
    isValid: Object.keys(errors).length === 0
  };
}
