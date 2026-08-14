import { Material } from "@/components/types/article-types/material";
import { ArticleFieldConfig } from "./article-edit-field-renderer";
import {
  createCommonArticleMetaFieldRegistry,
  createCommonBodyFieldRegistry,
  createCommonFooterFieldRegistry,
  createCommonSidebarFieldRegistry,
} from "./article-edit-registry-common";

export type MaterialBodySubTabConfig = {
  eventKey: string;
  title: string;
  fields: ArticleFieldConfig<Material>[];
};

export const bodyFieldRegistry: ArticleFieldConfig<Material>[] =
  createCommonBodyFieldRegistry<Material>();

export const bodySubTabRegistry: MaterialBodySubTabConfig[] = [
  {
    eventKey: "properties",
    title: "Properties",
    fields: [
      {
        key: "body-characteristics",
        kind: "bbcode",
        fieldIdentifier: "characteristics",
        label: "Characteristics",
      },
      {
        key: "body-properties",
        kind: "bbcode",
        fieldIdentifier: "properties",
        label: "Physical & Chemical Properties",
      },
      {
        key: "body-compounds",
        kind: "bbcode",
        fieldIdentifier: "compounds",
        label: "Compounds",
      },
      {
        key: "body-geo",
        kind: "bbcode",
        fieldIdentifier: "geo",
        label: "Geology & Geography",
      },
      {
        key: "body-origin",
        kind: "bbcode",
        fieldIdentifier: "origin",
        label: "Origin & Sources",
      },
      {
        key: "body-halflife",
        kind: "bbcode",
        fieldIdentifier: "halflife",
        label: "Life & Expiration",
      },
    ],
  },
  {
    eventKey: "history",
    title: "History & Usage",
    fields: [
      {
        key: "body-history",
        kind: "bbcode",
        fieldIdentifier: "history",
        label: "History",
      },
      {
        key: "body-discovery",
        kind: "bbcode",
        fieldIdentifier: "discovery",
        label: "Discovery",
      },
      {
        key: "body-useCommon",
        kind: "bbcode",
        fieldIdentifier: "useCommon",
        label: "Everyday Use",
      },
      {
        key: "body-useCultural",
        kind: "bbcode",
        fieldIdentifier: "useCultural",
        label: "Cultural Significance & Use",
      },
      {
        key: "body-useIndustrial",
        kind: "bbcode",
        fieldIdentifier: "useIndustrial",
        label: "Industrial Use",
      },
      {
        key: "body-refinement",
        kind: "bbcode",
        fieldIdentifier: "refinement",
        label: "Refinement",
      },
      {
        key: "body-manufacturing",
        kind: "bbcode",
        fieldIdentifier: "manufacturing",
        label: "Manufacturing & Products",
      },
      {
        key: "body-products",
        kind: "bbcode",
        fieldIdentifier: "products",
        label: "Byproducts & Sideproducts",
      },
      {
        key: "body-hazards",
        kind: "bbcode",
        fieldIdentifier: "hazards",
        label: "Hazards",
      },
      {
        key: "body-environment",
        kind: "bbcode",
        fieldIdentifier: "environment",
        label: "Environmental Impact",
      },
      {
        key: "body-reusability",
        kind: "bbcode",
        fieldIdentifier: "reusability",
        label: "Reusability & Recycling",
      },
    ],
  },
  {
    eventKey: "distribution",
    title: "Distribution",
    fields: [
      {
        key: "body-useCommon",
        kind: "bbcode",
        fieldIdentifier: "useCommon",
        label: "Common Use",
      },
      {
        key: "body-useCultural",
        kind: "bbcode",
        fieldIdentifier: "useCultural",
        label: "Cultural Use",
      },
      {
        key: "body-useIndustrial",
        kind: "bbcode",
        fieldIdentifier: "useIndustrial",
        label: "Industrial Use",
      },
      {
        key: "body-refinement",
        kind: "bbcode",
        fieldIdentifier: "refinement",
        label: "Refinement",
      },
      {
        key: "body-products",
        kind: "bbcode",
        fieldIdentifier: "products",
        label: "Byproducts & Sideproducts",
      },
      {
        key: "body-manufacturing",
        kind: "bbcode",
        fieldIdentifier: "manufacturing",
        label: "Manufacturing",
      },
      {
        key: "body-hazards",
        kind: "bbcode",
        fieldIdentifier: "hazards",
        label: "Hazards",
      },
      {
        key: "body-environment",
        kind: "bbcode",
        fieldIdentifier: "environment",
        label: "Environmental Impact",
      },
      {
        key: "body-reusability",
        kind: "bbcode",
        fieldIdentifier: "reusability",
        label: "Reusability & Recycling",
      },
      {
        key: "body-market",
        kind: "bbcode",
        fieldIdentifier: "market",
        label: "Trade & Market",
      },
      {
        key: "body-storage",
        kind: "bbcode",
        fieldIdentifier: "storage",
        label: "Storage",
      },
      {
        key: "body-regulation",
        kind: "bbcode",
        fieldIdentifier: "regulation",
        label: "Law & Regulation",
      },
    ],
  },
  {
    eventKey: "sidebar-properties",
    title: "Sidebar Properties",
    fields: [
      {
        key: "sidebar-elementNumber",
        kind: "text",
        fieldIdentifier: "elementNumber",
        label: "Element Number",
      },
      {
        key: "sidebar-elementAbbreviation",
        kind: "text",
        fieldIdentifier: "elementAbbreviation",
        label: "Element Abbreviation",
      },
      {
        key: "sidebar-elementWeight",
        kind: "text",
        fieldIdentifier: "elementWeight",
        label: "Element Weight",
      },
      {
        key: "sidebar-type",
        kind: "text",
        fieldIdentifier: "type",
        label: "Type",
      },
      {
        key: "sidebar-value",
        kind: "text",
        fieldIdentifier: "value",
        label: "Value",
      },
      {
        key: "sidebar-rarity",
        kind: "text",
        fieldIdentifier: "rarity",
        label: "Rarity",
      },
      {
        key: "sidebar-odor",
        kind: "text",
        fieldIdentifier: "odor",
        label: "Odour",
      },
      {
        key: "sidebar-taste",
        kind: "text",
        fieldIdentifier: "taste",
        label: "Taste",
      },
      {
        key: "sidebar-colour",
        kind: "text",
        fieldIdentifier: "colour",
        label: "Colour",
      },
      {
        key: "sidebar-meltingpoint",
        kind: "text",
        fieldIdentifier: "meltingpoint",
        label: "Melting Point",
      },
      {
        key: "sidebar-freezingpoint",
        kind: "text",
        fieldIdentifier: "freezingpoint",
        label: "Freezing Point",
      },
      {
        key: "sidebar-density",
        kind: "text",
        fieldIdentifier: "density",
        label: "Density",
      },
      {
        key: "sidebar-commonState",
        kind: "text",
        fieldIdentifier: "commonState",
        label: "Common State",
      },
      {
        key: "sidebar-relatedLocations",
        kind: "dropdown",
        fieldIdentifier: "locations",
        label: "Related Locations",
        entityClass: ["Location", "Landmark", "Settlement"],
        isMulti: true,
      },
      {
        key: "sidebar-relatedSpecies",
        kind: "dropdown",
        fieldIdentifier: "species",
        label: "Related Species",
        entityClass: ["Species"],
        isMulti: true,
      },
      {
        key: "sidebar-relatedItems",
        kind: "dropdown",
        fieldIdentifier: "items",
        label: "Related Items",
        entityClass: ["Item"],
        isMulti: true,
      },
      {
        key: "sidebar-relatedTechnologies",
        kind: "dropdown",
        fieldIdentifier: "technologies",
        label: "Related Technologies",
        entityClass: ["Technology"],
        isMulti: true,
      },
      {
        key: "sidebar-relatedProfessions",
        kind: "dropdown",
        fieldIdentifier: "professions",
        label: "Related Professions",
        entityClass: ["Profession"],
        isMulti: true,
      },
    ],
  },
];

export const subtitleFieldRegistry: ArticleFieldConfig<Material>[] = [
  ...createCommonArticleMetaFieldRegistry<Material>(),
];

export const sidebarFieldRegistry: ArticleFieldConfig<Material>[] = [
  ...createCommonSidebarFieldRegistry<Material>(),
];

export const footerFieldRegistry: ArticleFieldConfig<Material>[] = [
  ...createCommonFooterFieldRegistry<Material>(),
];
