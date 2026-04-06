"use client";

import { useState } from "react";
import { ConventionalFooter } from "@/components/conventional-footer";
import Link from "next/link";
import { ChevronRight, Percent, Info } from "lucide-react";

export default function ProfitMarginCalculatorPage() {
  const [mode, setMode] = useState<"margin" | "price">("margin");
  const [cost, setCost] = useState<number>(100);
  const [sellingPrice, setSellingPrice] = useState<number>(150);
  const [desiredMargin, setDesiredMargin] = useState<number>(30);

  // Calculations for Margin Mode
  const grossProfit = sellingPrice - cost;
  const margin = sellingPrice > 0 ? (grossProfit / sellingPrice) * 100 : 0;
  const markup = cost > 0 ? (grossProfit / cost) * 100 : 0;

  // Calculations for Price Mode
  const recommendedPrice =
    desiredMargin < 100 ? cost / (1 - desiredMargin / 100) : 0;
  const priceProfit = recommendedPrice - cost;
  const priceMarkup = cost > 0 ? (priceProfit / cost) * 100 : 0;

  return (
    <div className="min-h-screen w-full relative bg-ad-main font-sans overflow-x-hidden">

      <main className="relative z-10 pt-28 pb-20 px-4 md:px-6 max-w-4xl mx-auto">
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
            Profit Margin Calculator
          </span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Profit Margin Calculator
          </h1>
          <p className="text-ad-secondary text-lg max-w-2xl mx-auto">
            Know your real margins and markup in seconds. Free, no account
            needed.
          </p>
        </div>

        {/* Toggles */}
        <div className="flex items-center justify-center p-1 bg-white/5 border border-white/10 rounded-2xl w-fit mx-auto mb-10 [color-scheme:dark]">
          <button
            onClick={() => setMode("margin")}
            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
              mode === "margin"
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Calculate my margin
          </button>
          <button
            onClick={() => setMode("price")}
            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
              mode === "price"
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Find my sell price
          </button>
        </div>

        {/* Calculator Card */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl mb-16 max-w-xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="space-y-8 relative z-10">
            {mode === "margin" ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cost Price ($)
                    </label>
                    <input
                      type="number"
                      value={cost}
                      onChange={(e) => setCost(parseFloat(e.target.value) || 0)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-xl font-bold focus:border-blue-500/50 outline-none [color-scheme:dark]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Selling Price ($)
                    </label>
                    <input
                      type="number"
                      value={sellingPrice}
                      onChange={(e) =>
                        setSellingPrice(parseFloat(e.target.value) || 0)
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-xl font-bold focus:border-blue-500/50 outline-none [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl">
                      <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">
                        Gross Profit
                      </div>
                      <div className="text-2xl font-bold text-white">
                        ${grossProfit.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl">
                      <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">
                        Markup
                      </div>
                      <div className="text-2xl font-bold text-white">
                        {markup.toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <div className="text-center p-6 bg-blue-600/5 border border-blue-500/10 rounded-2xl">
                    <div className="text-xs text-blue-400 uppercase font-bold mb-2 tracking-widest">
                      Profit Margin
                    </div>
                    <div className="text-5xl font-black text-blue-500">
                      {margin.toFixed(1)}%
                    </div>
                  </div>

                  {/* Visual Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      <span>Cost</span>
                      <span>Profit</span>
                    </div>
                    <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden flex [color-scheme:dark]">
                      <div
                        style={{ width: `${(cost / sellingPrice) * 100}%` }}
                        className="h-full bg-gray-600 transition-all duration-500"
                      />
                      <div
                        style={{
                          width: `${(grossProfit / sellingPrice) * 100}%`,
                        }}
                        className="h-full bg-blue-500 transition-all duration-500"
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cost Price ($)
                    </label>
                    <input
                      type="number"
                      value={cost}
                      onChange={(e) => setCost(parseFloat(e.target.value) || 0)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-xl font-bold focus:border-blue-500/50 outline-none [color-scheme:dark]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Desired Margin (%)
                    </label>
                    <input
                      type="number"
                      value={desiredMargin}
                      onChange={(e) =>
                        setDesiredMargin(parseFloat(e.target.value) || 0)
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-xl font-bold focus:border-blue-500/50 outline-none [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10 space-y-6">
                  <div className="text-center p-8 bg-blue-600/5 border border-blue-500/10 rounded-2xl">
                    <div className="text-xs text-blue-400 uppercase font-bold mb-3 tracking-widest">
                      Recommended Price
                    </div>
                    <div className="text-5xl font-black text-blue-500">
                      $
                      {recommendedPrice.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-white/[0.02] border border-white/10 rounded-2xl">
                      <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">
                        Your Profit
                      </div>
                      <div className="text-2xl font-bold text-white">
                        $
                        {priceProfit.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </div>
                    <div className="p-5 bg-white/[0.02] border border-white/10 rounded-2xl">
                      <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">
                        Markup
                      </div>
                      <div className="text-2xl font-bold text-white">
                        {priceMarkup.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Educational Section */}
        <div className="max-w-3xl mx-auto mb-24 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Percent className="w-5 h-5 text-blue-500" />
              Margin vs. Markup
            </h3>
            <p className="text-ad-secondary text-sm leading-relaxed">
              Profit margin is the percentage of the selling price that is
              profit. Markup is the percentage added to the cost price to reach
              the selling price.
            </p>
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-xs space-y-3 [color-scheme:dark]">
              <div className="flex justify-between">
                <span className="text-gray-400">Margin:</span>
                <span className="text-white font-medium">
                  (Profit / Revenue) × 100
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Markup:</span>
                <span className="text-white font-medium">
                  (Profit / Cost) × 100
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500" />
              Pro Tip
            </h3>
            <p className="text-ad-secondary text-sm leading-relaxed">
              A 50% markup is equal to a 33.3% profit margin. To achieve a 20%
              profit margin, you need a 25% markup. Always calculate based on
              your total business costs to ensure profitability.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#111111] rounded-2xl p-10 md:p-16 border border-white/10 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Total business visibility
          </h2>
          <p className="text-ad-secondary text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Track your income, expenses, and profitability automatically with
            AddInvoices.
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
