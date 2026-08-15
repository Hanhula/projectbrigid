import { ArticleFieldConfig } from "../EditComponents/article-edit-field-renderer";
import {
  createCommonBodyFieldRegistry,
  createCommonFooterFieldRegistry,
  createCommonSidebarFieldRegistry,
  createCommonSubtitleFieldRegistry,
  createCommonDesignFieldRegistry,
} from "../EditComponents/article-edit-registry-common";
import { Ritual } from "@/components/types/article-types/ritual";

export type RitualBodySubTabConfig = {
  eventKey: string;
  title: string;
  fields: ArticleFieldConfig<Ritual>[];
};

export const bodyFieldRegistry: ArticleFieldConfig<Ritual>[] = [
  ...createCommonBodyFieldRegistry<Ritual>(),
];

export const bodySubTabRegistry: RitualBodySubTabConfig[] = [
  {
    eventKey: "information",
    title: "Information",
    fields: [
      {
        key: "body-history",
        kind: "bbcode",
        fieldIdentifier: "history",
        label: "History",
      },
      {
        key: "body-execution",
        kind: "bbcode",
        fieldIdentifier: "execution",
        label: "Execution",
      },
      {
        key: "body-components",
        kind: "bbcode",
        fieldIdentifier: "components",
        label: "Components and Tools",
      },
      {
        key: "body-participants",
        kind: "bbcode",
        fieldIdentifier: "participants",
        label: "Participants & Key Roles",
      },
      {
        key: "body-observance",
        kind: "bbcode",
        fieldIdentifier: "observance",
        label: "Observance",
      },
    ],
  },
  {
    eventKey: "sidebar-details",
    title: "Sidebar Details",
    fields: [
      {
        key: "body-location",
        kind: "dropdown",
        fieldIdentifier: "location",
        label: "Related Location",
        entityClass: ["Location", "Settlement", "Landmark"],
      },
      {
        key: "body-importantLocations",
        kind: "dropdown",
        fieldIdentifier: "importantLocations",
        label: "Important Locations",
        entityClass: ["Location", "Settlement", "Landmark"],
        isMulti: true,
      },
      {
        key: "body-organisations",
        kind: "dropdown",
        fieldIdentifier: "organizations",
        label: "Related Organisations",
        entityClass: ["Organization"],
        isMulti: true,
      },
      {
        key: "body-ethnicities",
        kind: "dropdown",
        fieldIdentifier: "ethnicities",
        label: "Related Ethnicities",
        entityClass: ["Ethnicity"],
        isMulti: true,
      },
    ],
  },
];

export const subtitleFieldRegistry: ArticleFieldConfig<Ritual>[] = [
  ...createCommonSubtitleFieldRegistry<Ritual>(),
];

export const sidebarFieldRegistry: ArticleFieldConfig<Ritual>[] = [
  ...createCommonSidebarFieldRegistry<Ritual>(),
];

export const footerFieldRegistry: ArticleFieldConfig<Ritual>[] = [
  ...createCommonFooterFieldRegistry<Ritual>(),
];

export const designFieldRegistry: ArticleFieldConfig<Ritual>[] = [
  ...createCommonDesignFieldRegistry<Ritual>(),
];
