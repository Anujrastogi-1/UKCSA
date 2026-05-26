# CSA Uttarakhand Chapter

Website for the **Cloud Security Alliance — Uttarakhand Chapter**. It combines a public marketing site (home, about, board, events, membership) with a secure **admin dashboard** for managing membership applications, backed by a PostgreSQL database via Prisma.

Production: **https://uk.cloudsecurityalliance.in**

## Features

**Public site**
- Homepage with hero, focus areas, membership benefits, and community links.
- About Us, Board of Directors, Membership info, and a **Become a Member** application form with role-based flows (Student / Professional / Board Member).
- **Past Events** with an auto-scrolling showcase, featured conference cards, and per-event photo galleries (`/past-events/[slug]`) with a lightbox.
- Shared header, footer, and page-hero components.

**Membership applications**
- Submissions are validated, persisted to PostgreSQL, optionally mirrored to **Google Sheets**, and an **email notification** is sent (both are best-effort and skipped cleanly when not configured).
- Per-IP rate limiting and a honeypot field to deter spam.

**Admin dashboard** (`/admin`)
- JWT cookie-based authentication with a seeded first admin and forced password change on first login.
- Membership submissions table with filters (type / recency), search, sortable columns, pagination, and **CSV export**.

**SEO & performance**
- Centralized metadata utility and canonical domain (`lib/seo.ts`), JSON-LD structured data (Organization, WebSite, Event, BreadcrumbList) via `lib/structuredData.ts`.
- Dynamic `sitemap.xml` and `robots.txt`, per-page OpenGraph/Twitter cards, single H1 per page.
- Lightweight CSS scroll-reveal (no animation library), route-scoped CSS, and `next/image` + `next/font` optimization.

## Tech Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Prisma 6** ORM with **PostgreSQL**
- **jose** (JWT sessions) + **bcryptjs** (password hashing)
- **nodemailer** (email) + **@googleapis/sheets** (Sheets sync)
- **lucide-react** icons; local Calibri font + Inter/Manrope (events page)

## Getting Started

### Prerequisites
- Node.js 18.18+ (Node 20+ recommended)
- A PostgreSQL database

### Install

```bash
npm install
```

`postinstall` runs `prisma generate` automatically.

### Configure the database

Create a `.env` file (see [Environment Variables](#environment-variables)), then create the schema:

```bash
npx prisma db push      # or: npx prisma migrate dev --name init
```

### Run the dev server

```bash
npm run dev
```

Open http://localhost:3000. The admin dashboard is at http://localhost:3000/admin (the first admin is seeded from `ADMIN_*` env vars on first login).

## Environment Variables

Create a `.env` file in the project root. **Never commit this file** — it is gitignored.

```env
# ── Database (required) ──────────────────────────────────────────────
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/ukcsa?schema=public"

# ── Canonical site URL for SEO (canonical/OG/sitemap/robots) ─────────
# Falls back to https://uk.cloudsecurityalliance.in if unset.
NEXT_PUBLIC_SITE_URL=https://uk.cloudsecurityalliance.in

# ── Auth (required) ──────────────────────────────────────────────────
# Generate: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your_64_byte_hex_secret

# ── First-admin seed (used once on first login) ──────────────────────
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_temporary_password
ADMIN_EMAIL=admin@example.com

# ── Google Sheets sync (optional) ────────────────────────────────────
GOOGLE_SHEETS_ID=your_sheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=service-account@your-project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# ── Contact/membership email via Gmail (optional) ────────────────────
# EMAIL_PASS must be a Gmail App Password (not your account password).
EMAIL_USER=youraddress@gmail.com
EMAIL_PASS=your_16_char_app_password
CONTACT_RECEIVER=membership@example.com
```

The Google Sheets and email integrations are optional: when their variables are missing or left as placeholders, those steps are skipped gracefully and the application still saves to the database.

## Available Scripts

```bash
npm run dev                  # Start the development server
npm run build                # prisma generate && next build
npm run start                # Run the production build
npm run db:migrate-from-mongo  # One-off migration of legacy MongoDB data → PostgreSQL
```

## Project Structure

```text
app/
  admin/                 Admin dashboard (layout, login, password, scoped admin.css)
  api/
    admin/               Auth + membership management endpoints (JWT-protected)
    contact/             Membership application intake (DB + Sheets + email)
    chapter-updates/     Public chapter-updates endpoint
  about-us/ board-of-directors/ membership-info/ contact/
  past-events/           Events listing + [slug] photo galleries
  login/ signup/         Auth entry (signup redirects to login)
  components.tsx         Header, Footer, PageHero
  JsonLd.tsx             Reusable JSON-LD injector
  Reveal.tsx             IntersectionObserver scroll-reveal (replaces framer-motion)
  layout.tsx page.tsx globals.css robots.ts sitemap.ts
lib/
  seo.ts                 Site config + buildMetadata() utility
  structuredData.ts      schema.org builders (Organization/WebSite/Event/Breadcrumb)
  db.ts                  Prisma client
  auth.ts adminGuard.ts  JWT sessions + route protection
  seedAdmin.ts           First-admin bootstrap
  rateLimit.ts apiResponse.ts contactValidation.ts googleSheets.ts
prisma/
  schema.prisma          Member, Admin, ChapterUpdate models (PostgreSQL)
scripts/
  migrate-mongo-to-postgres.mjs
public/assets/           Fonts, logos, event media, and board photos
```

## Data Models

Defined in `prisma/schema.prisma` (PostgreSQL):

- **Member** — membership applications (type, name, email, phone, context, subject, message, status, sheet-sync flag, timestamps).
- **Admin** — dashboard users (username, email, password hash, `mustChangePassword`, last-login metadata).
- **ChapterUpdate** — chapter news/updates (title, body, publish date).

## Deployment (Vercel)

1. Connect the repository to Vercel.
2. Set the environment variables above in **Project → Settings → Environment Variables** (including `DATABASE_URL` and `NEXT_PUBLIC_SITE_URL`).
3. The build runs `prisma generate && next build`. Apply the schema to your production database with `prisma migrate deploy` (or `prisma db push`).
4. After deploy, verify `/<domain>/robots.txt` and `/<domain>/sitemap.xml`, and submit the sitemap in Google Search Console.

Security headers (HSTS, X-Frame-Options, etc.) are configured in `next.config.ts`, and `/admin` and `/api/*` are excluded from indexing.
