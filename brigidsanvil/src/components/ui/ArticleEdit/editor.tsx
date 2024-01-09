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
} from "@/components/ui/ArticleEdit/utils/editortypes";
import isHotkey from "is-hotkey";
import EditUtils from "@/components/ui/ArticleEdit/utils/editutils";
import {
  makeSelectEditedContentByID,
  selectCurrentArticles,
  setEditedContentByID,
} from "@/components/store/articlesSlice";
import _ from "lodash";
import { Article } from "@/components/types/article";
import { selectWorld } from "@/components/store/apiSlice";

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

const CustomEditor = {
  toggleBlock(editor: Editor, format: any) {
    const isActive = CustomEditor.isBlockActive(
      editor,
      format,
      TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
    );
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        LIST_TYPES.includes(n.type) &&
        !TEXT_ALIGN_TYPES.includes(format),
      split: true,
    });
    let newProperties: Partial<SlateElement>;
    if (TEXT_ALIGN_TYPES.includes(format)) {
      newProperties = {
        align: isActive ? undefined : format,
      };
    } else {
      newProperties = {
        type: isActive ? "paragraph" : isList ? "list-item" : format,
      };
    }
    Transforms.setNodes<SlateElement>(editor, newProperties);

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
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
      })
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
  const editUtils = new EditUtils();
  const [editor] = useState(() =>
    withHistory(withReact(withMentions(createEditor())))
  );
  const ref = useRef<HTMLDivElement | null>(null);
  const [target, setTarget] = useState<Range | undefined | null>();
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState("");

  const world = useSelector(selectWorld);
  const articles = useSelector(selectCurrentArticles);
  const selectEditedContentByID = makeSelectEditedContentByID(
    world.id,
    id,
    fieldIdentifier
  );
  const editedContent = useSelector(selectEditedContentByID);

  const chars = articles
    .filter((article) =>
      article.title.toLowerCase().startsWith(search.toLowerCase())
    )
    .slice(0, 10);

  const onKeyDown = useCallback(
    (event: any) => {
      if (event.shiftKey && event.key === "Enter") {
        event.preventDefault();
        const currentSelection = editor.selection;
        if (currentSelection) {
          const [start] = Editor.edges(editor, currentSelection);
          Transforms.insertText(editor, "\n", { at: start });
        }
      } else {
        for (const hotkey in HOTKEYS) {
          if (isHotkey(hotkey, event as any)) {
            event.preventDefault();
            const mark = HOTKEYS[hotkey];
            CustomEditor.toggleMark(editor, mark);
          }
        }
      }
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
      }
    },
    [chars, editor, index, target]
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

  const initialValue = useMemo(() => {
    if (editedContent) {
      return editUtils.deserialize(editedContent);
    } else if (existingContent) {
      return editUtils.deserialize(existingContent);
    } else {
      return editUtils.defaultInitialValue;
    }
  }, [editedContent, existingContent]);

  const renderElement = useCallback((props: RenderElementProps) => {
    return <Element {...props} />;
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  const delayedDispatch = _.debounce((value) => {
    console.log("toserialise: ", value);
    const serializedValue = editUtils.serializeVal(value);
    console.log("serialised: ", serializedValue);
    dispatch(
      setEditedContentByID({
        world: world,
        articleID: id,
        fieldIdentifier,
        editedFields: serializedValue,
      })
    );
  }, 2000);

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={(value) => {
        const { selection } = editor;
        if (selection && Range.isCollapsed(selection)) {
          const [start] = Range.edges(selection);
          const wordBefore = Editor.before(editor, start, { unit: "word" });
          const before = wordBefore && Editor.before(editor, wordBefore);
          const beforeRange = before && Editor.range(editor, before, start);
          const beforeText = beforeRange && Editor.string(editor, beforeRange);
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
          (op) => op.type !== "set_selection"
        );
        if (
          isAstChange ||
          editor.operations.some(
            (op) => op.type === "insert_text" || op.type === "remove_text"
          )
        ) {
          delayedDispatch(value);
        }
      }}
    >
      {lastFocusedEditor === fieldIdentifier && (
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
  );
};
