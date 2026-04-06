import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | AddInvoices",
  description: "Privacy Policy for AddInvoices. Learn how AddStrategic LLC collects, uses, and protects your personal information.",
  alternates: {
    canonical: "https://www.addinvoicesai.com/privacy",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
