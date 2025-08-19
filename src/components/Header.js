"use client";
import { useState } from 'react';
import Link from 'next/link';
// src/components/Header.js

// ... "use client"; ve import { useState } from 'react'; satırlarının altına ...

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Sol Taraf: Logo/İsim (Mobil için küçültüldü) */}
        <div className="text-center">
          <Link href="/" className="text-gray-800">
            {/* Metin boyutları ekran boyutuna göre değişecek (text-lg md:text-xl) */}
            <span className="text-lg md:text-xl font-extrabold tracking-tight">BARBAROS AYDIN</span>
            <span className="block text-xs font-medium text-brand-blue">Gayrimenkul Strateji Danışmanı</span>
          </Link>
        </div>

        {/* Masaüstü Menüsü (Sadece orta boy ve büyük ekranlarda görünür) */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-6 items-center">
            <li><Link href="/" className="text-gray-600 hover:text-brand-blue">Başlangıç</Link></li>
            <li><Link href="/hakkimda" className="text-gray-600 hover:text-brand-blue">Hakkımda</Link></li>
            <li><Link href="/hizmetlerim" className="text-gray-600 hover:text-brand-blue">Hizmetlerim</Link></li>
            <li><Link href="/yatirim-sihirbazi" className="text-gray-600 hover:text-brand-blue">Yatırım Sihirbazı</Link></li>
            <li><Link href="/iletisim" className="text-gray-600 hover:text-brand-blue">İletişim</Link></li>
          </ul>
        </nav>

        {/* Mobil Menü Butonu (Sadece küçük ekranlarda görünür) */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menüyü aç">
            {/* Menü açık veya kapalı olmasına göre ikon değişir */}
            {isMenuOpen ? (
              // Kapatma İkonu (X)
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
              // Hamburger İkonu
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            )}
          </button>
        </div>
      </div>

      {/* Açılır Mobil Menü (isMenuOpen true ise görünür) */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col items-end">
            <li><Link href="/" onClick={closeMenu} className="block py-3 w-full text-right pr-6 text-gray-700 hover:bg-gray-100">Başlangıç</Link></li>
            <li><Link href="/hakkimda" onClick={closeMenu} className="block py-3 w-full text-right pr-6 text-gray-700 hover:bg-gray-100">Hakkımda</Link></li>
            <li><Link href="/hizmetlerim" onClick={closeMenu} className="block py-3 w-full text-right pr-6 text-gray-700 hover:bg-gray-100">Hizmetlerim</Link></li>
            <li><Link href="/yatirim-sihirbazi" onClick={closeMenu} className="block py-3 w-full text-right pr-6 text-gray-700 hover:bg-gray-100">Yatırım Sihirbazı</Link></li>
            <li><Link href="/iletisim" onClick={closeMenu} className="block py-3 w-full text-right pr-6 text-gray-700 hover:bg-gray-100">İletişim</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}