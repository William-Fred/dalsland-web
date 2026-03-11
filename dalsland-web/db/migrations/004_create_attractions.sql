CREATE TABLE attractions (
  id           SERIAL PRIMARY KEY,
  name         TEXT NOT NULL,
  type         TEXT NOT NULL CHECK (type IN ('lake', 'restaurant', 'sight', 'activity')),
  description  TEXT,
  lat          NUMERIC(9, 6) NOT NULL,
  lng          NUMERIC(9, 6) NOT NULL,
  distance_km  NUMERIC(6, 2),
  image_url    TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
