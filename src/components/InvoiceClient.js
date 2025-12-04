"use client";
import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

export default function InvoiceClient() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [activeTab, setActiveTab] = useState("milleon"); 

  // --- BANKA VE ADRES BİLGİLERİ ---
  const companies = {
    milleon: {
      name: "MILLEON LTD",
      title: "",
      address: [
        "Unit 501, Leroy House", 
        "434-436 Essex Road, London, N1 3QP", 
        "United Kingdom"
      ],
      email: "contact@barbarosaydin.com",
      bank: { 
        name: "MONZO BANK", // GÜNCELLENDİ
        sort: "04-00-05", 
        account: "60832094", 
        iban: "GB20MONZ04000560832094", 
        swift: "MONZGB2L" 
      }
    },
    personal: {
      name: "BARBAROS AYDIN",
      title: "Strategy, Investment, and Development Advisory",
      address: [
        "10 Kingsmead Court, Norman Road",
        "Winchester, Hampshire, SO23 9PL", 
        "United Kingdom"
      ],
      email: "contact@barbarosaydin.com",
      bank: { 
        name: "HSBC UK", // GÜNCELLENDİ
        sort: "40-12-98", 
        account: "12028255", 
        iban: "GB55HBUK40129812028255", 
        swift: "HBUKGB4197B" 
      }
    }
  };

  // --- FORM VARSAYILANLARI ---
  const currentYear = new Date().getFullYear();
  
  const [invoiceDetails, setInvoiceDetails] = useState({
    no: `INV-${currentYear}-001`,
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: "",
    clientName: "",
    clientAddress: "",
    currency: "GBP", 
  });

  // GÜNCELLENDİ: Description varsayılan olarak boş
  const [items, setItems] = useState([
    { description: "", quantity: 1, price: 0, vatRate: 0 }
  ]);

  // --- LOGIN ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === "1907") setIsAuthenticated(true);
    else alert("Hatalı PIN Kodu");
  };

  // --- HANDLERS ---
  const handleDetailChange = (e) => {
    setInvoiceDetails({ ...invoiceDetails, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, e) => {
    const newItems = [...items];
    newItems[index][e.target.name] = e.target.value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0, vatRate: 0 }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  // --- TÜRKÇE KARAKTER DÖNÜŞTÜRÜCÜ ---
  // PDF oluştururken bu fonksiyonu kullanacağız
  const normalizeText = (text) => {
    if (!text) return "";
    return text
        .replace(/Ğ/g, "G").replace(/ğ/g, "g")
        .replace(/Ü/g, "U").replace(/ü/g, "u")
        .replace(/Ş/g, "S").replace(/ş/g, "s")
        .replace(/İ/g, "I").replace(/ı/g, "i")
        .replace(/Ö/g, "O").replace(/ö/g, "o")
        .replace(/Ç/g, "C").replace(/ç/g, "c")
        .trim(); // Baştaki ve sondaki boşlukları da temizler (Hizalama için önemli)
  };

  // --- PDF GENERATOR ---
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const sender = companies[activeTab];
    
    const navy = "#102252"; 
    const black = "#000000";
    const gray = "#555555";
    
    // 1. HEADER (Sol: INVOICE, Sağ: GÖNDEREN)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor(black);
    doc.text("INVOICE", 20, 25);

    // Sağ Taraf (Gönderen)
    let topY = 25;
    
    doc.setFontSize(16);
    doc.setTextColor(navy);
    doc.setFont("helvetica", "bold");
    doc.text(sender.name, pageWidth - 20, topY, { align: "right" });
    topY += 6;

    if(sender.title) {
        doc.setFontSize(9); 
        doc.setTextColor(black); 
        doc.setFont("helvetica", "bold");
        doc.text(sender.title, pageWidth - 20, topY, { align: "right" });
        topY += 8;
    } else {
        topY += 2;
    }
    
    doc.setFontSize(10);
    doc.setTextColor(gray);
    doc.setFont("helvetica", "normal");
    
    sender.address.forEach(line => {
        doc.text(line, pageWidth - 20, topY, { align: "right" });
        topY += 5;
    });

    // 2. ANA BÖLÜM (BILL TO ve FATURA DETAYLARI)
    const contentStartY = Math.max(topY + 15, 80); 

    // SOL TARAFA (BILL TO) - HİZALAMA DÜZELTİLDİ
    doc.setFontSize(10);
    doc.setTextColor(gray);
    doc.setFont("helvetica", "bold");
    doc.text("BILL TO:", 20, contentStartY);
    
    doc.setTextColor(black);
    doc.setFont("helvetica", "bold");
    // normalizeText kullanıyoruz
    doc.text(normalizeText(invoiceDetails.clientName), 20, contentStartY + 6);
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(gray);
    // Adres için önce normalize et, sonra satırlara böl
    const normalizedAddress = normalizeText(invoiceDetails.clientAddress);
    const splitAddress = doc.splitTextToSize(normalizedAddress, 80);
    doc.text(splitAddress, 20, contentStartY + 11);

    // SAĞ TARAFA (FATURA DETAYLARI)
    let detailY = contentStartY;
    
    const printDetailRight = (label, value) => {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(navy);
        doc.text(label, pageWidth - 65, detailY, { align: "left" }); 
        
        doc.setFont("helvetica", "normal");
        doc.setTextColor(black);
        doc.text(normalizeText(value), pageWidth - 20, detailY, { align: "right" });
        detailY += 6;
    };

    printDetailRight("Invoice No:", invoiceDetails.no);
    printDetailRight("Issue Date:", invoiceDetails.issueDate);
    if(invoiceDetails.dueDate) {
        printDetailRight("Due Date:", invoiceDetails.dueDate);
    }

    // 3. TABLO
    let tableY = Math.max(detailY, contentStartY + 30) + 15;
    
    // Tablo Başlığı
    doc.setFillColor(245, 245, 245); 
    doc.rect(20, tableY, pageWidth - 40, 10, 'F');
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(black);
    
    doc.text("DESCRIPTION", 25, tableY + 7);
    doc.text("QTY", 125, tableY + 7, { align: "right" });
    doc.text(`PRICE`, 150, tableY + 7, { align: "right" });
    doc.text(`VAT`, 170, tableY + 7, { align: "right" });
    doc.text(`AMOUNT`, pageWidth - 25, tableY + 7, { align: "right" });

    tableY += 10;

    // Tablo Satırları
    doc.setFont("helvetica", "normal");
    doc.setTextColor(black);
    
    let subtotal = 0;
    let totalVat = 0;

    items.forEach((item) => {
        const qty = parseFloat(item.quantity) || 0;
        const prc = parseFloat(item.price) || 0;
        const vat = parseFloat(item.vatRate) || 0;

        const lineTotal = qty * prc;
        const lineVat = lineTotal * (vat / 100);
        
        subtotal += lineTotal;
        totalVat += lineVat;

        // Açıklama: Türkçe Karakter Temizliği + Satır Bölme
        const cleanDesc = normalizeText(item.description);
        const descLines = doc.splitTextToSize(cleanDesc, 90);
        const lineCount = descLines.length;
        const rowHeight = (lineCount * 5) + 10;

        if (tableY + rowHeight > pageHeight - 40) {
            doc.addPage();
            tableY = 20; 
        }

        doc.text(descLines, 25, tableY + 5);
        doc.text(String(qty), 125, tableY + 5, { align: "right" });
        doc.text(prc.toFixed(2), 150, tableY + 5, { align: "right" });
        doc.text(`${vat}%`, 170, tableY + 5, { align: "right" });
        doc.text(lineTotal.toFixed(2), pageWidth - 25, tableY + 5, { align: "right" });

        doc.setDrawColor(230, 230, 230);
        doc.line(20, tableY + rowHeight - 2, pageWidth - 20, tableY + rowHeight - 2);

        tableY += rowHeight;
    });

    // 4. TOPLAMLAR
    const grandTotal = subtotal + totalVat;
    const symbol = invoiceDetails.currency;

    const totalY = tableY + 5;
    
    // Subtotal
    doc.text(`Subtotal:`, 160, totalY, { align: "right" });
    doc.text(`${subtotal.toFixed(2)} ${symbol}`, pageWidth - 25, totalY, { align: "right" });

    // VAT
    let finalY = totalY;
    if (totalVat > 0) {
        finalY += 7;
        doc.text(`Total VAT:`, 160, finalY, { align: "right" });
        doc.text(`${totalVat.toFixed(2)} ${symbol}`, pageWidth - 25, finalY, { align: "right" });
    }

    // Total Due
    finalY += 10;
    doc.setFillColor(black); 
    doc.rect(110, finalY - 6, pageWidth - 130, 12, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(`TOTAL DUE (${symbol})`, 115, finalY + 1.5);
    doc.text(`${grandTotal.toFixed(2)}`, pageWidth - 25, finalY + 1.5, { align: "right" });

    // 5. BANKA BİLGİLERİ (EN ALT)
    const bottomY = 250;
    
    doc.setDrawColor(200, 200, 200);
    doc.line(20, bottomY - 5, pageWidth - 20, bottomY - 5);

    doc.setTextColor(black);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(sender.name, 20, bottomY + 5);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(gray);
    
    let bankY = bottomY + 10;
    // Banka ismi eklendi
    doc.text(`Bank: ${sender.bank.name}`, 20, bankY);
    bankY += 5;
    doc.text(`Sort Code: ${sender.bank.sort}`, 20, bankY);
    bankY += 5;
    doc.text(`Account No: ${sender.bank.account}`, 20, bankY);
    bankY += 5;
    doc.text(`IBAN: ${sender.bank.iban}`, 20, bankY);
    bankY += 5;
    if(sender.bank.swift) {
        doc.text(`SWIFT/BIC: ${sender.bank.swift}`, 20, bankY);
    }
    
    // Email (Sağ Alt)
    doc.text(sender.email, pageWidth - 20, bottomY + 5, { align: "right" });

    doc.save(`Invoice-${invoiceDetails.no}.pdf`);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Yönetim Paneli</h2>
          <form onSubmit={handleLogin}>
            <input type="password" placeholder="PIN" className="w-full px-4 py-2 border rounded mb-4" value={pin} onChange={(e) => setPin(e.target.value)} />
            <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded">Giriş</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Fatura Oluşturucu</h1>
            <button onClick={() => setIsAuthenticated(false)} className="text-red-600 underline">Çıkış</button>
        </div>

        <div className="flex space-x-4 mb-6">
            <button onClick={() => setActiveTab('milleon')} className={`px-6 py-3 rounded-lg font-bold ${activeTab === 'milleon' ? 'bg-blue-900 text-white' : 'bg-white border'}`}>Milleon Ltd (UK)</button>
            <button onClick={() => setActiveTab('personal')} className={`px-6 py-3 rounded-lg font-bold ${activeTab === 'personal' ? 'bg-blue-900 text-white' : 'bg-white border'}`}>Barbaros Aydın (TR)</button>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
            {/* ÜST BİLGİLER */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                    <h3 className="font-bold text-gray-700 border-b pb-2">Müşteri (Bill To)</h3>
                    <input name="clientName" value={invoiceDetails.clientName} onChange={handleDetailChange} className="w-full border p-2 rounded" placeholder="Müşteri Adı / Şirket" />
                    <textarea name="clientAddress" value={invoiceDetails.clientAddress} onChange={handleDetailChange} className="w-full border p-2 rounded h-24" placeholder="Müşteri Adresi..." />
                </div>
                <div className="space-y-4">
                    <h3 className="font-bold text-gray-700 border-b pb-2">Fatura Detayları</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-gray-500">No (Auto Year)</label>
                            <input name="no" value={invoiceDetails.no} onChange={handleDetailChange} className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500">Issue Date</label>
                            <input type="date" name="issueDate" value={invoiceDetails.issueDate} onChange={handleDetailChange} className="w-full border p-2 rounded" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-gray-500">Currency</label>
                            <select name="currency" value={invoiceDetails.currency} onChange={handleDetailChange} className="w-full border p-2 rounded">
                                <option value="GBP">GBP (£)</option>
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="TRY">TRY (₺)</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs text-gray-500">Due Date (Optional)</label>
                            <input type="date" name="dueDate" value={invoiceDetails.dueDate} onChange={handleDetailChange} className="w-full border p-2 rounded" />
                        </div>
                    </div>
                </div>
            </div>

            {/* KALEMLER */}
            <div className="mb-8">
                <h3 className="font-bold text-gray-700 border-b pb-2 mb-4">Hizmetler / Kalemler</h3>
                {items.map((item, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-4 mb-4 items-end bg-gray-50 p-4 rounded shadow-sm">
                        <div className="flex-grow">
                            <label className="text-xs text-gray-500">Açıklama</label>
                            <input name="description" value={item.description} onChange={(e) => handleItemChange(index, e)} className="w-full border p-2 rounded" placeholder="Hizmet detayları..." />
                        </div>
                        <div className="w-20">
                            <label className="text-xs text-gray-500">Miktar</label>
                            <input type="number" name="quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} className="w-full border p-2 rounded" />
                        </div>
                        <div className="w-32">
                            <label className="text-xs text-gray-500">Birim Fiyat</label>
                            <input type="number" name="price" value={item.price} onChange={(e) => handleItemChange(index, e)} className="w-full border p-2 rounded" />
                        </div>
                        <div className="w-20">
                            <label className="text-xs text-gray-500">VAT %</label>
                            <input type="number" name="vatRate" value={item.vatRate} onChange={(e) => handleItemChange(index, e)} className="w-full border p-2 rounded" placeholder="0" />
                        </div>
                        <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700 font-bold px-2 py-2">Sil</button>
                    </div>
                ))}
                <button onClick={addItem} className="text-blue-600 font-bold hover:underline">+ Yeni Kalem Ekle</button>
            </div>

            <div className="border-t pt-6 flex justify-end">
                <button onClick={generatePDF} className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 shadow-md flex items-center">
                    PDF İndir
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}