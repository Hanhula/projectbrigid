import { Article } from "@/components/types/article";
import { ArticleFieldConfig } from "./article-edit-field-renderer";

export type ArticleTopLevelTabKey =
  | "body"
  | "subtitle"
  | "sidebar"
  | "footer"
  | "design";

export type ArticleTopLevelTabConfig = {
  eventKey: ArticleTopLevelTabKey;
  title: string;
};

export const articleTopLevelTabRegistry: ArticleTopLevelTabConfig[] = [
  { eventKey: "body", title: "Body" },
  { eventKey: "subtitle", title: "Subheader" },
  { eventKey: "sidebar", title: "Sidebar" },
  { eventKey: "footer", title: "Footer" },
  { eventKey: "design", title: "Design" },
];

export const createCommonBodyFieldRegistry = <
  TArticle extends Article,
>(): ArticleFieldConfig<TArticle>[] => {
  return [
    {
      key: "body-content",
      kind: "bbcode",
      fieldIdentifier: "content",
    },
  ];
};

export const createCommonSidebarFieldRegistry = <
  TArticle extends Article,
>(): ArticleFieldConfig<TArticle>[] => {
  return [
    {
      key: "sidebarcontent",
      kind: "bbcode",
      fieldIdentifier: "sidebarcontent",
      label: "Sidebar Content",
    },
    {
      key: "sidepanelcontenttop",
      kind: "bbcode",
      fieldIdentifier: "sidepanelcontenttop",
      label: "Top Side Panel Content",
    },
    {
      key: "sidepanelcontent",
      kind: "bbcode",
      fieldIdentifier: "sidepanelcontent",
      label: "Side Panel Content",
    },
    {
      key: "sidebarcontentbottom",
      kind: "bbcode",
      fieldIdentifier: "sidebarcontentbottom",
      label: "Bottom Sidebar Content",
    },
  ];
};

export const createCommonFooterFieldRegistry = <
  TArticle extends Article,
>(): ArticleFieldConfig<TArticle>[] => {
  return [
    {
      key: "footer-fullfooter",
      kind: "bbcode",
      fieldIdentifier: "fullfooter",
      label: "Full Footer",
    },
    {
      key: "footer-footnotes",
      kind: "bbcode",
      fieldIdentifier: "footnotes",
      label: "Footnotes",
    },
    {
      key: "footer-authornotes",
      kind: "bbcode",
      fieldIdentifier: "authornotes",
      label: "Author Notes",
    },
    {
      key: "footer-scrapbook",
      kind: "bbcode",
      fieldIdentifier: "scrapbook",
      label: "Scrapbook",
    },
  ];
};

export const createCommonDesignFieldRegistry = <
  TArticle extends Article,
>(): ArticleFieldConfig<TArticle>[] => {
  return [
    {
      key: "design-excerpt",
      kind: "text",
      fieldIdentifier: "excerpt",
      label: "Excerpt",
    },
    {
      key: "design-icon",
      kind: "icon",
      fieldIdentifier: "icon",
      label: "Icon",
    },
    {
      key: "design-tags",
      kind: "tags",
      fieldIdentifier: "tags",
      label: "Tags",
    },
  ];
};

export const createCommonSubtitleFieldRegistry = <
  TArticle extends Article,
>(): ArticleFieldConfig<TArticle>[] => {
  return [
    {
      key: "subtitle-subheading",
      kind: "text",
      fieldIdentifier: "subheading",
      label: "Subheading",
    },
    {
      key: "subtitle-pronunciation",
      kind: "text",
      fieldIdentifier: "pronunciation",
      label: "Pronunciation",
    },
    {
      key: "subtitle-credits",
      kind: "text",
      fieldIdentifier: "credits",
      label: "Credits",
    },
  ];
};
