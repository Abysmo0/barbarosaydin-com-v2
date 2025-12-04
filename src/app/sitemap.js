import { getAllPosts } from '@/lib/blog-data'; // Veya eski yol: '../../lib/blog-data'
import { listMarkdownPosts } from '@/lib/markdown'; // Veya eski yol: '../../lib/markdown'

export default async function sitemap() {
  const baseUrl = 'https://www.barbarosaydin.com';
  const languages = ['tr', 'en'];

  // 1. Statik Sayfalar
  const staticRoutes = [
    '',
    '/hakkimda',
    '/hizmetlerim',
    '/yatirim-sihirbazi',
    '/iletisim',
  ];

  // 2. Blog Yazılarını Çek (Eski kodundan aldık)
  // Eğer lib klasörün yerindeyse bu çalışır, hata verirse import yollarını kontrol ederiz.
  let blogPosts = [];
  try {
    const legacyPosts = getAllPosts() || [];
    const mdPosts = listMarkdownPosts() || [];
    blogPosts = [...legacyPosts, ...mdPosts];
  } catch (error) {
    console.warn("Blog posts could not be loaded for sitemap", error);
  }

  const sitemapEntries = [];

  // Statik Sayfalar İçin Döngü
  staticRoutes.forEach(route => {
    languages.forEach(lang => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'monthly',
        priority: route === '' ? 1 : 0.8,
      });
    });
  });

  // Blog Sayfaları İçin Döngü (Her dil için ayrı link oluşturur)
  blogPosts.forEach(post => {
    languages.forEach(lang => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/blog/${post.slug}`,
        lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  });

  return sitemapEntries;
}