export type CustomElement = {
  type:
    | "code"
    | "paragraph"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "blockquote"
    | "ul"
    | "ol"
    | "li"
    | "aloud";
  children: CustomText[];
  align?: "left" | "center" | "right" | "justify";
};
export type CustomText = {
  text: string;
  bold?: boolean;
  italics?: boolean;
  underline?: boolean;
  code?: boolean;
  strikethrough?: boolean;
};

export type NodeAttributes = {
  bold?: boolean;
  italics?: boolean;
  underline?: boolean;
  code?: boolean;
  strikethrough?: boolean;
};

export type BlockBBCodeTag = {
  openTag: string;
  closeTag: string;
  type: CustomElement["type"];
};

export type MarkBBCodeTag = {
  openTag: string;
  closeTag: string;
  format: keyof CustomText;
};
