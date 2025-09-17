// src/app/layout.js
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Script from 'next/script'
import { getPersonSchema, getWebSiteSchema } from '../lib/schema-helpers'

export const metadata = {
  title: 'Barbaros AYDIN - Gayrimenkul Strateji Danışmanı',
  description: 'Strateji, Yatırım ve Geliştirme Danışmanlığı',
}

export default function RootLayout({ children }) {
  const personSchema = getPersonSchema();
  const webSiteSchema = getWebSiteSchema();
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}