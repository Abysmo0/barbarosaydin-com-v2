export async function GET() {
  return new Response(`User-agent: *\nAllow: /\n\n# Önemli içerikler\n/hakkimda\n/blog\n`, { headers: { 'Content-Type': 'text/plain' } });
}
