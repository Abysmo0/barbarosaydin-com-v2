// src/components/Footer.js

export default function Footer({ lang = 'tr' }) {
  const currentYear = new Date().getFullYear();

  // Footer metinleri için basit sözlük
  const content = {
    tr: "Tüm hakları saklıdır.",
    en: "All rights reserved."
  };

  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto text-center">
        <p>
          &copy; {currentYear} Barbaros AYDIN. {content[lang] || content.tr}
        </p>
      </div>
    </footer>
  );
}