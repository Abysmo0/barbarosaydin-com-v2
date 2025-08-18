// src/app/api/fetch-data/route.js
import { NextResponse } from 'next/server';

const seriesCodes = {
  dolar: 'TP.DK.USD.A.EF.YTL',
  euro: 'TP.DK.EUR.A.EF.YTL',
  altin: 'TP.MK.KUL.YTL',
  kfe: 'TP.KFE.TR',
};

// Tarih formatlama yardımcı fonksiyonu
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Geçerli ayı kontrol eden yardımcı fonksiyon
const isCurrentMonth = (year, month) => {
  const now = new Date();
  return now.getFullYear() === parseInt(year) && (now.getMonth() + 1) === parseInt(month);
};

// Belirtilen ayın son iş gününü (Pzt-Cuma) bulan yardımcı fonksiyon
const getLastBusinessDay = (year, month) => {
  const date = new Date(year, month, 0);
  while (date.getDay() === 0 || date.getDay() === 6) {
    date.setDate(date.getDate() - 1);
  }
  const day = String(date.getDate()).padStart(2, '0');
  const monthStr = String(date.getMonth() + 1).padStart(2, '0');
  const yearStr = date.getFullYear();
  return `${day}-${monthStr}-${yearStr}`;
};

export async function POST(request) {
  const apiKey = process.env.TCMB_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Sunucu yapılandırma hatası.' }, { status: 500 });
  }

  try {
    const { asset, date, isCurrent } = await request.json(); // date formatı: YYYY-AA
    const series = seriesCodes[asset];
    if (!series) {
      return NextResponse.json({ error: 'Geçersiz varlık tipi.' }, { status: 400 });
    }

    const baseUrl = 'https://evds2.tcmb.gov.tr/service/evds/';
    let startDate, endDate;
    
    if (isCurrent) {
      // GÜNCEL FİYAT SORGUSU:
      // - USD/EUR (günlük): son 7 günlük veriden en son yayımlananı al
      // - Altın/KFE (aylık): içinde bulunduğumuz ayı dahil etmemek için bir önceki ayın tamamını sorgula
      const today = new Date();
      if (asset === 'dolar' || asset === 'euro') {
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);
        startDate = formatDate(sevenDaysAgo);
        endDate = formatDate(today);
      } else {
        // previous month full range
        const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const year = prevMonth.getFullYear();
        const monthIndex = prevMonth.getMonth(); // 0-based
        const monthStr = String(monthIndex + 1).padStart(2, '0');
        const firstDay = `01-${monthStr}-${year}`;
        const lastDayNum = new Date(year, monthIndex + 1, 0).getDate();
        const lastDay = `${String(lastDayNum).padStart(2, '0')}-${monthStr}-${year}`;
        startDate = firstDay;
        endDate = lastDay;
      }
    } else {
      const [year, month] = date.split('-');
      
      // İçinde bulunulan ay için sorgu yapılmasını engelle
      if (isCurrentMonth(year, month)) {
        return NextResponse.json({ error: 'İçinde bulunulan ay için veri sorgulanamaz.' }, { status: 400 });
      }
      
      if (asset === 'dolar' || asset === 'euro') {
        // GÜNLÜK VERİLER İÇİN: Ayın son iş gününü bul
        const specificDate = getLastBusinessDay(parseInt(year), parseInt(month));
        startDate = endDate = specificDate;
      } else {
        // AYLIK VERİLER İÇİN (KFE, Altın): Ayın tamamını sorgula
        startDate = `01-${month}-${year}`;
        const lastDayOfMonth = new Date(year, month, 0).getDate();
        endDate = `${String(lastDayOfMonth).padStart(2, '0')}-${month}-${year}`;
      }
    }

    // API parametrelerini oluştur
    const url = new URL(baseUrl);
    url.pathname += 'series';

    // API parametreleri
    const params = {
      series: series,
      startDate: startDate,
      endDate: endDate,
      type: 'json',
      key: apiKey.trim(),
      frequency: asset === 'dolar' || asset === 'euro' ? 'daily' : 'monthly',
      aggregationTypes: 'last',
      formulas: '0'
    };

    // URL'ye parametreleri ekle
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key]);
      }
    });

    // helper: fetch wrapper that detects non-JSON (HTML) and handles status
    async function tryFetch(urlToTry, extraHeaders = {}) {
      console.log('Trying TCMB URL:', urlToTry, 'with headers', Object.keys(extraHeaders));
      const headers = Object.assign({ 'Accept': 'application/json', 'Cache-Control': 'no-cache' }, extraHeaders);
      const resp = await fetch(urlToTry, { method: 'GET', headers });
      const raw = await resp.text();
      console.log('TCMB raw length', raw && raw.length, 'status', resp.status);
      if (raw && raw.trim().startsWith('<')) {
        const err = new Error('Non-JSON response from TCMB');
        err.raw = raw;
        err.status = resp.status;
        throw err;
      }
      let parsed;
      try {
        parsed = JSON.parse(raw);
      } catch (e) {
        const err = new Error('Invalid JSON from TCMB');
        err.raw = raw;
        err.status = resp.status;
        throw err;
      }
      if (!resp.ok) {
        const err = new Error('TCMB responded with error status');
        err.data = parsed;
        err.status = resp.status;
        throw err;
      }
      return parsed;
    }
    // Try multiple host and auth variants to handle host/key differences
    const hosts = ['https://evds2.tcmb.gov.tr/service/evds/', 'https://evds.tcmb.gov.tr/service/evds/'];
    let data = null;
    let lastErr = null;
    for (const host of hosts) {
      const fA = `${host}series=${series}&startDate=${startDate}&endDate=${endDate}&type=json&key=${apiKey.trim()}&aggregationTypes=last&formulas=0`;
      const fB = `${host}series?series=${series}&startDate=${startDate}&endDate=${endDate}&type=json&key=${apiKey.trim()}&aggregationTypes=last&formulas=0`;
      const fA_noKey = `${host}series=${series}&startDate=${startDate}&endDate=${endDate}&type=json&aggregationTypes=last&formulas=0`;
      const fB_noKey = `${host}series?series=${series}&startDate=${startDate}&endDate=${endDate}&type=json&aggregationTypes=last&formulas=0`;
      const attempts = [ [fA, {}], [fA_noKey, { key: apiKey.trim() }], [fB, {}], [fB_noKey, { key: apiKey.trim() }] ];
      for (const [u, hdrs] of attempts) {
        try {
          data = await tryFetch(u, hdrs);
          break;
        } catch (err) {
          lastErr = err;
          console.warn('Attempt failed for', u, 'err=', err.message);
        }
      }
      if (data) break;
    }
    if (!data) {
      const raw = (lastErr && lastErr.raw) ? lastErr.raw : '';
      if (raw && raw.includes('<!DOCTYPE') || (lastErr && lastErr.status === 403)) {
        if (process.env.USE_MOCK === 'true') {
          console.warn('TCMB returned HTML/403 — returning mock price because USE_MOCK=true');
          const mockPrices = { dolar: 27.5, euro: 31.0, pound: 36.0, altin: 1800, kfe: 120 };
          const mock = mockPrices[asset] || 1;
          return NextResponse.json({ success: true, price: mock, date: new Date().toISOString(), meta: { asset, note: 'mocked due to TCMB 403' } });
        }
        return NextResponse.json({ error: 'TCMB API yetkilendirme hatası (403). Lütfen TCMB_API_KEY ve erişim izinlerini kontrol edin.', details: process.env.NODE_ENV === 'development' ? (raw.substring ? raw.substring(0,500) : raw) : undefined }, { status: 403 });
      }
      return NextResponse.json({ error: 'TCMB API çağrısı başarısız oldu.', details: process.env.NODE_ENV === 'development' ? lastErr && lastErr.message : undefined }, { status: 500 });
    }

  // data parsed successfully from TCMB (status checks done inside tryFetch)

    // TCMB EVDS API yanıt yapısını kontrol et
    if (!data || typeof data !== 'object') {
      console.error('TCMB API Invalid Response:', data);
      return NextResponse.json({ 
        error: 'Geçersiz API yanıtı',
        details: process.env.NODE_ENV === 'development' ? data : undefined
      }, { status: 500 });
    }

    // Veri dizisini kontrol et
    const items = data.items || [];
    if (items.length === 0) {
      console.error('TCMB API No Data:', data);
      return NextResponse.json({ 
        error: 'Belirtilen tarih aralığında veri bulunamadı',
        details: process.env.NODE_ENV === 'development' ? data : undefined
      }, { status: 404 });
    }

    // Son veriyi al
    const latestItem = items[items.length - 1];
    const seriesKey = Object.keys(latestItem).find(key => 
      key.startsWith('TP_') || key.includes(series.replace(/\./g, '_'))
    );

    if (!seriesKey || !latestItem[seriesKey]) {
      console.error('TCMB API Missing Series Data:', {
        availableKeys: Object.keys(latestItem),
        expectedSeries: series,
        item: latestItem
      });
      return NextResponse.json({ 
        error: 'Veri serisine ait değer bulunamadı',
        details: process.env.NODE_ENV === 'development' ? {
          availableKeys: Object.keys(latestItem),
          expectedSeries: series
        } : undefined
      }, { status: 404 });
    }

    const priceString = latestItem[seriesKey];
    const price = parseFloat(priceString);

    if (isNaN(price)) {
      console.error('TCMB API Invalid Price:', {
        price: priceString,
        item: latestItem
      });
      return NextResponse.json({ 
        error: 'Geçersiz fiyat değeri',
        details: process.env.NODE_ENV === 'development' ? priceString : undefined
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      price: price,
      date: latestItem.Tarih || latestItem.TARIH,
      meta: {
        asset,
        series: seriesKey,
        startDate,
        endDate
      }
    });
  } catch (error) {
    console.error('API Error:', {
      message: error.message,
      stack: error.stack,
      error: error
    });
    
    return NextResponse.json({
      error: 'İşlem sırasında bir hata oluştu',
      details: process.env.NODE_ENV === 'development' ? {
        message: error.message,
        type: error.name,
      } : undefined
    }, { status: 500 });
  }
}