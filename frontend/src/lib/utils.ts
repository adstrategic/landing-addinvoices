import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Locale } from "@/i18n/routing";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStrapiURL() {
  return process.env.STRAPI_BASE_URL;
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${getStrapiURL()}${url}`;
}

export function formatDate(lang: Locale, dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return lang === "en"
    ? date.toLocaleDateString("en-US", options)
    : date.toLocaleDateString("es", options);
}

export function drawWatermark(doc: any) {
  const totalPages = doc.internal.getNumberOfPages();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    // Site Accent Blue (Normalized #2563eb) at ~12% opacity simulated
    doc.setTextColor(228, 236, 253);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");

    const text = "Generated with AddInvoices";

    // 3 center positions across the document
    doc.text(text, pageWidth / 2, pageHeight * 0.25, {
      angle: 45,
      align: "center",
    });
    doc.text(text, pageWidth / 2, pageHeight * 0.5, {
      angle: 45,
      align: "center",
    });
    doc.text(text, pageWidth / 2, pageHeight * 0.75, {
      angle: 45,
      align: "center",
    });
  }
}

export function drawSmallAttribution(doc: any) {
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setTextColor(180, 180, 180); // Soft gray
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");

    const text = "Generated with AddInvoices · addinvoicesai.com";
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Bottom right corner
    doc.text(text, pageWidth - 15, pageHeight - 10, { align: "right" });
  }
}
