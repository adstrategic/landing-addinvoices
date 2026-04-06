"use client";

import { useState } from "react";
import { ConventionalFooter } from "@/components/conventional-footer";
import Link from "next/link";
import {
  ChevronRight,
  Hash,
  Copy,
  Download,
  Info,
  Check,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InvoiceNumberGeneratorPage() {
  const [prefix, setPrefix] = useState("INV-");
  const [includeYear, setIncludeYear] = useState<
    "none" | "year" | "year-month"
  >("year");
  const [startNumber, setStartNumber] = useState("001");
  const [digits, setDigits] = useState(3);
  const [suffix, setSuffix] = useState("-US");
  const [includeClient, setIncludeClient] = useState(false);
  const [clientInitials, setClientInitials] = useState("JD");

  const [copiedFormat, setCopiedFormat] = useState(false);
  const [copiedSequence, setCopiedSequence] = useState(false);

  const getYearString = () => {
    const d = new Date();
    if (includeYear === "year") return d.getFullYear().toString();
    if (includeYear === "year-month")
      return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}`;
    return "";
  };

  const formatNumber = (num: number) => {
    return num.toString().padStart(digits, "0");
  };

  const getSequence = (count: number = 20) => {
    const seq = [];
    const yearStr = getYearString();
    const start = parseInt(startNumber) || 1;

    for (let i = 0; i < count; i++) {
      let current = prefix;
      if (includeClient && clientInitials)
        current += `${clientInitials.toUpperCase()}-`;
      if (yearStr) current += `${yearStr}-`;
      current += formatNumber(start + i);
      if (suffix) current += suffix;
      seq.push(current);
    }
    return seq;
  };

  const mainPreview = getSequence(1)[0];
  const listPreview = getSequence(20);

  const downloadCSV = () => {
    const seq = getSequence(100);
    const csvContent =
      "Invoice Number\n" +
      seq.join("\n") +
      "\n\n# Generated with AddInvoices · addinvoicesai.com";
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `Invoice_Numbers_${prefix.replace(/[^a-z0-9]/gi, "_")}_AddInvoices.csv`,
    );
    link.click();
  };

  const copyFormat = () => {
    navigator.clipboard.writeText(mainPreview);
    setCopiedFormat(true);
    setTimeout(() => setCopiedFormat(false), 2000);
  };

  return (
    <div className="min-h-screen w-full relative bg-ad-main font-sans overflow-x-hidden">

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
          <span className="text-white font-medium">
            Invoice Number Generator
          </span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-16 px-4">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Invoice Number Generator
          </h1>
          <p className="text-ad-secondary text-lg max-w-2xl mx-auto">
            Create a professional invoice numbering system for your business.
            Generate your sequence instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Configurador Left */}
          <div className="lg:col-span-6 bg-[#111111] border border-white/10 rounded-2xl p-8 space-y-10 shadow-2xl relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    Prefix
                  </label>
                  <input
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value.substring(0, 10))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white font-mono focus:border-blue-500/50 outline-none [color-scheme:dark]"
                  />
                  <span className="text-[10px] text-gray-600">
                    e.g. INV-, BILL-, #
                  </span>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    Suffix (Optional)
                  </label>
                  <input
                    value={suffix}
                    onChange={(e) => setSuffix(e.target.value.substring(0, 8))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white font-mono focus:border-blue-500/50 outline-none [color-scheme:dark]"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  Date Format
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: "none", label: "None" },
                    { id: "year", label: "Year (2025)" },
                    { id: "year-month", label: "Year-Month (2025-03)" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setIncludeYear(opt.id as any)}
                      className={`py-3 rounded-xl border text-[11px] font-bold tracking-tight transition-all ${
                        includeYear === opt.id
                          ? "bg-blue-600 border-blue-500 text-white shadow-lg"
                          : "bg-white/5 border-white/10 text-gray-500"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Starting from
                  </label>
                  <input
                    type="number"
                    value={startNumber}
                    onChange={(e) =>
                      setStartNumber(e.target.value.substring(0, 10))
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white font-mono focus:border-blue-500/50 outline-none [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Number digits
                  </label>
                  <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 [color-scheme:dark]">
                    {[3, 4, 5].map((d) => (
                      <button
                        key={d}
                        onClick={() => setDigits(d)}
                        className={`flex-1 py-3 text-[11px] font-bold rounded-lg transition-all ${
                          digits === d
                            ? "bg-[#111111] text-white shadow"
                            : "text-gray-500"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-4 border-t border-white/10">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                      includeClient
                        ? "bg-blue-600 border-blue-500"
                        : "bg-white/5 border-white/10 group-hover:border-white/20"
                    }`}
                  >
                    {includeClient && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={includeClient}
                    onChange={() => setIncludeClient(!includeClient)}
                  />
                  <span className="text-xs font-bold text-gray-400">
                    Include client initials
                  </span>
                </label>

                <AnimatePresence>
                  {includeClient && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-1 space-y-2">
                        <input
                          value={clientInitials}
                          onChange={(e) =>
                            setClientInitials(
                              e.target.value.substring(0, 3).toUpperCase(),
                            )
                          }
                          placeholder="e.g. JD"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono focus:border-blue-500/50 outline-none [color-scheme:dark]"
                        />
                        <p className="text-[10px] text-gray-600 italic">
                          Example for "John Doe" or specific client.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Preview Right */}
          <div className="lg:col-span-6 sticky top-28 space-y-6">
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-10 flex flex-col items-center">
              <div className="text-[10px] font-bold text-blue-500 tracking-[0.2em] uppercase mb-8">
                Format Preview
              </div>
              <div className="text-3xl md:text-5xl font-black text-white font-mono mb-12 tracking-tighter">
                {mainPreview}
              </div>

              <div className="w-full bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4 overflow-hidden mb-10 [color-scheme:dark]">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center justify-between">
                  Example sequence
                  <span className="text-blue-500 font-bold px-2 py-0.5 bg-blue-600/10 rounded flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Live
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2 font-mono text-xs text-gray-500">
                  {listPreview.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between border-b border-white/[0.02] pb-1"
                    >
                      <span>{item}</span>
                      <span className="text-[8px] text-gray-800">#{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={copyFormat}
                  className="py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 [color-scheme:dark]"
                >
                  {copiedFormat ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Hash className="w-3.5 h-3.5" />
                  )}
                  {copiedFormat ? "Copied" : "Copy format"}
                </button>
                <button
                  onClick={downloadCSV}
                  className="py-4 bg-[#111111] hover:bg-black text-white rounded-2xl text-xs font-bold transition-all border border-blue-500/20 flex items-center justify-center gap-2 shadow-xl shadow-blue-500/5 group"
                >
                  <Download className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />{" "}
                  CSV
                </button>
                <a
                  href="https://app.addinvoicesai.com"
                  className="py-4 btn-ad-primary rounded-2xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  Use in App
                </a>
              </div>
            </div>

            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-6 flex gap-4">
              <Info className="w-5 h-5 text-emerald-500 shrink-0" />
              <p className="text-[11px] text-emerald-500/80 leading-relaxed font-medium">
                AddInvoices automatically increments your invoice numbers for
                you. Start with any format and we'll handle the rest.
              </p>
            </div>
          </div>
        </div>

        {/* Best Practices Section (SEO) */}
        <div className="mt-40 max-w-4xl mx-auto space-y-12">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Best Practices for Invoicing
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h4 className="text-white font-bold">
                Why sequential numbering matters
              </h4>
              <p className="text-sm text-ad-secondary leading-relaxed">
                Tax authorities and accountants require sequential invoice
                numbers to prevent missing or fraudulent transactions. Gaps in
                your sequence can trigger audits, while duplicates cause
                record-keeping nightmares.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-bold">Avoid starting at "1"</h4>
              <p className="text-sm text-ad-secondary leading-relaxed">
                Starting at #001 can make your business look brand new. Many
                freelancers and agency owners start their numbering at #101 or
                #2001 to convey established stability to new clients.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-bold">
                Include the year or month
              </h4>
              <p className="text-sm text-ad-secondary leading-relaxed">
                Adding the current year (e.g., INV-2025-001) makes it much
                easier to organize files and search through archives during tax
                season or when reviewing annual growth.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-bold">Consistency is key</h4>
              <p className="text-sm text-ad-secondary leading-relaxed">
                Once you choose a format, stick with it for at least one fiscal
                year. Changing your numbering logic midway through the year
                makes tracking payments and reconciliation significantly harder.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 bg-[#111111] rounded-2xl p-10 md:p-16 border border-white/10 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Your numbering system is ready. Now start billing.
          </h2>
          <p className="text-ad-secondary text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            AddInvoices auto-generates sequential, professional invoice numbers
            for you based on any system. Focus on your work, not the admin.
          </p>
          <a
            href="https://app.addinvoicesai.com"
            className="inline-block px-10 py-5 btn-ad-primary rounded-2xl font-bold text-center shadow-lg hover:-translate-y-1 transition-all"
          >
            Start invoicing free →
          </a>
        </div>
      </main>

      <ConventionalFooter />
    </div>
  );
}
