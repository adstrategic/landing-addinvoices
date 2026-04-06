import { BlocksContent } from "@strapi/blocks-react-renderer";

export interface TableOfContentsItem {
  id: string;
  level: number;
  slug: string;
  title: string;
  parentId: string | null;
}

export interface Post {
  id: number;
  documentId: string;
  body: BlocksContent;
  title: string;
  seo_description: string;
  date_created: string;
  slug: string;
  locale: string;
  cover: {
    id: number;
    documentId: string;
    url: string;
    alternativeText: string | null;
    name: string;
  };
  localizations: Array<{
    id: number;
    documentId: string;
    slug: string;
    locale: string;
  }>;
}
