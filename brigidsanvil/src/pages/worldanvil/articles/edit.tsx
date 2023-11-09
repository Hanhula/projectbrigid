import { selectIdentity } from "@/components/store/apiSlice";
import { selectAuthToken } from "@/components/store/authSlice";
import Head from "next/head";
import { useCallback, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  createEditor,
  BaseEditor,
  Descendant,
  Editor,
  Element,
  Transforms,
} from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";

type CustomElement = { type: "code" | "paragraph"; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

const CodeElement = (props) => (
  <pre
    {...props.attributes}
    style={{ backgroundColor: "black", color: "white" }}
  >
    <code>{props.children}</code>
  </pre>
);

const DefaultElement = (props) => (
  <p {...props.attributes}> {props.children} </p>
);

const Leaf = (props) => (
  <span
    {...props.attributes}
    style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
  >
    {props.children}
  </span>
);

export default function Statistics() {
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

  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  return (
    <div>
      <Head>
        <title>Editing</title>
      </Head>
      {authToken && identity.success && (
        <div className="container">
          <h1
            className="text-center"
            style={{ marginTop: "0.3em", padding: "0.2em" }}
          >
            Editing
          </h1>
          <Container>
            <Row>
              <Col>
                <Slate
                  editor={editor}
                  initialValue={initialValue}
                  onChange={(value) => {
                    const isAstChange = editor.operations.some(
                      (op) => op.type !== "set_selection"
                    );

                    if (isAstChange) {
                      console.log(JSON.stringify(value));
                    }
                  }}
                >
                  Children
                </Slate>
                <Container className="editor-buttons">
                  <Button>Bold</Button>
                </Container>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
}
