"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

const LinkedIn = () => {
  const router = usePathname();

  return (
    <a
      href={`https://www.linkedin.com/shareArticle?mini=true&url=${process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000"}${router}`}
      target="_blank"
    >
      <span className="sr-only">share on linkedin</span>
      <Image src="/icons/linkedin.svg" alt="" width={40} height={40} />
    </a>
  );
};

export default LinkedIn;
