import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://addinvoicesia.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    // {
    //   url: "https://addinvoicesia.com/about",
    //   lastModified: new Date(),
    //   changeFrequency: "monthly",
    //   priority: 0.8,
    // },
    // {
    //   url: "https://addinvoicesia.com/blog",
    //   lastModified: new Date(),
    //   changeFrequency: "weekly",
    //   priority: 0.5,
    // },
  ];
}
