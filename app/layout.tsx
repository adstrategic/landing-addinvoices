import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "AddInvoices - Smart Invoicing Software for Freelancers & Businesses",
  description:
    "Streamline your billing with AddInvoices. The smart, easy-to-use invoicing software designed for freelancers and small businesses. Create professional invoices, track payments, and get paid faster.",
  keywords:
    "invoicing software, invoice maker, online billing app, freelance invoicing, small business invoicing, invoice management system, AddInvoices, AdStrategic, smart invoicing",
  generator: "AdStrategic",
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
    icon: "/adtrategic-logo-blanco.png",
    shortcut: "/adtrategic-logo-blanco.png",
    apple: "/adtrategic-logo-blanco.png",
  },
  openGraph: {
    title:
      "AddInvoices - Smart Invoicing Software for Freelancers & Businesses",
    description:
      "Streamline your billing with AddInvoices. The smart, easy-to-use invoicing software designed for freelancers and small businesses. Create professional invoices, track payments, and get paid faster.",
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
    description:
      "Streamline your billing with AddInvoices. Create professional invoices and get paid faster.",
    images: ["/adtrategic-logo-blanco.png"],
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} dark`}>
      <body className="dark">{children}</body>
    </html>
  );
}
