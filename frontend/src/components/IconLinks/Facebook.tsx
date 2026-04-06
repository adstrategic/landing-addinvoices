"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Facebook = () => {
  const router = usePathname();

  return (
    <a
      href={`https://www.facebook.com/share.php?u=${process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000"}${router}`}
      target="_blank"
    >
      <span className="sr-only">share on facebook</span>
      <Image src="/icons/facebook.svg" alt="" width={40} height={40} />
    </a>
  );
};

export default Facebook;
