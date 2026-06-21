const asyncHandler = require('../../utils/asyncHandler');
const authService = require('./auth.service');

const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authService.register(email, password);
  res.status(201).json({ user, token });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authService.login(email, password);
  res.status(200).json({ user, token });
});

module.exports = { register, login };