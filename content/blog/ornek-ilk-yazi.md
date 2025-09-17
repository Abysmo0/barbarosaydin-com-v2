---
title: "Konut Fiyat Endeksi Metodolojisi"
excerpt: "FRED üzerinden çekilen Real Residential Property Prices verisinin site içinde nasıl aylığa dönüştürüldüğü."
date: 2025-06-15
updatedAt: 2025-06-30
tags: ["konut", "endeks", "metodoloji"]
---

Bu yazıda BIS kaynaklı Real Residential Property Prices (FRED) serilerinin çeyrekten aya projeksiyon metodolojisini açıklıyoruz.

## Adımlar

1. Çeyreklik değer aynı çeyreğin 3 ayına eşit atanır.
2. Henüz açıklanmamış çeyrek için bir önceki son açıklanan çeyrek geri dönük kullanılır.
3. Ay bazlı taleplerde ilgili ay *içindeki en güncel* veri döndürülür.

Bu yaklaşım, analizlerde tutarlılık sağlar ve ileriye yönelik öngörüsel (forecast) veri eklenmez.
