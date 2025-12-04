import { getDictionary } from '@/get-dictionary';
import ContactClient from '@/components/ContactClient';

export default async function ContactPage({ params }) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  return <ContactClient dict={dict} />;
}