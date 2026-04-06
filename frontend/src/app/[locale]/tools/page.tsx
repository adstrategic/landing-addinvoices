"use client";

import { ConventionalFooter } from "@/components/conventional-footer";
import Link from "next/link";
import {
  FileText,
  Mic,
  Calculator,
  Layout,
  FileSignature,
  ArrowRight,
  Sparkles,
  Hash,
  QrCode,
  Mail,
  Image as ImageIcon,
  FileOutput,
  Lightbulb,
  Receipt,
} from "lucide-react";
import { motion } from "framer-motion";

const groups = [
  {
    title: "Invoicing & Billing",
    tools: [
      {
        title: "Invoice Generator",
        description:
          "Create professional PDF invoices instantly in your browser.",
        href: "/tools/invoice-generator",
        icon: FileText,
        color: "bg-blue-600",
      },
      {
        title: "Voice Assistant",
        description: "Manage your entire business just by speaking",
        href: "/tools/voice-assistant",
        icon: Mic,
        color: "bg-blue-600",
      },
      {
        title: "Receipt Generator",
        description: "Generate professional payment receipts for your clients.",
        href: "/tools/receipt-generator",
        icon: Receipt,
        color: "bg-emerald-600",
      },
      {
        title: "Invoice Numbering",
        description:
          "Create a professional numbering system for your business.",
        href: "/tools/invoice-number-generator",
        icon: Hash,
        color: "bg-gray-600",
      },
    ],
  },
  {
    title: "Documents & Conversion",
    tools: [
      {
        title: "Contract Generator",
        description: "Create freelance and service agreements in minutes.",
        href: "/tools/contract-generator",
        icon: FileSignature,
        color: "bg-amber-600",
      },
      {
        title: "Invoice Templates",
        description: "Browse 6+ professional designs for any industry.",
        href: "/tools/invoice-template",
        icon: Layout,
        color: "bg-blue-400",
      },
      {
        title: "Word to PDF",
        description: "Convert .docx files to PDF 100% locally.",
        href: "/tools/word-to-pdf",
        icon: FileOutput,
        color: "bg-indigo-600",
      },
      {
        title: "Image to PDF",
        description: "Combine multiple images into a single PDF document.",
        href: "/tools/image-to-pdf",
        icon: ImageIcon,
        color: "bg-rose-600",
      },
    ],
  },
  {
    title: "Calculators",
    tools: [
      {
        title: "Sales Tax Calculator",
        description: "Calculate sales tax for any US state instantly.",
        href: "/tools/sales-tax-calculator",
        icon: Calculator,
        color: "bg-blue-500",
      },
      {
        title: "Profit Margin",
        description: "Calculate margins, markups, and optimal pricing.",
        href: "/tools/profit-margin-calculator",
        icon: Sparkles,
        color: "bg-teal-600",
      },
      {
        title: "Freelance Rate",
        description: "Find out how much you should charge per hour.",
        href: "/tools/freelance-rate-calculator",
        icon: Calculator,
        color: "bg-indigo-500",
      },
      {
        title: "Late Fee Calculator",
        description: "Calculate interest for overdue client payments.",
        href: "/tools/late-fee-calculator",
        icon: Calculator,
        color: "bg-red-500",
      },
    ],
  },
  {
    title: "Business Essentials",
    tools: [
      {
        title: "QR Code Generator",
        description: "Create payment, URL, or contact QR codes for free.",
        href: "/tools/qr-code-generator",
        icon: QrCode,
        color: "bg-cyan-600",
      },
      {
        title: "Email Signatures",
        description: "Generate professional HTML signatures for your mail.",
        href: "/tools/email-signature-generator",
        icon: Mail,
        color: "bg-orange-600",
      },
      {
        title: "Business Name Gen",
        description: "Find the perfect name for your new venture instantly.",
        href: "/tools/business-name-generator",
        icon: Lightbulb,
        color: "bg-yellow-500",
      },
    ],
  },
];

export default function ToolsHubPage() {
  return (
    <div className="min-h-screen w-full relative bg-ad-main font-sans overflow-x-hidden">

      <main className="relative z-10 pt-28 pb-32 px-4 md:px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-24 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-blue-400 text-[10px] font-bold tracking-widest uppercase mb-6 shadow-2xl [color-scheme:dark]">
              Business Toolkit
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              Free tools for your <br />{" "}
              <span className="text-blue-500">growing business.</span>
            </h1>
            <p className="text-ad-secondary text-lg max-w-2xl mx-auto leading-relaxed">
              Professional, high-quality tools to help you manage your
              invoicing, documents, and business admin — 100% free and secure.
            </p>
          </motion.div>
        </section>

        {/* Tools Grid by Groups */}
        <div className="space-y-32">
          {groups.map((group, gIdx) => (
            <section key={group.title} className="space-y-10">
              <div className="flex items-center gap-6">
                <h2 className="text-2xl font-black text-white whitespace-nowrap tracking-tight">
                  {group.title}
                </h2>
                <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {group.tools.map((tool, tIdx) => (
                  <motion.div
                    key={tool.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: tIdx * 0.1 }}
                  >
                    <Link
                      href={tool.href}
                      className="group flex flex-col h-full bg-[#111111] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.03] transition-all hover:shadow-2xl hover:shadow-blue-500/5 relative overflow-hidden"
                    >
                      <div
                        className={`w-12 h-12 ${tool.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}
                      >
                        <tool.icon className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1 space-y-3">
                        <h3 className="text-white font-bold text-lg leading-tight group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                          {tool.title}
                        </h3>
                        <p className="text-ad-secondary text-xs leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                          {tool.description}
                        </p>
                      </div>

                      <div className="mt-8 flex items-center gap-2 text-blue-500 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        Open Tool{" "}
                        <ArrowRight className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform" />
                      </div>

                      {/* Subtle background glow on hover */}
                      <div
                        className={`absolute top-0 right-0 w-24 h-24 ${tool.color} opacity-0 group-hover:opacity-10 blur-3xl rounded-full transition-opacity`}
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Global CTA Section */}
        <section className="mt-48 relative">
          <div className="bg-[#111111] rounded-[40px] p-12 md:p-24 border border-white/10 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-blue-600/5 pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-10">
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                Tired of manual docs? <br />{" "}
                <span className="text-blue-500">Upgrade to AddInvoices.</span>
              </h2>
              <p className="text-ad-secondary text-xl font-medium max-w-xl mx-auto leading-relaxed">
                Join thousands of freelancers and agencies who save hours every
                week by automating their invoicing and collections.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href="https://app.addinvoicesai.com"
                  className="w-full sm:w-auto px-12 py-6 btn-ad-primary rounded-2xl font-black text-lg shadow-xl shadow-blue-500/20 hover:-translate-y-1 transition-all"
                >
                  Get Started Free
                </a>
                <a
                  href="https://www.addinvoicesai.com/#features"
                  className="w-full sm:w-auto px-12 py-6 bg-white/5 text-white border border-white/10 rounded-2xl font-black text-lg hover:bg-white/10 shadow-xl transition-all [color-scheme:dark]"
                >
                  See Features
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ConventionalFooter />
    </div>
  );
}
