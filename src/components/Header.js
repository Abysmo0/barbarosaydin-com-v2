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
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        
        <div>
          <a
            href="#"
            onClick={scrollToTop}
            className="text-gray-900 font-extrabold tracking-tight text-xl hover:opacity-80 transition-opacity cursor-pointer select-none"
            aria-label="Scroll to top"
          >
            BARBAROS AYDIN
          </a>
        </div>

        <nav>
          <ul className="flex flex-wrap items-center space-x-6 text-sm font-bold tracking-wide text-gray-700">
            <li><Link href="/#home" className="hover:text-[#0A2252] transition-colors">Home</Link></li>
            <li><Link href="/#expertise" className="hover:text-[#0A2252] transition-colors">Expertise</Link></li>
            <li><Link href="/#about" className="hover:text-[#0A2252] transition-colors">About</Link></li>
            <li><Link href="/#contact" className="hover:text-[#0A2252] transition-colors">Contact</Link></li>
          </ul>
        </nav>

      </div>
    </header>
  );
}