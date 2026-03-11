# Claude Project Context — Dalsland Web

## What this project is

A booking site for renting a cabin in Dalsland, Sweden. Guests view the property, explore nearby activities, and submit booking requests. Owners manage bookings and content via a role-protected admin view.

## Key documentation

- [README.md](./README.md) — setup, commands, branch strategy
- [ARCHITECTURE.md](./ARCHITECTURE.md) — tech stack, page routes, DB schema, CI/CD flow
- [DECISIONS.md](./DECISIONS.md) — why each technology was chosen (pros/cons)
- [ROADMAP.md](./ROADMAP.md) — milestone-based feature checklist

## Tech stack (quick reference)

| Concern | Choice |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL — Neon (prod), Docker (local) |
| DB client | postgres.js with raw SQL + numbered `.sql` migration files |
| Auth | Auth.js (NextAuth v5), credentials provider, roles: `admin` / `user` |
| Map | Leaflet.js (dynamic import for SSR safety) |
| Hosting | Vercel |
| CI/CD | GitHub Actions (lint + build) + Vercel preview/prod deploys |

## Repo structure

The repo root and the Next.js app share the same name. The git repo is `dalsland-web/`; the Next.js project was initialized inside it as a subdirectory, also named `dalsland-web/`. This is intentional — the root holds shared config (Docker, CI, docs) while the app is self-contained inside.

```
dalsland-web/               ← git root — docker-compose, CI, docs
└── dalsland-web/           ← Next.js app root — all npm commands run here
    ├── app/                ← App Router pages and API routes
    ├── db/
    │   ├── index.ts        ← postgres.js connection
    │   ├── migrate.ts      ← migration runner
    │   └── migrations/     ← numbered .sql files (never edit after applied)
    ├── middleware.ts        ← protects /admin/** via Auth.js session
    └── .env.local          ← gitignored, required for local dev
```

**Command roots:**
- `docker compose up -d` → run from **git root** (`dalsland-web/`)
- `npm run dev / build / lint / migrate` → run from **app root** (`dalsland-web/dalsland-web/`)

## Current state

Actively working on: **Milestone 1 — Database and auth** (not yet started).

Completed:
- Next.js + Tailwind initialized
- GitHub Actions pipeline (lint + build on push/PR)

Pending (in order):
1. Install postgres.js, tsx; create `db/index.ts` and `db/migrate.ts`
2. Docker Compose for local Postgres + `.env.local`
3. SQL migrations (users, bookings, blocked_dates, attractions)
4. Auth.js setup — login page, middleware, seed script for first admin

Everything from Milestone 2 onward (landing page, booking page, admin view) is not started. See [ROADMAP.md](./ROADMAP.md) for the full checklist.

## Coding conventions

- **Raw SQL only** — use postgres.js tagged template literals. No ORM, no query builder.
- **No `any` in TypeScript** — define explicit types for all DB row shapes.
- **App Router conventions** — use `page.tsx`, `layout.tsx`, `route.ts` (not Pages Router patterns).
- **Server Components by default** — only add `"use client"` when interactivity requires it.
- **Tailwind for all styling** — no CSS modules, no inline styles, no separate `.css` files beyond globals.
- **Leaflet via dynamic import** — always `next/dynamic` with `ssr: false` to avoid SSR errors.
- **Auth via middleware** — protect routes in `middleware.ts`, not inside page components.
- **All documentation in English.**

## Constraints — never do these

- Do not use an ORM (Drizzle, Prisma, etc.)
- Do not edit or delete migration files that have already been applied to any database
- Do not push directly to `main`
- Do not add `"use client"` to a component unless it genuinely needs browser APIs or event handlers
- Do not store secrets in code — use `.env.local` locally, Vercel dashboard in prod

## Common workflows

**Start the full local stack**
```bash
# from git root
docker compose up -d
# from app root
npm run dev
```

**Add a new database migration**
```bash
# 1. Create the next numbered file
touch dalsland-web/db/migrations/005_your_change.sql
# 2. Write the SQL, then run it
npm run migrate   # from app root
```

**Add a new page/route**
```
app/your-route/page.tsx        ← public page (Server Component)
app/api/your-route/route.ts    ← API route handler
```
Protect a route by adding its pattern to the matcher in `middleware.ts`.

**Add a new admin page**
```
app/admin/your-section/page.tsx
```
It is automatically protected — `middleware.ts` guards all `/admin/**` routes.

**Run checks before opening a PR**
```bash
npm run lint && npm run build   # from app root
```
