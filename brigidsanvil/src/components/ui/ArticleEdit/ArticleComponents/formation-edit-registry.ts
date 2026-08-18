import { Formation } from "@/components/types/article-types/formation";
import { ArticleFieldConfig } from "../EditComponents/article-edit-field-renderer";
import {
  createCommonBodyFieldRegistry,
  createCommonFooterFieldRegistry,
  createCommonSidebarFieldRegistry,
  createCommonSubtitleFieldRegistry,
  createCommonDesignFieldRegistry,
} from "../EditComponents/article-edit-registry-common";

export type FormationBodySubTabConfig = {
  eventKey: string;
  title: string;
  fields: ArticleFieldConfig<Formation>[];
};

export const bodyFieldRegistry: ArticleFieldConfig<Formation>[] = [
  ...createCommonBodyFieldRegistry<Formation>(),
];

const formationType = [
  "Air Force",
  "Airborne",
  "Armour",
  "Artillery",
  "Cavalry",
  "Cyber",
  "Containment/Hazmat",
  "Covert Ops",
  "Escort",
  "Infantry",
  "Intelligence",
  "Magic",
  "Marines",
  "Medical",
  "Mech",
  "Mechanized",
  "Mercenary",
  "Motorized",
  "Militia",
  "Navy",
  "Paramilitary",
  "Raiding parties",
  "Reserves",
  "Security",
  "Shock",
  "Special Forces",
  "Spaceborne",
  "Space/EVA",
  "Support",
];

const veterancyOptions = [
  "Decorated/Honored",
  "Veteran",
  "Experienced",
  "Trained",
  "Recruit",
];

const trainingLevelOptions = [
  "Elite",
  "Professional",
  "Semi-professional",
  "Trained",
  "Semi-trained",
  "Levy",
  "Untrained",
];

export const bodySubTabRegistry: FormationBodySubTabConfig[] = [
  {
    eventKey: "composition",
    title: "Composition",
    fields: [
      {
        key: "body-manpower",
        kind: "bbcode",
        fieldIdentifier: "manpower",
        label: "Manpower",
      },
      {
        key: "body-equipment",
        kind: "bbcode",
        fieldIdentifier: "equipment",
        label: "Equipment",
      },
      {
        key: "body-weaponry",
        kind: "bbcode",
        fieldIdentifier: "weaponry",
        label: "Weaponry",
      },
      {
        key: "body-vehicles",
        kind: "bbcode",
        fieldIdentifier: "vehicles",
        label: "Vehicles",
      },
      {
        key: "body-structure",
        kind: "bbcode",
        fieldIdentifier: "structure",
        label: "Structure",
      },
      {
        key: "body-tactics",
        kind: "bbcode",
        fieldIdentifier: "tactics",
        label: "Tactics",
      },
      {
        key: "body-training",
        kind: "bbcode",
        fieldIdentifier: "training",
        label: "Training",
      },
    ],
  },
  {
    eventKey: "logistics",
    title: "Logistics",
    fields: [
      {
        key: "body-logistics",
        kind: "bbcode",
        fieldIdentifier: "logistics",
        label: "Logistics",
      },
      {
        key: "body-support",
        kind: "bbcode",
        fieldIdentifier: "support",
        label: "Auxilia",
      },
      {
        key: "body-upkeep",
        kind: "bbcode",
        fieldIdentifier: "upkeep",
        label: "Upkeep",
      },
      {
        key: "body-recruitment",
        kind: "bbcode",
        fieldIdentifier: "recruitment",
        label: "Recruitment",
      },
    ],
  },
  {
    eventKey: "tab-history",
    title: "Historical Details",
    fields: [
      {
        key: "body-history",
        kind: "bbcode",
        fieldIdentifier: "history",
        label: "History",
      },
      {
        key: "body-loyalties",
        kind: "bbcode",
        fieldIdentifier: "loyalties",
        label: "Loyalties",
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
        options: formationType,
      },
      {
        key: "sidebar-parent-formation",
        kind: "dropdown",
        fieldIdentifier: "units",
        label: "Parent Formation",
        entityClass: ["Formation"],
      },
      {
        key: "sidebar-veterancy",
        kind: "field-dropdown",
        fieldIdentifier: "veterancy",
        label: "Veterancy",
        options: veterancyOptions,
      },
      {
        key: "sidebar-training-level",
        kind: "field-dropdown",
        fieldIdentifier: "trainingLevel",
        label: "Training Level",
        options: trainingLevelOptions,
      },
      {
        key: "sidebar-organisations",
        kind: "dropdown",
        fieldIdentifier: "relatedorganizations",
        label: "Organisations",
        entityClass: ["Organization"],
        isMulti: true,
      },
      {
        key: "sidebar-ranks",
        kind: "dropdown",
        fieldIdentifier: "relatedranks",
        label: "Related Ranks",
        entityClass: ["Rank"],
        isMulti: true,
      },
    ],
  },
];

export const subtitleFieldRegistry: ArticleFieldConfig<Formation>[] = [
  ...createCommonSubtitleFieldRegistry<Formation>(),
];

export const sidebarFieldRegistry: ArticleFieldConfig<Formation>[] = [
  ...createCommonSidebarFieldRegistry<Formation>(),
];

export const footerFieldRegistry: ArticleFieldConfig<Formation>[] = [
  ...createCommonFooterFieldRegistry<Formation>(),
];

export const designFieldRegistry: ArticleFieldConfig<Formation>[] = [
  ...createCommonDesignFieldRegistry<Formation>(),
];
