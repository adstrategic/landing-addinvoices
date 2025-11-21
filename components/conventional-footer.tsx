import { Facebook, Instagram } from "lucide-react";

export function ConventionalFooter() {
  return (
    <footer className="bg-gray-900 text-white pt-8 pb-16 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex items-end justify-center gap-8 mb-8 md:mb-12 relative">
          {/* Middle column - Logo placeholder (elevated) */}
          <div className="text-center transform -translate-y-4 md:-translate-y-6 relative z-10 flex flex-col items-center">
            <a
              href="https://adstrategic.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/adstrategic-text-logo.png"
                alt="ADSTRATEGIC Logo"
                className="w-64 md:w-96 h-auto mb-4 object-contain hover:scale-105 transition-all duration-300 translate-y-12 md:translate-y-16 cursor-pointer"
              />
            </a>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8 md:mb-10">
          <a
            href="#features"
            className="text-gray-300 hover:text-white transition-colors duration-200 font-medium text-sm md:text-base"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-gray-300 hover:text-white transition-colors duration-200 font-medium text-sm md:text-base"
          >
            Pricing
          </a>
          <a
            href="#testimonials"
            className="text-gray-300 hover:text-white transition-colors duration-200 font-medium text-sm md:text-base"
          >
            Testimonials
          </a>
          <a
            href="#faq"
            className="text-gray-300 hover:text-white transition-colors duration-200 font-medium text-sm md:text-base"
          >
            FAQ
          </a>
        </div>

        <div className="flex justify-center gap-6 mb-10">
          <a
            href="https://www.facebook.com/profile.php?id=61555157255389"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
            aria-label="Facebook"
          >
            <Facebook className="w-6 h-6" />
          </a>
          <a
            href="https://www.instagram.com/adstrategic.agency/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors duration-200"
            aria-label="Instagram"
          >
            <Instagram className="w-6 h-6" />
          </a>
        </div>

        <div className="text-center text-gray-400 text-sm border-t border-gray-700 pt-8">
          © 2025 AddInvoices — Powered by AdStrategic |{" "}
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="#" className="hover:text-white transition-colors">
            Terms of Use
          </a>
        </div>
      </div>
    </footer>
  );
}
