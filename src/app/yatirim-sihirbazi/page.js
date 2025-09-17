"use client";

// src/app/yatirim-sihirbazi/page.js
"use client";

// src/app/yatirim-sihirbazi/page.js
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Listbox, Transition } from '@headlessui/react';
// CheckmarkIcon ve ChevronUpDownIcon için bir ikon kütüphanesi veya SVG kullanabiliriz, şimdilik basit bir ikon ekleyelim
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

export default function WhatIfPage() { 
  // amount string tutulur; kullanıcı tamamen silebilsin
  const [amount, setAmount] = useState("1000000");
    // --- GÜNCELLEME: Sayfa ilk açıldığında Ocak 2020 seçili olacak ---
    const [selectedYear, setSelectedYear] = useState(2010);
    const [selectedMonth, setSelectedMonth] = useState(1); // 1 = Ocak
    const [showYearList, setShowYearList] = useState(false);
    const [showMonthList, setShowMonthList] = useState(false);
    const months = [
      'Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'
    ];
  const [investmentType, setInvestmentType] = useState('bist100'); // Default olarak BIST 100 seçili
  const [resultPast, setResultPast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- GÜNCELLEME: Yatırım seçenekleri yeniden düzenlendi ve sıralandı ---
  const investmentOptions = useMemo(() => {
    const borsaBase = [
      { value: "bist100", name: "BIST 100 (TR, Türkiye)" },
      { value: "nasdaq100", name: "NASDAQ 100 (US, Amerika)" },
      { value: "dax40", name: "DAX 40 (DE, Almanya)" },
      { value: "ftse100", name: "FTSE 100 (GB, İngiltere)" },
      { value: "ibex35", name: "IBEX 35 (ES, İspanya)" },
      { value: "cac40", name: "CAC 40 (FR, Fransa)" },
      { value: "ftsemib", name: "FTSE MIB (IT, İtalya)" },
      { value: "aex", name: "AEX (NL, Hollanda)" },
      { value: "ase", name: "ASE (GR, Yunanistan)" },
    ];

    const konutBase = [
      { value: "kfe", name: "Konut Endeksi (TR, Türkiye)" },
      { value: "us_hpi", name: "Konut Endeksi (US, Amerika)" },
      { value: "de_hpi", name: "Konut Endeksi (DE, Almanya)" },
      { value: "gb_hpi", name: "Konut Endeksi (GB, İngiltere)" },
      { value: "es_hpi", name: "Konut Endeksi (ES, İspanya)" },
      { value: "fr_hpi", name: "Konut Endeksi (FR, Fransa)" },
      { value: "it_hpi", name: "Konut Endeksi (IT, İtalya)" },
      { value: "nl_hpi", name: "Konut Endeksi (NL, Hollanda)" },
      { value: "gr_hpi", name: "Konut Endeksi (GR, Yunanistan)" },
    ];

    // Ülke ismine göre alfabetik sıralama fonksiyonu
    const getCountryName = (name) => {
        const match = name.match(/\((?:..|TR), (.*?)\)/);
        return match ? match[1] : name;
    };

    // Türkiye'yi sabit tutup geri kalanı ülke ismine göre alfabetik sırala
    const sortItemsByCountry = (items) => {
        const trItem = items.find(item => item.value.includes('kfe') || item.value.includes('bist100'));
        const otherItems = items.filter(item => item !== trItem)
                                .sort((a, b) => getCountryName(a.name).localeCompare(getCountryName(b.name)));
        return [trItem, ...otherItems].filter(Boolean);
    };
    
    return [
        { label: "Borsa Endeksi", isLabel: true },
        ...sortItemsByCountry(borsaBase),
        { label: "Döviz", isLabel: true },
        { value: "dolar", name: "Dolar (USD/TRY)" },
        { value: "euro", name: "Euro (EUR/TRY)" },
        { value: "sterlin", name: "Sterlin (GBP/TRY)" },
        { label: "Emtia", isLabel: true },
        { value: "gold", name: "Altın (TRY/Ons)" },
        { value: "copper", name: "Bakır (TRY/kg)" },
        { value: "silver", name: "Gümüş (TRY/Ons)" },
        { label: "Konut Fiyat Endeksi", isLabel: true },
        ...sortItemsByCountry(konutBase),
    ];
  }, []);

  // --- GÜNCELLEME: Konut endeksi seçildiğinde gösterilecek isimler kısaltıldı ---
  const friendlyAssetNames = {
    'usd': 'Dolar',
    'dolar': 'Dolar',
    'eur': 'Euro',
    'euro': 'Euro',
    'sterlin': 'Sterlin',
    'gbp': 'Sterlin',
    'gold': 'Altın (TRY/Ons)',
    'altin': 'Altın',
    'silver': 'Gümüş (TRY/Ons)',
    'gumus': 'Gümüş',
    'copper': 'Bakır (TRY/kg)',
    'bakir': 'Bakır',
    'bist100': 'BIST 100 (TR)',
    'dax40': 'DAX 40 (DE)',
    'ibex35': 'IBEX 35 (ES)',
    'cac40': 'CAC 40 (FR)',
    'ftse100': 'FTSE 100 (GB)',
    'ase': 'ASE (GR)',
    'ftsemib': 'FTSE MIB (IT)',
    'aex': 'AEX (NL)',
    'nasdaq100': 'NASDAQ 100 (US)',
    'kfe': 'Konut Endeksi (TR)',
    'us_hpi': 'Konut Endeksi (US)',
    'de_hpi': 'Konut Endeksi (DE)',
    'gb_hpi': 'Konut Endeksi (GB)',
    'es_hpi': 'Konut Endeksi (ES)',
    'fr_hpi': 'Konut Endeksi (FR)',
    'nl_hpi': 'Konut Endeksi (NL)',
    'it_hpi': 'Konut Endeksi (IT)',
    'gr_hpi': 'Konut Endeksi (GR)'
  };

  const yearListRef = useRef(null);
  const monthListRef = useRef(null);
  const yearButtonRef = useRef(null);
  const monthButtonRef = useRef(null);

  // Dışarıya tıklandığında dropdown'ları kapat
  useEffect(() => {
    function handleClickOutside(event) {
      if (yearButtonRef.current && !yearButtonRef.current.contains(event.target) && yearListRef.current && !yearListRef.current.contains(event.target)) {
        setShowYearList(false);
      }
      if (monthButtonRef.current && !monthButtonRef.current.contains(event.target) && monthListRef.current && !monthListRef.current.contains(event.target)) {
        setShowMonthList(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Yıl listesi açıldığında seçili yıla kaydır
  useEffect(() => {
    if (showYearList) {
      const selectedEl = document.getElementById(`year-item-${selectedYear}`);
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [showYearList, selectedYear]);

  // Ay listesi açıldığında seçili aya kaydır
  useEffect(() => {
    if (showMonthList) {
      const selectedEl = document.getElementById(`month-item-${selectedMonth}`);
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [showMonthList, selectedMonth]);

    // --- GÜNCELLEME: Yıl listesi dinamik ve artan sıralı olacak ---
    const yearList = useMemo(() => {
      const list = [];
      const currentYear = new Date().getFullYear();
      const startYear = 2010;
      for (let y = startYear; y <= currentYear; y++) {
        list.push(y);
      }
      return list;
    }, []);

  const handleCalculate = async () => {
    // Erken doğrulama: boş, 0 veya geçersiz tutar
    const investedAmount = parseFloat(amount || '');
    if (!amount.trim() || isNaN(investedAmount) || investedAmount <= 0) {
      setResultPast({ error: 'Bir yatırım tutarı girmelisiniz!' });
      return;
    }

  setIsLoading(true);
  setResultPast(null);

    try {
        // helper to fetch all data via unified endpoint
        const fetchData = async (assetToFetch, dateString = null, isCurrent = false) => {
          try {
            const body = isCurrent ? { asset: assetToFetch, isCurrent: true } : { asset: assetToFetch, date: dateString };
            console.log(`[DEBUG] Fetching ${assetToFetch} with params:`, body);
            
            const response = await fetch('/api/fetch-all-data', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body),
            });
            
            if (!response.ok) {
              const errorData = await response.json().catch(() => ({}));
              console.error(`[DEBUG] API Error for ${assetToFetch}:`, errorData);
              let friendlyMsg = errorData.error || `API hatası: ${response.statusText}`;
              if (errorData.code === 'FORBIDDEN_KEY') {
                friendlyMsg = 'Konut Fiyat Endeksi verisi için API erişimi kısıtlı. Lütfen daha sonra deneyin veya API anahtarını güncelleyin.';
              } else if (errorData.code === 'NO_DATA') {
                friendlyMsg = 'Seçilen ay için veri bulunamadı; bir önceki ayı deneyin.';
              }
              throw new Error(friendlyMsg);
            }
            
            const data = await response.json();
            console.log(`[DEBUG] Received data for ${assetToFetch}:`, data);
            if (data.stale) {
              console.warn(`[HPI] STALE DATA KULLANILDI (${assetToFetch}) indicator=${data.sourceIndicator}`);
            }
            
            return data.price;
          } catch (error) {
            console.error(`Veri alınamadı: ${friendlyAssetNames[assetToFetch] || assetToFetch}`, error);
            throw error;
          }
        };

      // build date string from selectedYear/Month
      const dateString = `${selectedYear}-${String(selectedMonth).padStart(2,'0')}`;

      const assetConfig = {
        // Foreign HPIs
        'us_hpi': { type: 'FOREIGN_HPI', currency: 'dolar', currencyName: 'USD', assetName: 'Konut Fiyat Endeksi, Amerika' },
        'gb_hpi': { type: 'FOREIGN_HPI', currency: 'sterlin', currencyName: 'GBP', assetName: 'Konut Fiyat Endeksi, İngiltere' },
        'de_hpi': { type: 'FOREIGN_HPI', currency: 'euro', currencyName: 'EUR', assetName: 'Konut Fiyat Endeksi, Almanya' },
        'es_hpi': { type: 'FOREIGN_HPI', currency: 'euro', currencyName: 'EUR', assetName: 'Konut Fiyat Endeksi, İspanya' },
        'fr_hpi': { type: 'FOREIGN_HPI', currency: 'euro', currencyName: 'EUR', assetName: 'Konut Fiyat Endeksi, Fransa' },
        'nl_hpi': { type: 'FOREIGN_HPI', currency: 'euro', currencyName: 'EUR', assetName: 'Konut Fiyat Endeksi, Hollanda' },
        'it_hpi': { type: 'FOREIGN_HPI', currency: 'euro', currencyName: 'EUR', assetName: 'Konut Fiyat Endeksi, İtalya' },
        'gr_hpi': { type: 'FOREIGN_HPI', currency: 'euro', currencyName: 'EUR', assetName: 'Konut Fiyat Endeksi, Yunanistan' },
        // Stock Indices
        'bist100': { type: 'STOCK_INDEX', currency: null, currencyName: 'TL', assetName: 'Borsa Endeksi, Türkiye' },
        'nasdaq100': { type: 'STOCK_INDEX', currency: 'dolar', currencyName: 'USD', assetName: 'Borsa Endeksi, Amerika' },
        'ftse100': { type: 'STOCK_INDEX', currency: 'sterlin', currencyName: 'GBP', assetName: 'Borsa Endeksi, İngiltere' },
        'dax40': { type: 'STOCK_INDEX', currency: 'euro', currencyName: 'EUR', assetName: 'Borsa Endeksi, Almanya' },
        'ibex35': { type: 'STOCK_INDEX', currency: 'euro', currencyName: 'EUR', assetName: 'Borsa Endeksi, İspanya' },
        'cac40': { type: 'STOCK_INDEX', currency: 'euro', currencyName: 'EUR', assetName: 'Borsa Endeksi, Fransa' },
        'ftsemib': { type: 'STOCK_INDEX', currency: 'euro', currencyName: 'EUR', assetName: 'Borsa Endeksi, İtalya' },
        'aex': { type: 'STOCK_INDEX', currency: 'euro', currencyName: 'EUR', assetName: 'Borsa Endeksi, Hollanda' },
        'ase': { type: 'STOCK_INDEX', currency: 'euro', currencyName: 'EUR', assetName: 'Borsa Endeksi, Yunanistan' },
        // Simple TR Assets
        'kfe': { type: 'SIMPLE_TR', assetName: 'Konut Fiyat Endeksi, Türkiye' },
        'gold': { type: 'SIMPLE_TR', assetName: 'Altın (TRY/Ons)' },
        'silver': { type: 'SIMPLE_TR', assetName: 'Gümüş (TRY/Ons)' },
        'copper': { type: 'SIMPLE_TR', assetName: 'Bakır (TRY/kg)' },
        'dolar': { type: 'SIMPLE_TR', assetName: 'Dolar (USD/TRY)' },
        'euro': { type: 'SIMPLE_TR', assetName: 'Euro (EUR/TRY)' },
        'sterlin': { type: 'SIMPLE_TR', assetName: 'Sterlin (GBP/TRY)' },
      };

      const currentConfig = assetConfig[investmentType];
      let resultData = {};

      if (currentConfig?.type === 'FOREIGN_HPI' || currentConfig?.type === 'STOCK_INDEX') {
        const isHpi = currentConfig.type === 'FOREIGN_HPI';
        const { currency, currencyName, assetName } = currentConfig;

        const requests = [
          fetchData(investmentType, dateString, false),
          fetchData(investmentType, null, true),
        ];

        if (currency) {
          requests.push(fetchData(currency, dateString, false));
          requests.push(fetchData(currency, null, true));
        }

        const [pastPrice, currentPrice, pastCurrencyRate = 1, currentCurrencyRate = 1] = await Promise.all(requests);

        if (!pastPrice || !currentPrice) {
          throw new Error('Ana varlık verisi alınamadı.');
        }
        if (currency && (!pastCurrencyRate || !currentCurrencyRate)) {
            throw new Error('Döviz kuru verisi alınamadı.');
        }

        const investedAmountForeign = investedAmount / pastCurrencyRate;
        const changeRatio = currentPrice / pastPrice;
        const finalForeign = investedAmountForeign * changeRatio;
        const finalTl = finalForeign * currentCurrencyRate;
        const profit = finalTl - investedAmount;
        const percentageChange = (profit / investedAmount) * 100;

        resultData = {
          assetName,
          investedAmount,
          currentValue: finalTl,
          profit,
          percentageChange,
          startDate: new Date(dateString).toLocaleString('tr-TR', { month: 'long', year: 'numeric' }),
          startPrice: pastPrice,
          endPrice: currentPrice,
          unitsBought: investedAmountForeign,
          detailSteps: currency ? [
            `${investedAmount.toLocaleString('tr-TR')} TL, ${dateString} tarihinde ${pastCurrencyRate.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ${currencyName}/TL kuru ile ${investedAmountForeign.toLocaleString(isHpi ? 'en-US' : 'tr-TR', { maximumFractionDigits: 2 })} ${currencyName}'ye çevrildi.`,
            `${investedAmountForeign.toLocaleString(isHpi ? 'en-US' : 'tr-TR', { maximumFractionDigits: 2 })} ${currencyName} ile ${pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesindeki varlıktan ${(investedAmountForeign / pastPrice).toLocaleString(isHpi ? 'en-US' : 'tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} birim alınabilirdi.`,
            `Varlık, belirtilen zaman aralığında ${pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesinden ${currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesine ${changeRatio > 1 ? 'yükseldiği' : 'düştüğü'} için yatırımın güncel değeri ${finalForeign.toLocaleString(isHpi ? 'en-US' : 'tr-TR', { maximumFractionDigits: 2 })} ${currencyName} oldu.`,
            `Güncel ${currencyName}/TL kuru ${currentCurrencyRate.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ile yatırımınızın bugünkü değeri ${finalTl.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} TL'dir.`
          ] : [
            `${assetName} belirtilen zaman aralığında ${pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesinden ${currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesine yükselmiştir.`,
            `${investedAmount.toLocaleString('tr-TR')} TL ile ${dateString} tarihinde ${pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesindeki varlıktan ${investedAmountForeign.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} birim alınabilirdi.`,
            `Varlığın güncel seviyesi ${currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} olduğundan yatırımın bugünkü değeri ${finalTl.toLocaleString('tr-TR', {maximumFractionDigits: 0})} TL olarak hesaplanmıştır.`
          ]
        };

      } else if (currentConfig?.type === 'SIMPLE_TR') {
        const [pastPrice, currentPrice] = await Promise.all([
          fetchData(investmentType, dateString, false),
          fetchData(investmentType, null, true)
        ]);

        if (!pastPrice || !currentPrice) {
          throw new Error('Veri alınamadı. Lütfen daha farklı bir tarih deneyin veya daha sonra tekrar test edin.');
        }

        const unitsBought = investedAmount / pastPrice;
        const currentValue = unitsBought * currentPrice;
        const profit = currentValue - investedAmount;
        const percentageChange = (profit / investedAmount) * 100;

        resultData = {
          assetName: currentConfig.assetName,
          investedAmount,
          currentValue,
          profit,
          percentageChange,
          startDate: new Date(dateString).toLocaleString('tr-TR', { month: 'long', year: 'numeric' }),
          startPrice: pastPrice,
          endPrice: currentPrice,
          unitsBought,
          detailSteps: [
            `1. ${currentConfig.assetName} belirtilen zaman aralığında ${pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesinden ${currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesine yükselmiştir.`,
            `2. ${investedAmount.toLocaleString('tr-TR')} TL ile ${dateString} tarihinde ${(investedAmount / pastPrice).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} birim ${currentConfig.assetName} alınabilirdi.`,
            `3. Varlığın güncel fiyatı ${currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} olduğundan yatırımın bugünkü değeri ${currentValue.toLocaleString('tr-TR', {maximumFractionDigits: 0})} TL olarak hesaplanmıştır.`
          ]
        };
      } else {
        throw new Error("Geçersiz yatırım türü seçildi.");
      }

      // Format results for display
      setResultPast({
        investedAmount: resultData.investedAmount.toLocaleString('tr-TR'),
        investedAmountRaw: resultData.investedAmount,
        currentValue: resultData.currentValue.toLocaleString('tr-TR', { maximumFractionDigits: 0 }),
        currentValueRaw: resultData.currentValue,
        profit: resultData.profit.toLocaleString('tr-TR', { maximumFractionDigits: 0 }),
        profitRaw: resultData.profit,
        percentageChange: Number(resultData.percentageChange).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        percentageChangeRaw: resultData.percentageChange,
        startDate: resultData.startDate,
        startPrice: resultData.startPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 }),
        endPrice: resultData.endPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 }),
        assetName: resultData.assetName,
        unitsBought: resultData.unitsBought.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        unitsBoughtRaw: resultData.unitsBought,
        detailSteps: resultData.detailSteps
      });

    } catch (error) {
      console.error('Hesaplama sırasında hata oluştu', error);
      setResultPast({ error: error.message || 'Veri alınamadı. Lütfen daha farklı bir tarih deneyin veya daha sonra tekrar test edin.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Yatırım Sihirbazı</h1>
          <p className="text-lg text-gray-600 mt-4">Geçmişte belirli bir tarihte eğer &quot;o yatırımı&quot; yapmış olsaydınız, bugünkü değeri ne olurdu?<br />Kesin cevabı bilmesek de, verilere dayanarak bir fikir edinebiliriz.</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="w-full">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Yatırım Tutarı (TL)</label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Tutar"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Yatırım Türü</label>
                <Listbox value={investmentType} onChange={setInvestmentType}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-3 pl-4 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75">
                <span className="block truncate">{friendlyAssetNames[investmentType]}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
                </Listbox.Button>
                <Transition
                as={React.Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10">
                    {investmentOptions.map((option, optionIdx) => (
                        option.isLabel ? (
                            <div key={option.label} className="px-4 py-2 bg-gray-100 text-gray-900 font-bold text-sm">
                                {option.label}
                            </div>
                        ) : (
                            <Listbox.Option
                                key={optionIdx}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-fenerbahce-yellow text-fenerbahce-navy' : 'text-gray-900'
                                    }`
                                }
                                value={option.value}
                            >
                                {({ selected }) => (
                                    <>
                                        <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                                            {option.name}
                                        </span>
                                        {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-fenerbahce-navy">
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        )
                    ))}
                </Listbox.Options>
            </Transition>
        </div>
    </Listbox>
</div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Ay</label>
                  <div className="relative">
                    <button ref={monthButtonRef} onClick={() => setShowMonthList(s => !s)} className="w-full text-left px-4 py-3 border rounded bg-gray-50">{months[selectedMonth - 1]}</button>
                    {showMonthList && (
                      <div ref={monthListRef} className="absolute left-0 right-0 mt-1 bg-white border rounded shadow max-h-40 overflow-auto z-20">
                        {months.map((m, idx) => (
                          <button
                            key={m}
                            id={`month-item-${idx + 1}`}
                            onClick={() => { setSelectedMonth(idx + 1); setShowMonthList(false); }}
                            className={`w-full text-left px-4 py-2 hover:bg-gray-200 ${selectedMonth === idx + 1 ? 'bg-gray-700 text-white' : 'bg-white'}`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">Yıl</label>
                  <div className="relative">
                    <button ref={yearButtonRef} onClick={() => setShowYearList(s => !s)} className="w-full text-left px-4 py-3 border rounded bg-gray-50">{selectedYear}</button>
                    {showYearList && (
                      <div ref={yearListRef} className="absolute left-0 right-0 mt-1 bg-white border rounded shadow max-h-40 overflow-auto z-20">
                        {yearList.map((y) => (
                          <button id={`year-item-${y}`} key={y} onClick={() => { setSelectedYear(y); setShowYearList(false); }} className={`w-full text-left px-4 py-2 hover:bg-gray-200 ${selectedYear === y ? 'bg-gray-700 text-white' : 'bg-white'}`}>{y}</button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={handleCalculate}
                  disabled={isLoading}
                  className="w-full bg-fenerbahce-navy text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity duration-300 disabled:bg-gray-400"
                >
                  {isLoading ? 'Hesaplanıyor...' : 'Hesapla'}
                </button>
              </div>
            </div>

            {/* Sonuçlar */}
            <div className="w-full mt-8">
              {resultPast && resultPast.error && (
                <div className="p-4 border rounded bg-red-50 text-red-600">
                  <p className="font-bold">Hata</p>
                  <p className="text-sm">{resultPast.error}</p>
                </div>
              )}

              {resultPast && !resultPast.error && (
                <div className="p-6 border rounded bg-gray-50">
                  <div className="grid grid-cols-2 gap-4 text-center mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Yatırım</div>
                      <div className="text-lg font-bold text-gray-800">{resultPast.investedAmount} TL</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Bugünkü Değer</div>
                      <div className="text-lg font-bold text-gray-800">{resultPast.currentValue} TL</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Kar / Zarar</div>
                      <div className={`text-lg font-bold ${resultPast.profitRaw >= 0 ? 'text-green-600' : 'text-red-600'}`}>{resultPast.profit} TL</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Değişim</div>
                      <div className={`text-lg font-bold ${resultPast.percentageChangeRaw >= 0 ? 'text-green-600' : 'text-red-600'}`}>{resultPast.percentageChange}%</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Detaylar: {resultPast.assetName}</h3>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p><strong>Başlangıç Tarihi:</strong> {resultPast.startDate}</p>
                      <p><strong>Başlangıç Fiyatı:</strong> {resultPast.startPrice}</p>
                      <p><strong>Güncel Fiyat:</strong> {resultPast.endPrice}</p>
                      {resultPast.detailSteps && (
                        <><div className="mt-4 pt-4 border-t border-gray-200">
                          <h4 className="font-semibold text-gray-700 mb-2">Hesaplama Adımları:</h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-500">
                            {resultPast.detailSteps.map((step, index) => (
                              <li key={index}>{step}</li>
                            ))}
                          </ul>
                        </div><p className="text-gray-500 text-xs text-left mt-6 italic">
                            <strong>Önemli Not:</strong> Bu hesaplama sadece bilgilendirme amaçlıdır ve yatırım tavsiyesi niteliği taşımaz. Veriler TCMB, FRED, Yahoo Finance, Trading Economics ve benzeri resmi kaynaklardan alınmaktadır.
                          </p></>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
