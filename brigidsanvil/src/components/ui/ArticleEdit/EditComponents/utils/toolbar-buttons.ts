import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Box,
  Columns,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Image,
  Italic,
  Link,
  List,
  ListOrdered,
  Minus,
  Pilcrow,
  Quote,
  Rows,
  Subscript,
  Superscript,
  Text,
  Underline,
  type LucideIcon,
} from "lucide-react";

export type ToolbarAction =
  | { type: "tag"; openTag: string; closeTag: string }
  | { type: "wrappedTag"; openTag: string; closeTag: string }
  | { type: "opaque"; tag: string }
  | { type: "list"; listTag: "ul" | "ol" };

export type ToolbarButtonConfig = {
  label: string;
  icon: LucideIcon;
  description: string;
  hotkey?: string;
  action: ToolbarAction;
};

export const buildToolbarTooltip = (button: ToolbarButtonConfig) => {
  return button.hotkey
    ? `${button.description} (${button.hotkey})`
    : button.description;
};

export const toolbarButtons: ToolbarButtonConfig[] = [
  {
    label: "Bold",
    icon: Bold,
    description: "Bold",
    hotkey: "Ctrl/Cmd+B",
    action: { type: "tag", openTag: "[b]", closeTag: "[/b]" },
  },
  {
    label: "Italic",
    icon: Italic,
    description: "Italic",
    hotkey: "Ctrl/Cmd+I",
    action: { type: "tag", openTag: "[i]", closeTag: "[/i]" },
  },
  {
    label: "Underline",
    icon: Underline,
    description: "Underline",
    hotkey: "Ctrl/Cmd+U",
    action: { type: "tag", openTag: "[u]", closeTag: "[/u]" },
  },
  {
    label: "H1",
    icon: Heading1,
    description: "Heading 1",
    action: { type: "tag", openTag: "[h1]", closeTag: "[/h1]" },
  },
  {
    label: "H2",
    icon: Heading2,
    description: "Heading 2",
    action: { type: "tag", openTag: "[h2]", closeTag: "[/h2]" },
  },
  {
    label: "H3",
    icon: Heading3,
    description: "Heading 3",
    action: { type: "tag", openTag: "[h3]", closeTag: "[/h3]" },
  },
  {
    label: "H4",
    icon: Heading4,
    description: "Heading 4",
    action: { type: "tag", openTag: "[h4]", closeTag: "[/h4]" },
  },
  {
    label: "H5",
    icon: Heading5,
    description: "Heading 5",
    action: { type: "tag", openTag: "[h5]", closeTag: "[/h5]" },
  },
  {
    label: "P",
    icon: Pilcrow,
    description: "Paragraph",
    action: { type: "tag", openTag: "[p]", closeTag: "[/p]" },
  },
  {
    label: "Quote",
    icon: Quote,
    description: "Quote block",
    hotkey: "Ctrl/Cmd+Alt+Q",
    action: { type: "wrappedTag", openTag: "[quote]", closeTag: "[/quote]" },
  },
  {
    label: "UL",
    icon: List,
    description: "Bulleted list",
    action: { type: "list", listTag: "ul" },
  },
  {
    label: "OL",
    icon: ListOrdered,
    description: "Numbered list",
    action: { type: "list", listTag: "ol" },
  },
  {
    label: "LI",
    icon: List,
    description: "List item",
    action: { type: "tag", openTag: "[li]", closeTag: "[/li]" },
  },
  {
    label: "Sub",
    icon: Subscript,
    description: "Subscript",
    action: { type: "tag", openTag: "[sub]", closeTag: "[/sub]" },
  },
  {
    label: "Sup",
    icon: Superscript,
    description: "Superscript",
    action: { type: "tag", openTag: "[sup]", closeTag: "[/sup]" },
  },
  {
    label: "Small",
    icon: Text,
    description: "Small text",
    action: { type: "tag", openTag: "[small]", closeTag: "[/small]" },
  },
  {
    label: "Linebreak",
    icon: Rows,
    description: "Line break",
    action: { type: "tag", openTag: "[br]", closeTag: "" },
  },
  {
    label: "Horizontal Rule",
    icon: Minus,
    description: "Horizontal rule",
    action: { type: "tag", openTag: "[hr]", closeTag: "" },
  },
  {
    label: "Align Left",
    icon: AlignLeft,
    description: "Align left",
    action: { type: "tag", openTag: "[left]", closeTag: "[/left]" },
  },
  {
    label: "Align Centre",
    icon: AlignCenter,
    description: "Align center",
    action: { type: "tag", openTag: "[center]", closeTag: "[/center]" },
  },
  {
    label: "Align Right",
    icon: AlignRight,
    description: "Align right",
    action: { type: "tag", openTag: "[right]", closeTag: "[/right]" },
  },
  {
    label: "Align Justify",
    icon: AlignJustify,
    description: "Align justify",
    action: { type: "tag", openTag: "[justify]", closeTag: "[/justify]" },
  },
  {
    label: "Row",
    icon: Rows,
    description: "Layout row",
    hotkey: "Ctrl/Cmd+Alt+R",
    action: { type: "opaque", tag: "[row]" },
  },
  {
    label: "Column",
    icon: Columns,
    description: "Layout column",
    action: { type: "opaque", tag: "[col]" },
  },
  {
    label: "Container",
    icon: Box,
    description: "Layout container",
    hotkey: "Ctrl/Cmd+Alt+C",
    action: { type: "opaque", tag: "[container]" },
  },
  {
    label: "Section",
    icon: Box,
    description: "Section",
    action: { type: "opaque", tag: "[section]" },
  },
  {
    label: "Image",
    icon: Image,
    description: "Image reference",
    hotkey: "Ctrl/Cmd+Alt+I",
    action: { type: "opaque", tag: "[img]" },
  },
  {
    label: "Link",
    icon: Link,
    description: "External link",
    action: { type: "opaque", tag: "[url]" },
  },
];
