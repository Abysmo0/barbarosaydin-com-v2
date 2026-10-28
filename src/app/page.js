// src/app/[lang]/page.js
import Image from 'next/image';

const IconStrategy = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-[#0A2252]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118.75 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
  </svg>
);

const IconInvestment = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-[#0A2252]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
  </svg>
);

const IconRealEstate = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-[#0A2252]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
  </svg>
);

export default function HomePage() {
  return (
    <div className="bg-gray-50 selection:bg-[#0A2252] selection:text-white">
      
      {/* 1. Hero Section - DEĞİŞTİRİLECEK KISIM */}
<section 
  id="home" 
  className="relative w-full py-36 md:py-48 text-center text-white"
  style={{
    backgroundImage: "linear-gradient(rgba(10, 34, 82, 0.72), rgba(10, 34, 82, 0.72)), url('/banner.jpg')",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  }}
>
  <div className="w-full px-6 md:px-16 mx-auto">
    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
      Strategy - Investment - Development
    </h1>
    <p className="text-lg md:text-xl text-gray-200 mb-4">
      I help businesses, investors and property owners evaluate opportunities, develop strategies and make informed decisions.
    </p>
    <p className="text-lg md:text-xl text-gray-200 mb-10">
      Combining experience in real estate, investment, business development and operations, I bring a practical, analytical approach to complex business challenges.
    </p>
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
      <a href="#expertise" className="w-full sm:w-auto bg-white text-[#0A2252] font-semibold text-base px-8 py-3.5 rounded shadow-lg hover:bg-gray-100 transition-colors duration-300">
        Explore My Expertise
      </a>
      <a href="#contact" className="w-full sm:w-auto border border-white text-white font-semibold text-base px-8 py-3.5 rounded hover:bg-white hover:text-[#0A2252] transition-colors duration-300">
        Get in Touch
      </a>
    </div>
  </div>
</section>

      {/* 2. Introduction */}
      <section id="introduction" className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Turning Opportunities into Informed Decisions</h2>
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed max-w-6xl mx-auto">
            <p>
              Good decisions start with understanding the opportunity, assessing the risks and identifying where value can be created.
            </p>
            <p>
              My work brings together strategic thinking, financial and market analysis, project development and operational experience. I work across different stages of the decision-making process, from evaluating an initial idea to developing a strategy and supporting its implementation.
            </p>
            <p>
              My background spans real estate, valuation, business development, investment and corporate operations, providing a multidisciplinary perspective on business challenges.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Areas of Expertise */}
      <section id="expertise" className="bg-white py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Areas of Expertise</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-6"><IconStrategy /></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Strategy & Business Development</h3>
              <p className="text-gray-600 mb-6 min-h-[80px]">
                Identifying opportunities, evaluating business potential and developing practical strategies for growth.
              </p>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-start"><span className="text-[#0A2252] mr-2">•</span> Business and market analysis</li>
                <li className="flex items-start"><span className="text-[#0A2252] mr-2">•</span> Opportunity assessment</li>
                <li className="flex items-start"><span className="text-[#0A2252] mr-2">•</span> Strategic planning</li>
                <li className="flex items-start"><span className="text-[#0A2252] mr-2">•</span> Business development and partnerships</li>
              </ul>
              <a href="#contact" className="inline-flex items-center font-semibold text-[#0A2252] hover:underline">
                Explore Strategy & Business Development &rarr;
              </a>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-6"><IconInvestment /></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Investment & Feasibility</h3>
              <p className="text-gray-600 mb-6 min-h-[80px]">
                Supporting informed decisions through structured analysis of opportunities, financial assumptions, risks and potential outcomes.
              </p>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-start"><span className="text-[#0A2252] mr-2">•</span> Investment and opportunity assessment</li>
                <li className="flex items-start"><span className="text-[#0A2252] mr-2">•</span> Financial feasibility analysis</li>
                <li className="flex items-start"><span className="text-[#0A2252] mr-2">•</span> Market research and benchmarking</li>
                <li className="flex items-start"><span className="text-[#0A2252] mr-2">•</span> Scenario analysis and decision support</li>
              </ul>
              <a href="#contact" className="inline-flex items-center font-semibold text-[#0A2252] hover:underline">
                Explore Investment & Feasibility &rarr;
              </a>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-6"><IconRealEstate /></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Real Estate & Development</h3>
              <p className="text-gray-600 mb-6 min-h-[80px]">
                Applying experience in property valuation, development and investment to assess opportunities and support value creation.
              </p>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-start"><span className="text-[#0A2252] mr-2">•</span> Property and development appraisal</li>
                <li className="flex items-start"><span className="text-[#0A2252] mr-2">•</span> Development strategy and feasibility</li>
                <li className="flex items-start"><span className="text-[#0A2252] mr-2">•</span> Market and location analysis</li>
                <li className="flex items-start"><span className="text-[#0A2252] mr-2">•</span> Real estate investment and portfolio strategy</li>
              </ul>
              <a href="#contact" className="inline-flex items-center font-semibold text-[#0A2252] hover:underline">
                Explore Real Estate & Development &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. My Approach (Temizlenmiş ve Sadeleştirilmiş Hali) */}
<section id="approach" className="relative py-24 md:py-28 bg-white overflow-hidden">

  <div className="w-full px-4 md:px-12 mx-auto text-center relative z-10 max-w-7xl">
    <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-[#14231C] mb-4 tracking-tight">
      Analytical Thinking. Commercial Perspective. Practical Solutions.
    </h2>
    <p className="text-base md:text-lg text-[#5A6E63] mb-12 md:mb-16 max-w-4xl mx-auto font-normal leading-relaxed">
      Every project is different. My approach starts with understanding the client&apos;s objectives, the available information and the decisions that need to be made.
    </p>

    {/* MASAÜSTÜ: Temizlenmiş SVG Akış Şeması */}
    <div className="hidden lg:block relative max-w-6xl mx-auto">
      <svg 
        viewBox="0 0 1024 511" 
        className="w-full h-auto block select-none drop-shadow-sm" 
        fill="none" 
        role="img" 
        aria-label="Understand, Analyse, Evaluate, Recommend process"
      >
        <defs>
          <linearGradient id="ribbonDarkBody" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#133624" />
            <stop offset="25%" stopColor="#1B4731" />
            <stop offset="55%" stopColor="#22533B" />
            <stop offset="80%" stopColor="#2E694D" />
            <stop offset="100%" stopColor="#488062" />
          </linearGradient>

          <linearGradient id="ribbonLightRim" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6C9E82" />
            <stop offset="35%" stopColor="#96C2A9" />
            <stop offset="65%" stopColor="#B3D5C2" />
            <stop offset="100%" stopColor="#9CC6B0" />
          </linearGradient>

          <linearGradient id="goldRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2D6" />
            <stop offset="30%" stopColor="#DEBA7E" />
            <stop offset="70%" stopColor="#A88243" />
            <stop offset="100%" stopColor="#F5E3BD" />
          </linearGradient>

          <radialGradient id="nodeGemGrad" cx="38%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#3F7A5E" />
            <stop offset="50%" stopColor="#1F4D37" />
            <stop offset="85%" stopColor="#123624" />
            <stop offset="100%" stopColor="#0B2016" />
          </radialGradient>

          <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E5BE79" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#D8A855" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FAF8F5" stopOpacity="0" />
          </radialGradient>

          <filter id="badge3DShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#123322" floodOpacity="0.32" />
          </filter>
        </defs>

        {/* 1. Sadeleştirilmiş Eşmerkezli Altın Yaylar (Dış hatlar kaldırıldı) */}
        <g stroke="#D5C7A8" strokeWidth="0.85" opacity="0.32" fill="none">
          <circle cx="90" cy="50" r="110" />
          <circle cx="90" cy="50" r="145" />
          <circle cx="90" cy="50" r="180" />
          <circle cx="90" cy="50" r="215" />

          <circle cx="960" cy="460" r="110" />
          <circle cx="960" cy="460" r="145" />
          <circle cx="960" cy="460" r="180" />
        </g>

        {/* 2. Düğümlerin Arkasındaki Sıcak Işıma Noktaları */}
        <circle cx="129" cy="370" r="45" fill="url(#goldGlow)" />
        <circle cx="373" cy="216" r="45" fill="url(#goldGlow)" />
        <circle cx="622" cy="285" r="45" fill="url(#goldGlow)" />
        <circle cx="858" cy="150" r="45" fill="url(#goldGlow)" />

        {/* 3. Ana Kurdele Katmanları */}
        <path
          d="M 129 370 C 240 370, 260 216, 373 216 C 485 216, 515 285, 622 285 C 730 285, 755 150, 858 150"
          stroke="#0D2418"
          strokeWidth="26"
          strokeLinecap="round"
          opacity="0.18"
          transform="translate(0, 10)"
        />
        <path
          d="M 129 373 C 240 373, 260 219, 373 219 C 485 219, 515 288, 622 288 C 730 288, 755 153, 858 153"
          stroke="url(#ribbonDarkBody)"
          strokeWidth="20"
          strokeLinecap="round"
        />
        <path
          d="M 129 367 C 240 367, 260 213, 373 213 C 485 213, 515 282, 622 282 C 730 282, 755 147, 858 147"
          stroke="url(#ribbonLightRim)"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <path
          d="M 129 370 C 240 370, 260 216, 373 216 C 485 216, 515 285, 622 285 C 730 285, 755 150, 858 150"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* 4. Serbest Yüzen Altın Vurgu Noktaları */}
        <g fill="#D3AF6B">
          <circle cx="242" cy="270" r="3.2" />
          <circle cx="310" cy="302" r="2.4" opacity="0.85" />
          <circle cx="515" cy="223" r="3.2" />
          <circle cx="692" cy="187" r="3.2" />
          <circle cx="750" cy="226" r="2.6" opacity="0.85" />
        </g>

        {/* 5. Düğüm Rozetleri (Merkez Kilitli ve Kısa/Zarif Hover Efekti) */}
        {[
          { n: 1, x: 129, y: 370 },
          { n: 2, x: 373, y: 216 },
          { n: 3, x: 622, y: 285 },
          { n: 4, x: 858, y: 150 },
        ].map((node) => (
          <g 
            key={node.n} 
            className="group cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label={`Step ${node.n}`}
          >
            {/* Dış Altın İnce Çember - Kendi merkezinde hafif açılır */}
            <circle 
              cx={node.x} 
              cy={node.y} 
              r="30" 
              stroke="#DEBA7E" 
              strokeWidth="0.9" 
              opacity="0.5" 
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              className="transition-all duration-300 ease-out group-hover:scale-[1.07] group-hover:opacity-85" 
            />

            {/* Rozet Gövdesi */}
            <g 
              filter="url(#badge3DShadow)"
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              className="transition-transform duration-300 ease-out group-hover:scale-[1.02]"
            >
              <circle 
                cx={node.x} 
                cy={node.y} 
                r="24" 
                fill="url(#goldRimGrad)" 
              />
              <circle 
                cx={node.x} 
                cy={node.y} 
                r="19.5" 
                fill="#0B2016" 
                opacity="0.4" 
              />
              <circle 
                cx={node.x} 
                cy={node.y} 
                r="18" 
                fill="url(#nodeGemGrad)" 
                stroke="#FFFFFF" 
                strokeWidth="0.75" 
                strokeOpacity="0.4" 
              />
              <text
                x={node.x}
                y={node.y + 0.5}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#FFFFFF"
                fontWeight="700"
                fontSize="16"
                fontFamily="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont"
                className="select-none pointer-events-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
              >
                {node.n}
              </text>
            </g>
          </g>
        ))}

        {/* 6. Adım Metinleri */}
        <foreignObject x="34" y="405" width="190" height="95">
          <div className="text-center font-sans">
            <h4 className="text-[20px] font-bold text-[#14261C] mb-1 tracking-tight">Understand</h4>
            <p className="text-[12px] leading-[1.45] text-[#55695E]">
              Clarify the objectives, context and key challenges.
            </p>
          </div>
        </foreignObject>

        <foreignObject x="278" y="95" width="190" height="95">
          <div className="text-center font-sans">
            <h4 className="text-[20px] font-bold text-[#14261C] mb-1 tracking-tight">Analyse</h4>
            <p className="text-[12px] leading-[1.45] text-[#55695E]">
              Assess the relevant market, financial, operational and strategic factors.
            </p>
          </div>
        </foreignObject>

        <foreignObject x="527" y="322" width="190" height="95">
          <div className="text-center font-sans">
            <h4 className="text-[20px] font-bold text-[#14261C] mb-1 tracking-tight">Evaluate</h4>
            <p className="text-[12px] leading-[1.45] text-[#55695E]">
              Compare alternatives, identify risks and test assumptions.
            </p>
          </div>
        </foreignObject>

        <foreignObject x="760" y="28" width="196" height="105">
          <div className="text-center font-sans">
            <h4 className="text-[20px] font-bold text-[#14261C] mb-1 tracking-tight">Recommend</h4>
            <p className="text-[12px] leading-[1.45] text-[#55695E]">
              Present clear findings and practical recommendations to support decision-making.
            </p>
          </div>
        </foreignObject>
      </svg>
    </div>

    {/* MOBİL VE TABLET: Dikey Akış */}
    <div className="lg:hidden space-y-9 my-8 relative text-left pl-6 before:absolute before:left-10 before:top-4 before:bottom-4 before:w-1 before:rounded-full before:bg-gradient-to-b before:from-[#133624] before:via-[#488062] before:to-[#96C2A9]">
      {[
        { n: 1, t: "Understand", d: "Clarify the objectives, context and key challenges." },
        { n: 2, t: "Analyse", d: "Assess the relevant market, financial, operational and strategic factors." },
        { n: 3, t: "Evaluate", d: "Compare alternatives, identify risks and test assumptions." },
        { n: 4, t: "Recommend", d: "Present clear findings and practical recommendations to support decision-making." },
      ].map((s) => (
        <div key={s.n} className="flex items-start relative pl-12">
          <div className="absolute left-0 w-9 h-9 rounded-full bg-gradient-to-br from-[#DEBA7E] to-[#A88243] p-[2px] shadow-md">
            <div className="w-full h-full rounded-full bg-[#133624] text-white flex items-center justify-center font-bold text-sm">
              {s.n}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold text-[#14231C]">{s.t}</h4>
            <p className="text-sm text-[#5A6E63] mt-1 leading-relaxed">{s.d}</p>
          </div>
        </div>
      ))}
    </div>

    <p className="text-lg md:text-xl font-medium text-[#2E4237] italic mt-14 md:mt-20 max-w-3xl mx-auto">
      &quot;The objective is not simply to produce analysis, but to help turn information into better decisions.&quot;
    </p>
  </div>
</section>

      {/* 5. Professional Background */}
<section id="about" className="bg-white py-24">
  <div className="container mx-auto px-6 max-w-5xl">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
      <div className="lg:col-span-5">
        <Image
          src="/profil-foto.JPG"
          alt="Barbaros Aydin"
          width={600}
          height={600}
          className="rounded-xl shadow-lg w-full h-auto object-cover"
        />
      </div>
      <div className="lg:col-span-7">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          A Multidisciplinary Perspective
        </h2>
        <div className="space-y-5 text-lg text-gray-600 mb-8 leading-relaxed">
          <p>
            My professional background combines urban planning, architecture, business administration, real estate valuation, investment and business development.
          </p>
          <p>
            I have worked across operational management, valuation and property-related activities, as well as strategic and advisory assignments. These experiences have shaped my approach to evaluating opportunities, managing competing priorities and making decisions in complex business environments.
          </p>
          <p>
            My academic background includes qualifications in urban planning and design, a master&apos;s degree in architecture, and an MBA completed at the University of Winchester in the United Kingdom.
          </p>
        </div>
        <a 
          href="/hakkimda" 
          className="inline-block bg-white text-[#0A2252] border-2 border-[#0A2252] font-bold text-lg px-8 py-3 rounded-lg hover:bg-[#0A2252] hover:text-white transition-colors duration-300"
        >
          More About Me
        </a>
      </div>
    </div>
  </div>
</section>

      {/* 6. Working Together */}
      <section id="contact" className="bg-[#0A2252] py-24">
        <div className="w-full px-6 md:px-16 mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Have an Opportunity Worth Exploring?
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-blue-100 mb-6 leading-relaxed">
              Whether you are evaluating a business opportunity, considering a property investment, planning a development or looking for a strategic perspective, I welcome conversations about projects where my experience can add value.
            </p>
            <p className="text-lg text-blue-100 mb-10 leading-relaxed">
              Each engagement is shaped around the client&apos;s objectives, the complexity of the challenge and the support required.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a 
              href="mailto:contact@barbarosaydin.com" 
              className="w-full sm:w-auto bg-white text-[#0A2252] font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Discuss Your Project
            </a>
            <a 
              href="/iletisim" 
              className="w-full sm:w-auto border-2 border-white text-white font-bold text-lg px-8 py-4 rounded-lg hover:bg-white hover:text-[#0A2252] transition-colors duration-300"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
