/**
 * rateLimiter.js
 * Sliding window rate limiter using Redis sorted sets.
 *
 * Why sliding window over fixed window?
 * Fixed window allows bursting at boundaries (e.g. 100 requests at 11:59
 * and 100 more at 12:00 = 200 in 2 seconds). Sliding window counts
 * requests within the last N seconds from NOW, eliminating that exploit.
 *
 * Redis data structure used: Sorted Set (ZSET)
 *   Key:   ratelimit:{userId}
 *   Score: request timestamp (ms)
 *   Value: unique request id
 *
 * Usage in routes:
 *   router.post('/shorten', authenticate, rateLimiter, urlController.shorten);
 */

const rateLimiter = (req, res, next) => {
  // TODO: read userId from req.user (set by authenticate middleware)
  // TODO: ZADD current timestamp, ZREMRANGEBYSCORE to prune old entries
  // TODO: ZCARD to count requests in window
  // TODO: if count > limit → 429, else → next()
  next();
};

module.exports = rateLimiter;
