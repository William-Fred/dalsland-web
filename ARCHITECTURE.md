# Architecture — Dalsland Web (Booking Site)

## Overview

Booking site for renting a cabin/property in Dalsland. Guests can view the property, explore nearby activities, and submit booking requests. Owners manage bookings and content via an admin view with role-based access.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend + Backend | Next.js (App Router) |
| Database | PostgreSQL via Neon (prod) / Docker (local) |
| Database client | postgres.js (raw SQL) |
| Styling | Tailwind CSS v4 |
| Auth | Auth.js (NextAuth v5) with credentials provider |
| Map | Leaflet.js (dynamic import — SSR-safe) |
| Images | Static files in `/public/images/` (can be migrated to Vercel Blob later) |
| Hosting | Vercel |
| Local dev (DB) | Docker Compose |

## Pages

| Route | Access | Content |
|---|---|---|
| `/` | Public | Landing page — property info, image gallery, map, highlights |
| `/explore` | Public | Nearby attractions and activities with map |
| `/book` | Public | Calendar + booking form |
| `/admin` | Admin | Overview |
| `/admin/bookings` | Admin | Manage and approve bookings |
| `/admin/users` | Admin | Manage users and roles |
| `/admin/attractions` | Admin | Add/edit attractions |

## Project Structure

```
dalsland-web/
├── app/
│   ├── page.tsx                        # Landing page
│   ├── layout.tsx
│   ├── explore/
│   │   └── page.tsx                    # Activities and attractions
│   ├── book/
│   │   └── page.tsx                    # Calendar + booking form
│   ├── admin/
│   │   ├── layout.tsx                  # Protected with Auth.js middleware
│   │   ├── page.tsx                    # Admin overview
│   │   ├── bookings/page.tsx
│   │   ├── users/page.tsx
│   │   └── attractions/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts # Auth.js handler
│       ├── bookings/route.ts
│       ├── availability/route.ts
│       └── attractions/route.ts
├── db/
│   ├── index.ts                        # DB connection (postgres.js)
│   ├── migrate.ts                      # Migration script — runs new SQL files
│   └── migrations/
│       ├── 001_create_bookings.sql
│       ├── 002_create_blocked_dates.sql
│       ├── 003_create_users.sql
│       └── 004_create_attractions.sql
├── middleware.ts                       # Protects /admin/** with Auth.js
├── docker-compose.yml                  # Postgres for local dev
└── .env.local                          # Gitignored
```

## Database Schema

```
bookings
  id, name, email, phone, start_date, end_date, guests, message, status, created_at

blocked_dates
  id, start_date, end_date, reason

users
  id, email, password_hash, role (admin|user), created_at

attractions
  id, name, type (lake|restaurant|sight|activity),
  description, lat, lng, distance_km, image_url, created_at
```

`status` on a booking: `pending` → `approved` / `rejected`

## Authentication and Roles

Auth is handled by **Auth.js** with a credentials provider (email + password).
Protected routes (`/admin/**`) are controlled in `middleware.ts` via session token.

```
Public user   → can view landing page, explore, submit booking request
Logged in (admin)  → can manage bookings, users, attractions
```

## Deploy and CI/CD

```
git push → GitHub Actions → Vercel → live
```

1. **GitHub** — source code, PR workflow
2. **GitHub Actions** — runs lint + type check on every push/PR
3. **Vercel** — auto-deploy on merge to `main`; preview deploy on every PR
4. **Neon** — managed as a Vercel integration; `DATABASE_URL` is injected automatically

### New feature workflow

```
feature-branch → PR → GitHub Actions (lint/type-check) → preview URL on Vercel → merge → prod deploy
```

### Database migrations in production

```bash
# Run manually after merge when a new SQL file has been added
npx tsx db/migrate.ts
```

The migration script tracks executed files via a `migrations` table in the database — the same file is never run twice.

## Local Development

```bash
docker compose up -d     # Start Postgres
npm run dev              # Start Next.js
```

## Environment Variables

```env
# Local (.env.local)
DATABASE_URL=postgresql://user:password@localhost:5432/dalsland
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000

# Production (set in Vercel dashboard)
DATABASE_URL=...         # Injected automatically by the Neon integration
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://your-domain.com
```
