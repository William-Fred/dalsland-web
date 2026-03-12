# Roadmap — Dalsland Web

Statuses: `[ ]` not started · `[~]` in progress · `[x]` done

---

## Milestone 0 — Foundation and infrastructure

Technical foundation in place before building features.

- [x] Initialize Next.js project with Tailwind CSS
- [x] Set up GitHub repo
- [x] GitHub Actions pipeline (build check on push/PR)
- [x] Install postgres.js and tsx
- [x] Create `db/index.ts` — connection to Postgres
- [x] Create `db/migrate.ts` — migration script
- [x] Set up Docker Compose for local Postgres
- [x] Create `.env.local.example` with required variables (copy to `.env.local` to start locally)

---

## Milestone 1 — Database and auth

Users, roles, and login.

**As an owner I want to be able to log in to an admin view** so that I can manage bookings without guests having access.

- [x] SQL: `001_create_bookings.sql`
- [x] SQL: `002_create_blocked_dates.sql`
- [x] SQL: `003_create_users.sql`
- [x] SQL: `004_create_attractions.sql`
- [ ] Install and configure Auth.js
- [ ] Login page (`/login`)
- [ ] Protect `/admin/**` via `middleware.ts`
- [ ] Seed script — create the first admin user

---

## Milestone 2 — Landing page

The guests' first impression of the property.

**As a guest I want to see what the property is and what it looks like** so that I can decide if it suits me.

- [ ] Base layout with header and footer
- [ ] Section: text about the property (heading, description, facts)
- [ ] Section: image gallery
- [ ] Section: map with Leaflet.js showing where the property is located
- [ ] Section: highlights/features (e.g. number of beds, nature, lake)
- [ ] Link/button to the booking page

---

## Milestone 3 — Booking page

Guests can view availability and submit a request.

**As a guest I want to see available dates and submit a booking request** so that I can reserve the property.

- [ ] Calendar view with available/blocked dates
- [ ] Booking form (name, email, phone, dates, number of guests, message)
- [ ] API: `POST /api/bookings` — save the request
- [ ] API: `GET /api/availability` — fetch blocked dates
- [ ] Confirmation message to the guest after submitting the request

---

## Milestone 4 — Explore page

What is there to do nearby?

**As a guest I want to see what there is to do nearby** so that I can plan my stay.

- [ ] Page `/explore` with a list of attractions
- [ ] Filter by type (lake / restaurant / sight / activity)
- [ ] Map with pins for each attraction
- [ ] API: `GET /api/attractions`

---

## Milestone 5 — Admin view

Owners can manage bookings and content.

**As an owner I want to see and manage incoming booking requests** so that I can approve or decline them.

- [ ] `/admin` — overview page
- [ ] `/admin/bookings` — list all bookings with status
- [ ] Approve / decline booking
- [ ] API: `PATCH /api/bookings/[id]` — update status
- [ ] Block dates manually (e.g. for personal use)

**As an owner I want to be able to manage users** so that I can give my brother access without sharing my password.

- [ ] `/admin/users` — list users
- [ ] Create new user
- [ ] Delete / change role of a user

**As an owner I want to be able to add attractions** so that guests can see what is nearby.

- [ ] `/admin/attractions` — list attractions
- [ ] Add / edit / delete attraction

---

## Milestone 6 — Email

Automatic notifications for bookings.

**As an owner I want to receive an email when a new booking request comes in** so that I don't miss any.

- [ ] Choose and configure email service (Resend recommended)
- [ ] Send email to owner on new booking
- [ ] Send confirmation email to the guest

---

## Milestone 7 — Deploy

Set up production.

- [ ] Create account on Vercel and connect the GitHub repo
- [ ] Create Neon database and connect via Vercel integration
- [ ] Set environment variables in Vercel dashboard
- [ ] Run migrations against the prod database
- [ ] Verify that the app works in production
- [ ] Connect a custom domain (optional)
