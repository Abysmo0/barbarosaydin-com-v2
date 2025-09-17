"use client";

// src/app/yatirim-sihirbazi/page.js

import { useState, useMemo, useEffect, useRef } from 'react';

export default function WhatIfPage() { 
  // amount string tutulur; kullanıcı tamamen silebilsin
  const [amount, setAmount] = useState("1000000");
  const [date, setDate] = useState('2020-01');
    // year/month split for improved picker; month defaults to January
    const [selectedYear, setSelectedYear] = useState(parseInt(date.split('-')[0], 10));
    const [selectedMonth, setSelectedMonth] = useState(1); // January default
    const [showYearList, setShowYearList] = useState(false);
    const [showMonthList, setShowMonthList] = useState(false);
    const months = [
      'Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'
    ];
  const [investmentType, setInvestmentType] = useState('gold');
  const [resultPast, setResultPast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const friendlyAssetNames = {
    'usd': 'Dolar',
    'dolar': 'Dolar',
    'eur': 'Euro',
    'euro': 'Euro',
    'sterlin': 'Sterlin',
    'gbp': 'Sterlin',
    'gold': 'Altın',
    'altin': 'Altın',
    'silver': 'Gümüş',
    'gumus': 'Gümüş',
    'copper': 'Bakır',
    'bakir': 'Bakır',
    'bist100': 'BIST 100',
    'dax40': 'DAX 40',
    'ibex35': 'IBEX 35',
    'cac40': 'CAC 40',
    'ftse100': 'FTSE 100',
    'ase': 'ASE',
    'ftsemib': 'FTSE MIB',
    'aex': 'AEX',
    'nasdaq100': 'NASDAQ 100',
    'kfe': 'Konut Fiyat Endeksi, Türkiye (TR)',
    'us_hpi': 'Konut Fiyat Endeksi, Amerika (US)',
    'de_hpi': 'Konut Fiyat Endeksi, Almanya (DE)',
    'gb_hpi': 'Konut Fiyat Endeksi, İngiltere (GB)',
    'es_hpi': 'Konut Fiyat Endeksi, İspanya (ES)',
    'fr_hpi': 'Konut Fiyat Endeksi, Fransa (FR)',
    'nl_hpi': 'Konut Fiyat Endeksi, Hollanda (NL)',
    'it_hpi': 'Konut Fiyat Endeksi, İtalya (IT)',
    'gr_hpi': 'Konut Fiyat Endeksi, Yunanistan (GR)'
  };

  const yearListRef = useRef(null);
  const monthListRef = useRef(null);
  const yearButtonRef = useRef(null);
  const monthButtonRef = useRef(null);

  // selectedCountry'yi investmentType'a göre belirle
  const selectedCountry = useMemo(() => {
    if (investmentType === 'us_hpi' || investmentType === 'nasdaq100') {
      return 'US';
    } else if (investmentType === 'gb_hpi' || investmentType === 'ftse100') {
      return 'GB';
    } else if (investmentType === 'de_hpi' || investmentType === 'dax40') {
      return 'DE';
    } else if (investmentType === 'es_hpi' || investmentType === 'ibex35') {
      return 'ES';
    } else if (investmentType === 'fr_hpi' || investmentType === 'cac40') {
      return 'FR';
    } else if (investmentType === 'nl_hpi' || investmentType === 'aex') {
      return 'NL';
    } else if (investmentType === 'it_hpi' || investmentType === 'ftsemib') {
      return 'IT';
    } else if (investmentType === 'gr_hpi' || investmentType === 'ase') {
      return 'GR';
    } else {
      return 'TR'; // Türkiye varsayılan
    }
  }, [investmentType]);

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

  const dateOptions = useMemo(() => {
    const options = []; 
    const today = new Date();
    // Verilerin yayınlanma gecikmesini hesaba katmak için 1 ay geriden başlatalım
    today.setMonth(today.getMonth() - 1); 
    
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    for (let year = currentYear; year >= currentYear - 15; year--) {
      const startMonth = (year === currentYear) ? currentMonth : 11;
      for (let month = startMonth; month >= 0; month--) {
        const dateValue = `${year}-${String(month + 1).padStart(2, '0')}`;
        const dateLabel = new Date(year, month).toLocaleString('tr-TR', { month: 'long', year: 'numeric' });
        options.push({ value: dateValue, label: dateLabel });
      }
    }
    return options;
  }, []);

    // derive list of years for quick selection
    const yearList = useMemo(() => {
      const list = [];
      const today = new Date();
      const currentYear = today.getFullYear(); // keep one-month lag logic elsewhere
      for (let y = currentYear; y >= currentYear - 15; y--) list.push(y);
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
  let pastPrice = null;
  let currentPrice = null;

  const friendlyAssetNames = { kfe: 'TR (Housing Price Index)', gold: 'Altın', dolar: 'Dolar', euro: 'Euro', sterlin: 'Sterlin', gb_hpi: 'GB (Housing Price Index)', us_hpi: 'US (Housing Price Index)', bist100: 'BIST 100', nasdaq100: 'NASDAQ 100', ftse100: 'FTSE 100', dax40: 'DAX 40', de_hpi: 'DE (Housing Price Index)', es_hpi: 'ES (Housing Price Index)', ibex35: 'IBEX 35', cac40: 'CAC 40', aex: 'AEX', ftsemib: 'FTSE MIB', ase: 'ASE', fr_hpi: 'FR (Housing Price Index)', nl_hpi: 'NL (Housing Price Index)', it_hpi: 'IT (Housing Price Index)', gr_hpi: 'GR (Housing Price Index)' };

    try {
        // helper to fetch all data via unified endpoint
        const fetchData = async (assetToFetch, dateString = null, isCurrent = false) => {
          try {
            const body = isCurrent ? { asset: assetToFetch, isCurrent: true } : { asset: assetToFetch, date: dateString };
            console.log(`[DEBUG] Fetching ${assetToFetch} with params:`, body);
            
            // FTSE 100 için özel debug
            if (assetToFetch === 'ftse100') {
              console.log(`[FTSE_DEBUG] Requesting FTSE 100 data with:`, body);
            }
            
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
            
            // FTSE 100 için özel hata yakalama
            if (assetToFetch === 'ftse100') {
              console.error(`[FTSE_DEBUG] FTSE 100 fetch failed:`, error);
            }
            
            throw error;
          }
        };

  // build date string from selectedYear/Month
  const dateString = `${selectedYear}-${String(selectedMonth).padStart(2,'0')}`;

        if (investmentType === 'gb_hpi') {
          // GB: TL -> GBP (tarihsel kur) -> HPI artışı -> GBP -> TL (güncel kur)
          // Paralel API çağrıları ile performans iyileştirmesi
          const [pastPrice, currentPrice, pastGbpRate, currentGbpRate] = await Promise.all([
            fetchData('gb_hpi', dateString, false),
            fetchData('gb_hpi', null, true),
            fetchData('sterlin', dateString, false),
            fetchData('sterlin', null, true)
          ]);

          // 4. TL -> GBP çevir, HPI artışını uygula, tekrar TL'ye çevir
          const investedAmountGbp = investedAmount / pastGbpRate;
          const hpiChange = currentPrice / pastPrice;
          const finalGbp = investedAmountGbp * hpiChange;
          const finalTl = finalGbp * currentGbpRate;
          const profit = finalTl - investedAmount;
          const percentageChange = (profit / investedAmount) * 100;

          setResultPast({
            investedAmount: investedAmount.toLocaleString('tr-TR'),
            investedAmountRaw: investedAmount,
            currentValue: finalTl.toLocaleString('tr-TR', { maximumFractionDigits: 0 }),
            currentValueRaw: finalTl,
            profit: profit.toLocaleString('tr-TR', { maximumFractionDigits: 0 }),
            profitRaw: profit,
            percentageChange: Number(percentageChange).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            percentageChangeRaw: percentageChange,
            startDate: new Date(`${selectedYear}-${String(selectedMonth).padStart(2,'0')}`).toLocaleString('tr-TR', { month: 'long', year: 'numeric' }),
            startPrice: pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 }),
            endPrice: currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 }),
            assetName: 'Konut Fiyat Endeksi, İngiltere',
            unitsBought: investedAmountGbp.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            unitsBoughtRaw: investedAmountGbp,
            gbpStart: pastGbpRate,
            gbpEnd: currentGbpRate,
            hpiChange: hpiChange,
            detailSteps: [
              `${investedAmount.toLocaleString('tr-TR')} TL, ${selectedYear}-${String(selectedMonth).padStart(2,'0')} tarihinde ${pastGbpRate.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} GBP/TL kuru ile ${investedAmountGbp.toLocaleString('en-GB', { maximumFractionDigits: 2 })} GBP'ye çevrildi.`,
              `${investedAmountGbp.toLocaleString('en-GB', { maximumFractionDigits: 2 })} GBP ile ${pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesindeki İngiltere Konut Fiyat Endeksi'nden ${(investedAmountGbp / pastPrice).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} birim alınabilirdi.`,
              `İngiltere Konut Fiyat Endeksi belirtilen zaman aralığında ${pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesinden ${currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesine yükseldiği için yatırımın güncel değeri ${finalGbp.toLocaleString('en-GB', { maximumFractionDigits: 2 })} GBP oldu.`,
              `Güncel GBP/TL kuru ${currentGbpRate.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ile yatırımınızın bugünkü değeri ${finalTl.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} TL'dir.`
            ]
          });
          setIsLoading(false);
          return;
        } else if (investmentType === 'us_hpi') {
          // US: TL -> USD (tarihsel kur) -> HPI artışı -> USD -> TL (güncel kur)
          // Paralel API çağrıları ile performans iyileştirmesi
          const [pastPrice, currentPrice, pastUsdRate, currentUsdRate] = await Promise.all([
            fetchData('us_hpi', dateString, false),
            fetchData('us_hpi', null, true),
            fetchData('dolar', dateString, false),
            fetchData('dolar', null, true)
          ]);

          // 4. TL -> USD çevir, HPI artışını uygula, tekrar TL'ye çevir
          const investedAmountUsd = investedAmount / pastUsdRate;
          const hpiChange = currentPrice / pastPrice;
          const finalUsd = investedAmountUsd * hpiChange;
          const finalTl = finalUsd * currentUsdRate;
          const profit = finalTl - investedAmount;
          const percentageChange = (profit / investedAmount) * 100;

          setResultPast({
            investedAmount: investedAmount.toLocaleString('tr-TR'),
            investedAmountRaw: investedAmount,
            currentValue: finalTl.toLocaleString('tr-TR', { maximumFractionDigits: 0 }),
            currentValueRaw: finalTl,
            profit: profit.toLocaleString('tr-TR', { maximumFractionDigits: 0 }),
            profitRaw: profit,
            percentageChange: Number(percentageChange).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            percentageChangeRaw: percentageChange,
            startDate: new Date(`${selectedYear}-${String(selectedMonth).padStart(2,'0')}`).toLocaleString('tr-TR', { month: 'long', year: 'numeric' }),
            startPrice: pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 }),
            endPrice: currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 }),
            assetName: 'Konut Fiyat Endeksi, Amerika',
            unitsBought: investedAmountUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            unitsBoughtRaw: investedAmountUsd,
            usdStart: pastUsdRate,
            usdEnd: currentUsdRate,
            hpiChange: hpiChange,
            detailSteps: [
              `${investedAmount.toLocaleString('tr-TR')} TL, ${selectedYear}-${String(selectedMonth).padStart(2,'0')} tarihinde ${pastUsdRate.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} USD/TL kuru ile ${investedAmountUsd.toLocaleString('en-US', { maximumFractionDigits: 2 })} USD'ye çevrildi.`,
              `${investedAmountUsd.toLocaleString('en-US', { maximumFractionDigits: 2 })} USD ile ${pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesindeki Amerika Konut Fiyat Endeksi'nden ${(investedAmountUsd / pastPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} birim alınabilirdi.`,
              `Amerika Konut Fiyat Endeksi belirtilen zaman aralığında ${pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesinden ${currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesine yükseldiği için yatırımın güncel değeri ${finalUsd.toLocaleString('en-US', { maximumFractionDigits: 2 })} USD oldu.`,
              `Güncel USD/TL kuru ${currentUsdRate.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ile yatırımınızın bugünkü değeri ${finalTl.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} TL'dir.`
            ]
          });
          setIsLoading(false);
          return;
        } else if (investmentType === 'de_hpi') {
          // DE: TL -> EUR (tarihsel kur) -> HPI artışı -> EUR -> TL (güncel kur)
          // Paralel API çağrıları ile performans iyileştirmesi
          const [pastPrice, currentPrice, pastEurRate, currentEurRate] = await Promise.all([
            fetchData('de_hpi', dateString, false),
            fetchData('de_hpi', null, true),
            fetchData('euro', dateString, false),
            fetchData('euro', null, true)
          ]);

          // 4. TL -> EUR çevir, HPI artışını uygula, tekrar TL'ye çevir
          const investedAmountEur = investedAmount / pastEurRate;
          const hpiChange = currentPrice / pastPrice;
          const finalEur = investedAmountEur * hpiChange;
          const finalTl = finalEur * currentEurRate;
          const profit = finalTl - investedAmount;
          const percentageChange = (profit / investedAmount) * 100;

          setResultPast({
            investedAmount: investedAmount.toLocaleString('tr-TR'),
            investedAmountRaw: investedAmount,
            currentValue: finalTl.toLocaleString('tr-TR', { maximumFractionDigits: 0 }),
            currentValueRaw: finalTl,
            profit: profit.toLocaleString('tr-TR', { maximumFractionDigits: 0 }),
            profitRaw: profit,
            percentageChange: Number(percentageChange).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            percentageChangeRaw: percentageChange,
            startDate: new Date(`${selectedYear}-${String(selectedMonth).padStart(2,'0')}`).toLocaleString('tr-TR', { month: 'long', year: 'numeric' }),
            startPrice: pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 }),
            endPrice: currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 }),
            assetName: 'Konut Fiyat Endeksi, Almanya',
            unitsBought: investedAmountEur.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            unitsBoughtRaw: investedAmountEur,
            eurStart: pastEurRate,
            eurEnd: currentEurRate,
            hpiChange: hpiChange,
            detailSteps: [
              `${investedAmount.toLocaleString('tr-TR')} TL, ${selectedYear}-${String(selectedMonth).padStart(2,'0')} tarihinde ${pastEurRate.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} EUR/TL kuru ile ${investedAmountEur.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} EUR'ye çevrildi.`,
              `${investedAmountEur.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} EUR ile ${pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesindeki Almanya Konut Fiyat Endeksi'nden ${(investedAmountEur / pastPrice).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} birim alınabilirdi.`,
              `Almanya Konut Fiyat Endeksi belirtilen zaman aralığında ${pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesinden ${currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesine yükseldiği için yatırımın güncel değeri ${finalEur.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} EUR oldu.`,
              `Güncel EUR/TL kuru ${currentEurRate.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ile yatırımınızın bugünkü değeri ${finalTl.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} TL'dir.`
            ]
          });
          setIsLoading(false);
          return;
        } else if (investmentType === 'es_hpi') {
          // ES: TL -> EUR (tarihsel kur) -> HPI artışı -> EUR -> TL (güncel kur)
          // Paralel API çağrıları ile performans iyileştirmesi
          const [pastPrice, currentPrice, pastEurRate, currentEurRate] = await Promise.all([
            fetchData('es_hpi', dateString, false),
            fetchData('es_hpi', null, true),
            fetchData('euro', dateString, false),
            fetchData('euro', null, true)
          ]);

          // 4. TL -> EUR çevir, HPI artışını uygula, tekrar TL'ye çevir
          const investedAmountEur = investedAmount / pastEurRate;
          const hpiChange = currentPrice / pastPrice;
          const finalEur = investedAmountEur * hpiChange;
          const finalTl = finalEur * currentEurRate;
          const profit = finalTl - investedAmount;
          const percentageChange = (profit / investedAmount) * 100;

          setResultPast({
            investedAmount: investedAmount.toLocaleString('tr-TR'),
            investedAmountRaw: investedAmount,
            currentValue: finalTl.toLocaleString('tr-TR', { maximumFractionDigits: 0 }),
            currentValueRaw: finalTl,
            profit: profit.toLocaleString('tr-TR', { maximumFractionDigits: 0 }),
            profitRaw: profit,
            percentageChange: percentageChange.toLocaleString('tr-TR', { maximumFractionDigits: 2 }),
            percentageChangeRaw: percentageChange,
            startPrice: pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 }),
            endPrice: currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 }),
            assetName: 'Konut Fiyat Endeksi, İspanya',
            unitsBought: investedAmountEur.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            unitsBoughtRaw: investedAmountEur,
            eurStart: pastEurRate,
            eurEnd: currentEurRate,
            hpiChange: hpiChange,
            detailSteps: [
              `${investedAmount.toLocaleString('tr-TR')} TL, ${selectedYear}-${String(selectedMonth).padStart(2,'0')} tarihinde ${pastEurRate.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} EUR/TL kuru ile ${investedAmountEur.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} EUR'ye çevrildi.`,
              `${investedAmountEur.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} EUR ile ${pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesindeki İspanya Konut Fiyat Endeksi'nden ${(investedAmountEur / pastPrice).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} birim alınabilirdi.`,
              `İspanya Konut Fiyat Endeksi belirtilen zaman aralığında ${pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesinden ${currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesine yükseldiği için yatırımın güncel değeri ${finalEur.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} EUR oldu.`,
              `Güncel EUR/TL kuru ${currentEurRate.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ile yatırımınızın bugünkü değeri ${finalTl.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} TL'dir.`
            ]
          });
          setIsLoading(false);
          return;
        } else if (investmentType === 'fr_hpi') {
          // FR: TL -> EUR (tarihsel kur) -> HPI artışı -> EUR -> TL (güncel kur)
          // Paralel API çağrıları ile performans iyileştirmesi
          const [pastPrice, currentPrice, pastEurRate, currentEurRate] = await Promise.all([
            fetchData('fr_hpi', dateString, false),
            fetchData('fr_hpi', null, true),
            fetchData('euro', dateString, false),
            fetchData('euro', null, true)
          ]);

          // 4. TL -> EUR çevir, HPI artışını uygula, tekrar TL'ye çevir
          const investedAmountEur = investedAmount / pastEurRate;
          const hpiChange = currentPrice / pastPrice;
          const finalEur = investedAmountEur * hpiChange;
          const finalTl = finalEur * currentEurRate;
          const profit = finalTl - investedAmount;
          const percentageChange = (profit / investedAmount) * 100;

          setResultPast({
            investedAmount: investedAmount.toLocaleString('tr-TR'),
            investedAmountRaw: investedAmount,
            currentValue: finalTl.toLocaleString('tr-TR', { maximumFractionDigits: 0 }),
            currentValueRaw: finalTl,
            profit: profit.toLocaleString('tr-TR', { maximumFractionDigits: 0 }),
            profitRaw: profit,
            percentageChange: percentageChange.toLocaleString('tr-TR', { maximumFractionDigits: 2 }),
            percentageChangeRaw: percentageChange,
            startDate: new Date(`${selectedYear}-${String(selectedMonth).padStart(2,'0')}`).toLocaleString('tr-TR', { month: 'long', year: 'numeric' }),
            startPrice: pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 }),
            endPrice: currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 }),
            assetName: 'Konut Fiyat Endeksi, Fransa',
            unitsBought: investedAmountEur.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            unitsBoughtRaw: investedAmountEur,
            eurStart: pastEurRate,
            eurEnd: currentEurRate,
            hpiChange: hpiChange,
            detailSteps: [
              `${investedAmount.toLocaleString('tr-TR')} TL, ${selectedYear}-${String(selectedMonth).padStart(2,'0')} tarihinde ${pastEurRate.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} EUR/TL kuru ile ${investedAmountEur.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} EUR'ye çevrildi.`,
              `${investedAmountEur.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} EUR ile ${pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesindeki Fransa Konut Fiyat Endeksi'nden ${(investedAmountEur / pastPrice).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} birim alınabilirdi.`,
              `Fransa Konut Fiyat Endeksi belirtilen zaman aralığında ${pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesinden ${currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesine yükseldiği için yatırımın güncel değeri ${finalEur.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} EUR oldu.`,
              `Güncel EUR/TL kuru ${currentEurRate.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ile yatırımınızın bugünkü değeri ${finalTl.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} TL'dir.`
            ]
          });
          setIsLoading(false);
          return;
        } else if (investmentType === 'nl_hpi') {
          // NL: TL -> EUR (tarihsel kur) -> HPI artışı -> EUR -> TL (güncel kur)
          // Paralel API çağrıları ile performans iyileştirmesi
          const [pastPrice, currentPrice, pastEurRate, currentEurRate] = await Promise.all([
            fetchData('nl_hpi', dateString, false),
            fetchData('nl_hpi', null, true),
            fetchData('euro', dateString, false),
            fetchData('euro', null, true)
          ]);

          // 4. TL -> EUR çevir, HPI artışını uygula, tekrar TL'ye çevir
          const investedAmountEur = investedAmount / pastEurRate;
          const hpiChange = currentPrice / pastPrice;
          const finalEur = investedAmountEur * hpiChange;
          const finalTl = finalEur * currentEurRate;
          const profit = finalTl - investedAmount;
          const percentageChange = (profit / investedAmount) * 100;

          setResultPast({
            investedAmount: investedAmount.toLocaleString('tr-TR'),
            investedAmountRaw: investedAmount,
            currentValue: finalTl.toLocaleString('tr-TR', { maximumFractionDigits: 0 }),
            currentValueRaw: finalTl,
            profit: profit.toLocaleString('tr-TR', { maximumFractionDigits: 0 }),
            profitRaw: profit,
            percentageChange: percentageChange.toLocaleString('tr-TR', { maximumFractionDigits: 2 }),
            percentageChangeRaw: percentageChange,
            startDate: new Date(`${selectedYear}-${String(selectedMonth).padStart(2,'0')}`).toLocaleString('tr-TR', { month: 'long', year: 'numeric' }),
            startPrice: pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 }),
            endPrice: currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 }),
            assetName: 'Konut Fiyat Endeksi, Hollanda',
            unitsBought: investedAmountEur.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            unitsBoughtRaw: investedAmountEur,
            eurStart: pastEurRate,
            eurEnd: currentEurRate,
            hpiChange: hpiChange,
            detailSteps: [
              `${investedAmount.toLocaleString('tr-TR')} TL, ${selectedYear}-${String(selectedMonth).padStart(2,'0')} tarihinde ${pastEurRate.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} EUR/TL kuru ile ${investedAmountEur.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} EUR'ye çevrildi.`,
              `${investedAmountEur.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} EUR ile ${pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesindeki Hollanda Konut Fiyat Endeksi'nden ${(investedAmountEur / pastPrice).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} birim alınabilirdi.`,
              `Hollanda Konut Fiyat Endeksi belirtilen zaman aralığında ${pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesinden ${currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesine yükseldiği için yatırımın güncel değeri ${finalEur.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} EUR oldu.`,
              `Güncel EUR/TL kuru ${currentEurRate.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ile yatırımınızın bugünkü değeri ${finalTl.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} TL'dir.`
            ]
          });
          setIsLoading(false);
          return;
        } else if (investmentType === 'it_hpi') {
          // IT: TL -> EUR (tarihsel kur) -> HPI artışı -> EUR -> TL (güncel kur)
          // Paralel API çağrıları ile performans iyileştirmesi
          const [pastPrice, currentPrice, pastEurRate, currentEurRate] = await Promise.all([
            fetchData('it_hpi', dateString, false),
            fetchData('it_hpi', null, true),
            fetchData('euro', dateString, false),
            fetchData('euro', null, true)
          ]);

          // 4. TL -> EUR çevir, HPI artışını uygula, tekrar TL'ye çevir
          const investedAmountEur = investedAmount / pastEurRate;
          const hpiChange = currentPrice / pastPrice;
          const finalEur = investedAmountEur * hpiChange;
          const finalTl = finalEur * currentEurRate;
          const profit = finalTl - investedAmount;
          const percentageChange = (profit / investedAmount) * 100;

          setResultPast({
            investedAmount: investedAmount.toLocaleString('tr-TR'),
            investedAmountRaw: investedAmount,
            currentValue: finalTl.toLocaleString('tr-TR', { maximumFractionDigits: 0 }),
            currentValueRaw: finalTl,
            profit: profit.toLocaleString('tr-TR', { maximumFractionDigits: 0 }),
            profitRaw: profit,
            percentageChange: percentageChange.toLocaleString('tr-TR', { maximumFractionDigits: 2 }),
            percentageChangeRaw: percentageChange,
            startDate: new Date(`${selectedYear}-${String(selectedMonth).padStart(2,'0')}`).toLocaleString('tr-TR', { month: 'long', year: 'numeric' }),
            startPrice: pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 }),
            endPrice: currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 }),
            assetName: 'Konut Fiyat Endeksi, İtalya',
            unitsBought: investedAmountEur.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            unitsBoughtRaw: investedAmountEur,
            eurStart: pastEurRate,
            eurEnd: currentEurRate,
            hpiChange: hpiChange,
            detailSteps: [
              `${investedAmount.toLocaleString('tr-TR')} TL, ${selectedYear}-${String(selectedMonth).padStart(2,'0')} tarihinde ${pastEurRate.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} EUR/TL kuru ile ${investedAmountEur.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} EUR'ye çevrildi.`,
              `${investedAmountEur.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} EUR ile ${pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesindeki İtalya Konut Fiyat Endeksi'nden ${(investedAmountEur / pastPrice).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} birim alınabilirdi.`,
              `İtalya Konut Fiyat Endeksi belirtilen zaman aralığında ${pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesinden ${currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesine yükseldiği için yatırımın güncel değeri ${finalEur.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} EUR oldu.`,
              `Güncel EUR/TL kuru ${currentEurRate.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ile yatırımınızın bugünkü değeri ${finalTl.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} TL'dir.`
            ]
          });
          setIsLoading(false);
          return;
        } else if (investmentType === 'gr_hpi') {
          // GR: TL -> EUR (tarihsel kur) -> HPI artışı -> EUR -> TL (güncel kur)
          // Paralel API çağrıları ile performans iyileştirmesi
          const [pastPrice, currentPrice, pastEurRate, currentEurRate] = await Promise.all([
            fetchData('gr_hpi', dateString, false),
            fetchData('gr_hpi', null, true),
            fetchData('euro', dateString, false),
            fetchData('euro', null, true)
          ]);

          // 4. TL -> EUR çevir, HPI artışını uygula, tekrar TL'ye çevir
          const investedAmountEur = investedAmount / pastEurRate;
          const hpiChange = currentPrice / pastPrice;
          const finalEur = investedAmountEur * hpiChange;
          const finalTl = finalEur * currentEurRate;
          const profit = finalTl - investedAmount;
          const percentageChange = (profit / investedAmount) * 100;

          setResultPast({
            investedAmount: investedAmount.toLocaleString('tr-TR'),
            investedAmountRaw: investedAmount,
            currentValue: finalTl.toLocaleString('tr-TR', { maximumFractionDigits: 0 }),
            currentValueRaw: finalTl,
            profit: profit.toLocaleString('tr-TR', { maximumFractionDigits: 0 }),
            profitRaw: profit,
            percentageChange: percentageChange.toLocaleString('tr-TR', { maximumFractionDigits: 2 }),
            percentageChangeRaw: percentageChange,
            startDate: new Date(`${selectedYear}-${String(selectedMonth).padStart(2,'0')}`).toLocaleString('tr-TR', { month: 'long', year: 'numeric' }),
            startPrice: pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 }),
            endPrice: currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 }),
            assetName: 'Konut Fiyat Endeksi, Yunanistan',
            unitsBought: investedAmountEur.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            unitsBoughtRaw: investedAmountEur,
            eurStart: pastEurRate,
            eurEnd: currentEurRate,
            hpiChange: hpiChange,
            detailSteps: [
              `${investedAmount.toLocaleString('tr-TR')} TL, ${selectedYear}-${String(selectedMonth).padStart(2,'0')} tarihinde ${pastEurRate.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} EUR/TL kuru ile ${investedAmountEur.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} EUR'ye çevrildi.`,
              `${investedAmountEur.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} EUR ile ${pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesindeki Yunanistan Konut Fiyat Endeksi'nden ${(investedAmountEur / pastPrice).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} birim alınabilirdi.`,
              `Yunanistan Konut Fiyat Endeksi belirtilen zaman aralığında ${pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesinden ${currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesine yükseldiği için yatırımın güncel değeri ${finalEur.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} EUR oldu.`,
              `Güncel EUR/TL kuru ${currentEurRate.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ile yatırımınızın bugünkü değeri ${finalTl.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} TL'dir.`
            ]
          });
          setIsLoading(false);
          return;
        } else if (['bist100', 'nasdaq100', 'ftse100', 'dax40', 'ibex35', 'cac40', 'ftsemib', 'aex', 'ase'].includes(investmentType)) {
          // Borsa endeksleri için paralel API çağrıları ile performans iyileştirmesi
          try {
            // Önce borsa endeksi verilerini paralel olarak al
            const [stockData, stockCurrentData] = await Promise.all([
              fetch('/api/fetch-all-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  asset: investmentType,
                  date: dateString,
                  isCurrent: false
                }),
              }).then(resp => {
                if (!resp.ok) {
                  const errorData = resp.json().catch(() => ({}));
                  throw new Error(errorData.error || `Borsa API hatası: ${resp.statusText}`);
                }
                return resp.json();
              }),
              fetch('/api/fetch-all-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  asset: investmentType,
                  isCurrent: true
                }),
              }).then(resp => {
                if (!resp.ok) {
                  const errorData = resp.json().catch(() => ({}));
                  throw new Error(errorData.error || `Borsa API hatası: ${resp.statusText}`);
                }
                return resp.json();
              })
            ]);

            pastPrice = stockData.price;
            currentPrice = stockCurrentData.price;

          // Borsa endeksleri için döviz kuru hesaplaması - paralel API çağrıları
          let currencyRate = 1; // TR için
          let currencyName = 'TL';
          let currencyCode = '';

          if (investmentType === 'nasdaq100') {
            currencyCode = 'dolar';
            currencyName = 'USD';
          } else if (investmentType === 'ftse100') {
            currencyCode = 'sterlin';
            currencyName = 'GBP';
          } else if (['dax40', 'ibex35', 'cac40', 'ftsemib', 'aex', 'ase'].includes(investmentType)) {
            currencyCode = 'euro';
            currencyName = 'EUR';
          }

          // Döviz kuru verilerini paralel olarak al
          const [pastCurrencyRate, currentCurrencyRate] = currencyCode ? 
            await Promise.all([
              fetchData(currencyCode, dateString, false),
              fetchData(currencyCode, null, true)
            ]) : [1, 1];

          currencyRate = pastCurrencyRate;

          // TL -> Foreign currency çevir, endeks artışını uygula, tekrar TL'ye çevir
          const investedAmountForeign = currencyRate !== 1 ? (investedAmount / currencyRate) : (investedAmount / pastPrice);
          const indexChange = currentPrice / pastPrice;
          const finalForeign = currencyRate !== 1 ? (investedAmountForeign * indexChange) : (investedAmountForeign * currentPrice);
          const finalTl = currencyRate !== 1 ? (finalForeign * currentCurrencyRate) : finalForeign;
          const profit = finalTl - investedAmount;
          const percentageChange = (profit / investedAmount) * 100;

          setResultPast({
            investedAmount: investedAmount.toLocaleString('tr-TR'),
            investedAmountRaw: investedAmount,
            currentValue: finalTl.toLocaleString('tr-TR', { maximumFractionDigits: 0 }),
            currentValueRaw: finalTl,
            profit: profit.toLocaleString('tr-TR', { maximumFractionDigits: 0 }),
            profitRaw: profit,
            percentageChange: Number(percentageChange).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            percentageChangeRaw: percentageChange,
            startDate: new Date(`${selectedYear}-${String(selectedMonth).padStart(2,'0')}`).toLocaleString('tr-TR', { month: 'long', year: 'numeric' }),
            startPrice: pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 }),
            endPrice: currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 }),
            assetName: friendlyAssetNames[investmentType],
            unitsBought: investedAmountForeign.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            unitsBoughtRaw: investedAmountForeign,
            currencyStart: currencyRate,
            currencyEnd: currentCurrencyRate,
            indexChange: indexChange,
            currencyCode: currencyCode, // Pass currencyCode to the result
            detailSteps: currencyCode ? [
              `1. ${investedAmount.toLocaleString('tr-TR')} TL, ${selectedYear}-${String(selectedMonth).padStart(2,'0')} tarihinde ${currencyRate.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ${currencyName}/TL kuru ile ${investedAmountForeign.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ${currencyName}'ye çevrildi.`,
              `2. ${investedAmountForeign.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ${currencyName} ile ${pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesindeki ${friendlyAssetNames[investmentType]} endeksinden ${(investedAmountForeign / pastPrice).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} birim alınabilirdi.`,
              `3. ${friendlyAssetNames[investmentType]} endeksi belirtilen zaman aralığında ${pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesinden ${currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesine yükseldiği için yatırımın güncel değeri ${finalForeign.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ${currencyName} oldu.`,
              `4. Güncel ${currencyName}/TL kuru (${currentCurrencyRate.toLocaleString('tr-TR', { maximumFractionDigits: 2 })}) ile yatırımınızın bugünkü değeri ${finalTl.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} TL'dir.`
            ] : [
              `1. ${friendlyAssetNames[investmentType]} endeksi belirtilen zaman aralığında ${pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesinden ${currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesine yükselmiştir.`,
              `2. ${investedAmount.toLocaleString('tr-TR')} TL ile ${dateString} tarihinde ${pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} seviyesindeki ${friendlyAssetNames[investmentType]} endeksinden ${investedAmountForeign.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} birim alınabilirdi.`,
              `3. Endeksin güncel seviyesi ${currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} olduğundan yatırımın bugünkü değeri ${finalTl.toLocaleString('tr-TR', {maximumFractionDigits: 0})} TL olarak hesaplanmıştır.`
            ]
          });
          setIsLoading(false);
          return;
          } catch (error) {
            console.error(`${friendlyAssetNames[investmentType]} verisi alınamadı`, error);
            throw new Error(`Borsa verisi alınırken hata: ${error.message}`);
          }
        } else {
          // TR assets: gold, dolar, euro, sterlin, kfe - paralel API çağrıları
          const [pastPriceResult, currentPriceResult] = await Promise.all([
            fetchData(investmentType, dateString, false),
            fetchData(investmentType, null, true)
          ]);
          
          pastPrice = pastPriceResult;
          currentPrice = currentPriceResult;
        }

        if (!pastPrice || !currentPrice) {
        throw new Error('Veri alınamadı. Lütfen daha farklı bir tarih deneyin veya daha sonra tekrar test edin.');
      }

        // Her yatırım türü için özel hesaplama mantığı
        let unitsBought, currentValue, profit, percentageChange;
        let assetName, startPrice, endPrice, unitsBoughtDisplay;

        if (['gold','altin','silver','gumus','copper','bakir'].includes(investmentType)) {
          // Altın: TRY/gram olarak hesapla
          unitsBought = investedAmount / pastPrice; // Metal gram veya kg bazlı
          currentValue = unitsBought * currentPrice;
          profit = currentValue - investedAmount;
          percentageChange = (profit / investedAmount) * 100;

          if (['copper','bakir'].includes(investmentType)) {
            assetName = 'Bakır (TRY/kg)';
            unitsBoughtDisplay = unitsBought.toLocaleString('tr-TR', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
          } else if (['silver','gumus'].includes(investmentType)) {
            assetName = 'Gümüş (TRY/gram)';
            unitsBoughtDisplay = unitsBought.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          } else {
            assetName = 'Altın (TRY/gram)';
            unitsBoughtDisplay = unitsBought.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          }
          startPrice = pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 });
          endPrice = currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 });

        } else if (['dolar', 'usd'].includes(investmentType)) {
          // Dolar: USD/TRY kuru
          unitsBought = investedAmount / pastPrice; // Kaç USD alınabilirdi
          currentValue = unitsBought * currentPrice;
          profit = currentValue - investedAmount;
          percentageChange = (profit / investedAmount) * 100;

          assetName = 'Dolar (USD/TRY)';
          startPrice = pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 });
          endPrice = currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 });
          unitsBoughtDisplay = unitsBought.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        } else if (['euro', 'eur'].includes(investmentType)) {
          // Euro: EUR/TRY kuru
          unitsBought = investedAmount / pastPrice; // Kaç EUR alınabilirdi
          currentValue = unitsBought * currentPrice;
          profit = currentValue - investedAmount;
          percentageChange = (profit / investedAmount) * 100;

          assetName = 'Euro (EUR/TRY)';
          startPrice = pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 });
          endPrice = currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 });
          unitsBoughtDisplay = unitsBought.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        } else if (['sterlin', 'gbp'].includes(investmentType)) {
          // Sterlin: GBP/TRY kuru
          unitsBought = investedAmount / pastPrice; // Kaç GBP alınabilirdi
          currentValue = unitsBought * currentPrice;
          profit = currentValue - investedAmount;
          percentageChange = (profit / investedAmount) * 100;

          assetName = 'Sterlin (GBP/TRY)';
          startPrice = pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 });
          endPrice = currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 });
          unitsBoughtDisplay = unitsBought.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        } else if (investmentType === 'kfe') {
          // Konut Fiyat Endeksi (TR)
          unitsBought = investedAmount / pastPrice; // Kaç birim KFE alınabilirdi
          currentValue = unitsBought * currentPrice;
          profit = currentValue - investedAmount;
          percentageChange = (profit / investedAmount) * 100;

          assetName = 'Konut Fiyat Endeksi (TR)';
          startPrice = pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 });
          endPrice = currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 });
          unitsBoughtDisplay = unitsBought.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

          // KFE için detaylı açıklama adımları
          const detailSteps = [
            `1. ${assetName} belirtilen zaman aralığında ${startPrice} seviyesinden ${endPrice} seviyesine yükselmiştir.`,
            `2. ${investedAmount.toLocaleString('tr-TR')} TL ile ${dateString} tarihinde ${unitsBoughtDisplay} birim ${assetName} alınabilirdi.`,
            `3. Endeksin güncel seviyesi ${endPrice} olduğundan yatırımın bugünkü değeri ${currentValue.toLocaleString('tr-TR', {maximumFractionDigits: 0})} TL olarak hesaplanmıştır.`
          ];

          setResultPast({
            investedAmount: investedAmount.toLocaleString('tr-TR'),
            investedAmountRaw: investedAmount,
            currentValue: currentValue.toLocaleString('tr-TR', { maximumFractionDigits: 0 }),
            currentValueRaw: currentValue,
            profit: profit.toLocaleString('tr-TR', { maximumFractionDigits: 0 }),
            profitRaw: profit,
            percentageChange: Number(percentageChange).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            percentageChangeRaw: percentageChange,
            startDate: new Date(`${selectedYear}-${String(selectedMonth).padStart(2,'0')}`).toLocaleString('tr-TR', { month: 'long', year: 'numeric' }),
            startPrice: startPrice,
            endPrice: endPrice,
            assetName: assetName,
            unitsBought: unitsBoughtDisplay,
            unitsBoughtRaw: unitsBought,
            detailSteps: detailSteps
          });
          setIsLoading(false);
          return;
        } else {
          // Diğer varlıklar için genel hesaplama
          unitsBought = investedAmount / pastPrice;
          currentValue = unitsBought * currentPrice;
          profit = currentValue - investedAmount;
          percentageChange = (profit / investedAmount) * 100;

          assetName = friendlyAssetNames[investmentType];
          startPrice = pastPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 });
          endPrice = currentPrice.toLocaleString('tr-TR', { maximumFractionDigits: 2 });
          unitsBoughtDisplay = unitsBought.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

  setResultPast({
        investedAmount: investedAmount.toLocaleString('tr-TR'),
        investedAmountRaw: investedAmount,
        currentValue: currentValue.toLocaleString('tr-TR', { maximumFractionDigits: 0 }),
        currentValueRaw: currentValue,
        profit: profit.toLocaleString('tr-TR', { maximumFractionDigits: 0 }),
        profitRaw: profit,
        percentageChange: Number(percentageChange).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        percentageChangeRaw: percentageChange,
  startDate: new Date(`${selectedYear}-${String(selectedMonth).padStart(2,'0')}`).toLocaleString('tr-TR', { month: 'long', year: 'numeric' }),
    startPrice: startPrice,
    endPrice: endPrice,
  assetName: assetName,
        unitsBought: unitsBoughtDisplay,
        unitsBoughtRaw: unitsBought,
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
          <p className="text-lg text-gray-600 mt-4">Geçmişte belirli bir tarihte eğer &quot;o yatırımı&quot; yapmış olsaydınız, bugünkü değeri ne olurdu?<br />Bu sorunun kesin cevabını bilmesek bile, piyasa verilerine dayanarak bir fikir edinebiliriz.</p>
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
                <select value={investmentType} onChange={(e) => setInvestmentType(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue">
                  <optgroup label="Döviz">
                    <option value="dolar">Dolar (USD/TRY)</option>
                    <option value="euro">Euro (EUR/TRY)</option>
                    <option value="sterlin">Sterlin (GBP/TRY)</option>
                  </optgroup>
                  <optgroup label="Emtia">
                    <option value="gold">Altın (TRY/gram)</option>
                    <option value="silver">Gümüş (TRY/gram)</option>
                    <option value="copper">Bakır (TRY/kg)</option>
                  </optgroup>
                  <optgroup label="Borsa Endeksi">
                    <option value="bist100">Borsa Endeksi (Türkiye, BIST 100)</option>
                    <option value="nasdaq100">Borsa Endeksi (Amerika, NASDAQ 100)</option>
                    <option value="ftse100">Borsa Endeksi (İngiltere, FTSE 100)</option>
                    <option value="dax40">Borsa Endeksi (Almanya, DAX 40)</option>
                    <option value="cac40">Borsa Endeksi (Fransa, CAC 40)</option>
                    <option value="ftsemib">Borsa Endeksi (İtalya, FTSE MIB)</option>
                    <option value="ibex35">Borsa Endeksi (İspanya, IBEX 35)</option>
                    <option value="aex">Borsa Endeksi (Hollanda, AEX)</option>
                    <option value="ase">Borsa Endeksi (Yunanistan, ASE)</option>
                  </optgroup>
                  <optgroup label="Konut Fiyat Endeksi">
                    <option value="kfe">Konut Fiyat Endeksi, Türkiye (TR)</option>
                    <option value="us_hpi">Konut Fiyat Endeksi, Amerika (US)</option>
                    <option value="gb_hpi">Konut Fiyat Endeksi, İngiltere (GB)</option>
                    <option value="de_hpi">Konut Fiyat Endeksi, Almanya (DE)</option>
                    <option value="fr_hpi">Konut Fiyat Endeksi, Fransa (FR)</option>
                    <option value="it_hpi">Konut Fiyat Endeksi, İtalya (IT)</option>
                    <option value="es_hpi">Konut Fiyat Endeksi, İspanya (ES)</option>
                    <option value="nl_hpi">Konut Fiyat Endeksi, Hollanda (NL)</option>
                    <option value="gr_hpi">Konut Fiyat Endeksi, Yunanistan (GR)</option>
                  </optgroup>
                </select>
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
                      <div className="text-sm text-gray-500">Kazanç / Zarar</div>
                      <div className={"text-lg font-bold " + (resultPast.profitRaw >= 0 ? 'text-emerald-600' : 'text-red-600')}>{resultPast.profit} TL</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Getiri</div>
                      <div className="text-lg font-bold text-gray-800">{resultPast.percentageChange}%</div>
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-gray-800 text-center mb-2">Hesaplama Detayları</h4>
                  {resultPast.detailSteps ? (
                    <ul className="text-gray-600 text-xs text-center list-decimal list-inside space-y-1">
                      {resultPast.detailSteps.map((step, idx) => (
                        <li key={idx}>{step.replace(/^[1-4]\. /, '')}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 text-xs text-center">
                      📊 <strong>Hesaplama Açıklaması:</strong> Seçtiğiniz <strong>{resultPast.startDate}</strong> tarihinde 1 birim <strong>{resultPast.assetName}</strong> fiyatı yaklaşık <strong>{resultPast.startPrice} TL</strong> idi. <strong>{resultPast.investedAmount} TL</strong> yatırımınızla yaklaşık <strong>{resultPast.unitsBought} birim</strong> alınabilirdi. Bugünkü birim fiyatın <strong>{resultPast.endPrice} TL</strong> olduğu dikkate alınarak yatırımınızın güncel değeri hesaplanmıştır.
                    </p>
                  )}
                  <p className="text-gray-500 text-xs text-center mt-4 italic">
                    ⚠️ <strong>Önemli Not:</strong> Bu hesaplama sadece bilgilendirme amaçlıdır ve yatırım tavsiyesi niteliği taşımaz. Veriler TCMB, FRED, Yahoo Finance, Trading Economics ve benzeri resmi kaynaklardan alınmaktadır.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
