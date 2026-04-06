"use client";

import {
  type BlocksContent,
  BlocksRenderer,
} from "@strapi/blocks-react-renderer";
import Image from "next/image";

import React from "react";
import { slugifyHeadingId } from "@/lib/blog/heading-ids";

const BlockRendererWrapper = ({ content }: { content: BlocksContent }) => {
  if (!content) return null;

  return (
    <div className="hashnode-content-style">
      <BlocksRenderer
        content={content}
        blocks={{
          image: ({ image }) => {
            return (
              <Image
                src={image.url}
                width={image.width}
                height={image.height}
                sizes="(max-width: 640px) 80vw, 600px"
                alt={image.alternativeText || ""}
              />
            );
          },
          heading: ({ children, level }) => {
            const idString = (Array.isArray(children) ? children : [])
              .map((child) => {
                if (child.props.content) {
                  return child.props.content.children
                    .map((child: { text: string; type: string }) => child.text)
                    .join(" ")
                    .trim();
                } else {
                  return child.props.text;
                }
              })
              .join(" ");

            const id = slugifyHeadingId(idString);

            switch (level) {
              case 1:
                return <h1 id={id}>{children}</h1>;
              case 2:
                return <h2 id={id}>{children}</h2>;
              case 3:
                return <h3 id={id}>{children}</h3>;
              case 4:
                return <h4 id={id}>{children}</h4>;
              case 5:
                return <h5 id={id}>{children}</h5>;
              case 6:
                return <h6 id={id}>{children}</h6>;
              default:
                return <h2 id={id}>{children}</h2>;
            }
          },
        }}
      />
    </div>
  );
};

export default BlockRendererWrapper;
