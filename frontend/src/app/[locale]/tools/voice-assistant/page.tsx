"use client";

import { ConventionalFooter } from "@/components/conventional-footer";
import Link from "next/link";
import {
  Mic,
  ChevronRight,
  CheckCircle2,
  Zap,
  MessageSquare,
  Plus,
  Users,
  Layout,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

export default function VoiceAssistantPage() {
  const commands = [
    {
      text: "Create an invoice for John for web design, $2,500",
      icon: <Plus className="w-5 h-5 text-blue-500" />,
    },
    {
      text: "Add a new client — Acme Corp, contact is Sarah, sarah@acme.com",
      icon: <Users className="w-5 h-5 text-blue-500" />,
    },
    {
      text: "Log an expense — $85 for software, category: tech tools",
      icon: <Zap className="w-5 h-5 text-blue-500" />,
    },
    {
      text: "Send a payment reminder to all overdue invoices this week",
      icon: <MessageSquare className="w-5 h-5 text-blue-500" />,
    },
    {
      text: "Show me my revenue this month",
      icon: <TrendingUp className="w-5 h-5 text-blue-500" />,
    },
    {
      text: "Create a contract for Sarah for branding, $4,000, 30 days",
      icon: <Layout className="w-5 h-5 text-blue-500" />,
    },
  ];

  return (
    <div className="min-h-screen w-full relative bg-ad-main font-sans overflow-x-hidden">

      <main className="relative z-10 pt-28 pb-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-12">
          <nav className="flex items-center space-x-2 text-xs md:text-sm text-ad-secondary">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/tools" className="hover:text-white transition-colors">
              Tools
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">Voice Assistant</span>
          </nav>
        </div>

        {/* HERO */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 text-center mb-32 relative">
          <div className="inline-block py-1.5 px-4 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold tracking-widest uppercase mb-6 border border-blue-500/20">
            Coming to AddInvoices
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
            Your Voice. <br />
            <span className="text-blue-500 text-shadow-glow">
              Your Business Assistant.
            </span>
          </h1>
          <p className="text-ad-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Manage invoices, clients, expenses and contracts without touching a
            screen. Just speak — AddInvoices listens.
          </p>

          {/* Sound Waveform Animation */}
          <div className="flex items-center justify-center gap-1 h-32 mb-12">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 md:w-1.5 bg-blue-500 rounded-full"
                animate={{
                  height: [20, 40, 60, 30, 80, 20, 50, 20][i % 8],
                  opacity: [0.3, 0.6, 1, 0.6, 0.3][i % 5],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.05,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <a
            href="https://app.addinvoicesai.com"
            className="inline-flex items-center px-10 py-5 btn-ad-primary rounded-2xl font-black text-lg shadow-xl shadow-blue-500/20 hover:-translate-y-1 transition-all group"
          >
            Get early access{" "}
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

        {/* SECCIÓN "What you can do" */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 mb-40">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Everything your business needs — just say it
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commands.map((cmd, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/[0.03] transition-all flex items-start gap-4"
              >
                <div className="bg-blue-600/10 p-3 rounded-xl">
                  <Mic className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-lg md:text-xl font-medium text-white italic tracking-tight leading-relaxed">
                  "{cmd.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECCIÓN "How it works" */}
        <section className="bg-white/[0.02] py-32 border-y border-white/10">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
                Simple as talking
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
              {[
                {
                  step: "01",
                  title: "Open AddInvoices",
                  desc: "Available on any device — Web, iOS, or Android.",
                },
                {
                  step: "02",
                  title: "Say what you need",
                  desc: "No commands to memorize. Just speak naturally in plain English.",
                },
                {
                  step: "03",
                  title: "Done",
                  desc: "It's handled. Invoice created, client saved, or expense logged instantly.",
                },
              ].map((step, i) => (
                <div key={i} className="relative">
                  <div className="text-7xl font-black text-white/5 absolute -top-10 -left-6 select-none leading-none">
                    {step.step}
                  </div>
                  <div className="relative z-10 space-y-4 pt-4">
                    <h3 className="text-2xl font-black text-white tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-ad-secondary leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECCIÓN CTA */}
        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-40">
          <div className="bg-[#111111] rounded-[40px] p-10 md:p-24 border border-white/10 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-blue-600/5 pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight italic">
                This isn't a chatbot. <br />
                <span className="text-blue-500">
                  It's your business, on autopilot.
                </span>
              </h2>
              <div className="space-y-4">
                <p className="text-ad-secondary text-lg">
                  AddInvoices Voice Assistant is available now in the app. No
                  learning curve. No commands to memorize. Just talk.
                </p>
              </div>
              <a
                href="https://app.addinvoicesai.com"
                className="inline-block px-12 py-6 btn-ad-primary rounded-2xl font-black text-xl shadow-xl shadow-blue-500/20 hover:-translate-y-1 transition-all"
              >
                Try AddInvoices Free →
              </a>
            </div>
          </div>
        </section>
      </main>

      <ConventionalFooter />

      {/* Structured SEO */}
      <head>
        <title>
          Voice Assistant for Business — Manage Invoices by Voice | AddInvoices
        </title>
        <meta
          name="description"
          content="Manage your entire business with your voice. Create invoices, add clients, log expenses, and send reminders — just by speaking. AddInvoices Voice Assistant."
        />
        <link
          rel="canonical"
          href="https://www.addinvoicesai.com/tools/voice-assistant"
        />
      </head>
    </div>
  );
}
