import { Article } from "@/components/types/article";
import { Person } from "@/components/types/article-types/person";
import Papa from "papaparse";
import { Button } from "react-bootstrap";

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

  const allPropertyNames = collectPropertyNames(articles);

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

  const modifiedArticles = articles.map((article) => {
    const articleData: Record<string, any> = {};

    allPropertyNames.forEach((property) => {
      articleData[property] = mapProperty(article, property);
    });

    return articleData;
  });

  const csv = Papa.unparse(modifiedArticles);

  const csvDataUri = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;

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

export default CSVGenerator;
