// src/app/hizmetlerim/page.js

// Ana sayfada kullandığımız ikonları burada da kullanacağız.
const IconStrategy = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="service-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" /></svg>;
const IconBusinessDev = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="service-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>;
const IconRealEstate = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="service-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>;
const IconSourcing = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="service-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


export default function ServicesPage() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        {/* Sayfa Başlığı */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Hizmetlerim</h1>
          <p className="text-lg text-gray-600 mt-4">Projelerinizi ve yatırımlarınızı bir üst seviyeye taşımak için sunduğum profesyonel çözümler.</p>
        </div>

        {/* Hizmet Listesi */}
        <div className="max-w-4xl mx-auto space-y-16">

          {/* Hizmet 1: Strateji Geliştirme */}
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600">
              <IconStrategy />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Strateji Geliştirme</h3>
              <p className="text-gray-600 text-lg mb-6">
                Hızla değişen piyasa koşullarında doğru stratejiyi belirlemek, sürdürülebilir başarı için kritik bir unsur haline gelmiştir. Kapsamlı pazar analizleri, rekabet değerlendirmeleri ve trend öngörüleri doğrultusunda hazırlanan stratejik yol haritaları, kurumların geleceğe hazırlıklı olmasını sağlar. Strateji geliştirme sürecinde, yalnızca mevcut hedeflere ulaşmayı değil, aynı zamanda değişen koşullara uyum sağlayabilecek esnek modellerin tasarlanmasını da önemsiyorum. Bu yaklaşım, iş dünyasında kalıcı bir değer yaratmanın temelini oluşturur.
              </p>
              <a href="/iletisim" className="inline-block bg-brand-blue text-white font-semibold px-6 py-2 rounded-md hover:opacity-90 transition-opacity duration-300">
                Hizmet Al
              </a>
            </div>
          </div>

          {/* Hizmet 2: İş Geliştirme */}
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600">
              <IconBusinessDev />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">İş Geliştirme</h3>
              <p className="text-gray-600 text-lg mb-6">
                Ulusal ve uluslararası pazarlarda edindiğim deneyimle, şirketlerin yeni fırsatlar keşfetmesine ve sürdürülebilir büyüme stratejileri oluşturmasına katkı sağlıyorum. İş geliştirme sürecinde yalnızca yeni satış kanallarının açılması değil, aynı zamanda stratejik ortaklıkların kurulması, operasyonel verimliliğin artırılması ve müşteri ilişkilerinin güçlendirilmesi ön planda tutulur. Bu sayede, kurumların mevcut kaynaklarını en etkin şekilde kullanarak gelirlerini artırmalarını ve uzun vadede rekabet avantajı elde etmelerini destekliyorum.
              </p>
              <a href="/iletisim" className="inline-block bg-brand-blue text-white font-semibold px-6 py-2 rounded-md hover:opacity-90 transition-opacity duration-300">
                Hizmet Al
              </a>
            </div>
          </div>
          
          {/* Hizmet 3: Gayrimenkul Geliştirme */}
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600">
              <IconRealEstate />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Gayrimenkul Geliştirme</h3>
              <p className="text-gray-600 text-lg mb-6">
                Gayrimenkul projelerinin başarıya ulaşması, doğru mülk seçiminden başlayarak projenin tamamlanmasına kadar geçen tüm sürecin profesyonel bir bakış açısıyla yönetilmesini gerektirir. Böylece, yatırımcılar ve kullanıcılar için yüksek katma değer üreten gayrimenkul çözümleri geliştirilebilir. Mimarlık ve şehircilik geçmişim sayesinde, konsept geliştirme, fizibilite çalışmaları, yatırım analizi ve proje yönetimi konularında kapsamlı danışmanlık sunuyorum. Ayrıca, sürdürülebilirlik ve değer optimizasyonunu merkeze alarak her projede uzun vadeli kazanç sağlamayı hedefliyorum.
              </p>
              <a href="/iletisim" className="inline-block bg-brand-blue text-white font-semibold px-6 py-2 rounded-md hover:opacity-90 transition-opacity duration-300">
                Hizmet Al
              </a>
            </div>
          </div>

          {/* Hizmet 4: Yatırım Amaçlı Mülk Edinimi */}
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600">
              <IconSourcing />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Yatırım Amaçlı Mülk Edinimi</h3>
              <p className="text-gray-600 text-lg mb-6">
                Gayrimenkul, hem sermaye değer artışı hem de düzenli gelir akışı sağlayabilen güçlü bir yatırım aracıdır. Bu alanda, yüksek getiri potansiyeline sahip, piyasaya açık veya kapalı özel fırsatları belirleyerek yatırımcıların doğru kararlar almasına yardımcı oluyorum. Türkiye ve İngiltere’deki piyasa dinamiklerini yakından takip ederek, yatırımcıların portföylerini çeşitlendirmelerine, risklerini yönetmelerine ve uzun vadeli kazançlarını maksimize etmelerine yönelik profesyonel analizler sunuyorum. Amacım, her yatırımın yalnızca bugünkü değil, gelecekteki değerini de güvence altına almaktır.
              </p>
              <a href="/iletisim" className="inline-block bg-brand-blue text-white font-semibold px-6 py-2 rounded-md hover:opacity-90 transition-opacity duration-300">
                Hizmet Al
              </a>
            </div>
          </div>

        </div>
        {/* Spacer to separate last button from bottom banner: approx. same height as the button */}
        <div className="h-10 md:h-12" aria-hidden="true" />
      </div>
    </section>
  );
}