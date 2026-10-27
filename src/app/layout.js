// src/app/[lang]/layout.js
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';
import { getPersonSchema, getWebSiteSchema } from '@/lib/schema-helpers';

export const metadata = {
  title: 'Barbaros Aydin | Strategy - Investment - Development',
  description: 'I help businesses, investors and property owners evaluate opportunities, develop strategies and make informed decisions.',
  metadataBase: new URL('https://www.barbarosaydin.com'),
  alternates: {
    canonical: '/',
  },
};

export default async function RootLayout({ children, params }) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  
  const personSchema = typeof getPersonSchema === 'function' ? getPersonSchema() : null;
  const webSiteSchema = typeof getWebSiteSchema === 'function' ? getWebSiteSchema() : null;

  return (
    <html lang={lang}>
      <body className="flex flex-col min-h-screen">
        {personSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
          />
        )}
        {webSiteSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
          />
        )}

        <Header />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />

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