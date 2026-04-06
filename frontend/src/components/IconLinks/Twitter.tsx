"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Twitter = () => {
  const router = usePathname();

  return (
    <a
      href={`https://twitter.com/share?url=${process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000"}${router}`}
      target="_blank"
    >
      <span className="sr-only">share on twitter</span>
      <Image src="/icons/x-social-media.svg" alt="" width={30} height={30} />
    </a>
  );
};

export default Twitter;
