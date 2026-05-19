# CSA Uttarakhand Chapter

Next.js clone of `uk.cloudsecurityalliance.in`, using the same single-app structure as your other project: `app`, `lib`, `models`, `public`, and API routes inside Next.js.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## MongoDB

Add `.env.local` when you want database-backed chapter updates:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/csa-uttarakhand
```

If `MONGODB_URI` is missing, the API returns the same login/authentication notice shown on the original website.
