/**
 * asyncHandler.js
 * Wraps async route handlers to forward errors to Express error middleware.
 *
 * Without this, an unhandled promise rejection in a controller would crash
 * the process (or hang the request in older Node versions). With this wrapper,
 * any thrown error or rejected promise automatically calls next(err), which
 * routes to errorHandler.js.
 *
 * Without asyncHandler — every controller needs its own try/catch:
 *   async (req, res, next) => {
 *     try { ... } catch(err) { next(err); }
 *   }
 *
 * With asyncHandler — controllers stay clean:
 *   asyncHandler(async (req, res) => { ... })
 *
 * @param {Function} fn - async route handler (req, res, next)
 * @returns {Function} wrapped handler that catches errors
 */

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
