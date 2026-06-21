/**
 * env.js
 * Validates and exports all environment variables at startup.
 * The app crashes immediately (fail-fast) if a required var is missing.
 * Better to fail on boot than silently at runtime inside a request.
 */

const required = ['DATABASE_URL', 'REDIS_URL', 'JWT_SECRET', 'BASE_URL'];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

module.exports = {
  port:       process.env.PORT || 3000,
  nodeEnv:    process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL,
  redisUrl:   process.env.REDIS_URL,
  jwt: {
    secret:    process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  baseUrl: process.env.BASE_URL,
};
