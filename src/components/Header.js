"use client";
import { useState } from 'react';
import Link from 'next/link';

// Header artık "lang" prop'unu alıyor (layout.js'den geliyor)
export default function Header({ lang = 'tr' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  // Header içi basit çeviri sözlüğü
  const menu = {
    tr: {
      home: 'Başlangıç',
      about: 'Hakkımda',
      services: 'Hizmetlerim',
      wizard: 'Yatırım Sihirbazı',
      contact: 'İletişim',
      subtitle: 'Gayrimenkul Strateji Danışmanı'
    },
    en: {
      home: 'Home',
      about: 'About Me',
      services: 'Services',
      wizard: 'Investment Wizard',
      contact: 'Contact',
      subtitle: 'Real Estate Strategy Advisor'
    }
  };

  // Geçerli dildeki metinleri seçiyoruz
  const t = menu[lang] || menu.tr;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Sol Taraf: Logo/İsim */}
        <div className="text-center">
          {/* Anasayfa linki dile göre: /tr veya /en */}
          <Link href={`/${lang}`} className="text-gray-800">
            <span className="text-lg md:text-xl font-extrabold tracking-tight">BARBAROS AYDIN</span>
            <span className="block text-xs font-medium text-brand-blue">{t.subtitle}</span>
          </Link>
        </div>

        {/* Masaüstü Menüsü */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-6 items-center">
            <li><Link href={`/${lang}`} className="text-gray-600 hover:text-brand-blue">{t.home}</Link></li>
            <li><Link href={`/${lang}/hakkimda`} className="text-gray-600 hover:text-brand-blue">{t.about}</Link></li>
            <li><Link href={`/${lang}/hizmetlerim`} className="text-gray-600 hover:text-brand-blue">{t.services}</Link></li>
            <li><Link href={`/${lang}/yatirim-sihirbazi`} className="text-gray-600 hover:text-brand-blue">{t.wizard}</Link></li>
            <li><Link href={`/${lang}/iletisim`} className="text-gray-600 hover:text-brand-blue">{t.contact}</Link></li>
          </ul>
        </nav>

        {/* Mobil Menü Butonu */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menüyü aç">
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            )}
          </button>
        </div>
      </div>

      {/* Açılır Mobil Menü */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col items-end">
            <li><Link href={`/${lang}`} onClick={closeMenu} className="block py-3 w-full text-right pr-6 text-gray-700 hover:bg-gray-100">{t.home}</Link></li>
            <li><Link href={`/${lang}/hakkimda`} onClick={closeMenu} className="block py-3 w-full text-right pr-6 text-gray-700 hover:bg-gray-100">{t.about}</Link></li>
            <li><Link href={`/${lang}/hizmetlerim`} onClick={closeMenu} className="block py-3 w-full text-right pr-6 text-gray-700 hover:bg-gray-100">{t.services}</Link></li>
            <li><Link href={`/${lang}/yatirim-sihirbazi`} onClick={closeMenu} className="block py-3 w-full text-right pr-6 text-gray-700 hover:bg-gray-100">{t.wizard}</Link></li>
            <li><Link href={`/${lang}/iletisim`} onClick={closeMenu} className="block py-3 w-full text-right pr-6 text-gray-700 hover:bg-gray-100">{t.contact}</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}