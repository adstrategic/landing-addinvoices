"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";

export const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`border rounded-lg px-4 py-8 ${
        isOpen ? "border-primary border-2" : ""
      }`}
      style={{ alignSelf: isOpen ? "stretch" : "start" }}
    >
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleOpen}
      >
        <h3 className="font-semibold text-lg">{question}</h3>

        <ChevronRight
          className={`w-10 h-10 text-gray-400 transform transition-transform duration-200 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </div>
      {isOpen && <p className="mt-2 text-gray-600">{answer}</p>}
    </div>
  );
};

const FAQ = ({
  faqData,
}: {
  faqData: Array<{ question: string; answer: string }>;
}) => {
  return (
    <div className="max-w-7xl mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
        {faqData.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
