const asyncHandler = require('../../utils/asyncHandler');
const analyticsService = require('./analytics.service');

const getAnalytics = asyncHandler(async (req, res) => {
  const { code } = req.params;
  const userId = req.user.id;
  const stats = await analyticsService.getStats(code, userId);
  res.status(200).json(stats);
});

module.exports = { getAnalytics };