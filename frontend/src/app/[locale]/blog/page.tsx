import type { Metadata } from "next";
import { Suspense } from "react";

import BlogList from "@/components/Blog/BlogList";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import FAQs from "@/components/faqs/FAQs";
import { WaitlistSection } from "@/components/waitlist-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog.Metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

type SearchParamsProps = Promise<{
  page?: string;
  query?: string;
  category?: string;
}>;

export default async function Blog(props: {
  params: Promise<{ locale: Locale }>;
  searchParams: SearchParamsProps;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { locale } = params;
  const tBlog = await getTranslations("Blog");
  const tHomepage = await getTranslations("Homepage");

  return (
    <section className="relative pb-16">
      <div className="relative z-20 overflow-hidden shadow-lg bg-no-repeat bg-cover">
        <Image
          src="/addinvoices_bg.png"
          alt="banner"
          fill
          sizes="80vw"
          priority
          className="object-cover"
        />
        <div className="w-full h-full backdrop-blur-[2px] pt-48 pb-20 px-4">
          <div className="text-left md:text-center max-w-sm md:max-w-3xl mx-auto">
            <h1 className="font-roboto mb-8 text-4xl font-medium">
              {tBlog.rich("title", {
                highlight: (chunks) => (
                  <span className="text-primary">{chunks}</span>
                ),
              })}
            </h1>
            <p className="">{tBlog("description")}</p>
          </div>
        </div>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <div className="relative pt-16 px-4 sm:px-6 lg:px-8 z-20">
          <div className="max-w-[26rem] sm:max-w-[52.5rem] lg:max-w-7xl mx-auto text-center">
            <h2 className="font-bold text-3xl md:text-[44px] md:leading-[50px] text-primary mb-4">
              {tBlog("postsSectionTitle")}
            </h2>
            <p className="text-gray-500 mb-8">
              {tBlog("postsSectionDescription")}
            </p>
          </div>
          <BlogList searchParams={searchParams} lang={locale} />
        </div>
      </Suspense>

      <section className="py-10 px-6">
        <WaitlistSection
          title={tHomepage("Waitlist.title")}
          description={tHomepage("Waitlist.description")}
          cta={tHomepage("Waitlist.cta")}
        />
      </section>

      <div className="relative py-10 px-6 overflow-hidden">
        <div className="bg-primary absolute -top-10 left-1/2 h-16 w-44 -translate-x-1/2 rounded-full opacity-40 blur-3xl select-none"></div>
        <div className="via-primary/50 absolute top-0 left-1/2 h-px w-3/5 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent transition-all ease-in-out"></div>
      </div>
    </section>
  );
}
