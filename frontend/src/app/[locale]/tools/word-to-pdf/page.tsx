"use client";

import { useState, useRef, useEffect } from "react";
import { ConventionalFooter } from "@/components/conventional-footer";
import Link from "next/link";
import {
  ChevronRight,
  FileText,
  Download,
  ShieldCheck,
  AlertTriangle,
  FileUp,
  Loader2,
} from "lucide-react";
import Script from "next/script";
import { drawSmallAttribution } from "@/lib/utils";

export default function WordToPDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [scriptsLoaded, setScriptsLoaded] = useState({
    docx: false,
    html2canvas: false,
    jspdf: false,
  });

  const previewContainerRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File too large. Please use a file under 10MB.");
        return;
      }
      if (
        !selectedFile.name.endsWith(".docx") &&
        !selectedFile.name.endsWith(".doc")
      ) {
        setError("Please upload a .docx or .doc file.");
        return;
      }
      setFile(selectedFile);
      setError(null);
      renderPreview(selectedFile);
    }
  };

  const renderPreview = async (file: File) => {
    if (!scriptsLoaded.docx || !previewContainerRef.current) return;

    previewContainerRef.current.innerHTML = "";
    const arrayBuffer = await file.arrayBuffer();

    try {
      await (window as any).docx.renderAsync(
        arrayBuffer,
        previewContainerRef.current,
      );
    } catch (e) {
      console.error("Preview error", e);
      setError(
        "We couldn't read this file correctly. Complex formatting may vary.",
      );
    }
  };

  const convertToPDF = async () => {
    if (
      !file ||
      !scriptsLoaded.html2canvas ||
      !scriptsLoaded.jspdf ||
      !previewContainerRef.current
    )
      return;

    setIsProcessing(true);
    setProgress(10);

    try {
      const { jsPDF } = (window as any).jspdf;
      const html2canvas = (window as any).html2canvas;

      const canvas = await html2canvas(previewContainerRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      setProgress(60);

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const doc = new jsPDF("p", "mm", "a4");
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      doc.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);

      // Attribution (Level 2)
      drawSmallAttribution(doc);

      setProgress(90);
      doc.save(`${file.name.split(".")[0]}.pdf`);
      setProgress(100);

      setTimeout(() => {
        setIsProcessing(false);
        setProgress(0);
      }, 1000);
    } catch (e) {
      console.error("Conversion error", e);
      setError(
        "Error during conversion. Complex formatting might be the cause.",
      );
      setIsProcessing(false);
    }
  };

  const allScriptsLoaded =
    scriptsLoaded.docx && scriptsLoaded.html2canvas && scriptsLoaded.jspdf;

  return (
    <div className="min-h-screen w-full relative bg-ad-main font-sans overflow-x-hidden">

      <Script
        src="https://cdn.jsdelivr.net/npm/docx-preview@0.3.2/dist/docx-preview.min.js"
        onLoad={() => setScriptsLoaded((prev) => ({ ...prev, docx: true }))}
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
        onLoad={() =>
          setScriptsLoaded((prev) => ({ ...prev, html2canvas: true }))
        }
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
        onLoad={() => setScriptsLoaded((prev) => ({ ...prev, jspdf: true }))}
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
          <span className="text-white font-medium">Word to PDF</span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-16 px-4">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Word to PDF Converter
          </h1>
          <p className="text-ad-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            Convert your Word documents to PDF instantly. Free, secure, and
            processed entirely in your browser.
          </p>
        </div>

        {/* Converter Area */}
        <div className="max-w-4xl mx-auto space-y-8">
          {!file ? (
            <div
              className="bg-[#111111] border-2 border-dashed border-white/10 rounded-2xl p-20 text-center hover:border-blue-500/50 hover:bg-white/[0.02] transition-all cursor-pointer relative group"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const droppedFile = e.dataTransfer.files[0];
                if (droppedFile)
                  handleFileChange({ target: { files: [droppedFile] } } as any);
              }}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <div className="space-y-6">
                <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <FileUp className="w-10 h-10 text-blue-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                    Drop your Word file here
                  </h3>
                  <p className="text-gray-500 text-sm">
                    .docx and .doc files supported (Max 10MB)
                  </p>
                </div>
                <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-bold hover:bg-white/10 transition-colors [color-scheme:dark]">
                  Choose file
                </button>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".docx,.doc"
                  onChange={handleFileChange}
                />
              </div>
              {error && (
                <div className="mt-8 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-xs font-bold justify-center">
                  <AlertTriangle className="w-4 h-4" /> {error}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-white font-bold text-sm truncate max-w-[200px] md:max-w-md">
                      {file.name}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {(file.size / 1024).toFixed(1)} KB
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest px-4"
                >
                  Change file
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Preview Container */}
                <div className="lg:col-span-8 bg-white rounded-xl shadow-2xl p-8 min-h-[500px] max-h-[800px] overflow-y-auto custom-scrollbar-light relative">
                  <div
                    ref={previewContainerRef}
                    className="docx-preview h-full"
                  />
                  {isProcessing && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center p-10 text-center">
                      <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                      <h4 className="text-xl font-bold text-black mb-2">
                        Converting document...
                      </h4>
                      <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-blue-600"
                          initial={{ width: "0%" }}
                          animate={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="mt-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-loose">
                        Optimizing fonts and layouts for PDF export. <br />{" "}
                        Almost there.
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions Right */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-blue-600/5 border border-blue-600/10 rounded-2xl p-6 space-y-4">
                    <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                      Ready to go
                    </div>
                    <h3 className="text-white font-bold leading-tight">
                      Your document is loaded and ready for conversion.
                    </h3>
                    <button
                      onClick={convertToPDF}
                      disabled={isProcessing || !allScriptsLoaded}
                      className="w-full py-4 btn-ad-primary rounded-xl font-bold flex items-center justify-center gap-3 shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50"
                    >
                      <Download className="w-5 h-5" />
                      Convert & Download PDF
                    </button>
                    <p className="text-[10px] text-gray-600 text-center leading-relaxed italic">
                      Note: Complex formatting like heavy tables or special
                      fonts may vary slightly from the original.
                    </p>
                  </div>

                  <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex gap-4">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                    <p className="text-[11px] text-amber-500/80 leading-relaxed font-medium">
                      If your document has complex layers, try opening it in
                      Google Docs and exporting to PDF for perfect results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Security / Info Card */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-10 flex flex-col md:flex-row items-center gap-10">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center shrink-0">
              <ShieldCheck className="w-10 h-10 text-emerald-500" />
            </div>
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl font-bold text-white">
                Your files never leave your device
              </h3>
              <p className="text-ad-secondary text-sm leading-relaxed">
                Unlike most online converters, we process your files entirely in
                your browser using local resources. No documents are uploaded to
                any server. Your privacy is guaranteed by design.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 bg-[#111111] rounded-2xl p-10 md:p-16 border border-white/10 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need to send that as a professional invoice?
          </h2>
          <p className="text-ad-secondary text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            AddInvoices lets you create, customize, and send invoices as PDF
            directly to your clients — no Word or manual conversion needed.
          </p>
          <a
            href="https://app.addinvoicesai.com"
            className="inline-block px-10 py-5 btn-ad-primary rounded-2xl font-bold text-center shadow-lg hover:-translate-y-1 transition-all"
          >
            Try AddInvoices free →
          </a>
        </div>
      </main>

      <ConventionalFooter />
    </div>
  );
}
