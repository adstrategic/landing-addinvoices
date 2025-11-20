"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Hero from "@/components/home/hero";
import Features from "@/components/features";
import { TestimonialsSection } from "@/components/testimonials";
import { NewReleasePromo } from "@/components/new-release-promo";
import { FAQSection } from "@/components/faq-section";
import { PricingSection } from "@/components/pricing-section";
import { ConventionalFooter } from "@/components/conventional-footer";
import { SponsorsSlider } from "@/components/sponsors-slider";
import { WhyChoose } from "@/components/why-choose";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollRotation, setScrollRotation] = useState(0);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "system");
    root.classList.add("dark");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);
      setScrollRotation(scrollY % 360);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileNavClick = (elementId: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        const headerOffset = 120;
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const handleDesktopNavClick = (elementId: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(elementId);
    if (element) {
      const headerOffset = 120;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen w-full relative bg-ad-main">
      {/* Pearl Mist Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(226, 232, 240, 0.12), transparent 60%), linear-gradient(135deg, #0A0F2C 0%, #111827 100%)",
        }}
      />

      {/* Desktop Header */}
      <header
        className={`sticky top-4 z-[9999] mx-auto hidden w-full flex-row items-center justify-between self-start rounded-full bg-ad-navbar/80 md:flex backdrop-blur-sm border border-border/50 shadow-lg transition-all duration-300 ${
          isScrolled ? "max-w-3xl px-2" : "max-w-5xl px-4"
        } py-2`}
      >
        {/* Logo */}
        <a
          className={`z-50 flex items-center justify-center gap-2 transition-all duration-300 ${
            isScrolled ? "ml-4" : ""
          }`}
          href="/"
        >
          <img
            src="/adtrategic-logo-blanco.png"
            alt="Adstrategic Logo"
            className="h-8 w-auto md:h-10"
            draggable={false}
            style={{
              transform: `rotate(${scrollRotation}deg)`,
              transition: "transform 0.1s linear",
            }}
          />
        </a>
        <div className="text-white font-bold text-lg tracking-wide absolute left-18">
          ADDINV.
        </div>

        {/* Desktop Navigation Links */}
        <div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-ad-secondary md:flex md:space-x-2">
          <a
            className="relative px-4 py-2 text-ad-secondary hover:text-ad-primary transition-colors cursor-pointer"
            onClick={(e) => handleDesktopNavClick("features", e)}
          >
            Features
          </a>
          <a
            className="relative px-4 py-2 text-ad-secondary hover:text-ad-primary transition-colors cursor-pointer"
            onClick={(e) => handleDesktopNavClick("pricing", e)}
          >
            Pricing
          </a>
          <a
            className="relative px-4 py-2 text-ad-secondary hover:text-ad-primary transition-colors cursor-pointer"
            onClick={(e) => handleDesktopNavClick("testimonials", e)}
          >
            Testimonials
          </a>
          <a
            className="relative px-4 py-2 text-ad-secondary hover:text-ad-primary transition-colors cursor-pointer"
            onClick={(e) => handleDesktopNavClick("faq", e)}
          >
            FAQ
          </a>
        </div>

        {/* Desktop Login / Sign Up */}
        <div className="flex items-center gap-4">
          <a
            href="/login"
            className="font-medium transition-colors hover:text-ad-primary text-ad-secondary text-sm"
          >
            Log In
          </a>
          <a
            href="https://adstrategic.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center btn-ad-primary shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset] px-4 py-2 text-sm"
          >
            Sign Up
          </a>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="sticky top-4 z-[9999] mx-4 flex w-auto flex-row items-center justify-between rounded-full bg-ad-navbar/80 md:hidden px-4 py-3">
        <a className="flex items-center justify-center gap-2" href="/">
          <img
            src="/adtrategic-logo-blanco.png"
            alt="Adstrategic Logo"
            className="h-7 w-auto md:h-8"
            draggable={false}
            style={{
              transform: `rotate(${scrollRotation}deg)`,
              transition: "transform 0.1s linear",
            }}
          />
        </a>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-background/50 border border-border/50 text-white"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-[80%] max-w-sm bg-ad-navbar border-l border-border/50 shadow-2xl p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col space-y-6 mt-16">
                <button
                  onClick={() => handleMobileNavClick("features")}
                  className="text-left px-4 py-3 text-xl font-medium text-ad-secondary hover:text-ad-primary transition-colors rounded-lg hover:bg-white/5"
                >
                  Features
                </button>
                <button
                  onClick={() => handleMobileNavClick("pricing")}
                  className="text-left px-4 py-3 text-xl font-medium text-ad-secondary hover:text-ad-primary transition-colors rounded-lg hover:bg-white/5"
                >
                  Pricing
                </button>
                <button
                  onClick={() => handleMobileNavClick("testimonials")}
                  className="text-left px-4 py-3 text-xl font-medium text-ad-secondary hover:text-ad-primary transition-colors rounded-lg hover:bg-white/5"
                >
                  Testimonials
                </button>
                <button
                  onClick={() => handleMobileNavClick("faq")}
                  className="text-left px-4 py-3 text-xl font-medium text-ad-secondary hover:text-ad-primary transition-colors rounded-lg hover:bg-white/5"
                >
                  FAQ
                </button>
                <div className="border-t border-border/50 pt-6 flex flex-col space-y-4">
                  <a
                    href="/login"
                    className="px-4 py-3 text-xl font-medium text-ad-secondary hover:text-ad-primary transition-colors rounded-lg hover:bg-white/5"
                  >
                    Log In
                  </a>
                  <a
                    href="https://adstrategic.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-4 text-xl font-bold text-center btn-ad-primary rounded-xl shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Sign Up
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <Hero />

      {/* Sections */}
      <SponsorsSlider />
      <div id="features">
        <Features />
      </div>
      <div id="pricing">
        <PricingSection />
      </div>
      <WhyChoose />
      <div id="testimonials">
        <TestimonialsSection />
      </div>
      <NewReleasePromo />
      <div id="faq">
        <FAQSection />
      </div>
      <ConventionalFooter />
    </div>
  );
}
