const asyncHandler = require('../../utils/asyncHandler');
const urlService = require('./url.service');

const shorten = asyncHandler(async (req, res) => {
  const { longUrl, customAlias } = req.body;
  const userId = req.user.id;
  const result = await urlService.createShortUrl(longUrl, userId, customAlias);
  res.status(201).json(result);
});

const redirect = asyncHandler(async (req, res) => {
  const { code } = req.params;
  const { longUrl } = await urlService.resolveCode(code);
  res.redirect(302, longUrl);
});

module.exports = { shorten, redirect };