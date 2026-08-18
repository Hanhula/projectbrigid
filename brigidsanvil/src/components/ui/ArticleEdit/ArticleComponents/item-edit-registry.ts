import { Item } from "@/components/types/article-types/item";
import { ArticleFieldConfig } from "../EditComponents/article-edit-field-renderer";
import {
  createCommonBodyFieldRegistry,
  createCommonFooterFieldRegistry,
  createCommonSidebarFieldRegistry,
  createCommonSubtitleFieldRegistry,
  createCommonDesignFieldRegistry,
} from "../EditComponents/article-edit-registry-common";
import { ItemTypes } from "@/components/types/article-types/utils/ItemTypes";

export type ItemBodySubTabConfig = {
  eventKey: string;
  title: string;
  fields: ArticleFieldConfig<Item>[];
};

export const bodyFieldRegistry: ArticleFieldConfig<Item>[] = [
  ...createCommonBodyFieldRegistry<Item>(),
];

export const bodySubTabRegistry: ItemBodySubTabConfig[] = [
  {
    eventKey: "generic",
    title: "Generic",
    fields: [
      {
        key: "body-mechanics",
        kind: "bbcode",
        fieldIdentifier: "mechanics",
        label: "Mechanics & Inner Workings",
      },
      {
        key: "body-manufacturingProcess",
        kind: "bbcode",
        fieldIdentifier: "manufacturingProcess",
        label: "Manufacturing Process",
      },
      {
        key: "body-history",
        kind: "bbcode",
        fieldIdentifier: "history",
        label: "History",
      },
      {
        key: "body-significance",
        kind: "bbcode",
        fieldIdentifier: "significance",
        label: "Significance",
      },
    ],
  },
  {
    eventKey: "sidebar-connections",
    title: "Sidebar - Connections",
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
        key: "sidebar-type",
        kind: "field-dropdown",
        fieldIdentifier: "type",
        label: "Type",
        options: ItemTypes.map(({ id, title }) => ({
          value: id,
          label: title,
        })),
        valueAsReference: true,
      },
      {
        key: "sidebar-creation-date",
        kind: "text",
        fieldIdentifier: "itemCreationDate",
        label: "Creation Date",
      },
      {
        key: "sidebar-destruction-date",
        kind: "text",
        fieldIdentifier: "itemDestructionDate",
        label: "Destruction Date",
      },
      {
        key: "sidebar-location",
        kind: "dropdown",
        fieldIdentifier: "currentLocation",
        label: "Current Location",
        entityClass: ["Location"],
      },
      {
        key: "sidebar-holder",
        kind: "dropdown",
        fieldIdentifier: "currentHolder",
        label: "Current Holder",
        entityClass: ["Person"],
      },
      {
        key: "sidebar-subtype",
        kind: "dropdown",
        fieldIdentifier: "parent",
        label: "Modelled After / Subtype Of",
        entityClass: ["Item"],
      },
      {
        key: "sidebar-manufacturer",
        kind: "dropdown",
        fieldIdentifier: "manufacturer",
        label: "Manufacturer",
        entityClass: ["Organization"],
      },
      {
        key: "sidebar-creator",
        kind: "dropdown",
        fieldIdentifier: "creator",
        label: "Creator",
        entityClass: ["Person"],
      },
      {
        key: "sidebar-organization",
        kind: "dropdown",
        fieldIdentifier: "organization",
        label: "Owning Organisation",
        entityClass: ["Organization"],
      },
      {
        key: "sidebar-technologies",
        kind: "dropdown",
        fieldIdentifier: "technologies",
        label: "Related Technologies",
        entityClass: ["Technology"],
        isMulti: true,
      },
      {
        key: "sidebar-condition",
        kind: "dropdown",
        fieldIdentifier: "condition",
        label: "Related Condition",
        entityClass: ["Condition"],
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
  {
    eventKey: "sidebar-properties",
    title: "Sidebar - Properties",
    fields: [
      {
        key: "sidebar-rarity",
        kind: "text",
        fieldIdentifier: "rarity",
        label: "Rarity",
      },
      {
        key: "sidebar-weight",
        kind: "text",
        fieldIdentifier: "weight",
        label: "Weight",
      },
      {
        key: "sidebar-dimensions",
        kind: "text",
        fieldIdentifier: "dimensions",
        label: "Dimensions",
      },
      {
        key: "sidebar-price",
        kind: "text",
        fieldIdentifier: "price",
        label: "Price",
      },
      {
        key: "sidebar-rawMaterials",
        kind: "text",
        fieldIdentifier: "rawMaterials",
        label: "Raw Materials",
      },
      {
        key: "sidebar-tooling",
        kind: "text",
        fieldIdentifier: "tooling",
        label: "Tooling",
      },
    ],
  },
];

export const subtitleFieldRegistry: ArticleFieldConfig<Item>[] = [
  ...createCommonSubtitleFieldRegistry<Item>(),
];

export const sidebarFieldRegistry: ArticleFieldConfig<Item>[] = [
  ...createCommonSidebarFieldRegistry<Item>(),
];

export const footerFieldRegistry: ArticleFieldConfig<Item>[] = [
  ...createCommonFooterFieldRegistry<Item>(),
];

export const designFieldRegistry: ArticleFieldConfig<Item>[] = [
  ...createCommonDesignFieldRegistry<Item>(),
];
