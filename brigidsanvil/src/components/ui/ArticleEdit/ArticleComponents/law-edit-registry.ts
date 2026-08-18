import { ArticleFieldConfig } from "../EditComponents/article-edit-field-renderer";
import {
  createCommonBodyFieldRegistry,
  createCommonFooterFieldRegistry,
  createCommonSidebarFieldRegistry,
  createCommonSubtitleFieldRegistry,
  createCommonDesignFieldRegistry,
} from "../EditComponents/article-edit-registry-common";
import { Law } from "@/components/types/article-types/law";

export type LawBodySubTabConfig = {
  eventKey: string;
  title: string;
  fields: ArticleFieldConfig<Law>[];
};

export const bodyFieldRegistry: ArticleFieldConfig<Law>[] = [
  ...createCommonBodyFieldRegistry<Law>(),
];

const lawTypes = [
  "Natural",
  "Metaphysical",
  "Metaphysical, Arcane",
  "Metaphysical, Astral",
  "Metaphysical, Demonic",
  "Metaphysical, Divine",
  "Metaphysical, Elemental",
  "Metaphysical, Psychic",
  "Metaphysical, Supernatural",
];

export const bodySubTabRegistry: LawBodySubTabConfig[] = [
  {
    eventKey: "details",
    title: "Details",
    fields: [
      {
        key: "sidebar-type",
        kind: "field-dropdown",
        options: lawTypes,
        fieldIdentifier: "lawtype",
        label: "Sidebar - Type",
      },
      {
        key: "body-manifestation",
        kind: "bbcode",
        fieldIdentifier: "manifestation",
        label: "Manifestation",
      },
      {
        key: "body-localisation",
        kind: "bbcode",
        fieldIdentifier: "localization",
        label: "Localisation",
      },
    ],
  },
];

export const subtitleFieldRegistry: ArticleFieldConfig<Law>[] = [
  ...createCommonSubtitleFieldRegistry<Law>(),
];

export const sidebarFieldRegistry: ArticleFieldConfig<Law>[] = [
  ...createCommonSidebarFieldRegistry<Law>(),
];

export const footerFieldRegistry: ArticleFieldConfig<Law>[] = [
  ...createCommonFooterFieldRegistry<Law>(),
];

export const designFieldRegistry: ArticleFieldConfig<Law>[] = [
  ...createCommonDesignFieldRegistry<Law>(),
];
