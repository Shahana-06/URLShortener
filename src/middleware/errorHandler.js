/**
 * errorHandler.js
 * Global error handling middleware. Must be registered LAST in app.js.
 *
 * Express identifies error-handling middleware by its 4-argument signature
 * (err, req, res, next). Any call to next(err) anywhere in the app lands
 * here instead of the default Express error page.
 *
 * This is the single place where we decide what error detail to expose.
 * In production, we never leak stack traces to clients.
 */

const env = require('../config/env');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message    = err.message    || 'Internal Server Error';

  // Log full error server-side always
  console.error(`[${req.method}] ${req.path} →`, err);

  res.status(statusCode).json({
    error: {
      message,
      // Only expose stack trace in development
      ...(env.nodeEnv === 'development' && { stack: err.stack }),
    },
  });
};

module.exports = errorHandler;
