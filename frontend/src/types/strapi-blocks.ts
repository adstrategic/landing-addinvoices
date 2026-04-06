export interface TextInlineNode {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

export interface LinkInlineNode {
  type: "link";
  url: string;
  children: TextInlineNode[];
}

export type DefaultInlineNode = TextInlineNode | LinkInlineNode;

export interface HeadingBlockNode {
  type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: DefaultInlineNode[];
}
