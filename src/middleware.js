// Basit IP bazlı rate limit (in-memory). Üretimde kalıcı store (Redis vb.) önerilir.
const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10); // 60s
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '90', 10); // dakika başına istek
const ipBuckets = new Map(); // ip -> { count, reset }

export function middleware(req) {
  const { nextUrl } = req;
  if (!nextUrl.pathname.startsWith('/api/fetch-all-data')) return;
  const ip = req.ip || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  let bucket = ipBuckets.get(ip);
  if (!bucket || bucket.reset < now) {
    bucket = { count: 0, reset: now + RATE_LIMIT_WINDOW_MS };
    ipBuckets.set(ip, bucket);
  }
  bucket.count++;
  if (bucket.count > RATE_LIMIT_MAX) {
    const retryAfter = Math.max(1, Math.ceil((bucket.reset - now) / 1000));
    return new Response(JSON.stringify({ error: 'RATE_LIMIT', retryAfter }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(retryAfter),
        'Cache-Control': 'no-store'
      }
    });
  }
}

export const config = {
  matcher: ['/api/fetch-all-data']
};
