import { Article } from "@/components/types/article";
import { ArticleFieldConfig } from "./article-edit-field-renderer";

export type ArticleTopLevelTabKey = "body" | "subtitle" | "sidebar" | "footer";

export type ArticleTopLevelTabConfig = {
  eventKey: ArticleTopLevelTabKey;
  title: string;
};

export const articleTopLevelTabRegistry: ArticleTopLevelTabConfig[] = [
  { eventKey: "body", title: "Body" },
  { eventKey: "subtitle", title: "Subheader" },
  { eventKey: "sidebar", title: "Sidebar" },
  { eventKey: "footer", title: "Footer" },
];

// Shared fields that can be reused across multiple article edit pages.
export const createCommonArticleMetaFieldRegistry = <
  TArticle extends Article,
>(): ArticleFieldConfig<TArticle>[] => {
  return [
    {
      key: "meta-subheading",
      kind: "text",
      fieldIdentifier: "subheading",
      label: "Subheading",
    },
    {
      key: "meta-pronunciation",
      kind: "text",
      fieldIdentifier: "pronunciation",
      label: "Pronunciation",
    },
    {
      key: "meta-credits",
      kind: "text",
      fieldIdentifier: "credits",
      label: "Credits",
      helpText: "Common article metadata field.",
    },
  ];
};

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
    {
      key: "footer-credits",
      kind: "bbcode",
      fieldIdentifier: "credits",
      label: "Credits",
    },
  ];
};

export const createCommonSubtitleFieldRegistry = <
  TArticle extends Article,
>(): ArticleFieldConfig<TArticle>[] => {
  return [...createCommonArticleMetaFieldRegistry<TArticle>()];
};
