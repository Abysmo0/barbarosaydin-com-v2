// Basit mock blog veri kaynağı (ileride veritabanına bağlanabilir)
export const blogPosts = [
  {
    slug: 'konut-fiyat-endeksleri-analizi-2025-q2',
    title: '2025 Q2 Konut Fiyat Endeksleri Karşılaştırmalı Analiz',
    excerpt: 'Türkiye, ABD ve Avrupa konut fiyat endekslerinde son çeyrekteki eğilimler.',
    updatedAt: '2025-06-30',
    tags: ['konut', 'endeks', 'analiz']
  },
  {
    slug: 'portfoy-ceşitlendirme-stratejileri',
    title: 'Portföy Çeşitlendirme Stratejileri: Enflasyon ve Konut Endeksi Etkisi',
    excerpt: 'Makro oynaklık dönemlerinde korunma ve reel getiri optimizasyonu.',
    updatedAt: '2025-05-15',
    tags: ['portföy', 'enflasyon']
  }
];

export function getAllPosts() { return blogPosts; }
export function getPostBySlug(slug) { return blogPosts.find(p => p.slug === slug); }
