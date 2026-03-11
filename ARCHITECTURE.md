# Arkitektur — Dalsland Web (Bokningssida)

## Översikt

Bokningssida för uthyrning av stuga/ställe i Dalsland. Gäster kan se stället, utforska aktiviteter i närheten och skicka bokningsförfrågningar. Ägarna hanterar bokningar och innehåll via en adminvy med rollbaserad åtkomst.

## Tech Stack

| Lager | Teknik |
|---|---|
| Frontend + Backend | Next.js (App Router) |
| Databas | PostgreSQL via Neon (prod) / Docker (lokalt) |
| Databasklient | postgres.js (rå SQL) |
| Styling | Tailwind CSS v4 |
| Auth | Auth.js (NextAuth v5) med credentials-provider |
| Karta | Leaflet.js (dynamisk import — SSR-säker) |
| Bilder | Statiska filer i `/public/images/` (kan migreras till Vercel Blob senare) |
| Hosting | Vercel |
| Lokal dev (DB) | Docker Compose |

## Sidor

| Route | Åtkomst | Innehåll |
|---|---|---|
| `/` | Publik | Landningssida — info om stället, bildgalleri, karta, highlights |
| `/utforska` | Publik | Sevärdheter och aktiviteter i närheten med karta |
| `/boka` | Publik | Kalender + bokningsformulär |
| `/admin` | Admin | Översikt |
| `/admin/bokningar` | Admin | Hantera och godkänna bokningar |
| `/admin/användare` | Admin | Hantera användare och roller |
| `/admin/attraktioner` | Admin | Lägg till/redigera sevärdheter |

## Projektstruktur

```
dalsland-web/
├── app/
│   ├── page.tsx                        # Landningssida
│   ├── layout.tsx
│   ├── utforska/
│   │   └── page.tsx                    # Aktiviteter och sevärdheter
│   ├── boka/
│   │   └── page.tsx                    # Kalender + bokningsformulär
│   ├── admin/
│   │   ├── layout.tsx                  # Skyddat med Auth.js middleware
│   │   ├── page.tsx                    # Admin-översikt
│   │   ├── bokningar/page.tsx
│   │   ├── användare/page.tsx
│   │   └── attraktioner/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts # Auth.js handler
│       ├── bookings/route.ts
│       ├── availability/route.ts
│       └── attractions/route.ts
├── db/
│   ├── index.ts                        # DB-uppkoppling (postgres.js)
│   ├── migrate.ts                      # Migreringsscript — kör nya SQL-filer
│   └── migrations/
│       ├── 001_create_bookings.sql
│       ├── 002_create_blocked_dates.sql
│       ├── 003_create_users.sql
│       └── 004_create_attractions.sql
├── middleware.ts                       # Skyddar /admin/** med Auth.js
├── docker-compose.yml                  # Postgres för lokal dev
└── .env.local                          # Gitignorerad
```

## Databasschema

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

`status` på bokning: `pending` → `approved` / `rejected`

## Autentisering och roller

Auth hanteras av **Auth.js** med credentials-provider (email + lösenord).
Skyddade routes (`/admin/**`) kontrolleras i `middleware.ts` via session-token.

```
Publik användare  → kan se landningssida, utforska, skicka bokningsförfrågan
Inloggad (admin)  → kan hantera bokningar, användare, attraktioner
```

## Deploy och CI/CD

```
git push → GitHub Actions → Vercel → live
```

1. **GitHub** — källkod, PR-flöde
2. **GitHub Actions** — kör lint + typkontroll vid varje push/PR
3. **Vercel** — auto-deploy vid merge till `main`; preview-deploy vid varje PR
4. **Neon** — hanteras som Vercel-integration; `DATABASE_URL` injiceras automatiskt

### Flöde för ny feature

```
feature-branch → PR → GitHub Actions (lint/type-check) → preview-URL på Vercel → merge → prod-deploy
```

### Databasmigrationer i produktion

```bash
# Kör manuellt efter merge när ny SQL-fil lagts till
npx tsx db/migrate.ts
```

Migreringsscriptet håller koll på körda filer via en `migrations`-tabell i databasen — samma fil körs aldrig två gånger.

## Lokal utveckling

```bash
docker compose up -d     # Starta Postgres
npm run dev              # Starta Next.js
```

## Miljövariabler

```env
# Lokalt (.env.local)
DATABASE_URL=postgresql://user:password@localhost:5432/dalsland
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000

# Produktion (sätts i Vercel dashboard)
DATABASE_URL=...         # Injiceras automatiskt av Neon-integrationen
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://din-domän.se
```
