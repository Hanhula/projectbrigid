import { HighlightStyle } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

export const cssHighlightStyle = HighlightStyle.define([
  { tag: t.propertyName, color: "#7dd3fc" },
  { tag: t.keyword, color: "#c4b5fd" },
  { tag: t.className, color: "#fca5a5" },
  { tag: t.tagName, color: "#fca5a5" },
  { tag: t.number, color: "#fcd34d" },
  { tag: t.string, color: "#86efac" },
  { tag: t.atom, color: "#fcd34d" },
  { tag: t.color, color: "#fcd34d" },
  { tag: t.operator, color: "#e5e7eb" },
  { tag: t.punctuation, color: "#e5e7eb" },
  { tag: t.bracket, color: "#e5e7eb" },
  { tag: t.comment, color: "#9ca3af", fontStyle: "italic" },
  { tag: t.variableName, color: "#7dd3fc" },
  { tag: t.attributeName, color: "#7dd3fc" },
  { tag: t.unit, color: "#fcd34d" },
]);
