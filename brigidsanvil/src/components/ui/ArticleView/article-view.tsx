import React, { useMemo } from "react";
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
import { getArticleHtml, downloadHtml } from "./article-export-helpers";

interface ArticleViewProps {
  article: Article;
  generateHTML?: boolean;
}

function titleFormatting(title: string) {
  return title
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Insert a space before each capital letter
    .replace(/^(.)/, (match) => match.toUpperCase()) // Capitalize the first letter
    .replace(/\bAnd\b/g, "&") // Replace "And" with "&"
    .replace(/\bOr\b/g, "/"); // Replace "Or" with "/"
}

const ArticleView: React.FC<ArticleViewProps> = React.memo(
  ({ article, generateHTML }) => {
    const display = useMemo(() => {
      switch (article.entityClass) {
        case ArticleTypes.Condition:
          return new ConditionDisplay(article as Condition);
        case ArticleTypes.Document:
          return new DocumentDisplay(article as Document);
        case ArticleTypes.Ethnicity:
          return new EthnicityDisplay(article as Ethnicity);
        case ArticleTypes.Formation:
          return new FormationDisplay(article as Formation);
        case ArticleTypes.Item:
          return new ItemDisplay(article as Item);
        case ArticleTypes.Person:
          return new PersonDisplay(article as Person);
        case ArticleTypes.Landmark:
          return new LandmarkDisplay(article as Landmark);
        case ArticleTypes.Language:
          return new LanguageDisplay(article as Language);
        case ArticleTypes.Law:
          return new LawDisplay(article as Law);
        case ArticleTypes.Location:
          return new LocationDisplay(article as Location);
        case ArticleTypes.Material:
          return new MaterialDisplay(article as Material);
        case ArticleTypes.MilitaryConflict:
          return new MilitaryConflictDisplay(article as MilitaryConflict);
        case ArticleTypes.Myth:
          return new MythDisplay(article as Myth);
        case ArticleTypes.Organisation:
          return new OrganisationDisplay(article as Organisation);
        case ArticleTypes.Plot:
          return new PlotDisplay(article as Plot);
        case ArticleTypes.Profession:
          return new ProfessionDisplay(article as Profession);
        case ArticleTypes.Prose:
          return new ProseDisplay(article as Prose);
        case ArticleTypes.Rank:
          return new RankDisplay(article as Rank);
        case ArticleTypes.Report:
          return new ReportDisplay(article as Report);
        case ArticleTypes.Settlement:
          return new SettlementDisplay(article as Settlement);
        case ArticleTypes.Species:
          return new SpeciesDisplay(article as Species);
        case ArticleTypes.Spell:
          return new SpellDisplay(article as Spell);
        case ArticleTypes.Technology:
          return new TechnologyDisplay(article as Technology);
        case ArticleTypes.Vehicle:
          return new VehicleDisplay(article as Vehicle);
        default:
          return new ArticleDisplay(article);
      }
    }, [article]);

    function handleDownload() {
      const html = getArticleHtml(article);
      downloadHtml(html, `${article.title}.html`);
    }

    const parsedHeaderFields = useMemo(() => {
      const fields: React.ReactNode[] = [];

      if (display.header) {
        Object.entries(display.header).forEach(([fieldName, field]) => {
          if (field) {
            fields.push(
              <div key={fieldName} className={fieldName}>
                {fieldName === "subheading" && (
                  <h4>{WorldAnvilParser.parseField(field, generateHTML)}</h4>
                )}
                {fieldName !== "subheading" && (
                  <h3>{WorldAnvilParser.parseField(field, generateHTML)}</h3>
                )}
              </div>,
            );
          }
        });
      }

      return fields;
    }, [display, generateHTML]);

    const parsedBodyFields = useMemo(() => {
      const fields: React.ReactNode[] = [];

      if (display.body) {
        Object.entries(display.body).forEach(([fieldName, field]) => {
          if (field) {
            fields.push(
              <div key={fieldName} className={fieldName}>
                {fieldName !== "content" && (
                  <h3>{titleFormatting(fieldName)}</h3>
                )}
                {WorldAnvilParser.parseField(field, generateHTML)}
              </div>,
            );
          }
        });
      }

      return fields;
    }, [display, generateHTML]);

    const parsedSidebarFields = useMemo(() => {
      const primarySidebarFields: React.ReactNode[] = [];
      const secondarySidebarFields: React.ReactNode[] = [];
      const bottomSidebarFields: React.ReactNode[] = [];

      if (display.sidebar) {
        Object.entries(display.sidebar).forEach(([fieldName, field]) => {
          if (!field) {
            return;
          }

          const parsedField = (
            <div key={fieldName} className={fieldName}>
              {fieldName !== "sidebarcontent" &&
                fieldName !== "sidepanelcontenttop" &&
                fieldName !== "sidepanelcontent" &&
                fieldName !== "sidebarcontentbottom" &&
                fieldName !== "motto" &&
                fieldName !== "disbanded" && (
                  <dt>{titleFormatting(fieldName)}</dt>
                )}
              <dd>{WorldAnvilParser.parseField(field, generateHTML)}</dd>
            </div>
          );

          if (
            fieldName === "sidebarcontent" ||
            fieldName === "motto" ||
            fieldName === "disbanded"
          ) {
            primarySidebarFields.push(parsedField);
          } else if (fieldName === "sidebarcontentbottom") {
            bottomSidebarFields.push(parsedField);
          } else {
            secondarySidebarFields.push(parsedField);
          }
        });
      }

      return {
        primarySidebarFields,
        secondarySidebarFields,
        bottomSidebarFields,
      };
    }, [display, generateHTML]);

    const parsedFooterFields = useMemo(() => {
      const fields: React.ReactNode[] = [];

      if (display.footer) {
        Object.entries(display.footer).forEach(([fieldName, field]) => {
          if (field) {
            fields.push(
              <div key={fieldName} className={fieldName}>
                {fieldName !== "fullfooter" && (
                  <h5>{titleFormatting(fieldName)}</h5>
                )}
                <div>{WorldAnvilParser.parseField(field, generateHTML)}</div>
              </div>,
            );
          }
        });
      }

      return fields;
    }, [display, generateHTML]);

    return (
      <div className="container article-viewer">
        <div className="cover">
          {article.cover && article.cover.url && (
            <Image src={article.cover.url} fluid />
          )}
        </div>
        {!generateHTML && (
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
            <Button
              className="article-link"
              variant="primary"
              onClick={handleDownload}
            >
              {"Download HTML (Beta)"}
            </Button>
          </div>
        )}
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
            {/* Create a Card for the sidebar contents */}
            {parsedSidebarFields.primarySidebarFields.map(
              (parsedField, index) => (
                <div key={index}>{parsedField}</div>
              ),
            )}
            <Card className="sidebar-card">
              <Card.Body>
                {parsedSidebarFields.secondarySidebarFields.map(
                  (parsedField, index) => (
                    <div key={index}>{parsedField}</div>
                  ),
                )}
              </Card.Body>
            </Card>
            {parsedSidebarFields.bottomSidebarFields.map(
              (parsedField, index) => (
                <div key={index}>{parsedField}</div>
              ),
            )}
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
  },
);

export default ArticleView;
