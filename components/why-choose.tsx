"use client";

import { motion } from "framer-motion";
import { Sparkles, Mic, Bell, TrendingUp, Palette } from "lucide-react";

const highlights = [
  {
    icon: <Mic className="h-6 w-6" />,
    title: "Invoice by Voice",
    description: "Create invoices using your voice for ultimate convenience.",
  },
  {
    icon: <Bell className="h-6 w-6" />,
    title: "Smart Reminders",
    description: "Automated payment reminders and intelligent follow-ups.",
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "AI-Driven Insights",
    description: "Get intelligent insights about your business performance.",
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: "Branded Templates",
    description: "Custom templates that match your company identity.",
  },
];

export function WhyChoose() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#2563eb]" />
            <span className="text-sm font-medium text-white/80">Why Choose Us</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent mb-4">
            More than just an invoice maker
          </h2>

          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            AddInvoices helps you sell, collect, and grow — powered by{" "}
            <strong className="text-white">AI and intelligent automation</strong>.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-[#2563eb] mb-4">{highlight.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {highlight.title}
              </h3>
              <p className="text-white/60 text-sm">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

