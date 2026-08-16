import { ArticleFieldConfig } from "../EditComponents/article-edit-field-renderer";
import {
  createCommonBodyFieldRegistry,
  createCommonFooterFieldRegistry,
  createCommonSidebarFieldRegistry,
  createCommonSubtitleFieldRegistry,
  createCommonDesignFieldRegistry,
} from "../EditComponents/article-edit-registry-common";
import { Rank } from "@/components/types/article-types/rank";

export type RankBodySubTabConfig = {
  eventKey: string;
  title: string;
  fields: ArticleFieldConfig<Rank>[];
};

const rankTypes = [
  "Academic, Honorific",
  "Academic, Professional",
  "Academic, Qualification",
  "Civic, Citizenship",
  "Civic, Diplomatic",
  "Civic, Honorific",
  "Civic, Law ", // WA has this typo...
  "Civic, Political",
  "Civic, Military, Generic",
  "Civic, Military, Commissioned",
  "Civic, Military, Not Commissioned",
  "Civic, Professional",
  "Familial",
  "Informal",
  "Magical, Honorific",
  "Magical, Professional",
  "Medical",
  "Nobility, Hereditary",
  "Nobility, Honorific / Ceremonial",
  "Nobility, Household",
  "Nobility, Military",
  "Nobility, Non-hereditary",
  "Professional",
  "Religious, Beatified",
  "Religious, Clerical",
  "Religious, Military",
  "Religious, Special",
  "Religious, Political",
  "Royalty, Hereditary",
  "Royalty, Honorific / Ceremonial",
  "Royalty, Household",
  "Royalty, Military",
  "Royalty, Non-hereditary",
  "Self proclaimed",
  "Scientific, Honorific",
  "Scientific, Professional",
];

export const bodyFieldRegistry: ArticleFieldConfig<Rank>[] = [
  ...createCommonBodyFieldRegistry<Rank>(),
];

export const bodySubTabRegistry: RankBodySubTabConfig[] = [
  {
    eventKey: "information",
    title: "Information",
    fields: [
      {
        key: "body-qualifications",
        kind: "bbcode",
        fieldIdentifier: "qualifications",
        label: "Qualifications",
      },
      {
        key: "body-requirements",
        kind: "bbcode",
        fieldIdentifier: "requirements",
        label: "Requirements",
      },
      {
        key: "body-appointment",
        kind: "bbcode",
        fieldIdentifier: "appointment",
        label: "Appointment",
      },
      {
        key: "body-duties",
        kind: "bbcode",
        fieldIdentifier: "duties",
        label: "Duties",
      },
      {
        key: "body-responsibilities",
        kind: "bbcode",
        fieldIdentifier: "responsibilities",
        label: "Responsibilities",
      },
      {
        key: "body-benefits",
        kind: "bbcode",
        fieldIdentifier: "benefits",
        label: "Benefits",
      },
      {
        key: "body-equipment",
        kind: "bbcode",
        fieldIdentifier: "equipment",
        label: "Accoutrements & Equipment",
      },
      {
        key: "body-removal",
        kind: "bbcode",
        fieldIdentifier: "removal",
        label: "Grounds for Removal or Dismissal",
      },
      {
        key: "body-history",
        kind: "bbcode",
        fieldIdentifier: "history",
        label: "History",
      },
      {
        key: "body-culturalSignificance",
        kind: "bbcode",
        fieldIdentifier: "culturalSignificance",
        label: "Cultural Significance",
      },
      {
        key: "body-notableHolders",
        kind: "bbcode",
        fieldIdentifier: "notableHolders",
        label: "Notable Holders",
      },
    ],
  },
  {
    eventKey: "sidebar-details",
    title: "Sidebar Details",
    fields: [
      {
        key: "sidebar-type",
        kind: "field-dropdown",
        fieldIdentifier: "type",
        label: "Type",
        options: rankTypes.map((type) => ({ label: type, value: type })),
      },
      {
        key: "sidebar-rankStatus",
        kind: "text",
        fieldIdentifier: "rankStatus",
        label: "Status",
      },
      {
        key: "sidebar-rankCreation",
        kind: "text",
        fieldIdentifier: "rankCreation",
        label: "Creation",
      },
      {
        key: "sidebar-formofaddress",
        kind: "text",
        fieldIdentifier: "formofaddress",
        label: "Form of Address",
      },
      {
        key: "sidebar-alternativeTitle",
        kind: "text",
        fieldIdentifier: "alternativeTitle",
        label: "Alternative Naming",
      },
      {
        key: "sidebar-equatesTo",
        kind: "text",
        fieldIdentifier: "equatesTo",
        label: "Equates To",
      },
      {
        key: "sidebar-authoritySource",
        kind: "bbcode",
        fieldIdentifier: "authoritySource",
        label: "Source of Authority",
      },
      {
        key: "sidebar-lengthOfTerm",
        kind: "text",
        fieldIdentifier: "lengthOfTerm",
        label: "Length of Term",
      },
      {
        key: "sidebar-firstholder",
        kind: "dropdown",
        fieldIdentifier: "firstholder",
        label: "First Holder",
        entityClass: ["Person"],
      },
      {
        key: "sidebar-currentHolders",
        kind: "dropdown",
        fieldIdentifier: "currentHolders",
        label: "Current Holders",
        entityClass: ["Person"],
        isMulti: true,
      },
      {
        key: "sidebar-pastHolders",
        kind: "dropdown",
        fieldIdentifier: "pastHolders",
        label: "Past Holders",
        entityClass: ["Person"],
        isMulti: true,
      },
      {
        key: "sidebar-parent",
        kind: "dropdown",
        fieldIdentifier: "parent",
        label: "Reports Directly To",
        entityClass: ["Rank"],
      },
      {
        key: "sidebar-relatedlocations",
        kind: "dropdown",
        fieldIdentifier: "relatedlocations",
        label: "Related Locations",
        entityClass: ["Location", "Settlement", "Landmark"],
        isMulti: true,
      },
      {
        key: "sidebar-relatedorganizations",
        kind: "dropdown",
        fieldIdentifier: "relatedorganizations",
        label: "Related Organisations",
        entityClass: ["Organization"],
        isMulti: true,
      },
      {
        key: "sidebar-weight",
        kind: "text",
        fieldIdentifier: "weight",
        label: "Comparative Weight",
        helpText:
          "Use this to order this rank compared to others in an organisation's list of ranks/titles. The heigher the number, the higher in the chain of command the rank is (e.g. Admiral 1000, Seaman 1) ",
      },
    ],
  },
];

export const subtitleFieldRegistry: ArticleFieldConfig<Rank>[] = [
  ...createCommonSubtitleFieldRegistry<Rank>(),
];

export const sidebarFieldRegistry: ArticleFieldConfig<Rank>[] = [
  ...createCommonSidebarFieldRegistry<Rank>(),
];

export const footerFieldRegistry: ArticleFieldConfig<Rank>[] = [
  ...createCommonFooterFieldRegistry<Rank>(),
];

export const designFieldRegistry: ArticleFieldConfig<Rank>[] = [
  ...createCommonDesignFieldRegistry<Rank>(),
];
