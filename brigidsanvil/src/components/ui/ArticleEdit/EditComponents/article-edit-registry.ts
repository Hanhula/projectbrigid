import { ArticleFieldConfig } from "./article-edit-field-renderer";
import {
  createCommonBodyFieldRegistry,
  createCommonFooterFieldRegistry,
  createCommonSidebarFieldRegistry,
  createCommonSubtitleFieldRegistry,
} from "./article-edit-registry-common";
import { Article } from "@/components/types/article";

export type ArticleBodySubTabConfig = {
  eventKey: string;
  title: string;
  fields: ArticleFieldConfig<Article>[];
};

export const bodyFieldRegistry: ArticleFieldConfig<Article>[] =
  createCommonBodyFieldRegistry<Article>();

export const subtitleFieldRegistry: ArticleFieldConfig<Article>[] = [
  ...createCommonSubtitleFieldRegistry<Article>(),
];

export const sidebarFieldRegistry: ArticleFieldConfig<Article>[] = [
  ...createCommonSidebarFieldRegistry<Article>(),
];

export const footerFieldRegistry: ArticleFieldConfig<Article>[] = [
  ...createCommonFooterFieldRegistry<Article>(),
];
