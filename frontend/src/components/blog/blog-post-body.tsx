import BlockRendererWrapper from "@/components/block-renderer-wrapper";
import type { BlocksContent } from "@strapi/blocks-react-renderer";

export function BlogPostBody({ content }: { content: BlocksContent }) {
  return (
    <article className="mx-auto max-w-xl md:max-w-2xl w-full xl:order-1 lg:max-2xl:mb-12">
      <BlockRendererWrapper content={content} />
    </article>
  );
}
