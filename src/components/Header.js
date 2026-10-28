'use client';

import Link from 'next/link';

export default function Header() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
        
        {/* Sol / Üst Logo */}
        <div>
          <a
            href="#"
            onClick={scrollToTop}
            className="text-gray-900 font-extrabold tracking-tight text-lg sm:text-xl hover:opacity-80 transition-opacity cursor-pointer select-none whitespace-nowrap"
            aria-label="Scroll to top"
          >
            BARBAROS AYDIN
          </a>
        </div>

        {/* Sağ / Alt Menü */}
        <nav>
          <ul className="flex items-center space-x-5 sm:space-x-6 text-xs sm:text-sm font-bold tracking-wide text-gray-700">
            <li>
              <Link href="/#home" className="hover:text-[#0A2252] transition-colors whitespace-nowrap">
                Home
              </Link>
            </li>
            <li>
              <Link href="/#expertise" className="hover:text-[#0A2252] transition-colors whitespace-nowrap">
                Expertise
              </Link>
            </li>
            <li>
              <Link href="/#about" className="hover:text-[#0A2252] transition-colors whitespace-nowrap">
                About
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-[#0A2252] transition-colors whitespace-nowrap">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

      </div>
    </header>
  );
}