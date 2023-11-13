import { selectIdentity } from "@/components/store/apiSlice";
import { selectAuthToken } from "@/components/store/authSlice";
import Head from "next/head";
import { useCallback, useMemo, useState } from "react";
import { Button, ButtonGroup, ButtonToolbar, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  createEditor,
  BaseEditor,
  Editor,
  Element as SlateElement,
  Transforms,
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
} from "@/components/ui/ArticleEdit/utils/editortypes";
import isHotkey from "is-hotkey";
import EditUtils from "@/components/ui/ArticleEdit/utils/editutils";

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

interface ButtonProps {
  format: string;
  icon: string;
}

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italics",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

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
          //@ts-expect-error
          n[blockType] === format,
      })
    );

    return !!match;
  },

  isMarkActive(editor: Editor, format: string) {
    const marks = Editor.marks(editor);
    //@ts-expect-error
    return marks ? marks[format] === true : false;
  },
};

const Element = ({ attributes, children, element }: RenderElementProps) => {
  const style = {
    textAlign: "left" as "left" | "right" | "center" | "justify",
  };
  switch (element.type) {
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
    case "h5":
      return (
        <h5 style={style} {...attributes}>
          {children}
        </h5>
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

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
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

export const WorldAnvilEditor = () => {
  const authToken = useSelector(selectAuthToken);
  const identity = useSelector(selectIdentity);
  const editUtils = new EditUtils();

  const [editor] = useState(() => withHistory(withReact(createEditor())));

  const renderElement = useCallback((props: RenderElementProps) => {
    return <Element {...props} />;
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  const initialValue = useMemo(() => {
    const storedItem = localStorage.getItem("content");
    if (storedItem) {
      return editUtils.deserialize(storedItem);
    } else {
      return editUtils.defaultInitialValue;
    }
  }, []);

  console.log("Initial Value (Deserialized):", initialValue);

  return (
    <Slate
      editor={editor}
      //@ts-expect-error
      initialValue={initialValue}
      onChange={(value) => {
        console.log(editUtils.serializeVal(value));
        const isAstChange = editor.operations.some(
          (op) => "set_selection" !== op.type
        );
        if (isAstChange) {
          console.log(value);
          console.log(editUtils.serializeVal(value));
          localStorage.setItem("content", editUtils.serializeVal(value));
        }
      }}
    >
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
            <BlockButton format="h5" icon="format_h5" />
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
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
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
                //@ts-expect-error
                const mark = HOTKEYS[hotkey];
                CustomEditor.toggleMark(editor, mark);
              }
            }
          }
        }}
      />
    </Slate>
  );
};
