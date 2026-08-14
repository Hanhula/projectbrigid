import { EditorView } from "@codemirror/view";

export const bbcodeTheme = EditorView.theme({
  "&": {
    border: "1px solid #d0d7de",
    borderRadius: "0.375rem",
    background: "#0f172a",
    color: "#e5e7eb",
    overflow: "visible",
  },
  ".cm-scroller": {
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace",
    fontSize: "0.95rem",
    lineHeight: "1.5",
    minHeight: "18rem",
  },
  ".cm-content": {
    padding: "0.75rem",
    caretColor: "#f8fafc",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  ".cm-focused": {
    outline: "none",
  },
  ".cm-cursor, .cm-dropCursor": {
    borderLeftColor: "#f8fafc",
  },
  ".cm-selectionBackground, &.cm-focused .cm-selectionBackground, .cm-content ::selection":
    {
      backgroundColor: "rgba(59, 130, 246, 0.35) !important",
    },
  ".bbcode-tag": {
    color: "#d73a49",
    fontWeight: "600",
  },
  ".bbcode-opaque-tag": {
    color: "#f59e0b",
    fontWeight: "700",
  },
  ".bbcode-mention": {
    color: "#6f42c1",
    fontWeight: "600",
  },
  ".bbcode-author": {
    color: "#0b7285",
    fontWeight: "600",
  },
  ".cm-tooltip": {
    zIndex: "2000",
  },
  ".cm-tooltip-autocomplete": {
    border: "1px solid #1f2937",
    background: "#111827",
    color: "#f9fafb",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.35)",
  },
  ".cm-tooltip-autocomplete ul": {
    maxHeight: "16rem",
  },
  ".cm-tooltip-autocomplete ul li": {
    padding: "0.25rem 0.5rem",
  },
  ".cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#2563eb",
    color: "#ffffff",
  },
});
