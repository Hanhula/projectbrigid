import Head from "next/head";
import { useMemo, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectIdentity } from "@/components/store/apiSlice";
import { selectAuthToken } from "@/components/store/authSlice";
import WorldAnvilParser from "@/components/ui/ArticleView/CustomRenderers/WorldAnvilParser/worldanvil-parser";

const starterMarkdown = `# My World Entry

This is **bold** text and this is *italic* text.

- First bullet
- Second bullet
- Third bullet

> A useful note that should feel familiar in Obsidian.

A link to [WorldAnvil](https://www.worldanvil.com).

\`\`\`text
This is a code block.
\`\`\`
`;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const markdownInlineToHtml = (value: string) => {
  let escaped = escapeHtml(value);

  escaped = escaped.replace(/`([^`]+)`/g, "<code>$1</code>");
  escaped = escaped.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  escaped = escaped.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  escaped = escaped.replace(/__([^_]+)__/g, "<strong>$1</strong>");
  escaped = escaped.replace(/_([^_]+)_/g, "<em>$1</em>");
  escaped = escaped.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );

  return escaped;
};

const markdownInlineToBbCode = (value: string) => {
  return value
    .replace(/\*\*([^*]+)\*\*/g, "[b]$1[/b]")
    .replace(/\*([^*]+)\*/g, "[i]$1[/i]")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, "[url:$2]$1[/url]")
    .replace(/`([^`]+)`/g, "[code]$1[/code]");
};

const markdownToHtml = (markdown: string) => {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const htmlChunks: string[] = [];
  const listItems: string[] = [];
  let activeListType: "ul" | "ol" | null = null;
  let paragraphBuffer: string[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length > 0) {
      htmlChunks.push(
        `<p>${paragraphBuffer
          .map((part) => markdownInlineToHtml(part))
          .join("<br/>")}</p>`,
      );
      paragraphBuffer = [];
    }
  };

  const flushList = () => {
    if (activeListType && listItems.length > 0) {
      const listTag = activeListType === "ul" ? "ul" : "ol";
      htmlChunks.push(
        `<${listTag}>${listItems
          .map((item) => `<li>${item}</li>`)
          .join("")}</${listTag}>`,
      );
    }

    listItems.length = 0;
    activeListType = null;
  };

  const flushCodeBlock = () => {
    if (codeBuffer.length > 0) {
      htmlChunks.push(
        `<pre><code>${escapeHtml(codeBuffer.join("\n"))}</code></pre>`,
      );
      codeBuffer = [];
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    const isIndentedLine = /^\s+/.test(line);

    if (trimmed.startsWith("```")) {
      flushParagraph();
      flushList();
      if (inCodeBlock) {
        flushCodeBlock();
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    if (/^>\s?/.test(line)) {
      flushParagraph();
      flushList();
      htmlChunks.push(
        `<blockquote>${markdownInlineToHtml(
          trimmed.replace(/^>\s?/, ""),
        )}</blockquote>`,
      );
      return;
    }

    if (/^#{1,6}\s+/.test(trimmed)) {
      flushParagraph();
      flushList();
      const level = line.match(/^#{1,6}/)?.[0].length ?? 1;
      const headingText = markdownInlineToHtml(
        trimmed.replace(/^#{1,6}\s+/, ""),
      );
      htmlChunks.push(`<h${level}>${headingText}</h${level}>`);
      return;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      flushParagraph();
      if (activeListType && activeListType !== "ul") {
        flushList();
      }
      activeListType = "ul";
      listItems.push(markdownInlineToHtml(trimmed.replace(/^[-*]\s+/, "")));
      return;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      flushParagraph();
      if (activeListType && activeListType !== "ol") {
        flushList();
      }
      activeListType = "ol";
      listItems.push(markdownInlineToHtml(trimmed.replace(/^\d+\.\s+/, "")));
      return;
    }

    if (trimmed.length === 0) {
      flushParagraph();
      flushList();
      return;
    }

    if (activeListType && isIndentedLine) {
      if (listItems.length > 0) {
        listItems[listItems.length - 1] += `<br/>${markdownInlineToHtml(
          trimmed,
        )}`;
      }
      return;
    }

    if (activeListType) {
      flushList();
    }

    paragraphBuffer.push(trimmed);
  });

  flushParagraph();
  flushList();
  flushCodeBlock();

  return htmlChunks.join("");
};

const markdownToWorldAnvilBbCode = (markdown: string) => {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const bbCodeChunks: string[] = [];
  const listItems: string[] = [];
  let paragraphBuffer: string[] = [];
  let activeListType: "ul" | "ol" | null = null;
  let inCodeBlock = false;
  let codeBuffer: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length > 0) {
      bbCodeChunks.push(
        paragraphBuffer
          .map((part) => markdownInlineToBbCode(part))
          .join("[br]"),
      );
      paragraphBuffer = [];
    }
  };

  const flushList = () => {
    if (activeListType && listItems.length > 0) {
      const listTag = activeListType === "ul" ? "[ul]" : "[ol]";
      const listEndTag = activeListType === "ul" ? "[/ul]" : "[/ol]";
      bbCodeChunks.push(
        `${listTag}${listItems
          .map((item) => `[li]${item}[/li]`)
          .join("")}${listEndTag}`,
      );
    }

    listItems.length = 0;
    activeListType = null;
  };

  const flushCodeBlock = () => {
    if (codeBuffer.length > 0) {
      bbCodeChunks.push(`[code]${codeBuffer.join("\n")}[/code]`);
      codeBuffer = [];
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    const isIndentedLine = /^\s+/.test(line);

    if (trimmed.startsWith("```")) {
      flushParagraph();
      flushList();
      if (inCodeBlock) {
        flushCodeBlock();
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    if (/^>\s?/.test(line)) {
      flushParagraph();
      flushList();
      bbCodeChunks.push(
        `[quote]${markdownInlineToBbCode(
          trimmed.replace(/^>\s?/, ""),
        )}[/quote]`,
      );
      return;
    }

    if (/^#{1,6}\s+/.test(trimmed)) {
      flushParagraph();
      flushList();
      const level = line.match(/^#{1,6}/)?.[0].length ?? 1;
      const headingText = markdownInlineToBbCode(
        trimmed.replace(/^#{1,6}\s+/, ""),
      );
      bbCodeChunks.push(`[h${level}]${headingText}[/h${level}]`);
      return;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      flushParagraph();
      if (activeListType && activeListType !== "ul") {
        flushList();
      }
      activeListType = "ul";
      listItems.push(markdownInlineToBbCode(trimmed.replace(/^[-*]\s+/, "")));
      return;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      flushParagraph();
      if (activeListType && activeListType !== "ol") {
        flushList();
      }
      activeListType = "ol";
      listItems.push(markdownInlineToBbCode(trimmed.replace(/^\d+\.\s+/, "")));
      return;
    }

    if (trimmed.length === 0) {
      flushParagraph();
      flushList();
      return;
    }

    if (activeListType && isIndentedLine) {
      if (listItems.length > 0) {
        listItems[listItems.length - 1] += `[br]${markdownInlineToBbCode(
          trimmed,
        )}`;
      }
      return;
    }

    if (activeListType) {
      flushList();
    }

    paragraphBuffer.push(markdownInlineToBbCode(trimmed));
  });

  flushParagraph();
  flushList();
  flushCodeBlock();

  return bbCodeChunks.join("\n\n");
};

export default function MarkdownPreviewPage() {
  const authToken = useSelector(selectAuthToken);
  const identity = useSelector(selectIdentity);
  const [markdown, setMarkdown] = useState(starterMarkdown);
  const [copiedField, setCopiedField] = useState<"markdown" | "bbcode" | null>(
    null,
  );

  const renderedMarkdown = useMemo(() => markdownToHtml(markdown), [markdown]);
  const bbCode = useMemo(
    () => markdownToWorldAnvilBbCode(markdown),
    [markdown],
  );
  const parsedBbCode = useMemo(
    () => WorldAnvilParser.parseField(bbCode, true),
    [bbCode],
  );

  const copyToClipboard = async (
    value: string,
    field: "markdown" | "bbcode",
  ) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 1200);
    } catch (error) {
      console.error("Unable to copy content", error);
    }
  };

  return (
    <div>
      <Head>
        <title>Markdown Preview</title>
      </Head>
      {authToken && identity.success ? (
        <div className="container" style={{ paddingTop: "1.5rem" }}>
          <h1 className="text-center">Markdown → WorldAnvil BBCode Preview</h1>
          <p className="text-muted text-center">
            Paste Obsidian-style markdown on the left, review the rendered
            markdown in the centre, and inspect the generated WorldAnvil-style
            BBCode on the right. Copy raw BBCode from the bottom text area to
            paste into WorldAnvil. This is a work in progress, so please be
            careful to double-check what we output!
          </p>
          <Row className="g-3">
            <Col md={4}>
              <Form.Group>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Form.Label className="mb-0">Markdown input</Form.Label>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline-light"
                    onClick={() => copyToClipboard(markdown, "markdown")}
                  >
                    {copiedField === "markdown" ? "Copied" : "Copy"}
                  </Button>
                </div>
                <Form.Control
                  as="textarea"
                  rows={24}
                  value={markdown}
                  onChange={(event) => setMarkdown(event.target.value)}
                  className="font-monospace"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Markdown preview</Form.Label>
                <div
                  className="border rounded p-2 bg-dark"
                  style={{
                    minHeight: "38rem",
                    maxHeight: "38rem",
                    overflow: "auto",
                    wordWrap: "break-word",
                  }}
                  dangerouslySetInnerHTML={{ __html: renderedMarkdown }}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>WorldAnvil BBCode output</Form.Label>
                <div
                  className="border rounded p-2 bg-dark"
                  style={{
                    minHeight: "38rem",
                    maxHeight: "38rem",
                    overflow: "auto",
                    wordWrap: "break-word",
                  }}
                >
                  {parsedBbCode}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row className="g-3 mt-1">
            <Col>
              <Form.Group>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Form.Label className="mb-0">Raw BBCode</Form.Label>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline-light"
                    onClick={() => copyToClipboard(bbCode, "bbcode")}
                  >
                    {copiedField === "bbcode" ? "Copied" : "Copy"}
                  </Button>
                </div>
                <Form.Control
                  as="textarea"
                  rows={12}
                  value={bbCode}
                  readOnly
                  className="font-monospace"
                />
              </Form.Group>
            </Col>
          </Row>
        </div>
      ) : (
        <Alert variant="warning" className="m-3">
          Sign in to use the Markdown Preview page.
        </Alert>
      )}
    </div>
  );
}
