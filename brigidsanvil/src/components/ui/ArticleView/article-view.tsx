// ArticleView.tsx

import React from "react";
import WorldAnvilParser from "@/components/ui/ArticleView/CustomRenderers/WorldAnvilParser/worldanvil-parser";
import { Col, Row } from "react-bootstrap";
import {
  Article,
  ArticleDisplay,
  ArticleTypes,
} from "@/components/types/article";

import "./article-view.scss";
import _ from "lodash";
import { Person, PersonDisplay } from "@/components/types/article-types/person";

interface ArticleViewProps {
  article: Article;
}

function titleFormatting(title: string) {
  return title
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Insert a space before each capital letter
    .replace(/^(.)/, (match) => match.toUpperCase()); // Capitalize the first letter
}

const ArticleView: React.FC<ArticleViewProps> = ({ article }) => {
  let display;
  console.log(article.entityClass);

  if (article.entityClass === ArticleTypes.Person) {
    console.log("yes!");
    display = new PersonDisplay(article as Person);
  } else {
    display = new ArticleDisplay(article);
  }

  const parsedBodyFields: any[] = [];
  const parsedSidebarFields: any[] = [];

  if (display.body) {
    Object.entries(display.body).forEach(([fieldName, field]) => {
      if (!field) {
        field = "";
      }
      parsedBodyFields.push(
        <div key={fieldName}>
          {fieldName !== "content" && <h3>{titleFormatting(fieldName)}</h3>}
          {WorldAnvilParser.parseField(field)}
        </div>
      );
    });
  }

  if (display.sidebar) {
    Object.entries(display.sidebar).forEach(([fieldName, field]) => {
      if (!field) {
        field = "";
      }

      parsedSidebarFields.push(
        <div key={fieldName}>
          {fieldName !== "sidebarcontent" &&
            fieldName !== "sidepanelcontenttop" &&
            fieldName !== "sidepanelcontent" &&
            fieldName !== "sidebarcontentbottom" && (
              <dt>{titleFormatting(fieldName)}</dt>
            )}
          <dd>{WorldAnvilParser.parseField(field)}</dd>
        </div>
      );
    });
  }

  // add a link to the article on WA

  return (
    <div className="container">
      <h1>{article.title}</h1>
      <Row>
        <Col md={8}>
          {parsedBodyFields.map((parsedField, index) => (
            <div key={index}>{parsedField}</div>
          ))}
        </Col>
        <Col md={4}>
          {parsedSidebarFields.map((parsedField, index) => (
            <div key={index}>{parsedField}</div>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default ArticleView;
