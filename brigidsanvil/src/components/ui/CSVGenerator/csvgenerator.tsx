import { Article } from "@/components/types/article";
import Papa from "papaparse";
import { Button } from "react-bootstrap";
import { useMemo, memo } from "react";

type CSVGeneratorProps = {
  articles: Article[];
};

const CSVGenerator: React.FC<CSVGeneratorProps> = ({ articles }) => {
  // Helper function to collect all unique property names from the articles
  const collectPropertyNames = (articles: Article[]): string[] => {
    const propertyNames = new Set<string>();
    articles.forEach((article) => {
      for (const property in article) {
        if (article.hasOwnProperty(property)) {
          propertyNames.add(property);
        }
      }
    });
    return Array.from(propertyNames);
  };

  const allPropertyNames = useMemo(
    () => collectPropertyNames(articles),
    [articles]
  );

  const mapProperty = (article: Article, property: string) => {
    if (property in article) {
      const value = (article as Record<string, any>)[property];
      if (typeof value === "object" && value) {
        if (Array.isArray(value) && value.length > 0) {
          return value
            .filter((item) => item?.title)
            .map((item) => String(item.title))
            .join(", ");
        } else if ("date" in value) {
          return value.date ?? "";
        } else if ("title" in value) {
          return value.title ?? "";
        }
      }
      return value;
    }
    return undefined;
  };

  const replaceNewlines = (text: string) => {
    return text.replace(/[\r\n]/g, " ");
  };

  const modifiedArticles = useMemo(() => {
    return articles.map((article) => {
      const articleData: Record<string, any> = {};
      allPropertyNames.forEach((property) => {
        const propertyValue = mapProperty(article, property);
        if (typeof propertyValue === "string") {
          articleData[property] = replaceNewlines(propertyValue);
        } else {
          articleData[property] = propertyValue;
        }
      });
      return articleData;
    });
  }, [articles, allPropertyNames]);

  const csv = useMemo(
    () =>
      Papa.unparse(modifiedArticles, {
        quotes: true,
        escapeFormulae: true,
        delimiter: ",",
      }),
    [modifiedArticles]
  );

  const csvDataUri = useMemo(() => {
    const csvData = "\ufeff" + csv;
    return `data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`;
  }, [csv]);

  return (
    <Button variant="primary">
      <a
        href={csvDataUri}
        download="articles.csv"
        style={{ color: "white", textDecoration: "none" }}
      >
        Export Articles to CSV
      </a>
    </Button>
  );
};

export default memo(CSVGenerator);
