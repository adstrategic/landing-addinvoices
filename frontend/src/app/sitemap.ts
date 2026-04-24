import { readdir } from "node:fs/promises";
import path from "node:path";
import type { MetadataRoute } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { getListOfPosts } from "@/lib/queries";
import type { Post } from "@/types/posts";

const FALLBACK_BASE_URL = "https://www.addinvoicesai.com";
const APP_LOCALE_DIR = path.join(process.cwd(), "src", "app", "[locale]");

function getBaseUrl() {
  return (process.env.NEXT_PUBLIC_BASE_URL || FALLBACK_BASE_URL).replace(
    /\/$/,
    "",
  );
}

function withLocale(pathname: string, locale: Locale): string {
  const cleanPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (locale === routing.defaultLocale) return cleanPath;
  return cleanPath === "/" ? `/${locale}` : `/${locale}${cleanPath}`;
}

async function getStaticRoutePaths(
  dir: string,
  prefix = "",
): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const routes: string[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const segment = entry.name;
      const isDynamicSegment = segment.startsWith("[");
      const nextPrefix = prefix ? `${prefix}/${segment}` : segment;
      const nestedRoutes = await getStaticRoutePaths(
        path.join(dir, segment),
        nextPrefix,
      );
      routes.push(
        ...nestedRoutes.filter(
          (routePath) => !routePath.includes("/[") && !isDynamicSegment,
        ),
      );
      continue;
    }

    if (entry.isFile() && entry.name === "page.tsx") {
      routes.push(prefix ? `/${prefix}` : "/");
    }
  }

  return routes;
}

async function getLocalizedBlogPosts(
  baseUrl: string,
): Promise<MetadataRoute.Sitemap> {
  const postEntries: MetadataRoute.Sitemap = [];

  const fetchPostsForLocale = async (locale: Locale) => {
    const firstPage = await getListOfPosts(locale);
    const firstPagePosts = firstPage?.data ?? [];
    const pageCount = firstPage?.meta?.pagination?.pageCount ?? 0;

    const addPosts = (posts: Post[]) => {
      posts.forEach((post) => {
        postEntries.push({
          url: `${baseUrl}${withLocale(`/blog/${post.slug}`, locale)}`,
          lastModified: new Date(Date.parse(post.date_created)),
          changeFrequency: "monthly",
          priority: 0.6,
        });
      });
    };

    addPosts(firstPagePosts);

    if (pageCount <= 1) return;

    for (let page = 2; page <= pageCount; page += 1) {
      const pageData = await getListOfPosts(locale, page);
      addPosts(pageData?.data ?? []);
    }
  };

  await Promise.all(
    routing.locales.map((locale) => fetchPostsForLocale(locale)),
  );

  return postEntries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const staticPaths = await getStaticRoutePaths(APP_LOCALE_DIR);

  const staticEntries: MetadataRoute.Sitemap = [];
  for (const routePath of staticPaths) {
    for (const locale of routing.locales) {
      staticEntries.push({
        url: `${baseUrl}${withLocale(routePath, locale)}`,
        lastModified: new Date(),
        changeFrequency: routePath === "/" ? "yearly" : "monthly",
        priority: routePath === "/" ? 1 : 0.8,
      });
    }
  }

  const blogPostEntries = await getLocalizedBlogPosts(baseUrl);

  return [...staticEntries, ...blogPostEntries];
}
