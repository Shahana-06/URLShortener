const asyncHandler = require('../../utils/asyncHandler');
const urlService = require('./url.service');
const analyticsService = require('../analytics/analytics.service');

const shorten = asyncHandler(async (req, res) => {
  const { longUrl, customAlias } = req.body;
  const userId = req.user.id;
  const result = await urlService.createShortUrl(longUrl, userId, customAlias);
  res.status(201).json(result);
});

const redirect = asyncHandler(async (req, res) => {
  const { code } = req.params;
  const { longUrl, urlId } = await urlService.resolveCode(code);

  // Fire and forget — don't await, never delay the redirect
  analyticsService.recordClick(urlId, req).catch(err =>
    console.error('Click recording failed:', err.message)
  );

  res.redirect(302, longUrl);
});

module.exports = { shorten, redirect };