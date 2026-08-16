import { ArticleFieldConfig } from "../EditComponents/article-edit-field-renderer";
import {
  createCommonBodyFieldRegistry,
  createCommonFooterFieldRegistry,
  createCommonSidebarFieldRegistry,
  createCommonSubtitleFieldRegistry,
  createCommonDesignFieldRegistry,
} from "../EditComponents/article-edit-registry-common";
import { MilitaryConflict } from "@/components/types/article-types/militaryconflict";

export type MilitaryConflictBodySubTabConfig = {
  eventKey: string;
  title: string;
  fields: ArticleFieldConfig<MilitaryConflict>[];
};

const conflictTypes = [
  "War",
  "War, Theatre",
  "Military Campaign",
  "Battle",
  "Invasion",
  "Siege",
  "Skirmish",
  "Duel",
  "Political Debate",
  "Sports Event",
  "Showdown",
  "Intelligence",
  "Espionage",
  "Covert Operation",
  "Rebellion",
  "Civil War",
  "Legal Case",
];

const battlefieldTypes = [
  "Land",
  "Urban",
  "Naval",
  "Air",
  "Planetary",
  "Space",
  "Extraplanar",
  "Stadium",
  "Arena",
];

export const bodyFieldRegistry: ArticleFieldConfig<MilitaryConflict>[] = [
  ...createCommonBodyFieldRegistry<MilitaryConflict>(),
];

export const bodySubTabRegistry: MilitaryConflictBodySubTabConfig[] = [
  {
    eventKey: "conflict",
    title: "The Conflict",
    fields: [
      {
        key: "body-prelude",
        kind: "bbcode",
        fieldIdentifier: "prelude",
        label: "Prelude",
      },
      {
        key: "body-deployment",
        kind: "bbcode",
        fieldIdentifier: "deployment",
        label: "Deployment",
      },
      {
        key: "body-battlefield",
        kind: "bbcode",
        fieldIdentifier: "battlefield",
        label: "Battlefield",
      },
      {
        key: "body-conditions",
        kind: "bbcode",
        fieldIdentifier: "conditions",
        label: "Conditions",
      },
      {
        key: "body-engagement",
        kind: "bbcode",
        fieldIdentifier: "engagement",
        label: "Engagement",
      },
      {
        key: "body-outcome",
        kind: "bbcode",
        fieldIdentifier: "outcome",
        label: "Outcome",
      },
      {
        key: "body-aftermath",
        kind: "bbcode",
        fieldIdentifier: "aftermath",
        label: "Aftermath",
      },
    ],
  },
  {
    eventKey: "history",
    title: "History",
    fields: [
      {
        key: "body-history",
        kind: "bbcode",
        fieldIdentifier: "history",
        label: "Historical Significance",
      },
      {
        key: "body-legacy",
        kind: "bbcode",
        fieldIdentifier: "legacy",
        label: "Legacy",
      },
      {
        key: "body-literature",
        kind: "bbcode",
        fieldIdentifier: "literature",
        label: "In Literature",
      },
      {
        key: "body-technology",
        kind: "bbcode",
        fieldIdentifier: "technology",
        label: "Technological Advancement",
      },
    ],
  },
  {
    eventKey: "sidebar-details",
    title: "Sidebar Details",
    fields: [
      {
        key: "sidebar-parent",
        kind: "dropdown",
        fieldIdentifier: "parent",
        label: "Parent Conflict",
        entityClass: ["MilitaryConflict"],
      },
      {
        key: "sidebar-type",
        kind: "field-dropdown",
        fieldIdentifier: "type",
        label: "Conflict Type",
        options: conflictTypes,
      },
      {
        key: "sidebar-battlefieldtype",
        kind: "field-dropdown",
        fieldIdentifier: "battlefieldtype",
        label: "Battlefield Type",
        options: battlefieldTypes,
      },
      {
        key: "sidebar-startingDate",
        kind: "text",
        fieldIdentifier: "startingDate",
        label: "Starting Date",
      },
      {
        key: "sidebar-endingDate",
        kind: "text",
        fieldIdentifier: "endingDate",
        label: "Ending Date",
      },
      {
        key: "sidebar-result",
        kind: "text",
        fieldIdentifier: "result",
        label: "Conflict Result",
      },
      {
        key: "sidebar-location",
        kind: "dropdown",
        fieldIdentifier: "location",
        label: "Location",
        entityClass: ["Location", "Settlement", "Landmark"],
      },
      {
        key: "sidebar-belligerents",
        kind: "note",
        label: "Conflict Sides",
        message:
          "WorldAnvil doesn't currently support editing belligerents via the API :( Please edit this field on the site!",
      },
    ],
  },
];

export const subtitleFieldRegistry: ArticleFieldConfig<MilitaryConflict>[] = [
  ...createCommonSubtitleFieldRegistry<MilitaryConflict>(),
];

export const sidebarFieldRegistry: ArticleFieldConfig<MilitaryConflict>[] = [
  ...createCommonSidebarFieldRegistry<MilitaryConflict>(),
];

export const footerFieldRegistry: ArticleFieldConfig<MilitaryConflict>[] = [
  ...createCommonFooterFieldRegistry<MilitaryConflict>(),
];

export const designFieldRegistry: ArticleFieldConfig<MilitaryConflict>[] = [
  ...createCommonDesignFieldRegistry<MilitaryConflict>(),
];
