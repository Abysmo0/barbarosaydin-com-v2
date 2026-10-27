import { getDictionary } from '@/get-dictionary';
import { getFAQSchema } from '@/lib/schema-helpers'; // Yolu kontrol et: src/lib/schema-helpers olmalı

export async function generateMetadata({ params }) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  
  return {
    title: `${dict.faq.title} | Barbaros AYDIN`,
    description: dict.faq.description
  };
}

export default async function FAQPage({ params }) {
  const { lang } = params;
  const dict = await getDictionary(lang);

  // Schema için veriyi hazırlayalım
  const faqItemsForSchema = dict.faq.items.map(item => ({
    q: item.q,
    a: item.a
  }));
  
  const faqSchema = getFAQSchema(faqItemsForSchema);

  return (
    <main className="container mx-auto px-6 py-20 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{dict.faq.title}</h1>
        <p className="text-lg text-gray-600">{dict.faq.description}</p>
      </div>
      
      <div className="space-y-8">
        {dict.faq.items.map((item, index) => (
          <div key={index} className="bg-gray-50 p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-3">{item.q}</h3>
            <p className="text-gray-700 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}