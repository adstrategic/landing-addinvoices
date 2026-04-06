"use client";

import { useState } from "react";
import { ConventionalFooter } from "@/components/conventional-footer";
import Link from "next/link";
import { ChevronRight, Download, Eye, Upload, X } from "lucide-react";
import { motion } from "framer-motion";
import Script from "next/script";
import ConversionModal from "@/components/conversion-modal";
import Watermark from "@/components/watermark";
import { drawWatermark } from "@/lib/utils";

const categoryPills = ["All", "Minimal", "Corporate", "Creative", "Simple"];

const initialTemplates = [
  { id: 1, name: "Clean Minimal", category: "Minimal", color: "#111111" },
  { id: 2, name: "Corporate Blue", category: "Corporate", color: "#2563eb" },
  { id: 3, name: "Bold Header", category: "Creative", color: "#000000" },
  { id: 4, name: "Simple Lines", category: "Simple", color: "#666666" },
  { id: 5, name: "Modern Split", category: "Corporate", color: "#3b82f6" },
  { id: 6, name: "Classic", category: "Minimal", color: "#333333" },
];

export default function InvoiceTemplatePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTemplate, setSelectedTemplate] = useState<
    (typeof initialTemplates)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJSPDFLoaded, setIsJSPDFLoaded] = useState(false);

  // Customization State
  const [businessName, setBusinessName] = useState("");
  const [clientName, setClientName] = useState("");
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [logo, setLogo] = useState<string | null>(null);

  const filteredTemplates =
    selectedCategory === "All"
      ? initialTemplates
      : initialTemplates.filter((t) => t.category === selectedCategory);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const downloadPDF = () => {
    if (!isJSPDFLoaded || !selectedTemplate) return;
    const { jsPDF } = (window as any).jspdf;
    const doc = new jsPDF("p", "mm", "a4");
    drawWatermark(doc);

    // Draw simplified template
    doc.setFillColor(selectedTemplate.color);
    doc.rect(0, 0, 210, 40, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("INVOICE", 195, 25, { align: "right" });

    doc.setTextColor(0, 0, 0);
    if (logo) doc.addImage(logo, "PNG", 15, 10, 20, 20);

    doc.setFontSize(14);
    doc.text(businessName || "Your Business", 15, 55);
    doc.text(`Bill To: ${clientName || "Client"}`, 15, 75);

    doc.setFontSize(20);
    doc.text(`Total: ${amount} ${currency}`, 195, 120, { align: "right" });

    // Attribution (Level 1) handled at start
    doc.save(
      `Invoice_Template_${selectedTemplate.name.replace(/\s+/g, "_")}.pdf`,
    );
  };

  return (
    <div className="min-h-screen w-full relative bg-ad-main font-sans overflow-x-hidden">
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
        onLoad={() => setIsJSPDFLoaded(true)}
      />

      <main className="relative z-10 pt-28 pb-20 px-4 md:px-6 max-w-6xl mx-auto">
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
          <span className="text-white font-medium">Invoice Templates</span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold tracking-wider uppercase mb-3 border border-blue-500/20">
            Free Tool
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Free Invoice Templates
          </h1>
          <p className="text-ad-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            Choose a design, add your details, download as PDF. No account
            needed.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categoryPills.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                selectedCategory === cat
                  ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                  : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredTemplates.map((t) => (
            <div
              key={t.id}
              className={`group bg-[#111111] rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                selectedTemplate?.id === t.id
                  ? "border-blue-500 shadow-2xl"
                  : "border-white/10 hover:border-white/10"
              }`}
              onClick={() => setSelectedTemplate(t)}
            >
              <div className="aspect-[3/4] p-6">
                <div className="w-full h-full bg-white rounded-sm shadow-inner relative overflow-hidden flex flex-col p-4 opacity-90 group-hover:opacity-100 transition-opacity">
                  <div
                    style={{ backgroundColor: t.color }}
                    className="w-full h-[15%] mb-4 rounded-t-sm"
                  />
                  <div className="space-y-2 mb-6">
                    <div className="h-4 bg-gray-100 w-3/4" />
                    <div className="h-3 bg-gray-50 w-1/2" />
                  </div>
                  <div className="flex-1 space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-2 bg-gray-50 rounded" />
                    ))}
                  </div>
                  <div className="h-8 w-1/2 ml-auto bg-gray-100 mt-4 rounded" />
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 flex items-center justify-between">
                <div>
                  <h3
                    className={`font-bold transition-colors ${selectedTemplate?.id === t.id ? "text-blue-500" : "text-white"}`}
                  >
                    {t.name}
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider text-gray-500">
                    {t.category}
                  </span>
                </div>
                <button
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    selectedTemplate?.id === t.id
                      ? "btn-ad-primary"
                      : "bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-white"
                  }`}
                >
                  Use this
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Editor Panel */}
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 scroll-mt-32"
          >
            <div className="lg:col-span-12">
              <div className="p-1 px-4 bg-blue-600/10 border border-blue-500/20 rounded-t-xl inline-block text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                Personalize your template
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#111111] border border-white/10 rounded-2xl rounded-tl-none p-8 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Your Name / Business
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500/50 [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500/50 [color-scheme:dark]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Amount
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) =>
                        setAmount(parseFloat(e.target.value) || 0)
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500/50 [color-scheme:dark]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Currency
                    </label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500/50 appearance-none shadow-xl [color-scheme:dark]"
                    >
                      <option value="USD" className="bg-[#111111]">
                        USD ($)
                      </option>
                      <option value="EUR" className="bg-[#111111]">
                        EUR (€)
                      </option>
                      <option value="GBP" className="bg-[#111111]">
                        GBP (£)
                      </option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Business Logo
                  </label>
                  <div className="flex items-center gap-4">
                    {logo ? (
                      <div className="flex items-center gap-2 p-2 bg-white/5 border border-white/10 rounded-lg grow [color-scheme:dark]">
                        <img
                          src={logo}
                          className="w-8 h-8 rounded bg-white p-1"
                        />
                        <span className="text-xs text-gray-400 grow truncate">
                          Logo ready
                        </span>
                        <button onClick={() => setLogo(null)}>
                          <X className="w-4 h-4 text-gray-500 hover:text-white" />
                        </button>
                      </div>
                    ) : (
                      <label className="grow flex items-center justify-center py-3 bg-white/5 border border-dashed border-white/20 rounded-xl cursor-pointer hover:bg-white/10 transition-colors text-xs text-gray-400 [color-scheme:dark]">
                        <Upload className="w-4 h-4 mr-2" /> Upload Logo
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleLogoUpload}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-4 btn-ad-primary rounded-xl font-bold shadow-lg hover:-translate-y-1 transition-all"
              >
                <Download className="w-5 h-5 mr-3 inline" /> Download PDF
              </button>
            </div>

            {/* Preview Area */}
            <div className="lg:col-span-7 relative">
              <div className="sticky top-28 bg-white aspect-[1/1.414] rounded-sm shadow-2xl overflow-hidden text-gray-800 p-12">
                <Watermark level={1} />
                <div
                  style={{ backgroundColor: selectedTemplate.color }}
                  className="absolute h-1 top-0 left-0 right-0"
                />

                <div className="flex justify-between items-start mb-16">
                  {logo ? (
                    <img src={logo} className="w-20" />
                  ) : (
                    <div className="text-2xl font-black text-gray-200 uppercase">
                      {businessName || "Your Logo"}
                    </div>
                  )}
                  <div className="text-right">
                    <div className="text-4xl font-black uppercase text-gray-100 tracking-tighter mb-4">
                      Invoice
                    </div>
                    <div className="text-gray-400 text-[10px]">
                      {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="mb-20">
                  <div className="text-[10px] font-bold text-blue-600 uppercase mb-4">
                    From:
                  </div>
                  <div className="text-xl font-bold mb-8">
                    {businessName || "Your Business"}
                  </div>

                  <div className="text-[10px] font-bold text-blue-600 uppercase mb-4">
                    To:
                  </div>
                  <div className="text-xl font-bold">
                    {clientName || "Client Name"}
                  </div>
                </div>

                <div className="mt-auto pt-20 border-t-4 border-gray-900 flex justify-between items-end">
                  <div>
                    <div className="text-[8px] uppercase text-gray-400 mb-1">
                      Total Amount Due
                    </div>
                    <div className="text-5xl font-black tracking-tighter">
                      {amount.toLocaleString()}{" "}
                      <span className="text-xl text-gray-300 font-medium">
                        {currency}
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-[10px] text-gray-400 max-w-[150px]">
                    This invoice was generated as a sample via AddInvoices free
                    tools.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Conversion Section */}
        <div className="mt-32 bg-[#111111] rounded-2xl p-10 md:p-16 border border-white/10 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Want full control?
          </h2>
          <p className="text-ad-secondary text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Create invoices with your complete branding, custom line items, and
            automatic payment tracking.
          </p>
          <a
            href="https://app.addinvoicesai.com"
            className="inline-block px-10 py-5 btn-ad-primary rounded-2xl font-bold text-center shadow-lg hover:-translate-y-1 transition-all"
          >
            Start free with AddInvoices →
          </a>
        </div>
      </main>

      <ConversionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDownload={downloadPDF}
        documentType="templates"
      />
      <ConventionalFooter />
    </div>
  );
}
