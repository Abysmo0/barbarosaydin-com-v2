// src/app/layout.js
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Script from 'next/script'

export const metadata = {
  title: 'Barbaros AYDIN - Gayrimenkul Strateji Danışmanı',
  description: 'Strateji, Yatırım ve Geliştirme Danışmanlığı',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
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