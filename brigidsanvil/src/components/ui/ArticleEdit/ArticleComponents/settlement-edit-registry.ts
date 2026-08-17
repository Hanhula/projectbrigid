import { ArticleFieldConfig } from "../EditComponents/article-edit-field-renderer";
import {
  createCommonBodyFieldRegistry,
  createCommonFooterFieldRegistry,
  createCommonSidebarFieldRegistry,
  createCommonSubtitleFieldRegistry,
  createCommonDesignFieldRegistry,
} from "../EditComponents/article-edit-registry-common";
import { Settlement } from "@/components/types/article-types/settlement";

export type SettlementBodySubTabConfig = {
  eventKey: string;
  title: string;
  fields: ArticleFieldConfig<Settlement>[];
};

export const bodyFieldRegistry: ArticleFieldConfig<Settlement>[] = [
  ...createCommonBodyFieldRegistry<Settlement>(),
];

export const bodySubTabRegistry: SettlementBodySubTabConfig[] = [
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
        key: "sidebar-location",
        kind: "dropdown",
        fieldIdentifier: "location",
        label: "Related Location",
        entityClass: ["Location", "Settlement", "Landmark"],
      },
      {
        key: "sidebar-importantLocations",
        kind: "dropdown",
        fieldIdentifier: "importantLocations",
        label: "Important Locations",
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
        key: "sidebar-ethnicities",
        kind: "dropdown",
        fieldIdentifier: "ethnicities",
        label: "Related Ethnicities",
        entityClass: ["Ethnicity"],
        isMulti: true,
      },
    ],
  },
];

export const subtitleFieldRegistry: ArticleFieldConfig<Settlement>[] = [
  ...createCommonSubtitleFieldRegistry<Settlement>(),
];

export const sidebarFieldRegistry: ArticleFieldConfig<Settlement>[] = [
  ...createCommonSidebarFieldRegistry<Settlement>(),
];

export const footerFieldRegistry: ArticleFieldConfig<Settlement>[] = [
  ...createCommonFooterFieldRegistry<Settlement>(),
];

export const designFieldRegistry: ArticleFieldConfig<Settlement>[] = [
  ...createCommonDesignFieldRegistry<Settlement>(),
];
