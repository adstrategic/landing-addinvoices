"use client";

import { useState, useEffect, useRef } from "react";
import { ConventionalFooter } from "@/components/conventional-footer";
import Link from "next/link";
import {
  Plus,
  Trash2,
  Download,
  Link2,
  Upload,
  X,
  ChevronRight,
  Eye,
  CheckCircle2,
} from "lucide-react";
import Script from "next/script";
import ConversionModal from "@/components/conversion-modal";
import Watermark from "@/components/watermark";
import { drawWatermark } from "@/lib/utils";

interface ReceiptItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

export default function ReceiptGeneratorPage() {
  const [logo, setLogo] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState("Your Company");
  const [businessEmail, setBusinessEmail] = useState("hello@yourcompany.com");
  const [businessAddress, setBusinessAddress] = useState(
    "123 Business St, City, State",
  );
  const [businessPhone, setBusinessPhone] = useState("+1 (555) 000-0000");

  const [clientName, setClientName] = useState("Client Name");
  const [clientEmail, setClientEmail] = useState("client@email.com");

  const [receiptNumber, setReceiptNumber] = useState("REC-001");
  const [dateReceived, setDateReceived] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [currency, setCurrency] = useState("USD");

  const [items, setItems] = useState<ReceiptItem[]>([
    {
      id: "1",
      description: "Product or Service Payment",
      quantity: 1,
      price: 500,
    },
  ]);

  const [taxPercent, setTaxPercent] = useState(0);
  const [notes, setNotes] = useState("Thank you for your business!");

  const [isJSPDFLoaded, setIsJSPDFLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );
  const taxAmount = (subtotal * taxPercent) / 100;
  const total = subtotal + taxAmount;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Math.random().toString(36).substr(2, 9),
        description: "",
        quantity: 1,
        price: 0,
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (
    id: string,
    field: keyof ReceiptItem,
    value: string | number,
  ) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const downloadPDF = async () => {
    if (!isJSPDFLoaded) return;
    const { jsPDF } = (window as any).jspdf;
    const doc = new jsPDF("p", "mm", "a4");
    drawWatermark(doc);

    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, 210, 25, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("PAYMENT RECEIPT", 195, 17, { align: "right" });

    doc.setTextColor(0, 0, 0);
    let y = 40;

    if (logo) {
      doc.addImage(logo, "PNG", 15, 30, 25, 25);
      y = 65;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(businessName, 15, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(businessEmail, 15, y + 5);
    doc.text(businessAddress, 15, y + 10);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(`Receipt #: ${receiptNumber}`, 195, y, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${dateReceived}`, 195, y + 5, { align: "right" });
    doc.text(`Method: ${paymentMethod}`, 195, y + 10, { align: "right" });

    y += 25;
    doc.setFont("helvetica", "bold");
    doc.text("RECEIVED FROM:", 15, y);
    doc.setFont("helvetica", "normal");
    doc.text(clientName, 15, y + 5);
    doc.text(clientEmail, 15, y + 10);

    y += 25;
    doc.setFillColor(245, 245, 245);
    doc.rect(15, y, 180, 10, "F");
    doc.setFont("helvetica", "bold");
    doc.text("Description", 20, y + 7);
    doc.text("Amount", 185, y + 7, { align: "right" });

    y += 10;
    doc.setFont("helvetica", "normal");
    items.forEach((item) => {
      doc.text(item.description, 20, y + 7);
      doc.text(
        `${(item.quantity * item.price).toLocaleString()} ${currency}`,
        185,
        y + 7,
        { align: "right" },
      );
      y += 10;
    });

    y += 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(`TOTAL PAID: ${total.toLocaleString()} ${currency}`, 195, y, {
      align: "right",
    });

    // Attribution (Level 1) handled at start
    doc.save(`Receipt_${receiptNumber}_${clientName.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div className="min-h-screen w-full relative bg-ad-main font-sans">
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
        onLoad={() => setIsJSPDFLoaded(true)}
      />

      <main className="relative z-10 pt-28 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs md:text-sm text-ad-secondary mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/tools" className="hover:text-white transition-colors">
            Tools
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white font-medium">Receipt Generator</span>
        </nav>

        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold tracking-wider uppercase mb-3 border border-blue-500/20">
            Free Tool
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Free Receipt Generator
          </h1>
          <p className="text-ad-secondary text-lg max-w-2xl">
            Create professional payment receipts in seconds. No account needed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form Left */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-[#111111] rounded-2xl p-8 border border-white/10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 md:col-span-2">
                  <h3 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest border-b border-white/10 pb-2">
                    Business Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      placeholder="Business Name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 outline-none [color-scheme:dark]"
                    />
                    <input
                      placeholder="Business Email"
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 outline-none [color-scheme:dark]"
                    />
                    <div className="md:col-span-2">
                      <label className="flex items-center gap-4 cursor-pointer py-3 bg-white/5 border border-dashed border-white/20 rounded-xl justify-center text-xs text-gray-500 hover:bg-white/10 transition-all [color-scheme:dark]">
                        <Upload className="w-4 h-4" />{" "}
                        {logo ? "Logo Uploaded" : "Upload Logo (PNG/JPG)"}
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleLogoUpload}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 md:col-span-2">
                  <h3 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest border-b border-white/10 pb-2">
                    Client Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      placeholder="Client Name"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 outline-none [color-scheme:dark]"
                    />
                    <input
                      placeholder="Client Email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 outline-none [color-scheme:dark]"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest border-b border-white/10 pb-2">
                    Receipt Info
                  </h3>
                  <div className="space-y-4">
                    <input
                      placeholder="Receipt #"
                      value={receiptNumber}
                      onChange={(e) => setReceiptNumber(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 outline-none [color-scheme:dark]"
                    />
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 outline-none appearance-none shadow-xl [color-scheme:dark]"
                    >
                      <option className="bg-[#111111]">Cash</option>
                      <option className="bg-[#111111]">Credit Card</option>
                      <option className="bg-[#111111]">Bank Transfer</option>
                      <option className="bg-[#111111]">PayPal</option>
                      <option className="bg-[#111111]">Stripe</option>
                      <option className="bg-[#111111]">Check</option>
                      <option className="bg-[#111111]">Other</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest border-b border-white/10 pb-2">
                    Date Received
                  </h3>
                  <input
                    type="date"
                    value={dateReceived}
                    onChange={(e) => setDateReceived(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 outline-none [color-scheme:dark]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#111111] rounded-2xl p-8 border border-white/10 space-y-6">
              <h3 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest border-b border-white/10 pb-2">
                Items Received For
              </h3>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <input
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(item.id, "description", e.target.value)
                      }
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm [color-scheme:dark]"
                    />
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          "price",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      className="w-32 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm [color-scheme:dark]"
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-3 text-gray-500 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addItem}
                  className="text-xs font-bold text-blue-400 flex items-center gap-2 px-2 hover:text-blue-300 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Line Item
                </button>
              </div>
            </div>
          </div>

          {/* Preview Right */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="bg-white rounded-md shadow-2xl relative overflow-hidden aspect-[1/1.414] p-10 text-gray-800">
              <Watermark level={1} />
              <div className="absolute top-0 left-0 w-full h-[6%] bg-blue-600 flex items-center justify-end px-6">
                <span className="text-white font-bold text-sm tracking-widest uppercase italic">
                  Payment Receipt
                </span>
              </div>

              <div className="pt-10 flex flex-col h-full text-[10px]">
                <div className="flex justify-between mb-16 px-1">
                  <div>
                    {logo ? (
                      <img
                        src={logo}
                        className="w-16 h-16 object-contain mb-4"
                      />
                    ) : (
                      <div className="text-xl font-black italic text-blue-600 mb-4 px-1">
                        ADINVOICES
                      </div>
                    )}
                    <div className="font-bold text-black uppercase">
                      {businessName}
                    </div>
                    <div className="text-gray-400">{businessEmail}</div>
                  </div>
                  <div className="text-right pt-2 space-y-1">
                    <div className="font-bold text-black text-lg">
                      #{receiptNumber}
                    </div>
                    <div className="font-bold">
                      Total: {total.toLocaleString()} {currency}
                    </div>
                    <div className="text-gray-400 uppercase italic">
                      Date: {dateReceived}
                    </div>
                  </div>
                </div>

                <div className="mb-12 border-l-2 p-2 px-4 bg-gray-50 border-blue-500">
                  <div className="text-[8px] font-bold text-blue-600 uppercase mb-2">
                    Received From:
                  </div>
                  <div className="text-lg font-black uppercase text-black">
                    {clientName}
                  </div>
                  <div className="text-gray-400">{clientEmail}</div>
                </div>

                <div className="flex-1">
                  <div className="grid grid-cols-12 gap-2 border-b-2 border-gray-900 pb-2 mb-4 font-bold text-black uppercase">
                    <div className="col-span-8">Description</div>
                    <div className="col-span-4 text-right">Amount Paid</div>
                  </div>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 gap-2 border-b border-gray-100 pb-3 mb-3"
                    >
                      <div className="col-span-8 font-medium text-gray-700">
                        {item.description}
                      </div>
                      <div className="col-span-4 text-right font-bold text-black">
                        {(item.quantity * item.price).toLocaleString()}{" "}
                        {currency}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-between items-end border-t-4 border-gray-900 pt-6">
                  <div className="space-y-1">
                    <div className="text-[8px] font-bold text-gray-400 uppercase">
                      Paid via {paymentMethod}
                    </div>
                    <div className="text-[10px] text-gray-600 italic">
                      "{notes}"
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black text-black uppercase">
                      Paid in Full
                    </div>
                    <div className="text-[10px] font-bold text-blue-600">
                      {total.toLocaleString()} {currency}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-5 btn-ad-primary rounded-2xl font-black shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
            >
              <Download className="w-5 h-5" /> Download Receipt PDF
            </button>
          </div>
        </div>

        {/* FAQ Section (SEO) */}
        <div className="mt-40 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">
              Invoice vs. Receipt: What's the difference?
            </h4>
            <p className="text-sm text-ad-secondary leading-relaxed">
              An invoice is a document you send before payment is made,
              requesting funds for services provided. A receipt is the official
              confirmation sent after payment has occurred, serving as proof of
              transaction for both parties.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">
              Why send payment receipts?
            </h4>
            <p className="text-sm text-ad-secondary leading-relaxed">
              Receipts build trust and professional credibility. They provide
              your clients with the necessary documentation for their own
              expense tracking and tax deductions, while finalizing the billing
              cycle on your end.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 bg-[#111111] rounded-2xl p-10 md:p-16 border border-white/10 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Create receipts, invoices, and contracts — all in one place.
          </h2>
          <p className="text-ad-secondary text-lg mb-10 max-w-2xl mx-auto">
            With AddInvoices, every payment you receive is tracked
            automatically. Stop manual work and start billing with your voice.
          </p>
          <a
            href="https://app.addinvoicesai.com"
            className="inline-block px-10 py-5 btn-ad-primary rounded-2xl font-bold shadow-lg hover:-translate-y-1 transition-all"
          >
            Get started free →
          </a>
        </div>
      </main>

      <ConversionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDownload={downloadPDF}
        documentType="receipts"
      />
      <ConventionalFooter />
    </div>
  );
}
