import { selectIdentity } from "@/components/store/apiSlice";
import { selectAuthToken } from "@/components/store/authSlice";
import Head from "next/head";
import { useCallback, useMemo, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  createEditor,
  BaseEditor,
  Descendant,
  Editor,
  Element,
  Transforms,
  Node as SlateNode,
  Text,
} from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { jsx } from "slate-hyperscript";

import WorldAnvilParser from "@/components/ui/ArticleView/CustomRenderers/WorldAnvilParser/worldanvil-parser";

type CustomElement = { type: "code" | "paragraph"; children: CustomText[] };
type CustomText = {
  text: string;
  bold: boolean;
  italics: boolean;
  underline: boolean;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

type BBCodeTag = {
  openTag: string;
  closeTag: string;
  format: keyof CustomText;
  openingRegex: RegExp;
  closingRegex: RegExp;
};

type BBCodeTags = {
  bold: BBCodeTag;
  italic: BBCodeTag;
  underline: BBCodeTag;
};

const bbcodeTags: BBCodeTags = {
  bold: {
    openTag: "[b]",
    closeTag: "[/b]",
    format: "bold",
    openingRegex: /\[b\]/,
    closingRegex: /\[\/b\]/,
  },
  italic: {
    openTag: "[i]",
    closeTag: "[/i]",
    format: "italics",
    openingRegex: /\[i\]/,
    closingRegex: /\[\/i\]/,
  },
  underline: {
    openTag: "[u]",
    closeTag: "[/u]",
    format: "underline",
    openingRegex: /\[u\]/,
    closingRegex: /\[\/u\]/,
  },
  // Add more BBCode elements following the same pattern
};

const serializeNode = (node: SlateNode) => {
  if (Text.isText(node)) {
    let text = node.text;
    for (const [tag, bbcode] of Object.entries(bbcodeTags)) {
      if ((node as CustomText)[bbcode.format]) {
        text = `${bbcode.openTag}${text}${bbcode.closeTag}`;
      }
    }
    return text;
  }
  return SlateNode.string(node);
};

const serializeChildren = (children: SlateNode[]) => {
  return children ? children.map((child) => serializeNode(child)).join("") : "";
};

const serializeVal = (value: any[]) => {
  return value
    .map((node) => {
      if (node.children) {
        return serializeChildren(node.children);
      }
      return serializeNode(node);
    })
    .join("\n\n");
};

const deserialize = (savedBBcode) => {
  if (savedBBcode) {
    const paragraphs = savedBBcode.split("\n\n"); // Split into paragraphs based on double line breaks

    // Map over each paragraph and process them separately
    const elements = paragraphs.map((paragraph) => {
      const htmlString = WorldAnvilParser.parsePureBBCode(paragraph);
      const document = new DOMParser().parseFromString(htmlString, "text/html");
      const body = document.body;
      const children = Array.from(body.childNodes).map((childNode) =>
        deserializeNode(childNode)
      );

      // Ensure the children are structured correctly without unnecessary nested arrays
      const flattenedChildren = children.flatMap((child) =>
        Array.isArray(child) ? child : [child]
      );

      return {
        type: "paragraph",
        children: flattenedChildren,
      };
    });

    return elements;
  }

  return initialValue;
};

const deserializeNode = (el: Node, markAttributes = {}) => {
  if (el.nodeType === Node.TEXT_NODE) {
    return jsx("text", markAttributes, el.textContent);
  } else if (el.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const nodeAttributes = { ...markAttributes };

  // define attributes for text nodes
  switch (el.nodeName) {
    case "STRONG":
      nodeAttributes.bold = true;
      break;
    case "EM": // For <em> tag
    case "I": // For <i> tag
      nodeAttributes.italics = true;
      break;

    default:
      break;
  }

  const children = Array.from(el.childNodes)
    .map((node) => deserializeNode(node, nodeAttributes))
    .flat();

  if (children.length === 0) {
    children.push(jsx("text", nodeAttributes, ""));
  }

  switch (el.nodeName) {
    case "BODY":
      return jsx("fragment", {}, children);
    case "BR":
      return "\n";
    case "BLOCKQUOTE":
      return jsx("element", { type: "quote" }, children);
    case "P":
      return jsx("element", { type: "paragraph" }, children);
    case "A":
      return jsx(
        "element",
        { type: "link", url: el.getAttribute("href") },
        children
      );
    default:
      return children;
  }
};

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

const CustomEditor = {
  isBoldMarkActive(editor: Editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },

  isItalicMarkActive(editor: Editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.italics === true : false;
  },

  isCodeBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "code",
    });

    return !!match;
  },

  toggleBoldMark(editor: Editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "bold");
    } else {
      Editor.addMark(editor, "bold", true);
    }
  },

  toggleItalicsMark(editor: Editor) {
    const isActive = CustomEditor.isItalicMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "italics");
    } else {
      Editor.addMark(editor, "italics", true);
    }
  },

  toggleCodeBlock(editor: Editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "code" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
};

const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? "bold" : "normal",
        fontStyle: props.leaf.italics ? "italic" : "normal",
      }}
    >
      {props.children}
    </span>
  );
};

export default function EditPage() {
  const authToken = useSelector(selectAuthToken);
  const identity = useSelector(selectIdentity);

  const [editor] = useState(() => withReact(createEditor()));

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const initialValue = useMemo(
    () => deserialize(localStorage.getItem("content")),
    []
  );

  console.log("Initial Value (Deserialized):", initialValue);

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={(value) => {
        console.log(serializeVal(value));
        const isAstChange = editor.operations.some(
          (op) => "set_selection" !== op.type
        );
        if (isAstChange) {
          console.log(value);
          console.log(serializeVal(value));
          localStorage.setItem("content", serializeVal(value));
        }
      }}
    >
      <div>
        <Button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleBoldMark(editor);
          }}
        >
          Bold
        </Button>
        <Button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleItalicsMark(editor);
          }}
        >
          Italics
        </Button>
        <Button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleCodeBlock(editor);
          }}
        >
          Code Block
        </Button>
      </div>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          if (!event.ctrlKey) {
            return;
          }
          switch (event.key) {
            case "`": {
              event.preventDefault();
              CustomEditor.toggleCodeBlock(editor);
              break;
            }

            case "b": {
              event.preventDefault();
              CustomEditor.toggleBoldMark(editor);
              break;
            }

            case "i": {
              event.preventDefault();
              CustomEditor.toggleItalicsMark(editor);
              break;
            }
          }
        }}
      />
    </Slate>
  );
}
