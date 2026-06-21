/**
 * redis.js
 * Single shared ioredis client for the entire app.
 *
 * Why ioredis? Built-in auto-reconnect, cluster support, and a clean
 * Promise API. Never create a Redis client per-request — connections
 * are expensive. This module exports one instance, shared everywhere.
 */

const Redis = require('ioredis');
const env = require('./env');

const redis = new Redis(env.redisUrl, {
  retryStrategy(times) {
    return Math.min(times * 50, 2000); // exponential backoff, cap at 2s
  },
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
});

redis.on('connect',      () => console.log('Redis connected'));
redis.on('error',        (err) => console.error('Redis error:', err.message));
redis.on('reconnecting', () => console.log('Redis reconnecting...'));

module.exports = redis;
