import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <>
      <section className="relative overflow-hidden min-h-screen flex flex-col">
        {/* Background Image - Only visible on lg and above */}
        <div
          className="hidden lg:block lg:bg-contain -mx-32 absolute inset-0 z-0 bg-center bg-no-repeat "
          style={{
            backgroundImage: "url(/addinvoices_bg.png)",
          }}
        />
        <div
          className="block lg:hidden absolute inset-0 z-0 bg-center bg-no-repeat "
          style={{
            backgroundImage: "url(/waves.png)",
          }}
        />

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
                Smart Invoicing Software
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
                Create, send, and manage your invoices in minutes with{" "}
                <strong>AddInvoices AI</strong>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground"
            >
              The smart invoicing app built for freelancers, small businesses,
              and growing companies. Create professional invoices, get paid
              faster, and automate your workflow with an{" "}
              <strong>AI assistant</strong> that does the heavy lifting for you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              {/* Primary Button */}
              <a
                href="#waitlist"
                className="btn-ad-primary px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                Get early access
              </a>

              {/* Secondary Button */}
              <a
                href="#pricing"
                className="btn-ad-secondary px-8 py-4 rounded-full font-medium text-lg border-2 border-ad-secondary text-ad-secondary hover:bg-ad-secondary hover:text-white transition-all duration-200"
              >
                View Pricing
              </a>
            </motion.div>

            {/* SEO Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 text-sm text-muted-foreground text-center"
            >
              AddInvoices — Smart invoicing software by ADDSTRATEGIC.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <img
                  src="/playstore.webp"
                  alt="Get it on Google Play"
                  className="h-12 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                />
                <img
                  src="/appstore.webp"
                  alt="Download on the App Store"
                  className="h-12 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
