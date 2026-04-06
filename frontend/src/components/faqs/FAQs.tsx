"use client";

import React from "react";
import { FAQItem } from "./FAQ";
import { useTranslations } from "next-intl";

const FAQs = ({ className }: { className?: string }) => {
  const t = useTranslations("Blog.FAQs");

  const keys = Array(3)
    .fill("")
    .map((key, i) => `question${i + 1}`) as [
    "question1",
    "question2",
    "question3",
  ];

  return (
    <section className={`pt-20 px-6 ${className}`} id="faqs">
      <div className="text-left md:text-center max-w-3xl mx-auto mb-8">
        <h2 className="font-bold text-3xl md:text-[44px] md:leading-[50px] text-primary mb-4">
          {t("title")}
        </h2>
        <p className="text-gray-500">{t("description")}</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 gap-8 md:gap-14">
          {keys.map((item, index) => (
            <FAQItem
              key={index}
              question={t(`questions.${item}.question`)}
              answer={t(`questions.${item}.answer`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
