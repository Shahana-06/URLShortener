/**
 * validate.js
 * Request body/param validation using express-validator.
 *
 * Why centralize validation here?
 * Controllers should never handle raw, unvalidated user input directly.
 * This middleware runs validationResult() and short-circuits with 422
 * if anything fails — controllers only run when input is clean.
 *
 * Usage in routes:
 *   router.post('/shorten', authenticate, [
 *     body('longUrl').isURL(),
 *     body('alias').optional().isAlphanumeric(),
 *   ], validate, urlController.shorten);
 */

const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

module.exports = validate;
