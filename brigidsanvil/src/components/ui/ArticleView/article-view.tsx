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
import {
  Organisation,
  OrganisationDisplay,
} from "@/components/types/article-types/organisation";
import {
  Species,
  SpeciesDisplay,
} from "@/components/types/article-types/species";
import { Spell, SpellDisplay } from "@/components/types/article-types/spell";
import { Law, LawDisplay } from "@/components/types/article-types/law";
import {
  Condition,
  ConditionDisplay,
} from "@/components/types/article-types/condition";
import {
  Document,
  DocumentDisplay,
} from "@/components/types/article-types/document";
import {
  Ethnicity,
  EthnicityDisplay,
} from "@/components/types/article-types/ethnicity";
import {
  Formation,
  FormationDisplay,
} from "@/components/types/article-types/formation";
import { Item, ItemDisplay } from "@/components/types/article-types/item";
import {
  Landmark,
  LandmarkDisplay,
} from "@/components/types/article-types/landmark";

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

  switch (article.entityClass) {
    case ArticleTypes.Condition:
      display = new ConditionDisplay(article as Condition);
      break;
    case ArticleTypes.Document:
      display = new DocumentDisplay(article as Document);
      break;
    case ArticleTypes.Ethnicity:
      display = new EthnicityDisplay(article as Ethnicity);
      break;
    case ArticleTypes.Formation:
      display = new FormationDisplay(article as Formation);
      break;
    case ArticleTypes.Item:
      display = new ItemDisplay(article as Item);
      break;
    case ArticleTypes.Person:
      display = new PersonDisplay(article as Person);
      break;
    case ArticleTypes.Landmark:
      display = new LandmarkDisplay(article as Landmark);
      break;
    case ArticleTypes.Law:
      display = new LawDisplay(article as Law);
      break;
    case ArticleTypes.Organisation:
      display = new OrganisationDisplay(article as Organisation);
      break;
    case ArticleTypes.Species:
      display = new SpeciesDisplay(article as Species);
      break;
    case ArticleTypes.Spell:
      display = new SpellDisplay(article as Spell);
      break;
    default:
      display = new ArticleDisplay(article);
      break;
  }

  const parsedHeaderFields: any[] = [];
  const parsedBodyFields: any[] = [];
  const parsedSidebarFields: any[] = [];
  const parsedFooterFields: any[] = [];

  if (display.header) {
    Object.entries(display.header).forEach(([fieldName, field]) => {
      if (field) {
        parsedHeaderFields.push(
          <div key={fieldName} className={fieldName}>
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
          <div key={fieldName} className={fieldName}>
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
          <div key={fieldName} className={fieldName}>
            {fieldName !== "sidebarcontent" &&
              fieldName !== "sidepanelcontenttop" &&
              fieldName !== "sidepanelcontent" &&
              fieldName !== "sidebarcontentbottom" &&
              fieldName !== "motto" &&
              fieldName !== "disbanded" && (
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
          <div key={fieldName} className={fieldName}>
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
