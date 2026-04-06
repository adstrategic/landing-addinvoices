"use client";

interface WatermarkProps {
  level?: 1 | 2;
}

export default function Watermark({ level = 1 }: WatermarkProps) {
  if (level === 2) {
    return (
      <div className="absolute bottom-2 right-2 pointer-events-none z-50 select-none">
        <div className="text-[8px] md:text-[9px] text-[#2563eb] font-bold bg-white/20 px-2 py-0.5 rounded opacity-50 border border-blue-500/10 backdrop-blur-sm">
           Generated with AddInvoices · addinvoicesai.com
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden select-none">
      <div className="absolute inset-0 flex flex-col justify-around items-center rotate-[-45deg] scale-125">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="text-[#2563eb] font-semibold text-[18px] whitespace-nowrap opacity-[0.12]"
          >
            Generated with AddInvoices
          </div>
        ))}
      </div>
    </div>
  );
}
