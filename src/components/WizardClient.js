"use client";

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

// Yardımcı Fonksiyon
const formatString = (template, params) => {
  return template.replace(/{(\w+)}/g, (_, key) => params[key] || '');
};

export default function WizardClient({ dict, lang }) {
  const t = dict.wizard;
  const locale = lang === 'en' ? 'en-US' : 'tr-TR';

  // DEĞİŞİKLİK 1: Başlangıç değeri boş bırakıldı
  const [amount, setAmount] = useState("");
  
  const [selectedYear, setSelectedYear] = useState(2010);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [showYearList, setShowYearList] = useState(false);
  const [showMonthList, setShowMonthList] = useState(false);
  
  const [investmentType, setInvestmentType] = useState('bist100');
  const [resultPast, setResultPast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- Dropdown Seçenekleri ---
  const investmentOptions = useMemo(() => {
    const getCountryName = (name) => {
        const match = name.match(/\((?:..|TR), (.*?)\)/);
        return match ? match[1] : name;
    };

    const sortItemsByCountry = (items) => {
        const trItem = items.find(item => item.value.includes('kfe') || item.value.includes('bist100'));
        const otherItems = items.filter(item => item !== trItem)
                                .sort((a, b) => getCountryName(a.name).localeCompare(getCountryName(b.name)));
        return [trItem, ...otherItems].filter(Boolean);
    };

    const borsaBase = [
      { value: "bist100", name: t.assets.bist100 },
      { value: "nasdaq100", name: t.assets.nasdaq100 },
      { value: "dax40", name: t.assets.dax40 },
      { value: "ftse100", name: t.assets.ftse100 },
      { value: "ibex35", name: t.assets.ibex35 },
      { value: "cac40", name: t.assets.cac40 },
      { value: "ftsemib", name: t.assets.ftsemib },
      { value: "aex", name: t.assets.aex },
      { value: "ase", name: t.assets.ase },
    ];

    const konutBase = [
      { value: "kfe", name: t.assets.kfe },
      { value: "us_hpi", name: t.assets.us_hpi },
      { value: "de_hpi", name: t.assets.de_hpi },
      { value: "gb_hpi", name: t.assets.gb_hpi },
      { value: "es_hpi", name: t.assets.es_hpi },
      { value: "fr_hpi", name: t.assets.fr_hpi },
      { value: "it_hpi", name: t.assets.it_hpi },
      { value: "nl_hpi", name: t.assets.nl_hpi },
      { value: "gr_hpi", name: t.assets.gr_hpi },
    ];

    return [
        { label: t.categories.stock, isLabel: true },
        ...sortItemsByCountry(borsaBase),
        { label: t.categories.currency, isLabel: true },
        { value: "dolar", name: t.assets.dolar },
        { value: "euro", name: t.assets.euro },
        { value: "sterlin", name: t.assets.sterlin },
        { label: t.categories.commodity, isLabel: true },
        { value: "gold", name: t.assets.gold },
        { value: "copper", name: t.assets.copper },
        { value: "silver", name: t.assets.silver },
        { label: t.categories.housing, isLabel: true },
        ...sortItemsByCountry(konutBase),
    ];
  }, [t]);

  const getSelectedName = () => {
    const found = investmentOptions.find(opt => opt.value === investmentType);
    return found ? found.name : investmentType;
  };

  const yearListRef = useRef(null);
  const monthListRef = useRef(null);
  const yearButtonRef = useRef(null);
  const monthButtonRef = useRef(null);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const yearList = useMemo(() => {
    const list = [];
    const currentYear = new Date().getFullYear();
    for (let y = 2010; y <= currentYear; y++) list.push(y);
    return list;
  }, []);

  const handleCalculate = async () => {
    // DEĞİŞİKLİK 2: Boş değer kontrolü
    const investedAmount = parseFloat(amount || '');
    if (!amount || amount.toString().trim() === '' || isNaN(investedAmount) || investedAmount <= 0) {
      setResultPast({ error: t.errors.invalidAmount });
      return;
    }

    setIsLoading(true);
    setResultPast(null);

    try {
        const fetchData = async (assetToFetch, dateString = null, isCurrent = false) => {
            try {
              const body = isCurrent ? { asset: assetToFetch, isCurrent: true } : { asset: assetToFetch, date: dateString };
              const response = await fetch('/api/fetch-all-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
              });
              
              if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                let friendlyMsg = errorData.error || t.errors.api;
                if (errorData.code === 'FORBIDDEN_KEY') friendlyMsg = t.errors.forbidden;
                else if (errorData.code === 'NO_DATA') friendlyMsg = t.errors.noData;
                throw new Error(friendlyMsg);
              }
              const data = await response.json();
              return data.price;
            } catch (error) {
              throw error;
            }
        };

      const dateString = `${selectedYear}-${String(selectedMonth).padStart(2,'0')}`;

      const assetConfig = {
        'us_hpi': { type: 'FOREIGN_HPI', currency: 'dolar', currencyName: 'USD', assetName: t.assets.us_hpi },
        'gb_hpi': { type: 'FOREIGN_HPI', currency: 'sterlin', currencyName: 'GBP', assetName: t.assets.gb_hpi },
        'de_hpi': { type: 'FOREIGN_HPI', currency: 'euro', currencyName: 'EUR', assetName: t.assets.de_hpi },
        'es_hpi': { type: 'FOREIGN_HPI', currency: 'euro', currencyName: 'EUR', assetName: t.assets.es_hpi },
        'fr_hpi': { type: 'FOREIGN_HPI', currency: 'euro', currencyName: 'EUR', assetName: t.assets.fr_hpi },
        'nl_hpi': { type: 'FOREIGN_HPI', currency: 'euro', currencyName: 'EUR', assetName: t.assets.nl_hpi },
        'it_hpi': { type: 'FOREIGN_HPI', currency: 'euro', currencyName: 'EUR', assetName: t.assets.it_hpi },
        'gr_hpi': { type: 'FOREIGN_HPI', currency: 'euro', currencyName: 'EUR', assetName: t.assets.gr_hpi },
        
        'bist100': { type: 'SIMPLE_TR', assetName: t.assets.bist100 },
        'nasdaq100': { type: 'STOCK_INDEX', currency: 'dolar', currencyName: 'USD', assetName: t.assets.nasdaq100 },
        'ftse100': { type: 'STOCK_INDEX', currency: 'sterlin', currencyName: 'GBP', assetName: t.assets.ftse100 },
        'dax40': { type: 'STOCK_INDEX', currency: 'euro', currencyName: 'EUR', assetName: t.assets.dax40 },
        'ibex35': { type: 'STOCK_INDEX', currency: 'euro', currencyName: 'EUR', assetName: t.assets.ibex35 },
        'cac40': { type: 'STOCK_INDEX', currency: 'euro', currencyName: 'EUR', assetName: t.assets.cac40 },
        'ftsemib': { type: 'STOCK_INDEX', currency: 'euro', currencyName: 'EUR', assetName: t.assets.ftsemib },
        'aex': { type: 'STOCK_INDEX', currency: 'euro', currencyName: 'EUR', assetName: t.assets.aex },
        'ase': { type: 'STOCK_INDEX', currency: 'euro', currencyName: 'EUR', assetName: t.assets.ase },

        'kfe': { type: 'SIMPLE_TR', assetName: t.assets.kfe },
        'gold': { type: 'SIMPLE_TR', assetName: t.assets.gold },
        'silver': { type: 'SIMPLE_TR', assetName: t.assets.silver },
        'copper': { type: 'SIMPLE_TR', assetName: t.assets.copper },
        'dolar': { type: 'SIMPLE_TR', assetName: t.assets.dolar },
        'euro': { type: 'SIMPLE_TR', assetName: t.assets.euro },
        'sterlin': { type: 'SIMPLE_TR', assetName: t.assets.sterlin },
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

        const investedAmountForeign = investedAmount / pastCurrencyRate;
        const changeRatio = currentPrice / pastPrice;
        const finalForeign = investedAmountForeign * changeRatio;
        const finalTl = finalForeign * currentCurrencyRate;
        const profit = finalTl - investedAmount;
        const percentageChange = (profit / investedAmount) * 100;

        const dateFormatted = new Date(dateString).toLocaleDateString(locale, { month: 'long', year: 'numeric' });
        
        const step1 = currency ? formatString(t.templates.step_foreign_1, {
            amount: investedAmount.toLocaleString(locale),
            date: dateString,
            rate: pastCurrencyRate.toLocaleString(locale, { maximumFractionDigits: 2 }),
            currency: currencyName,
            targetAmount: investedAmountForeign.toLocaleString('en-US', { maximumFractionDigits: 2 })
        }) : null;

        const step2 = currency ? formatString(t.templates.step_foreign_2, {
            targetAmount: investedAmountForeign.toLocaleString('en-US', { maximumFractionDigits: 2 }),
            currency: currencyName,
            price: pastPrice.toLocaleString(locale, { maximumFractionDigits: 2 }),
            units: (investedAmountForeign / pastPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        }) : formatString(t.templates.step_simple_2, {
            units: (investedAmountForeign / pastPrice).toLocaleString('en-US', { maximumFractionDigits: 2 }),
            assetName: assetName,
            price: pastPrice.toLocaleString(locale, { maximumFractionDigits: 2 }),
            date: dateString,
            amount: investedAmount.toLocaleString(locale)
        });

        const step3 = formatString(t.templates.step_foreign_3, {
            direction: changeRatio > 1 ? t.templates.direction_up : t.templates.direction_down,
            start: pastPrice.toLocaleString(locale, { maximumFractionDigits: 2 }),
            end: currentPrice.toLocaleString(locale, { maximumFractionDigits: 2 }),
            finalForeign: finalForeign.toLocaleString('en-US', { maximumFractionDigits: 2 }),
            currency: currencyName
        });

        const step4 = currency ? formatString(t.templates.step_foreign_4, {
            currency: currencyName,
            rate: currentCurrencyRate.toLocaleString(locale, { maximumFractionDigits: 2 }),
            finalTl: finalTl.toLocaleString(locale, { maximumFractionDigits: 2 })
        }) : formatString(t.templates.step_simple_3, {
            end: currentPrice.toLocaleString(locale, { maximumFractionDigits: 2 }),
            finalTl: finalTl.toLocaleString(locale, { maximumFractionDigits: 0 })
        });

        resultData = {
          investedAmount,
          currentValue: finalTl,
          profit,
          percentageChange,
          startDate: dateFormatted,
          startPrice: pastPrice,
          endPrice: currentPrice,
          assetName,
          detailSteps: [step1, step2, step3, step4].filter(Boolean)
        };

      } else if (currentConfig?.type === 'SIMPLE_TR') {
        const [pastPrice, currentPrice] = await Promise.all([
          fetchData(investmentType, dateString, false),
          fetchData(investmentType, null, true)
        ]);

        const unitsBought = investedAmount / pastPrice;
        const currentValue = unitsBought * currentPrice;
        const profit = currentValue - investedAmount;
        const percentageChange = (profit / investedAmount) * 100;
        
        const dateFormatted = new Date(dateString).toLocaleDateString(locale, { month: 'long', year: 'numeric' });

        const step1 = formatString(t.templates.step_simple_1, {
            assetName: currentConfig.assetName,
            start: pastPrice.toLocaleString(locale, { maximumFractionDigits: 2 }),
            end: currentPrice.toLocaleString(locale, { maximumFractionDigits: 2 }),
            direction: currentPrice > pastPrice ? t.templates.direction_rose : t.templates.direction_fell
        });
        
        const step2 = formatString(t.templates.step_simple_2, {
            amount: investedAmount.toLocaleString(locale),
            date: dateString,
            units: unitsBought.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            assetName: currentConfig.assetName,
            price: pastPrice.toLocaleString(locale, { maximumFractionDigits: 2 })
        });

        const step3 = formatString(t.templates.step_simple_3, {
            end: currentPrice.toLocaleString(locale, { maximumFractionDigits: 2 }),
            finalTl: currentValue.toLocaleString(locale, { maximumFractionDigits: 0 })
        });

        resultData = {
          investedAmount,
          currentValue,
          profit,
          percentageChange,
          startDate: dateFormatted,
          startPrice: pastPrice,
          endPrice: currentPrice,
          assetName: currentConfig.assetName,
          detailSteps: [step1, step2, step3]
        };
      }

      setResultPast({
        investedAmount: resultData.investedAmount.toLocaleString(locale),
        currentValue: resultData.currentValue.toLocaleString(locale, { maximumFractionDigits: 0 }),
        profit: resultData.profit.toLocaleString(locale, { maximumFractionDigits: 0 }),
        percentageChange: Number(resultData.percentageChange).toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        startDate: resultData.startDate,
        startPrice: resultData.startPrice.toLocaleString(locale, { maximumFractionDigits: 2 }),
        endPrice: resultData.endPrice.toLocaleString(locale, { maximumFractionDigits: 2 }),
        assetName: resultData.assetName,
        detailSteps: resultData.detailSteps,
        profitRaw: resultData.profit,
        percentageChangeRaw: resultData.percentageChange
      });

    } catch (error) {
      console.error('Calculation error', error);
      setResultPast({ error: error.message || t.errors.general });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{t.title}</h1>
          <p className="text-lg text-gray-600 mt-4">
            {t.subtitleLine1}<br/>{t.subtitleLine2}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="w-full">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">{t.form.amount}</label>
                <input type="number" inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue" />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">{t.form.type}</label>
                <Listbox value={investmentType} onChange={setInvestmentType}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-3 pl-4 pr-10 text-left border border-gray-300 focus:outline-none">
                      <span className="block truncate">{getSelectedName()}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"><ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /></span>
                    </Listbox.Button>
                    <Transition as={React.Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 z-10">
                        {investmentOptions.map((option, optionIdx) => (
                            option.isLabel ? (
                                <div key={option.label + optionIdx} className="px-4 py-2 bg-gray-100 text-gray-900 font-bold text-sm">{option.label}</div>
                            ) : (
                                <Listbox.Option key={optionIdx} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-fenerbahce-yellow text-fenerbahce-navy' : 'text-gray-900'}`} value={option.value}>
                                    {({ selected }) => (
                                        <>
                                            <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>{option.name}</span>
                                            {selected ? (<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-fenerbahce-navy"><CheckIcon className="h-5 w-5" aria-hidden="true" /></span>) : null}
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
                  <label className="block text-gray-700 font-bold mb-2">{t.form.month}</label>
                  <div className="relative">
                    <button ref={monthButtonRef} onClick={() => setShowMonthList(s => !s)} className="w-full text-left px-4 py-3 border rounded bg-gray-50">{t.months[selectedMonth - 1]}</button>
                    {showMonthList && (
                      <div ref={monthListRef} className="absolute left-0 right-0 mt-1 bg-white border rounded shadow max-h-40 overflow-auto z-20">
                        {t.months.map((m, idx) => (
                          <button key={m} id={`month-item-${idx + 1}`} onClick={() => { setSelectedMonth(idx + 1); setShowMonthList(false); }} className={`w-full text-left px-4 py-2 hover:bg-gray-200 ${selectedMonth === idx + 1 ? 'bg-gray-700 text-white' : 'bg-white'}`}>{m}</button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">{t.form.year}</label>
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
                <button onClick={handleCalculate} disabled={isLoading} className="w-full bg-fenerbahce-navy text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity duration-300 disabled:bg-gray-400">
                  {isLoading ? t.form.calculating : t.form.calculate}
                </button>
              </div>
            </div>

            <div className="w-full mt-8">
              {resultPast && resultPast.error && (
                <div className="p-4 border rounded bg-red-50 text-red-600">
                  <p className="font-bold">{t.results.error}</p>
                  <p className="text-sm">{resultPast.error}</p>
                </div>
              )}

              {resultPast && !resultPast.error && (
                <div className="p-6 border rounded bg-gray-50">
                  <div className="grid grid-cols-2 gap-4 text-center mb-4">
                    <div>
                      <div className="text-sm text-gray-500">{t.results.investment}</div>
                      <div className="text-lg font-bold text-gray-800">{resultPast.investedAmount} TRY</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">{t.results.currentValue}</div>
                      <div className="text-lg font-bold text-gray-800">{resultPast.currentValue} TRY</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">{t.results.profit}</div>
                      <div className={`text-lg font-bold ${resultPast.profitRaw >= 0 ? 'text-green-600' : 'text-red-600'}`}>{resultPast.profit} TRY</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">{t.results.change}</div>
                      <div className={`text-lg font-bold ${resultPast.percentageChangeRaw >= 0 ? 'text-green-600' : 'text-red-600'}`}>{resultPast.percentageChange}%</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{t.results.detailsTitle}: {resultPast.assetName}</h3>
                    
                    <div className="mb-4 space-y-1">
                        <div className="text-sm">
                            <span className="font-bold text-gray-900">{t.detailsBlock.startDate}: </span>
                            <span className="text-gray-700">{resultPast.startDate}</span>
                        </div>
                        <div className="text-sm">
                            <span className="font-bold text-gray-900">{t.detailsBlock.startPrice}: </span>
                            <span className="text-gray-700">{resultPast.startPrice}</span>
                        </div>
                        <div className="text-sm">
                            <span className="font-bold text-gray-900">{t.detailsBlock.currentPrice}: </span>
                            <span className="text-gray-700">{resultPast.endPrice}</span>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-700 mb-2">{t.results.stepsTitle}</h4>
                        <div className="text-sm text-gray-600 space-y-2">
                            {resultPast.detailSteps && (
                                <ul className="list-disc list-inside space-y-1 text-gray-500">
                                {resultPast.detailSteps.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                                </ul>
                            )}
                            <p className="text-gray-500 text-xs text-left mt-6 italic">
                                <strong>{t.results.disclaimerLabel} </strong>
                                {t.results.disclaimerText}
                            </p>
                        </div>
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