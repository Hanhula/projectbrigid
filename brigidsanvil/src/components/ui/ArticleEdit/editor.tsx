import "./editor-styles.scss";

import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle, { TextStyleOptions } from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import "@material-symbols/font-400";
import { useDispatch, useSelector } from "react-redux";
import { selectWorld } from "@/components/store/apiSlice";
import {
  selectCurrentArticles,
  makeSelectEditedContentByID,
  setEditedContentByID,
} from "@/components/store/articlesSlice";
import { useEffect } from "react";
import _ from "lodash";
import { WorldAnvilHTMLParser } from "./utils/htmlparser";

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <>
      <ButtonToolbar>
        <ButtonGroup>
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            <span className="material-symbols-outlined">format_bold</span>
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            <span className="material-symbols-outlined">format_italic</span>
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            <span className="material-symbols-outlined">
              format_strikethrough
            </span>
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={editor.isActive("code") ? "is-active" : ""}
          >
            <span className="material-symbols-outlined">code</span>
          </Button>
          <Button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
            <span className="material-symbols-outlined">format_clear</span>
          </Button>
          <Button onClick={() => editor.chain().focus().clearNodes().run()}>
            clearnodes
          </Button>
          <Button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive("paragraph") ? "is-active" : ""}
          >
            <span className="material-symbols-outlined">format_paragraph</span>
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            <span className="material-symbols-outlined">format_h1</span>
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            <span className="material-symbols-outlined">format_h2</span>
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "is-active" : ""
            }
          >
            <span className="material-symbols-outlined">format_h3</span>
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={
              editor.isActive("heading", { level: 4 }) ? "is-active" : ""
            }
          >
            <span className="material-symbols-outlined">format_h4</span>
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
            className={
              editor.isActive("heading", { level: 5 }) ? "is-active" : ""
            }
          >
            <span className="material-symbols-outlined">format_h5</span>
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            <span className="material-symbols-outlined">
              format_list_bulleted
            </span>
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}
          >
            <span className="material-symbols-outlined">
              format_list_numbered
            </span>
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("codeBlock") ? "is-active" : ""}
          >
            <span className="material-symbols-outlined">code_blocks</span>
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "is-active" : ""}
          >
            <span className="material-symbols-outlined">format_quote</span>
          </Button>
          <Button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <span className="material-symbols-outlined">horizontal_rule</span>
          </Button>
          <Button onClick={() => editor.chain().focus().setHardBreak().run()}>
            <span className="material-symbols-outlined">insert_page_break</span>
          </Button>
          <Button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            <span className="material-symbols-outlined">undo</span>
          </Button>
          <Button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            <span className="material-symbols-outlined">redo</span>
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] } as Partial<TextStyleOptions>),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
    heading: {
      levels: [1, 2, 3, 4, 5],
    },
  }),
  Placeholder.configure({
    placeholder: "Write something amazing…",
    showOnlyWhenEditable: false,
  }),
];

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`;

export const WorldAnvilEditor = ({
  worldID,
  articleID,
  fieldIdentifier,
  htmlContent,
  placeholderContent,
}: {
  worldID: string;
  articleID: string;
  fieldIdentifier: string;
  htmlContent: any;
  placeholderContent: string;
}) => {
  const selectEditedContentByID = makeSelectEditedContentByID(
    worldID,
    articleID,
    fieldIdentifier
  );
  const editedContent = useSelector(selectEditedContentByID);
  const content = editedContent
    ? editedContent
    : htmlContent
    ? htmlContent
    : placeholderContent;

  const defaultContent = content ? content : "";
  const dispatch = useDispatch();
  const HTMLParser = new WorldAnvilHTMLParser();

  const delayedDispatch = _.debounce((value) => {
    console.log("[Editor] Edited Content: ", value);
    let parsedBBCode = HTMLParser.parseHTML(value);
    console.log("[Editor] Parsed BBCode ", parsedBBCode);

    // dispatch(
    //   setEditedContentByID({
    //     world: worldID,
    //     articleID: articleID,
    //     fieldIdentifier,
    //     editedFields: value,
    //   })
    // );
  }, 2000);

  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      content={defaultContent}
      onUpdate={(event) => {
        const html = event.editor.getHTML();
        delayedDispatch(html);
      }}
    ></EditorProvider>
  );
};
