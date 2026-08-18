import { ArticleFieldConfig } from "../EditComponents/article-edit-field-renderer";
import {
  createCommonBodyFieldRegistry,
  createCommonFooterFieldRegistry,
  createCommonSidebarFieldRegistry,
  createCommonSubtitleFieldRegistry,
  createCommonDesignFieldRegistry,
} from "../EditComponents/article-edit-registry-common";
import { Report } from "@/components/types/article-types/report";

export type ReportBodySubTabConfig = {
  eventKey: string;
  title: string;
  fields: ArticleFieldConfig<Report>[];
};

export const bodyFieldRegistry: ArticleFieldConfig<Report>[] = [
  ...createCommonBodyFieldRegistry<Report>(),
];

export const bodySubTabRegistry: ReportBodySubTabConfig[] = [
  {
    eventKey: "summary",
    title: "Summary",
    fields: [
      {
        key: "body-rewards",
        kind: "bbcode",
        fieldIdentifier: "rewards",
        label: "Rewards Granted",
      },
      {
        key: "body-quests",
        kind: "bbcode",
        fieldIdentifier: "quests",
        label: "Missions/Quests Completed",
      },
      {
        key: "body-interactions",
        kind: "bbcode",
        fieldIdentifier: "interactions",
        label: "Character(s) Interacted With",
      },
      {
        key: "body-createdContent",
        kind: "bbcode",
        fieldIdentifier: "createdContent",
        label: "Created Content",
      },
      {
        key: "body-relatedReports",
        kind: "bbcode",
        fieldIdentifier: "relatedReports",
        label: "Related Reports",
      },
      {
        key: "body-reportNotes",
        kind: "bbcode",
        fieldIdentifier: "reportNotes",
        label: "Report Notes",
      },
    ],
  },
  {
    eventKey: "sidebar-details",
    title: "Sidebar Details",
    fields: [
      {
        key: "sidebar-reportDate",
        kind: "date",
        fieldIdentifier: "reportDate",
        label: "Report Date",
      },
      {
        key: "sidebar-primarygeographicLocation",
        kind: "dropdown",
        fieldIdentifier: "primarygeographicLocation",
        label: "Primary  Location",
        entityClass: ["Location", "Settlement", "Landmark"],
      },
      {
        key: "sidebar-secondarygeographicLocation",
        kind: "dropdown",
        fieldIdentifier: "secondarygeographicLocation",
        label: "Secondary Location",
        entityClass: ["Location", "Settlement", "Landmark"],
      },
      {
        key: "sidebar-plots",
        kind: "dropdown",
        fieldIdentifier: "plots",
        label: "Related Plots",
        entityClass: ["Plot"],
        isMulti: true,
      },
      {
        key: "sidebar-relatedPersons",
        kind: "dropdown",
        fieldIdentifier: "relatedPersons",
        label: "Related Characters",
        entityClass: ["Person"],
        isMulti: true,
      },
    ],
  },
];

export const subtitleFieldRegistry: ArticleFieldConfig<Report>[] = [
  ...createCommonSubtitleFieldRegistry<Report>(),
];

export const sidebarFieldRegistry: ArticleFieldConfig<Report>[] = [
  ...createCommonSidebarFieldRegistry<Report>(),
];

export const footerFieldRegistry: ArticleFieldConfig<Report>[] = [
  ...createCommonFooterFieldRegistry<Report>(),
];

export const designFieldRegistry: ArticleFieldConfig<Report>[] = [
  ...createCommonDesignFieldRegistry<Report>(),
];
