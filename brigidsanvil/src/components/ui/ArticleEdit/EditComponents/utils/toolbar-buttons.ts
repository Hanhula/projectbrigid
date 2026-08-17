import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  ArrowDownAZ,
  Bold,
  BookKey,
  Box,
  Boxes,
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
  ListPlus,
  Minus,
  Pilcrow,
  Quote,
  Rows,
  Subscript,
  Superscript,
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

const MODIFIER_LABELS: Record<string, string> = {
  Mod: "Ctrl",
  Alt: "Alt",
  Shift: "Shift",
  Ctrl: "Ctrl",
  Meta: "Cmd",
};

/** Turns a CodeMirror key string like "Mod-Shift-c" into "Ctrl+Shift+C". */
export const formatHotkeyLabel = (hotkey: string) => {
  const parts = hotkey.split("-");
  const key = parts.pop() ?? "";
  const modifiers = parts.map((part) => MODIFIER_LABELS[part] ?? part);
  const keyLabel = key.length === 1 ? key.toUpperCase() : key;
  return [...modifiers, keyLabel].join("+");
};

export const buildToolbarTooltip = (button: ToolbarButtonConfig) => {
  return button.hotkey
    ? `${button.description} (${formatHotkeyLabel(button.hotkey)})`
    : button.description;
};

export const toolbarButtons: ToolbarButtonConfig[] = [
  {
    label: "Bold",
    icon: Bold,
    description: "Bold",
    hotkey: "Mod-b",
    action: { type: "tag", openTag: "[b]", closeTag: "[/b]" },
  },
  {
    label: "Italic",
    icon: Italic,
    description: "Italic",
    hotkey: "Mod-i",
    action: { type: "tag", openTag: "[i]", closeTag: "[/i]" },
  },
  {
    label: "Underline",
    icon: Underline,
    description: "Underline",
    hotkey: "Mod-u",
    action: { type: "tag", openTag: "[u]", closeTag: "[/u]" },
  },
  {
    label: "H1",
    icon: Heading1,
    description: "Heading 1",
    hotkey: "Mod-1",
    action: { type: "tag", openTag: "[h1]", closeTag: "[/h1]" },
  },
  {
    label: "H2",
    icon: Heading2,
    description: "Heading 2",
    hotkey: "Mod-2",
    action: { type: "tag", openTag: "[h2]", closeTag: "[/h2]" },
  },
  {
    label: "H3",
    icon: Heading3,
    description: "Heading 3",
    hotkey: "Mod-3",
    action: { type: "tag", openTag: "[h3]", closeTag: "[/h3]" },
  },
  {
    label: "H4",
    icon: Heading4,
    description: "Heading 4",
    hotkey: "Mod-4",
    action: { type: "tag", openTag: "[h4]", closeTag: "[/h4]" },
  },
  {
    label: "H5",
    icon: Heading5,
    description: "Heading 5",
    hotkey: "Mod-5",
    action: { type: "tag", openTag: "[h5]", closeTag: "[/h5]" },
  },
  {
    label: "P",
    icon: Pilcrow,
    description: "Paragraph",
    hotkey: "Mod-p",
    action: { type: "tag", openTag: "[p]", closeTag: "[/p]" },
  },
  {
    label: "Quote",
    icon: Quote,
    description: "Quote block",
    hotkey: "Mod-Alt-q",
    action: { type: "wrappedTag", openTag: "[quote]", closeTag: "[/quote]" },
  },
  {
    label: "UL",
    icon: List,
    description: "Bulleted list",
    hotkey: "Mod-Alt-8",
    action: { type: "list", listTag: "ul" },
  },
  {
    label: "OL",
    icon: ListOrdered,
    description: "Numbered list",
    hotkey: "Mod-Alt-9",
    action: { type: "list", listTag: "ol" },
  },
  {
    label: "LI",
    icon: ListPlus,
    description: "List item",
    hotkey: "Mod-Alt-l",
    action: { type: "tag", openTag: "[li]", closeTag: "[/li]" },
  },
  {
    label: "Sub",
    icon: Subscript,
    description: "Subscript",
    hotkey: "Mod-Shift-d",
    action: { type: "tag", openTag: "[sub]", closeTag: "[/sub]" },
  },
  {
    label: "Sup",
    icon: Superscript,
    description: "Superscript",
    hotkey: "Mod-Shift-u",
    action: { type: "tag", openTag: "[sup]", closeTag: "[/sup]" },
  },
  {
    label: "Small",
    icon: ArrowDownAZ,
    description: "Small text",
    hotkey: "Mod-Shift-t",
    action: { type: "tag", openTag: "[small]", closeTag: "[/small]" },
  },
  {
    label: "Linebreak",
    icon: Rows,
    description: "Line break",
    hotkey: "Shift-Enter",
    action: { type: "tag", openTag: "[br]", closeTag: "" },
  },
  {
    label: "Horizontal Rule",
    icon: Minus,
    description: "Horizontal rule",
    hotkey: "Mod-Shift-h",
    action: { type: "tag", openTag: "[hr]", closeTag: "" },
  },
  {
    label: "Align Left",
    icon: AlignLeft,
    description: "Align left",
    hotkey: "Mod-Shift-l",
    action: { type: "tag", openTag: "[left]", closeTag: "[/left]" },
  },
  {
    label: "Align Centre",
    icon: AlignCenter,
    description: "Align center",
    hotkey: "Mod-Shift-e",
    action: { type: "tag", openTag: "[center]", closeTag: "[/center]" },
  },
  {
    label: "Align Right",
    icon: AlignRight,
    description: "Align right",
    hotkey: "Mod-Shift-r",
    action: { type: "tag", openTag: "[right]", closeTag: "[/right]" },
  },
  {
    label: "Align Justify",
    icon: AlignJustify,
    description: "Align justify",
    hotkey: "Mod-Shift-j",
    action: { type: "tag", openTag: "[justify]", closeTag: "[/justify]" },
  },
  {
    label: "Row",
    icon: Rows,
    description: "Layout row",
    hotkey: "Mod-Shift-2",
    action: { type: "opaque", tag: "[row]" },
  },
  {
    label: "Column",
    icon: Columns,
    description: "Layout column",
    hotkey: "Mod-Shift-3",
    action: { type: "opaque", tag: "[col]" },
  },
  {
    label: "Container",
    icon: Box,
    description: "Layout container",
    hotkey: "Mod-Shift-1",
    action: { type: "opaque", tag: "[container]" },
  },
  {
    label: "Section",
    icon: Boxes,
    description: "Section",
    hotkey: "Mod-Shift-s",
    action: { type: "opaque", tag: "[section]" },
  },
  {
    label: "Image",
    icon: Image,
    description: "Image reference",
    hotkey: "Mod-Shift-i",
    action: { type: "opaque", tag: "[img]" },
  },
  {
    label: "Link",
    icon: Link,
    description: "External link",
    hotkey: "Mod-Shift-k",
    action: { type: "opaque", tag: "[url]" },
  },
  {
    label: "Spoiler",
    icon: BookKey,
    description: "Spoiler",
    hotkey: "Mod-Shift-o",
    action: { type: "opaque", tag: "[spoiler]" },
  },
];
