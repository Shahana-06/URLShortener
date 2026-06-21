/**
 * url.controller.js
 * HTTP layer for URL shortening and redirect resolution.
 *
 * shorten   — validates input is clean (done by middleware), calls service, returns short URL
 * redirect  — looks up code, fires async click tracking, sends 302
 */

const asyncHandler = require('../../utils/asyncHandler');
const urlService = require('./url.service');

const shorten = asyncHandler(async (req, res) => {
  const { longUrl, alias } = req.body;
  const userId = req.user?.id;
  // TODO: call urlService.createShortUrl(longUrl, userId, alias)
  // TODO: return 201 with { shortUrl, code }
  res.status(201).json({ message: 'shorten – not yet implemented' });
});

const redirect = asyncHandler(async (req, res) => {
  const { code } = req.params;
  // TODO: call urlService.resolveCode(code)
  // TODO: call analyticsService.recordClick(urlId, req) — fire and forget
  // TODO: res.redirect(302, longUrl)
  res.status(200).json({ message: `redirect for ${code} – not yet implemented` });
});

module.exports = { shorten, redirect };
