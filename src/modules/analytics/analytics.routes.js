/**
 * analytics.routes.js
 *
 * Routes:
 *   GET /analytics/:code — authenticated — return click stats for a URL
 *
 * Authorization note: middleware verifies JWT, but the service layer must
 * additionally verify that the requesting user OWNS this URL. Don't rely
 * on authentication alone for ownership checks.
 */

const express = require('express');
const analyticsController = require('./analytics.controller');
const authenticate = require('../../middleware/authenticate');

const router = express.Router();

router.get('/:code', authenticate, analyticsController.getAnalytics);

module.exports = router;
