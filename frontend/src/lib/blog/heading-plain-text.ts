import type { HeadingBlockNode } from "@/types/strapi-blocks";

/** Plain text for a heading block (same string space as BlocksRenderer idString). */
export function plainTextFromHeadingBlock(heading: HeadingBlockNode): string {
  return heading.children
    .map((child) => {
      if (child.type === "link") {
        return child.children.map((t) => t.text).join(" ").trim();
      }
      return child.text;
    })
    .join(" ")
    .trim();
}
