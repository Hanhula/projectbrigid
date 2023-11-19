import React from "react";
import WorldAnvilParser from "@/components/ui/ArticleView/CustomRenderers/WorldAnvilParser/worldanvil-parser";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
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
import {
  Language,
  LanguageDisplay,
} from "@/components/types/article-types/language";
import {
  Location,
  LocationDisplay,
} from "@/components/types/article-types/location";
import {
  Material,
  MaterialDisplay,
} from "@/components/types/article-types/material";
import {
  MilitaryConflict,
  MilitaryConflictDisplay,
} from "@/components/types/article-types/militaryconflict";
import { Myth, MythDisplay } from "@/components/types/article-types/myth";
import { Plot, PlotDisplay } from "@/components/types/article-types/plot";
import {
  Profession,
  ProfessionDisplay,
} from "@/components/types/article-types/profession";
import { Prose, ProseDisplay } from "@/components/types/article-types/prose";
import { Rank, RankDisplay } from "@/components/types/article-types/rank";
import { Report, ReportDisplay } from "@/components/types/article-types/report";
import {
  Settlement,
  SettlementDisplay,
} from "@/components/types/article-types/settlement";
import {
  Technology,
  TechnologyDisplay,
} from "@/components/types/article-types/technology";
import {
  Vehicle,
  VehicleDisplay,
} from "@/components/types/article-types/vehicle";

interface ArticleViewProps {
  article: Article;
}

function titleFormatting(title: string) {
  return title
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Insert a space before each capital letter
    .replace(/^(.)/, (match) => match.toUpperCase()) // Capitalize the first letter
    .replace(/\bAnd\b/g, "&") // Replace "And" with "&"
    .replace(/\bOr\b/g, "/"); // Replace "Or" with "/"
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
    case ArticleTypes.Language:
      display = new LanguageDisplay(article as Language);
      break;
    case ArticleTypes.Law:
      display = new LawDisplay(article as Law);
      break;
    case ArticleTypes.Location:
      display = new LocationDisplay(article as Location);
      break;
    case ArticleTypes.Material:
      display = new MaterialDisplay(article as Material);
      break;
    case ArticleTypes.MilitaryConflict:
      display = new MilitaryConflictDisplay(article as MilitaryConflict);
      break;
    case ArticleTypes.Myth:
      display = new MythDisplay(article as Myth);
      break;
    case ArticleTypes.Organisation:
      display = new OrganisationDisplay(article as Organisation);
      break;
    case ArticleTypes.Plot:
      display = new PlotDisplay(article as Plot);
      break;
    case ArticleTypes.Profession:
      display = new ProfessionDisplay(article as Profession);
      break;
    case ArticleTypes.Prose:
      display = new ProseDisplay(article as Prose);
      break;
    case ArticleTypes.Rank:
      display = new RankDisplay(article as Rank);
      break;
    case ArticleTypes.Report:
      display = new ReportDisplay(article as Report);
      break;
    case ArticleTypes.Settlement:
      display = new SettlementDisplay(article as Settlement);
      break;
    case ArticleTypes.Species:
      display = new SpeciesDisplay(article as Species);
      break;
    case ArticleTypes.Spell:
      display = new SpellDisplay(article as Spell);
      break;
    case ArticleTypes.Technology:
      display = new TechnologyDisplay(article as Technology);
      break;
    case ArticleTypes.Vehicle:
      display = new VehicleDisplay(article as Vehicle);
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
            {fieldName !== "fullfooter" && (
              <h5>{titleFormatting(fieldName)}</h5>
            )}
            <div>{WorldAnvilParser.parseField(field)}</div>
          </div>
        );
      }
    });
  }

  return (
    <div className="container article-viewer">
      <div className="cover">
        {article.cover && article.cover.url && (
          <Image src={article.cover.url} fluid />
        )}
      </div>
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
        <Link href={`/worldanvil/articles/${article.id}/edit`}>
          <Button className="article-link" variant="primary">
            {"Edit on Brigid"}
          </Button>
        </Link>
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
          {parsedSidebarFields
            .filter((field) => {
              const fieldName = field.props.className;
              return (
                fieldName === "sidebarcontent" ||
                fieldName === "motto" ||
                fieldName === "disbanded"
              );
            })
            .map((parsedField, index) => (
              <div key={index}>{parsedField}</div>
            ))}
          <Card className="sidebar-card">
            <Card.Body>
              {parsedSidebarFields
                .filter((field) => {
                  const fieldName = field.props.className;
                  return (
                    fieldName !== "sidebarcontent" &&
                    fieldName !== "sidebarcontentbottom" &&
                    fieldName !== "motto" &&
                    fieldName !== "disbanded"
                  );
                })
                .map((parsedField, index) => (
                  <div key={index}>{parsedField}</div>
                ))}
            </Card.Body>
          </Card>
          {parsedSidebarFields
            .filter((field) => {
              const fieldName = field.props.className;
              return fieldName === "sidebarcontentbottom";
            })
            .map((parsedField, index) => (
              <div key={index}>{parsedField}</div>
            ))}
        </Col>
      </Row>
      <br />
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
