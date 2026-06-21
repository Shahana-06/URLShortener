/**
 * analytics.controller.js
 * Returns aggregated click data for a given short URL.
 */

const asyncHandler = require('../../utils/asyncHandler');
const analyticsService = require('./analytics.service');

const getAnalytics = asyncHandler(async (req, res) => {
  const { code } = req.params;
  const userId = req.user?.id;
  // TODO: call analyticsService.getStats(code, userId)
  // TODO: return { totalClicks, clicksByDay, topReferrers }
  res.status(200).json({ message: `analytics for ${code} – not yet implemented` });
});

module.exports = { getAnalytics };
