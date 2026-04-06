import { Link } from "@/i18n/routing";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Post } from "@/types/posts";
import { getListOfPosts } from "@/lib/queries";

import { Button } from "../ui/button";
import { Calendar, MoveRight } from "lucide-react";
import { PaginationComponent } from "../pagination-component";
import Image from "next/image";
import { Locale } from "@/i18n/routing";
import { formatDate } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export function RenderPosts({
  posts,
  locale,
  readMoreLabel,
}: {
  posts: Array<Post>;
  locale: Locale;
  readMoreLabel: string;
}) {
  return (
    <ul className="mx-auto grid max-w-[26rem] grid-cols-1 gap-6 sm:max-w-[52.5rem] sm:grid-cols-2 lg:max-w-7xl xl:grid-cols-3 lg:gap-8">
      {posts.map((post) => {
        return (
          <li key={post.id} className="group">
            <Link href={`/blog/${post.slug}`} className="">
              <Card className="h-full grid hover:bg-accent">
                <CardHeader className="">
                  <div className="relative overflow-hidden rounded-lg border border-zinc-200 shadow-lg aspect-video">
                    <Image
                      alt={post.cover.alternativeText || ""}
                      src={post.cover.url}
                      sizes="(max-width: 640px) 60vw, 35vw"
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="">
                  <p className="text-muted-foreground group-hover:text-primary flex items-center justify-start gap-4 mb-4">
                    <Calendar />
                    {formatDate(locale, post.date_created)}
                  </p>
                  <h2 className="mb-4 overflow-hidden text-ellipsis text-lg md:text-2xl font-bold uppercase leading-tight tracking-wide">
                    {post.title}
                  </h2>
                  <p className="text-sm">{post.seo_description}</p>
                </CardContent>
                <CardFooter className="items-end">
                  <Button variant="link" className="px-0">
                    {readMoreLabel} <MoveRight />
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

type SearchParamsProps = {
  page?: string;
  query?: string;
  category?: string;
};

export default async function BlogList({
  lang,
  searchParams,
}: {
  lang: Locale;
  searchParams: SearchParamsProps;
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const data = await getListOfPosts(lang, currentPage);
  const posts = data?.data;
  const pageCount = data?.meta.pagination.pageCount;
  const t = await getTranslations("Blog");

  return (
    <>
      {posts.length > 0 ? (
        <>
          <RenderPosts
            posts={posts}
            locale={lang}
            readMoreLabel={t("readMore")}
          />
          <PaginationComponent className="mt-12" pageCount={pageCount} />
        </>
      ) : (
        <p className="text-center font-bold">{t("emptyPosts")}</p>
      )}
    </>
  );
}

export async function LastThreePosts({ lang }: { lang: Locale }) {
  const currentPage = 1;
  const data = await getListOfPosts(lang, currentPage);
  const posts = data?.data;
  const t = await getTranslations("Blog");

  return posts.length > 0 ? (
    <RenderPosts
      posts={posts.slice(0, 3)}
      locale={lang}
      readMoreLabel={t("readMore")}
    />
  ) : (
    <p className="text-center font-bold">{t("emptyPosts")}</p>
  );
}
