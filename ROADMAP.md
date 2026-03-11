# Roadmap — Dalsland Web

Statusar: `[ ]` ej påbörjad · `[~]` pågående · `[x]` klar

---

## Milestone 0 — Grund och infrastruktur

Teknisk grund på plats innan vi bygger features.

- [x] Initiera Next.js-projekt med Tailwind CSS
- [ ] Sätt upp GitHub-repo
- [x] GitHub Actions pipeline (build-check vid push/PR)
- [ ] Installera postgres.js och tsx
- [ ] Skapa `db/index.ts` — uppkoppling mot Postgres
- [ ] Skapa `db/migrate.ts` — migreringsscript
- [ ] Sätt upp Docker Compose för lokal Postgres
- [ ] Skapa `.env.local` med rätt variabler

---

## Milestone 1 — Databas och auth

Användare, roller och inloggning.

**Som ägare vill jag kunna logga in på en adminvy** så att jag kan hantera bokningar utan att gäster kommer åt det.

- [ ] SQL: `001_create_users.sql`
- [ ] SQL: `002_create_bookings.sql`
- [ ] SQL: `003_create_blocked_dates.sql`
- [ ] SQL: `004_create_attractions.sql`
- [ ] Installera och konfigurera Auth.js
- [ ] Inloggningssida (`/login`)
- [ ] Skydda `/admin/**` via `middleware.ts`
- [ ] Seed-script — skapa första admin-användaren

---

## Milestone 2 — Landningssida

Gästernas första intryck av stället.

**Som gäst vill jag se vad stället är och hur det ser ut** så att jag kan avgöra om det passar mig.

- [ ] Grundlayout med header och footer
- [ ] Sektion: text om stället (rubrik, beskrivning, fakta)
- [ ] Sektion: bildgalleri
- [ ] Sektion: karta med Leaflet.js som visar var stället ligger
- [ ] Sektion: highlights/features (t.ex. antal bäddar, natur, sjö)
- [ ] Länk/knapp till bokningssidan

---

## Milestone 3 — Bokningssida

Gäster kan se tillgänglighet och skicka en förfrågan.

**Som gäst vill jag kunna se lediga datum och skicka en bokningsförfrågan** så att jag kan reservera stället.

- [ ] Kalendervy med lediga/blockerade datum
- [ ] Bokningsformulär (namn, e-post, telefon, datum, antal gäster, meddelande)
- [ ] API: `POST /api/bookings` — spara förfrågan
- [ ] API: `GET /api/availability` — hämta blockerade datum
- [ ] Bekräftelsemeddelande till gästen efter inskickad förfrågan

---

## Milestone 4 — Utforskasida

Vad finns att göra i närheten?

**Som gäst vill jag se vad som finns att göra i närheten** så att jag kan planera min vistelse.

- [ ] Sida `/utforska` med lista över attraktioner
- [ ] Filtrera på typ (sjö / restaurang / sevärdhet / aktivitet)
- [ ] Karta med nålar för varje attraktion
- [ ] API: `GET /api/attractions`

---

## Milestone 5 — Adminvy

Ägarna kan hantera bokningar och innehåll.

**Som ägare vill jag se och hantera inkomna bokningsförfrågningar** så att jag kan godkänna eller avböja dem.

- [ ] `/admin` — översiktssida
- [ ] `/admin/bokningar` — lista alla bokningar med status
- [ ] Godkänn / avböj bokning
- [ ] API: `PATCH /api/bookings/[id]` — uppdatera status
- [ ] Blockera datum manuellt (t.ex. för eget bruk)

**Som ägare vill jag kunna hantera användare** så att jag kan ge min bror tillgång utan att dela mitt lösenord.

- [ ] `/admin/användare` — lista användare
- [ ] Skapa ny användare
- [ ] Ta bort / ändra roll på användare

**Som ägare vill jag kunna lägga till sevärdheter** så att gäster ser vad som finns i närheten.

- [ ] `/admin/attraktioner` — lista attraktioner
- [ ] Lägg till / redigera / ta bort attraktion

---

## Milestone 6 — E-post

Automatiska notifieringar vid bokningar.

**Som ägare vill jag få ett mail när en ny bokningsförfrågan kommer in** så att jag inte missar någon.

- [ ] Välj och konfigurera e-posttjänst (Resend rekommenderas)
- [ ] Skicka mail till ägaren vid ny bokning
- [ ] Skicka bekräftelsemail till gästen

---

## Milestone 7 — Deploy

Sätta upp produktion.

- [ ] Skapa konto på Vercel och koppla GitHub-repot
- [ ] Skapa Neon-databas och koppla via Vercel-integration
- [ ] Sätt miljövariabler i Vercel dashboard
- [ ] Kör migreringar mot prod-databasen
- [ ] Verifiera att appen fungerar i produktion
- [ ] Koppla eget domännamn (valfritt)
