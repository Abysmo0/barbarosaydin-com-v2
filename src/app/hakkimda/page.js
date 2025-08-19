// src/app/hakkimda/page.js
import Image from 'next/image';

// Sosyal medya ikonları
const IconLinkedIn = () => <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>;
const IconAcademia = () => (
  <img src="https://cdn-icons-png.flaticon.com/512/2111/2111319.png" alt="Academia" className="w-7 h-7 object-contain filter brightness-90 transition duration-150 group-hover:brightness-0" />
);
const IconYouTube = () => <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>;
const IconInstagram = () => <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9 26.3 26.2 58 34.4 93.9 36.2 37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>;

export default function AboutPage() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Hakkımda</h1>
        </div>
        
  {/* Ana Grid Yapısı (3 Sütunlu) */}
  {/* scale-90 reduces everything inside by 10% (headings are excluded) */}
  <div className="transform scale-90 origin-top grid grid-cols-1 md:grid-cols-3 gap-x-12">
          
          {/* Sol Sütun */}
          <div className="md:col-span-1 flex flex-col items-center text-center">
            <div className="w-full max-w-xs mx-auto">
              <Image
                src="/profil-foto.JPG"
                alt="Barbaros Aydın - Danışman"
                width={500}
                height={500}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="mt-8">
              <h3 className="text-[26px] font-bold text-gray-900 mb-6 transform scale-[1.2] origin-top">Takipte kalalım</h3>
              <div className="flex justify-center items-center space-x-6">
                  <a href="https://www.linkedin.com/in/barbarosaydin" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-gray-500 hover:text-blue-700 transition-colors">
                      <IconLinkedIn />
                  </a>
          <a href="https://deu.academia.edu/BarbarosAydin" target="_blank" rel="noopener noreferrer" title="Academia.edu" className="group text-gray-500 hover:text-gray-800 transition-colors">
            <IconAcademia />
          </a>
                  <a href="https://www.youtube.com/@barbarosaydin_" target="_blank" rel="noopener noreferrer" title="YouTube" className="text-gray-500 hover:text-red-600 transition-colors">
                      <IconYouTube />
                  </a>
                  <a href="https://www.instagram.com/barbarosaydin_" target="_blank" rel="noopener noreferrer" title="Instagram" className="text-gray-500 hover:text-pink-600 transition-colors">
                      <IconInstagram />
                  </a>
              </div>
            </div>
          </div>

          {/* Sağdaki Birleşik Sütun (Orta ve Sağ) */}
          <div className="md:col-span-2 mt-12 md:mt-0">
            <div className="space-y-6 text-gray-800 text-lg md:text-xl text-left md:w-3/4">
              <p>
                Türkiye ve İngiltere pazarı odaklı, iş geliştirme, gayrimenkul geliştirme ve yatırımı alanlarında <span className="font-semibold text-lg md:text-xl text-gray-900 transform scale-[1.111111] origin-top">15 yılı aşkın deneyime sahibim</span>. Şehir Planlama, Kentsel Tasarım ve İşletme disiplinlerinde edindiğim akademik birikim ile stratejik iş geliştirme, değerleme ve sürdürülebilir gayrimenkul çözümleri üretme konusunda uzmanlaşmış bulunuyorum. Disiplinler arası yaklaşımım, geliştirme süreçlerinde yer aldığım projelere finansal analiz, proje yönetimi ve yatırım optimizasyonu başlıklarında değer katmamla birlikte kavramsal vizyonlarını geliştirme imkanı da sağlamaktadır.
              </p>
              <p>
                Kariyerim boyunca <span className="font-semibold text-lg md:text-xl text-gray-900 transform scale-[1.111111] origin-top">uluslararası standartlarla uyumlu süreçler tasarladım.</span> Büyük ölçekli gayrimenkul projelerinin geliştirilmesinde, arsa seçiminden konsept tasarımına, fizibilite analizlerinden satış ve pazarlama stratejilerine kadar tüm aşamalarda aktif sorumluluk üstlendim. Sermaye Piyasası Mevzuatına tam uyum sağlayan bir değerleme şirketi kurdum. Bankalar ile kurumsal yatırımcılara değerleme hizmeti sundum. Yönetim kurulu seviyesinde alınan kararlarla yatırım portföylerinin kârlılığı artırdım, riskleri minimize ederek ve uzun vadeli değerler yaratılmasını sağladım.
              </p>
              <p>
                Bugün ise Türkiye’nin dinamik ve volatil gayrimenkul ortamında elde ettiğim tecrübeler ile İngiltere'nin kurumsal yatırım ekosisteminde edindiğim deneyimleri bir araya getirerek, farklı coğrafyalarda yatırımcılara güvenilir çözümler üretmekteyim. <span className="font-semibold text-lg md:text-xl text-gray-900 transform scale-[1.111111] origin-top">ESG kriterleri ve sürdürülebilirlik</span> ilkelerini stratejilerimin merkezine alarak, enerji verimliliği ve çevresel duyarlılığı yüksek projelerin hayata geçirilmesi için çalışmaktayım.
              </p>
              <p>
                Geçmiş tecrübelerimde farklı kurumlarda üstlendiğim üst düzey görevler, girişimcilik deneyimleri ve danışmanlık faaliyetleri, gayrimenkul sektöründe hem stratejik hem de operasyonel seviyede güçlü bir uzmanlık oluşturmamı sağladı. Uluslararası standartlara dayalı, güvenilir ve etik değerlere bağlı çalışma prensiplerim, yeni teknolojiler, PropTech uygulamaları, dijital değerleme modelleri ve veri odaklı yaklaşımları da kullanarak yatırım kararlarında şeffaflık ve öngörülebilirlik sağlıyor, bu sayede yatırımcılar ve iş ortakları için kalıcı ve sürdürülebilir değerler yaratıyorum. Ayrıca, sosyal sorumluluk anlayışımın bir yansıması olarak <span className="font-medium text-lg md:text-xl text-gray-900 transform scale-[1.111111] origin-top">kurucusu olduğum</span> <a href="https://milleon.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold text-lg md:text-xl">milleon.org</a> <span className="font-medium text-lg md:text-xl text-gray-900 transform scale-[1.111111] origin-top">platformu ile girişimcilik</span>, yenilikçi iş modelleri ve gönüllülüğü buluşturan projelere de destek veriyorum.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}