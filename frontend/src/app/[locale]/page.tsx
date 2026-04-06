import Hero from "@/components/home/hero";
import Features, {
  type FeatureCardCopy,
} from "@/components/features";
import { TestimonialsSection } from "@/components/testimonials";
import { NewReleasePromo } from "@/components/new-release-promo";
import { FAQSection } from "@/components/faq-section";
import {
  PricingSection,
  type LifetimePlanCopy,
  type SubscriptionPlanCopy,
} from "@/components/pricing-section";
import { ConventionalFooter } from "@/components/conventional-footer";
import { SponsorsSlider } from "@/components/sponsors-slider";
import { WhyChoose, type WhyChooseHighlight } from "@/components/why-choose";
import { WaitlistSection } from "@/components/waitlist-section";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("Homepage");

  const featureCards = t.raw("Features.cards") as FeatureCardCopy[];
  const whyHighlights = t.raw("WhyChoose.highlights") as WhyChooseHighlight[];
  const subscriptionPlans = t.raw(
    "Pricing.subscriptionPlans",
  ) as SubscriptionPlanCopy[];
  const lifetimePlan = t.raw("Pricing.lifetimePlan") as LifetimePlanCopy;
  const faqItems = t.raw("FAQSection.items") as {
    question: string;
    answer: string;
  }[];

  return (
    <div className="min-h-screen w-full relative bg-ad-main">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(226, 232, 240, 0.12), transparent 60%), linear-gradient(135deg, #0A0F2C 0%, #111827 100%)",
        }}
      />

      <Hero
        badgeText={t("Hero.badge")}
        title={t.rich("Hero.title", {
          brand: (chunks) => <strong>{chunks}</strong>,
        })}
        description={t.rich("Hero.description", {
          emphasis: (chunks) => <strong>{chunks}</strong>,
        })}
        ctaEarlyAccess={t("Hero.ctaEarlyAccess")}
        ctaPricing={t("Hero.ctaPricing")}
        seoTagline={t("Hero.seoTagline")}
        googlePlayAlt={t("Hero.googlePlayAlt")}
        appStoreAlt={t("Hero.appStoreAlt")}
      />

      <SponsorsSlider
        title={t("Sponsors.title")}
        subtitle={t("Sponsors.subtitle")}
        logoAlt={t("Sponsors.logoAlt")}
      />

      <WhyChoose
        badge={t("WhyChoose.badge")}
        title={t("WhyChoose.title")}
        subtitle={t.rich("WhyChoose.subtitle", {
          bold: (chunks) => (
            <strong className="text-white">{chunks}</strong>
          ),
        })}
        highlights={whyHighlights}
      />

      <div id="waitlist">
        <WaitlistSection
          title={t("Waitlist.title")}
          description={t("Waitlist.description")}
          cta={t("Waitlist.cta")}
        />
      </div>
      <div id="features">
        <Features
          title={t("Features.title")}
          subtitle={t("Features.subtitle")}
          scrambleText={t("Features.scrambleText")}
          cards={featureCards}
        />
      </div>
      <div id="pricing">
        <PricingSection
          badge={t("Pricing.badge")}
          title={t("Pricing.title")}
          subtitle={t("Pricing.subtitle")}
          monthly={t("Pricing.monthly")}
          yearly={t("Pricing.yearly")}
          mostPopular={t("Pricing.mostPopular")}
          periodMonth={t("Pricing.periodMonth")}
          periodYear={t("Pricing.periodYear")}
          periodOneTime={t("Pricing.periodOneTime")}
          bottomCta={t("Pricing.bottomCta")}
          subscriptionPlans={subscriptionPlans}
          lifetimePlan={lifetimePlan}
        />
      </div>
      <div id="testimonials">
        <TestimonialsSection />
      </div>
      <NewReleasePromo
        title={t("NewRelease.title")}
        description={t("NewRelease.description")}
        cta={t("NewRelease.cta")}
        wordmark={t("NewRelease.wordmark")}
      />
      <div id="faq">
        <FAQSection
          pill={t("FAQSection.pill")}
          heading={t.rich("FAQSection.title", {
            highlight: (chunks) => (
              <span className="text-primary font-semibold">{chunks}</span>
            ),
          })}
          items={faqItems}
        />
      </div>
      <ConventionalFooter />
    </div>
  );
}
