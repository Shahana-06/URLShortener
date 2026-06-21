/**
 * authenticate.js
 * JWT verification middleware. Attaches the decoded payload to req.user.
 *
 * Any route that needs to know "who is this?" applies this middleware.
 * Routes that are public (GET /:code redirects) do NOT use this.
 *
 * Usage in routes:
 *   router.post('/shorten', authenticate, urlController.shorten);
 */

// Business logic goes here in the next step.
// Scaffold only — structure is what matters now.

const authenticate = (req, res, next) => {
  // TODO: extract Bearer token from Authorization header
  // TODO: verify with jwt.verify(token, env.jwt.secret)
  // TODO: attach decoded payload to req.user
  // TODO: call next() on success, return 401 on failure
  next();
};

module.exports = authenticate;
