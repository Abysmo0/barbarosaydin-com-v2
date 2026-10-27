import { getDictionary } from '@/get-dictionary';
import ContactClient from '@/components/ContactClient';

export default async function ContactPage({ params }) {
  // [lang] dinamik klasörü olmadığı için params.lang boş gelirse doğrudan 'en' sözlüğünü yükler
  const lang = (await params)?.lang || 'en';
  const dict = await getDictionary(lang);
  
  return <ContactClient dict={dict} />;
}