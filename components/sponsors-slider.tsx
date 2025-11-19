"use client";
import { motion } from "framer-motion";

const steps = [
  {
    number: "1️⃣",
    title: "Register and set up your company profile",
    description: "Create your account and customize your business information, logo, and branding.",
  },
  {
    number: "2️⃣",
    title: "Create your first invoice",
    description: "Add client details, items, taxes, and discounts. Use our templates or create your own.",
  },
  {
    number: "3️⃣",
    title: "Send it by email or direct link",
    description: "Share your invoice instantly via email or generate a secure payment link.",
  },
  {
    number: "4️⃣",
    title: "Track views, payments, and reminders automatically",
    description: "Monitor invoice status, receive payment notifications, and automate follow-ups.",
  },
];

export function SponsorsSlider() {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Invoice, collect, and organize — all in one place
          </h2>
          <p className="text-ad-secondary text-lg max-w-2xl mx-auto">
            Get started with AdInvoices in four simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">{step.number}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-ad-secondary text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
