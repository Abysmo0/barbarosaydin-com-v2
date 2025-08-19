// src/app/yatirim-sihirbazi/page.js
"use client";

import { useState, useMemo } from 'react';

export default function WhatIfPage() { 
  // amount string tutulur; kullanıcı tamamen silebilsin
  const [amount, setAmount] = useState("1000000");
  const [date, setDate] = useState('2020-01');
  const [investmentType, setInvestmentType] = useState('kfe');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleCalculate = async () => {
    // Erken doğrulama: boş, 0 veya geçersiz tutar
    const investedAmount = parseFloat(amount || '');
    if (!amount.trim() || isNaN(investedAmount) || investedAmount <= 0) {
      setResult({ error: 'Bir yatırım tutarı girmelisiniz!' });
      return;
    }

    setIsLoading(true);
    setResult(null);
  let pastPrice = null;
  let currentPrice = null;

    try {
      const fetchPrice = async (assetToFetch, dateString = null, isCurrent = false) => {
        const body = isCurrent ? { asset: assetToFetch, isCurrent: true } : { asset: assetToFetch, date: dateString };
        const response = await fetch('/api/fetch-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `API hatası: ${response.statusText}`);
        }
        const data = await response.json();
        return data.price;
      };

  // Farklı yerel veri setleri artık kullanılmadığından doğrudan API'den çek
  pastPrice = await fetchPrice(investmentType, date, false);
  currentPrice = await fetchPrice(investmentType, null, true);

      if (!pastPrice || !currentPrice) {
        throw new Error('Geçmiş veya güncel fiyat verisi alınamadı.');
      }

      const unitsBought = investedAmount / pastPrice;
      const currentValue = unitsBought * currentPrice;
      const profit = currentValue - investedAmount;
      const percentageChange = (profit / investedAmount) * 100;
      const friendlyAssetNames = { kfe: 'Konut Fiyat Endeksi', altin: 'Altın', dolar: 'Dolar', euro: 'Euro' };
      setResult({
        investedAmount: investedAmount.toLocaleString('tr-TR'),
        investedAmountRaw: investedAmount,
        currentValue: currentValue.toLocaleString('tr-TR', { maximumFractionDigits: 0 }),
        currentValueRaw: currentValue,
        profit: profit.toLocaleString('tr-TR', { maximumFractionDigits: 0 }),
        profitRaw: profit,
        percentageChange: Number(percentageChange).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        percentageChangeRaw: percentageChange,
        startDate: new Date(date + '-01').toLocaleString('tr-TR', { month: 'long', year: 'numeric' }),
        startPrice: pastPrice.toLocaleString('tr-TR'),
        endPrice: currentPrice.toLocaleString('tr-TR'),
        assetName: friendlyAssetNames[investmentType],
        unitsBought: unitsBought.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        unitsBoughtRaw: unitsBought,
      });
    } catch (error) {
      console.error('Hesaplama hatası:', error);
      setResult({ error: 'Veri alınamadı. Lütfen daha eski bir tarih deneyin veya daha sonra tekrar test edin.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Yatırım Sihirbazı</h1>
          <p className="text-lg text-gray-600 mt-4">Geçmişteki bir tarihte belirli bir yatırım yapsaydınız bugünkü değerinin ne olacağını hesaplayın.</p>
        </div>

        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
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
                <option value="altin">Altın (TRY/gram)</option>
                <option value="dolar">Dolar (USD/TRY)</option>
                <option value="euro">Euro (EUR/TRY)</option>
                <option value="kfe">Konut Fiyat Endeksi</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Yatırım Tarihi</label>
              <select value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue">
                {dateOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={handleCalculate}
              disabled={isLoading}
              className="w-full bg-fenerbahce-navy text-white font-bold py-4 px-4 rounded-lg hover:opacity-90 transition-opacity duration-300 disabled:bg-gray-400"
            >
              {isLoading ? 'Hesaplanıyor...' : 'Hesapla'}
            </button>
          </div>

          {result && (result.error ? (
            <div className="mt-6 pt-4 border-t border-dashed text-center text-red-600">
              <p className="font-bold">Hata</p>
              <p className="text-sm">{result.error}</p>
            </div>
          ) : (
            <div className="mt-6 pt-4 border-t border-dashed">
              {/* Özet sonuç kartı */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center mb-6">
                <div>
                  <div className="text-sm text-gray-500">Yatırım</div>
                  <div className="text-lg font-bold text-gray-800">{result.investedAmount} TL</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Bugünkü Değer</div>
                  <div className="text-lg font-bold text-gray-800">{result.currentValue} TL</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Kazanç / Zarar</div>
                  <div className={"text-lg font-bold " + (result.profitRaw >= 0 ? 'text-emerald-600' : 'text-red-600')}>{result.profit} TL</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Getiri</div>
                  <div className="text-lg font-bold text-gray-800">{result.percentageChange}%</div>
                </div>
              </div>

              <h4 className="text-lg font-bold text-gray-800 text-center mb-3">Hesaplama Detayları</h4>
              <p className="text-gray-600 text-sm text-center">
                Seçtiğiniz <strong>{result.startDate}</strong> tarihinde 1 birim <strong>{result.assetName}</strong> fiyatı yaklaşık <strong>{result.startPrice} TL</strong> idi. Bu fiyattan <strong>{result.investedAmount} TL</strong> ile yaklaşık <strong>{result.unitsBought} birim {result.assetName}</strong> alınabilirdi. Bugünkü yaklaşık fiyat <strong>{result.endPrice} TL</strong> olduğundan yatırımın bugünkü değeri hesaplanmıştır.
              </p>
              <p className="text-gray-500 text-xs text-center mt-6 italic">
                Tüm veriler Türkiye Cumhuriyet Merkez Bankası (TCMB) Elektronik Veri Dağıtım Sistemi (EVDS) üzerinden alınmaktadır. Bu hesaplama bilgilendirme amaçlı olup yatırım tavsiyesi niteliği taşımaz.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}