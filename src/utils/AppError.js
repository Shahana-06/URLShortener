/**
 * AppError.js
 * Custom error class that carries an HTTP status code alongside the message.
 *
 * Why a custom error class?
 * JavaScript's built-in Error has no concept of HTTP status codes.
 * By extending it, we can throw rich errors from anywhere in the service
 * layer and let errorHandler.js pluck the statusCode off automatically.
 *
 * Usage in services:
 *   throw new AppError('URL not found', 404);
 *   throw new AppError('Alias already taken', 409);
 *   throw new AppError('Invalid credentials', 401);
 *
 * errorHandler.js then does:
 *   const statusCode = err.statusCode || 500;
 */

class AppError extends Error {
  /**
   * @param {string} message - Human-readable error description
   * @param {number} statusCode - HTTP status code (4xx client, 5xx server)
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Marks expected errors (vs unexpected crashes)
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
