import InvoiceClient from '@/components/InvoiceClient';

export const metadata = {
  title: 'Yönetim Paneli | Barbaros AYDIN',
  robots: {
    index: false, // Google bu sayfayı indekslemesin
    follow: false,
  },
};

export default function InvoicePage() {
  return <InvoiceClient />;
}