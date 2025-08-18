// src/app/layout.js
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
// Script bileşenine artık ihtiyacımız yok

export const metadata = {
  title: 'Barbaros AYDIN - Gayrimenkul Strateji Danışmanı',
  description: 'Stratejik büyüme, inovasyon ve gayrimenkul geliştirme danışmanlığı.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      {/* head etiketinden Calendly linki kaldırıldı */}
      <head />
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        {/* body'nin sonundan Calendly script'i kaldırıldı */}
      </body>
    </html>
  )
}