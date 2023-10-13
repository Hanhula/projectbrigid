import { SubscriberGroup } from "./subscribergroup";
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
  updateDate: {
    date: string;
    timezone_type: number;
    timezone: string;
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
