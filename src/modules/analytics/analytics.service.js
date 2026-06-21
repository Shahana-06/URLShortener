/**
 * analytics.service.js
 * Handles click recording and stat aggregation.
 *
 * recordClick(urlId, req):
 *   - Extracts ip_address, user_agent, referrer from the request
 *   - INSERT into clicks table
 *   - This is called fire-and-forget from the redirect controller
 *     (no await) so it never delays the redirect response to the user
 *
 * getStats(code, userId):
 *   - Verify the URL belongs to userId (ownership check)
 *   - Aggregate clicks: total, by day, by referrer
 *   - Returns structured analytics object
 */

const db = require('../../config/db');
const AppError = require('../../utils/AppError');

// TODO: implement recordClick(urlId, req)
// TODO: implement getStats(code, userId)

module.exports = {};
