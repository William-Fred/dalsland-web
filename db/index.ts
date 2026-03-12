import postgres from 'postgres';

let _sql: ReturnType<typeof postgres> | undefined;

export default function getSql(): ReturnType<typeof postgres> {
  if (!_sql) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    _sql = postgres(process.env.DATABASE_URL);
  }
  return _sql;
}
