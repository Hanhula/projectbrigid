import { selectWorld } from "@/components/store/apiSlice";
import { selectWorldArticlesByWorld } from "@/components/store/articlesSlice";
import { Article } from "@/components/types/article";
import { World } from "@/components/types/world";
import Papa from "papaparse";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const CSVGenerator = () => {
  const world: World = useSelector(selectWorld);
  const worldArticles = useSelector(selectWorldArticlesByWorld(world.id));
  const articles = worldArticles!.articles;
  const [csvDataUri, setCsvDataUri] = useState<string | null>(null);

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
  const mapProperty = (article: Article, property: string) => {
    if (property in article) {
      const value = (article as Record<string, any>)[property];
      if (typeof value === "object" && value) {
        if (Array.isArray(value)) {
          return value.map((item: any) => item.title).join(", ");
        } else if ("date" in value) {
          return value.date;
        } else if ("title" in value) {
          return value.title;
        }
      }
      return value;
    }
    return undefined;
  };

  const replaceNewlines = (text: string) => {
    // Replace newline characters with a space or an empty string, depending on your needs
    return text.replace(/[\r\n]/g, " "); // This example replaces newlines with spaces
  };

  const handleClick = () => {
    const allPropertyNames = collectPropertyNames(articles);

    const modifiedArticles = articles.map((article) => {
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

    const csv = Papa.unparse(modifiedArticles, {
      quotes: true,
      escapeFormulae: true,
      delimiter: ",",
    });

    const csvData = "\ufeff" + csv;
    const newCsvDataUri = `data:text/csv;charset=utf-8,${encodeURIComponent(
      csvData
    )}`;

    setCsvDataUri(newCsvDataUri);
  };

  return (
    <Button variant="primary" onClick={handleClick}>
      <a
        href={csvDataUri || "#"}
        download={csvDataUri ? "articles.csv" : undefined}
        style={{ color: "white", textDecoration: "none" }}
      >
        Export Articles to CSV
      </a>
    </Button>
  );
};

export default CSVGenerator;
