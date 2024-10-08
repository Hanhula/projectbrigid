import { Article } from "@/components/types/article";
import { faClipboard, faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CellContext, FilterFn, Row } from "@tanstack/react-table";
import { Button } from "react-bootstrap";

export interface TagOption {
  label: string;
  value: string;
}

export type TableProps<TData> = {
  data: TData[];
  getRowCanExpand: (row: Row<TData>) => boolean;
};

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
      <FontAwesomeIcon icon={faClipboard} />
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
      <FontAwesomeIcon icon={faSquare} />
    </Button>
  );
}

export function camelCaseToCapitalizedWords(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2") // insert a space before a capital letter that follows a lowercase letter or a digit
    .split(" ") // split the string into words
    .map((word) =>
      word === "url" ? "URL" : word.charAt(0).toUpperCase() + word.slice(1)
    ) // capitalize the first letter of each word, but keep 'URL' as all-caps
    .join(" "); // join the words back together with spaces
}

export const renderSubComponent = ({ row }: { row: Row<Article> }) => {
  return (
    <pre style={{ fontSize: "10px" }}>
      <code>{JSON.stringify(row.original, null, 2)}</code>
    </pre>
  );
};

export const csvFilter: FilterFn<any> = (row, columnId, filterValue) => {
  const columnValues = String(row.getValue(columnId)).toLowerCase().split(",");
  const trimmedFilterValue = filterValue.trim().toLowerCase();

  if (trimmedFilterValue.endsWith(",")) {
    const exactSearch = trimmedFilterValue.slice(0, -1);
    return columnValues.includes(exactSearch);
  } else if (trimmedFilterValue.includes(",")) {
    const filters = trimmedFilterValue
      .split(",")
      .map((value: string) => value.trim());
    return filters.every((filter: string) => columnValues.includes(filter));
  } else {
    return columnValues.some((tag) => tag.includes(trimmedFilterValue));
  }
};

export const boolFilter: FilterFn<any> = (row, columnId, filterValue) => {
  const displayCss = row.getValue(columnId);
  const columnValue = displayCss ? "true" : "false";

  return columnValue === filterValue.trim().toLowerCase();
};
