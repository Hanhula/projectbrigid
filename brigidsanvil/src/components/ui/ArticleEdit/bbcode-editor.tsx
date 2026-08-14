import { useCallback, useEffect, useMemo, useRef } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { minimalSetup } from "codemirror";
import {
  Compartment,
  EditorState,
  Extension,
  Prec,
  RangeSetBuilder,
} from "@codemirror/state";
import {
  KeyBinding,
  Decoration,
  EditorView,
  ViewUpdate,
  keymap,
  ViewPlugin,
} from "@codemirror/view";
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
import { selectWorld } from "@/components/store/apiSlice";
import {
  makeSelectEditedContentValueByID,
  selectCurrentArticles,
  setEditedContentByID,
} from "@/components/store/articlesSlice";
import { Article } from "@/components/types/article";
import { mentions } from "@uiw/codemirror-extensions-mentions";

export type BBCodeEditorProps = {
  fieldIdentifier: string;
  id: string;
  existingContent: string;
  onFocus: (fieldIdentifier: string) => void;
  lastFocusedEditor: string | null;
  resetSignal?: number;
};

const tagDecoration = Decoration.mark({ class: "bbcode-tag" });
const opaqueTagDecoration = Decoration.mark({ class: "bbcode-opaque-tag" });
const mentionDecoration = Decoration.mark({ class: "bbcode-mention" });
const authorDecoration = Decoration.mark({ class: "bbcode-author" });

export const mentionTokenRegex = /@\[[^\]\n]*|@[a-zA-Z0-9_'\-]*/;
export const mentionCompletionTokenRegex = /(?:@\[[^\]\n]*|@[a-zA-Z0-9_'\-]*)$/;

type DecorationKind = "mention" | "opaque" | "tag" | "author";

type DecorationSpan = {
  from: number;
  to: number;
  kind: DecorationKind;
  priority: number;
};

const decorationForKind: Record<DecorationKind, Decoration> = {
  mention: mentionDecoration,
  opaque: opaqueTagDecoration,
  tag: tagDecoration,
  author: authorDecoration,
};

export const normalizeMentionQuery = (token: string) => {
  if (token.startsWith("@[")) {
    return token.slice(2).toLowerCase();
  }

  if (token.startsWith("@")) {
    return token.slice(1).toLowerCase();
  }

  return token.toLowerCase();
};

export const shouldOpenMentionCompletionFromInsertion = (
  insertedText: string,
) => insertedText.includes("@");

const normalizedEntityClass = (entityClass: unknown) => {
  if (typeof entityClass !== "string") {
    return "";
  }

  return entityClass.toLowerCase();
};

export const getMentionSuggestions = (articles: Article[], query: string) => {
  const normalizedQuery = query.toLowerCase();
  const normalizedArticles = articles.filter(
    (article) => typeof article?.title === "string" && article.title.length > 0,
  );

  const prefixMatches = normalizedArticles.filter((article) =>
    article.title.toLowerCase().startsWith(normalizedQuery),
  );

  const containsMatches = normalizedArticles.filter((article) => {
    const normalizedTitle = article.title.toLowerCase();
    return (
      !normalizedTitle.startsWith(normalizedQuery) &&
      normalizedTitle.includes(normalizedQuery)
    );
  });

  const fallbackMatches =
    normalizedQuery.length > 0 &&
    prefixMatches.length === 0 &&
    containsMatches.length === 0
      ? normalizedArticles
      : [];

  const suggestions = [...prefixMatches, ...containsMatches, ...fallbackMatches]
    .slice(0, 10)
    .map((article) => ({
      label: article.title,
      detail: article.entityClass,
      type: "variable" as const,
      apply: (
        view: EditorView,
        _completion: { label: string },
        from: number,
        to: number,
      ) => {
        const mentionValue = `@[${article.title}](${normalizedEntityClass(
          article.entityClass,
        )}:${article.id})`;
        view.dispatch({
          changes: { from, to, insert: mentionValue },
          selection: { anchor: from + mentionValue.length },
        });
        view.focus();
      },
    }));

  if (suggestions.length > 0) {
    return suggestions;
  }

  return [
    {
      label: "No matching articles",
      detail:
        normalizedArticles.length > 0
          ? `${normalizedArticles.length} loaded in current world`
          : "No articles loaded for current world",
      type: "text" as const,
      apply: () => {},
    },
  ];
};

export const buildMentionCompletions = (articles: Article[]) => {
  return articles
    .filter(
      (article) =>
        typeof article?.title === "string" &&
        article.title.length > 0 &&
        typeof article?.id === "string",
    )
    .slice(0, 200)
    .map((article) => ({
      label: `@${article.title}`,
      detail: article.entityClass,
      type: "variable" as const,
      apply: `@[${article.title}](${normalizedEntityClass(
        article.entityClass,
      )}:${article.id})`,
    }));
};

export const normalizeEditorLinebreaks = (value: string) => {
  return value.replace(/\r\n/g, "\n").replace(/(^|\n)[ \t]+(?=\n|$)/g, "$1");
};

export const normalizeQuoteAuthorDelimiter = (value: string) => {
  return value.replace(
    /\[quote\]([\s\S]*?)\[\/quote\]/gi,
    (_match, rawBody) => {
      const body = String(rawBody).replace(/\r\n/g, "\n");
      return `[quote]${body.replace(/\n\|([^\n]*)$/, "|$1")}[/quote]`;
    },
  );
};

export const normalizeWorldAnvilSingleLineBreaks = (value: string) => {
  return value.replace(/(?<!\n)\n(?!\n)/g, "[br]");
};

type OpaqueInsertDefinition = {
  getInsert: (selectedText: string) => string;
  getCursorOffset: (selectedText: string) => number;
};

const defaultOpaqueInsertDefinition: OpaqueInsertDefinition = {
  getInsert: (selectedText) => `[container]\n${selectedText}\n[/container]`,
  getCursorOffset: (selectedText) =>
    "[container]\n".length + selectedText.length,
};

const opaqueInsertRegistry: Record<string, OpaqueInsertDefinition> = {
  "[img]": {
    getInsert: () => "[img:image-id]",
    getCursorOffset: () => "[img:".length,
  },
  "[row]": {
    getInsert: (selectedText) => `[row]\n${selectedText}\n[/row]`,
    getCursorOffset: (selectedText) => "[row]\n".length + selectedText.length,
  },
  "[col]": {
    getInsert: (selectedText) => `[col]\n${selectedText}\n[/col]`,
    getCursorOffset: (selectedText) => "[col]\n".length + selectedText.length,
  },
  "[container]": {
    getInsert: (selectedText) => `[container]\n${selectedText}\n[/container]`,
    getCursorOffset: (selectedText) =>
      "[container]\n".length + selectedText.length,
  },
  "[section]": {
    getInsert: (selectedText) => `[section]\n${selectedText}\n[/section]`,
    getCursorOffset: (selectedText) =>
      "[section]\n".length + selectedText.length,
  },
  "[url]": {
    getInsert: (selectedText) => `[url:url-data]\n${selectedText}\n[/url]`,
    getCursorOffset: (selectedText) =>
      "[url:url-data]\n".length + selectedText.length,
  },
};

export const getOpaqueInsert = (tag: string, selectedText: string) => {
  const opaqueInsertDefinition =
    opaqueInsertRegistry[tag] ?? defaultOpaqueInsertDefinition;

  return {
    insert: opaqueInsertDefinition.getInsert(selectedText),
    cursorOffset: opaqueInsertDefinition.getCursorOffset(selectedText),
  };
};

const overlaps = (
  from: number,
  to: number,
  ranges: Array<[number, number]>,
) => {
  return ranges.some(
    ([rangeFrom, rangeTo]) => from < rangeTo && to > rangeFrom,
  );
};

export const collectDecorationSpans = (text: string): DecorationSpan[] => {
  const patterns: Array<{
    regex: RegExp;
    kind: DecorationKind;
    priority: number;
  }> = [
    {
      regex: /@\[[^\]\n]+\]\([^)]+\)/g,
      kind: "mention",
      priority: 3,
    },
    {
      regex:
        /\[(?:row|\/row|col|\/col|container(?::[^\]]+)?|\/container|section|\/section|img(?::[^\]]+)?|url(?::[^\]]+)?|\/url)\]/g,
      kind: "opaque",
      priority: 2,
    },
    {
      // Broad token matcher for WA BBCode tags, including parameterized variants.
      regex: /\[[^\]\n]+\]/g,
      kind: "tag",
      priority: 1,
    },
    {
      regex: /\|[^\n\[]+/g,
      kind: "author",
      priority: 0,
    },
  ];

  const candidates: DecorationSpan[] = [];

  for (const pattern of patterns) {
    pattern.regex.lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.regex.exec(text)) !== null) {
      const from = match.index;
      const to = from + match[0].length;

      candidates.push({
        from,
        to,
        kind: pattern.kind,
        priority: pattern.priority,
      });
    }
  }

  candidates.sort((a, b) => {
    if (a.from !== b.from) {
      return a.from - b.from;
    }

    if (a.priority !== b.priority) {
      return b.priority - a.priority;
    }

    return b.to - a.to;
  });

  const occupiedRanges: Array<[number, number]> = [];
  const spans: DecorationSpan[] = [];

  for (const candidate of candidates) {
    if (!overlaps(candidate.from, candidate.to, occupiedRanges)) {
      occupiedRanges.push([candidate.from, candidate.to]);
      spans.push(candidate);
    }
  }

  return spans;
};

const buildDecorations = (view: EditorView) => {
  const text = view.state.doc.toString();
  const builder = new RangeSetBuilder<Decoration>();

  for (const span of collectDecorationSpans(text)) {
    builder.add(span.from, span.to, decorationForKind[span.kind]);
  }

  return builder.finish();
};

const bbcodeHighlighter = ViewPlugin.fromClass(
  class {
    decorations;

    constructor(view: EditorView) {
      this.decorations = buildDecorations(view);
    }

    update(update: ViewUpdate) {
      if (update.docChanged || update.viewportChanged) {
        this.decorations = buildDecorations(update.view);
      }
    }
  },
  {
    decorations: (view) => view.decorations,
  },
);

const bbcodeTheme = EditorView.theme({
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

export const createBbcodeKeyBindings = (handlers: {
  insertTag: (openTag: string, closeTag: string) => boolean;
  insertOpaqueBlock: (tag: string) => boolean;
  insertLineBreakTag?: () => boolean;
}): KeyBinding[] => {
  return [
    { key: "Mod-b", run: () => handlers.insertTag("[b]", "[/b]") },
    { key: "Mod-i", run: () => handlers.insertTag("[i]", "[/i]") },
    { key: "Mod-u", run: () => handlers.insertTag("[u]", "[/u]") },
    {
      key: "Shift-Enter",
      run: () =>
        handlers.insertLineBreakTag ? handlers.insertLineBreakTag() : false,
    },
    { key: "Mod-Alt-q", run: () => handlers.insertTag("[quote]", "[/quote]") },
    { key: "Mod-Alt-r", run: () => handlers.insertOpaqueBlock("[row]") },
    {
      key: "Mod-Alt-c",
      run: () => handlers.insertOpaqueBlock("[container]"),
    },
    { key: "Mod-Alt-i", run: () => handlers.insertOpaqueBlock("[img]") },
  ];
};

export const createBbcodeKeymapExtension = (handlers: {
  insertTag: (openTag: string, closeTag: string) => boolean;
  insertOpaqueBlock: (tag: string) => boolean;
  insertLineBreakTag?: () => boolean;
}): Extension => {
  return Prec.high(keymap.of(createBbcodeKeyBindings(handlers)));
};

type ToolbarAction =
  | { type: "tag"; openTag: string; closeTag: string }
  | { type: "wrappedTag"; openTag: string; closeTag: string }
  | { type: "opaque"; tag: string }
  | { type: "list"; listTag: "ul" | "ol" };

type ToolbarButtonConfig = {
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

const toolbarButtons: ToolbarButtonConfig[] = [
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

const BBCodeEditor = ({
  fieldIdentifier,
  id,
  existingContent,
  onFocus,
  lastFocusedEditor,
  resetSignal = 0,
}: BBCodeEditorProps) => {
  const dispatch = useDispatch();
  const world = useSelector(selectWorld);
  const articles = useSelector(selectCurrentArticles);
  const selectEditedContentByID = useMemo(
    () => makeSelectEditedContentValueByID(world.id, id, fieldIdentifier),
    [world.id, id, fieldIdentifier],
  );
  const editedContentValue = useSelector(selectEditedContentByID);
  const editedContent =
    typeof editedContentValue === "string" ? editedContentValue : undefined;

  const editorHostRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);
  const editedContentRef = useRef<string | undefined>(editedContent);
  const existingContentRef = useRef(existingContent);
  const worldRef = useRef(world);
  const articlesRef = useRef(articles);
  const currentValueRef = useRef<string>(
    editedContent ?? existingContent ?? "",
  );
  const previousResetSignalRef = useRef(resetSignal);
  const mentionCompartmentRef = useRef(new Compartment());

  useEffect(() => {
    editedContentRef.current = editedContent;
  }, [editedContent]);

  useEffect(() => {
    existingContentRef.current = existingContent;
  }, [existingContent]);

  useEffect(() => {
    worldRef.current = world;
  }, [world]);

  useEffect(() => {
    articlesRef.current = articles;
  }, [articles]);

  useEffect(() => {
    currentValueRef.current = editedContent ?? existingContent ?? "";
  }, [editedContent, existingContent]);

  const commitRawValue = useCallback(
    (value: string) => {
      const normalizedValue = normalizeQuoteAuthorDelimiter(
        normalizeEditorLinebreaks(value),
      );

      if (normalizedValue === editedContentRef.current) {
        return;
      }

      if (
        !editedContentRef.current &&
        existingContentRef.current &&
        normalizedValue === existingContentRef.current
      ) {
        return;
      }

      dispatch(
        setEditedContentByID({
          world: { id: worldRef.current.id },
          articleID: id,
          fieldIdentifier,
          editedFields: normalizedValue,
        }),
      );
    },
    [dispatch, fieldIdentifier, id],
  );

  const insertTag = useCallback((openTag: string, closeTag: string) => {
    const view = viewRef.current;
    if (!view) {
      return false;
    }

    const selection = view.state.selection.main;
    const from = selection.from;
    const to = selection.to;
    const selectedText = view.state.sliceDoc(from, to);
    const hasSelection = from !== to;
    const insert = `${openTag}${selectedText}${closeTag}`;

    view.dispatch({
      changes: { from, to, insert },
      selection: {
        anchor: hasSelection ? from + insert.length : from + openTag.length,
      },
    });
    view.focus();
    return true;
  }, []);

  const insertLineBreakTag = useCallback(() => {
    const view = viewRef.current;
    if (!view) {
      return false;
    }

    const selection = view.state.selection.main;
    const from = selection.from;
    const to = selection.to;

    view.dispatch({
      changes: { from, to, insert: "[br]" },
      selection: { anchor: from + "[br]".length },
    });
    view.focus();
    return true;
  }, []);

  const insertWrappedTag = useCallback((openTag: string, closeTag: string) => {
    const view = viewRef.current;
    if (!view) {
      return false;
    }

    const selection = view.state.selection.main;
    const from = selection.from;
    const to = selection.to;
    const selectedText = view.state.sliceDoc(from, to);
    const nextValue = `${openTag}${selectedText}${closeTag}`;

    view.dispatch({
      changes: { from, to, insert: nextValue },
      selection: { anchor: from + openTag.length + selectedText.length },
    });
    view.focus();
    return true;
  }, []);

  const insertOpaqueBlock = useCallback((tag: string) => {
    const view = viewRef.current;
    if (!view) {
      return false;
    }

    const selection = view.state.selection.main;
    const from = selection.from;
    const to = selection.to;
    const selectedText = view.state.sliceDoc(from, to);
    const { insert, cursorOffset } = getOpaqueInsert(tag, selectedText);

    view.dispatch({
      changes: { from, to, insert },
      selection: { anchor: from + cursorOffset },
    });
    view.focus();
    return true;
  }, []);

  const insertListBlock = useCallback((listTag: "ul" | "ol") => {
    const view = viewRef.current;
    if (!view) {
      return false;
    }

    const selection = view.state.selection.main;
    const from = selection.from;
    const to = selection.to;
    const selectedText = view.state.sliceDoc(from, to);

    const fallbackItem = selectedText.length > 0 ? selectedText : "item";
    const insert = `[${listTag}]\n[li]${fallbackItem}[/li]\n[/${listTag}]`;
    const cursorOffset = `[${listTag}]\n[li]`.length + fallbackItem.length;

    view.dispatch({
      changes: { from, to, insert },
      selection: { anchor: from + cursorOffset },
    });
    view.focus();
    return true;
  }, []);

  const runToolbarAction = useCallback(
    (action: ToolbarAction) => {
      if (action.type === "tag") {
        return insertTag(action.openTag, action.closeTag);
      }

      if (action.type === "wrappedTag") {
        return insertWrappedTag(action.openTag, action.closeTag);
      }

      if (action.type === "opaque") {
        return insertOpaqueBlock(action.tag);
      }

      return insertListBlock(action.listTag);
    },
    [insertListBlock, insertOpaqueBlock, insertTag, insertWrappedTag],
  );

  useEffect(() => {
    if (!editorHostRef.current || viewRef.current) {
      return;
    }

    const view = new EditorView({
      state: EditorState.create({
        doc: currentValueRef.current,
        extensions: [
          minimalSetup,
          EditorView.lineWrapping,
          bbcodeTheme,
          bbcodeHighlighter,
          mentionCompartmentRef.current.of(
            mentions(buildMentionCompletions(articlesRef.current)),
          ),
          createBbcodeKeymapExtension({
            insertTag,
            insertOpaqueBlock,
            insertLineBreakTag,
          }),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              const nextValue = update.state.doc.toString();
              currentValueRef.current = nextValue;
              commitRawValue(nextValue);
            }
          }),
          EditorView.domEventHandlers({
            focus: () => {
              onFocus(fieldIdentifier);
              return false;
            },
            blur: () => {
              commitRawValue(currentValueRef.current);
              onFocus("");
              return false;
            },
          }),
        ],
      }),
      parent: editorHostRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [
    commitRawValue,
    fieldIdentifier,
    insertLineBreakTag,
    insertOpaqueBlock,
    insertTag,
    onFocus,
  ]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) {
      return;
    }

    view.dispatch({
      effects: mentionCompartmentRef.current.reconfigure(
        mentions(buildMentionCompletions(articlesRef.current)),
      ),
    });
  }, [articles]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view || lastFocusedEditor === fieldIdentifier) {
      return;
    }

    const nextValue = editedContent ?? currentValueRef.current;
    if (view.state.doc.toString() === nextValue) {
      return;
    }

    view.dispatch({
      changes: {
        from: 0,
        to: view.state.doc.length,
        insert: nextValue,
      },
    });
    currentValueRef.current = nextValue;
  }, [editedContent, existingContent, fieldIdentifier, lastFocusedEditor]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) {
      return;
    }

    if (previousResetSignalRef.current === resetSignal) {
      return;
    }
    previousResetSignalRef.current = resetSignal;

    const resetValue = existingContent ?? "";

    view.dispatch({
      changes: {
        from: 0,
        to: view.state.doc.length,
        insert: resetValue,
      },
      selection: {
        anchor: Math.min(view.state.selection.main.anchor, resetValue.length),
      },
    });

    currentValueRef.current = resetValue;
  }, [existingContent, resetSignal]);

  const isFocusedEditor = lastFocusedEditor === fieldIdentifier;

  return (
    <div>
      <Container className="px-0 mb-2">
        <ButtonGroup
          className="flex-wrap"
          role="toolbar"
          aria-label="BBCode helpers"
        >
          {toolbarButtons.map((button) => (
            <Button
              key={button.label}
              type="button"
              size="sm"
              variant="outline-secondary"
              aria-label={button.label}
              title={buildToolbarTooltip(button)}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => runToolbarAction(button.action)}
            >
              <button.icon size={16} aria-hidden="true" focusable={false} />
              <span className="visually-hidden">{button.label}</span>
            </Button>
          ))}
        </ButtonGroup>
      </Container>

      <div
        style={{
          border: isFocusedEditor ? "1px solid #60a5fa" : "1px solid #d0d7de",
          borderRadius: "0.375rem",
          overflow: "visible",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div ref={editorHostRef} />
      </div>
    </div>
  );
};

export default BBCodeEditor;
