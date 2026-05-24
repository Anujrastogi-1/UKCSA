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

const NAME_PATTERN = /^[A-Za-z]+$/;
const LOCAL_PART_PATTERN = new RegExp("^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$");
const DOMAIN_LABEL_PATTERN = /^[a-z0-9-]+$/i;
const TLD_PATTERN = /^[a-z]{2,24}$/;
const REPEATED_TEXT_PATTERN = /([A-Za-z0-9])\1{5,}/;

export const emptyContactFormValues: ContactFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  message: ""
};

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

function countWords(value: string) {
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

  if (value.length > 25) {
    return `${label} must be 25 characters or fewer.`;
  }

  if (!NAME_PATTERN.test(value)) {
    return `${label} can contain letters only.`;
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
  if (digits.length < 10) {
    return "Phone number must contain at least 10 digits.";
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

  if (hasRepeatedSpam(value)) {
    return "Subject contains spam-like repeated characters.";
  }

  return undefined;
}

function validateMessage(value: string) {
  if (!value) {
    return "Message is required.";
  }

  if (value.length > 1000) {
    return "Message is too long.";
  }

  if (countWords(value) > 50) {
    return "Message must be 50 words or fewer.";
  }

  if (countWords(value) < 3 || value.replace(/[^A-Za-z0-9]/g, "").length < 10) {
    return "Message must include at least 3 meaningful words.";
  }

  if (hasRepeatedSpam(value)) {
    return "Message contains spam-like repeated characters.";
  }

  return undefined;
}

function validateContext(value: string) {
  if (!value) return "This field is required.";
  if (value.length < 2) return "Please enter at least 2 characters.";
  if (value.length > 150) return "Please keep this under 150 characters.";
  if (hasRepeatedSpam(value)) return "Contains spam-like repeated characters.";
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
    message: normalizeText(readValue(input, "message"))
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
