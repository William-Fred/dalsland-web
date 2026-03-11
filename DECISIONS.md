# Technical Choices and Decisions — Dalsland Web

Here we document the choices we have faced, their pros and cons, and the decision we made.

See [README.md](./README.md) for how to run the project locally.

---

## Summary of decisions made

| Area | Decision |
|---|---|
| Hosting (app) | Vercel |
| Hosting (database) | Neon (serverless Postgres) |
| Database client | postgres.js with manual SQL migrations |
| Auth | Auth.js with credentials + users table |
| Map | Leaflet.js |
| CI/CD | GitHub Actions (build check) + Vercel auto-deploy |
| Branch strategy | `feat/**` → PR → main, branch protection in GitHub |
| DB migrations | Manual with `drizzle-kit migrate` |
| Email | Not decided — Resend recommended |

---

## Hosting of Next.js

### Option A: Vercel ✅
Next.js deploys natively without Docker. Deploy via git push.

**Pros**
- Free to start
- Zero server management
- Built-in integration with Neon (Postgres)
- Automatic deploy on push to main
- Preview deploy per PR

**Cons**
- No support for Docker containers
- Free tier has limitations (bandwidth, serverless cold starts)

### Option B: Fly.io / Railway (Docker)

**Pros**
- Docker all the way
- More control, easier to move to a VPS

**Cons**
- More setup, Railway requires a paid plan after a while

---

## Hosting of Postgres

### Option A: Neon ✅

**Pros**
- Free
- No server management
- `DATABASE_URL` is injected automatically via Vercel integration

**Cons**
- Serverless — connection pooling needed (Neon adapter for Drizzle)

### Option B: Supabase

**Pros:** Built-in auth, good dashboard
**Cons:** More than we need, vendor lock-in

### Option C: Postgres in Docker (VPS)

**Pros:** Full control
**Cons:** Requires managing backups yourself

---

## Database client and migrations

### Option A: Drizzle ORM

**Pros:** Automatic migration generation from TypeScript schema, type checking
**Cons:** Abstraction on top of SQL, you write TS syntax instead of SQL

### Option B: postgres.js (raw SQL) ✅

Writes SQL directly with tagged template literals. Migrations are numbered `.sql` files run in order by a custom script.

```ts
const rows = await sql<Booking[]>`
  SELECT * FROM bookings WHERE status = 'pending'
`
```

**Pros**
- Writes plain SQL — full control, no abstractions
- Migration history is readable (one SQL file per change)
- The same file is never run twice — tracked in `migrations` table
- Familiar feel for anyone who knows SQL

**Cons**
- No auto-generated types from schema — types written manually
- Migrations created manually

### Option C: Kysely (type-safe query builder)

**Pros:** Automatic types, close to SQL syntax
**Cons:** Additional dependency, more setup

---

## Authentication

### Option A: Simple password via environment variable

**Pros:** Extremely simple
**Cons:** No user management, everyone shares the password

### Option B: Auth.js (NextAuth v5) ✅
Email + password in `users` table with roles (admin/user).

**Pros**
- Proper user management with roles
- Easy to extend with Google login
- Good integration with Next.js App Router and middleware

**Cons:** More setup than Option A

---

## CI/CD and branch strategy

### Decision ✅

- Feature branches are named `feat/<description>`
- No direct push to `main` — branch protection set in GitHub
- GitHub Actions runs `npm run build` on push to `feat/**`, `main`, and on PRs against `main`
- Vercel deploys automatically on merge to `main`
- Every PR gets a unique preview URL from Vercel

```
feat/my-branch → push → pipeline runs → PR → preview URL → merge → prod
```

---

## Database migrations in production

### Option A: Manual ✅
Run `npx drizzle-kit migrate` after merging to main.

**Pros:** Simple, full control
**Cons:** Can be forgotten

### Option B: Automatic via GitHub Actions
CI runs migrations against the prod database after deploy.

**Pros:** Cannot be forgotten
**Cons:** Requires `DATABASE_URL` as a GitHub Secret

---

## Map service

### Option A: Leaflet.js ✅

**Pros:** Free, no API key required, works with Next.js via dynamic import
**Cons:** Slightly more manual than Google Maps

### Option B: Google Maps / Mapbox

**Pros:** Better looking, more features
**Cons:** Requires API key and credit card

---

## Email notifications

### Option A: Resend (recommended)

**Pros:** Free 3,000 emails/month, simple API
**Cons:** Requires domain verification

### Option B: Nodemailer + SMTP

**Pros:** No external services
**Cons:** Gmail SMTP is finicky, more configuration

**Status: Not decided.**
