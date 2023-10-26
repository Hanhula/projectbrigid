import { selectWorld } from "@/components/store/apiSlice";
import { selectWorldArticlesByWorld } from "@/components/store/articlesSlice";
import { Article } from "@/components/types/article";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import yabbcode from "ya-bbcode";
import parse from "html-react-parser";
import { renderToStaticMarkup } from "react-dom/server";

import Link from "next/link";
import React from "react";

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
    close: null, // Since <br> is a self-closing tag, set close to null
  });
  parser.registerTag("quote", {
    type: "content",
    replace: (attr, content) => {
      // Split the content using | as the delimiter
      const parts = content.split("|");

      if (parts.length === 2) {
        // If there are two parts, create a <div> for the second part
        const mainContent = parts[0].trim();
        const additionalContent = parts[1].trim();

        return `<blockquote class="blockquote">${mainContent}<div class="author">${additionalContent}</div></blockquote>`;
      } else {
        // If there's no | character or more than one, treat it as standard [quote] content
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
    open: () => "<h4>",
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

  const article = currentArticles.find(
    (article: Article) => article.id === slug
  );

  if (!article) {
    return <div>Article not found</div>;
  }

  function replacePersonLinks(text: string) {
    const pattern = /@\[([^\]]+)\]\(([^:]+):([^)]+)\)/g;
    return text.replace(pattern, (match, name, type, id) => {
      // Replace with a placeholder using a unique identifier
      return `@@Link_${id}@@`;
    });
  }

  let parsed = parser.parse(article.content);

  // Replace @[Name](type:ID) format with placeholders
  parsed = replacePersonLinks(parsed);

  // Function to replace placeholders with Link components
  function replaceLinkPlaceholders(parsedText: string) {
    const linkPattern = /@@Link_(.*?)@@/g;

    let replacedText = parsedText;
    let match;
    while ((match = linkPattern.exec(parsedText)) !== null) {
      const id = match[1];

      // Replace the placeholder with a Link component
      const linkComponent = (
        <Link key={id} href={`/worldanvil/articles/${id}`}>
          {"test"}
        </Link>
      );

      const linkHTML = renderToStaticMarkup(linkComponent);

      replacedText = replacedText.replace(`@@Link_${id}@@`, linkHTML);
    }

    return replacedText;
  }

  // Replace placeholders with Link components
  parsed = replaceLinkPlaceholders(parsed);

  return (
    <div className="container">
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: parsed }} />
    </div>
  );
};

export default ArticlePage;
