-- 001_initial_schema.sql
-- Run once against your PostgreSQL database to set up all tables and indexes.
-- On Railway: copy-paste into the Railway PostgreSQL query console,
-- or run via: psql $DATABASE_URL -f migrations/001_initial_schema.sql

-- ── Users ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       VARCHAR(255) UNIQUE NOT NULL,
  password    VARCHAR(255) NOT NULL,      -- bcrypt hash, never plaintext
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── URLs ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS urls (
  id          BIGSERIAL PRIMARY KEY,      -- BIGSERIAL for Base62 encoding (not UUID)
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  long_url    TEXT NOT NULL,
  code        VARCHAR(20) UNIQUE,         -- set after insert (Base62 of id)
  alias       VARCHAR(50) UNIQUE,         -- optional user-defined alias
  is_active   BOOLEAN DEFAULT TRUE,
  expires_at  TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── Clicks ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS clicks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url_id      BIGINT NOT NULL REFERENCES urls(id) ON DELETE CASCADE,
  clicked_at  TIMESTAMPTZ DEFAULT NOW(),
  ip_address  INET,
  user_agent  TEXT,
  referrer    TEXT
);

-- ── Indexes ────────────────────────────────────────────────────────────────
-- Without these, every redirect and analytics query is a full table scan.
CREATE INDEX IF NOT EXISTS idx_urls_code      ON urls(code);
CREATE INDEX IF NOT EXISTS idx_urls_alias     ON urls(alias);
CREATE INDEX IF NOT EXISTS idx_urls_user_id   ON urls(user_id);
CREATE INDEX IF NOT EXISTS idx_clicks_url_id  ON clicks(url_id);
CREATE INDEX IF NOT EXISTS idx_clicks_time    ON clicks(clicked_at);
