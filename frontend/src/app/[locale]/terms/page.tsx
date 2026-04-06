"use client";

import { useEffect, useState } from "react";
import { ConventionalFooter } from "@/components/conventional-footer";
import Link from "next/link";
import { ChevronRight, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const tocItems = [
  { id: "description", label: "1. Description of Service" },
  { id: "accounts", label: "2. Accounts and Registration" },
  { id: "billing", label: "3. Subscription Plans and Billing" },
  { id: "free-trial", label: "4. Free Trial" },
  { id: "promotion", label: "5. Promotional Offer" },
  { id: "free-tools", label: "6. Free Tools" },
  { id: "acceptable-use", label: "7. Acceptable Use" },
  { id: "user-content", label: "8. User Content" },
  { id: "ip", label: "9. Intellectual Property" },
  { id: "privacy-ref", label: "10. Privacy" },
  { id: "third-party", label: "11. Third-Party Integrations" },
  { id: "cancellation", label: "12. Cancellation & Termination" },
  { id: "refunds", label: "13. Refund Policy" },
  { id: "disclaimer", label: "14. Disclaimer of Warranties" },
  { id: "liability", label: "15. Limitation of Liability" },
  { id: "indemnification", label: "16. Indemnification" },
  { id: "governing-law", label: "17. Governing Law" },
  { id: "changes", label: "18. Changes to Terms" },
  { id: "general", label: "19. General Provisions" },
  { id: "contact", label: "20. Contact" },
];

export default function TermsPage() {
  const [activeId, setActiveId] = useState("");
  const [isTocOpen, setIsTocOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section that is currently intersecting and closest to the top of our viewport threshold
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        if (intersecting.length > 0) {
          // Identify the entry with the highest boundingClientRect.top (closest to our rootMargin top)
          const visible = intersecting[intersecting.length - 1];
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
            <span className="text-white/80">Terms of Service</span>
          </nav>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Terms of Service
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
                Please read these Terms of Service ("Terms", "Agreement")
                carefully before using the AddInvoices website, web application,
                mobile application, free tools, or any related services
                (collectively, the "Service") operated by AddStrategic LLC
                ("AddStrategic", "AddInvoices", "we", "us", or "our").
              </p>
              <p>
                By accessing or using the Service, you confirm that you are at
                least 18 years of age, that you have read and understood these
                Terms, and that you agree to be bound by them. If you are using
                the Service on behalf of a company or legal entity, you
                represent that you have the authority to bind that entity to
                these Terms.
              </p>
              <p>
                If you do not agree with any part of these Terms, you must
                immediately discontinue your use of the Service.
              </p>

              <hr className="border-white/10 my-14" />

              <h2
                id="description"
                className="text-2xl md:text-3xl font-black text-white mt-0 mb-6 tracking-tight"
              >
                1. Description of Service
              </h2>
              <p>
                AddInvoices is a cloud-based Software as a Service (SaaS)
                platform that provides tools for invoicing, payment collection,
                expense tracking, client management, contract generation,
                voice-assisted business operations, and related functions. The
                Service includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6 text-white/70">
                <li>
                  The AddInvoices web application at app.addinvoicesai.com
                </li>
                <li>The AddInvoices marketing website at addinvoicesai.com</li>
                <li>Free browser-based tools at addinvoicesai.com/tools</li>
                <li>Mobile applications on iOS and Android</li>
                <li>The AddInvoices Voice Assistant feature</li>
                <li>
                  Any future products, features, or services offered under the
                  AddInvoices or AddStrategic brand
                </li>
              </ul>

              <hr className="border-white/10 my-14" />

              <h2
                id="accounts"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight"
              >
                2. Accounts and Registration
              </h2>
              <p>
                <strong>2.1 Account Creation.</strong> To access the full
                features of the Service, you must register for an account. You
                agree to provide accurate, complete, and current information at
                registration and to keep it updated at all times. Providing
                false or incomplete information may result in immediate account
                termination.
              </p>
              <p>
                <strong>2.2 Account Security.</strong> You are solely
                responsible for maintaining the confidentiality of your login
                credentials and for all activity occurring under your account.
                You must notify us immediately at{" "}
                <a
                  href="mailto:legal@addinvoicesai.com"
                  className="text-blue-500 hover:underline"
                >
                  legal@addinvoicesai.com
                </a>{" "}
                upon becoming aware of any unauthorized access or security
                breach.
              </p>
              <p>
                <strong>2.3 Eligibility.</strong> You must be at least 18 years
                of age to register. By creating an account, you represent and
                warrant that you meet this requirement.
              </p>
              <p>
                <strong>2.4 One Account Per User.</strong> Each individual or
                business entity may maintain only one active account unless
                explicitly authorized in writing by AddStrategic. Duplicate
                accounts may be suspended or merged at our sole discretion.
              </p>
              <p>
                <strong>2.5 Account Responsibility.</strong> You accept full
                responsibility for all actions taken under your account, whether
                by you or any third party using your credentials.
              </p>

              <hr className="border-white/10 my-14" />

              <h2
                id="billing"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight"
              >
                3. Subscription Plans and Billing
              </h2>
              <p>
                <strong>3.1 Available Plans.</strong> AddInvoices offers the
                following subscription plans:
              </p>
              <ul className="list-disc pl-6 space-y-4 mb-6 text-white/70">
                <li>
                  <strong>
                    Core Plan — $12/month (or discounted annual equivalent):
                  </strong>{" "}
                  Includes unlimited invoices, online payments via Stripe and
                  PayPal, automated payment reminders, custom templates, web and
                  mobile access, client management, and invoice tracking.
                </li>
                <li>
                  <strong>
                    AI Pro Plan — $20/month (or discounted annual equivalent):
                  </strong>{" "}
                  Includes everything in Core, plus AI-powered automated
                  workflows, the AddInvoices AI assistant for managing invoices,
                  clients, expenses and more, voice generation features, and
                  premium templates.
                </li>
                <li>
                  <strong>Lifetime Access — $100 one-time payment:</strong>{" "}
                  Available exclusively to the first 100 subscribers. Includes
                  everything in AI Pro, priority support, early access to new
                  features, and all future updates with no recurring fees. This
                  offer is strictly limited in availability and may be withdrawn
                  at any time without notice.
                </li>
              </ul>
              <p>
                Pricing, plan features, and availability are subject to change.
                Active subscribers will receive at least 30 days' advance notice
                of any material pricing change.
              </p>
              <p>
                <strong>3.2 Billing Cycles.</strong> Subscription fees are
                charged in advance on a monthly or annual basis, depending on
                the plan selected at purchase.
              </p>
              <p>
                <strong>3.3 Automatic Renewal.</strong> All subscription plans
                automatically renew at the end of each billing cycle at the
                then-current rate unless you cancel before the renewal date. By
                subscribing, you expressly authorize AddStrategic to charge your
                payment method on file at each renewal without further action
                required from you.
              </p>
              <p>
                <strong>3.4 Payment Processing.</strong> Payments are processed
                by Stripe and PayPal. You agree to comply with their respective
                terms. AddStrategic does not store your complete payment card
                information.
              </p>
              <p>
                <strong>3.5 Failed Payments.</strong> If a payment fails, we
                will make additional attempts to collect the outstanding amount.
                If payment cannot be collected, your account may be restricted
                or suspended until the balance is resolved.
              </p>
              <p>
                <strong>3.6 Price Changes.</strong> AddStrategic reserves the
                right to modify subscription fees at any time. Any change will
                take effect at the start of your next billing cycle following 30
                days' prior notice.
              </p>

              <hr className="border-white/10 my-14" />

              <h2
                id="free-trial"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight"
              >
                4. Free Trial
              </h2>
              <p>
                AddStrategic may, at its sole discretion, offer a free trial
                period for new users. Unless otherwise stated:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6 text-white/70">
                <li>
                  The free trial provides access to specified features at no
                  charge for the stated duration.
                </li>
                <li>
                  No credit card may be required to begin the trial depending on
                  the promotion.
                </li>
                <li>
                  At the end of the trial period, access to premium features
                  will be restricted unless a paid subscription is activated.
                </li>
                <li>
                  If payment information was provided at sign-up, your paid
                  subscription begins automatically at trial end.
                </li>
                <li>
                  Free trials are limited to one per person, household, or
                  payment method.
                </li>
              </ul>

              <hr className="border-white/10 my-14" />

              <h2
                id="promotion"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight"
              >
                5. Promotional Offer
              </h2>
              <p>
                <strong>5.1 Offer Description.</strong> Qualifying new
                AddInvoices subscribers may receive a complimentary
                professionally designed website ("Promotional Website") built by
                AddStrategic as part of a limited promotional program.
              </p>
              <p>
                <strong>5.2 Eligibility.</strong> To qualify, you must be a
                first-time subscriber with a new account, successfully complete
                your first payment, provide all required onboarding info within
                14 days, and maintain an active subscription for 6 months.
              </p>
              <p>
                <strong>5.3 Development Timeline.</strong> Website development
                begins upon receipt of all required materials. Delivery
                typically occurs within 4 to 8 weeks.
              </p>
              <p>
                <strong>5.4 Scope of the Promotional Website.</strong> Includes
                a professionally designed landing page, mobile-responsive
                design, and active SEO setup. Excludes e-commerce functionality,
                custom domain registration, ongoing content updates beyond the
                delivery, and paid advertising.
              </p>
              <p>
                <strong>5.5 Hosting and Promotional Period.</strong>{" "}
                AddStrategic will host the Promotional Website for a period of 6
                months from the date of delivery provided your account remains
                active.
              </p>

              <hr className="border-white/10 my-14" />

              <h2
                id="free-tools"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight"
              >
                6. Free Tools
              </h2>
              <p>
                <strong>6.1 No Account Required.</strong> The free browser-based
                tools available at addinvoicesai.com/tools may be used without
                creating an account. These include invoice generators,
                calculators, and converters.
              </p>
              <p>
                <strong>6.2 Watermark and Attribution.</strong> Documents
                generated using Free Tools include a watermark stating
                "Generated with AddInvoices". To generate documents without
                watermarks, an active paid subscription is required.
              </p>
              <p>
                <strong>6.3 Local Processing.</strong> The Free Tools process
                all data locally within your browser. AddStrategic does not
                collect or store any data you enter into the Free Tools unless
                logged into an account. Files are never uploaded to our servers.
              </p>
              <p>
                <strong>6.4 No Professional Advice.</strong> Documents generated
                through Free Tools are templates for utility purposes only. They
                do not constitute legal, financial, or accounting advice.
              </p>

              <hr className="border-white/10 my-14" />

              <h2
                id="acceptable-use"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight"
              >
                7. Acceptable Use
              </h2>
              <p>
                You agree not to use the Service to violate laws, send spam,
                impersonate others, distribute malicious code, disrupt
                infrastructure, or generate fraudulent documents. Reverse
                engineering or automated scraping without permission is strictly
                prohibited.
              </p>

              <hr className="border-white/10 my-14" />

              <h2
                id="user-content"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight"
              >
                8. User Content
              </h2>
              <p>
                <strong>8.1 Ownership.</strong> You retain full ownership of all
                data you create or upload within the Service. We do not claim
                ownership over your content.
              </p>
              <p>
                <strong>8.2 License Grant.</strong> You grant us a limited,
                worldwide license to store and process your content solely to
                provide the Service to you.
              </p>

              <hr className="border-white/10 my-14" />

              <h2
                id="ip"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight"
              >
                9. Intellectual Property
              </h2>
              <p>
                The Service, its design, code, and branding are the exclusive
                property of AddStrategic LLC. You may not copy, modify, or
                distribute any part of the Service without written consent.
              </p>

              <hr className="border-white/10 my-14" />

              <h2
                id="privacy-ref"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight"
              >
                10. Privacy
              </h2>
              <p>
                Your use of the Service is governed by our{" "}
                <Link href="/privacy" className="text-blue-500 hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>

              <hr className="border-white/10 my-14" />

              <h2
                id="third-party"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight"
              >
                11. Third-Party Integrations
              </h2>
              <p>
                The Service integrates with third-party providers like Stripe
                and PayPal. Your use of these is subject to their own terms and
                policies.
              </p>

              <hr className="border-white/10 my-14" />

              <h2
                id="cancellation"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight"
              >
                12. Cancellation and Termination
              </h2>
              <p>
                You may cancel your subscription at any time. It will remain
                active until the end of the current paid billing period. We
                reserve the right to suspend or terminate accounts that breach
                these Terms.
              </p>

              <hr className="border-white/10 my-14" />

              <h2
                id="refunds"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight"
              >
                13. Refund Policy
              </h2>
              <p>
                Subscription fees are generally non-refundable once a billing
                cycle has commenced. Refund requests submitted within 7 days of
                an initial charge may be considered on a case-by-case basis.
              </p>

              <hr className="border-white/10 my-14" />

              <h2
                id="disclaimer"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight uppercase"
              >
                14. Disclaimer of Warranties
              </h2>
              <div className="text-[14px] leading-[1.8] text-white/60 tracking-wider">
                THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS.
                ADDSTRATEGIC EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND,
                WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING BUT NOT
                LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT
                THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
              </div>

              <hr className="border-white/10 my-14" />

              <h2
                id="liability"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight uppercase"
              >
                15. Limitation of Liability
              </h2>
              <div className="text-[14px] leading-[1.8] text-white/60 tracking-wider">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, ADDSTRATEGIC SHALL NOT
                BE LIABLE FOR ANY INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES
                ARISING OUT OF YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY
                SHALL NOT EXCEED THE AMOUNT PAID TO US IN THE TWELVE MONTHS
                PRECEDING THE CLAIM OR $100, WHICHEVER IS GREATER.
              </div>

              <hr className="border-white/10 my-14" />

              <h2
                id="indemnification"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight"
              >
                16. Indemnification
              </h2>
              <p>
                You agree to defend and hold harmless AddStrategic from any
                claims arising from your use of the Service, violation of these
                Terms, or infringement of third-party rights.
              </p>

              <hr className="border-white/10 my-14" />

              <h2
                id="governing-law"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight"
              >
                17. Governing Law
              </h2>
              <p>
                These Terms are governed by the laws of the State of Delaware.
                Any disputes will be resolved through binding individual
                arbitration.
              </p>

              <hr className="border-white/10 my-14" />

              <h2
                id="changes"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight"
              >
                18. Changes to These Terms
              </h2>
              <p>
                We reserve the right to modify these Terms. Material changes
                will be preceded by 30 days' notice. Continued use after changes
                take effect constitutes acceptance.
              </p>

              <hr className="border-white/10 my-14" />

              <h2
                id="general"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight"
              >
                19. General Provisions
              </h2>
              <p>
                These Terms and our Privacy Policy constitute the entire
                agreement. If any provision is found invalid, the others remain
                in force. We may assign this agreement freely.
              </p>

              <hr className="border-white/10 my-14" />

              <h2
                id="contact"
                className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight"
              >
                20. Contact
              </h2>
              <p>AddStrategic LLC — AddInvoices</p>
              <ul className="list-none space-y-1 text-white/70">
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
