"use client";

import { useState } from "react";
import { ConventionalFooter } from "@/components/conventional-footer";
import Link from "next/link";
import { ChevronRight, Calculator, CheckCircle2 } from "lucide-react";

const stateTaxRates: Record<string, number> = {
  AL: 4.0,
  AK: 0.0,
  AZ: 5.6,
  AR: 6.5,
  CA: 7.25,
  CO: 2.9,
  CT: 6.35,
  DE: 0.0,
  FL: 6.0,
  GA: 4.0,
  HI: 4.0,
  ID: 6.0,
  IL: 6.25,
  IN: 7.0,
  IA: 6.0,
  KS: 6.5,
  KY: 6.0,
  LA: 4.45,
  ME: 5.5,
  MD: 6.0,
  MA: 6.25,
  MI: 6.0,
  MN: 6.875,
  MS: 7.0,
  MO: 4.225,
  MT: 0.0,
  NE: 5.5,
  NV: 6.85,
  NH: 0.0,
  NJ: 6.625,
  NM: 5.0,
  NY: 4.0,
  NC: 4.75,
  ND: 5.0,
  OH: 5.75,
  OK: 4.5,
  OR: 0.0,
  PA: 6.0,
  RI: 7.0,
  SC: 6.0,
  SD: 4.5,
  TN: 7.0,
  TX: 6.25,
  UT: 6.1,
  VT: 6.0,
  VA: 5.3,
  WA: 6.5,
  WV: 6.0,
  WI: 5.0,
  WY: 4.0,
  DC: 6.0,
};

export default function SalesTaxCalculatorPage() {
  const [subtotal, setSubtotal] = useState<number>(1000);
  const [selectedState, setSelectedState] = useState("NY");
  const [localTax, setLocalTax] = useState<number>(0);
  const [showAllRates, setShowAllRates] = useState(false);

  const stateRate = stateTaxRates[selectedState] || 0;
  const stateTaxAmount = subtotal * (stateRate / 100);
  const localTaxAmount = subtotal * (localTax / 100);
  const total = subtotal + stateTaxAmount + localTaxAmount;

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
          <span className="text-white font-medium">Sales Tax Calculator</span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Sales Tax Calculator
          </h1>
          <p className="text-ad-secondary text-lg max-w-2xl mx-auto">
            Calculate US sales tax by state instantly. Free, no account needed.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl mb-16 max-w-xl mx-auto">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subtotal Amount ($)
              </label>
              <input
                type="number"
                value={subtotal}
                onChange={(e) => setSubtotal(parseFloat(e.target.value) || 0)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-xl font-bold focus:border-blue-500/50 outline-none transition-all [color-scheme:dark]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  State
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-blue-500/50 outline-none transition-all appearance-none [color-scheme:dark]"
                >
                  {Object.keys(stateTaxRates)
                    .sort()
                    .map((code) => (
                      <option key={code} value={code} className="bg-[#111111]">
                        {code}
                      </option>
                    ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Local Tax (%)
                </label>
                <input
                  type="number"
                  value={localTax}
                  onChange={(e) => setLocalTax(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-blue-500/50 outline-none transition-all [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal:</span>
                <span>
                  $
                  {subtotal.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>State Tax ({stateRate}%):</span>
                <span>
                  $
                  {stateTaxAmount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              {localTax > 0 && (
                <div className="flex justify-between text-gray-400">
                  <span>Local Tax ({localTax}%):</span>
                  <span>
                    $
                    {localTaxAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center pt-4">
                <span className="text-white font-bold text-lg">Total:</span>
                <span className="text-3xl font-black text-blue-500">
                  $
                  {total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            <p className="text-[10px] text-gray-500 text-center italic mt-4">
              * State tax rates as of 2025. Local rates vary by city and county.
            </p>
          </div>
        </div>

        {/* Reference Table */}
        <div className="mb-20">
          <button
            onClick={() => setShowAllRates(!showAllRates)}
            className="flex items-center gap-2 text-ad-secondary hover:text-white transition-colors mx-auto mb-8 font-medium"
          >
            {showAllRates ? "Hide all state rates" : "Show all state rates"}
            <Calculator
              className={`w-4 h-4 transition-transform ${showAllRates ? "rotate-180" : ""}`}
            />
          </button>

          {showAllRates && (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 [color-scheme:dark]">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-gray-400 uppercase text-[10px] font-bold tracking-widest [color-scheme:dark]">
                  <tr>
                    <th className="px-6 py-4">State</th>
                    <th className="px-6 py-4">State Rate</th>
                    <th className="px-6 py-4">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {Object.entries(stateTaxRates)
                    .sort()
                    .map(([code, rate]) => (
                      <tr
                        key={code}
                        className="hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-6 py-4 text-white font-medium">
                          {code}
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          {rate.toFixed(2)}%
                        </td>
                        <td className="px-6 py-4 text-gray-500 text-xs">
                          {rate === 0
                            ? "No state sales tax"
                            : "Standard state rate"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-[#111111] rounded-2xl p-10 md:p-16 border border-white/10 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h2 className="text-3xl font-bold text-white mb-4 relative z-10">
            Ditch the manual math
          </h2>
          <p className="text-ad-secondary text-lg mb-10 max-w-2xl mx-auto leading-relaxed relative z-10">
            AddInvoices automatically calculates and applies sales tax when you
            create invoices — no manual calculation needed.
          </p>
          <a
            href="https://app.addinvoicesai.com"
            className="inline-block px-10 py-5 btn-ad-primary rounded-2xl font-bold text-center shadow-lg hover:-translate-y-1 transition-all relative z-10"
          >
            Try AddInvoices free →
          </a>
        </div>
      </main>

      <ConventionalFooter />
    </div>
  );
}
