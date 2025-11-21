"use client";

export function NewReleasePromo() {
  return (
    <section className="mt-12 w-full">
      <div className="mx-auto max-w-4xl min-h-[400px] border border-black/5 dark:border-white/20 p-2 shadow-sm">
        <div className="relative mx-auto max-w-4xl min-h-[400px] overflow-hidden rounded-[38px] border border-black/5 dark:border-white/20 bg-primary p-2 shadow-sm">
          {/* Subtle radial glow from center */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255, 64, 23, 0.1), transparent 70%)",
            }}
          />

          <div className="relative z-10 h-[400px]">
            <div className="mt-8 text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Start invoicing like a professional today
              </h2>
              <p className="text-white/80 mb-8 text-lg">
                Create your free account, customize your invoices, and get paid
                faster with AddInvoices.
              </p>
              <div className="flex items-center justify-center">
                <a href="#waitlist" className="w-full max-w-sm ">
                  <div className="group border-border bg-secondary/70 flex h-[64px] cursor-pointer items-center gap-2 rounded-full border p-[11px] mt-10">
                    <div className="border-border w-full bg-primary hover:bg-cyan-700 transition-colors duration-300 flex h-[43px] items-center justify-center rounded-full border">
                      <p className="mr-3 ml-2 flex items-center justify-center gap-2 font-medium tracking-tight text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-rocket"
                          aria-hidden="true"
                        >
                          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                        </svg>
                        Get Started
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Stroked text wordmark */}
            <p
              className="absolute inset-x-0  text-center text-[100px] sm:ml-[-36px] font-semibold text-white/20 sm:text-[190px] pointer-events-none "
              style={{
                WebkitTextStroke: "1px rgba(255, 255, 255, 0.3)",
              }}
              aria-hidden="true"
            >
              AddInvoices
            </p>
            <p
              className="absolute inset-x-0  text-center text-[100px] sm:ml-[-36px] font-semibold text-primary sm:text-[190px] pointer-events-none"
              aria-hidden="true"
            >
              AddInvoices
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
