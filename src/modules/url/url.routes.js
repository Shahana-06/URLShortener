const express = require('express');
const { body } = require('express-validator');
const urlController = require('./url.controller');
const authenticate = require('../../middleware/authenticate');
const rateLimiter = require('../../middleware/rateLimiter');
const validate = require('../../middleware/validate');

const router = express.Router();

/**
 * @swagger
 * /shorten:
 *   post:
 *     summary: Shorten a URL
 *     tags: [URLs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [longUrl]
 *             properties:
 *               longUrl:
 *                 type: string
 *                 example: https://google.com
 *               customAlias:
 *                 type: string
 *                 example: my-link
 *     responses:
 *       201:
 *         description: Short URL created
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Alias already taken
 *       429:
 *         description: Rate limit exceeded
 */
router.post(
  '/shorten',
  authenticate,
  rateLimiter,
  [
    body('longUrl').isURL({ require_protocol: true }).withMessage('Must be a valid URL with protocol'),
    body('customAlias').optional().isAlphanumeric().isLength({ min: 3, max: 30 }),
  ],
  validate,
  urlController.shorten
);

/**
 * @swagger
 * /{code}:
 *   get:
 *     summary: Redirect to original URL
 *     tags: [URLs]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         example: 2lC
 *     responses:
 *       302:
 *         description: Redirects to original URL
 *       404:
 *         description: Short URL not found
 */
router.get('/:code', urlController.redirect);

module.exports = router;