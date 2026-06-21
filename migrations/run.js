/**
 * run.js
 * Applies 001_initial_schema.sql to the connected PostgreSQL database.
 * Usage: node migrations/run.js
 * (or npm run migrate if you wired the script in package.json)
 */

require('dotenv').config();
const fs   = require('fs');
const path = require('path');
const { pool } = require('../src/config/db');

const sqlPath = path.join(__dirname, '001_initial_schema.sql');
const sql     = fs.readFileSync(sqlPath, 'utf8');

(async () => {
  try {
    await pool.query(sql);
    console.log('Migration applied successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err.message);
    process.exit(1);
  }
})();
