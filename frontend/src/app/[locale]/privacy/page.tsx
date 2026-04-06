"use client";

import { useEffect, useState } from "react";
import { ConventionalFooter } from "@/components/conventional-footer";
import Link from "next/link";
import { ChevronRight, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const tocItems = [
  { id: "information-collected", label: "1. Information We Collect" },
  { id: "how-we-use", label: "2. How We Use Information" },
  { id: "how-we-share", label: "3. How We Share Information" },
  { id: "retention", label: "4. Data Retention" },
  { id: "cookies", label: "5. Cookies & Tracking" },
  { id: "your-rights", label: "6. Your Rights & Choices" },
  { id: "security", label: "7. Data Security" },
  { id: "children", label: "8. Children's Privacy" },
  { id: "international", label: "9. International Transfers" },
  { id: "policy-changes", label: "10. Changes to Policy" },
  { id: "contact-privacy", label: "11. Contact Us" },
];

export default function PrivacyPage() {
  const [activeId, setActiveId] = useState("");
  const [isTocOpen, setIsTocOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        if (intersecting.length > 0) {
          const visible = intersecting[intersecting.length - 1]; // Pick the latest intersecting section when scrolling down
          if (visible) {
            setActiveId(visible.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: [0, 1] },
    );

    const sections = document.querySelectorAll("h2[id]");
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsTocOpen(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative bg-ad-main font-sans selection:bg-blue-500/30 pb-20">
      {/* Pearl Mist Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(226, 232, 240, 0.12), transparent 60%), linear-gradient(135deg, #0A0F2C 0%, #111827 100%)",
        }}
      />

      {/* Hero */}
      <section className="relative z-10 pt-32 pb-16 px-6 border-b border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center space-x-2 text-[13px] text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/80">Privacy Policy</span>
          </nav>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-white/40 text-sm md:text-base font-medium">
            Effective Date: March 19, 2026 · Last Updated: March 19, 2026
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 py-16 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Sidebar TOC - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0 sticky top-32 self-start max-h-[calc(100vh-160px)] overflow-y-auto pr-4 custom-scrollbar z-30">
            <div className="space-y-1">
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "block w-full text-left py-2 text-[13px] transition-all duration-200 border-l-2 pl-4",
                    activeId === item.id
                      ? "text-blue-500 border-blue-500 font-bold"
                      : "text-white/40 border-transparent hover:text-white hover:border-white/10",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Mobile TOC Accordion */}
          <div className="lg:hidden mb-8">
            <button
              onClick={() => setIsTocOpen(!isTocOpen)}
              className="w-full flex items-center justify-between p-4 bg-white/[0.03] border border-white/10 rounded-xl text-sm font-bold"
            >
              <span className="flex items-center gap-3">
                <Menu className="w-4 h-4 text-blue-500" />
                Jump to section
              </span>
              <ChevronRight
                className={cn(
                  "w-4 h-4 transition-transform",
                  isTocOpen && "rotate-90",
                )}
              />
            </button>

            {isTocOpen && (
              <div className="mt-2 bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden divide-y divide-white/[0.05]">
                {tocItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full text-left px-5 py-3 text-[13px] text-white/60 hover:bg-white/[0.05] hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Legal Text Content */}
          <div className="flex-1 max-w-[680px]">
            <article className="prose prose-invert prose-blue max-w-none prose-p:text-white/70 prose-p:leading-relaxed prose-p:mb-6 prose-strong:text-white prose-strong:font-bold">
              <p>
                AddStrategic LLC ("AddStrategic", "AddInvoices", "we", "us", or
                "our") is committed to protecting your privacy. This Privacy
                Policy describes what personal information we collect, how we
                use it, with whom we share it, and what rights you have with
                respect to it.
              </p>
              <p>
                This policy applies to all users of the AddInvoices web
                application, mobile application, marketing website, and free
                browser-based tools (collectively, the "Service"). By using the
                Service, you agree to the collection and use of your information
                as described in this policy.
              </p>

              <hr className="border-white/10 my-14" />

              <h2
                id="information-collected"
                className="text-2xl md:text-3xl font-black text-white mt-0 mb-6 tracking-tight"
              >
                1. Information We Collect
              </h2>
              <p>
                <strong>1.1 Information You Provide Directly</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6 text-white/70">
                <li>
                  <strong>Account data:</strong> Full name, email address,
                  password (stored in hashed form), business name, phone number,
                  and billing address provided at registration.
                </li>
                <li>
                  <strong>Payment data:</strong> Billing and payment method
                  information, processed and stored by Stripe or PayPal.
                  AddStrategic does not store full credit or debit card numbers.
                </li>
                <li>
                  <strong>Business content:</strong> Invoices, contracts,
                  receipts, expense records, client information, and other
                  content you create or upload within the Service.
                </li>
                <li>
                  <strong>Communications:</strong> Messages, support requests,
                  feedback, and any other communications you send to us.
                </li>
              </ul>
              <p>
                <strong>1.2 Information Collected Automatically</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6 text-white/70">
                <li>
                  <strong>Usage data:</strong> Features used, pages visited,
                  actions performed, session duration, and interaction logs.
                </li>
                <li>
                  <strong>Technical data:</strong> Browser type, operating
                  system, device type, IP address, device identifiers, and
                  referring URLs.
                </li>
              </ul>
              <p>
                <strong>1.3 Free Tools — No Data Collection</strong>
              </p>
              <p>
                All free tools process data entirely within your browser.
                AddStrategic does not collect, store, transmit, or retain any
                information you enter into the Free Tools. Files processed
                locally never leave your device.
              </p>

              <hr className="border-white/10 my-14" />

              <h2
                id="how-we-use"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight"
              >
                2. How We Use Your Information
              </h2>
              <p>
                We use the information we collect to operate your account,
                process payments, deliver our services, send transactional
                emails, and analyze usage patterns to improve the Service. We
                also use data to prevent fraud, ensure security, and comply with
                legal obligations. We use your content to enforce our{" "}
                <Link href="/terms" className="text-blue-500 hover:underline">
                  Terms of Service
                </Link>{" "}
                and our other policies.
              </p>

              <hr className="border-white/10 my-14" />

              <h2
                id="how-we-share"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight"
              >
                3. How We Share Your Information
              </h2>
              <p>
                AddStrategic does not sell your personal information. We share
                data only with trusted partners necessary to provide the
                Service, such as Stripe and PayPal for payments, and cloud
                infrastructure providers for hosting. We may also disclose
                information when required by law or to protect legal rights.
              </p>

              <hr className="border-white/10 my-14" />

              <h2
                id="retention"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight"
              >
                4. Data Retention
              </h2>
              <p>
                We retain your account and business data as long as your account
                is active. Billing and transaction records are kept for at least
                7 years for tax and legal compliance. You can request deletion
                of your account at any time.
              </p>

              <hr className="border-white/10 my-14" />

              <h2
                id="cookies"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight"
              >
                5. Cookies and Tracking Technologies
              </h2>
              <p>
                We use cookies and similar technologies to remember your
                preferences, secure your account, and analyze service
                performance. You can manage cookie settings through your
                browser, though some features may be impaired if strictly
                necessary cookies are disabled.
              </p>

              <hr className="border-white/10 my-14" />

              <h2
                id="your-rights"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight"
              >
                6. Your Rights and Choices
              </h2>
              <p>
                Depending on your location, you may have rights to access,
                correct, delete, or port your personal data. You can also object
                to certain processing or withdraw consent. To exercise these
                rights, contact us at{" "}
                <a
                  href="mailto:privacy@addinvoicesai.com"
                  className="text-blue-500 hover:underline"
                >
                  privacy@addinvoicesai.com
                </a>
                .
              </p>

              <hr className="border-white/10 my-14" />

              <h2
                id="security"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight"
              >
                7. Data Security
              </h2>
              <p>
                We implement technical and organizational measures to protect
                your data, including encryption of data in transit (TLS/HTTPS),
                secure password hashing, and role-based access controls.
                However, no internet-based service can guarantee 100% security.
              </p>

              <hr className="border-white/10 my-14" />

              <h2
                id="children"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight"
              >
                8. Children's Privacy
              </h2>
              <p>
                The Service is not intended for individuals under 18. We do not
                knowingly collect personal information from minors. If we learn
                we have collected data from a child, we will delete it promptly.
              </p>

              <hr className="border-white/10 my-14" />

              <h2
                id="international"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight"
              >
                9. International Data Transfers
              </h2>
              <p>
                AddStrategic is based in the United States. Your information may
                be transferred to and processed in the US. We implement
                appropriate safeguards for international transfers as required
                by applicable laws.
              </p>

              <hr className="border-white/10 my-14" />

              <h2
                id="policy-changes"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight"
              >
                10. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this policy periodically. We will notify you of
                material changes by email or a prominent notice on the Service
                at least 14 days before they take effect.
              </p>

              <hr className="border-white/10 my-14" />

              <h2
                id="contact-privacy"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight"
              >
                11. Contact Us
              </h2>
              <p>AddStrategic LLC — AddInvoices</p>
              <ul className="list-none space-y-1 text-white/70">
                <li>
                  Privacy inquiries:{" "}
                  <a
                    href="mailto:privacy@addinvoicesai.com"
                    className="text-blue-500 hover:underline"
                  >
                    privacy@addinvoicesai.com
                  </a>
                </li>
                <li>
                  Legal inquiries:{" "}
                  <a
                    href="mailto:legal@addinvoicesai.com"
                    className="text-blue-500 hover:underline"
                  >
                    legal@addinvoicesai.com
                  </a>
                </li>
                <li>
                  Support:{" "}
                  <a
                    href="mailto:support@addinvoicesai.com"
                    className="text-blue-500 hover:underline"
                  >
                    support@addinvoicesai.com
                  </a>
                </li>
                <li>
                  Website:{" "}
                  <Link href="/" className="text-blue-500 hover:underline">
                    https://www.addinvoicesai.com
                  </Link>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <ConventionalFooter />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
