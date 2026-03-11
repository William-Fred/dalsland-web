CREATE TABLE blocked_dates (
  id         SERIAL PRIMARY KEY,
  start_date DATE NOT NULL,
  end_date   DATE NOT NULL,
  reason     TEXT
);
