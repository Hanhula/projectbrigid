import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { minimalSetup } from "codemirror";
import { Compartment, EditorState } from "@codemirror/state";
import { EditorView, lineNumbers } from "@codemirror/view";
import { syntaxHighlighting } from "@codemirror/language";
import { css } from "@codemirror/lang-css";
import { selectWorld } from "@/components/store/apiSlice";
import {
  makeSelectEditedContentValueByID,
  setEditedContentByID,
} from "@/components/store/articlesSlice";
import { normalizeEditorLinebreaks } from "./utils/bbcode-tags";
import {
  bbcodeTheme,
  collapsedBbcodeTheme,
  compactBbcodeTheme,
  contentBbcodeTheme,
  focusedBbcodeTheme,
} from "./utils/bbcode-editor-styles";
import { cssHighlightStyle } from "./utils/css-editor-highlight";

export type CssEditorProps = {
  fieldIdentifier: string;
  id: string;
  existingContent: string;
  onFocus: (fieldIdentifier: string) => void;
  lastFocusedEditor: string | null;
  resetSignal?: number;
  compact?: boolean;
};

const CssEditor = ({
  fieldIdentifier,
  id,
  existingContent,
  onFocus,
  lastFocusedEditor,
  resetSignal = 0,
  compact = false,
}: CssEditorProps) => {
  const dispatch = useDispatch();
  const world = useSelector(selectWorld);
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
  const currentValueRef = useRef<string>(
    editedContent ?? existingContent ?? "",
  );
  const previousResetSignalRef = useRef(resetSignal);
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
    currentValueRef.current = editedContent ?? existingContent ?? "";
  }, [editedContent, existingContent]);

  const commitRawValue = useCallback(
    (value: string) => {
      const normalizedValue = normalizeEditorLinebreaks(value);

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
          css(),
          syntaxHighlighting(cssHighlightStyle),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commitRawValue, fieldIdentifier, onFocus, reconfigureHeight]);

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

export default CssEditor;
