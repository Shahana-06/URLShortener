const db = require('../../config/db');
const redis = require('../../config/redis');
const base62 = require('../../utils/base62');
const AppError = require('../../utils/AppError');

const createShortUrl = async (longUrl, userId, customAlias) => {
  if (customAlias) {
    const existing = await db.query(
      'SELECT id FROM urls WHERE alias = $1',
      [customAlias]
    );
    if (existing.rows.length > 0) {
      throw new AppError('That alias is already taken', 409);
    }
  }

  const result = await db.query(
    `INSERT INTO urls (user_id, long_url, alias)
     VALUES ($1, $2, $3)
     RETURNING id`,
    [userId, longUrl, customAlias || null]
  );
  const id = result.rows[0].id;

  const shortCode = base62.encode(Number(id));

  await db.query(
    'UPDATE urls SET code = $1 WHERE id = $2',
    [shortCode, id]
  );

  await redis.set(`url:${shortCode}`, longUrl, 'EX', 86400);

  return {
    shortCode,
    shortUrl: `${process.env.BASE_URL}/${shortCode}`,
    longUrl,
  };
};

const resolveCode = async (code) => {
  // Check Redis — but we still need urlId for analytics so check DB too on miss
  const cached = await redis.get(`url:${code}`);

  const result = await db.query(
    `SELECT id, long_url FROM urls
     WHERE (code = $1 OR alias = $1)
       AND is_active = TRUE
       AND (expires_at IS NULL OR expires_at > NOW())`,
    [code]
  );

  if (result.rows.length === 0) {
    throw new AppError('Short URL not found', 404);
  }

  const { id, long_url } = result.rows[0];

  if (!cached) {
    await redis.set(`url:${code}`, long_url, 'EX', 86400);
  }

  return { longUrl: long_url, urlId: id };
};

module.exports = { createShortUrl, resolveCode };