/**
 * app.js
 * Assembles the Express application: middleware stack + route mounting.
 * Does NOT start the server (that's server.js). This separation makes
 * the app importable for testing without binding a port.
 *
 * Middleware order matters in Express — it runs top to bottom:
 *   1. express.json()   — parse request bodies before routes see them
 *   2. Routes           — handle the request
 *   3. 404 handler      — catches anything no route matched
 *   4. errorHandler     — must be last; catches all next(err) calls
 */

const express = require('express');

const authRoutes      = require('./modules/auth/auth.routes');
const urlRoutes       = require('./modules/url/url.routes');
const analyticsRoutes = require('./modules/analytics/analytics.routes');
const errorHandler    = require('./middleware/errorHandler');
const AppError        = require('./utils/AppError');

const app = express();

// ── Body parsing ───────────────────────────────────────────
app.use(express.json());

// ── Health check (Railway pings this to verify the app is alive) ───
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// ── Routes ─────────────────────────────────────────────────
app.use('/auth',       authRoutes);
app.use('/',           urlRoutes);       // includes POST /shorten and GET /:code
app.use('/analytics',  analyticsRoutes);

// ── 404 — no route matched ─────────────────────────────────
app.use((req, res, next) => {
  next(new AppError(`Route ${req.method} ${req.path} not found`, 404));
});

// ── Global error handler (must be last) ───────────────────
app.use(errorHandler);

module.exports = app;
