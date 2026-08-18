import { ArticleFieldConfig } from "../EditComponents/article-edit-field-renderer";
import {
  createCommonBodyFieldRegistry,
  createCommonFooterFieldRegistry,
  createCommonSidebarFieldRegistry,
  createCommonSubtitleFieldRegistry,
  createCommonDesignFieldRegistry,
} from "../EditComponents/article-edit-registry-common";
import { Plot } from "@/components/types/article-types/plot";

export type PlotBodySubTabConfig = {
  eventKey: string;
  title: string;
  fields: ArticleFieldConfig<Plot>[];
};

export const bodyFieldRegistry: ArticleFieldConfig<Plot>[] = [
  ...createCommonBodyFieldRegistry<Plot>(),
];

export const bodySubTabRegistry: PlotBodySubTabConfig[] = [
  {
    eventKey: "information",
    title: "Information",
    fields: [
      {
        key: "body-scenes",
        kind: "bbcode",
        fieldIdentifier: "scenes",
        label: "Plot Points / Scenes",
      },
      {
        key: "body-themes",
        kind: "bbcode",
        fieldIdentifier: "themes",
        label: "Themes",
      },
    ],
  },
  {
    eventKey: "structure",
    title: "Structure",
    fields: [
      {
        key: "body-exposition",
        kind: "bbcode",
        fieldIdentifier: "exposition",
        label: "Exposition",
      },
      {
        key: "body-conflict",
        kind: "bbcode",
        fieldIdentifier: "conflict",
        label: "Conflict",
      },
      {
        key: "body-risingaction",
        kind: "bbcode",
        fieldIdentifier: "risingaction",
        label: "Rising Action",
      },
      {
        key: "body-climax",
        kind: "bbcode",
        fieldIdentifier: "climax",
        label: "Climax",
      },
      {
        key: "body-fallingaction",
        kind: "bbcode",
        fieldIdentifier: "fallingaction",
        label: "Falling Action",
      },
      {
        key: "body-resolution",
        kind: "bbcode",
        fieldIdentifier: "resolution",
        label: "Resolution",
      },
    ],
  },
  {
    eventKey: "components",
    title: "Components",
    fields: [
      {
        key: "body-goals",
        kind: "bbcode",
        fieldIdentifier: "goals",
        label: "Goals",
      },
      {
        key: "body-hooks",
        kind: "bbcode",
        fieldIdentifier: "hooks",
        label: "Hooks",
      },
      {
        key: "body-stakes",
        kind: "bbcode",
        fieldIdentifier: "stakes",
        label: "Stakes",
      },
      {
        key: "body-moralquandaries",
        kind: "bbcode",
        fieldIdentifier: "moralquandaries",
        label: "Moral Quandaries",
      },
      {
        key: "body-crueltricks",
        kind: "bbcode",
        fieldIdentifier: "crueltricks",
        label: "Cruel Tricks",
      },
      {
        key: "body-redherrings",
        kind: "bbcode",
        fieldIdentifier: "redherrings",
        label: "Red Herrings",
      },
    ],
  },
  {
    eventKey: "relations",
    title: "Relations",
    fields: [
      {
        key: "body-protagonists",
        kind: "bbcode",
        fieldIdentifier: "protagonists",
        label: "Protagonists",
      },
      {
        key: "body-allies",
        kind: "bbcode",
        fieldIdentifier: "allies",
        label: "Allies",
      },
      {
        key: "body-neutrals",
        kind: "bbcode",
        fieldIdentifier: "neutrals",
        label: "Neutrals / Bystanders",
      },
      {
        key: "body-competitors",
        kind: "bbcode",
        fieldIdentifier: "competitors",
        label: "Competitors",
      },
      {
        key: "body-adversaries",
        kind: "bbcode",
        fieldIdentifier: "adversaries",
        label: "Adversaries",
      },
    ],
  },
  {
    eventKey: "backdrops",
    title: "Backdrops",
    fields: [
      {
        key: "body-locations",
        kind: "bbcode",
        fieldIdentifier: "locations",
        label: "Locations",
      },
      {
        key: "body-threats",
        kind: "bbcode",
        fieldIdentifier: "threats",
        label: "Threats",
      },
      {
        key: "body-encounters",
        kind: "bbcode",
        fieldIdentifier: "encounters",
        label: "Encounters",
      },
      {
        key: "body-pastevents",
        kind: "bbcode",
        fieldIdentifier: "pastevents",
        label: "Past Events",
      },
    ],
  },
  {
    eventKey: "sidebar-details",
    title: "Sidebar Details",
    fields: [
      {
        key: "sidebar-completionDate",
        kind: "text",
        fieldIdentifier: "completionDate",
        label: "Completion Date",
      },
      {
        key: "sidebar-plotType",
        kind: "text",
        fieldIdentifier: "type",
        label: "Plot Type",
      },
      {
        key: "sidebar-parent",
        kind: "dropdown",
        fieldIdentifier: "parent",
        label: "Parent Plot",
        entityClass: ["Plot"],
      },
      {
        key: "sidebar-relatedpeople",
        kind: "dropdown",
        fieldIdentifier: "relatedpeople",
        label: "Related Characters",
        entityClass: ["Person"],
        isMulti: true,
      },
      {
        key: "sidebar-organisations",
        kind: "dropdown",
        fieldIdentifier: "relatedorganizations",
        label: "Related Organisations",
        entityClass: ["Organization"],
        isMulti: true,
      },
      {
        key: "sidebar-relatedlocations",
        kind: "dropdown",
        fieldIdentifier: "relatedlocations",
        label: "Related Locations",
        entityClass: ["Location", "Settlement", "Landmark"],
        isMulti: true,
      },
    ],
  },
];

export const subtitleFieldRegistry: ArticleFieldConfig<Plot>[] = [
  ...createCommonSubtitleFieldRegistry<Plot>(),
];

export const sidebarFieldRegistry: ArticleFieldConfig<Plot>[] = [
  ...createCommonSidebarFieldRegistry<Plot>(),
];

export const footerFieldRegistry: ArticleFieldConfig<Plot>[] = [
  ...createCommonFooterFieldRegistry<Plot>(),
];

export const designFieldRegistry: ArticleFieldConfig<Plot>[] = [
  ...createCommonDesignFieldRegistry<Plot>(),
];
