"use client";

import { Facebook, Instagram } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function ConventionalFooter() {
  const t = useTranslations("Homepage.Footer");

  return (
    <footer className="bg-gray-900 text-white pt-8 pb-16 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex items-end justify-center gap-8 mb-8 md:mb-12 relative">
          <div className="text-center transform -translate-y-4 md:-translate-y-6 relative z-10 flex flex-col items-center">
            <a
              href="https://addstrategic.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/addstrategic_banner.png"
                alt={t("bannerAlt")}
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
            {t("links.features")}
          </a>
          <a
            href="#pricing"
            className="text-gray-300 hover:text-white transition-colors duration-200 font-medium text-sm md:text-base"
          >
            {t("links.pricing")}
          </a>
          <a
            href="#testimonials"
            className="text-gray-300 hover:text-white transition-colors duration-200 font-medium text-sm md:text-base"
          >
            {t("links.testimonials")}
          </a>
          <a
            href="#faq"
            className="text-gray-300 hover:text-white transition-colors duration-200 font-medium text-sm md:text-base"
          >
            {t("links.faq")}
          </a>
        </div>

        <div className="flex justify-center gap-6 mb-10">
          <a
            href="https://www.facebook.com/profile.php?id=61555157255389"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
            aria-label={t("facebookLabel")}
          >
            <Facebook className="w-6 h-6" />
          </a>
          <a
            href="https://www.instagram.com/addstrategic/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors duration-200"
            aria-label={t("instagramLabel")}
          >
            <Instagram className="w-6 h-6" />
          </a>
        </div>

        <div className="text-center text-gray-400 text-sm border-t border-gray-700 pt-8">
          {t("copyright")}{" "}
          <Link href="/privacy" className="hover:text-white transition-colors">
            {t("privacy")}
          </Link>{" "}
          |{" "}
          <Link href="/terms" className="hover:text-white transition-colors">
            {t("terms")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
