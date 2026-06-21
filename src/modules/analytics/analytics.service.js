const db = require('../../config/db');
const AppError = require('../../utils/AppError');

const recordClick = async (urlId, req) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'] || null;
  const referrer = req.headers['referer'] || null;

  await db.query(
    `INSERT INTO clicks (url_id, ip_address, user_agent, referrer)
     VALUES ($1, $2, $3, $4)`,
    [urlId, ip, userAgent, referrer]
  );
};

const getStats = async (code, userId) => {
  const urlResult = await db.query(
    `SELECT id, long_url, code, alias, created_at
     FROM urls
     WHERE (code = $1 OR alias = $1)
       AND user_id = $2
       AND is_active = TRUE`,
    [code, userId]
  );

  if (urlResult.rows.length === 0) {
    throw new AppError('URL not found or you do not own it', 404);
  }

  const url = urlResult.rows[0];

  const totalResult = await db.query(
    'SELECT COUNT(*) FROM clicks WHERE url_id = $1',
    [url.id]
  );

  const byDayResult = await db.query(
    `SELECT DATE(clicked_at) AS day, COUNT(*) AS clicks
     FROM clicks
     WHERE url_id = $1
       AND clicked_at > NOW() - INTERVAL '30 days'
     GROUP BY DATE(clicked_at)
     ORDER BY day ASC`,
    [url.id]
  );

  const referrerResult = await db.query(
    `SELECT referrer, COUNT(*) AS clicks
     FROM clicks
     WHERE url_id = $1
       AND referrer IS NOT NULL
     GROUP BY referrer
     ORDER BY clicks DESC
     LIMIT 5`,
    [url.id]
  );

  return {
    url: {
      shortCode: url.code,
      alias: url.alias,
      longUrl: url.long_url,
      createdAt: url.created_at,
    },
    totalClicks: parseInt(totalResult.rows[0].count),
    clicksByDay: byDayResult.rows,
    topReferrers: referrerResult.rows,
  };
};

module.exports = { recordClick, getStats };