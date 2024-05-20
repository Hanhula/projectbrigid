// import { Article } from "@/components/types/article";
// import { Text } from "slate";

// export type CustomElement = {
//   type:
//     | "code"
//     | "paragraph"
//     | "mention"
//     | "h1"
//     | "h2"
//     | "h3"
//     | "h4"
//     | "h5"
//     | "h6"
//     | "blockquote"
//     | "ul"
//     | "ol"
//     | "li"
//     | "aloud"
//     | "section"
//     | "container"
//     | "div";
//   children: CustomText[];
//   align?: "left" | "center" | "right" | "justify";
//   [key: string]: any;
// };

// export interface MentionElement extends CustomElement {
//   type: "mention";
//   children: CustomText[];
//   id: string;
//   entityClass: string;
// }

// export interface CustomText {
//   text: string;
//   bold?: boolean;
//   italics?: boolean;
//   underline?: boolean;
//   code?: boolean;
//   strikethrough?: boolean;
//   type?: string;
//   [key: string]: string | boolean | undefined;
// }

// export type NodeAttributes = {
//   bold?: boolean;
//   italics?: boolean;
//   underline?: boolean;
//   code?: boolean;
//   strikethrough?: boolean;
// };

// export type BlockBBCodeTag = {
//   openTag: string;
//   closeTag: string;
//   type: CustomElement["type"];
// };

// export type MarkBBCodeTag = {
//   openTag: string;
//   closeTag: string;
//   format: keyof CustomText;
// };

// export interface ButtonProps {
//   format: string;
//   icon: string;
// }

// export type EditorProps = {
//   fieldIdentifier: string;
//   id: string;
//   existingContent: string;
//   onFocus: (fieldIdentifier: string) => void;
//   lastFocusedEditor: string | null;
// };

// export const HOTKEYS: { [key: string]: string } = {
//   "mod+b": "bold",
//   "mod+i": "italics",
//   "mod+u": "underline",
//   "mod+`": "code",
// };

// export const LIST_TYPES = ["numbered-list", "bulleted-list"];
// export const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];
