import { ArticleFieldConfig } from "../EditComponents/article-edit-field-renderer";
import {
  createCommonBodyFieldRegistry,
  createCommonFooterFieldRegistry,
  createCommonSubtitleFieldRegistry,
  createCommonDesignFieldRegistry,
} from "../EditComponents/article-edit-registry-common";
import { Prose } from "@/components/types/article-types/prose";

export type ProseBodySubTabConfig = {
  eventKey: string;
  title: string;
  fields: ArticleFieldConfig<Prose>[];
};

export const bodyFieldRegistry: ArticleFieldConfig<Prose>[] = [
  {
    key: "body-prose",
    kind: "bbcode",
    fieldIdentifier: "prose",
    label: "Prose",
  },
  {
    key: "body-sidenotes",
    kind: "bbcode",
    fieldIdentifier: "sidenotes",
    label: "Sidenotes",
  },
];

export const subtitleFieldRegistry: ArticleFieldConfig<Prose>[] = [
  {
    key: "subtitle-subheading",
    kind: "text",
    fieldIdentifier: "subheading",
    label: "Subheading",
  },
  {
    key: "subtitle-credits",
    kind: "text",
    fieldIdentifier: "credits",
    label: "Credits",
  },
];

export const footerFieldRegistry: ArticleFieldConfig<Prose>[] = [
  ...createCommonFooterFieldRegistry<Prose>(),
];

export const designFieldRegistry: ArticleFieldConfig<Prose>[] = [
  ...createCommonDesignFieldRegistry<Prose>(),
];
