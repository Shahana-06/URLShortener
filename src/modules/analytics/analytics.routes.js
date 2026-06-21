const express = require('express');
const analyticsController = require('./analytics.controller');
const authenticate = require('../../middleware/authenticate');

const router = express.Router();

/**
 * @swagger
 * /analytics/{code}:
 *   get:
 *     summary: Get click analytics for a short URL
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         example: 2lC
 *     responses:
 *       200:
 *         description: Analytics data
 *       404:
 *         description: URL not found or not owned by user
 */
router.get('/:code', authenticate, analyticsController.getAnalytics);

module.exports = router;