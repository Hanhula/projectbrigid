import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button, ButtonGroup, ButtonToolbar, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import {
  createEditor,
  BaseEditor,
  Editor,
  Element as SlateElement,
  Transforms,
  Range,
  Path,
  Point,
  NodeEntry,
} from "slate";
import {
  Slate,
  Editable,
  withReact,
  ReactEditor,
  RenderLeafProps,
  RenderElementProps,
  useSlate,
} from "slate-react";
import "@material-symbols/font-400";
import { withHistory } from "slate-history";
import {
  CustomElement,
  CustomText,
  EditorProps,
  ButtonProps,
  HOTKEYS,
  LIST_TYPES,
  TEXT_ALIGN_TYPES,
  MentionElement,
} from "@/components/ui/ArticleEdit/SlateEditor/utils/editortypes";
import isHotkey from "is-hotkey";
import EditUtils from "@/components/ui/ArticleEdit/SlateEditor/utils/editutils";
import {
  makeSelectEditedContentByID,
  selectCurrentArticles,
  selectEditorMode,
  setEditedContentByID,
} from "@/components/store/articlesSlice";
import { Article } from "@/components/types/article";
import { selectWorld } from "@/components/store/apiSlice";
import { debounce } from "lodash";

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export const Portal = ({ children }: { children?: ReactNode }) => {
  return typeof document === "object"
    ? ReactDOM.createPortal(children, document.body)
    : null;
};

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const highlightBBCode = (value: string) => {
  const escapedValue = escapeHtml(value);

  return escapedValue
    .replace(
      /(\[[^\]\n]+\])/g,
      '<span style="color:#d73a49; font-weight:600;">$1</span>',
    )
    .replace(
      /(@\[[^\]]+\]\([^\)]+\))/g,
      '<span style="color:#6f42c1; font-weight:600;">$1</span>',
    )
    .replace(/(\|[^\n\[]+)/g, '<span style="color:#0b7285;">$1</span>');
};

const CustomEditor = {
  toggleBlock(editor: Editor, format: any) {
    const isActive = CustomEditor.isBlockActive(
      editor,
      format,
      TEXT_ALIGN_TYPES.includes(format) ? "align" : "type",
    );
    const isList = LIST_TYPES.includes(format);

    // Get the current selection
    const { selection } = editor;
    if (!selection) return;

    // If selection is collapsed (cursor), get the current line
    if (Range.isCollapsed(selection)) {
      const currentLineRange = Editor.range(
        editor,
        Editor.start(editor, selection),
        Editor.end(editor, selection.anchor.path),
      );

      // Split the current line into its own block if needed
      Transforms.splitNodes(editor, {
        at: currentLineRange.anchor,
        always: true,
        match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n),
      });
      Transforms.splitNodes(editor, {
        at: currentLineRange.focus,
        always: true,
        match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n),
      });

      // Apply formatting only to the current line
      let newProperties: Partial<CustomElement>;
      if (TEXT_ALIGN_TYPES.includes(format)) {
        newProperties = {
          align: isActive ? undefined : format,
        };
      } else {
        newProperties = {
          type: isActive ? "paragraph" : isList ? "list-item" : format,
        };
      }

      Transforms.setNodes<CustomElement>(editor, newProperties, {
        at: currentLineRange,
        match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n),
      });

      if (!isActive && isList) {
        const block = { type: format, children: [] } as CustomElement;
        Transforms.wrapNodes(editor, block, { at: currentLineRange });
      }
    } else {
      // For selected text, first split at selection boundaries
      Transforms.splitNodes(editor, {
        at: selection.anchor,
        match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n),
      });
      Transforms.splitNodes(editor, {
        at: selection.focus,
        match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n),
      });

      // Then handle the blocks within the selection
      Transforms.unwrapNodes(editor, {
        at: selection,
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          LIST_TYPES.includes((n as CustomElement).type) &&
          !TEXT_ALIGN_TYPES.includes(format),
        split: true,
      });

      let newProperties: Partial<CustomElement>;
      if (TEXT_ALIGN_TYPES.includes(format)) {
        newProperties = {
          align: isActive ? undefined : format,
        };
      } else {
        newProperties = {
          type: isActive ? "paragraph" : isList ? "list-item" : format,
        };
      }

      Transforms.setNodes<CustomElement>(editor, newProperties, {
        at: selection,
        match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n),
      });

      if (!isActive && isList) {
        const block = { type: format, children: [] } as CustomElement;
        Transforms.wrapNodes(editor, block, { at: selection });
      }
    }
  },

  toggleMark(editor: Editor, format: string) {
    const isActive = CustomEditor.isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  },

  isBlockActive(editor: Editor, format: any, blockType = "type") {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n[blockType] === format,
      }),
    );

    return !!match;
  },

  isMarkActive(editor: Editor, format: string) {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  },
};

const Element = ({ attributes, children, element }: RenderElementProps) => {
  const style = {
    textAlign: "left" as "left" | "right" | "center" | "justify",
  };
  switch (element.type) {
    case "div":
      return (
        <div style={style} {...attributes}>
          {children}
        </div>
      );
    case "container":
      return (
        <div style={style} {...attributes}>
          {children}
        </div>
      );
    case "section":
      return (
        <span style={style} {...attributes}>
          {children}
        </span>
      );
    case "mention":
      return (
        <span className="mention" {...attributes}>
          {children}
        </span>
      );
    case "blockquote":
      return (
        <blockquote style={style} className="blockquote" {...attributes}>
          {children}
        </blockquote>
      );
    case "ul":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "h1":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 style={style} {...attributes}>
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4 style={style} {...attributes}>
          {children}
        </h4>
      );
    case "li":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "ol":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf, text }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italics) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.strikethrough) {
    children = <del>{children}</del>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton: React.FC<ButtonProps> = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={CustomEditor.isBlockActive(editor, format, "type")}
      onMouseDown={(event) => {
        event.preventDefault();
        CustomEditor.toggleBlock(editor, format);
      }}
      variant="dark"
    >
      <span className="material-symbols-outlined">{icon}</span>
    </Button>
  );
};

const MarkButton: React.FC<ButtonProps> = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={CustomEditor.isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        CustomEditor.toggleMark(editor, format);
      }}
      variant="dark"
    >
      <span className="material-symbols-outlined">{icon}</span>
    </Button>
  );
};

const insertMention = (editor: Editor, character: Article) => {
  const mention: MentionElement = {
    type: "mention",
    children: [{ text: `@[${character.title}]` }],
    id: character.id,
    entityClass: character.entityClass,
  };
  Transforms.insertNodes(editor, mention);
  Transforms.move(editor, { distance: 1, unit: "offset" });
};

const withMentions = (editor: Editor) => {
  const { isInline } = editor;

  editor.isInline = (element) => {
    return element.type === "mention" ? true : isInline(element);
  };

  return editor;
};

export const WorldAnvilEditor = ({
  fieldIdentifier,
  id,
  existingContent,
  onFocus,
  lastFocusedEditor,
}: EditorProps) => {
  const dispatch = useDispatch();
  const editUtils = useMemo(() => new EditUtils(), []);
  const world = useSelector(selectWorld);
  const editorMode = useSelector(selectEditorMode);
  const articles = useSelector(selectCurrentArticles);
  const selectEditedContentByID = useMemo(
    () => makeSelectEditedContentByID(world.id, id, fieldIdentifier),
    [world.id, id, fieldIdentifier],
  );
  const editedContent = useSelector(selectEditedContentByID);
  const editedContentRef = useRef(editedContent);
  const existingContentRef = useRef(existingContent);
  const worldRef = useRef(world);
  const canonicalContent = useMemo(
    () => editedContent || existingContent || "",
    [editedContent, existingContent],
  );
  const [rawValue, setRawValue] = useState(canonicalContent);

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
    if (lastFocusedEditor !== fieldIdentifier) {
      setRawValue(canonicalContent);
    }
  }, [canonicalContent, fieldIdentifier, lastFocusedEditor]);

  const defaultValue: CustomElement[] = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];

  const initialValue = useMemo(() => {
    if (editorMode === "raw") {
      return defaultValue;
    }

    try {
      if (editedContent) {
        const deserialized = editUtils.deserialize(editedContent);
        return deserialized.length > 0 ? deserialized : defaultValue;
      } else if (existingContent) {
        const deserialized = editUtils.deserialize(existingContent);
        return deserialized.length > 0 ? deserialized : defaultValue;
      }
      return defaultValue;
    } catch (error) {
      console.error("Error initializing editor:", error);
      return defaultValue;
    }
  }, [defaultValue, editUtils, editedContent, editorMode, existingContent]);

  const [editor] = useState(() => {
    const e = withHistory(withReact(withMentions(createEditor())));
    // Ensure editor always has at least one paragraph
    e.children = initialValue;
    return e;
  });

  const previousEditorModeRef = useRef(editorMode);

  const ref = useRef<HTMLDivElement | null>(null);
  const hasInitializedRef = useRef(false);
  const [target, setTarget] = useState<Range | undefined | null>();
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTarget(null);
    setSearch("");
    setIndex(0);
    hasInitializedRef.current = false;
  }, [editorMode]);

  useEffect(() => {
    if (editorMode === "raw") {
      Transforms.deselect(editor);
      setTarget(null);
      setSearch("");
      setIndex(0);
    }
  }, [editor, editorMode]);

  useEffect(() => {
    const previousEditorMode = previousEditorModeRef.current;
    previousEditorModeRef.current = editorMode;

    if (previousEditorMode === editorMode || editorMode !== "rich") {
      return;
    }

    try {
      const nextValue = canonicalContent
        ? editUtils.deserialize(canonicalContent)
        : defaultValue;

      editor.children = nextValue.length > 0 ? nextValue : defaultValue;
      editor.onChange();
    } catch (error) {
      console.error("Error syncing rich editor content:", error);
      editor.children = defaultValue;
      editor.onChange();
    }
  }, [canonicalContent, defaultValue, editUtils, editor, editorMode]);

  const chars = useMemo(
    () =>
      articles
        .filter((article) =>
          article.title.toLowerCase().startsWith(search.toLowerCase()),
        )
        .slice(0, 10),
    [articles, search],
  );

  const onKeyDown = useCallback(
    (event: any) => {
      if (target && chars.length > 0) {
        switch (event.key) {
          case "ArrowDown":
            event.preventDefault();
            const prevIndex = index >= chars.length - 1 ? 0 : index + 1;
            setIndex(prevIndex);
            break;
          case "ArrowUp":
            event.preventDefault();
            const nextIndex = index <= 0 ? chars.length - 1 : index - 1;
            setIndex(nextIndex);
            break;
          case "Tab":
          case "Enter":
            event.preventDefault();
            Transforms.select(editor, target);
            insertMention(editor, chars[index]);
            setTarget(null);
            break;
          case "Escape":
            event.preventDefault();
            setTarget(null);
            break;
        }
        return;
      }

      for (const hotkey in HOTKEYS) {
        if (isHotkey(hotkey, event as any)) {
          event.preventDefault();
          const mark = HOTKEYS[hotkey];
          CustomEditor.toggleMark(editor, mark);
        }
      }

      if (event.key === "Enter") {
        event.preventDefault();

        // Use Shift+Enter for soft line breaks within the same paragraph.
        if (event.shiftKey) {
          editor.insertText("\n");
          return;
        }

        // Check if we're in a block element
        const blockNodeIterator = Editor.nodes(editor, {
          match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type !== "paragraph",
        });
        const match = blockNodeIterator.next().value as
          | NodeEntry<SlateElement>
          | undefined;

        if (match) {
          const [node, path] = match;
          const end = Editor.end(editor, path);
          const isAtEnd =
            editor.selection && Point.equals(editor.selection.anchor, end);

          if (isAtEnd) {
            // If at the end of a block, exit it
            Transforms.insertNodes(editor, {
              type: "paragraph",
              children: [{ text: "" }],
            } as CustomElement);
            return;
          }
        }

        // Default behavior: create a new paragraph block.
        editor.insertBreak();
      }
    },
    [chars, editor, index, target],
  );

  useEffect(() => {
    if (target && chars.length > 0) {
      const el = ref!.current!;
      const domRange = ReactEditor.toDOMRange(editor, target);
      const rect = domRange.getBoundingClientRect();
      el.style.top = `${rect.top + window.pageYOffset + 24}px`;
      el.style.left = `${rect.left + window.pageXOffset}px`;
    }
  }, [chars.length, editor, index, search, target]);

  const renderElement = useCallback((props: RenderElementProps) => {
    return <Element {...props} />;
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  const delayedDispatch = useCallback(
    debounce((value: any) => {
      const serializedValue = editUtils.serializeVal(value);

      // Avoid rewriting store state when content is unchanged.
      if (serializedValue === editedContentRef.current) {
        return;
      }

      if (
        !editedContentRef.current &&
        existingContentRef.current &&
        serializedValue === existingContentRef.current
      ) {
        return;
      }

      dispatch(
        setEditedContentByID({
          world: worldRef.current,
          articleID: id,
          fieldIdentifier,
          editedFields: serializedValue,
        }),
      );
    }, 500),
    [dispatch, editUtils, fieldIdentifier, id],
  );

  const delayedRawDispatch = useCallback(
    debounce((value: string) => {
      if (value === editedContentRef.current) {
        return;
      }

      if (
        !editedContentRef.current &&
        existingContentRef.current &&
        value === existingContentRef.current
      ) {
        return;
      }

      dispatch(
        setEditedContentByID({
          world: worldRef.current,
          articleID: id,
          fieldIdentifier,
          editedFields: value,
        }),
      );
    }, 300),
    [dispatch, fieldIdentifier, id],
  );

  useEffect(() => {
    return () => {
      delayedDispatch.flush();
      delayedRawDispatch.flush();
      delayedDispatch.cancel();
      delayedRawDispatch.cancel();
    };
  }, [delayedDispatch, delayedRawDispatch]);

  const isFocusedEditor = lastFocusedEditor === fieldIdentifier;
  const isRawMode = editorMode === "raw";
  const highlightedRawPreview = useMemo(() => {
    if (!isRawMode || !isFocusedEditor) {
      return "";
    }

    return highlightBBCode(rawValue);
  }, [isFocusedEditor, isRawMode, rawValue]);

  return (
    <div>
      <div
        style={{ display: isRawMode ? "block" : "none" }}
        aria-hidden={!isRawMode}
      >
        <textarea
          value={rawValue}
          onFocus={() => onFocus(fieldIdentifier)}
          onChange={(event) => {
            const nextValue = event.target.value;
            setRawValue(nextValue);
            delayedRawDispatch(nextValue);
          }}
          className="form-control"
          rows={Math.max(6, rawValue.split("\n").length + 2)}
          style={{
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace",
            whiteSpace: "pre-wrap",
            marginBottom: "0.5rem",
          }}
        />
        {isFocusedEditor && (
          <div
            style={{
              border: "1px solid #d0d7de",
              borderRadius: "0.375rem",
              padding: "0.625rem",
              background: "var(--darkest-terror)",
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace",
              fontSize: "0.875rem",
              whiteSpace: "pre-wrap",
              overflowX: "auto",
            }}
            dangerouslySetInnerHTML={{ __html: highlightedRawPreview }}
          />
        )}
      </div>

      <div
        style={{ display: isRawMode ? "none" : "block" }}
        aria-hidden={isRawMode}
      >
        <Slate
          editor={editor}
          initialValue={initialValue}
          onChange={(value) => {
            if (!hasInitializedRef.current) {
              hasInitializedRef.current = true;
              return;
            }

            // Ensure there's always at least one paragraph
            if (!value || value.length === 0) {
              editor.children = defaultValue;
              return;
            }

            const { selection } = editor;
            if (selection && Range.isCollapsed(selection)) {
              const [start] = Range.edges(selection);
              const wordBefore = Editor.before(editor, start, { unit: "word" });
              const before = wordBefore && Editor.before(editor, wordBefore);
              const beforeRange = before && Editor.range(editor, before, start);
              const beforeText =
                beforeRange && Editor.string(editor, beforeRange);
              const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/);
              const after = Editor.after(editor, start);
              const afterRange = Editor.range(editor, start, after);
              const afterText = Editor.string(editor, afterRange);
              const afterMatch = afterText.match(/^(\s|$)/);

              if (beforeMatch && afterMatch) {
                setTarget(beforeRange);
                setSearch(beforeMatch[1]);
                setIndex(0);
                return;
              }
            }

            setTarget(null);

            const isAstChange = editor.operations.some(
              (op) => op.type !== "set_selection",
            );
            if (isAstChange && ReactEditor.isFocused(editor)) {
              delayedDispatch(value);
            }
          }}
        >
          {isFocusedEditor && (
            <Container>
              <ButtonToolbar>
                <ButtonGroup className="me-2 flex-wrap" role="toolbar">
                  <MarkButton format="bold" icon="format_bold" />
                  <MarkButton format="italics" icon="format_italic" />
                  <MarkButton format="underline" icon="format_underlined" />
                  <MarkButton format="code" icon="code" />
                  <BlockButton format="h1" icon="format_h1" />
                  <BlockButton format="h2" icon="format_h2" />
                  <BlockButton format="h3" icon="format_h3" />
                  <BlockButton format="h4" icon="format_h4" />
                  <BlockButton format="blockquote" icon="format_quote" />
                  <BlockButton format="ol" icon="format_list_numbered" />
                  <BlockButton format="ul" icon="format_list_bulleted" />
                  <BlockButton format="left" icon="format_align_left" />
                  <BlockButton format="center" icon="format_align_center" />
                  <BlockButton format="right" icon="format_align_right" />
                  <BlockButton format="justify" icon="format_align_justify" />
                </ButtonGroup>
              </ButtonToolbar>
            </Container>
          )}
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={onKeyDown}
            onFocus={() => onFocus(fieldIdentifier)}
            onBlur={() => {
              onFocus("");
            }}
            className="slate-editor"
          />
          {target && chars.length > 0 && (
            <Portal>
              <div
                ref={ref}
                style={{
                  top: "-9999px",
                  left: "-9999px",
                  position: "absolute",
                  zIndex: 1,
                  padding: "3px",
                  background: "var(--darkest-terror)",
                  borderRadius: "4px",
                  boxShadow: "0 1px 5px rgba(0,0,0,.2)",
                }}
                data-cy="mentions-portal"
              >
                {chars.map((char, i) => (
                  <div
                    key={char.id}
                    onClick={() => {
                      Transforms.select(editor, target);
                      insertMention(editor, char);
                      setTarget(null);
                    }}
                    style={{
                      padding: "1px 3px",
                      borderRadius: "3px",
                      background: i === index ? "#B4D5FF" : "transparent",
                    }}
                  >
                    {char.title}
                  </div>
                ))}
              </div>
            </Portal>
          )}
        </Slate>
      </div>
    </div>
  );
};
