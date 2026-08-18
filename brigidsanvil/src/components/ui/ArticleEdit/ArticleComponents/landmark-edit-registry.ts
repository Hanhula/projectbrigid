import { LandmarkTypes } from "@/components/types/article-types/utils/LandmarkTypes";
import { ArticleFieldConfig } from "../EditComponents/article-edit-field-renderer";
import {
  createCommonBodyFieldRegistry,
  createCommonFooterFieldRegistry,
  createCommonSidebarFieldRegistry,
  createCommonSubtitleFieldRegistry,
  createCommonDesignFieldRegistry,
} from "../EditComponents/article-edit-registry-common";
import { Landmark } from "@/components/types/article-types/landmark";

export type LandmarkBodySubTabConfig = {
  eventKey: string;
  title: string;
  fields: ArticleFieldConfig<Landmark>[];
};

export const bodyFieldRegistry: ArticleFieldConfig<Landmark>[] = [
  ...createCommonBodyFieldRegistry<Landmark>(),
];

export const bodySubTabRegistry: LandmarkBodySubTabConfig[] = [
  {
    eventKey: "information",
    title: "Information",
    fields: [
      {
        key: "body-purpose",
        kind: "bbcode",
        fieldIdentifier: "purpose",
        label: "Purpose / Function",
      },
      {
        key: "body-design",
        kind: "bbcode",
        fieldIdentifier: "design",
        label: "Design",
      },
      {
        key: "body-entries",
        kind: "bbcode",
        fieldIdentifier: "entries",
        label: "Entries",
      },
      {
        key: "body-sensory",
        kind: "bbcode",
        fieldIdentifier: "sensory",
        label: "Sensory & Appearance",
      },
      {
        key: "body-denizens",
        kind: "bbcode",
        fieldIdentifier: "denizens",
        label: "Denizens",
      },
      {
        key: "body-contents",
        kind: "bbcode",
        fieldIdentifier: "contents",
        label: "Contents & Furnishings",
      },
      {
        key: "body-valuables",
        kind: "bbcode",
        fieldIdentifier: "valuables",
        label: "Valuables",
      },
      {
        key: "body-hazards",
        kind: "bbcode",
        fieldIdentifier: "hazards",
        label: "Hazards & Traps",
      },
    ],
  },
  {
    eventKey: "properties",
    title: "Properties",
    fields: [
      {
        key: "body-alterations",
        kind: "bbcode",
        fieldIdentifier: "alterations",
        label: "Alterations",
      },
      {
        key: "body-architecture",
        kind: "bbcode",
        fieldIdentifier: "architecture",
        label: "Architecture",
      },
      {
        key: "body-defences",
        kind: "bbcode",
        fieldIdentifier: "defences",
        label: "Defences",
      },
      {
        key: "body-history",
        kind: "bbcode",
        fieldIdentifier: "history",
        label: "History",
      },
      {
        key: "body-tourism",
        kind: "bbcode",
        fieldIdentifier: "tourism",
        label: "Tourism",
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
        key: "sidebar-constructed",
        kind: "text",
        fieldIdentifier: "constructed",
        label: "Date of Construction",
      },
      {
        key: "sidebar-ruined",
        kind: "text",
        fieldIdentifier: "ruined",
        label: "Date of Ruin",
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
        options: LandmarkTypes.map(({ id, title }) => ({
          value: id,
          label: title,
        })),
        valueAsReference: true,
      },
      {
        key: "sidebar-parent",
        kind: "dropdown",
        fieldIdentifier: "parent",
        label: "Parent Location",
        entityClass: ["Location", "Settlement", "Landmark"],
      },
      {
        key: "sidebar-effects",
        kind: "bbcode",
        fieldIdentifier: "effects",
        label: "Environmental Effects",
      },
      {
        key: "sidebar-connected-rooms",
        kind: "dropdown",
        fieldIdentifier: "connectedRooms",
        label: "Connected Rooms",
        entityClass: ["Location", "Settlement", "Landmark"],
      },
      {
        key: "sidebar-person",
        kind: "dropdown",
        fieldIdentifier: "person",
        label: "Ruler / Owner",
        entityClass: ["Person"],
      },
      {
        key: "sidebar-additionalRulers",
        kind: "dropdown",
        fieldIdentifier: "additionalRulers",
        label: "Additional Rulers / Owners",
        entityClass: ["Person"],
        isMulti: true,
      },
      {
        key: "sidebar-rank",
        kind: "dropdown",
        fieldIdentifier: "rank",
        label: "Ruling/Owning Rank",
        entityClass: ["Rank"],
      },
      {
        key: "sidebar-vehicle",
        kind: "dropdown",
        fieldIdentifier: "vehicle",
        label: "Compartment of Vehicle",
        entityClass: ["Vehicle"],
      },
      {
        key: "sidebar-organization",
        kind: "dropdown",
        fieldIdentifier: "organization",
        label: "Owning Organisation",
        entityClass: ["Organization"],
      },
      {
        key: "sidebar-contenders",
        kind: "dropdown",
        fieldIdentifier: "contenders",
        label: "Organisations Contesting Ownership of the Landmark",
        entityClass: ["Organization"],
      },
    ],
  },
];

export const subtitleFieldRegistry: ArticleFieldConfig<Landmark>[] = [
  ...createCommonSubtitleFieldRegistry<Landmark>(),
];

export const sidebarFieldRegistry: ArticleFieldConfig<Landmark>[] = [
  ...createCommonSidebarFieldRegistry<Landmark>(),
];

export const footerFieldRegistry: ArticleFieldConfig<Landmark>[] = [
  ...createCommonFooterFieldRegistry<Landmark>(),
];

export const designFieldRegistry: ArticleFieldConfig<Landmark>[] = [
  ...createCommonDesignFieldRegistry<Landmark>(),
];
