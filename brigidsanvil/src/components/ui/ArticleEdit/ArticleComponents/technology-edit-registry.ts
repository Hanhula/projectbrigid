import { ArticleFieldConfig } from "../EditComponents/article-edit-field-renderer";
import {
  createCommonBodyFieldRegistry,
  createCommonFooterFieldRegistry,
  createCommonSidebarFieldRegistry,
  createCommonSubtitleFieldRegistry,
  createCommonDesignFieldRegistry,
} from "../EditComponents/article-edit-registry-common";
import { Technology } from "@/components/types/article-types/technology";

export type TechnologyBodySubTabConfig = {
  eventKey: string;
  title: string;
  fields: ArticleFieldConfig<Technology>[];
};

export const bodyFieldRegistry: ArticleFieldConfig<Technology>[] = [
  ...createCommonBodyFieldRegistry<Technology>(),
];

export const bodySubTabRegistry: TechnologyBodySubTabConfig[] = [
  {
    eventKey: "information",
    title: "Information",
    fields: [
      {
        key: "body-utility",
        kind: "bbcode",
        fieldIdentifier: "utility",
        label: "Utility",
      },
      {
        key: "body-manufacturing",
        kind: "bbcode",
        fieldIdentifier: "manufacturing",
        label: "Manufacturing",
      },
      {
        key: "body-socialImpact",
        kind: "bbcode",
        fieldIdentifier: "socialImpact",
        label: "Social Impact",
      },
    ],
  },
  {
    eventKey: "sidebar-details",
    title: "Sidebar Details",
    fields: [
      {
        key: "body-inventor",
        kind: "bbcode",
        fieldIdentifier: "inventor",
        label: "Related Inventors",
      },
      {
        key: "body-access",
        kind: "bbcode",
        fieldIdentifier: "access",
        label: "Access and Availability",
      },
      {
        key: "body-complexity",
        kind: "bbcode",
        fieldIdentifier: "complexity",
        label: "Complexity",
      },
      {
        key: "body-discovery",
        kind: "bbcode",
        fieldIdentifier: "discovery",
        label: "Discovery",
      },
      {
        key: "body-relatedSpecies",
        kind: "dropdown",
        fieldIdentifier: "relatedSpecies",
        label: "Related Species",
        entityClass: ["Species"],
        isMulti: true,
      },
      {
        key: "body-parents",
        kind: "dropdown",
        fieldIdentifier: "parents",
        label: "Parent Technologies",
        entityClass: ["Technology"],
        isMulti: true,
      },
    ],
  },
];

export const subtitleFieldRegistry: ArticleFieldConfig<Technology>[] = [
  ...createCommonSubtitleFieldRegistry<Technology>(),
];

export const sidebarFieldRegistry: ArticleFieldConfig<Technology>[] = [
  ...createCommonSidebarFieldRegistry<Technology>(),
];

export const footerFieldRegistry: ArticleFieldConfig<Technology>[] = [
  ...createCommonFooterFieldRegistry<Technology>(),
];

export const designFieldRegistry: ArticleFieldConfig<Technology>[] = [
  ...createCommonDesignFieldRegistry<Technology>(),
];
