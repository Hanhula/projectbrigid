import { Article } from "@/components/types/article";
import ArticleView from "./article-view";
import { renderToStaticMarkup } from "react-dom/server";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export async function downloadAllArticlesHtml(articles: Article[]) {
  // Create a new JSZip instance
  const zip = new JSZip();

  // For each article...
  for (const article of articles) {
    // Generate the HTML for the article
    const html = getArticleHtml(article);

    // Add the HTML to the zip file
    zip.file(`${article.title}.html`, html);
  }

  // Generate the zip file as a Blob
  const blob = await zip.generateAsync({ type: "blob" });

  // Start the download
  saveAs(blob, "articles.zip");
}

export function getArticleHtml(article: Article) {
  // Render the ArticleView component to a static HTML string
  const html = renderToStaticMarkup(
    <ArticleView article={article} generateHTML={true} />
  );

  // Wrap the HTML string in a complete HTML document structure
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
  // Create a Blob from the HTML string
  const blob = new Blob([html], { type: "text/html" });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a link with this URL
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  // Programmatically click the link to start the download
  link.click();

  // Release the reference to the file by revoking the URL
  URL.revokeObjectURL(url);
}
