const NYT_PREFIX = 'https://rss.nytimes.com/services/xml/rss/nyt/';
const ALLOWED_FEEDS = [
  'World.xml',
  'Europe.xml',
  'Africa.xml',
  'Americas.xml',
  'AsiaPacific.xml',
  'MiddleEast.xml',
  'Business.xml',
  'Technology.xml',
];

function isAllowed(url: string): boolean {
  try {
    const u = new URL(url);
    const full = u.origin + u.pathname;
    if (!full.startsWith(NYT_PREFIX)) return false;
    const file = url.substring(NYT_PREFIX.length);
    return ALLOWED_FEEDS.includes(file);
  } catch (_) {
    return false;
  }
}

export default async function handler(req: any, res: any) {
  const urlParam = (req.query.url as string) || '';
  const decoded = decodeURIComponent(urlParam);

  if (!decoded) {
    res.status(400).json({ error: 'Missing url parameter' });
    return;
  }
  if (!isAllowed(decoded)) {
    res.status(403).json({ error: 'Feed not allowed' });
    return;
  }

  try {
    const nytResp = await fetch(decoded, {
      headers: {
        'User-Agent': 'GridTilesRSSProxy/1.0 (+https://vercel.com/)'
      },
    });
    if (!nytResp.ok) {
      res.status(nytResp.status).json({ error: `Upstream status ${nytResp.status}` });
      return;
    }
    const xml = await nytResp.text();

    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300, stale-while-revalidate=600');
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    res.status(200).send(xml);
  } catch (e: any) {
    console.error('RSS proxy error', e);
    res.status(500).json({ error: 'Failed to fetch RSS' });
  }
}

export const config = {
  runtime: 'nodejs',
  regions: ['fra1'],
};
