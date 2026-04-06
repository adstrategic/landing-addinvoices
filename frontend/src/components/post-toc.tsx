"use client";

import { Minus, Plus } from "lucide-react";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { slugifyHeadingId } from "@/lib/blog/heading-ids";
import { plainTextFromHeadingBlock } from "@/lib/blog/heading-plain-text";
import type { HeadingBlockNode } from "@/types/strapi-blocks";

const PostTOC = ({
  tableOfContents,
  title,
  mobileTitle,
}: {
  tableOfContents: HeadingBlockNode[];
  title: string;
  mobileTitle: string;
}) => {
  const [open, setOpen] = useState(false);

  const [activeLink, setActiveLink] = useState("");

  const headingRows = useMemo(
    () =>
      tableOfContents.map((heading) => {
        const text = plainTextFromHeadingBlock(heading);
        return { text, id: slugifyHeadingId(text) };
      }),
    [tableOfContents],
  );

  return (
    <>
      <div className="sticky self-end lg:w-96 lg:mt-44 col-span-8 lg:col-span-9 bottom-8 px-4 z-40 w-full lg:pr-0 2xl:hidden lg:ml-auto lg:mr-0 lg:row-start-1 lg:order-2 lg:col-start-1 lg:pl-8">
        <div className="bg-white border-black/20 border rounded-sm text-sm flex flex-col max-h-[70vh] overflow-hidden w-full max-w-xl md:max-w-2xl mx-auto lg:absolute lg:bottom-0">
          <button
            onClick={() => setOpen(!open)}
            className={`py-6 px-4 cursor-pointer flex justify-between items-center w-full max-w-xl md:max-w-2xl mx-auto ${open && "border-b border-black/30 border-dashed"}`}
          >
            <span className="text-primary font-semibold">{mobileTitle}</span>
            {open ? <Minus /> : <Plus />}
          </button>
          {open && (
            <TOC
              key={`table-of-contents-mobile`}
              headingRows={headingRows}
              setParentOpen={setOpen}
              activeLink={activeLink}
              setActiveLink={setActiveLink}
            />
          )}
        </div>
      </div>
      <div className="hidden 2xl:block col-span-full lg:row-start-1 lg:col-start-1 lg:col-span-2 lg:sticky lg:top-20 self-start overflow-auto lg:p-4 lg:pr-0 2xl:-ml-8">
        <div className="mb-10 w-full rounded-2xl bg-white">
          <div
            className={`max-h-[70vh] overflow-hidden flex flex-col
            `}
          >
            <h2 className="px-5 py-2 text-sm font-medium uppercase text-slate-500 border-b border-black/30 border-dashed">
              {title}
            </h2>

            <TOC
              key={`table-of-contents-desktop`}
              headingRows={headingRows}
              activeLink={activeLink}
              setActiveLink={setActiveLink}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const TOC = ({
  headingRows,
  setParentOpen,
  activeLink,
  setActiveLink,
}: {
  headingRows: Array<{ text: string; id: string }>;
  setParentOpen?: Dispatch<SetStateAction<boolean>>;
  activeLink: string;
  setActiveLink: Dispatch<SetStateAction<string>>;
}) => {
  const ids = useMemo(() => headingRows.map((r) => r.id), [headingRows]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      if (ids.length === 0) return;

      const elements = ids.map((id) => document.getElementById(id));

      let currentHeadingIndex = 0;

      for (let i = elements.length - 1; i >= 0; i--) {
        if ((elements[i]?.offsetTop as number) <= scrollPosition) {
          currentHeadingIndex = i;
          break;
        }
      }

      const activeId = ids[currentHeadingIndex];
      setActiveLink(activeId);
      if (setParentOpen) {
        setParentOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ids, setActiveLink, setParentOpen]);

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string,
  ) => {
    event.preventDefault();
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const yOffset = -100;
      const yPosition =
        targetElement.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: yPosition, behavior: "smooth" });
      setActiveLink(id);
      if (setParentOpen) {
        setParentOpen(false);
      }
      history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <ul className="font-semibold p-4 overflow-y-auto">
      {headingRows.map(({ text, id }) => {
        return (
          <li
            key={id}
            className="w-full mb-4 text-sm font-medium text-wrap text-gray-500 cursor-pointer hover:underline"
          >
            <a
              href={`#${id}`}
              onClick={(event) => handleLinkClick(event, id)}
              style={{
                color: activeLink === id ? "#15803d" : "#6b7280",
              }}
            >
              {text}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default PostTOC;
