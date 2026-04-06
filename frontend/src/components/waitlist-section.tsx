"use client";

import { motion } from "framer-motion";

const APP_URL = "https://app.addinvoicesai.com/";

export type WaitlistSectionProps = {
  title: string;
  description: string;
  cta: string;
};

export function WaitlistSection({
  title,
  description,
  cta,
}: WaitlistSectionProps) {
  return (
    <section className="relative w-full py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-7xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-ad-secondary mb-8 max-w-2xl mx-auto">
            {description}
          </p>

          <motion.a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center btn-ad-primary h-12 px-10 font-bold text-lg shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            {cta}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
