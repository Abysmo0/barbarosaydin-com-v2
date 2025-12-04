import { NextResponse } from 'next/server';

export async function GET() {
  const content = `
# Barbaros AYDIN - Gayrimenkul Strateji Danışmanı / Real Estate Strategy Advisor

## Hakkımda / About
Türkiye ve İngiltere pazarlarında 15 yılı aşkın deneyime sahip, şehir planlama kökenli gayrimenkul strateji danışmanı.
Senior Real Estate Strategy Advisor with over 15 years of experience in Turkish and UK markets, specializing in urban planning and investment valuation.

## Hizmetler / Services
- Strateji Geliştirme / Strategy Development
- İş Geliştirme / Business Development
- Gayrimenkul Geliştirme / Real Estate Development
- Gayrimenkul Yatırım Değerlemesi / Real Estate Investment Valuation

## Önemli Linkler / Important Links
- Anasayfa: https://www.barbarosaydin.com
- Hakkımda: https://www.barbarosaydin.com/tr/hakkimda
- Hizmetler: https://www.barbarosaydin.com/tr/hizmetlerim
- Yatırım Sihirbazı (Tool): https://www.barbarosaydin.com/tr/yatirim-sihirbazi
- Blog: https://www.barbarosaydin.com/tr/blog

## İletişim / Contact
- Email: contact@barbarosaydin.com
- Location: London (UK) & Istanbul (TR)
  `.trim();

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}