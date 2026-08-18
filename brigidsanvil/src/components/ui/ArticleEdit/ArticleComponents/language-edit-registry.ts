import { ArticleFieldConfig } from "../EditComponents/article-edit-field-renderer";
import {
  createCommonBodyFieldRegistry,
  createCommonFooterFieldRegistry,
  createCommonSidebarFieldRegistry,
  createCommonSubtitleFieldRegistry,
  createCommonDesignFieldRegistry,
} from "../EditComponents/article-edit-registry-common";
import { Language } from "@/components/types/article-types/language";

export type LanguageBodySubTabConfig = {
  eventKey: string;
  title: string;
  fields: ArticleFieldConfig<Language>[];
};

export const bodyFieldRegistry: ArticleFieldConfig<Language>[] = [
  ...createCommonBodyFieldRegistry<Language>(),
];

export const bodySubTabRegistry: LanguageBodySubTabConfig[] = [
  {
    eventKey: "information",
    title: "Information",
    fields: [
      {
        key: "body-alphabet",
        kind: "bbcode",
        fieldIdentifier: "alphabet",
        label: "Writing System",
      },
      {
        key: "body-geographicdistribution",
        kind: "bbcode",
        fieldIdentifier: "geographicdistribution",
        label: "Geographic Distribution",
      },
      {
        key: "body-phonology",
        kind: "bbcode",
        fieldIdentifier: "phonology",
        label: "Phonology",
      },
      {
        key: "body-morphology",
        kind: "bbcode",
        fieldIdentifier: "morphology",
        label: "Morphology",
      },
      {
        key: "body-syntax",
        kind: "bbcode",
        fieldIdentifier: "syntax",
        label: "Syntax",
      },
      {
        key: "body-vocabulary",
        kind: "bbcode",
        fieldIdentifier: "vocabulary",
        label: "Vocabulary",
      },
      {
        key: "body-phonetics",
        kind: "bbcode",
        fieldIdentifier: "phonetics",
        label: "Phonetics",
      },
      {
        key: "body-tenses",
        kind: "bbcode",
        fieldIdentifier: "tenses",
        label: "Tenses",
      },
      {
        key: "body-sentence-structure",
        kind: "bbcode",
        fieldIdentifier: "sentenceStructure",
        label: "Sentence Structure",
      },
      {
        key: "body-adjective-order",
        kind: "bbcode",
        fieldIdentifier: "adjectiveOrder",
        label: "Adjective Order",
      },
      {
        key: "body-structural-markers",
        kind: "bbcode",
        fieldIdentifier: "structuralMarkers",
        label: "Structural Markers",
      },
      {
        key: "body-dictionary",
        kind: "note",
        label: "Dictionary",
        message:
          "The WorldAnvil API doesn't return the dictionary in a format we can edit! :(",
      },
    ],
  },
  {
    eventKey: "sidebar-details",
    title: "Sidebar Details",
    fields: [
      {
        key: "body-parents",
        kind: "dropdown",
        fieldIdentifier: "parents",
        label: "Parent Languages",
        entityClass: ["Language"],
      },
      {
        key: "body-ethnicities",
        kind: "dropdown",
        fieldIdentifier: "ethnicities",
        label: "Spoken By",
        entityClass: ["Ethnicity"],
        isMulti: true,
      },
      {
        key: "body-phrases",
        kind: "text",
        fieldIdentifier: "phrases",
        label: "Phrases",
      },
      {
        key: "body-femalenames",
        kind: "text",
        fieldIdentifier: "femalenames",
        label: "Common Female Names",
      },
      {
        key: "body-malenames",
        kind: "text",
        fieldIdentifier: "malenames",
        label: "Common Male Names",
      },
      {
        key: "body-unisexnames",
        kind: "text",
        fieldIdentifier: "unisexnames",
        label: "Common Unisex Names",
      },
      {
        key: "body-familynames",
        kind: "text",
        fieldIdentifier: "familynames",
        label: "Common Family Names",
      },
    ],
  },
];

export const subtitleFieldRegistry: ArticleFieldConfig<Language>[] = [
  ...createCommonSubtitleFieldRegistry<Language>(),
];

export const sidebarFieldRegistry: ArticleFieldConfig<Language>[] = [
  ...createCommonSidebarFieldRegistry<Language>(),
];

export const footerFieldRegistry: ArticleFieldConfig<Language>[] = [
  ...createCommonFooterFieldRegistry<Language>(),
];

export const designFieldRegistry: ArticleFieldConfig<Language>[] = [
  ...createCommonDesignFieldRegistry<Language>(),
];
