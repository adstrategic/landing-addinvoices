import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });
const FALLBACK_BASE_URL = "https://addinvoicesia.com";
const LOCALE_TO_OG: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
};

function getBaseUrl() {
  return (process.env.NEXT_PUBLIC_BASE_URL || FALLBACK_BASE_URL).replace(
    /\/$/,
    "",
  );
}

function toLocalizedPath(locale: Locale, pathname: string) {
  const cleanPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (locale === routing.defaultLocale) return cleanPath;
  return cleanPath === "/" ? `/${locale}` : `/${locale}${cleanPath}`;
}

export async function generateMetadata(props: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const baseUrl = getBaseUrl();
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const canonicalPath = toLocalizedPath(locale, "/");
  const canonicalUrl = `${baseUrl}${canonicalPath}`;

  return {
    metadataBase: new URL(baseUrl),
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(",").map((keyword) => keyword.trim()),
    generator: "ADDSTRATEGIC",
    applicationName: "AddInvoices",
    authors: [
      {
        name: "Nicolas Forero Quevedo",
        url: "https://www.linkedin.com/in/nicolas-forero-quevedo/",
      },
      {
        name: "Santiago Arias Camero",
        url: "https://www.linkedin.com/in/santiago-arias-333990268/",
      },
    ],
    icons: {
      icon: "/addstrategic-logo-blanco.png",
      shortcut: "/addstrategic-logo-blanco.png",
      apple: "/addstrategic-logo-blanco.png",
    },
    alternates: {
      canonical: canonicalPath,
      languages: Object.fromEntries(
        routing.locales.map((altLocale) => [
          altLocale,
          toLocalizedPath(altLocale, "/"),
        ]),
      ),
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonicalUrl,
      type: "website",
      siteName: "AddInvoices",
      locale: LOCALE_TO_OG[locale],
      images: [
        {
          url: "/addinvoices.png",
          width: 1640,
          height: 924,
          alt: t("imageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle"),
      description: t("twitterDescription"),
      images: ["/addinvoices.png"],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.className} dark`}>
      <body className="dark">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
