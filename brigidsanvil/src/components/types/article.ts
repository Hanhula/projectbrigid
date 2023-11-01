import { Block } from "typescript";
import { Category } from "./category";
import { WorldAnvilDate } from "./date";
import { Gallery } from "./gallery";
import { History } from "./history";
import { Manuscript } from "./manuscript";
import { OrgChart } from "./orgchart";
import { Prompt } from "./prompt";
import { Secret } from "./secret";
import { SubscriberGroup } from "./subscribergroup";
import { Timeline } from "./timeline";
import { User } from "./user";
import { World } from "./world";
import { Image } from "./image";
import _ from "lodash";

export type WorldArticles = {
  world: World;
  articles: Article[];
};

export type WorldArticle = {
  world: World;
  article: Article;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  state: string;
  isWip: boolean;
  isDraft: boolean;
  entityClass: string;
  icon: string | null;
  url: string;
  subscribergroups: SubscriberGroup[];
  folderId: string;
  tags: string;
  updateDate: WorldAnvilDate;
  // granularity 1
  isEditable?: boolean;
  success?: boolean;
  position?: number;
  excerpt?: string;
  wordcount?: number;
  creationDate?: WorldAnvilDate;
  publicationDate?: WorldAnvilDate;
  notificationDate?: WorldAnvilDate;
  likes?: number;
  views?: number;
  userMetadata?: string; // dunno what this field does
  articleMetadata?: string; // this either
  cssClasses?: string;
  displayCss?: string;
  templateType?: string;
  customArticleTemplate?: string;
  content: string | null;
  author?: User;
  category?: Category;
  world?: World;
  // granularity 2
  pronunciation?: string;
  snippet?: string;
  seeded?: string;
  sidebarcontent?: string;
  sidepanelcontenttop?: string;
  sidepanelcontent?: string;
  sidebarcontentbottom?: string;
  footnotes?: string;
  fullfooter?: string;
  authornotes?: string;
  scrapbook?: string;
  credits?: string;
  displaySidebar?: boolean;
  articleNext?: Article;
  articlePrevious?: Article;
  timeline?: Timeline;
  prompt?: Prompt;
  gallery?: Gallery;
  articleParent?: Article;
  block?: Block;
  orgchart?: OrgChart;
  manuscripts?: Manuscript[];
  showSeeded?: boolean;
  webhookUpdate?: boolean;
  communityUpdate?: boolean;
  commentPlaceholder?: string;
  metaTitle?: string;
  metadDescription?: string;
  subheading?: string;
  cover?: Image;
  coverIsMap?: boolean;
  isFeaturedArticle?: boolean;
  isAdultContent?: boolean;
  isLocked?: boolean;
  allowComments?: boolean;
  showInToc?: boolean;
  isEmphasized?: boolean;
  displayAuthor?: boolean;
  displayChildrenUnder?: boolean;
  displayTitle?: boolean;
  displaySheet?: boolean;
  badge?: string;
  fans?: User[] | null;
  secrets?: Secret[];
  histories?: History[];
  editURL?: string;
  // granularity 3
  ancestry?: {
    firstUp: Article | Category | World;
    secondUp: Article | Category | World;
    thirdUp: Article | Category | World;
  };
};

export type ApiResponse = {
  [key: string]: any; // Define a dynamic key-value structure
};

export type ArticleApiResponse = {
  success: boolean;
  entities: Article[];
};

export enum ArticleTypes {
  Article = "Article",
  Condition = "Condition",
  Document = "Document",
  Ethnicity = "Ethnicity",
  Formation = "Formation",
  Item = "Item",
  Landmark = "Landmark",
  Language = "Language",
  Law = "Law",
  Location = "Location",
  Material = "Material",
  MilitaryConflict = "MilitaryConflict",
  Myth = "Myth",
  Organization = "Organization",
  Person = "Person",
  Plot = "Plot",
  Profession = "Profession",
  Prose = "Prose",
  Rank = "Rank",
  Report = "Report",
  Ritual = "Ritual",
  Settlement = "Settlement",
  Species = "Species",
  Spell = "Spell",
  Technology = "Technology",
  Vehicle = "Vehicle",
}

export class ArticleDisplay {
  id: string;
  title: string;
  excerpt: string | undefined;
  tags: string;
  header: { subheading: string | null };
  body: { content: string | null };
  sidebar: {
    sidebarcontent: string | null;
    sidepanelcontenttop: string | null;
    sidepanelcontent: string | null;
    sidebarcontentbottom: string | null;
  }
  footer: {
    footnotes: string | null;
    fullfooter: string | null;
    authornotes: string | null;
    scrapbook: string | null;
    credits: string | null;
  }

  constructor(article: Article) {
    this.id = article.id;
    this.title = article.title;
    this.excerpt = article.excerpt;
    this.tags = article.tags;

    this.header = {
      subheading: article.subheading ? article.subheading : null
    }

    this.body = {
      content: article.content ? article.content : null
    }

    this.sidebar = {
      sidebarcontent: article.sidebarcontent ? article.sidebarcontent : null,
      sidepanelcontenttop: article.sidepanelcontenttop ? article.sidepanelcontenttop : null,
      sidepanelcontent: article.sidepanelcontent ? article.sidepanelcontent : null,
      sidebarcontentbottom: article.sidebarcontentbottom ? article.sidebarcontentbottom : null,
    }

    this.footer = {
      footnotes: article.footnotes ? article.footnotes : null,
      fullfooter: article.fullfooter ? article.fullfooter : null,
      authornotes: article.authornotes ? article.authornotes : null,
      scrapbook: article.scrapbook ? article.scrapbook : null,
      credits: article.credits ? article.credits : null,
    }
  }

  formatMention(entity: { title: string; entityClass: string; id: string }): string {
    return `@[${entity.title}](${entity.entityClass}:${entity.id})`;
  }

  formatMentions(entities: Array<{ title: string; entityClass: string; id: string }> | undefined): string | null {
    if (entities && entities.length > 0) {
      return entities.map(this.formatMention).join(', ');
    } else {
      return null;
    }
  }
}