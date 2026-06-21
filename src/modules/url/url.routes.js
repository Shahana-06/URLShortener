/**
 * url.routes.js
 * Endpoints for creating short URLs and resolving redirects.
 *
 * Routes:
 *   POST /shorten      — authenticated, rate-limited — create a short URL
 *   GET  /:code        — public — redirect to original URL
 *
 * Note: GET /:code is mounted at the root level in app.js (not under /url)
 * so that short links look like https://short.ly/abc123, not /url/abc123.
 */

const express = require('express');
const { body } = require('express-validator');
const urlController = require('./url.controller');
const authenticate = require('../../middleware/authenticate');
const rateLimiter = require('../../middleware/rateLimiter');
const validate = require('../../middleware/validate');

const router = express.Router();

// POST /shorten — create short URL
router.post(
  '/shorten',
  authenticate,
  rateLimiter,
  [
    body('longUrl').isURL({ require_protocol: true }).withMessage('Must be a valid URL with protocol'),
    body('alias').optional().isAlphanumeric().isLength({ min: 3, max: 30 }),
  ],
  validate,
  urlController.shorten
);

// GET /:code — resolve and redirect
// This is also re-exported and mounted at app root in app.js
router.get('/:code', urlController.redirect);

module.exports = router;
