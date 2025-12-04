export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/fatura', '/fatura/', '/tr/fatura', '/en/fatura', '/api/'],
    },
    sitemap: 'https://www.barbarosaydin.com/sitemap.xml',
  }
}