import { getFAQSchema } from '../../lib/schema-helpers';

export const metadata = {
  title: 'Sık Sorulan Sorular | Barbaros Aydın',
  description: 'Gayrimenkul, konut fiyat endeksi ve yatırım stratejileri hakkında sık sorulan sorular.'
};

const FAQ_ITEMS = [
  { q: 'Konut fiyat endeksi verileri hangi kaynaktan geliyor?', a: 'FRED (Federal Reserve Economic Data) üzerinden BIS Real Residential Property Prices serilerinden çekilmektedir.' },
  { q: 'Aylık HPI nasıl hesaplanıyor?', a: 'Çeyreklik açıklanan değer ilgili çeyreğin üç ayına aynen dağıtılır ve en güncel açıklanan çeyrek veri geriye dönük kullanılır.' },
  { q: 'Döviz ve emtia fiyatları gerçek zamanlı mı?', a: 'Dakikalar içinde güncellenen Yahoo Finance spot fiyatları baz alınır; gecikmeli olabilir.' }
];

export default function FAQPage() {
  const faqSchema = getFAQSchema(FAQ_ITEMS);
  return (
    <main className="prose mx-auto px-4 py-8">
      <h1>Sık Sorulan Sorular</h1>
      <ul>
        {FAQ_ITEMS.map(item => (
          <li key={item.q}>
            <strong>{item.q}</strong>
            <p>{item.a}</p>
          </li>
        ))}
      </ul>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}