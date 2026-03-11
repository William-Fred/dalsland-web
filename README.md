# Dalsland Web

Bokningssida för uthyrning av stuga i Dalsland. Gäster kan se stället, utforska aktiviteter i närheten och skicka bokningsförfrågningar. Ägarna hanterar bokningar via en adminvy.

## Kom igång

### Krav

- [Node.js](https://nodejs.org/) (v20+)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### 1. Klona repot

```bash
git clone <repo-url>
cd dalsland-web
```

### 2. Installera beroenden

```bash
cd dalsland-web
npm install
```

### 3. Miljövariabler

Skapa filen `dalsland-web/.env.local`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dalsland
NEXTAUTH_SECRET=valfri-hemlig-sträng
NEXTAUTH_URL=http://localhost:3000
```

### 4. Starta databasen

```bash
docker compose up -d
```

Det startar en Postgres-instans lokalt på port `5432`.

### 5. Kör migrationer

```bash
cd dalsland-web
npm run migrate
```

Det kör alla `.sql`-filer i `db/migrations/` som inte körts tidigare.

### 6. Starta appen

```bash
npm run dev
```

Appen körs på [http://localhost:3000](http://localhost:3000).

---

## Branch-strategi

```
feat/min-feature → PR mot main → pipeline måste vara grön → merge
```

- Namnge branches `feat/<beskrivning>`, t.ex. `feat/landningssida`
- Direktpush till `main` är blockerat
- Varje PR kör automatiskt en build-check via GitHub Actions
- Varje PR får en preview-URL från Vercel

---

## Kommandon

| Kommando | Beskrivning |
|---|---|
| `npm run dev` | Starta lokalt (hot reload) |
| `npm run build` | Bygg för produktion |
| `npm run lint` | Kör ESLint |
| `npm run migrate` | Kör nya SQL-migreringar mot databasen |
| `docker compose up -d` | Starta Postgres lokalt |
| `docker compose down` | Stoppa Postgres |

---

## Projektdokumentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) — teknikval, sidstruktur, databasschema
- [DECISIONS.md](./DECISIONS.md) — tekniska beslut och avvägningar
