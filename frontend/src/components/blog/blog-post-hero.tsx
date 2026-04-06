import Image from "next/image";
import { formatDate } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";
import type { Post } from "@/types/posts";

type Props = {
  post: Post;
  locale: Locale;
  lastUpdateLabel: string;
  brandName: string;
  brandLogoAlt: string;
};

export function BlogPostHero({
  post,
  locale,
  lastUpdateLabel,
  brandName,
  brandLogoAlt,
}: Props) {
  return (
    <div className="overflow-hidden relative text-white text-center mb-12 bg-[#013645]">
      <div className="px-5 sm:px-3 mx-auto md:max-w-[720px] sm:max-w-[540px]">
        <div className="py-16">
          <h1 className="font-roboto text-2xl !leading-[1.4] font-semibold uppercase sm:text-4xl mb-9">
            {post.title}
          </h1>
          <div className="mb-9">
            <span>{lastUpdateLabel}</span>
            <time dateTime={`${new Date(post.date_created)}`}>
              {formatDate(locale, post.date_created)}
            </time>
          </div>
          <div className="flex w-full flex-row flex-wrap items-center justify-center gap-x-2">
            <div className="relative w-20 h-16">
              <Image
                fill
                className="object-contain"
                src="/addstrategic-logo-blanco.png"
                alt={brandLogoAlt}
              />
            </div>
            <span className="block font-bold">·</span>
            <p className="mb-[.1rem] text-lg font-semibold">
              Nicolás Forero <br /> &amp; Santiago Arias
            </p>
          </div>
        </div>

        <div className="relative -mt-[10px] mx-auto mb-0 max-w-[700px] before:content-[''] before:absolute before:left-[-100vw] before:right-[-100vw] before:bottom-0 before:h-[50%] before:bg-background">
          <div className="relative aspect-[1600/837] h-auto rounded-lg overflow-hidden">
            <Image
              priority
              fill
              className="object-cover"
              sizes="(max-width: 640px) 60vw, (max-width: 768px) 500px, 700px"
              src={post.cover.url}
              alt={post.cover.alternativeText || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
