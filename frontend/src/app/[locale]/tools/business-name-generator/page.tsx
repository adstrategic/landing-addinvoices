"use client";

import { useState } from "react";
import { ConventionalFooter } from "@/components/conventional-footer";
import Link from "next/link";
import {
  ChevronRight,
  Sparkles,
  Heart,
  Copy,
  Trash2,
  Check,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const wordBanks: any = {
  prefixes: {
    professional: [
      "Pro",
      "Prime",
      "Peak",
      "Apex",
      "Elite",
      "Core",
      "True",
      "Solid",
      "Trust",
      "Global",
    ],
    modern: [
      "Neo",
      "Nova",
      "Flux",
      "Vibe",
      "Shift",
      "Edge",
      "Arc",
      "Zen",
      "Next",
      "Wave",
    ],
    creative: [
      "Bright",
      "Bold",
      "Vivid",
      "Spark",
      "Craft",
      "Flow",
      "Bloom",
      "Wild",
      "Sky",
      "Luna",
    ],
    minimal: [
      "One",
      "Base",
      "Root",
      "Form",
      "Line",
      "Clear",
      "Plain",
      "Pure",
      "Simple",
      "Echo",
    ],
    bold: [
      "Force",
      "Power",
      "Surge",
      "Strike",
      "Drive",
      "Max",
      "Forge",
      "Titan",
      "Strong",
      "Iron",
    ],
  },
  suffixes: {
    services: [
      "Studio",
      "Co.",
      "Agency",
      "Group",
      "Works",
      "Lab",
      "Hub",
      "Collective",
      "Bureau",
      "Partners",
    ],
    consulting: [
      "Advisors",
      "Partners",
      "Consulting",
      "Solutions",
      "Strategies",
      "Experts",
      "Group",
      "Consultancy",
    ],
    tech: [
      "Tech",
      "Digital",
      "Systems",
      "Dev",
      "Code",
      "Stack",
      "Byte",
      "Logix",
      "Web",
      "AI",
    ],
    creative: [
      "Creative",
      "Design",
      "Media",
      "Brand",
      "Visuals",
      "Craft",
      "Arts",
      "Production",
      "Marketing",
    ],
  },
  connectors: ["&", "and", "+", "x"],
};

const industries = [
  "Design & Creative",
  "Technology & Software",
  "Consulting & Coaching",
  "Photography & Video",
  "Marketing & Branding",
  "Writing & Content",
  "Finance & Accounting",
  "Health & Wellness",
  "Construction & Trades",
  "Food & Hospitality",
  "Other",
];

const styles = ["Professional", "Modern", "Creative", "Minimal", "Bold"];

export default function BusinessNameGeneratorPage() {
  const [keyword, setKeyword] = useState("");
  const [industry, setIndustry] = useState("Design & Creative");
  const [style, setStyle] = useState("Professional");
  const [results, setResults] = useState<string[]>([]);
  const [savedNames, setSavedNames] = useState<string[]>([]);
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const generateNames = () => {
    const names: string[] = [];
    const lowerKeyword = keyword.trim() || "Service";
    const baseWord =
      lowerKeyword.charAt(0).toUpperCase() + lowerKeyword.slice(1);

    // Pick relevant word banks
    const stylePrefixes =
      (wordBanks.prefixes as any)[style.toLowerCase()] ||
      wordBanks.prefixes.professional;
    const industrySuffixes = industry.toLowerCase().includes("tech")
      ? wordBanks.suffixes.tech
      : industry.toLowerCase().includes("consult")
        ? wordBanks.suffixes.consulting
        : industry.toLowerCase().includes("creative") ||
            industry.toLowerCase().includes("design")
          ? wordBanks.suffixes.creative
          : wordBanks.suffixes.services;

    const generateOne = () => {
      const type = Math.floor(Math.random() * 6);
      const randomPrefix =
        stylePrefixes[Math.floor(Math.random() * stylePrefixes.length)];
      const randomSuffix =
        industrySuffixes[Math.floor(Math.random() * industrySuffixes.length)];
      const randomConnector =
        wordBanks.connectors[
          Math.floor(Math.random() * wordBanks.connectors.length)
        ];

      switch (type) {
        case 0:
          return `${baseWord} ${randomSuffix}`;
        case 1:
          return `${randomPrefix}${baseWord}`;
        case 2:
          return `${randomPrefix} ${baseWord}`;
        case 3:
          return `${baseWord} ${randomConnector} ${randomSuffix}`;
        case 4:
          return `${randomPrefix} ${randomSuffix}`;
        case 5:
          return `${baseWord}${randomSuffix}`;
        default:
          return `${baseWord} ${randomSuffix}`;
      }
    };

    while (names.length < 24) {
      const newName = generateOne();
      if (!names.includes(newName)) names.push(newName);
    }

    setResults(names);
  };

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 2000);
  };

  const toggleSave = (name: string) => {
    if (savedNames.includes(name)) {
      setSavedNames(savedNames.filter((n) => n !== name));
    } else {
      setSavedNames([...savedNames, name]);
    }
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
            Business Name Generator
          </span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Business Name Generator
          </h1>
          <p className="text-ad-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            Find the perfect name for your business in seconds. Get dozens of
            ideas instantly.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                What does your business do?
              </label>
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. web design, marketing, cleaning..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500/50 outline-none [color-scheme:dark]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Industry (Optional)
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500/50 outline-none shadow-xl appearance-none [color-scheme:dark]"
              >
                {industries.map((i) => (
                  <option key={i} value={i} className="bg-[#111111]">
                    {i}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Style Preference
              </label>
              <div className="flex bg-white/5 rounded-2xl p-1 border border-white/10 [color-scheme:dark]">
                {styles.slice(0, 3).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`flex-1 py-3 text-[10px] font-bold uppercase rounded-xl transition-all ${
                      style === s
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-500 hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="lg:col-span-3">
              <button
                onClick={generateNames}
                className="w-full py-5 btn-ad-primary rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
              >
                <Sparkles className="w-5 h-5" /> Generate Names
              </button>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 flex flex-col">
            <div className="flex items-center justify-between mb-8 px-2">
              <h2 className="text-white font-bold text-xl flex items-center gap-3">
                <RefreshCw
                  className={`w-5 h-5 text-blue-500 ${results.length > 0 ? "animate-spin-slow" : ""}`}
                />
                Name Suggestions
              </h2>
              {results.length > 0 && (
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  {results.length} Ideas found
                </span>
              )}
            </div>

            {results.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl p-10 text-center">
                <p className="text-gray-500 text-sm max-w-xs leading-relaxed italic">
                  Type a keyword and click generate to see name ideas for your
                  new venture.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AnimatePresence>
                  {results.map((name, i) => (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-[#111111] border border-white/10 rounded-2xl p-6 group hover:border-blue-500/30 transition-all hover:bg-white/[0.03]"
                    >
                      <h3 className="text-white font-bold text-lg mb-6 group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                        {name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(name)}
                          className="flex items-center gap-1 text-[10px] font-bold text-gray-500 hover:text-white transition-colors"
                        >
                          {copiedName === name ? (
                            <Check className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          {copiedName === name ? "Copied" : "Copy"}
                        </button>
                        <span className="text-gray-800">|</span>
                        <button
                          onClick={() => toggleSave(name)}
                          className={`flex items-center gap-1 text-[10px] font-bold transition-colors ${
                            savedNames.includes(name)
                              ? "text-red-500"
                              : "text-gray-500 hover:text-white"
                          }`}
                        >
                          <Heart
                            className={`w-3 h-3 ${savedNames.includes(name) ? "fill-red-500" : ""}`}
                          />
                          {savedNames.includes(name) ? "Saved" : "Save"}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <div className="sm:col-span-2 pt-10 flex justify-center">
                  <button
                    onClick={generateNames}
                    className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold text-sm hover:bg-white/10 transition-all [color-scheme:dark]"
                  >
                    Load more names
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Saved Names Sidebar */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 space-y-8 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  Saved Names
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-white/10 text-white rounded-full">
                  {savedNames.length}
                </span>
              </div>

              {savedNames.length === 0 ? (
                <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl">
                  <p className="text-gray-600 text-xs italic">
                    No names saved yet.
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {savedNames.map((name) => (
                      <div
                        key={name}
                        className="flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 group"
                      >
                        <span className="text-white text-sm font-medium">
                          {name}
                        </span>
                        <button
                          onClick={() => toggleSave(name)}
                          className="p-1.5 text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="pt-6 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(savedNames.join("\n"));
                        alert("All names copied!");
                      }}
                      className="py-3 bg-white/5 border border-white/10 text-white text-xs font-bold rounded-xl hover:bg-white/10 [color-scheme:dark]"
                    >
                      Copy all
                    </button>
                    <button
                      onClick={() => setSavedNames([])}
                      className="py-3 text-gray-500 text-xs font-bold rounded-xl hover:text-red-400"
                    >
                      Clear list
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* SEO / Content Section */}
        <div className="mt-32 max-w-4xl mx-auto space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white">
                How to choose a memorable name
              </h4>
              <p className="text-sm text-ad-secondary leading-relaxed">
                The best business names are simple to pronounce, easy to spell,
                and distinctive. Aim for one or two words that evoke the essence
                of your brand without being overly literal.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white">
                Check domain availability
              </h4>
              <p className="text-sm text-ad-secondary leading-relaxed">
                Once you find a name you love, immediately check if the .com
                domain is available. Consistency across your website and social
                handles is key for professional branding.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white">
                Ensure social handle consistency
              </h4>
              <p className="text-sm text-ad-secondary leading-relaxed">
                Check Instagram, Twitter, and LinkedIn. Having the same handle
                across all platforms makes it easier for clients to find and
                trust you.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white">Test it out loud</h4>
              <p className="text-sm text-ad-secondary leading-relaxed">
                Say the name over the phone and to your friends. If you have to
                repeat it or spell it out every time, it might be too complex
                for a growing business.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 bg-[#111111] rounded-2xl p-10 md:p-16 border border-white/10 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Named your business? Now it's time to get paid.
          </h2>
          <p className="text-ad-secondary text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            AddInvoices lets you create professional invoices with your business
            name and branding from day one. Build your legacy on a solid
            foundation.
          </p>
          <a
            href="https://app.addinvoicesai.com"
            className="inline-block px-10 py-5 btn-ad-primary rounded-2xl font-bold text-center shadow-lg hover:-translate-y-1 transition-all"
          >
            Start free with AddInvoices →
          </a>
        </div>
      </main>

      <ConventionalFooter />
    </div>
  );
}
