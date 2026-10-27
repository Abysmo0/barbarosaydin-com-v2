import InvoiceClient from '@/components/InvoiceClient';

export const metadata = {
  title: 'Yönetim Paneli | Barbaros AYDIN',
  robots: {
    index: false, // Google ve arama motorları indekslemesin
    follow: false,
  },
};

export default function InvoicePage() {
  return <InvoiceClient />;
}