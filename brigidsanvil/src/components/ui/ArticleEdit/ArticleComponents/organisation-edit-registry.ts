import { OrganisationTypes } from "@/components/types/article-types/utils/OrganisationTypes";
import { ArticleFieldConfig } from "../EditComponents/article-edit-field-renderer";
import {
  createCommonBodyFieldRegistry,
  createCommonFooterFieldRegistry,
  createCommonSidebarFieldRegistry,
  createCommonSubtitleFieldRegistry,
  createCommonDesignFieldRegistry,
} from "../EditComponents/article-edit-registry-common";
import { Organisation } from "@/components/types/article-types/organisation";

export type OrganisationBodySubTabConfig = {
  eventKey: string;
  title: string;
  fields: ArticleFieldConfig<Organisation>[];
};

const governmentSystems = [
  "Anarchy",
  "Banana Republic",
  "Corporatocracy",
  "Democracy, Direct",
  "Democracy, Parliamentary",
  "Democracy, Presidential",
  "Democracy, Representative",
  "Despotism",
  "Diarchy",
  "Dictatorship",
  "Electocracy",
  "Gerontocracy",
  "Hive-mind",
  "Kakistocracy",
  "Kratocracy",
  "Kritarchy",
  "Machine government",
  "Magocracy",
  "Meritocracy",
  "Monarchy, Absolute",
  "Monarchy, Constitutional",
  "Monarchy, Crowned Republic",
  "Monarchy, Elective",
  "Monarchy, Theocratic",
  "Ochlocracy",
  "Oligarchy",
  "Plutocracy",
  "Sortition",
  "Stratocracy",
  "Technocracy",
  "Thanatocracy / Necrocracy",
  "Theocracy",
  "Timocracy",
  "Tribalism",
];

const powerStructures = [
  "Autonomous area",
  "Client state / puppet state",
  "Confederation",
  "Dependent territory",
  "Federation",
  "Feudal state",
  "Provisional government",
  "Semi-autonomous area",
  "Thalassocracy",
  "Transnational government",
  "Unitary state",
];

const economicSystems = [
  "Barter system",
  "Command/Planned economy",
  "Gift economy",
  "Market economy",
  "Mixed economy",
  "Palace economy",
  "Post-scarcity economy",
  "Traditional",
];

const trainingLevels = [
  "Elite",
  "Professional",
  "Semi-professional",
  "Trained",
  "Semi-trained",
  "Levy",
  "Untrained",
];

const veterancyLevels = [
  "Decorated/Honored",
  "Veteran",
  "Experienced",
  "Trained",
  "Recruit",
];

export const bodyFieldRegistry: ArticleFieldConfig<Organisation>[] = [
  ...createCommonBodyFieldRegistry<Organisation>(),
];

export const bodySubTabRegistry: OrganisationBodySubTabConfig[] = [
  {
    eventKey: "information",
    title: "Information",
    fields: [
      {
        key: "body-structure",
        kind: "bbcode",
        fieldIdentifier: "structure",
        label: "Structure",
      },
      {
        key: "body-culture",
        kind: "bbcode",
        fieldIdentifier: "culture",
        label: "Culture",
      },
      {
        key: "body-publicAgenda",
        kind: "bbcode",
        fieldIdentifier: "publicAgenda",
        label: "Public Agenda",
      },
      {
        key: "body-assets",
        kind: "bbcode",
        fieldIdentifier: "assets",
        label: "Assets",
      },
      {
        key: "body-history",
        kind: "bbcode",
        fieldIdentifier: "history",
        label: "History",
      },
      {
        key: "body-disbandment",
        kind: "bbcode",
        fieldIdentifier: "disbandment",
        label: "Disbandment",
      },
    ],
  },
  {
    eventKey: "geopolitical",
    title: "Geopolitical",
    fields: [
      {
        key: "body-demographics",
        kind: "bbcode",
        fieldIdentifier: "demographics",
        label: "Demography and Population",
      },
      {
        key: "body-territory",
        kind: "bbcode",
        fieldIdentifier: "territory",
        label: "Territories",
      },
      {
        key: "body-military",
        kind: "bbcode",
        fieldIdentifier: "military",
        label: "Military",
      },
      {
        key: "body-technology",
        kind: "bbcode",
        fieldIdentifier: "technology",
        label: "Technological Level",
      },
      {
        key: "body-religion",
        kind: "bbcode",
        fieldIdentifier: "religion",
        label: "Religion",
      },
      {
        key: "body-foreignrelations",
        kind: "bbcode",
        fieldIdentifier: "foreignrelations",
        label: "Foreign Relations",
      },
      {
        key: "body-laws",
        kind: "bbcode",
        fieldIdentifier: "laws",
        label: "Laws",
      },
      {
        key: "body-agricultureAndIndustry",
        kind: "bbcode",
        fieldIdentifier: "agricultureAndIndustry",
        label: "Agriculture and Industry",
      },
      {
        key: "body-tradeAndTransport",
        kind: "bbcode",
        fieldIdentifier: "tradeAndTransport",
        label: "Trade and Transport",
      },
      {
        key: "body-education",
        kind: "bbcode",
        fieldIdentifier: "education",
        label: "Education",
      },
      {
        key: "body-infrastructure",
        kind: "bbcode",
        fieldIdentifier: "infrastructure",
        label: "Infrastructure",
      },
      {
        key: "body-mythos",
        kind: "bbcode",
        fieldIdentifier: "mythos",
        label: "Mythology and Lore",
      },
    ],
  },
  {
    eventKey: "religious",
    title: "Religious",
    fields: [
      {
        key: "body-origins",
        kind: "bbcode",
        fieldIdentifier: "origins",
        label: "Divine Origins",
      },
      {
        key: "body-cosmology",
        kind: "bbcode",
        fieldIdentifier: "cosmology",
        label: "Cosmological Views",
      },
      {
        key: "body-tenets",
        kind: "bbcode",
        fieldIdentifier: "tenets",
        label: "Tenets of Faith",
      },
      {
        key: "body-ethics",
        kind: "bbcode",
        fieldIdentifier: "ethics",
        label: "Ethics",
      },
      {
        key: "body-worship",
        kind: "bbcode",
        fieldIdentifier: "worship",
        label: "Worship",
      },
      {
        key: "body-priesthood",
        kind: "bbcode",
        fieldIdentifier: "priesthood",
        label: "Priesthood",
      },
      {
        key: "body-divinepowers",
        kind: "bbcode",
        fieldIdentifier: "divinepowers",
        label: "Granted Divine Powers",
      },
      {
        key: "body-intrigue",
        kind: "bbcode",
        fieldIdentifier: "intrigue",
        label: "Political Influence & Intrigue",
      },
      {
        key: "body-sects",
        kind: "bbcode",
        fieldIdentifier: "sects",
        label: "Sects",
      },
    ],
  },
  {
    eventKey: "sidebar-details",
    title: "Sidebar - General",
    fields: [
      {
        key: "sidebar-flag",
        kind: "numerical",
        fieldIdentifier: "flag",
        label: "Flag",
        valueAsReference: true,
        helpText: "Enter the numeric ID, like 7929092",
      },
      {
        key: "sidebar-type",
        kind: "field-dropdown",
        fieldIdentifier: "type",
        label: "Type",
        options: OrganisationTypes.map(({ id, title }) => ({
          value: id,
          label: title,
        })),
        valueAsReference: true,
      },
      {
        key: "sidebar-foundingDate",
        kind: "text",
        fieldIdentifier: "foundingDate",
        label: "Founding Date",
      },
      {
        key: "sidebar-dissolutionDate",
        kind: "text",
        fieldIdentifier: "dissolutionDate",
        label: "Dissolution Date",
      },
      {
        key: "sidebar-motto",
        kind: "text",
        fieldIdentifier: "motto",
        label: "Motto",
      },
      {
        key: "sidebar-alternativeNames",
        kind: "text",
        fieldIdentifier: "alternativeNames",
        label: "Alternative Names",
      },
      {
        key: "sidebar-demonym",
        kind: "text",
        fieldIdentifier: "demonym",
        label: "Demonym",
      },
      {
        key: "sidebar-leader",
        kind: "dropdown",
        fieldIdentifier: "leader",
        label: "Leader",
        entityClass: ["Person"],
      },
      {
        key: "sidebar-rulingorganization",
        kind: "dropdown",
        fieldIdentifier: "rulingorganization",
        label: "Ruling Organisation",
        entityClass: ["Organization"],
      },
      {
        key: "sidebar-leadertitle",
        kind: "dropdown",
        fieldIdentifier: "leadertitle",
        label: "Leader Title",
        entityClass: ["Rank"],
      },
      {
        key: "sidebar-familyleader",
        kind: "dropdown",
        fieldIdentifier: "familyleader",
        label: "Family Leader",
        entityClass: ["Person"],
      },
      {
        key: "sidebar-parent",
        kind: "dropdown",
        fieldIdentifier: "parent",
        label: "Parent Organisation",
        entityClass: ["Organization"],
      },
      {
        key: "sidebar-geographicLocation",
        kind: "dropdown",
        fieldIdentifier: "geographicLocation",
        label: "Geographic Location",
        entityClass: ["Location", "Settlement", "Landmark"],
      },
      {
        key: "sidebar-relatedSpecies",
        kind: "dropdown",
        fieldIdentifier: "relatedSpecies",
        label: "Related Species",
        entityClass: ["Species"],
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
      {
        key: "sidebar-predecessors",
        kind: "dropdown",
        fieldIdentifier: "predecessors",
        label: "Predecessor Organisations",
        entityClass: ["Organization"],
        isMulti: true,
      },
      {
        key: "sidebar-successors",
        kind: "dropdown",
        fieldIdentifier: "successors",
        label: "Successor Organisations",
        entityClass: ["Organization"],
        isMulti: true,
      },
    ],
  },
  {
    eventKey: "sidebar-geopolitical",
    title: "Sidebar - Geopolitical",
    fields: [
      {
        key: "sidebar-capital",
        kind: "dropdown",
        fieldIdentifier: "capital",
        label: "Capital",
        entityClass: ["Location", "Settlement", "Landmark"],
      },
      {
        key: "sidebar-headofstate",
        kind: "dropdown",
        fieldIdentifier: "headofstate",
        label: "Head of State",
        entityClass: ["Person"],
      },
      {
        key: "sidebar-headofgovernment",
        kind: "dropdown",
        fieldIdentifier: "headofgovernment",
        label: "Head of Government",
        entityClass: ["Person"],
      },
      {
        key: "sidebar-governmentsystem",
        kind: "field-dropdown",
        fieldIdentifier: "governmentsystem",
        label: "Government System",
        options: governmentSystems,
      },
      {
        key: "sidebar-powerstructure",
        kind: "field-dropdown",
        fieldIdentifier: "powerstructure",
        label: "Power Structure",
        options: powerStructures,
      },
      {
        key: "sidebar-economicsystem",
        kind: "field-dropdown",
        fieldIdentifier: "economicsystem",
        label: "Economic System",
        options: economicSystems,
      },
      {
        key: "sidebar-gazetteer",
        kind: "bbcode",
        fieldIdentifier: "gazetteer",
        label: "Gazetteer",
      },
      {
        key: "sidebar-currency",
        kind: "bbcode",
        fieldIdentifier: "currency",
        label: "Currency",
      },
      {
        key: "sidebar-exports",
        kind: "bbcode",
        fieldIdentifier: "exports",
        label: "Major Exports",
      },
      {
        key: "sidebar-imports",
        kind: "bbcode",
        fieldIdentifier: "imports",
        label: "Major Imports",
      },
      {
        key: "sidebar-legislative",
        kind: "bbcode",
        fieldIdentifier: "legislative",
        label: "Legislative Body",
      },
      {
        key: "sidebar-executive",
        kind: "bbcode",
        fieldIdentifier: "executive",
        label: "Executive Body",
      },
      {
        key: "sidebar-statereligion",
        kind: "dropdown",
        fieldIdentifier: "statereligion",
        label: "Official State Religion",
        entityClass: ["Organization"],
      },
      {
        key: "sidebar-neighbours",
        kind: "dropdown",
        fieldIdentifier: "neighbors",
        label: "Neighbouring Geopolitical Organisations",
        entityClass: ["Organization"],
        isMulti: true,
      },
      {
        key: "sidebar-languages",
        kind: "dropdown",
        fieldIdentifier: "languages",
        label: "Recognised / Official Languages",
        entityClass: ["Language"],
        isMulti: true,
      },
    ],
  },
  {
    eventKey: "sidebar-religious",
    title: "Sidebar - Religious & Military",
    fields: [
      {
        key: "sidebar-deities",
        kind: "dropdown",
        fieldIdentifier: "deities",
        label: "Deities",
        entityClass: ["Person"],
      },
      {
        key: "sidebar-formation",
        kind: "dropdown",
        fieldIdentifier: "formation",
        label: "Formation",
        entityClass: ["Formation"],
      },
      {
        key: "sidebar-trainingLevel",
        kind: "field-dropdown",
        fieldIdentifier: "trainingLevel",
        label: "Training Level",
        options: trainingLevels,
      },
      {
        key: "sidebar-veterancy",
        kind: "field-dropdown",
        fieldIdentifier: "veterancy",
        label: "Veterancy",
        options: veterancyLevels,
      },
    ],
  },
];

export const subtitleFieldRegistry: ArticleFieldConfig<Organisation>[] = [
  ...createCommonSubtitleFieldRegistry<Organisation>(),
];

export const sidebarFieldRegistry: ArticleFieldConfig<Organisation>[] = [
  ...createCommonSidebarFieldRegistry<Organisation>(),
];

export const footerFieldRegistry: ArticleFieldConfig<Organisation>[] = [
  ...createCommonFooterFieldRegistry<Organisation>(),
];

export const designFieldRegistry: ArticleFieldConfig<Organisation>[] = [
  ...createCommonDesignFieldRegistry<Organisation>(),
];
