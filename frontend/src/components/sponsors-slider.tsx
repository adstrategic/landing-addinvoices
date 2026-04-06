"use client";
import { useEffect, useRef } from "react";

const SPONSOR_LOGOS = [
  "/L1.png",
  "/L2.png",
  "/L3.png",
  "/L4.png",
  "/L5.png",
  "/L6.png",
  "/L7.png",
  "/L8.png",
  "/L9.png",
  "/L10.png",
];

export type SponsorsSliderProps = {
  title: string;
  subtitle: string;
  logoAlt: string;
};

export function SponsorsSlider({
  title,
  subtitle,
  logoAlt,
}: SponsorsSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const speed = 1;

    const content = scrollContainer.innerHTML;
    scrollContainer.innerHTML += content;

    const scroll = () => {
      scrollPosition += speed;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
    };

    const intervalId = setInterval(scroll, 20);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-ad-secondary text-lg">{subtitle}</p>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-ad-main to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-ad-main to-transparent z-10" />

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-hidden"
            style={{ scrollBehavior: "auto", width: "100%" }}
          >
            {SPONSOR_LOGOS.map((logo, index) => (
              <div
                key={`${logo}-${index}`}
                className="flex-shrink-0 flex items-center justify-center w-28 h-28 rounded-lg"
              >
                <div className="w-24 h-24 flex items-center justify-center transition-colors">
                  <img
                    src={logo}
                    alt={`${logoAlt} ${index + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
