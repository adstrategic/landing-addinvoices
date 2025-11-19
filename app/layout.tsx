import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "AdInvoices | Smart Invoicing Software for Freelancers & Businesses",
  description: "Create, send, and manage professional invoices in minutes. AdInvoices helps you automate billing, track clients, and get paid faster.",
  keywords: "invoicing software, invoice maker, online billing app, freelance invoicing, small business invoicing, invoice management system, AdInvoices by AdStrategic",
  generator: "AdStrategic",
  openGraph: {
    title: "AdInvoices | Smart Invoicing Software for Freelancers & Businesses",
    description: "Create, send, and manage professional invoices in minutes. AdInvoices helps you automate billing, track clients, and get paid faster.",
    type: "website",
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
