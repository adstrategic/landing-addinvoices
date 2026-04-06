import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | AddInvoices",
  description: "Terms of Service for AddInvoices by AddStrategic LLC. Read our subscription terms, refund policy, promotional offer conditions, and acceptable use guidelines.",
  alternates: {
    canonical: "https://www.addinvoicesai.com/terms",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
