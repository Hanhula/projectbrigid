// ArticleView.tsx

import React from "react";
import WorldAnvilParser from "@/components/ui/ArticleView/CustomRenderers/WorldAnvilParser/worldanvil-parser";
import { Button, Col, Row } from "react-bootstrap";
import {
  Article,
  ArticleDisplay,
  ArticleTypes,
} from "@/components/types/article";

import "./article-view.scss";
import _ from "lodash";
import { Person, PersonDisplay } from "@/components/types/article-types/person";
import Link from "next/link";

interface ArticleViewProps {
  article: Article;
}

function titleFormatting(title: string) {
  return title
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Insert a space before each capital letter
    .replace(/^(.)/, (match) => match.toUpperCase()) // Capitalize the first letter
    .replace(/\bAnd\b/g, "&"); // Replace "And" with "&"
}

const ArticleView: React.FC<ArticleViewProps> = ({ article }) => {
  let display;

  if (article.entityClass === ArticleTypes.Person) {
    display = new PersonDisplay(article as Person);
  } else {
    display = new ArticleDisplay(article);
  }

  const parsedHeaderFields: any[] = [];
  const parsedBodyFields: any[] = [];
  const parsedSidebarFields: any[] = [];
  const parsedFooterFields: any[] = [];

  if (display.header) {
    console.log(display.header);
    Object.entries(display.header).forEach(([fieldName, field]) => {
      if (field) {
        parsedHeaderFields.push(
          <div key={fieldName}>
            {fieldName === "subheading" && (
              <h4>{WorldAnvilParser.parseField(field)}</h4>
            )}
            {fieldName !== "subheading" && (
              <h3>{WorldAnvilParser.parseField(field)}</h3>
            )}
          </div>
        );
      }
    });
  }

  if (display.body) {
    Object.entries(display.body).forEach(([fieldName, field]) => {
      if (field) {
        parsedBodyFields.push(
          <div key={fieldName}>
            {fieldName !== "content" && <h3>{titleFormatting(fieldName)}</h3>}
            {WorldAnvilParser.parseField(field)}
          </div>
        );
      }
    });
  }

  if (display.sidebar) {
    Object.entries(display.sidebar).forEach(([fieldName, field]) => {
      if (field) {
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
      }
    });
  }

  if (display.footer) {
    Object.entries(display.footer).forEach(([fieldName, field]) => {
      if (field) {
        parsedFooterFields.push(
          <div key={fieldName}>
            {fieldName !== "fullfooter" &&
              fieldName !== "sidepanelcontenttop" &&
              fieldName !== "sidepanelcontent" &&
              fieldName !== "sidebarcontentbottom" && (
                <h5>{titleFormatting(fieldName)}</h5>
              )}
            <div>{WorldAnvilParser.parseField(field)}</div>
          </div>
        );
      }
    });
  }

  // add a link to the article on WA

  return (
    <div className="container">
      <div className="article-buttons">
        <Link href={article.url}>
          <Button className="article-link">{"View on WorldAnvil"}</Button>
        </Link>
        <Link href={article.editURL ? article.editURL : ""}>
          <Button
            className="article-link"
            variant={article.editURL ? "primary" : "disabled"}
            disabled={!article.editURL}
          >
            {"Edit on WorldAnvil"}
          </Button>
        </Link>
        <Button className="article-link" variant="primary disabled">
          {"Edit on Brigid"}
        </Button>
      </div>
      <h1>{article.title}</h1>
      {parsedHeaderFields.map((parsedField, index) => (
        <div key={index}>{parsedField}</div>
      ))}
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
      <Row>
        <Col>
          {parsedFooterFields.map((parsedField, index) => (
            <div key={index}>{parsedField}</div>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default ArticleView;
