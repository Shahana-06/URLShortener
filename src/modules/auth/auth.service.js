/**
 * auth.service.js
 * All authentication business logic lives here.
 *
 * Responsibilities:
 *   - Hash passwords with bcrypt before storing
 *   - Verify passwords on login
 *   - Sign and return JWTs
 *   - Query the users table via db.query()
 *
 * This layer has no knowledge of HTTP (no req, no res).
 * It only throws AppError on failure; the controller decides status codes.
 */

const db = require('../../config/db');
const AppError = require('../../utils/AppError');

// TODO: implement register(email, password)
// TODO: implement login(email, password)

module.exports = {};
