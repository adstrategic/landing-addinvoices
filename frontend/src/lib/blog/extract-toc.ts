import type { BlocksContent } from "@strapi/blocks-react-renderer";
import type { HeadingBlockNode } from "@/types/strapi-blocks";

export function extractTableOfContentsFromBlocks(
  content: BlocksContent,
): HeadingBlockNode[] {
  if (!content?.length) return [];
  return content.filter(
    (item): item is HeadingBlockNode => item.type === "heading",
  );
}
