/**
 * url.service.js
 * Core business logic for URL shortening and resolution.
 *
 * createShortUrl flow:
 *   1. If alias provided → check uniqueness in PG
 *   2. INSERT row to get the auto-increment id back (RETURNING id)
 *   3. base62.encode(id) → short code
 *   4. UPDATE the row to set code = encoded value
 *   5. Cache: Redis SET url:{code} longUrl EX 86400
 *   6. Return { code, shortUrl }
 *
 * resolveCode flow:
 *   1. Redis GET url:{code}  → cache hit: return immediately
 *   2. Cache miss: PG SELECT WHERE code = ?
 *   3. If not found → throw AppError 404
 *   4. Redis SET url:{code} (warm cache for next time)
 *   5. Return longUrl
 */

const db = require('../../config/db');
const redis = require('../../config/redis');
const base62 = require('../../utils/base62');
const AppError = require('../../utils/AppError');

// TODO: implement createShortUrl(longUrl, userId, alias)
// TODO: implement resolveCode(code)
// TODO: implement getUserUrls(userId)
// TODO: implement deleteUrl(code, userId)

module.exports = {};
