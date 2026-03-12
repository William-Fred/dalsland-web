import bcrypt from "bcryptjs";
import postgres from "postgres";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  throw new Error(
    "Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD environment variables before running this script."
  );
}

const sql = postgres(process.env.DATABASE_URL);

type UserRow = { id: number; email: string };

async function seedAdmin() {
  const existing = await sql<UserRow[]>`
    SELECT id, email FROM users WHERE email = ${ADMIN_EMAIL!} LIMIT 1
  `;

  if (existing.length > 0) {
    console.log(`Admin user already exists: ${existing[0].email}`);
    await sql.end();
    return;
  }

  const hash = await bcrypt.hash(ADMIN_PASSWORD!, 12);

  const [created] = await sql<UserRow[]>`
    INSERT INTO users (email, password_hash, role)
    VALUES (${ADMIN_EMAIL!}, ${hash}, 'admin')
    RETURNING id, email
  `;

  console.log(`Admin user created: ${created.email} (id: ${created.id})`);
  await sql.end();
}

seedAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
