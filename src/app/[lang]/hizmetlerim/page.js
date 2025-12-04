import { getDictionary } from '@/get-dictionary';
import ServicesClient from '@/components/ServicesClient';

export default async function ServicesPage({ params }) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  return <ServicesClient dict={dict} lang={lang} />;
}