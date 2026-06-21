/**
 * auth.controller.js
 * Handles HTTP layer for auth routes: parse input, call service, send response.
 *
 * Controllers are intentionally thin. No business logic here.
 * The controller's only job: translate HTTP in → service call → HTTP out.
 */

const asyncHandler = require('../../utils/asyncHandler');
const authService = require('./auth.service');

const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // TODO: call authService.register(email, password)
  // TODO: return 201 with { message, token }
  res.status(201).json({ message: 'register – not yet implemented' });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // TODO: call authService.login(email, password)
  // TODO: return 200 with { token }
  res.status(200).json({ message: 'login – not yet implemented' });
});

module.exports = { register, login };
