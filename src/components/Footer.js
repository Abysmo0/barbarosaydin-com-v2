import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0B1528] text-white py-14 px-6 border-t border-gray-800">
      <div className="container mx-auto max-w-4xl text-center">
        
        {/* Profil & İletişim Bilgileri */}
        <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
          Barbaros Aydin
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Strategy | Investment | Development
        </p>
        <p className="text-sm text-gray-400 max-w-md mx-auto mb-6 leading-relaxed">
          Independent professional advisory across business, investment and real estate.
        </p>
        <p className="text-sm text-gray-300 mb-10">
          Email:{' '}
          <a
            href="mailto:contact@barbarosaydin.com"
            className="text-white font-medium hover:underline"
          >
            contact@barbarosaydin.com
          </a>
        </p>

        {/* Alt Menü Linkleri (Mobilde Kırılmayan Dengeli Düzen) */}
        <div className="pt-8 border-t border-gray-800/80 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs sm:text-sm text-gray-400">
          <Link href="/#home" className="hover:text-white transition-colors whitespace-nowrap">
            Home
          </Link>
          <span className="text-gray-600">·</span>
          
          <Link href="/#expertise" className="hover:text-white transition-colors whitespace-nowrap">
            Expertise
          </Link>
          <span className="text-gray-600">·</span>
          
          <Link href="/#about" className="hover:text-white transition-colors whitespace-nowrap">
            About
          </Link>
          <span className="text-gray-600">·</span>
          
          <Link href="/#contact" className="hover:text-white transition-colors whitespace-nowrap">
            Contact
          </Link>
          <span className="text-gray-600">·</span>
          
          <Link href="/privacy-policy" className="hover:text-white transition-colors whitespace-nowrap">
            Privacy Policy &amp; Terms
          </Link>
        </div>

      </div>
    </footer>
  );
}