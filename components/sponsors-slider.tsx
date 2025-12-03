"use client";
import { useEffect, useRef } from "react";

const sponsors = [
  { name: "Sponsor 1", logo: "/L1.png" },
  { name: "Sponsor 2", logo: "/L2.png" },
  { name: "Sponsor 3", logo: "/L3.png" },
  { name: "Sponsor 4", logo: "/L4.png" },
  { name: "Sponsor 5", logo: "/L5.png" },
  { name: "Sponsor 6", logo: "/L6.png" },
  { name: "sponsor 7", logo: "/L7.png" },
  { name: "sponsor 8", logo: "/L8.png" },
  { name: "sponsor 9", logo: "/L9.png" },
  { name: "sponsor 10", logo: "/L10.png" },
];

export function SponsorsSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const speed = 1; // velocidad del scroll

    // duplicamos los logos para loop infinito
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
            Companies that trust ADSTRATEGIC
          </h2>
          <p className="text-ad-secondary text-lg">
            Join the leading companies already using our AI
          </p>
        </div>

        <div className="relative">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-ad-main to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-ad-main to-transparent z-10" />

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-hidden"
            style={{ scrollBehavior: "auto", width: "100%" }}
          >
            {sponsors.map((sponsor, index) => (
              <div
                key={`${sponsor.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center w-28 h-28 rounded-lg"
              >
                <div className="w-24 h-24 flex items-center justify-center transition-colors">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
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
