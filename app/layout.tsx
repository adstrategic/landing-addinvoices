import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "AddInvoices - Smart Invoicing Software for Freelancers & Businesses",
  description: "Streamline your billing with AddInvoices. The smart, easy-to-use invoicing software designed for freelancers and small businesses. Create professional invoices, track payments, and get paid faster.",
  keywords: "invoicing software, invoice maker, online billing app, freelance invoicing, small business invoicing, invoice management system, AddInvoices, AdStrategic, smart invoicing",
  generator: "AdStrategic",
  applicationName: "AddInvoices",
  authors: [{ name: "AdStrategic", url: "https://adstrategic.org" }],
  icons: {
    icon: "/adtrategic-logo-blanco.png",
    shortcut: "/adtrategic-logo-blanco.png",
    apple: "/adtrategic-logo-blanco.png",
  },
  openGraph: {
    title: "AddInvoices - Smart Invoicing Software for Freelancers & Businesses",
    description: "Streamline your billing with AddInvoices. The smart, easy-to-use invoicing software designed for freelancers and small businesses. Create professional invoices, track payments, and get paid faster.",
    type: "website",
    siteName: "AddInvoices",
    images: [
      {
        url: "/adtrategic-logo-blanco.png",
        width: 800,
        height: 600,
        alt: "AddInvoices Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AddInvoices - Smart Invoicing Software",
    description: "Streamline your billing with AddInvoices. Create professional invoices and get paid faster.",
    images: ["/adtrategic-logo-blanco.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="dark">{children}</body>
    </html>
  );
}
