import { type BlocksContent } from "@strapi/blocks-react-renderer";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/queries";
import { Post } from "@/types/posts";
import { Metadata } from "next";
import PostTOC from "@/components/post-toc";
import Facebook from "@/components/IconLinks/Facebook";
import LinkedIn from "@/components/IconLinks/LinkedIn";
import Twitter from "@/components/IconLinks/Twitter";
import { Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { BlogPostHero } from "@/components/blog/blog-post-hero";
import { BlogPostBody } from "@/components/blog/blog-post-body";
import { PostLocaleLinks } from "@/components/blog/post-locale-links";
import { extractTableOfContentsFromBlocks } from "@/lib/blog/extract-toc";

type PostParams = Promise<{
  postSlug: string;
  locale: Locale;
}>;

export async function generateMetadata(props: {
  params: PostParams;
}): Promise<Metadata> {
  const { locale, postSlug } = await props.params;
  const data = await getPostBySlug(postSlug, locale);
  const post: Post | undefined = data?.data[0];

  if (!post) {
    notFound();
  }

  return {
    title: post.title,
    description: post.seo_description,
    openGraph: {
      images: [
        {
          url: post.cover.url,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function PostPage(props: { params: PostParams }) {
  const { locale, postSlug } = await props.params;
  const data = await getPostBySlug(postSlug, locale);
  const post: Post | undefined = data?.data[0];
  const t = await getTranslations("BlogPost");

  if (!post) {
    notFound();
  }

  const content: BlocksContent = post.body;

  const tableOfContents = extractTableOfContentsFromBlocks(content);

  return (
    <div className="">
      <BlogPostHero
        post={post}
        locale={locale}
        lastUpdateLabel={t("lastUpdate")}
        brandName={t("brandName")}
        brandLogoAlt={t("brandLogoAlt")}
      />

      <div className="mx-auto 2xl:max-w-7xl grid grid-rows-1 grid-cols-8 lg:gap-12 lg:grid-cols-10 lg:max-w-6xl pb-8">
        <div className="z-20 col-span-8 px-4 md:z-10 lg:px-0 lg:col-span-6 lg:col-start-3 row-start-1">
          <PostLocaleLinks
            currentLocale={locale}
            localizations={post.localizations}
            sectionLabel={t("otherLanguages")}
            labels={{
              en: t("locale.en"),
              es: t("locale.es"),
            }}
          />
          <BlogPostBody content={content} />
        </div>

        <PostTOC
          title={t("tableOfContents")}
          mobileTitle={t("tableOfContentsMobile")}
          tableOfContents={tableOfContents}
        />

        <div className="hidden lg:block w-full relative row-start-1 -col-start-3 col-span-2">
          <div className="w-full absolute inset-0 lg:pb-24 2xl:pb-12">
            <div className="lg:sticky lg:top-28 self-start overflow-auto rounded-md py-4 px-1 text-center w-20">
              <div className="mt-4 flex flex-col gap-4 items-center justify-center">
                <Facebook />
                <LinkedIn />
                <Twitter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
