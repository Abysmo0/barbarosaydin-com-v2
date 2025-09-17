// src/app/api/fetch-all-data/route.js
import { NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";
import axios from "axios";

// --- FRED Konut Fiyat Endeksi (Quarterly -> Monthly expand) ---
// FRED Quarterly series IDs (Real Residential Property Prices)
const FRED_HPI_SERIES = {
  // Konut Fiyat Endeksi (Real Residential Property Prices - BIS / FRED)
  kfe: "QTRN628BIS",      // Turkey alias (kfe)
  tr_hpi: "QTRN628BIS",   // Turkey explicit
  gb_hpi: "QGBN628BIS",
  de_hpi: "QDEN628BIS",
  us_hpi: "QUSN628BIS",
  es_hpi: "QESR628BIS",
  fr_hpi: "QFRR628BIS",
  it_hpi: "QITR628BIS",
  nl_hpi: "QNLR628BIS",
  gr_hpi: "QGRR628BIS"
};

// Ay -> çeyrek eşlemesi
const MONTH_TO_QUARTER = { 1:1,2:1,3:1,4:2,5:2,6:2,7:3,8:3,9:3,10:4,11:4,12:4 };

// FRED cache: monthly key => { value, sourceDate }
const fredMonthlyCache = new Map();
let fredLastFetch = 0;
const FRED_MIN_INTERVAL_MS = 500; // nazik rate limit

function quarterKey(year, q) { return `${year}-Q${q}`; }
function monthKey(dateStr) { return dateStr.slice(0,7); }

async function rateLimitedFredGet(url) {
  const now = Date.now();
  const diff = now - fredLastFetch;
  if (diff < FRED_MIN_INTERVAL_MS) {
    await new Promise(r=>setTimeout(r, FRED_MIN_INTERVAL_MS - diff));
  }
  const res = await axios.get(url, { timeout:15000 });
  fredLastFetch = Date.now();
  return res.data;
}

// FRED'ten bir serinin tüm observation'larını çekip monthly cache'e yazar.
async function hydrateFredSeries(seriesId, apiKey) {
  const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${apiKey}&file_type=json`;
  const data = await rateLimitedFredGet(url);
  if (!data || !Array.isArray(data.observations)) return;
  for (const obs of data.observations) {
    const d = obs.date; // YYYY-MM-DD veya YYYY-MM-DD şeklinde (quarterly date genelde çeyrek sonu: YYYY-MM-DD )
    const valueRaw = obs.value;
    if (valueRaw === '.' ) continue;
    const val = parseFloat(valueRaw);
    if (isNaN(val)) continue;
    // Quarterly gözlem olduğunu kabul ediyoruz. Tarihten yıl ve ay al.
    const year = parseInt(d.slice(0,4),10);
    const mm = parseInt(d.slice(5,7),10);
    const q = MONTH_TO_QUARTER[mm];
    if (!q) continue;
    // Bu çeyrek için aylar
    const monthsOfQuarter = q===1?[1,2,3]:q===2?[4,5,6]:q===3?[7,8,9]:[10,11,12];
    for (const m of monthsOfQuarter) {
      const mk = `${year}-${String(m).padStart(2,'0')}`;
      const cacheKey = `${seriesId}|${mk}`;
      if (!fredMonthlyCache.has(cacheKey)) {
        fredMonthlyCache.set(cacheKey, { value: val, sourceDate: d });
      }
    }
  }
}

// Belirli bir ülke HPI isteği: assetType (us_hpi vs) ve YYYY-MM ya da current
async function getFredHPI(assetType, date, apiKey) {
  const seriesId = FRED_HPI_SERIES[assetType];
  if (!seriesId) throw new Error('UNSUPPORTED_HPI_ASSET');
  if (!apiKey) throw new Error('MISSING_FRED_KEY');

  // Eğer hedef tarih verilmişse YYYY-MM formatına indir.
  const targetMonth = date ? date.slice(0,7) : null;

  // Gerekli ise seriyi hydrate et (ilk kez veya eksik ay)
  // Basit strateji: her çağrıda bir kez (çok sık değil) hydrate.
  await hydrateFredSeries(seriesId, apiKey);

  // current: bugün hangi çeyrek açıklanmışsa en son mevcut ayı kullan
  if (!targetMonth) {
    const now = new Date();
    const year = now.getFullYear();
    const m = now.getMonth() + 1;
    // Aranan ay (ör: güncel ay) için geriye doğru tarama: m, m-1, ... 1, sonra önceki yıl...
    for (let back=0; back<24; back++) { // 2 yıl geriye kadar
      const d = new Date();
      d.setMonth(now.getMonth() - back);
      const y = d.getFullYear();
      const mm = d.getMonth()+1;
      const mk = `${y}-${String(mm).padStart(2,'0')}`;
      const cacheKey = `${seriesId}|${mk}`;
      const entry = fredMonthlyCache.get(cacheKey);
      if (entry) {
        return { value: entry.value, month: mk, seriesId, sourceDate: entry.sourceDate };
      }
    }
    throw new Error('NO_FRED_DATA');
  } else {
    // Belirli ay: önce o ayı, yoksa geriye doğru en yakın ayı bul
    const [ty, tm] = targetMonth.split('-').map(x=>parseInt(x,10));
    for (let back=0; back<24; back++) {
      const d = new Date(ty, tm-1, 1); // verilen ay
      d.setMonth(d.getMonth() - back);
      const y = d.getFullYear();
      const mm = d.getMonth()+1;
      const mk = `${y}-${String(mm).padStart(2,'0')}`;
      const cacheKey = `${seriesId}|${mk}`;
      const entry = fredMonthlyCache.get(cacheKey);
      if (entry) {
        return { value: entry.value, month: mk, seriesId, sourceDate: entry.sourceDate };
      }
    }
    throw new Error('NO_FRED_DATA');
  }
}

// Diğer finansal varlıklar (yahoo finance)
const symbolMap = {
  usd: 'USDTRY=X', dolar: 'USDTRY=X', eur: 'EURTRY=X', euro: 'EURTRY=X', sterlin: 'GBPTRY=X', gbp: 'GBPTRY=X',
  gold: 'GC=F', altin: 'GC=F', silver: 'SI=F', gumus: 'SI=F', copper: 'HG=F', bakir: 'HG=F',
  bist100: 'XU100.IS', dax40: '^GDAXI', ibex35: '^IBEX', cac40: '^FCHI', ftse100: '^FTSE', ase: 'GD.AT', ftsemib: 'FTSEMIB.MI', aex: '^AEX', nasdaq100: '^IXIC'
};

// ---------------- Yahoo Finance Caching & Historical ----------------
const YF_CACHE_TTL_MS = parseInt(process.env.YF_CACHE_TTL_MS || '60000', 10); // 60s varsayilan
const quoteCache = new Map(); // key -> { value, expires }

function cacheGet(key) {
  const now = Date.now();
  const entry = quoteCache.get(key);
  if (entry && entry.expires > now) return entry.value;
  if (entry) quoteCache.delete(key);
  return undefined;
}

function cacheSet(key, value, ttl = YF_CACHE_TTL_MS) {
  quoteCache.set(key, { value, expires: Date.now() + ttl });
}

function parseMonthDate(ym) {
  // ym => YYYY-MM
  if (!/^\d{4}-\d{2}$/.test(ym)) return null;
  const [y, m] = ym.split('-').map(n => parseInt(n, 10));
  if (m < 1 || m > 12) return null;
  return { year: y, month: m };
}

async function fetchYahooPrice(symbol, monthString) {
  // monthString yoksa anlık fiyat
  if (!monthString) {
    const cacheKey = `rt|${symbol}`;
    const cached = cacheGet(cacheKey);
    if (cached !== undefined) return cached;
    const quote = await yahooFinance.quote(symbol);
    let price = quote?.regularMarketPrice;
    // Doviz paritesi USDTRY=X zaten TRY cinsinden; altin/gumus USD -> TRY cevir, bakir pound->kg + USD->TRY
    if (symbol === 'GC=F' || symbol === 'SI=F') {
      const usd = await yahooFinance.quote('USDTRY=X');
      price *= usd.regularMarketPrice;
    } else if (symbol === 'HG=F') {
      price = price / 0.453592; // lb -> kg
      const usd = await yahooFinance.quote('USDTRY=X');
      price *= usd.regularMarketPrice;
    }
    cacheSet(cacheKey, price);
    return price;
  }
  // Aylık fiyat: ilgili ay içindeki son işlem gününün kapanışı
  const parsed = parseMonthDate(monthString);
  if (!parsed) throw new Error('INVALID_DATE');
  const { year, month } = parsed;
  const period1 = new Date(year, month - 1, 1); // ay başı
  const period2 = new Date(year, month, 0); // ay sonu
  const cacheKey = `hist|${symbol}|${monthString}`;
  const cached = cacheGet(cacheKey);
  if (cached !== undefined) return cached;
  try {
    const results = await yahooFinance.historical(symbol, {
      period1,
      period2,
      interval: '1d'
    });
    if (Array.isArray(results) && results.length) {
      // Son geçerli kapanış (bazı günlerde volume 0 olabilir; basitçe son elemanı al)
      const last = results[results.length - 1];
      let price = last.close;
      if (symbol === 'GC=F' || symbol === 'SI=F') {
        const usdHist = await yahooFinance.historical('USDTRY=X', { period1, period2, interval: '1d' });
        const usdLast = usdHist?.[usdHist.length - 1]?.close;
        price *= usdLast || (await yahooFinance.quote('USDTRY=X')).regularMarketPrice;
      } else if (symbol === 'HG=F') {
        price = price / 0.453592;
        const usdHist = await yahooFinance.historical('USDTRY=X', { period1, period2, interval: '1d' });
        const usdLast = usdHist?.[usdHist.length - 1]?.close;
        price *= usdLast || (await yahooFinance.quote('USDTRY=X')).regularMarketPrice;
      }
      cacheSet(cacheKey, price, YF_CACHE_TTL_MS * 5); // tarihsel veri daha uzun tutulabilir
      return price;
    }
    // Tarihsel yoksa fallback anlık (en azından bir değer dönsün)
    const fallback = await fetchYahooPrice(symbol, null);
    cacheSet(cacheKey, fallback, YF_CACHE_TTL_MS);
    return fallback;
  } catch (e) {
    // Hata halinde fallback
    const fallback = await fetchYahooPrice(symbol, null);
    cacheSet(cacheKey, fallback, 5000);
    return fallback;
  }
}

function normalizeAsset(a) { return (a||'').toLowerCase(); }

function jsonWithCache(data, ttlSeconds) {
  const res = NextResponse.json(data);
  if (ttlSeconds) {
    res.headers.set('Cache-Control', `public, max-age=${ttlSeconds}`);
  }
  return res;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const asset = normalizeAsset(searchParams.get('asset'));
    const date = searchParams.get('date'); // YYYY-MM (opsiyonel)
    const isCurrent = !date || date === 'current';
    const fredKey = process.env.FRED_API_KEY;

    if (!asset) return NextResponse.json({ error: 'asset parametresi gerekli' }, { status:400 });

    if (asset === 'kfe' || asset.endsWith('_hpi')) {
      try {
        const hpi = await getFredHPI(asset, isCurrent? null : date, fredKey);
        return jsonWithCache({ price: hpi.value, month: hpi.month, source: hpi.seriesId, sourceDate: hpi.sourceDate, provider: 'FRED' }, 3600);
      } catch (e) {
        return jsonWithCache({ error: 'HPI verisi bulunamadi', code: e.message }, 60);
      }
    }

    const symbol = symbolMap[asset];
    if (!symbol) return NextResponse.json({ error: 'Bilinmeyen asset' }, { status:400 });
    try {
      const price = await fetchYahooPrice(symbol, isCurrent ? null : date);
      return jsonWithCache({ price, month: isCurrent ? undefined : date || undefined, provider: 'YF' }, 60);
    } catch (err) {
      return jsonWithCache({ error: 'Finansal veri hatasi', details: err.message }, 15);
    }
  } catch (err) {
    return NextResponse.json({ error: 'Sunucu hatasi', details: err.message }, { status:500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const asset = normalizeAsset(body.asset);
    const date = body.date; // YYYY-MM opsiyonel
    const isCurrent = body.isCurrent || !date;
    const fredKey = process.env.FRED_API_KEY;

    if (!asset) return NextResponse.json({ error: 'asset gerekli' }, { status:400 });

    if (asset === 'kfe' || asset.endsWith('_hpi')) {
      try {
        const hpi = await getFredHPI(asset, isCurrent? null : date, fredKey);
        return jsonWithCache({ price: hpi.value, month: hpi.month, source: hpi.seriesId, sourceDate: hpi.sourceDate, provider: 'FRED' }, 3600);
      } catch (e) {
        return jsonWithCache({ error: 'HPI verisi bulunamadi', code: e.message }, 60);
      }
    }

    const symbol = symbolMap[asset];
    if (!symbol) return NextResponse.json({ error: 'Bilinmeyen asset' }, { status:400 });
    try {
      const price = await fetchYahooPrice(symbol, isCurrent ? null : date);
      return jsonWithCache({ price, month: isCurrent ? undefined : date || undefined, provider: 'YF' }, 60);
    } catch (err) {
      return jsonWithCache({ error: 'Finansal veri hatasi', details: err.message }, 15);
    }
  } catch (err) {
    return NextResponse.json({ error: 'Sunucu hatasi', details: err.message }, { status:500 });
  }
}