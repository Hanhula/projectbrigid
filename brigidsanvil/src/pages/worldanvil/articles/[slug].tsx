import { selectWorld } from "@/components/store/apiSlice";
import { selectWorldArticlesByWorld } from "@/components/store/articlesSlice";
import { Article } from "@/components/types/article";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import yabbcode from "ya-bbcode";
import parse, { DOMNode } from "html-react-parser";

import Link from "next/link";
import React, { useState } from "react";
import { Button, Collapse } from "react-bootstrap";

function elementToString(element: DOMNode): string {
  if (element.type === "text") {
    //@ts-expect-error
    return element.data;
    //@ts-expect-error
  } else if (element.name === "br") {
    return "<br>";
    //@ts-expect-error
  } else if (element.children && element.children.length > 0) {
    //@ts-expect-error
    const childStrings = element.children.map((child, index) => {
      return elementToString(child);
    });

    //@ts-expect-error
    if (element.attribs.href) {
      //@ts-expect-error
      return `<${element.name} href="${
        //@ts-expect-error
        element.attribs.href
        //@ts-expect-error
      }">${childStrings.join("")}</${element.name}>`;
    } else {
      //@ts-expect-error
      return `<${element.name || ""}>${childStrings.join("")}</${
        //@ts-expect-error
        element.name || ""
      }>`;
    }
  } else {
    //@ts-expect-error
    return `<${element.name || ""}></${element.name || ""}>`;
  }
}

const customTransform = (domNode: DOMNode) => {
  //@ts-expect-error
  if (domNode.type === "tag" && domNode.name === "customurl") {
    // @ts-expect-error
    const reactChildren = domNode.children.map(
      (childNode: DOMNode, index: number) => {
        if (childNode.type === "text") {
          // @ts-expect-error
          return childNode.data;
        } else {
          return null;
        }
      }
    );

    return (
      // @ts-expect-error
      <Link href={domNode.attribs.href}>
        {reactChildren.filter((child: any) => child !== null)}
      </Link>
    );
  }

  //@ts-expect-error
  if (domNode.type === "tag" && domNode.name === "customspoiler") {
    //@ts-expect-error
    const spoilerTitle = domNode.children.find(
      //@ts-expect-error
      (child) => child.name && child.name === "button"
    );
    //@ts-expect-error
    const spoilerContent = domNode.children.find(
      //@ts-expect-error
      (child) => child.name && child.name === "collapse"
    );

    if (spoilerTitle && spoilerContent) {
      return (
        <CustomSpoiler
          title={spoilerTitle}
          content={spoilerContent}
        ></CustomSpoiler>
      );
    }
  }
  return domNode; // Return the unchanged node for all other cases
};

const CustomSpoiler: React.FC<{ title: Element; content: DOMNode }> = ({
  title,
  content,
}) => {
  const [open, setOpen] = useState(false);

  //@ts-expect-error
  let titleText = title.children ? title.children[0].data : "Spoiler";

  let spoilerContentHTML = elementToString(content);
  let parsedContent = parse(spoilerContentHTML, {
    replace: customTransform,
  });

  console.log(content);

  return (
    <div>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="spoiler-content"
        aria-expanded={open}
      >
        {titleText || "Spoiler"}
      </Button>
      <Collapse in={open}>
        <div id="spoiler-content">{parsedContent}</div>
      </Collapse>
    </div>
  );
};

const ArticlePage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const world = useSelector(selectWorld);
  const worldArticles = useSelector(selectWorldArticlesByWorld(world.id));
  const currentArticles = worldArticles!.articles;

  const parser = new yabbcode();

  parser.registerTag("br", {
    type: "replace",
    open: () => "<br>",
    close: null,
  });

  parser.registerTag("quote", {
    type: "content",
    replace: (attr, content) => {
      const parts = content.split("|");

      if (parts.length === 2) {
        const mainContent = parts[0].trim();
        const additionalContent = parts[1].trim();

        return `<figure><blockquote class="blockquote">${mainContent}</blockquote><figcaption class="blockquote-footer">${additionalContent}</figcaption></figure>`;
      } else {
        return `<blockquote class="blockquote">${content}</blockquote>`;
      }
    },
  });

  parser.registerTag("h1", {
    type: "replace",
    open: () => "<h2>",
    close: "</h2>",
  });

  parser.registerTag("h2", {
    type: "replace",
    open: () => "<h3>",
    close: "</h3>",
  });

  parser.registerTag("h3", {
    type: "replace",
    open: (attr) => {
      const idName = attr || "";
      return `<h4 id="${idName}">`;
    },
    close: "</h4>",
  });

  parser.registerTag("h4", {
    type: "replace",
    open: () => "<h5>",
    close: "</h5>",
  });

  parser.registerTag("h5", {
    type: "replace",
    open: () => "<h6>",
    close: "</h6>",
  });

  parser.registerTag("hr", {
    type: "replace",
    open: () => `<hr>`,
    close: null,
  });

  parser.registerTag("ol", {
    type: "replace",
    open: () => "<ol>",
    close: "</ol>",
  });

  parser.registerTag("ul", {
    type: "replace",
    open: () => "<ul>",
    close: "</ul>",
  });

  parser.registerTag("li", {
    type: "replace",
    open: () => "<li>",
    close: "</li>",
  });

  parser.registerTag("sup", {
    type: "replace",
    open: () => "<sup>",
    close: "</sup>",
  });

  parser.registerTag("row", {
    type: "replace",
    open: () => `<div class='row'>`,
    close: "</div>",
  });

  parser.registerTag("col", {
    type: "replace",
    open: () => `<div class='col-md-6'>`,
    close: "</div>",
  });

  parser.registerTag("col3", {
    type: "replace",
    open: () => `<div class='col-md-4'>`,
    close: "</div>",
  });

  parser.registerTag("customDiv", {
    type: "replace",
    open: (attr) => {
      const className = attr || "";
      return `<div class="${className}">`;
    },
    close: "</div>",
  });

  parser.registerTag("customSpan", {
    type: "replace",
    open: (attr) => {
      const className = attr || "";
      return `<span class="${className}">`;
    },
    close: "</span>",
  });

  parser.registerTag("customUrl", {
    type: "replace",
    open: (attr) => {
      const id = attr || "";

      return `<customUrl href="${id}">`;
    },
    close: "</customUrl>",
  });

  parser.registerTag("url", {
    type: "replace",
    open: (attr) => {
      const id = attr || "";

      return `<a href="${id}">`;
    },
    close: "</a>",
  });

  parser.registerTag("spoiler", {
    type: "content",
    replace: (attr, content) => {
      const parts = content.split("|");
      if (parts.length === 2) {
        const spoilerText = parts[0].trim();
        const spoilerTitle = parts[1].trim();

        return `
        <customspoiler>
          <button class="btn btn-primary">
            ${spoilerTitle || "Spoiler"}
          </button>
          <collapse>
            <div id="spoiler-content">${spoilerText}</div>
          </collapse>
        </customspoiler>
      `;
      } else {
        return `        <customspoiler>
        <button class="btn btn-primary">
          "Spoiler"
        </button>
        <collapse>
          <div id="spoiler-content">${parts[0]}</div>
        </collapse>
      </customspoiler>`;
      }
    },
  });

  const article = currentArticles.find(
    (article: Article) => article.id === slug
  );

  if (!article) {
    return <div>Article not found</div>;
  }

  function replaceLinks(text: string) {
    const pattern = /@\[([^\]]+)\]\(([^:]+):([^)]+)\)/g;
    return text.replace(pattern, (match, name, type, id) => {
      return `[customUrl=${id}]${name}[/customUrl]`;
    });
  }

  let content = article.content ? article.content : "";
  let preprocessedContent = content
    .replace(
      /\[container:([^\]]+)\]/g,
      (match, className) => `[customDiv=${className}]`
    )
    .replace(/\[\/container\]/g, "[/customDiv]")
    .replace(
      /\[section:([^\]]+)\]/g,
      (match, className) => `[customSpan=${className}]`
    )
    .replace(/\[\/section\]/g, "[/customSpan]")
    .replace(/\[h3\|([^\]]+)\]/g, (match, anchorText) => `[h3=${anchorText}]`)
    .replace(/\[url:([^\]]+)\]/g, (match, href) => `[url=${href}]`);

  preprocessedContent = replaceLinks(preprocessedContent);
  let parsed = parser.parse(preprocessedContent);

  const parstext = parse(parsed, {
    replace: customTransform,
  });

  return (
    <div className="container">
      <h1>{article.title}</h1>
      <div>{parstext}</div>
    </div>
  );
};

export default ArticlePage;
