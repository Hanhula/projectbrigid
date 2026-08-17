import { LocationTypes } from "@/components/types/article-types/utils/LocationTypes";
import { ArticleFieldConfig } from "../EditComponents/article-edit-field-renderer";
import {
  createCommonBodyFieldRegistry,
  createCommonFooterFieldRegistry,
  createCommonSidebarFieldRegistry,
  createCommonSubtitleFieldRegistry,
  createCommonDesignFieldRegistry,
} from "../EditComponents/article-edit-registry-common";
import { Location } from "@/components/types/article-types/location";

export type LocationBodySubTabConfig = {
  eventKey: string;
  title: string;
  fields: ArticleFieldConfig<Location>[];
};

export const bodyFieldRegistry: ArticleFieldConfig<Location>[] = [
  ...createCommonBodyFieldRegistry<Location>(),
];

export const bodySubTabRegistry: LocationBodySubTabConfig[] = [
  {
    eventKey: "information",
    title: "Information",
    fields: [
      {
        key: "body-geography",
        kind: "bbcode",
        fieldIdentifier: "geography",
        label: "Geography",
      },
      {
        key: "body-ecosystem",
        kind: "bbcode",
        fieldIdentifier: "ecosystem",
        label: "Ecosystem",
      },
      {
        key: "body-ecosystem-cycles",
        kind: "bbcode",
        fieldIdentifier: "ecosystemCycles",
        label: "Ecosystem Cycles",
      },
      {
        key: "body-localised-phenomena",
        kind: "bbcode",
        fieldIdentifier: "localizedPhenomena",
        label: "Localised Phenomena",
      },
      {
        key: "body-climate",
        kind: "bbcode",
        fieldIdentifier: "climate",
        label: "Climate",
      },
      {
        key: "body-florafauna",
        kind: "bbcode",
        fieldIdentifier: "florafauna",
        label: "Flora & Fauna",
      },
      {
        key: "body-naturalresources",
        kind: "bbcode",
        fieldIdentifier: "naturalresources",
        label: "Natural Resources",
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
        key: "sidebar-alternativename",
        kind: "text",
        fieldIdentifier: "alternativename",
        label: "Alternative Name(s)",
      },
      {
        key: "sidebar-type",
        kind: "field-dropdown",
        fieldIdentifier: "type",
        label: "Type",
        options: LocationTypes.map(({ id, title }) => ({
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
        key: "sidebar-person",
        kind: "dropdown",
        fieldIdentifier: "person",
        label: "Ruler / Owner",
        entityClass: ["Person"],
      },
      {
        key: "sidebar-additional-rulers",
        kind: "dropdown",
        fieldIdentifier: "additionalRulers",
        label: "Additional Rulers",
        entityClass: ["Person"],
        isMulti: true,
      },
      {
        key: "sidebar-rank",
        kind: "dropdown",
        fieldIdentifier: "rank",
        label: "Owning Rank",
        entityClass: ["Rank"],
      },
      {
        key: "sidebar-organisation",
        kind: "dropdown",
        fieldIdentifier: "organization",
        label: "Owning Organisation",
        entityClass: ["Organization"],
      },
      {
        key: "sidebar-contenders",
        kind: "dropdown",
        fieldIdentifier: "contenders",
        label: "Organisations Contesting Ownership of the Location",
        entityClass: ["Organization"],
        isMulti: true,
      },
    ],
  },
];

export const subtitleFieldRegistry: ArticleFieldConfig<Location>[] = [
  ...createCommonSubtitleFieldRegistry<Location>(),
];

export const sidebarFieldRegistry: ArticleFieldConfig<Location>[] = [
  ...createCommonSidebarFieldRegistry<Location>(),
];

export const footerFieldRegistry: ArticleFieldConfig<Location>[] = [
  ...createCommonFooterFieldRegistry<Location>(),
];

export const designFieldRegistry: ArticleFieldConfig<Location>[] = [
  ...createCommonDesignFieldRegistry<Location>(),
];
