import { getDictionary } from '@/get-dictionary';
import WizardClient from '@/components/WizardClient';

export default async function WhatIfPage({ params }) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  
  return <WizardClient dict={dict} lang={lang} />;
}