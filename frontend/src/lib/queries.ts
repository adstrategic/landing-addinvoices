import { cache } from "react";
import { Locale } from "@/i18n/routing";
import { getStrapiURL } from "./utils";
import { fetchData, type StrapiCollectionResponse } from "./fetch";
import type { Post } from "@/types/posts";
import qs from "qs";

async function loadPostBySlug(
  slug: string,
  locale: Locale,
): Promise<StrapiCollectionResponse<Post>> {
  const path = "/api/posts";
  const baseUrl = getStrapiURL();

  const url = new URL(path, baseUrl);
  url.search = qs.stringify({
    status: "published",
    populate: {
      cover: {
        fields: ["url", "alternativeText", "name"],
      },
      localizations: {
        fields: ["slug", "locale"],
      },
    },
    filters: {
      slug: { $eqi: slug },
    },
    locale,
  });

  return fetchData<StrapiCollectionResponse<Post>>(url.href);
}

export const getPostBySlug = cache(loadPostBySlug);

export async function getListOfPosts(
  locale?: string,
  page?: number,
): Promise<StrapiCollectionResponse<Post>> {
  const path = "/api/posts";
  const baseUrl = getStrapiURL();

  const url = new URL(path, baseUrl);
  url.search = qs.stringify({
    status: "published",
    populate: {
      cover: {
        fields: ["url", "alternativeText", "name"],
      },
    },
    locale,
    pagination: {
      pageSize: 6,
      page: page,
    },
  });
  return fetchData<StrapiCollectionResponse<Post>>(url.href);
}
