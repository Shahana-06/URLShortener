/**
 * db.js
 * Single shared PostgreSQL connection pool for the entire app.
 *
 * Why a pool? PostgreSQL handles one query per connection. A pool keeps
 * N connections open and reuses them across concurrent requests. Without
 * this, every request would pay the cost of opening a new TCP connection.
 *
 * All service files import { query } from here — they never touch the
 * pool directly. This keeps all DB interaction uniform and easy to mock.
 */

const { Pool } = require('pg');
const env = require('./env');

const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: env.nodeEnv === 'production' ? { rejectUnauthorized: false } : false,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('PostgreSQL connection error:', err.message);
    process.exit(1);
  }
  console.log('PostgreSQL connected');
  release();
});

const query = (text, params) => pool.query(text, params);

module.exports = { query, pool };
