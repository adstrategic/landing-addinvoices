"use client";

import { useState } from "react";
import { ConventionalFooter } from "@/components/conventional-footer";
import Link from "next/link";
import {
  ChevronRight,
  User,
  Briefcase,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Twitter,
  Instagram,
  Upload,
  Check,
  Copy,
  FileText,
  Layout,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type TemplateId = "minimal" | "modern" | "bold" | "classic";

export default function EmailSignatureGeneratorPage() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateId>("modern");
  const [accentColor, setAccentColor] = useState("#2563eb");
  const [copied, setCopied] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

  const [data, setData] = useState({
    fullName: "Your Name",
    jobTitle: "Your Title",
    company: "Your Company",
    email: "email@example.com",
    phone: "+1 555 000 0000",
    website: "https://example.com",
    linkedin: "https://linkedin.com/in/username",
    twitter: "@username",
    instagram: "@username",
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result as string);
      reader.readAsDataURL(file);
    } else if (file) {
      alert("Photo must be less than 1MB");
    }
  };

  const getInitials = () => {
    return data.fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const renderPhoto = (sizeClass = "w-16 h-16") => {
    if (photo) {
      return (
        <img
          src={photo}
          alt={data.fullName}
          className={`${sizeClass} rounded-full object-cover shadow-sm`}
        />
      );
    }
    return (
      <div
        style={{ backgroundColor: accentColor }}
        className={`${sizeClass} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm`}
      >
        {getInitials()}
      </div>
    );
  };

  const generateHTML = () => {
    // Basic inline CSS signature HTML
    const socialIcons = [];
    if (data.linkedin)
      socialIcons.push(
        `<a href="${data.linkedin}" style="margin-right:8px;text-decoration:none;color:${accentColor};">LinkedIn</a>`,
      );
    if (data.twitter)
      socialIcons.push(
        `<a href="#" style="margin-right:8px;text-decoration:none;color:${accentColor};">Twitter</a>`,
      );

    // Very simplified version for copying
    return `
<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5; font-size: 14px;">
  <div style="margin-bottom: 8px;">
    <strong style="font-size: 18px; color: #000;">${data.fullName}</strong><br/>
    <span style="color: ${accentColor}; font-weight: bold;">${data.jobTitle}</span>${data.company ? ` | ${data.company}` : ""}
  </div>
  <div style="margin-bottom: 12px;">
    ${data.email ? `<a href="mailto:${data.email}" style="color: #666; text-decoration: none;">${data.email}</a><br/>` : ""}
    ${data.phone ? `<span style="color: #666;">${data.phone}</span><br/>` : ""}
    ${data.website ? `<a href="${data.website}" style="color: #666; text-decoration: none;">${data.website}</a>` : ""}
  </div>
  <div style="font-size: 12px; color: #999; margin-top: 15px; border-top: 1px solid #eee; pt: 10px;">
    Made with <a href="https://www.addinvoicesai.com" style="color: ${accentColor}; text-decoration: none; font-weight: bold;">AddInvoices</a>
  </div>
</div>`;
  };

  const copyHTML = () => {
    navigator.clipboard.writeText(generateHTML());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            Email Signature Generator
          </span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Free Email Signature Generator
          </h1>
          <p className="text-ad-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            Create a professional email signature in minutes. Copy and paste
            into Gmail, Outlook, or any email client.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Editor Left */}
          <div className="lg:col-span-6 bg-[#111111] border border-white/10 rounded-2xl p-8 space-y-10 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-8">
              {/* Personal Info */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <User className="w-3 h-3 text-blue-500" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    placeholder="Full Name"
                    value={data.fullName}
                    onChange={(e) =>
                      setData({ ...data, fullName: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500/50 outline-none [color-scheme:dark]"
                  />
                  <input
                    placeholder="Job Title"
                    value={data.jobTitle}
                    onChange={(e) =>
                      setData({ ...data, jobTitle: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500/50 outline-none [color-scheme:dark]"
                  />
                  <input
                    placeholder="Company Name"
                    value={data.company}
                    onChange={(e) =>
                      setData({ ...data, company: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500/50 outline-none [color-scheme:dark]"
                  />
                  <input
                    placeholder="Email"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500/50 outline-none [color-scheme:dark]"
                  />
                  <input
                    placeholder="Phone Number"
                    value={data.phone}
                    onChange={(e) =>
                      setData({ ...data, phone: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500/50 outline-none [color-scheme:dark]"
                  />
                  <input
                    placeholder="Website URL"
                    value={data.website}
                    onChange={(e) =>
                      setData({ ...data, website: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500/50 outline-none [color-scheme:dark]"
                  />
                </div>

                {/* Avatar Upload */}
                <div className="pt-2">
                  <div className="flex items-center gap-4">
                    <div className="shrink-0">{renderPhoto("w-12 h-12")}</div>
                    <label className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 border border-dashed border-white/20 rounded-xl cursor-pointer hover:bg-white/10 transition-all text-xs text-gray-400 [color-scheme:dark]">
                      <Upload className="w-4 h-4" />
                      {photo ? "Change Photo" : "Upload Photo (Max 1MB)"}
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                      />
                    </label>
                    {photo && (
                      <button
                        onClick={() => setPhoto(null)}
                        className="text-[10px] font-bold text-red-500 hover:text-red-400 uppercase tracking-widest transition-colors px-2"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Linkedin className="w-3 h-3 text-blue-500" />
                  Social Links
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    placeholder="LinkedIn Profile URL"
                    value={data.linkedin}
                    onChange={(e) =>
                      setData({ ...data, linkedin: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500/50 outline-none [color-scheme:dark]"
                  />
                  <div className="flex gap-2">
                    <div className="flex items-center justify-center w-12 shrink-0 bg-white/5 border border-white/10 rounded-xl text-gray-500 [color-scheme:dark]">
                      <Twitter className="w-4 h-4" />
                    </div>
                    <input
                      placeholder="@username"
                      value={data.twitter}
                      onChange={(e) =>
                        setData({ ...data, twitter: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500/50 outline-none [color-scheme:dark]"
                    />
                  </div>
                </div>
              </div>

              {/* Templates */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Layout className="w-3 h-3 text-blue-500" />
                  Choose Template
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(
                    ["minimal", "modern", "bold", "classic"] as TemplateId[]
                  ).map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTemplate(t)}
                      className={`py-3 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${
                        activeTemplate === t
                          ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20"
                          : "bg-white/5 border-white/10 text-gray-500 hover:border-white/20"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-6">
                  <label className="text-xs font-medium text-gray-500">
                    Accent Color:
                  </label>
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-8 h-8 rounded bg-transparent border border-white/20 cursor-pointer"
                  />
                  <span className="text-xs font-mono text-white uppercase">
                    {accentColor}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Right */}
          <div className="lg:col-span-6 sticky top-28 space-y-6">
            <div className="bg-white rounded-2xl p-1 md:p-12 shadow-2xl relative min-h-[300px] flex flex-col items-center justify-center">
              {/* The Actual Signature Preview */}
              <div className="w-full bg-white p-8 rounded-xl border border-gray-100 shadow-sm overflow-hidden select-all">
                {activeTemplate === "modern" && (
                  <div className="flex items-start gap-6 font-sans text-[#333]">
                    <div className="shrink-0">{renderPhoto("w-20 h-20")}</div>
                    <div className="space-y-1">
                      <div className="text-xl font-bold text-black tracking-tight">
                        {data.fullName}
                      </div>
                      <div
                        style={{ color: accentColor }}
                        className="text-sm font-bold uppercase tracking-wider"
                      >
                        {data.jobTitle}
                      </div>
                      <div className="text-gray-500 text-sm mb-3">
                        at {data.company}
                      </div>
                      <div className="space-y-0.5 mt-4 text-xs">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail
                            className="w-3 h-3"
                            style={{ color: accentColor }}
                          />{" "}
                          {data.email}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone
                            className="w-3 h-3"
                            style={{ color: accentColor }}
                          />{" "}
                          {data.phone}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Globe
                            className="w-3 h-3"
                            style={{ color: accentColor }}
                          />{" "}
                          {data.website.replace(/^https?:\/\//, "")}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTemplate === "minimal" && (
                  <div
                    className="font-sans text-[#333] border-l-4 pl-6 py-1"
                    style={{ borderColor: accentColor }}
                  >
                    <div className="text-xl font-bold text-black">
                      {data.fullName}
                    </div>
                    <div className="text-sm font-medium mb-4">
                      {data.jobTitle} · {data.company}
                    </div>
                    <div className="text-xs text-gray-500 space-x-3">
                      <span>{data.email}</span>
                      <span>|</span>
                      <span>{data.phone}</span>
                      <span>|</span>
                      <span>{data.website.replace(/^https?:\/\//, "")}</span>
                    </div>
                  </div>
                )}

                {activeTemplate === "bold" && (
                  <div className="flex gap-4 font-sans text-white rounded-xl overflow-hidden shadow-sm">
                    <div
                      style={{ backgroundColor: accentColor }}
                      className="p-8 flex flex-col items-center justify-center shrink-0 min-w-[140px]"
                    >
                      {renderPhoto("w-16 h-16 border-2 border-white/20")}
                      <div className="mt-4 text-center">
                        <div className="font-bold text-xs uppercase tracking-widest opacity-80">
                          Connected via
                        </div>
                        <div className="flex gap-2 mt-2 opacity-100">
                          <Linkedin className="w-4 h-4" />
                          <Twitter className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                    <div className="p-8 bg-gray-50 text-[#333] flex-1 flex flex-col justify-center">
                      <div
                        className="text-2xl font-black uppercase tracking-tighter"
                        style={{ color: accentColor }}
                      >
                        {data.fullName}
                      </div>
                      <div className="text-sm font-bold text-gray-400 mb-4">
                        {data.jobTitle}
                      </div>
                      <div className="text-xs space-y-1 block">
                        <div className="font-medium">{data.email}</div>
                        <div className="text-gray-400">{data.phone}</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTemplate === "classic" && (
                  <div className="font-sans text-[#333] text-center border p-8 border-gray-100 rounded">
                    <div className="flex justify-center mb-4">
                      {renderPhoto("w-16 h-16")}
                    </div>
                    <div
                      className="text-lg font-bold text-black border-b-[2px] inline-block pb-1 mb-2"
                      style={{ borderColor: accentColor }}
                    >
                      {data.fullName}
                    </div>
                    <div className="text-sm font-bold text-gray-500 mb-6">
                      {data.jobTitle} at {data.company}
                    </div>
                    <div className="text-xs text-gray-600 max-w-xs mx-auto flex flex-wrap justify-center gap-x-4 gap-y-1 font-medium">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {data.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {data.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />{" "}
                        {data.website.replace(/^https?:\/\//, "")}
                      </span>
                    </div>
                  </div>
                )}

                {/* Attribution */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between opacity-50 text-[10px] grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                  <span className="font-medium text-gray-400">
                    Professional Email Signature
                  </span>
                  <span className="font-bold text-blue-600">
                    Made with AddInvoices · addinvoicesai.com
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full max-w-[400px] grid grid-cols-1 gap-3 mt-8">
                <button
                  onClick={copyHTML}
                  className="py-4 bg-[#111111] hover:bg-black text-white rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xl"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copied ? "Copied HTML! ✓" : "Copy HTML code"}
                </button>
                <button className="py-4 bg-white/5 hover:bg-gray-100 text-gray-500 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-gray-100 [color-scheme:dark]">
                  <FileText className="w-3.5 h-3.5" />
                  Copy as plain text
                </button>
              </div>
            </div>

            {/* Install Guide Card */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-500" />
                How to install
              </h3>
              <div className="space-y-3">
                {[
                  {
                    client: "Gmail",
                    steps:
                      "Settings > See all settings > General > Signature > Paste",
                  },
                  {
                    client: "Outlook",
                    steps:
                      "Settings > View all Outlook settings > Mail > Compose and reply",
                  },
                  {
                    client: "Apple Mail",
                    steps: "Mail > Settings > Signatures > [+] > Paste",
                  },
                ].map((guide) => (
                  <div
                    key={guide.client}
                    className="p-3 bg-white/5 rounded-xl flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-colors [color-scheme:dark]"
                  >
                    <span className="text-xs font-bold text-white">
                      {guide.client}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {guide.steps}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SEO Section */}
        <div className="mt-32 max-w-4xl mx-auto space-y-16">
          <div className="space-y-6 text-center">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Installation Guide
            </h2>
            <p className="text-ad-secondary leading-relaxed mx-auto max-w-2xl">
              Ready to glow up your emails? Follow these steps to install your
              professional signature in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 [color-scheme:dark]">
              <h4 className="text-lg font-bold text-white mb-4">
                How to add in Gmail
              </h4>
              <ol className="text-sm text-ad-secondary space-y-3 list-decimal pl-4">
                <li>Copy your signature by clicking "Copy HTML code".</li>
                <li>Open Gmail and go to "Settings" (the gear icon).</li>
                <li>
                  Click "See all settings" and scroll down to "Signature".
                </li>
                <li>Paste (Ctrl+V or Cmd+V) into the editor box.</li>
                <li>Save changes at the bottom!</li>
              </ol>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 [color-scheme:dark]">
              <h4 className="text-lg font-bold text-white mb-4">
                How to add in Outlook
              </h4>
              <ol className="text-sm text-ad-secondary space-y-3 list-decimal pl-4">
                <li>Copy your signature HTML.</li>
                <li>Go to "Settings" then "Compose and reply".</li>
                <li>Click "+ New Signature" and name it.</li>
                <li>Paste your signature in the editor.</li>
                <li>Set it as the default for new messages.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 bg-[#111111] rounded-2xl p-10 md:p-16 border border-white/10 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
            Look professional at every touchpoint.
          </h2>
          <p className="text-ad-secondary text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            With AddInvoices, your invoices, contracts, and receipts match the
            same professional image. Build trust from first email to final
            payment.
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
