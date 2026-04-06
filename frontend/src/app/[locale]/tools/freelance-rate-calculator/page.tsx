"use client";

import { useState } from "react";
import { ConventionalFooter } from "@/components/conventional-footer";
import Link from "next/link";
import { ChevronRight, DollarSign, Clock, Plus, Trash2 } from "lucide-react";

interface Expense {
  id: string;
  label: string;
  amount: number;
}

export default function FreelanceRateCalculatorPage() {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: "1", label: "Rent / Mortgage", amount: 1500 },
    { id: "2", label: "Software & Subs", amount: 100 },
    { id: "3", label: "Insurance", amount: 200 },
    { id: "4", label: "Internet & Phone", amount: 80 },
  ]);

  const [desiredSalary, setDesiredSalary] = useState<number>(60000);
  const [vacationWeeks, setVacationWeeks] = useState<number>(4);
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState<number>(30);
  const [nonBillablePercent, setNonBillablePercent] = useState<number>(20);

  const totalMonthlyExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalAnnualExpenses = totalMonthlyExpenses * 12;
  const totalRevenueNeeded = totalAnnualExpenses + desiredSalary;

  const workingWeeksPerYear = 52 - vacationWeeks;
  const totalAnnualBillableHours =
    workingWeeksPerYear * billableHoursPerWeek * (1 - nonBillablePercent / 100);

  const minimumRate =
    totalAnnualBillableHours > 0
      ? totalRevenueNeeded / totalAnnualBillableHours
      : 0;
  const recommendedRate = minimumRate / (1 - 0.2); // 20% margin

  const addExpense = () => {
    setExpenses([
      ...expenses,
      {
        id: Math.random().toString(36).substr(2, 9),
        label: "Other",
        amount: 0,
      },
    ]);
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const updateExpense = (id: string, field: "label" | "amount", value: any) => {
    setExpenses(
      expenses.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    );
  };

  const getInsight = () => {
    if (recommendedRate < 25)
      return "Most freelancers in your field charge $40-80/hr. You may be undercharging.";
    if (recommendedRate < 60)
      return "You're in the typical range for independent professionals. Consider raising rates as you gain experience.";
    return "Strong rate. Make sure your invoicing and contracts support your premium positioning.";
  };

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
            Freelance Rate Calculator
          </span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Freelance Rate Calculator
          </h1>
          <p className="text-ad-secondary text-lg max-w-2xl mx-auto">
            Find out exactly what to charge per hour. Based on your real
            expenses and income goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Inputs Section */}
          <div className="lg:col-span-12 space-y-12 max-w-2xl mx-auto w-full">
            {/* Monthly Expenses */}
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 space-y-6 shadow-2xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-blue-500" />
                Your Monthly Expenses
              </h2>
              <div className="space-y-4">
                {expenses.map((exp) => (
                  <div key={exp.id} className="flex items-center gap-4">
                    <input
                      type="text"
                      value={exp.label}
                      onChange={(e) =>
                        updateExpense(exp.id, "label", e.target.value)
                      }
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500/50 outline-none [color-scheme:dark]"
                    />
                    <div className="w-32 relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                        $
                      </span>
                      <input
                        type="number"
                        value={exp.amount}
                        onChange={(e) =>
                          updateExpense(
                            exp.id,
                            "amount",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white text-sm text-right focus:border-blue-500/50 outline-none [color-scheme:dark]"
                      />
                    </div>
                    <button
                      onClick={() => removeExpense(exp.id)}
                      className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addExpense}
                  className="flex items-center text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add custom expense
                </button>
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                <span className="text-gray-400 font-medium">
                  Total monthly expenses:
                </span>
                <span className="text-xl font-bold text-white">
                  ${totalMonthlyExpenses.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Income Goals */}
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 space-y-6 shadow-2xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-500" />
                Income & Capacity
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Desired Annual Salary ($)
                  </label>
                  <input
                    type="number"
                    value={desiredSalary}
                    onChange={(e) =>
                      setDesiredSalary(parseFloat(e.target.value) || 0)
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:border-blue-500/50 outline-none [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vacation Time (Weeks/Year)
                  </label>
                  <input
                    type="number"
                    value={vacationWeeks}
                    onChange={(e) =>
                      setVacationWeeks(parseFloat(e.target.value) || 0)
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:border-blue-500/50 outline-none [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Billable Hours / Week
                  </label>
                  <input
                    type="number"
                    value={billableHoursPerWeek}
                    onChange={(e) =>
                      setBillableHoursPerWeek(parseFloat(e.target.value) || 0)
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:border-blue-500/50 outline-none [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Non-billable Time (%)
                  </label>
                  <input
                    type="number"
                    value={nonBillablePercent}
                    onChange={(e) =>
                      setNonBillablePercent(parseFloat(e.target.value) || 0)
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:border-blue-500/50 outline-none [color-scheme:dark]"
                  />
                </div>
              </div>
            </div>

            {/* Result Section */}
            <div className="bg-blue-600 rounded-2xl p-10 text-center shadow-2xl shadow-blue-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 space-y-8">
                <div>
                  <div className="text-white/70 text-sm font-bold uppercase tracking-widest mb-2">
                    Your minimum hourly rate
                  </div>
                  <div className="text-6xl font-black text-white">
                    ${minimumRate.toFixed(2)}
                    <span className="text-2xl font-medium opacity-60">/hr</span>
                  </div>
                </div>

                <div className="inline-block px-8 py-6 bg-white border border-white rounded-2xl shadow-xl transition-transform group-hover:scale-105 duration-500">
                  <div className="text-blue-900/50 text-xs font-bold uppercase tracking-widest mb-1">
                    Recommended Rate (with 20% buffer)
                  </div>
                  <div className="text-4xl font-black text-blue-600">
                    ${recommendedRate.toFixed(2)}
                    <span className="text-lg font-medium opacity-60">/hr</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/20">
                  <p className="text-white/90 text-sm italic">
                    "{getInsight()}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#111111] rounded-2xl p-10 md:p-16 border border-white/10 text-center mt-24 relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Professional invoicing for professional rates.
          </h2>
          <p className="text-ad-secondary text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Once you know your rate — invoice at that rate professionally.
            AddInvoices makes it easy to create, send, and get paid on time.
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
