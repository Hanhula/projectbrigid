import { ArticleFieldConfig } from "../EditComponents/article-edit-field-renderer";
import {
  createCommonBodyFieldRegistry,
  createCommonFooterFieldRegistry,
  createCommonSidebarFieldRegistry,
  createCommonSubtitleFieldRegistry,
  createCommonDesignFieldRegistry,
} from "../EditComponents/article-edit-registry-common";
import { Condition } from "@/components/types/article-types/condition";

export type ConditionBodySubTabConfig = {
  eventKey: string;
  title: string;
  fields: ArticleFieldConfig<Condition>[];
};

export const bodyFieldRegistry: ArticleFieldConfig<Condition>[] =
  createCommonBodyFieldRegistry<Condition>();

export const bodySubTabRegistry: ConditionBodySubTabConfig[] = [
  {
    eventKey: "properties",
    title: "Properties",
    fields: [
      {
        key: "body-transmissionvectors",
        kind: "bbcode",
        fieldIdentifier: "transmissionvectors",
        label: "Transmission Vectors",
      },
      {
        key: "body-causes",
        kind: "bbcode",
        fieldIdentifier: "causes",
        label: "Causes",
      },
      {
        key: "body-symptoms",
        kind: "bbcode",
        fieldIdentifier: "symptoms",
        label: "Symptoms",
      },
      {
        key: "body-treatment",
        kind: "bbcode",
        fieldIdentifier: "treatment",
        label: "Treatment",
      },
      {
        key: "body-prognosis",
        kind: "bbcode",
        fieldIdentifier: "prognosis",
        label: "Prognosis",
      },
      {
        key: "body-sequela",
        kind: "bbcode",
        fieldIdentifier: "sequela",
        label: "Sequela",
      },
    ],
  },
  {
    eventKey: "impact",
    title: "Impact",
    fields: [
      {
        key: "body-affectedgroups",
        kind: "bbcode",
        fieldIdentifier: "affectedgroups",
        label: "Affected Groups",
      },
      {
        key: "body-hosts",
        kind: "bbcode",
        fieldIdentifier: "hosts",
        label: "Hosts & Carriers",
      },
      {
        key: "body-prevention",
        kind: "bbcode",
        fieldIdentifier: "prevention",
        label: "Prevention",
      },
      {
        key: "body-epidemiology",
        kind: "bbcode",
        fieldIdentifier: "epidemiology",
        label: "Epidemiology",
      },
      {
        key: "body-history",
        kind: "bbcode",
        fieldIdentifier: "history",
        label: "History",
      },
      {
        key: "body-reception",
        kind: "bbcode",
        fieldIdentifier: "reception",
        label: "Cultural Reception",
      },
    ],
  },
  {
    eventKey: "sidebar-details",
    title: "Sidebar Details",
    fields: [
      {
        key: "body-type",
        kind: "text",
        fieldIdentifier: "type",
        label: "Type",
      },
      {
        key: "body-parent",
        kind: "dropdown",
        fieldIdentifier: "parent",
        label: "Parent",
        entityClass: ["Condition"],
      },
      {
        key: "body-origin",
        kind: "text",
        fieldIdentifier: "origin",
        label: "Origin",
      },
      {
        key: "body-cycle",
        kind: "text",
        fieldIdentifier: "cycle",
        label: "Cycle",
      },
      {
        key: "body-rarity",
        kind: "text",
        fieldIdentifier: "rarity",
        label: "Rarity",
      },
      {
        key: "body-species",
        kind: "dropdown",
        fieldIdentifier: "species",
        label: "Species",
        entityClass: ["Species"],
        isMulti: true,
      },
    ],
  },
];

export const subtitleFieldRegistry: ArticleFieldConfig<Condition>[] = [
  ...createCommonSubtitleFieldRegistry<Condition>(),
];

export const sidebarFieldRegistry: ArticleFieldConfig<Condition>[] = [
  ...createCommonSidebarFieldRegistry<Condition>(),
];

export const footerFieldRegistry: ArticleFieldConfig<Condition>[] = [
  ...createCommonFooterFieldRegistry<Condition>(),
];

export const designFieldRegistry: ArticleFieldConfig<Condition>[] = [
  ...createCommonDesignFieldRegistry<Condition>(),
];
