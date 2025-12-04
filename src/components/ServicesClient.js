'use client';
import { useEffect, useLayoutEffect } from 'react';

// --- İKONLAR ---
const IconStrategy = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="service-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" /></svg>;
const IconBusinessDev = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="service-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>;
const IconRealEstate = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="service-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>;
const IconSourcing = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="service-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

export default function ServicesClient({ dict, lang }) {
  
  // --- SCROLL MANTIĞI (Mevcut koddan korundu) ---
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    let targetId = '';
    if (window.location.hash) {
      targetId = decodeURIComponent(window.location.hash.slice(1));
    } else {
      try { targetId = sessionStorage.getItem('pendingServiceSection') || ''; } catch (_) {}
    }
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (!el) return;
    try { sessionStorage.removeItem('pendingServiceSection'); } catch (_) {}
    const rect = el.getBoundingClientRect();
    const absoluteTop = rect.top + window.pageYOffset;
    const offset = absoluteTop - (window.innerHeight - rect.height) / 2;
    window.scrollTo(0, Math.max(offset, 0));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const centerSmooth = () => {
      const { hash } = window.location;
      if (!hash) return;
      const id = decodeURIComponent(hash.slice(1));
      const el = document.getElementById(id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const absoluteTop = rect.top + window.pageYOffset;
      const offset = absoluteTop - (window.innerHeight - rect.height) / 2;
      window.scrollTo({ top: Math.max(offset, 0), behavior: 'smooth' });
    };
    window.addEventListener('hashchange', centerSmooth);
    return () => window.removeEventListener('hashchange', centerSmooth);
  }, []);

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        {/* Başlık */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{dict.services.title}</h1>
          <p className="text-lg text-gray-600 mt-4">{dict.services.subtitle}</p>
        </div>

        {/* Hizmetler Listesi */}
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* 1. Strateji */}
          <div id="strateji-gelistirme" className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600">
              <IconStrategy />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{dict.services.items.strategy.title}</h3>
              <p className="text-gray-600 text-lg mb-6">{dict.services.items.strategy.desc}</p>
              <a href={`/${lang}/iletisim`} className="inline-block bg-brand-blue text-white font-semibold px-6 py-2 rounded-md hover:opacity-90 transition-opacity duration-300">
                {dict.services.button}
              </a>
            </div>
          </div>

          {/* 2. İş Geliştirme */}
          <div id="is-gelistirme" className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600">
              <IconBusinessDev />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{dict.services.items.business.title}</h3>
              <p className="text-gray-600 text-lg mb-6">{dict.services.items.business.desc}</p>
              <a href={`/${lang}/iletisim`} className="inline-block bg-brand-blue text-white font-semibold px-6 py-2 rounded-md hover:opacity-90 transition-opacity duration-300">
                {dict.services.button}
              </a>
            </div>
          </div>
          
          {/* 3. Gayrimenkul Geliştirme */}
          <div id="gayrimenkul-gelistirme" className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600">
              <IconRealEstate />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{dict.services.items.realestate.title}</h3>
              <p className="text-gray-600 text-lg mb-6">{dict.services.items.realestate.desc}</p>
              <a href={`/${lang}/iletisim`} className="inline-block bg-brand-blue text-white font-semibold px-6 py-2 rounded-md hover:opacity-90 transition-opacity duration-300">
                {dict.services.button}
              </a>
            </div>
          </div>

          {/* 4. Yatırım */}
          <div id="yatirim-amacli-mulk-edinimi" className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600">
              <IconSourcing />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{dict.services.items.investment.title}</h3>
              <p className="text-gray-600 text-lg mb-6">{dict.services.items.investment.desc}</p>
              <a href={`/${lang}/iletisim`} className="inline-block bg-brand-blue text-white font-semibold px-6 py-2 rounded-md hover:opacity-90 transition-opacity duration-300">
                {dict.services.button}
              </a>
            </div>
          </div>

        </div>
        <div className="h-10 md:h-12" aria-hidden="true" />
      </div>
    </section>
  );
}