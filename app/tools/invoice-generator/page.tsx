"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/navbar";
import { ConventionalFooter } from "@/components/conventional-footer";
import Link from "next/link";
import { Plus, Trash2, Download, Link2, Upload, X, ChevronRight, Eye } from "lucide-react";
import Script from "next/script";
import ConversionModal from "@/components/conversion-modal";
import Watermark from "@/components/watermark";
import { drawWatermark } from "@/lib/utils";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

export default function InvoiceGeneratorPage() {
  // --- State ---
  const [logo, setLogo] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState("Your Company");
  const [businessEmail, setBusinessEmail] = useState("hello@yourcompany.com");
  const [businessAddress, setBusinessAddress] = useState("123 Business St, City, State");
  const [businessPhone, setBusinessPhone] = useState("+1 (555) 000-0000");

  const [clientName, setClientName] = useState("Client Name");
  const [clientEmail, setClientEmail] = useState("client@email.com");
  const [clientAddress, setClientAddress] = useState("456 Client Rd, City, State");

  const [invoiceNumber, setInvoiceNumber] = useState("INV-001");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split("T")[0];
  });
  const [currency, setCurrency] = useState("USD");

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", description: "Professional Web Design Services", quantity: 1, price: 2500 }
  ]);

  const [taxPercent, setTaxPercent] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [notes, setNotes] = useState("Thank you for your business!");

  const [isJSPDFLoaded, setIsJSPDFLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // --- Calculations ---
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const taxAmount = (subtotal * taxPercent) / 100;
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = subtotal + taxAmount - discountAmount;

  const currencySymbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    MXN: "$",
    COP: "$"
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // --- Handlers ---
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Logo size must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = () => {
    setItems([...items, { id: Math.random().toString(36).substr(2, 9), description: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const downloadPDF = async () => {
    if (!isJSPDFLoaded) return;
    
    // Validations
    if (!businessName || !clientName) {
        const missing = !businessName ? "Business Name" : "Client Name";
        alert(`Please fill in the ${missing} before downloading.`);
        return;
    }

    const { jsPDF } = (window as any).jspdf;
    const doc = new jsPDF("p", "mm", "a4");
    drawWatermark(doc);
    const accentColor = [37, 99, 235]; // #2563eb

    // PDF Header Strip
    doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.rect(0, 0, 210, 20, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("INVOICE", 195, 14, { align: "right" });

    doc.setTextColor(0, 0, 0);
    let y = 35;

    // Logo
    if (logo) {
      try {
        doc.addImage(logo, "PNG", 15, 30, 30, 30, undefined, "FAST");
        y = 65;
      } catch (e) {
        console.error("Error adding logo to PDF", e);
      }
    }

    // Business Info (Left)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(businessName, 15, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(businessEmail, 15, y + 5);
    doc.text(businessAddress, 15, y + 10);
    doc.text(businessPhone, 15, y + 15);

    // Invoice Details (Right)
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(`Invoice #: ${invoiceNumber}`, 195, y, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${invoiceDate}`, 195, y + 5, { align: "right" });
    doc.text(`Due Date: ${dueDate}`, 195, y + 10, { align: "right" });

    y += 30;

    // Bill To
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("BILL TO:", 15, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(clientName, 15, y + 6);
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(clientEmail, 15, y + 11);
    doc.text(clientAddress, 15, y + 16);

    y += 30;

    // Table Header
    doc.setFillColor(245, 245, 245);
    doc.rect(15, y, 180, 10, "F");
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("Description", 20, y + 7);
    doc.text("Qty", 120, y + 7);
    doc.text("Price", 145, y + 7);
    doc.text("Amount", 175, y + 7);

    y += 10;
    doc.setFont("helvetica", "normal");

    // Table Rows
    items.forEach((item) => {
      doc.text(item.description, 20, y + 7);
      doc.text(item.quantity.toString(), 122, y + 7);
      doc.text(formatCurrency(item.price).replace(currencySymbols[currency], ""), 145, y + 7);
      doc.text(formatCurrency(item.quantity * item.price).replace(currencySymbols[currency], ""), 175, y + 7);
      
      doc.setDrawColor(230, 230, 230);
      doc.line(15, y + 10, 195, y + 10);
      y += 10;
    });

    y += 10;

    // Totals
    const rightColX = 145;
    const valueX = 195;

    doc.text("Subtotal:", rightColX, y);
    doc.text(formatCurrency(subtotal), valueX, y, { align: "right" });
    y += 7;

    if (taxPercent > 0) {
      doc.text(`Tax (${taxPercent}%):`, rightColX, y);
      doc.text(formatCurrency(taxAmount), valueX, y, { align: "right" });
      y += 7;
    }

    if (discountPercent > 0) {
      doc.text(`Discount (${discountPercent}%):`, rightColX, y);
      doc.text(`-${formatCurrency(discountAmount)}`, valueX, y, { align: "right" });
      y += 7;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("TOTAL:", rightColX, y + 5);
    doc.text(formatCurrency(total), valueX, y + 5, { align: "right" });

    y += 25;

    // Notes
    if (notes) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("NOTES:", 15, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      const splitNotes = doc.splitTextToSize(notes, 120);
      doc.text(splitNotes, 15, y + 5);
    }

    // Footer note
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Generated by AddInvoices Free Tools", 105, 285, { align: "center" });

    // Attribution (Level 1) handled at start

    doc.save(`Invoice_${invoiceNumber}_${clientName.replace(/\s+/g, "_")}.pdf`);
  };

  const scrollToPreview = () => {
    previewRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full relative bg-ad-main font-sans">
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" 
        onLoad={() => setIsJSPDFLoaded(true)}
      />
      
      <Navbar />

      <main className="relative z-10 pt-28 pb-48 md:pb-20 px-4 md:px-6 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs md:text-sm text-ad-secondary mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white font-medium">Invoice Generator</span>
        </nav>

        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold tracking-wider uppercase mb-3 border border-blue-500/20">
            Free Tool
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Free Invoice Generator
          </h1>
          <p className="text-ad-secondary text-base md:text-lg max-w-2xl leading-relaxed">
            Create a professional invoice in seconds. No account needed.
          </p>
        </div>

        {/* Main Content: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT COLUMN: FORM (58%) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Your Business */}
            <div className="bg-[#111111] rounded-2xl p-6 md:p-8 border border-white/10 space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-4">Your Business</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Business / Your Name</label>
                  <input 
                    type="text" 
                    value={businessName} 
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Your Name or Company"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Email</label>
                  <input 
                    type="email" 
                    value={businessEmail} 
                    onChange={(e) => setBusinessEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-400">Address</label>
                  <input 
                    type="text" 
                    value={businessAddress} 
                    onChange={(e) => setBusinessAddress(e.target.value)}
                    placeholder="City, State, ZIP"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Phone</label>
                  <input 
                    type="text" 
                    value={businessPhone} 
                    onChange={(e) => setBusinessPhone(e.target.value)}
                    placeholder="+1 (optional)"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                  />
                </div>
                
                {/* Logo Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Upload Logo (optional)</label>
                  <div className="flex items-center gap-4">
                    {!logo ? (
                      <label className="flex items-center justify-center w-full px-4 py-2.5 bg-white/5 border border-dashed border-white/20 rounded-lg cursor-pointer hover:bg-white/10 transition-colors text-sm text-gray-400 [color-scheme:dark]">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload PNG/JPG
                        <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                      </label>
                    ) : (
                      <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-2 w-full [color-scheme:dark]">
                        <img src={logo} alt="Logo" className="w-10 h-10 object-contain bg-white rounded" />
                        <span className="text-xs text-gray-400 truncate flex-1">Logo uploaded</span>
                        <button onClick={() => setLogo(null)} className="p-1 hover:text-red-500 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Bill To */}
            <div className="bg-[#111111] rounded-2xl p-6 md:p-8 border border-white/10 space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-4">Bill To</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Client Name</label>
                  <input 
                    type="text" 
                    value={clientName} 
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Client Name or Company"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Client Email</label>
                  <input 
                    type="email" 
                    value={clientEmail} 
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="client@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-400">Client Address</label>
                  <input 
                    type="text" 
                    value={clientAddress} 
                    onChange={(e) => setClientAddress(e.target.value)}
                    placeholder="City, State (optional)"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                  />
                </div>
              </div>
            </div>

            {/* 3. Invoice Details */}
            <div className="bg-[#111111] rounded-2xl p-6 md:p-8 border border-white/10 space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-4">Invoice Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <label className="text-sm font-medium text-gray-400">Invoice #</label>
                  <input 
                    type="text" 
                    value={invoiceNumber} 
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <label className="text-sm font-medium text-gray-400">Date</label>
                  <input 
                    type="date" 
                    value={invoiceDate} 
                    onChange={(e) => setInvoiceDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <label className="text-sm font-medium text-gray-400">Due Date</label>
                  <input 
                    type="date" 
                    value={dueDate} 
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <label className="text-sm font-medium text-gray-400">Currency</label>
                  <select 
                    value={currency} 
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 [color-scheme:dark]"
                  >
                    <option value="USD" className="bg-[#111111]">USD ($)</option>
                    <option value="EUR" className="bg-[#111111]">EUR (€)</option>
                    <option value="GBP" className="bg-[#111111]">GBP (£)</option>
                    <option value="MXN" className="bg-[#111111]">MXN ($)</option>
                    <option value="COP" className="bg-[#111111]">COP ($)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 4. Items */}
            <div className="bg-[#111111] rounded-2xl p-6 md:p-8 border border-white/10 space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-4">Items</h2>
              
              <div className="hidden md:grid grid-cols-12 gap-4 mb-2 px-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <div className="col-span-6">Description</div>
                <div className="col-span-2">Qty</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-2 text-right">Amount</div>
              </div>
              
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white/[0.02] md:bg-transparent p-4 md:p-0 rounded-xl border border-white/10 md:border-none">
                    <div className="col-span-1 md:col-span-6 flex items-center gap-3">
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-500 hover:text-red-500 transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <input 
                        type="text" 
                        value={item.description}
                        onChange={(e) => updateItem(item.id, "description", e.target.value)}
                        placeholder="Service description"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50 [color-scheme:dark]"
                      />
                    </div>
                    <div className="col-span-1 md:col-span-2 flex items-center gap-2">
                       <span className="md:hidden text-xs text-gray-500">Qty:</span>
                       <input 
                        type="number" 
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, "quantity", parseFloat(e.target.value) || 0)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none [color-scheme:dark]"
                      />
                    </div>
                    <div className="col-span-1 md:col-span-2 flex items-center gap-2">
                       <span className="md:hidden text-xs text-gray-500">Price:</span>
                       <input 
                        type="number" 
                        value={item.price}
                        onChange={(e) => updateItem(item.id, "price", parseFloat(e.target.value) || 0)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none [color-scheme:dark]"
                      />
                    </div>
                    <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end text-sm md:text-base font-medium text-white px-2">
                       <span className="md:hidden text-xs text-gray-500 px-0">Total:</span>
                       {formatCurrency(item.quantity * item.price)}
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={addItem}
                className="flex items-center text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors pl-2"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add item
              </button>
            </div>

            {/* 5. Totals & Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Notes */}
              <div className="bg-[#111111] rounded-2xl p-6 border border-white/10 space-y-4">
                <h2 className="text-xl font-bold text-white border-b border-white/10 pb-4">Notes</h2>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Payment terms, bank details, or a thank you note..."
                  className="w-full h-32 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50 resize-none [color-scheme:dark]"
                />
              </div>
              
              {/* Totals Calculation */}
              <div className="bg-[#111111] rounded-2xl p-6 border border-white/10 space-y-4">
                 <h2 className="text-xl font-bold text-white border-b border-white/10 pb-4">Totals</h2>
                 <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="text-white">{formatCurrency(subtotal)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Tax (%)</span>
                      <div className="flex items-center gap-2 w-20">
                        <input 
                          type="number" 
                          value={taxPercent}
                          onChange={(e) => setTaxPercent(Math.min(99, Math.max(0, parseFloat(e.target.value) || 0)))}
                          className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-right focus:outline-none [color-scheme:dark]"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Discount (%)</span>
                      <div className="flex items-center gap-2 w-20">
                        <input 
                          type="number" 
                          value={discountPercent}
                          onChange={(e) => setDiscountPercent(Math.min(99, Math.max(0, parseFloat(e.target.value) || 0)))}
                          className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-right focus:outline-none [color-scheme:dark]"
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-white/10 flex justify-between items-center group">
                      <span className="text-lg font-bold text-white">TOTAL</span>
                      <span className="text-2xl font-bold text-blue-400">{formatCurrency(total)}</span>
                    </div>
                 </div>
              </div>
            </div>

            {/* Mobile Actions (Sticky Bottom) */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#0a0a0a]/80 backdrop-blur-xl border-t border-white/10 z-[100] flex lg:hidden gap-3 px-6 pb-8 md:pb-6 shadow-2xl animate-in fade-in slide-in-from-bottom duration-500">
               <button 
                  onClick={scrollToPreview}
                  className="flex-1 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold flex items-center justify-center transition-all text-xs active:scale-95 [color-scheme:dark]"
               >
                 <Eye className="w-4 h-4 mr-2 text-blue-400" />
                 Preview
               </button>
               <button 
                  onClick={() => setIsModalOpen(true)}
                  disabled={!isJSPDFLoaded}
                  className="flex-1 py-3.5 btn-ad-primary rounded-xl font-bold flex items-center justify-center shadow-lg transition-all disabled:opacity-50 text-xs active:scale-95"
               >
                 <Download className="w-4 h-4 mr-2" />
                 Download
               </button>
            </div>
          </div>

          {/* RIGHT COLUMN: PREVIEW (42%) */}
          <div className="lg:col-span-5 relative" ref={previewRef}>
            <div className="sticky top-28 space-y-6">
              
              <div className="flex items-center justify-between mb-2">
                 <h3 className="text-white font-bold flex items-center">
                    <Eye className="w-4 h-4 mr-2 text-blue-400" />
                    Live Preview
                 </h3>
                 <div className="hidden lg:flex items-center gap-3">
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      disabled={!isJSPDFLoaded}
                      className="px-4 py-2 btn-ad-primary rounded-lg text-xs font-bold flex items-center transition-all shadow-md active:translate-y-0.5 disabled:opacity-50"
                    >
                      <Download className="w-3.5 h-3.5 mr-2" />
                      Download PDF
                    </button>
                    <button 
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-bold flex items-center border border-white/10 opacity-50 cursor-not-allowed [color-scheme:dark]"
                      title="Coming soon"
                    >
                      <Link2 className="w-3.5 h-3.5 mr-2" />
                      Copy Link
                    </button>
                 </div>
              </div>

              {/* PDF Preview Container */}
              <div className="relative aspect-[1/1.414] bg-white rounded-md shadow-2xl overflow-hidden shadow-blue-950/20">
                <Watermark level={1} />
                {/* PDF Header Strip */}
                <div className="absolute top-0 left-0 w-full h-[6%] bg-blue-600 flex items-center justify-end px-6">
                  <span className="text-white font-bold text-lg tracking-widest uppercase">Invoice</span>
                </div>

                <div className="p-8 pt-16 flex flex-col h-full text-[10px] leading-tight text-gray-800">
                  
                  {/* Watermark removed */}

                  <div className="flex justify-between items-start mb-10">
                    <div className="space-y-4">
                       {logo ? (
                         <img src={logo} alt="Business Logo" className="w-16 h-16 object-contain bg-gray-50 rounded p-1 mb-2" />
                       ) : (
                         <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center mb-2 border border-dashed border-gray-300">
                            <span className="text-[8px] text-gray-400">LOGO</span>
                         </div>
                       )}
                       <div>
                         <div className="text-sm font-bold text-black uppercase">{businessName || "Your Company"}</div>
                         <div className="text-gray-500">{businessEmail}</div>
                         <div className="text-gray-500 max-w-[150px]">{businessAddress}</div>
                         <div className="text-gray-500">{businessPhone}</div>
                       </div>
                    </div>
                    
                    <div className="text-right space-y-1 mt-2">
                       <div className="text-sm font-bold text-black">#{invoiceNumber || "INV-001"}</div>
                       <div className="flex justify-end gap-2 px-1">
                         <span className="text-gray-400">Date:</span>
                         <span className="text-gray-600">{invoiceDate}</span>
                       </div>
                       <div className="flex justify-end gap-2 px-1">
                         <span className="text-gray-400">Due:</span>
                         <span className="text-gray-600">{dueDate}</span>
                       </div>
                    </div>
                  </div>

                  <div className="mb-10">
                    <div className="text-[9px] font-bold text-blue-600 uppercase tracking-wider mb-2">Bill To:</div>
                    <div className="text-sm font-bold text-black">{clientName || "Client Name"}</div>
                    <div className="text-gray-500">{clientEmail}</div>
                    <div className="text-gray-500 max-w-[150px]">{clientAddress}</div>
                  </div>

                  {/* Preview Table */}
                  <div className="flex-1">
                    <div className="grid grid-cols-12 gap-2 border-b-2 border-gray-800 pb-2 mb-2 font-bold text-black uppercase tracking-tighter">
                      <div className="col-span-6">Description</div>
                      <div className="col-span-2 text-center">Qty</div>
                      <div className="col-span-2 text-right">Price</div>
                      <div className="col-span-2 text-right">Total</div>
                    </div>
                    
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="grid grid-cols-12 gap-2 border-b border-gray-100 pb-2">
                          <div className="col-span-6 text-black font-medium">{item.description || "Service item"}</div>
                          <div className="col-span-2 text-center">{item.quantity}</div>
                          <div className="col-span-2 text-right">{formatCurrency(item.price).replace(currencySymbols[currency], "")}</div>
                          <div className="col-span-2 text-right font-medium text-black">{formatCurrency(item.quantity * item.price).replace(currencySymbols[currency], "")}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Totals Section */}
                  <div className="mt-8 flex justify-end">
                    <div className="w-1/2 space-y-2 border-t-2 border-gray-800 pt-4">
                       <div className="flex justify-between items-center px-1">
                         <span className="text-gray-500 font-medium">Subtotal</span>
                         <span className="text-black font-medium">{formatCurrency(subtotal)}</span>
                       </div>
                       {taxPercent > 0 && (
                         <div className="flex justify-between items-center px-1">
                           <span className="text-gray-500">Tax ({taxPercent}%)</span>
                           <span className="text-black">{formatCurrency(taxAmount)}</span>
                         </div>
                       )}
                       {discountPercent > 0 && (
                         <div className="flex justify-between items-center px-1">
                           <span className="text-gray-500">Discount ({discountPercent}%)</span>
                           <span className="text-red-600">-{formatCurrency(discountAmount)}</span>
                         </div>
                       )}
                       <div className="flex justify-between items-center bg-gray-50 p-2 rounded mt-2">
                         <span className="text-xs font-bold text-black uppercase">Total</span>
                         <span className="text-lg font-black text-blue-600">{formatCurrency(total)}</span>
                       </div>
                       <div className="text-[8px] text-right text-gray-400 mt-1 uppercase italic font-medium">
                          Currency: {currency}
                       </div>
                    </div>
                  </div>

                  <div className="mt-10 border-t border-gray-100 pt-6">
                    <div className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-2">Notes:</div>
                    <p className="text-gray-600 italic whitespace-pre-wrap">{notes}</p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Conversion Section */}
        <div className="mt-20 md:mt-32">
          <div className="bg-[#111111] rounded-2xl p-10 md:p-16 border border-white/10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <span className="text-blue-400">✦</span>
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                You just created a free invoice.
              </h2>
              <p className="text-ad-secondary text-base md:text-lg mb-10 max-w-2xl mx-auto">
                With AddInvoices you can save your clients, track payments, send reminders automatically and manage everything with your voice.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://app.addinvoicesai.com"
                  className="w-full sm:w-auto px-8 py-4 btn-ad-primary rounded-xl font-bold text-center shadow-lg hover:-translate-y-1 transition-all"
                >
                  Get started free →
                </a>
                <Link
                  href="/#features"
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white hover:bg-white/10 border border-white/10 rounded-xl font-bold text-center transition-all [color-scheme:dark]"
                >
                  See all features
                </Link>
              </div>
            </div>
          </div>
        </div>

      </main>

      <ConversionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDownload={downloadPDF}
        documentType="invoices"
      />

      <ConventionalFooter />
    </div>
  );
}
