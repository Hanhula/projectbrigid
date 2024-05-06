import { Article } from "@/components/types/article";
import ArticleView from "./article-view";
import { renderToStaticMarkup } from "react-dom/server";
import JSZip from "jszip";
import { saveAs } from "file-saver";

function sanitizeTitle(title: string): string {
  return title.replace(/[\/:*?"<>|]/g, "");
}

export async function downloadAllArticlesHtml(articles: Article[]) {
  const zip = new JSZip();

  for (const article of articles) {
    const html = getArticleHtml(article);
    const sanitizedTitle = sanitizeTitle(article.title);
    zip.file(`${sanitizedTitle}.html`, html);
  }

  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, "articles.zip");
}

export function getArticleHtml(article: Article) {
  const html = renderToStaticMarkup(
    <ArticleView article={article} generateHTML={true} />
  );

  return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${article.title}</title>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `;
}

export function downloadHtml(html: string, filename: string) {
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  link.click();
  URL.revokeObjectURL(url);
}
