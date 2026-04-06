/** Matches Strapi BlocksRenderer heading `id` generation for anchor + TOC sync. */
export function slugifyHeadingId(rawText: string): string {
  return String(rawText)
    .toLowerCase()
    .replace(/<\/?[^>]+(>|$)/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}
