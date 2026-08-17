import { SettlementTypes } from "@/components/types/article-types/utils/SettlementTypes";
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
        key: "body-demographics",
        kind: "bbcode",
        fieldIdentifier: "demographics",
        label: "Demographics",
      },
      {
        key: "body-government",
        kind: "bbcode",
        fieldIdentifier: "government",
        label: "Government",
      },
      {
        key: "body-defences",
        kind: "bbcode",
        fieldIdentifier: "defences",
        label: "Defences",
      },
      {
        key: "body-industry",
        kind: "bbcode",
        fieldIdentifier: "industry",
        label: "Industry & Trade",
      },
      {
        key: "body-infrastructure",
        kind: "bbcode",
        fieldIdentifier: "infrastructure",
        label: "Infrastructure",
      },
      {
        key: "body-district",
        kind: "bbcode",
        fieldIdentifier: "district",
        label: "Districts",
      },
      {
        key: "body-assets",
        kind: "bbcode",
        fieldIdentifier: "assets",
        label: "Assets",
      },
      {
        key: "body-guilds",
        kind: "bbcode",
        fieldIdentifier: "guilds",
        label: "Guilds and Factions",
      },
      {
        key: "body-history",
        kind: "bbcode",
        fieldIdentifier: "history",
        label: "History",
      },
      {
        key: "body-pointOfInterest",
        kind: "bbcode",
        fieldIdentifier: "pointOfInterest",
        label: "Points of Interest",
      },
      {
        key: "body-tourism",
        kind: "bbcode",
        fieldIdentifier: "tourism",
        label: "Tourism",
      },
      {
        key: "body-architecture",
        kind: "bbcode",
        fieldIdentifier: "architecture",
        label: "Architecture",
      },
      {
        key: "body-geography",
        kind: "bbcode",
        fieldIdentifier: "geography",
        label: "Geography",
      },
      {
        key: "body-climate",
        kind: "bbcode",
        fieldIdentifier: "climate",
        label: "Climate",
      },
      {
        key: "body-naturalresources",
        kind: "bbcode",
        fieldIdentifier: "naturalresources",
        label: "Natural Resources",
      },
    ],
  },
  {
    eventKey: "sidebar-details",
    title: "Sidebar Details",
    fields: [
      {
        key: "sidebar-portrait",
        kind: "numerical",
        fieldIdentifier: "portrait",
        label: "Portrait",
        valueAsReference: true,
        helpText: "Enter the numeric ID, like 7929092",
      },
      {
        key: "sidebar-ruined",
        kind: "text",
        fieldIdentifier: "ruined",
        label: "Date of Ruin (if any)",
      },
      {
        key: "sidebar-constructed",
        kind: "text",
        fieldIdentifier: "constructed",
        label: "Founding Date",
      },
      {
        key: "sidebar-founders",
        kind: "dropdown",
        fieldIdentifier: "founders",
        label: "Founders",
        entityClass: ["Person"],
      },
      {
        key: "sidebar-alternativename",
        kind: "text",
        fieldIdentifier: "alternativename",
        label: "Alternative Name",
      },
      {
        key: "sidebar-type",
        kind: "field-dropdown",
        fieldIdentifier: "type",
        label: "Type",
        options: SettlementTypes.map(({ id, title }) => ({
          value: id,
          label: title,
        })),
        valueAsReference: true,
      },
      {
        key: "sidebar-population",
        kind: "text",
        fieldIdentifier: "population",
        label: "Population",
      },
      {
        key: "sidebar-demonym",
        kind: "text",
        fieldIdentifier: "demonym",
        label: "Demonym",
      },
      {
        key: "sidebar-parent",
        kind: "dropdown",
        fieldIdentifier: "parent",
        label: "Location under",
        entityClass: ["Location", "Settlement", "Landmark"],
      },
      {
        key: "sidebar-person",
        kind: "dropdown",
        fieldIdentifier: "person",
        label: "Owner / Ruler",
        entityClass: ["Person"],
      },
      {
        key: "sidebar-additionalRulers",
        kind: "dropdown",
        fieldIdentifier: "additionalRulers",
        label: "Additional Owners / Rulers",
        entityClass: ["Person"],
      },
      {
        key: "sidebar-rank",
        kind: "dropdown",
        fieldIdentifier: "rank",
        label: "Ruling / Owning Rank",
        entityClass: ["Rank"],
      },
      {
        key: "sidebar-organization",
        kind: "dropdown",
        fieldIdentifier: "organization",
        label: "Owning Organisation",
        entityClass: ["Organization"],
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
