"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const pricingPlans = [
  {
    name: "Basic",
    monthlyPrice: 11.99,
    description: "Perfect for freelancers & small teams",
    features: [
      "Unlimited invoices",
      "Payment reminders",
      "Custom templates",
      "Web & mobile access",
      "Client management",
      "Invoice tracking (draft, sent, paid)",
    ],
    popular: false,
    cta: "Start Free Trial",
  },
  {
    name: "Pro",
    monthlyPrice: 19.99,
    description: "For companies & teams",
    features: [
      "Everything in Basic",
      "Online payments (Stripe, PayPal)",
      "Advanced stats & analytics",
      "Premium templates",
      "Priority support",
      "Team collaboration",
    ],
    popular: true,
    cta: "Get Pro Access",
  },
  {
    name: "Lifetime",
    monthlyPrice: 100,
    description: "One-time payment for lifetime access",
    highlight: "Only for first 100 users!",
    features: [
      "Everything in Pro",
      "Faster updates",
      "Priority support",
      "Early access to new features",
      "Lifetime updates",
      "No monthly fees",
    ],
    popular: false,
    cta: "Get Lifetime Access",
  },
];

export function PricingSection() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#2563eb]" />
            <span className="text-sm font-medium text-white/80">Pricing</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent mb-4">
            Simple plans with no hidden fees
          </h2>

          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
            AddInvoices adapts to your business — whether you're a freelancer or
            a growing company.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative rounded-2xl p-8 backdrop-blur-sm border transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-b from-[#2563eb]/10 to-transparent border-[#2563eb]/30 shadow-lg shadow-[#2563eb]/10"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white text-sm font-medium px-4 py-2 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">
                    ${plan.monthlyPrice}
                  </span>
                  <span className="text-white/60 text-lg">
                    {plan.name === "Lifetime" ? "/one-time" : "/month"}
                  </span>
                </div>
                <p className="text-white/60 text-sm">{plan.description}</p>
                {plan.highlight && (
                  <p className="text-white/60 text-sm font-bold">
                    {plan.highlight}
                  </p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#2563eb] flex-shrink-0" />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                  plan.popular
                    ? "bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white shadow-lg shadow-[#2563eb]/25 hover:shadow-[#2563eb]/40"
                    : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                }`}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.a
            href="/signup"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block text-[#2563eb] hover:text-[#3b82f6] font-medium transition-colors"
          >
            Compare Plans →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
