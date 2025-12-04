import { getDictionary } from '@/get-dictionary';
import HomeClient from '@/components/HomeClient'; // Yukarıda oluşturduğumuz dosyayı çağırıyoruz

export default async function HomePage({ params }) {
  const { lang } = params;
  const dict = await getDictionary(lang);

  return <HomeClient dict={dict} lang={lang} />;
}