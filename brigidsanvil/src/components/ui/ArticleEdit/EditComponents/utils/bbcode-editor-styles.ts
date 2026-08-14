import { EditorView } from "@codemirror/view";

export const bbcodeTheme = EditorView.theme({
  "&": {
    border: "1px solid var(--cm-border)",
    borderRadius: "0.375rem",
    background: "var(--background-terror)",
    color: "var(--cm-fontcolor)",
    overflow: "visible",
  },
  ".cm-gutters": {
    background: "var(--darkest-terror)",
    borderColor: "var(--cm-border)",
  },
  ".cm-scroller": {
    fontFamily:
      "Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
    fontSize: "0.85em",
    lineHeight: "1.25rem",
    overflow: "auto",
    minHeight: "2rem",
    maxHeight: "17rem",
  },
  ".cm-content": {
    padding: "0.75rem",
    caretColor: "var(--cm-cursor)",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  ".cm-focused": {
    outline: "none",
  },
  ".cm-cursor, .cm-dropCursor": {
    borderLeftColor: "var(--cm-cursor)",
  },
  ".cm-selectionBackground, &.cm-focused .cm-selectionBackground, .cm-content ::selection":
    {
      backgroundColor: "var(--dark-terror) !important",
    },
  ".bbcode-tag": {
    color: "var(--bbcode-tag)",
    fontWeight: "600",
  },
  ".bbcode-opaque-tag": {
    color: "var(--bbcode-opaque-tag)",
    fontWeight: "700",
  },
  ".bbcode-mention": {
    color: "var(--bbcode-mention-tag)",
    fontWeight: "600",
  },
  ".bbcode-author": {
    color: "var(--bbcode-author-tag)",
    fontWeight: "600",
  },
  ".cm-tooltip": {
    zIndex: "2000",
  },
  ".cm-tooltip-autocomplete": {
    border: "1px solid var(--darkest-terror)",
    background: "var(--darkest-terror)",
    color: "var(--lightgrey)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.35)",
  },
  ".cm-tooltip-autocomplete ul": {
    maxHeight: "16rem",
  },
  ".cm-tooltip-autocomplete ul li": {
    padding: "0.25rem 0.5rem",
  },
  ".cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "var(--primary-dark) !important",
    color: "var(--lightest-terror) !important",
  },
});

export const compactBbcodeTheme = EditorView.theme({
  ".cm-scroller": {
    minHeight: "2.5rem",
  },
  ".cm-content": {
    padding: "0.4rem 0.6rem",
  },
});

export const collapsedBbcodeTheme = EditorView.theme({
  ".cm-scroller": {
    minHeight: "2.5em",
    maxHeight: "2.5em",
    overflow: "hidden",
  },
  ".cm-content": {
    minHeight: "1.7rem",
    padding: "0.4rem 0.6rem",
  },
});

export const contentBbcodeTheme = EditorView.theme({
  ".cm-scroller": {
    minHeight: "2.5em",
    maxHeight: "17rem",
    overflow: "auto",
  },
});

export const focusedBbcodeTheme = EditorView.theme({
  ".cm-scroller": {
    minHeight: "17rem",
    maxHeight: "17rem",
    overflow: "auto",
  },
});
