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
  content?: string;
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
  Article,
  Condition,
  Document,
  Ethnicity,
  Formation,
  Item,
  Landmark,
  Language,
  Law,
  Location,
  Material,
  MilitaryConflict,
  Myth,
  Organization,
  Person,
  Plot,
  Profession,
  Prose,
  Rank,
  Report,
  Ritual,
  Settlement,
  Species,
  Spell,
  Technology,
  Vehicle,
}
