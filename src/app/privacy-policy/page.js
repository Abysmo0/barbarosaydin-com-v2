import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 text-gray-700">
        
        {/* Ana Sayfaya Dönüş Linki */}
        <div className="mb-8">
          <Link 
            href="/#home" 
            className="inline-flex items-center text-sm font-semibold text-[#0A2252] hover:underline"
          >
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#0A2252] mb-4">
          Privacy Policy & Legal Disclaimer
        </h1>
        <p className="text-sm italic text-gray-500 mb-8">
          Last updated: October 2026
        </p>
        
        <div className="space-y-6 leading-relaxed">
          {/* Privacy Policy */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-3 border-b pb-2">
            1. Privacy Policy
          </h2>
          <p>
            Barbaros Aydin (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is committed to protecting and respecting your privacy in compliance with applicable data protection laws, including the UK General Data Protection Regulation (UK GDPR).
          </p>
          
          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            Information We Collect
          </h3>
          <p>
            We may collect personal details such as your name, email address, phone number, and project-specific requirements when you voluntarily submit information through our contact form, email correspondence, or when scheduling an appointment via Calendly.
          </p>
          
          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            How We Use Your Information
          </h3>
          <p>
            Your information is used solely to respond to your inquiries, deliver requested advisory services, and facilitate professional communications. We do not sell, rent, or lease personal information to third parties.
          </p>

          {/* Legal Disclaimer */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-3 border-b pb-2">
            2. Legal Disclaimer
          </h2>
          <p>
            The advisory services provided through this website are strictly for commercial real estate, strategic business development, and investment evaluation purposes. They do not constitute formal legal advice, regulated financial advice, or structural engineering certifications.
          </p>
          <ul className="list-disc pl-6 space-y-2.5 mt-4 text-gray-600">
            <li>
              <strong className="text-gray-800">No Performance Guarantees:</strong> Historical market data, benchmarks, and feasibility models are estimates based on prevailing market conditions and do not guarantee future returns.
            </li>
            <li>
              <strong className="text-gray-800">Visual & Commercial Scope:</strong> Any site observations or physical reviews represent visual, high-level appraisals. Clients are strongly encouraged to retain qualified Chartered Surveyors (RICS) for full structural, environmental, or technical surveys.
            </li>
            <li>
              <strong className="text-gray-800">Independent Decision-Making:</strong> Final commercial decisions, contractual commitments, and capital allocations remain the sole responsibility of the client.
            </li>
          </ul>

          {/* Contact */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-3 border-b pb-2">
            3. Contact Information
          </h2>
          <p>
            For any questions regarding this Privacy Policy or legal notices, please get in touch via{' '}
            <a 
              href="mailto:contact@barbarosaydin.com" 
              className="text-[#0A2252] font-semibold hover:underline"
            >
              contact@barbarosaydin.com
            </a>.
          </p>
        </div>

      </div>
    </section>
  );
}