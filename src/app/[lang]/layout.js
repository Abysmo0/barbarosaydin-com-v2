import '../globals.css'; // CSS yolu (2 klasör yukarıda olduğu için ../../)
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';
import { getDictionary } from '@/get-dictionary';
import { getPersonSchema, getWebSiteSchema } from '@/lib/schema-helpers';

// Bu fonksiyon sayfaların meta etiketlerini (Title, Description) dinamik üretir
export async function generateMetadata({ params }) {
  const { lang } = params;
  const dict = await getDictionary(lang);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      languages: {
        'tr': '/tr',
        'en': '/en',
      },
    },
  };
}

export default async function RootLayout({ children, params }) {
  const { lang } = params;
  const personSchema = getPersonSchema();
  const webSiteSchema = getWebSiteSchema();

  // Dil parametresi header/footer'a iletiliyor
  return (
    <html lang={lang}>
      <body className="flex flex-col min-h-screen">
        
        {/* Schema.org Yapısal Verileri (SEO için) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />

        <Header lang={lang} />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer lang={lang} />
        
        {/* Calendly Widget */}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
        <Script
          id="calendly-css"
          src="https://assets.calendly.com/assets/external/widget.css"
          strategy="lazyOnload"
        />

      </body>
    </html>
  );
}