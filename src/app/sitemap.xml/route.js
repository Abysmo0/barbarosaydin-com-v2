import { NextResponse } from 'next/server';
import { getAllPosts } from '../../lib/blog-data';
import { listMarkdownPosts } from '../../lib/markdown';

async function getStaticLinks() {
  return [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/hakkimda', changefreq: 'monthly', priority: 0.8 }
  ];
}

// Placeholder blog list (ileride veritabanından çek)
async function getBlogPosts() {
  const posts = [...getAllPosts(), ...listMarkdownPosts()];
  return posts.map(p => ({
    url: `/blog/${p.slug}`,
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: p.updatedAt
  }));
}

export async function GET() {
  const hostname = 'https://www.barbarosaydin.com';
  const links = [...await getStaticLinks(), ...await getBlogPosts()];

  const items = links.map(l => {
    const lastmod = l.lastmod ? `<lastmod>${new Date(l.lastmod).toISOString()}</lastmod>` : '';
    return `<url><loc>${hostname}${l.url}</loc><changefreq>${l.changefreq}</changefreq><priority>${l.priority}</priority>${lastmod}</url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</urlset>`;
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } });
}
