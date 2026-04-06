"use client";

import { useState } from "react";
import { ConventionalFooter } from "@/components/conventional-footer";
import Link from "next/link";
import { ChevronRight, Clock, AlertTriangle } from "lucide-react";

export default function LateFeeCalculatorPage() {
  const [amount, setAmount] = useState<number>(1000);
  const [dueDate, setDueDate] = useState<string>("");
  const [todayDate, setTodayDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  const [interestType, setInterestType] = useState<"simple" | "compound">(
    "compound",
  );
  const [interestRate, setInterestRate] = useState<number>(18); // Annual rate

  const getDaysOverdue = () => {
    if (!dueDate) return 0;
    const due = new Date(dueDate);
    const today = new Date(todayDate);
    const diffTime = today.getTime() - due.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const daysOverdue = getDaysOverdue();
  const periods = daysOverdue / 30;

  let lateFee = 0;
  if (interestType === "simple") {
    lateFee = amount * (interestRate / 100) * (daysOverdue / 365);
  } else {
    // Compound monthly: P * ((1 + r/12)^n - 1)
    lateFee = amount * (Math.pow(1 + interestRate / 1200, periods) - 1);
  }

  const totalOwed = amount + lateFee;

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
          <span className="text-white font-medium">Late Fee Calculator</span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Late Fee Calculator
          </h1>
          <p className="text-ad-secondary text-lg max-w-2xl mx-auto">
            Calculate interest on overdue invoices instantly. Know exactly what
            you're owed.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl mb-16 max-w-xl mx-auto">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Original Invoice Amount ($)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-xl font-bold focus:border-blue-500/50 outline-none [color-scheme:dark]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-blue-500/50 outline-none [color-scheme:dark]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current / Today's Date
                </label>
                <input
                  type="date"
                  value={todayDate}
                  onChange={(e) => setTodayDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-blue-500/50 outline-none [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Interest Settings
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setInterestType("simple")}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all ${
                    interestType === "simple"
                      ? "bg-blue-600 border-blue-500 text-white"
                      : "bg-white/5 border-white/10 text-gray-400"
                  }`}
                >
                  Simple
                </button>
                <button
                  onClick={() => setInterestType("compound")}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all ${
                    interestType === "compound"
                      ? "bg-blue-600 border-blue-500 text-white"
                      : "bg-white/5 border-white/10 text-gray-400"
                  }`}
                >
                  Compound
                </button>
              </div>
              <div className="relative">
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  % Annual
                </span>
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) =>
                    setInterestRate(parseFloat(e.target.value) || 0)
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white font-bold focus:border-blue-500/50 outline-none [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Results Display */}
            <div className="pt-8 border-t border-white/10 space-y-6">
              <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <div
                  className={`text-sm font-bold uppercase tracking-widest mb-1 ${
                    daysOverdue > 30
                      ? "text-red-500"
                      : daysOverdue > 0
                        ? "text-amber-500"
                        : "text-emerald-500"
                  }`}
                >
                  {daysOverdue > 0
                    ? `${daysOverdue} Days Overdue`
                    : "Invoice not overdue yet"}
                </div>
                <div className="text-[10px] text-gray-500 uppercase italic">
                  {interestType === "compound"
                    ? "Compounded Monthly"
                    : "Simple Interest"}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-400 text-sm px-2">
                  <span>Original Amount:</span>
                  <span>
                    $
                    {amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm px-2">
                  <span>Late Fee Accrued:</span>
                  <span className="text-amber-500">
                    +$
                    {lateFee.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4 px-2">
                  <span className="text-white font-bold text-lg uppercase tracking-tighter">
                    Total Owed:
                  </span>
                  <span className="text-4xl font-black text-blue-500">
                    $
                    {totalOwed.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Section */}
        <div className="max-w-3xl mx-auto mb-20 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h4 className="text-blue-400 font-bold text-sm uppercase tracking-wider">
                Standard Fees
              </h4>
              <p className="text-ad-secondary text-xs leading-relaxed">
                Typically 1.5% to 2% per month or a flat $25-$50 fee depending
                on the contract.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-blue-400 font-bold text-sm uppercase tracking-wider">
                Is it legal?
              </h4>
              <p className="text-ad-secondary text-xs leading-relaxed">
                Yes, as long as the late fee terms were clearly stated in your
                original contract or invoice terms.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-blue-400 font-bold text-sm uppercase tracking-wider">
                Prevention
              </h4>
              <p className="text-ad-secondary text-xs leading-relaxed">
                Clear payment terms (e.g., Net 30) and automated reminders help
                prevent overdue bills.
              </p>
            </div>
          </div>

          <div className="p-8 bg-blue-600/5 border border-blue-500/10 rounded-2xl flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-blue-400 shrink-0" />
            <div>
              <h3 className="text-white font-bold mb-2">
                Pro Tip: Always mention fees upfront
              </h3>
              <p className="text-ad-secondary text-sm leading-relaxed">
                Most clients will pay on time if they know a 1.5% interest rate
                applies after the due date. Including this clause in your
                contracts is the best way to ensure cash flow.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#111111] rounded-2xl p-10 md:p-16 border border-white/10 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Spend less time chasing payments
          </h2>
          <p className="text-ad-secondary text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            AddInvoices sends automatic payment reminders before invoices go
            overdue — so you spend less time calculating late fees.
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
