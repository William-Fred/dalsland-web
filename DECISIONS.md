# Tekniska val och beslut — Dalsland Web

Här dokumenterar vi val vi ställts inför, för- och nackdelar, och vilket beslut vi tog.

Se [README.md](./README.md) för hur du kör projektet lokalt.

---

## Sammanfattning av fattade beslut

| Område | Beslut |
|---|---|
| Hosting (app) | Vercel |
| Hosting (databas) | Neon (serverless Postgres) |
| Databasklient | postgres.js med manuella SQL-migreringar |
| Auth | Auth.js med credentials + users-tabell |
| Karta | Leaflet.js |
| CI/CD | GitHub Actions (build-check) + Vercel auto-deploy |
| Branch-strategi | `feat/**` → PR → main, branch-skydd i GitHub |
| DB-migrationer | Manuellt med `drizzle-kit migrate` |
| E-post | Ej beslutat — Resend rekommenderas |

---

## Hosting av Next.js

### Alternativ A: Vercel ✅
Next.js deployar nativt utan Docker. Deploy via git push.

**Fördelar**
- Gratis att börja
- Noll serverhantering
- Inbyggd integration med Neon (Postgres)
- Automatisk deploy vid push till main
- Preview-deploy per PR

**Nackdelar**
- Inget stöd för Docker-containers
- Gratisnivå har begränsningar (bandbredd, serverless cold starts)

### Alternativ B: Fly.io / Railway (Docker)

**Fördelar**
- Docker hela vägen
- Mer kontroll, lättare att flytta till VPS

**Nackdelar**
- Mer setup, Railway kräver betalplan efter en tid

---

## Hosting av Postgres

### Alternativ A: Neon ✅

**Fördelar**
- Gratis
- Ingen serverhantering
- `DATABASE_URL` injiceras automatiskt via Vercel-integration

**Nackdelar**
- Serverless — connection pooling behövs (Neon adapter för Drizzle)

### Alternativ B: Supabase

**Fördelar:** Inbyggd auth, bra dashboard
**Nackdelar:** Mer än vi behöver, vendor lock-in

### Alternativ C: Postgres i Docker (VPS)

**Fördelar:** Full kontroll
**Nackdelar:** Kräver backup-hantering själv

---

## Databasklient och migreringar

### Alternativ A: Drizzle ORM

**Fördelar:** Automatisk migrationsgenerering från TypeScript-schema, typkontroll
**Nackdelar:** Abstraktion ovanpå SQL, man skriver TS-syntax istället för SQL

### Alternativ B: postgres.js (rå SQL) ✅

Skriver SQL direkt med tagged template literals. Migreringar är numrerade `.sql`-filer som körs i ordning av ett eget script.

```ts
const rows = await sql<Booking[]>`
  SELECT * FROM bookings WHERE status = 'pending'
`
```

**Fördelar**
- Skriver ren SQL — full kontroll, inga abstraktioner
- Migreringshistorik är läsbar (en SQL-fil per ändring)
- Samma fil körs aldrig två gånger — spåras i `migrations`-tabell
- Nära Dapper-känsla för den som kan SQL

**Nackdelar**
- Inga autogenererade typer från schema — typer skrivs manuellt
- Migrationer skapas manuellt

### Alternativ C: Kysely (type-safe query builder)

**Fördelar:** Automatiska typer, nära SQL-syntax
**Nackdelar:** Ytterligare ett beroende, mer setup

---

## Autentisering

### Alternativ A: Enkelt lösenord via miljövariabel

**Fördelar:** Extremt enkelt
**Nackdelar:** Ingen användarhantering, alla delar lösenord

### Alternativ B: Auth.js (NextAuth v5) ✅
Email + lösenord i `users`-tabell med roller (admin/user).

**Fördelar**
- Riktig användarhantering med roller
- Enkelt att bygga ut med Google-inloggning
- Bra integration med Next.js App Router och middleware

**Nackdelar:** Mer setup än Alternativ A

---

## CI/CD och branch-strategi

### Beslut ✅

- Feature-branches namnges `feat/<beskrivning>`
- Ingen direktpush till `main` — branch-skydd satt i GitHub
- GitHub Actions kör `npm run build` vid push till `feat/**`, `main` och vid PR mot `main`
- Vercel deployas automatiskt vid merge till `main`
- Varje PR får en unik preview-URL från Vercel

```
feat/min-branch → push → pipeline kör → PR → preview-URL → merge → prod
```

---

## Databasmigrationer i produktion

### Alternativ A: Manuellt ✅
Kör `npx drizzle-kit migrate` efter merge till main.

**Fördelar:** Enkelt, full kontroll
**Nackdelar:** Kan glömmas bort

### Alternativ B: Automatiskt via GitHub Actions
CI kör migrationer mot prod-databasen efter deploy.

**Fördelar:** Kan inte glömmas
**Nackdelar:** Kräver `DATABASE_URL` som GitHub Secret

---

## Karttjänst

### Alternativ A: Leaflet.js ✅

**Fördelar:** Gratis, ingen API-nyckel, fungerar med Next.js via dynamisk import
**Nackdelar:** Lite mer manuellt än Google Maps

### Alternativ B: Google Maps / Mapbox

**Fördelar:** Snyggare, mer features
**Nackdelar:** Kräver API-nyckel och kreditkort

---

## E-postnotifieringar

### Alternativ A: Resend (rekommenderas)

**Fördelar:** Gratis 3 000 mail/månad, enkelt API
**Nackdelar:** Kräver domänverifiering

### Alternativ B: Nodemailer + SMTP

**Fördelar:** Inga externa tjänster
**Nackdelar:** Gmail SMTP krånglar, mer konfiguration

**Status: Ej beslutat.**
