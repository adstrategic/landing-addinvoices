"use client";

import type React from "react";

import { useTheme } from "next-themes";
import Earth from "./ui/globe";
import ScrambleHover from "./ui/scramble";
import { motion, useInView } from "framer-motion";
import { Suspense, useEffect, useRef, useState } from "react";
import { geist } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { theme } = useTheme();
  const [isHovering, setIsHovering] = useState(false);

  const [baseColor, setBaseColor] = useState<[number, number, number]>([
    0.325, 0.58, 0.906,
  ]); // #5394e7 in RGB normalized
  const [glowColor, setGlowColor] = useState<[number, number, number]>([
    0.325, 0.58, 0.906,
  ]); // #5394e7 in RGB normalized

  const [dark, setDark] = useState<number>(theme === "dark" ? 1 : 0);

  useEffect(() => {
    setBaseColor([0.325, 0.58, 0.906]); // #5394e7
    setGlowColor([0.325, 0.58, 0.906]); // #5394e7
    setDark(theme === "dark" ? 1 : 0);
  }, [theme]);

  return (
    <section
      id="features"
      className="text-foreground relative overflow-hidden px-4 py-12 sm:py-24 md:py-32"
    >
      <div className="bg-primary absolute -top-10 left-1/2 h-16 w-44 -translate-x-1/2 rounded-full opacity-40 blur-3xl select-none"></div>
      <div className="via-primary/50 absolute top-0 left-1/2 h-px w-3/5 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent transition-all ease-in-out"></div>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: 0 }}
        className="container mx-auto flex flex-col items-center gap-6 sm:gap-12"
      >
        <h2
          className={cn(
            "mb-8 text-center text-3xl font-semibold tracking-tighter text-foreground md:text-[54px] md:leading-[60px]",
            geist.className
          )}
        >
          Everything you need to invoice like a pro
        </h2>
        <p className="text-center text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto px-4">
          From creating branded invoices to tracking payments online.
          AddInvoices combines automation, design, and control in one simple
          platform.
        </p>
        <div>
          <div className="grid grid-cols-12 gap-4 justify-center max-w-7xl mx-auto">
            {/* Feature 1 - Intelligent Queries */}
            <motion.div
              className="group border-secondary/40 text-card-foreground relative col-span-12 flex flex-col overflow-hidden rounded-xl border-2 p-4 md:p-6 shadow-xl transition-all ease-in-out md:col-span-6 xl:col-span-6 "
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{ transition: "all 0s ease-in-out" }}
            >
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl leading-none font-semibold tracking-tight">
                  💸 Smart Invoicing
                </h3>
                <div className="text-md text-muted-foreground flex flex-col gap-2 text-sm">
                  <p className="max-w-[460px]">
                    Create and send invoices in seconds with custom templates,
                    logos, and digital signatures.
                  </p>
                </div>
              </div>
              <div className="flex grow items-center justify-center select-none relative overflow-hidden p-2 md:p-4">
                <img
                  src="/feature4.png"
                  alt="Smart Invoicing"
                  className="w-full h-auto max-h-[300px] md:max-h-none object-contain rounded-xl shadow-lg"
                />
              </div>
            </motion.div>

            {/* Feature 2 - Bookings and Appointments */}
            <motion.div
              className="group border-secondary/40 text-card-foreground relative col-span-12 flex flex-col overflow-hidden rounded-xl border-2 p-4 md:p-6 shadow-xl transition-all ease-in-out md:col-span-6 xl:col-span-6 xl:col-start-7"
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              // whileHover={{
              //   scale: 1.02,
              //   borderColor: "rgba(83, 148, 231, 0.6)",
              //   boxShadow: "0 0 30px rgba(83, 148, 231, 0.2)",
              // }}
              style={{ transition: "all 0s ease-in-out" }}
            >
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl leading-none font-semibold tracking-tight">
                  📩 Integrated Payments
                </h3>
                <div className="text-md text-muted-foreground flex flex-col gap-2 text-sm">
                  <p className="max-w-[460px]">
                    Accept Stripe or PayPal payments directly from your invoice.
                  </p>
                </div>
              </div>
              <div className="flex min-h-[300px] grow items-start justify-center select-none">
                <p className="mt-8 text-center text-5xl leading-[100%] font-semibold sm:leading-normal lg:mt-12 lg:text-6xl">
                  <span
                    className='bg-white relative mt-3 inline-block w-fit rounded-md border px-1.5 py-0.5 before:absolute before:top-0 before:left-0 before:z-10 before:h-full before:w-full before:bg-[url("/noise.gif")] before:opacity-[0.09] before:content-[""]'
                    style={{ backgroundColor: "#ffffff !important" }}
                  >
                    <ScrambleHover
                      text="worldwide pay"
                      className="cursor-pointer bg-gradient-to-t from-[#5394e7] to-[#5394e7] bg-clip-text text-transparent"
                    />
                  </span>
                </p>
                <div className="absolute top-64 z-10 flex items-center justify-center">
                  <div className="w-[400px] h-[400px]">
                    <Suspense
                      fallback={
                        <div className="bg-secondary/20 h-[400px] w-[400px] animate-pulse rounded-full"></div>
                      }
                    >
                      <Earth
                        baseColor={baseColor}
                        markerColor={[0, 0, 0]}
                        glowColor={glowColor}
                        dark={dark}
                      />
                    </Suspense>
                  </div>
                </div>
                <div className="absolute top-1/2 w-full translate-y-20 scale-x-[1.2] opacity-70 transition-all duration-1000 group-hover:translate-y-8 group-hover:opacity-100">
                  <div className="from-primary/50 to-primary/0 absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-radial from-10% to-60% opacity-20 sm:h-[512px] dark:opacity-100"></div>
                  <div className="from-primary/30 to-primary/0 absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-200 rounded-[50%] bg-radial from-10% to-60% opacity-20 sm:h-[256px] dark:opacity-100"></div>
                </div>
              </div>
            </motion.div>

            {/* Feature 3 - Document Management */}
            <motion.div
              className="group border-secondary/40 text-card-foreground relative col-span-12 flex flex-col overflow-hidden rounded-xl border-2 p-4 md:p-6 shadow-xl transition-all ease-in-out md:col-span-6 xl:col-span-6 "
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              style={{ transition: "all 0s ease-in-out" }}
            >
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl leading-none font-semibold tracking-tight">
                  📊 Dashboard Insights
                </h3>
                <div className="text-md text-muted-foreground flex flex-col gap-2 text-sm">
                  <p className="max-w-[460px]">
                    View income, expenses, and pending invoices in real time.
                  </p>
                </div>
              </div>
              <div className="flex grow items-center justify-center select-none relative min-h-[200px] md:min-h-[300px] p-2 md:p-4">
                <img
                  src="/feature1.jpg"
                  alt="Dashboard Insights"
                  className="w-full h-auto max-h-[300px] md:max-h-none object-contain rounded-xl shadow-lg"
                />
              </div>
            </motion.div>

            {/* Feature 4 - Human Directory */}
            <motion.div
              className="group border-secondary/40 text-card-foreground relative col-span-12 flex flex-col overflow-hidden rounded-xl border-2 p-4 md:p-6 shadow-xl transition-all ease-in-out md:col-span-6 xl:col-span-6 xl:col-start-7"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              style={{ transition: "all 0s ease-in-out" }}
            >
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl leading-none font-semibold tracking-tight">
                  🚀 Automated Workflow
                </h3>
                <div className="text-md text-muted-foreground flex flex-col gap-2 text-sm">
                  <p className="max-w-[460px]">
                    Automatic payment reminders, client management, and
                    organized invoice tracking (draft, sent, paid).
                  </p>
                </div>
              </div>
              <div className="flex grow items-center justify-center select-none relative min-h-[200px] md:min-h-[300px] p-2 md:p-4">
                <img
                  src="/feature3.png"
                  alt="Automated Workflow"
                  className="w-full h-auto max-h-[300px] md:max-h-none object-contain rounded-xl shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
