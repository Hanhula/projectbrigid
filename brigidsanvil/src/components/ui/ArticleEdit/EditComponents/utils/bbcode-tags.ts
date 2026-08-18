import { Article } from "@/components/types/article";
import { Extension, Prec, RangeSetBuilder } from "@codemirror/state";
import { acceptCompletion, completionStatus } from "@codemirror/autocomplete";
import {
  KeyBinding,
  Decoration,
  EditorView,
  ViewUpdate,
  keymap,
  ViewPlugin,
} from "@codemirror/view";
import { toolbarButtons, type ToolbarAction } from "./toolbar-buttons";

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
    /\[(quote|spoiler)\]([\s\S]*?)\[\/\1\]/gi,
    (_match, tagName, rawBody) => {
      const body = String(rawBody).replace(/\r\n/g, "\n");
      return `[${tagName}]${body.replace(/\n\|([^\n]*)$/, "|$1")}[/${tagName}]`;
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
    getInsert: () => "[img:]",
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
  "[spoiler]": {
    getInsert: (selectedText) =>
      `[spoiler]${selectedText}|Spoiler Title[/spoiler]`,
    getCursorOffset: (selectedText) =>
      "[spoiler]".length + selectedText.length + "|".length,
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

// Moved to module scope: this array was previously rebuilt on every
// keystroke inside collectDecorationSpans for no reason.
const DECORATION_PATTERNS: Array<{
  regex: RegExp;
  kind: DecorationKind;
  priority: number;
}> = [
  {
    // @[Title](entityClass:id) mentions
    regex: /@\[[^\]\n]+\]\([^)]+\)/g,
    kind: "mention",
    priority: 3,
  },
  {
    // Structural tags that wrap raw, non-BBCode content
    regex:
      /\[(?:row|\/row|col|\/col|container(?::[^\]]+)?|\/container|section|\/section|img(?::[^\]]+)?|url(?::[^\]]+)?|\/url|spoiler|\/spoiler)\]/g,
    kind: "opaque",
    priority: 2,
  },
  {
    // Any other bracketed BBCode tag, e.g. [b], [h1], [quote]
    regex: /\[[^\]\n]+\]/g,
    kind: "tag",
    priority: 1,
  },
  {
    // Quote/spoiler author suffix only: the "|Title" segment that sits
    // directly before a closing [/quote] or [/spoiler]. We keep it
    // scoped to those blocks so unrelated table text isn't styled.
    regex: /\|[^\n\[\]]*(?=\[\/(?:quote|spoiler)\])/gi,
    kind: "author",
    priority: 0,
  },
];

export const collectDecorationSpans = (text: string): DecorationSpan[] => {
  const candidates: DecorationSpan[] = [];

  for (const pattern of DECORATION_PATTERNS) {
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

      // Zero-length matches (possible with the author lookahead) would
      // otherwise spin exec() forever at the same index.
      if (match[0].length === 0) {
        pattern.regex.lastIndex += 1;
      }
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

export const bbcodeHighlighter = ViewPlugin.fromClass(
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

/**
 * Handlers a host component implements to actually mutate the editor.
 * `insertWrappedTag` and `insertList` are optional: if omitted,
 * wrappedTag actions fall back to `insertTag`, and list actions become
 * a no-op key (falls through to CodeMirror's default handling) until
 * the host wires them up.
 */
export type BbcodeCommandHandlers = {
  insertTag: (openTag: string, closeTag: string) => boolean;
  insertWrappedTag?: (openTag: string, closeTag: string) => boolean;
  insertOpaqueBlock: (tag: string) => boolean;
  insertList?: (listTag: "ul" | "ol") => boolean;
  insertLineBreakTag?: () => boolean;
};

const handleEditorTab = (view: EditorView) => {
  if (completionStatus(view.state) === "active") {
    return acceptCompletion(view);
  }

  const selection = view.state.selection.main;
  view.dispatch({
    changes: { from: selection.from, to: selection.to, insert: "\t" },
    selection: { anchor: selection.from + 1 },
  });
  return true;
};

const resolveActionRunner = (
  action: ToolbarAction,
  handlers: BbcodeCommandHandlers,
): (() => boolean) => {
  switch (action.type) {
    case "tag":
      if (action.openTag === "[br]" && handlers.insertLineBreakTag) {
        return () => handlers.insertLineBreakTag!();
      }
      return () => handlers.insertTag(action.openTag, action.closeTag);
    case "wrappedTag":
      return () =>
        (handlers.insertWrappedTag ?? handlers.insertTag)(
          action.openTag,
          action.closeTag,
        );
    case "opaque":
      return () => handlers.insertOpaqueBlock(action.tag);
    case "list":
      return () => handlers.insertList?.(action.listTag) ?? false;
    default:
      return () => false;
  }
};

/**
 * Builds the editor keymap directly from `toolbarButtons`, so a
 * toolbar button's hotkey is guaranteed to match what pressing that
 * key actually does — there's no separate list to keep in sync.
 */
export const createBbcodeKeyBindings = (
  handlers: BbcodeCommandHandlers,
): KeyBinding[] => [
  { key: "Tab", preventDefault: true, run: handleEditorTab },
  ...toolbarButtons
    .filter((button): button is typeof button & { hotkey: string } =>
      Boolean(button.hotkey),
    )
    .map((button) => ({
      key: button.hotkey,
      preventDefault: true,
      run: resolveActionRunner(button.action, handlers),
    })),
];

export const createBbcodeKeymapExtension = (
  handlers: BbcodeCommandHandlers,
): Extension => Prec.high(keymap.of(createBbcodeKeyBindings(handlers)));
