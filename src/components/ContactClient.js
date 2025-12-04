"use client";
import Image from 'next/image';
import { useState } from 'react';

// --- İKONLAR ---
const IconMail = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>;
const IconWhatsApp = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 448 512" fill="currentColor"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-67.3-8.8-98.1-25.4l-7-4.1-72.5 19.1 19.4-70.6-4.5-7.3c-18.2-29.6-28.1-63.3-28.1-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>;
const IconLocation = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>;

export default function ContactClient({ dict }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');
    try {
      const response = await fetch('/api/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData), });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else { setStatus('error'); }
    } catch (error) { setStatus('error'); } 
    finally { setIsSubmitting(false); }
  };

  return (
    <>
      <section className="bg-white pt-20 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h1 className="text-5xl md:text-4xl font-bold text-gray-900">{dict.contact.title}</h1>
            <p className="text-lg text-gray-600 mt-4">{dict.contact.subtitle}</p>
          </div>
          
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
            
            {/* --- İLETİŞİM FORMU --- */}
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 md:col-span-3">
              <form onSubmit={handleSubmit}>
                 <div className="mb-5">
                  <label htmlFor="name" className="block text-gray-700 font-bold mb-2">{dict.contact.form.name}</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="mb-5">
                  <label htmlFor="email" className="block text-gray-700 font-bold mb-2">{dict.contact.form.email}</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="mb-5">
                  <label htmlFor="subject" className="block text-gray-700 font-bold mb-2">{dict.contact.form.subject}</label>
                  <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="mb-5">
                  <label htmlFor="message" className="block text-gray-700 font-bold mb-2">{dict.contact.form.message}</label>
                  <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-brand-blue text-white font-bold py-4 px-4 rounded-lg hover:bg-opacity-90 transition-colors duration-300 disabled:bg-gray-400">
                  {isSubmitting ? dict.contact.form.submitting : dict.contact.form.submit}
                </button>
                {status === 'success' && <p className="text-green-600 mt-4 text-center">{dict.contact.form.success}</p>}
                {status === 'error' && <p className="text-red-600 mt-4 text-center">{dict.contact.form.error}</p>}
              </form>
            </div>

            {/* --- İLETİŞİM BİLGİLERİ --- */}
            <div className="space-y-8 md:col-span-2">
              
              {/* Calendly */}
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-gray-100 text-gray-600 group transition-colors">
                  <Image
                    src="https://logos-world.net/wp-content/uploads/2021/06/Calendly-New-Logo.png"
                    alt="Calendly Logo"
                    width={272}
                    height={204}
                    className="w-68 h-51 grayscale group-hover:grayscale-0 transition-all duration-300"
                    unoptimized
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-900">{dict.contact.info.meeting}</h3>
                  <a href="https://calendly.com/barbarosaydin" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:underline">{dict.contact.info.meetingLink}</a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-gray-100 text-gray-600 group hover:text-fenerbahce-navy transition-colors"><IconMail /></div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-900">{dict.contact.info.email}</h3>
                  <a href="mailto:contact@barbarosaydin.com" className="text-gray-600 group-hover:text-fenerbahce-navy transition-colors hover:underline">contact@barbarosaydin.com</a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-gray-100 text-gray-600 group hover:text-green-500 transition-colors"><IconWhatsApp /></div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-900">{dict.contact.info.whatsapp}</h3>
                  <a href="https://wa.me/447938161166" target="_blank" rel="noopener noreferrer" className="text-gray-600 group-hover:text-green-500 transition-colors hover:underline">+44 7938 161166</a>
                </div>
              </div>

              {/* Adres */}
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-gray-100 text-gray-600 group hover:text-red-500 transition-colors"><IconLocation /></div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-900">{dict.contact.info.address}</h3>
                  <p className="text-gray-600">Barbaros AYDIN<br />(Milleon Ltd.) <br />Unit 501, Leroy House, <br />434-436 Essex Road, London, <br />England, N1 3QP</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* --- HARİTA --- */}
      <section>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.1914732077475!2d-0.08929842311917445!3d51.54638790785389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761c9b32639327%3A0x6777dea041ec9228!2sWorkspace%C2%AE%20%7C%20Leroy%20House!5e0!3m2!1str!2suk!4v1755456480703!5m2!1str!2suk" width="100%" height="450" style={{ border: 0, width: '100%', display: 'block' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </section>
    </>
  );
}