/**
 * auth.routes.js
 * Defines HTTP endpoints for authentication.
 * Keeps routing declarations separate from handling logic.
 *
 * Routes:
 *   POST /auth/register  — create a new user account
 *   POST /auth/login     — authenticate and receive JWT
 */

const express = require('express');
const { body } = require('express-validator');
const authController = require('./auth.controller');
const validate = require('../../middleware/validate');

const router = express.Router();

router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  ],
  validate,
  authController.register
);

router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ],
  validate,
  authController.login
);

module.exports = router;
