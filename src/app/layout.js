// src/app/layout.js
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Script from 'next/script'
import { getPersonSchema, getWebSiteSchema } from '../lib/schema-helpers'

export const metadata = {
  title: "Barbaros AYDIN - Yatırım ve Değerleme Danışmanlığı",
  description: "Türkiye ve İngiltere’deki piyasa dinamiklerini yakından takip ederek, yatırımcıların portföylerini çeşitlendirmelerine, risklerini yönetmelerine ve uzun vadeli kazançlarını maksimize etmelerine yönelik değerleme danışmanlığı hizmeti veriyorum.",
};

export default function RootLayout({ children }) {
  const personSchema = getPersonSchema();
  const webSiteSchema = getWebSiteSchema();

  return (
    <html lang="tr">
      {/* <body> etiketinin içine tüm elemanlarımızı taşıdık */}
      <body className="flex flex-col min-h-screen">
        
        {/* Schema script'lerini body'nin başına aldık. Next.js bunları optimize edecektir. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />

        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        
        {/* Calendly script'i zaten body sonunda olduğu için doğru yerde. */}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
        
        {/* Calendly CSS'ini de Next.js'in Script bileşeni ile en sona eklemek en güvenli yoldur. */}
        <Script
          id="calendly-css"
          src="https://assets.calendly.com/assets/external/widget.css"
          strategy="lazyOnload"
        />

      </body>
    </html>
  );
}