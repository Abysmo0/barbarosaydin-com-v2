// src/app/page.js
'use client';
import ServiceCard from '@/components/ServiceCard';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// İkonlarımız...
const IconStrategy = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="service-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" /></svg>;
const IconBusinessDev = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="service-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>;
const IconRealEstate = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="service-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>;
const IconSourcing = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="service-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

export default function HomePage() {
  const router = useRouter();

  const onServiceGridClick = (e) => {
    // Anchor delegation: hedef href /hizmetlerim#... ise intercept
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href') || '';
    if (href.startsWith('/hizmetlerim#')) {
      e.preventDefault();
      const hash = href.split('#')[1];
      if (hash) {
        try { sessionStorage.setItem('pendingServiceSection', hash); } catch (_) {}
      }
      // hash olmadan push => tarayıcı otomatik anchor scroll yapmaz
      router.push('/hizmetlerim', { scroll: false });
    }
  };

  return (
    <div className="bg-gray-50">
      <section className="relative w-full hero-background">
        <div className="container mx-auto px-6 py-32 md:py-48 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Strateji, Yatırım ve Geliştirme Danışmanlığı
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200">
            Uluslararası standartlarda, veriye dayalı ve inovatif çözümlerle yatırımcılar ve işletmeler için kalıcı değer yaratıyor, yenilikçi çözümler sunuyorum.
          </p>
          <div className="mt-8">
            <Link href="/#hizmetlerim" className="inline-block bg-brand-blue text-white font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:opacity-90 transition-opacity duration-300">
              Hizmet Almaya Başlayın
            </Link>
          </div>
        </div>
      </section>

      <section id="hizmetlerim" className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Hizmetlerim</h2>
            <p className="text-gray-600 mt-4">Şirketlerin ve yatırımcıların hedeflerine ulaşmasını sağlayacak, değer odaklı profesyonel hizmetler.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto" onClick={onServiceGridClick}>
              <ServiceCard link="/hizmetlerim#strateji-gelistirme" icon={<IconStrategy />} title="Strateji Geliştirme" description="Pazar analizi, rekabet değerlendirmesi ve uzun vadeli yol haritaları ile sürdürülebilir bir gelecek inşa etmeniz için sizinle beraber çalışıyorum."/>
             <ServiceCard link="/hizmetlerim#is-gelistirme" icon={<IconBusinessDev />} title="İş Geliştirme" description="Yeni pazarlar keşfederek, stratejik ortaklıklar kurarak ve satış kanallarınızı optimize ederek gelirlerinizi artırmanıza yardımcı oluyorum."/>
             <ServiceCard link="/hizmetlerim#gayrimenkul-gelistirme" icon={<IconRealEstate />} title="Gayrimenkul Geliştirme" description="Taşınmazın analizinden proje safhası tamamlanana kadar tüm gayrimenkul geliştirme süreçlerinde aktif rol alıyorum."/>
             <ServiceCard link="/hizmetlerim#yatirim-amacli-mulk-edinimi" icon={<IconSourcing />} title="Gayrimenkul Yatırım Değerlemesi" description="Yüksek getiri potansiyeline sahip gayrimenkul yatırım fırsatlarını sizin için inceleyerek yatırım kararı almanıza katkı sağlıyorum."/>
          </div>
        </div>
      </section>

      <section className="bg-fenerbahce-navy">
          <div className="container mx-auto px-6 py-20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Güvenilir Stratejiler için İlk Adımı Atın
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                  Hedeflerinizi konuşmak, projelerinizi değerlendirmek ve yol haritasını oluşturmak için bir görüşme planlayalım.
              </p>
              <div className="mt-8">
                  <Link href="/iletisim" className="inline-block bg-white text-fenerbahce-navy font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-300">
                      İletişime Geçin
                  </Link>
              </div>
          </div>
      </section>
    </div>
  );
}