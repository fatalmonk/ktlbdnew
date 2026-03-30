/**
 * Server-side check that VERCEL_TOKEN can call the Vercel REST API.
 * Token must be set in Vercel → Project → Environment Variables (not VITE_*).
 *
 * GET /api/vercel/status → { connected: true, vercelApi: "ok" }
 */
module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const token = process.env.VERCEL_TOKEN;
  if (!token) {
    res.status(503).json({
      connected: false,
      error:
        'VERCEL_TOKEN is not set. Add it under Project → Environment Variables in Vercel.',
    });
    return;
  }

  try {
    const r = await fetch('https://api.vercel.com/v2/user', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!r.ok) {
      const body = await r.json().catch(() => ({}));
      res.status(r.status).json({
        connected: false,
        error: body.error?.message || 'Vercel API request failed',
      });
      return;
    }

    res.status(200).json({ connected: true, vercelApi: 'ok' });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    res.status(500).json({ connected: false, error: message });
  }
};
