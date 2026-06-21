const redis = require('../config/redis');
const AppError = require('../utils/AppError');

const WINDOW_SECONDS = 60;   
const MAX_REQUESTS = 10;     

const rateLimiter = async (req, res, next) => {
  const userId = req.user.id;
  const key = `ratelimit:${userId}`;
  const now = Date.now();
  const windowStart = now - WINDOW_SECONDS * 1000;

  try {
    // Add current request timestamp to the sorted set
    await redis.zadd(key, now, `${now}-${Math.random()}`);

    // Remove entries older than the window
    await redis.zremrangebyscore(key, 0, windowStart);

    // Count requests in current window
    const count = await redis.zcard(key);

    // Set expiry on the key so Redis auto-cleans it
    await redis.expire(key, WINDOW_SECONDS);

    if (count > MAX_REQUESTS) {
      return next(new AppError(`Rate limit exceeded. Max ${MAX_REQUESTS} requests per minute.`, 429));
    }

    next();
  } catch (err) {
    // If Redis fails, don't block the request
    console.error('Rate limiter error:', err.message);
    next();
  }
};

module.exports = rateLimiter;