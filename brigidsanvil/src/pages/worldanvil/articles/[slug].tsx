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

const CustomSpoiler: React.FC<{ title: string; content: string }> = ({
  title,
  content,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="spoiler-content"
        aria-expanded={open}
      >
        {title || "Spoiler"}
      </Button>
      <Collapse in={open}>
        <div id="spoiler-content">{content}</div>
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
        return `<customspoiler title="${spoilerTitle}"> ${spoilerText} </customspoiler>`;
      } else {
        return `<customspoiler title=""> ${content} </customspoiler>`;
      }
    },
  });

  const article = currentArticles.find(
    (article: Article) => article.id === slug
  );

  console.log(article);

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

  const customTransform = (domNode: DOMNode) => {
    // @ts-expect-error
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

    // else if (domNode.type === "tag" && domNode.name === "customspoiler") {
    //   const spoilerTitle = domNode.attribs.title;

    //   const [open, setOpen] = useState(false);

    //   const parsedSpoilerText = domNode.children.map((childNode) => {
    //     if (childNode.type === "text") {
    //       return childNode.data;
    //     } else if (childNode.type === "tag") {
    //       // If it's a tag, recursively parse it with the same customTransform function
    //       return customTransform(childNode);
    //     } else {
    //       return null;
    //     }
    //   });

    //   return (
    //     <div>
    //       <Button
    //         onClick={() => setOpen(!open)}
    //         aria-controls="spoiler-content"
    //         aria-expanded={open}
    //       >
    //         {spoilerTitle || "Spoiler"}
    //       </Button>
    //       <Collapse in={open}>
    //         <div id="spoiler-content">{parsedSpoilerText}</div>
    //       </Collapse>
    //     </div>
    //   );
    // }
    return domNode; // Return the unchanged node for all other cases
  };

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
