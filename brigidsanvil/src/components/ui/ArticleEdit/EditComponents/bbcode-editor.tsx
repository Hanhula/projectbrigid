import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { minimalSetup } from "codemirror";
import { Compartment, EditorState } from "@codemirror/state";
import { EditorView, lineNumbers } from "@codemirror/view";
import { selectWorld } from "@/components/store/apiSlice";
import {
  makeSelectEditedContentValueByID,
  selectCurrentArticles,
  setEditedContentByID,
} from "@/components/store/articlesSlice";
import { mentions } from "@uiw/codemirror-extensions-mentions";
import {
  buildToolbarTooltip,
  ToolbarAction,
  toolbarButtons,
} from "./utils/toolbar-buttons";
import {
  bbcodeHighlighter,
  buildMentionCompletions,
  createBbcodeKeymapExtension,
  getOpaqueInsert,
  normalizeEditorLinebreaks,
  normalizeQuoteAuthorDelimiter,
} from "./utils/bbcode-tags";
import {
  bbcodeTheme,
  collapsedBbcodeTheme,
  compactBbcodeTheme,
  contentBbcodeTheme,
  focusedBbcodeTheme,
} from "./utils/bbcode-editor-styles";

export type BBCodeEditorProps = {
  fieldIdentifier: string;
  id: string;
  existingContent: string;
  onFocus: (fieldIdentifier: string) => void;
  lastFocusedEditor: string | null;
  resetSignal?: number;
  showToolbar?: boolean;
  compact?: boolean;
};

const BBCodeEditor = ({
  fieldIdentifier,
  id,
  existingContent,
  onFocus,
  lastFocusedEditor,
  resetSignal = 0,
  showToolbar = true,
  compact = false,
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
  const heightCompartmentRef = useRef(new Compartment());
  const [hasContent, setHasContent] = useState(
    (editedContent ?? existingContent ?? "").length > 0,
  );

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

  type EditorHeightMode = "collapsed" | "content" | "focused";

  const reconfigureHeight = useCallback((mode: EditorHeightMode) => {
    const view = viewRef.current;
    if (!view) {
      return;
    }

    const theme =
      mode === "focused"
        ? focusedBbcodeTheme
        : mode === "content"
        ? contentBbcodeTheme
        : collapsedBbcodeTheme;

    view.dispatch({
      effects: heightCompartmentRef.current.reconfigure(theme),
    });

    const scroller = view.dom.querySelector<HTMLElement>(".cm-scroller");
    if (scroller) {
      scroller.style.minHeight = mode === "focused" ? "17rem" : "2.5rem";
      scroller.style.maxHeight = mode === "collapsed" ? "2.5rem" : "17rem";
      scroller.style.overflow = mode === "collapsed" ? "hidden" : "auto";
    }
  }, []);

  const initialHeightMode: EditorHeightMode =
    lastFocusedEditor === fieldIdentifier
      ? "focused"
      : hasContent
      ? "content"
      : "collapsed";

  useEffect(() => {
    if (!editorHostRef.current || viewRef.current) {
      return;
    }

    const view = new EditorView({
      state: EditorState.create({
        doc: currentValueRef.current,
        extensions: [
          minimalSetup,
          lineNumbers(),
          EditorView.lineWrapping,
          bbcodeTheme,
          ...(compact ? [compactBbcodeTheme] : []),
          heightCompartmentRef.current.of(
            initialHeightMode === "focused"
              ? focusedBbcodeTheme
              : initialHeightMode === "content"
              ? contentBbcodeTheme
              : collapsedBbcodeTheme,
          ),
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
              setHasContent(nextValue.length > 0);
              reconfigureHeight("focused");
              commitRawValue(nextValue);
            }
          }),
          EditorView.domEventHandlers({
            focus: () => {
              reconfigureHeight("focused");
              onFocus(fieldIdentifier);
              return false;
            },
            blur: () => {
              reconfigureHeight(
                currentValueRef.current.length > 0 ? "content" : "collapsed",
              );
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
    reconfigureHeight,
  ]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) {
      return;
    }

    reconfigureHeight(
      lastFocusedEditor === fieldIdentifier
        ? "focused"
        : hasContent
        ? "content"
        : "collapsed",
    );
  }, [hasContent, lastFocusedEditor, fieldIdentifier, reconfigureHeight]);

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

    const resetValue =
      resetSignal < 0
        ? editedContent ?? existingContent ?? ""
        : existingContent ?? "";

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
    setHasContent(resetValue.length > 0);
    reconfigureHeight(resetValue.length > 0 ? "content" : "collapsed");
  }, [editedContent, existingContent, resetSignal]);

  const isFocusedEditor = lastFocusedEditor === fieldIdentifier;

  return (
    <div
      className={
        compact ? "bbcode-editor bbcode-editor-compact" : "bbcode-editor"
      }
    >
      {showToolbar && isFocusedEditor && (
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
      )}

      <div
        className="bbcode-editor-surface"
        style={{
          border: isFocusedEditor
            ? "1px solid #60a5fa"
            : "1px solid var(--cm-border)",
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
