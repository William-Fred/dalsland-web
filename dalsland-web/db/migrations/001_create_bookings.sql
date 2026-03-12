CREATE TABLE bookings (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT,
  start_date DATE NOT NULL,
  end_date   DATE NOT NULL,
  guests     INTEGER NOT NULL CHECK (guests > 0),
  message    TEXT,
  status     TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  CHECK (end_date > start_date),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
