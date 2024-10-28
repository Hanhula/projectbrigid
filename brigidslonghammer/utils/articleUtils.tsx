import { Button } from "react-bootstrap";

export function generateMention(
  articleID: string,
  type: string,
  articleTitle: string
) {
  const articleType = type
    ? type.toString().charAt(0).toLowerCase() + type.toString().slice(1)
    : "";
  const mention = `@[${articleTitle}](${articleType}:${articleID})`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(mention);
      console.log("Text copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Button className="copy-block" variant="primary" onClick={copyToClipboard}>
      Copy Mention
    </Button>
  );
}

export function generateArticleBlock(articleID: string) {
  const block = `[articleblock:${articleID}]`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(block);
      console.log("Text copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Button className="copy-block" variant="primary" onClick={copyToClipboard}>
      Copy Block
    </Button>
  );
}
