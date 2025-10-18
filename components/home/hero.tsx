"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <section className="relative overflow-hidden min-h-screen flex flex-col">
        <div className="container mx-auto px-4 py-24 sm:py-32 relative z-10 flex-1 flex flex-col">
          <div className="mx-auto max-w-4xl text-center flex-1 flex flex-col justify-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Badge
                variant="secondary"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm"
              >
                <Sparkles className="h-4 w-4" />
                Enterprise AI Chatbot
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
            >
              <h1
                id="main-title"
                className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
              >
                An <strong>AI Chatbot</strong> that works <br />
                as your <strong>best assistant</strong>{" "}
                <em className="italic">enterprise</em>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground"
            >
              Answer questions, schedule appointments and manage documents with
              a futuristic and reliable experience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              {/* Primary Button */}
              <a
                href="/demo"
                className="btn-ad-primary px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                Try Chatbot
              </a>

              {/* Secondary Button */}
              <a
                href="/learn-more"
                className="btn-ad-secondary px-8 py-4 rounded-full font-medium text-lg border-2 border-ad-secondary text-ad-secondary hover:bg-ad-secondary hover:text-white transition-all duration-200"
              >
                Learn More
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
