export async function GET() {
  return new Response(`User-agent: *\nAllow: /\nSitemap: https://www.barbarosaydin.com/sitemap.xml\n`, { headers: { 'Content-Type': 'text/plain' } });
}
