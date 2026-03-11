# Dalsland Web

Booking site for renting a cabin in Dalsland. Guests can view the property, explore nearby activities, and submit booking requests. Owners manage bookings via an admin view.

## Getting Started

### Requirements

- [Node.js](https://nodejs.org/) (v20+)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### 1. Clone the repo

```bash
git clone <repo-url>
cd dalsland-web
```

### 2. Install dependencies

```bash
cd dalsland-web
npm install
```

### 3. Environment variables

Create the file `dalsland-web/.env.local`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dalsland
NEXTAUTH_SECRET=any-secret-string
NEXTAUTH_URL=http://localhost:3000
```

### 4. Start the database

```bash
docker compose up -d
```

This starts a Postgres instance locally on port `5432`.

### 5. Run migrations

```bash
cd dalsland-web
npm run migrate
```

This runs all `.sql` files in `db/migrations/` that have not been run before.

### 6. Start the app

```bash
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

---

## Branch strategy

```
feat/my-feature → PR against main → pipeline must be green → merge
```

- Name branches `feat/<description>`, e.g. `feat/landing-page`
- Direct push to `main` is blocked
- Every PR automatically runs a build check via GitHub Actions
- Every PR gets a preview URL from Vercel

---

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start locally (hot reload) |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run migrate` | Run new SQL migrations against the database |
| `docker compose up -d` | Start Postgres locally |
| `docker compose down` | Stop Postgres |

---

## Project documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) — tech choices, page structure, database schema
- [DECISIONS.md](./DECISIONS.md) — technical decisions and trade-offs
