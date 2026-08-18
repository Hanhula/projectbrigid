import { ArticleFieldConfig } from "../EditComponents/article-edit-field-renderer";
import {
  createCommonBodyFieldRegistry,
  createCommonFooterFieldRegistry,
  createCommonSidebarFieldRegistry,
  createCommonSubtitleFieldRegistry,
  createCommonDesignFieldRegistry,
} from "../EditComponents/article-edit-registry-common";
import { Myth } from "@/components/types/article-types/myth";

export type MythBodySubTabConfig = {
  eventKey: string;
  title: string;
  fields: ArticleFieldConfig<Myth>[];
};

export const bodyFieldRegistry: ArticleFieldConfig<Myth>[] = [
  ...createCommonBodyFieldRegistry<Myth>(),
];

export const bodySubTabRegistry: MythBodySubTabConfig[] = [
  {
    eventKey: "information",
    title: "Information",
    fields: [
      {
        key: "body-summary",
        kind: "bbcode",
        fieldIdentifier: "summary",
        label: "Summary",
      },
      {
        key: "body-historicalbasis",
        kind: "bbcode",
        fieldIdentifier: "historicalbasis",
        label: "Historical Basis",
      },
      {
        key: "body-spread",
        kind: "bbcode",
        fieldIdentifier: "spread",
        label: "Spread",
      },
      {
        key: "body-variations",
        kind: "bbcode",
        fieldIdentifier: "variations",
        label: "Variations & Mutations",
      },
      {
        key: "body-culturalreception",
        kind: "bbcode",
        fieldIdentifier: "culturalreception",
        label: "Cultural Reception",
      },
      {
        key: "body-literature",
        kind: "bbcode",
        fieldIdentifier: "literature",
        label: "In Literature",
      },
      {
        key: "body-art",
        kind: "bbcode",
        fieldIdentifier: "art",
        label: "In Art",
      },
    ],
  },
  {
    eventKey: "sidebar-details",
    title: "Sidebar Details",
    fields: [
      {
        key: "sidebar-dateofrecording",
        kind: "text",
        fieldIdentifier: "dateofrecording",
        label: "Date of Recording",
      },
      {
        key: "sidebar-dateofsetting",
        kind: "text",
        fieldIdentifier: "dateofsetting",
        label: "Date of Setting",
      },
      {
        key: "sidebar-telling",
        kind: "dropdown",
        fieldIdentifier: "telling",
        label: "Telling",
        entityClass: ["Prose"],
      },
      {
        key: "sidebar-ethnicities",
        kind: "dropdown",
        fieldIdentifier: "ethnicities",
        label: "Related Ethnicities",
        entityClass: ["Ethnicity"],
        isMulti: true,
      },
      {
        key: "sidebar-species",
        kind: "dropdown",
        fieldIdentifier: "species",
        label: "Related Species",
        entityClass: ["Species"],
        isMulti: true,
      },
      {
        key: "sidebar-locations",
        kind: "dropdown",
        fieldIdentifier: "locations",
        label: "Related Locations",
        entityClass: ["Location", "Settlement", "Landmark"],
        isMulti: true,
      },
      {
        key: "sidebar-organisations",
        kind: "dropdown",
        fieldIdentifier: "organizations",
        label: "Related Organisations",
        entityClass: ["Organization"],
        isMulti: true,
      },
      {
        key: "sidebar-items",
        kind: "dropdown",
        fieldIdentifier: "items",
        label: "Related Items",
        entityClass: ["Item"],
        isMulti: true,
      },
      {
        key: "sidebar-vehicles",
        kind: "dropdown",
        fieldIdentifier: "vehicles",
        label: "Related Vehicles",
        entityClass: ["Vehicle"],
        isMulti: true,
      },
    ],
  },
];

export const subtitleFieldRegistry: ArticleFieldConfig<Myth>[] = [
  ...createCommonSubtitleFieldRegistry<Myth>(),
];

export const sidebarFieldRegistry: ArticleFieldConfig<Myth>[] = [
  ...createCommonSidebarFieldRegistry<Myth>(),
];

export const footerFieldRegistry: ArticleFieldConfig<Myth>[] = [
  ...createCommonFooterFieldRegistry<Myth>(),
];

export const designFieldRegistry: ArticleFieldConfig<Myth>[] = [
  ...createCommonDesignFieldRegistry<Myth>(),
];
