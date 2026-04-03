/**
 * Lightweight health check for uptime and deploy verification.
 * GET /api/health → { ok: true, service, time }
 */
module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  res.status(200).json({
    ok: true,
    service: 'ktl-website',
    time: new Date().toISOString(),
  });
};
