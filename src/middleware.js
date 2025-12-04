import { NextResponse } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

// --- AYARLAR ---
const locales = ['tr', 'en'] // Desteklenen diller
const defaultLocale = 'en'   // Varsayılan dil

// --- RATE LIMIT DEĞİŞKENLERİ (Senin mevcut kodun) ---
const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10);
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '90', 10);
const ipBuckets = new Map(); 

// --- YARDIMCI FONKSİYON: Dil Tespiti ---
function getLocale(request) {
  const headers = { 'accept-language': request.headers.get('accept-language') }
  const languages = new Negotiator({ headers }).languages()
  
  try {
    return match(languages, locales, defaultLocale)
  } catch (error) {
    return defaultLocale
  }
}

export function middleware(request) {
  const { pathname } = request.nextUrl

  // -------------------------------------------------------------
  // BÖLÜM 1: RATE LIMITING (Sadece /api/fetch-all-data için)
  // -------------------------------------------------------------
  if (pathname.startsWith('/api/fetch-all-data')) {
    const ip = request.ip || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const now = Date.now();
    let bucket = ipBuckets.get(ip);
    
    if (!bucket || bucket.reset < now) {
      bucket = { count: 0, reset: now + RATE_LIMIT_WINDOW_MS };
      ipBuckets.set(ip, bucket);
    }
    
    bucket.count++;
    
    if (bucket.count > RATE_LIMIT_MAX) {
      const retryAfter = Math.max(1, Math.ceil((bucket.reset - now) / 1000));
      return new Response(JSON.stringify({ error: 'RATE_LIMIT', retryAfter }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(retryAfter),
          'Cache-Control': 'no-store'
        }
      });
    }
    // Rate limit takılmazsa devam et
    return NextResponse.next();
  }

  // -------------------------------------------------------------
  // BÖLÜM 2: DİL YÖNLENDİRMESİ (Localization)
  // -------------------------------------------------------------
  
  // Sistem dosyalarını, API'leri ve statik dosyaları (resim, css vb) es geç
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') || // Diğer API'leri de çeviriye sokma
    pathname.includes('.') || 
    pathname === '/favicon.ico'
  ) {
    return
  }

  // URL'de dil kodu var mı kontrol et (örn: /tr/hizmetlerim)
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Eğer dil kodu yoksa, dili tespit et ve yönlendir
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)

    // Kullanıcıyı doğru dile yönlendir (Mevcut URL'yi koruyarak)
    return NextResponse.redirect(
      new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
    )
  }
}

// --- CONFIG ---
export const config = {
  // Matcher'ı genişlettik: Hem API'yi hem de tüm sayfaları kapsamalı
  matcher: [
    // Belirli API rotası için
    '/api/fetch-all-data', 
    // Tüm sayfalar için (sistem dosyaları hariç)
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ],
}