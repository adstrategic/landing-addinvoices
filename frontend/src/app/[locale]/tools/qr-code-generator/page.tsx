"use client";

import { useState, useEffect, useRef } from "react";
import { ConventionalFooter } from "@/components/conventional-footer";
import Link from "next/link";
import {
  ChevronRight,
  Globe,
  AlignLeft,
  Mail,
  Phone,
  Download,
  Copy,
  Check,
} from "lucide-react";
import Script from "next/script";
import Watermark from "@/components/watermark";

export default function QRCodeGeneratorPage() {
  const [type, setType] = useState<"url" | "text" | "email" | "phone">("url");
  const [url, setUrl] = useState("https://www.addinvoicesai.com");
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [size, setSize] = useState(256);
  const [errorCorrection, setErrorCorrection] = useState("M");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");

  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const [isQRCodeLoaded, setIsQRCodeLoaded] = useState(false);

  const getQRValue = () => {
    switch (type) {
      case "url":
        return url || "https://www.addinvoicesai.com";
      case "text":
        return text || "AddInvoices";
      case "email":
        return `mailto:${email}?subject=${encodeURIComponent(emailSubject)}`;
      case "phone":
        return `tel:${phoneNumber}`;
      default:
        return "https://www.addinvoicesai.com";
    }
  };

  const generateQR = () => {
    if (!isQRCodeLoaded || !qrRef.current) return;

    // Clear previous QR
    qrRef.current.innerHTML = "";

    try {
      new (window as any).QRCode(qrRef.current, {
        text: getQRValue(),
        width: size,
        height: size,
        colorDark: fgColor,
        colorLight: bgColor,
        correctLevel: (window as any).QRCode.CorrectLevel[
          errorCorrection === "L" ? "L" : errorCorrection === "H" ? "H" : "M"
        ],
      });

      // Add attribution to the canvas if needed for download, but for now we just show it in HTML
    } catch (e) {
      console.error("QR Generation error", e);
    }
  };

  useEffect(() => {
    generateQR();
  }, [
    type,
    url,
    text,
    email,
    emailSubject,
    phoneNumber,
    size,
    errorCorrection,
    fgColor,
    bgColor,
    isQRCodeLoaded,
  ]);

  const downloadPNG = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;

    // Create a new canvas to add attribution
    const finalCanvas = document.createElement("canvas");
    const ctx = finalCanvas.getContext("2d");
    if (!ctx) return;

    const attributionHeight = 30;
    finalCanvas.width = canvas.width;
    finalCanvas.height = canvas.height + attributionHeight;

    // Draw background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

    // Draw QR
    ctx.drawImage(canvas, 0, 0);

    // Draw Attribution
    ctx.fillStyle = "#888888";
    ctx.font = "10px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      "Generated with AddInvoices · addinvoicesai.com",
      finalCanvas.width / 2,
      canvas.height + 18,
    );

    const link = document.createElement("a");
    const filename = `QR_${getQRValue()
      .substring(0, 20)
      .replace(/[^a-z0-9]/gi, "_")}_AddInvoices.png`;
    link.download = filename;
    link.href = finalCanvas.toDataURL("image/png");
    link.click();
  };

  const handleCopyLink = () => {
    if (type !== "url") return;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen w-full relative bg-ad-main font-sans overflow-x-hidden">
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"
        onLoad={() => setIsQRCodeLoaded(true)}
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
          <span className="text-white font-medium">QR Code Generator</span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Free QR Code Generator
          </h1>
          <p className="text-ad-secondary text-lg max-w-2xl mx-auto">
            Create a QR code for any URL, text, or payment link. Free, instant,
            no account needed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Controls Left */}
          <div className="lg:col-span-7 bg-[#111111] border border-white/10 rounded-2xl p-8 space-y-8 shadow-2xl">
            {/* Tabs */}
            <div className="flex p-1 bg-white/5 rounded-xl border border-white/10 [color-scheme:dark]">
              {[
                { id: "url", label: "URL / Link", icon: Globe },
                { id: "text", label: "Plain Text", icon: AlignLeft },
                { id: "email", label: "Email", icon: Mail },
                { id: "phone", label: "Phone", icon: Phone },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setType(t.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
                    type === t.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  <t.icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.label}</span>
                </button>
              ))}
            </div>

            {/* Dynamic Inputs */}
            <div className="space-y-6 min-h-[140px]">
              {type === "url" && (
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    URL / Link
                  </label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-blue-500/50 outline-none [color-scheme:dark]"
                  />
                </div>
              )}
              {type === "text" && (
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Plain Text
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Your text here..."
                    className="w-full h-32 bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-blue-500/50 outline-none resize-none [color-scheme:dark]"
                  />
                </div>
              )}
              {type === "email" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="hello@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-blue-500/50 outline-none [color-scheme:dark]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      Subject (Optional)
                    </label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="Project Inquiry"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-blue-500/50 outline-none [color-scheme:dark]"
                    />
                  </div>
                </div>
              )}
              {type === "phone" && (
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1 555 123 4567"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-blue-500/50 outline-none [color-scheme:dark]"
                  />
                </div>
              )}
            </div>

            {/* Advanced Options */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Size
                  </label>
                  <div className="flex gap-4">
                    {[
                      { label: "Small", val: 128 },
                      { label: "Medium", val: 256 },
                      { label: "Large", val: 512 },
                    ].map((s) => (
                      <button
                        key={s.val}
                        onClick={() => setSize(s.val)}
                        className={`flex-1 py-2 text-[10px] font-bold rounded-lg border transition-all ${
                          size === s.val
                            ? "bg-blue-600 border-blue-500 text-white"
                            : "bg-white/5 border-white/10 text-gray-500"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Error Correction
                  </label>
                  <div className="flex gap-4">
                    {["L", "M", "H"].map((l) => (
                      <button
                        key={l}
                        onClick={() => setErrorCorrection(l)}
                        className={`flex-1 py-2 text-[10px] font-bold rounded-lg border transition-all ${
                          errorCorrection === l
                            ? "bg-blue-600 border-blue-500 text-white"
                            : "bg-white/5 border-white/10 text-gray-500"
                        }`}
                      >
                        {l === "L" ? "Low" : l === "H" ? "High" : "Medium"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Foreground Color
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-12 h-12 rounded-lg bg-transparent border border-white/10 cursor-pointer"
                    />
                    <span className="text-white text-sm font-mono uppercase">
                      {fgColor}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Background Color
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-12 h-12 rounded-lg bg-transparent border border-white/10 cursor-pointer"
                    />
                    <span className="text-white text-sm font-mono uppercase">
                      {bgColor}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Right */}
          <div className="lg:col-span-5 sticky top-28 space-y-8">
            <div className="bg-white rounded-2xl p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
              <div className="relative mb-6">
                <div
                  ref={qrRef}
                  className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm"
                />
              </div>

              <Watermark level={2} />

              <div className="w-full grid grid-cols-2 gap-3 mt-10">
                <button
                  onClick={downloadPNG}
                  className="py-4 bg-[#111111] hover:bg-black text-white rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" /> PNG
                </button>
                {type === "url" && (
                  <button
                    onClick={handleCopyLink}
                    className="py-4 bg-white/10 hover:bg-white/20 text-[#111111] border border-[#111111]/10 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    {copied ? "Copied!" : "Copy link"}
                  </button>
                )}
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold">💡</span>
                </div>
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-blue-900 leading-tight">
                    Pro tip: Add this QR to your invoices so clients can pay
                    instantly by scanning it.
                  </div>
                  <a
                    href="https://app.addinvoicesai.com"
                    className="text-[10px] font-bold text-blue-600 hover:underline"
                  >
                    Try this in AddInvoices →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases Section (SEO) */}
        <div className="mt-32 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">
              QR code for payment links
            </h3>
            <p className="text-ad-secondary text-sm leading-relaxed">
              Paste your Stripe, PayPal, or Venmo link to generate a QR code.
              Place it on your physical invoices or store signage so clients can
              scan and pay you in seconds.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">
              QR code for your website or portfolio
            </h3>
            <p className="text-ad-secondary text-sm leading-relaxed">
              Send potential clients directly to your online portfolio or "Book
              a Call" page. Perfect for business cards, flyers, and event
              presentations.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">
              QR code for business cards
            </h3>
            <p className="text-ad-secondary text-sm leading-relaxed">
              Include a QR code on the back of your business card that either
              points to your digital contact profile (vCard) or your primary
              business landing page.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">
              QR code for contact information
            </h3>
            <p className="text-ad-secondary text-sm leading-relaxed">
              Generate a QR code with your phone number or email address
              pre-filled, making it effortless for new clients to save your
              details and reach out.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 bg-[#111111] rounded-2xl p-10 md:p-16 border border-white/10 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Add a payment QR to every invoice automatically.
          </h2>
          <p className="text-ad-secondary text-lg mb-10 max-w-2xl mx-auto">
            With AddInvoices, your clients can pay with one scan. We generate
            unique tracking links for every bill.
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
