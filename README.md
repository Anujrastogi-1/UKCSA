# UK Cloud Security Alliance

Website for the Cloud Security Alliance Uttarakhand Chapter. The project is built with Next.js and includes the public chapter pages, board member profiles, past event information, a contact page, shared layout components, and a MongoDB-backed API for chapter updates.

## Features

- Homepage for CSA Uttarakhand Chapter with hero, stats, membership benefits, leadership, and community links.
- Static content pages for About Us, Board of Directors, Past Events, and Contact Us.
- Shared header, footer, and page hero components.
- Responsive styling with custom local Calibri font files.
- Image assets for logos, events, board members, and icons.
- API endpoint at `/api/chapter-updates` for fetching recent chapter updates from MongoDB.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Mongoose / MongoDB
- Lucide React icons

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app in your browser:

```text
http://localhost:3000
```

## Environment Variables

Create a `.env.local` file in the project root if you want to enable MongoDB-backed chapter updates and contact email delivery:

```env
MONGODB_URI=your_mongodb_connection_string
EMAIL_USER=your_smtp_email_address
EMAIL_PASS=your_smtp_app_password
CONTACT_RECEIVER=contact_form_receiver_address
```

If `MONGODB_URI` is not configured, `/api/chapter-updates` returns an unauthenticated response with an empty updates list.
If the email variables are not configured, `/api/contact` validates requests but returns a configuration error before attempting delivery.

## Available Scripts

```bash
npm run dev
```

Starts the local development server.

```bash
npm run build
```

Builds the production application.

```bash
npm run start
```

Runs the production build.

## Project Structure

```text
app/
  api/chapter-updates/   API route for chapter updates
  api/contact/           API route for validated contact form emails
  about-us/              About page
  board-of-directors/    Board member page
  contact/               Contact page
  past-events/           Past events page
  components.tsx         Shared Header, Footer, and PageHero components
  globals.css            Global styling
  layout.tsx             Root layout and metadata
  page.tsx               Homepage
lib/
  contactValidation.ts   Shared frontend/backend contact form validation
  db.ts                  MongoDB connection helper
models/
  ChapterUpdate.ts       Mongoose model for chapter updates
public/
  assets/                Fonts, images, icons, event media, and board photos
```

## Chapter Update Data Model

Chapter updates use the `ChapterUpdate` Mongoose model:

```ts
{
  title: string;
  body: string;
  publishedAt: Date;
}
```

The API returns the 10 most recent updates sorted by `publishedAt` in descending order.

## Deployment

This is a standard Next.js application and can be deployed to platforms such as Vercel, Netlify, or any Node.js hosting environment that supports Next.js. For production deployments, configure `MONGODB_URI` in the hosting provider's environment settings if the chapter updates API should connect to MongoDB. Configure `EMAIL_USER`, `EMAIL_PASS`, and `CONTACT_RECEIVER` in the hosting provider's environment settings for contact form email delivery.
