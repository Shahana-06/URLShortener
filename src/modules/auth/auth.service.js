const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../config/db');
const AppError = require('../../utils/AppError');
const env = require('../../config/env');

const register = async (email, password) => {
  // Check if email already exists
  const existing = await db.query(
    'SELECT id FROM users WHERE email = $1',
    [email]
  );
  if (existing.rows.length > 0) {
    throw new AppError('Email already in use', 409);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const result = await db.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at',
    [email, hashedPassword]
  );
  const user = result.rows[0];

  const token = jwt.sign(
    { userId: user.id },
    env.jwt.secret,
    { expiresIn: env.jwt.expiresIn }
  );

  return { user, token };
};

const login = async (email, password) => {
  const result = await db.query(
    'SELECT id, email, password FROM users WHERE email = $1',
    [email]
  );
  if (result.rows.length === 0) {
    throw new AppError('Invalid email or password', 401);
  }
  const user = result.rows[0];

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = jwt.sign(
    { userId: user.id },
    env.jwt.secret,
    { expiresIn: env.jwt.expiresIn }
  );

  return { user: { id: user.id, email: user.email }, token };
};

module.exports = { register, login };