import { ArticleFieldConfig } from "../EditComponents/article-edit-field-renderer";
import {
  createCommonBodyFieldRegistry,
  createCommonFooterFieldRegistry,
  createCommonSidebarFieldRegistry,
  createCommonSubtitleFieldRegistry,
  createCommonDesignFieldRegistry,
} from "../EditComponents/article-edit-registry-common";
import { Profession } from "@/components/types/article-types/profession";

export type ProfessionBodySubTabConfig = {
  eventKey: string;
  title: string;
  fields: ArticleFieldConfig<Profession>[];
};

const ProfessionTypes = [
  "Administration / Management",
  "Agricultural / Fishing / Forestry",
  "Arcane",
  "Architecture",
  "Artisan",
  "Athlete",
  "Consulting",
  "Contracting",
  "Construction",
  "Culinary",
  "Domestic Work",
  "Education",
  "Engineering",
  "Entertainment",
  "Financial / Trade",
  "Forced Labour",
  "Government",
  "Healthcare",
  "Hospitality",
  "Hunting",
  "Illicit",
  "Industrial",
  "Intelligence Gathering",
  "Legal",
  "Medical",
  "Military",
  "Political",
  "Private Services",
  "Public Relations",
  "Public Services",
  "Religious",
  "Retail",
  "Research / Scientific",
  "Raw Materials Gathering",
  "Sanitation",
  "Servant",
  "Social Services",
  "Technology",
  "Transportation",
];

export const bodyFieldRegistry: ArticleFieldConfig<Profession>[] = [
  ...createCommonBodyFieldRegistry<Profession>(),
];

export const bodySubTabRegistry: ProfessionBodySubTabConfig[] = [
  {
    eventKey: "career",
    title: "Career",
    fields: [
      {
        key: "body-qualifications",
        kind: "bbcode",
        fieldIdentifier: "qualifications",
        label: "Qualifications",
      },
      {
        key: "body-structure",
        kind: "bbcode",
        fieldIdentifier: "structure",
        label: "Career Progression",
      },
      {
        key: "body-pay",
        kind: "bbcode",
        fieldIdentifier: "pay",
        label: "Payment & Reimbursement",
      },
      {
        key: "body-benefits",
        kind: "bbcode",
        fieldIdentifier: "benefits",
        label: "Other Benefits",
      },
    ],
  },
  {
    eventKey: "perception",
    title: "Perception",
    fields: [
      {
        key: "body-purpose",
        kind: "bbcode",
        fieldIdentifier: "purpose",
        label: "Purpose",
      },
      {
        key: "body-socialStatus",
        kind: "bbcode",
        fieldIdentifier: "socialStatus",
        label: "Social Status",
      },
      {
        key: "body-demographics",
        kind: "bbcode",
        fieldIdentifier: "demographics",
        label: "Demographics",
      },
      {
        key: "body-history",
        kind: "bbcode",
        fieldIdentifier: "history",
        label: "History",
      },
    ],
  },
  {
    eventKey: "operations",
    title: "Operations",
    fields: [
      {
        key: "body-tools",
        kind: "bbcode",
        fieldIdentifier: "tools",
        label: "Tools",
      },
      {
        key: "body-materials",
        kind: "bbcode",
        fieldIdentifier: "materials",
        label: "Materials",
      },
      {
        key: "body-workplace",
        kind: "bbcode",
        fieldIdentifier: "workplace",
        label: "Workplace",
      },
      {
        key: "body-services",
        kind: "bbcode",
        fieldIdentifier: "services",
        label: "Provided Services",
      },
      {
        key: "body-hazards",
        kind: "bbcode",
        fieldIdentifier: "hazards",
        label: "Dangers & Hazards",
      },
    ],
  },
  {
    eventKey: "sidebar-details",
    title: "Sidebar Details",
    fields: [
      {
        key: "sidebar-alternativeNames",
        kind: "text",
        fieldIdentifier: "alternativeNames",
        label: "Alternative Names",
      },
      {
        key: "sidebar-type",
        kind: "field-dropdown",
        fieldIdentifier: "type",
        label: "Type",
        options: ProfessionTypes,
      },
      {
        key: "sidebar-demand",
        kind: "text",
        fieldIdentifier: "demand",
        label: "Demand",
      },
      {
        key: "sidebar-legality",
        kind: "text",
        fieldIdentifier: "legality",
        label: "Legality",
      },
      {
        key: "sidebar-holders",
        kind: "dropdown",
        fieldIdentifier: "holders",
        label: "Famous in the Field",
        entityClass: ["Person"],
        isMulti: true,
      },
      {
        key: "sidebar-relatedprofessions",
        kind: "dropdown",
        fieldIdentifier: "relatedprofessions",
        label: "Other Associated Professions",
        entityClass: ["Profession"],
        isMulti: true,
      },
      {
        key: "sidebar-relatedlocations",
        kind: "dropdown",
        fieldIdentifier: "relatedlocations",
        label: "Related Locations",
        entityClass: ["Location", "Landmark", "Settlement"],
        isMulti: true,
      },
      {
        key: "sidebar-relatedorganizations",
        kind: "dropdown",
        fieldIdentifier: "relatedorganizations",
        label: "Used By",
        entityClass: ["Organization"],
        isMulti: true,
      },
      {
        key: "sidebar-relatedranks",
        kind: "dropdown",
        fieldIdentifier: "relatedranks",
        label: "Ranks & Titles",
        entityClass: ["Rank"],
        isMulti: true,
      },
      {
        key: "sidebar-relatedvehicles",
        kind: "dropdown",
        fieldIdentifier: "relatedvehicles",
        label: "Related Vehicles",
        entityClass: ["Vehicle"],
        isMulti: true,
      },
      {
        key: "sidebar-relatedtechnologies",
        kind: "dropdown",
        fieldIdentifier: "relatedtechnologies",
        label: "Related Technologies",
        entityClass: ["Technology"],
        isMulti: true,
      },
    ],
  },
];

export const subtitleFieldRegistry: ArticleFieldConfig<Profession>[] = [
  ...createCommonSubtitleFieldRegistry<Profession>(),
];

export const sidebarFieldRegistry: ArticleFieldConfig<Profession>[] = [
  ...createCommonSidebarFieldRegistry<Profession>(),
];

export const footerFieldRegistry: ArticleFieldConfig<Profession>[] = [
  ...createCommonFooterFieldRegistry<Profession>(),
];

export const designFieldRegistry: ArticleFieldConfig<Profession>[] = [
  ...createCommonDesignFieldRegistry<Profession>(),
];
