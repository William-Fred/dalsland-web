import postgres from 'postgres';
import fs from 'fs';
import path from 'path';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sql = postgres(process.env.DATABASE_URL);

async function migrate() {
  await sql`
    CREATE TABLE IF NOT EXISTS migrations (
      id        SERIAL PRIMARY KEY,
      filename  TEXT NOT NULL UNIQUE,
      run_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  const migrationsDir = path.join(path.dirname(new URL(import.meta.url).pathname), 'migrations');
  const files = fs.readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  const rows = await sql<{ filename: string }[]>`SELECT filename FROM migrations`;
  const applied = new Set(rows.map((r) => r.filename));

  for (const file of files) {
    if (applied.has(file)) {
      console.log(`  skip  ${file}`);
      continue;
    }

    const filePath = path.join(migrationsDir, file);
    const query = fs.readFileSync(filePath, 'utf8');

    await sql.unsafe(query);
    await sql`INSERT INTO migrations (filename) VALUES (${file})`;

    console.log(`  apply ${file}`);
  }

  await sql.end();
  console.log('Migrations complete.');
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
