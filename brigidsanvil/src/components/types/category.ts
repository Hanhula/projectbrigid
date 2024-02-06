import { Article } from "./article";
import { WorldAnvilDate } from "./date";
import { SubscriberGroup } from "./subscribergroup";
import { World } from "./world";

export type WorldCategories = {
  world: World;
  categories: Category[];
};

export type WorldCategory = {
  world: World;
  category: Category;
};

export type Category = {
  id: string;
  title: string;
  slug: string;
  state: string;
  isWip: boolean | null;
  isDraft: boolean | null;
  entityClass: string;
  icon: string | null;
  url: string;
  subscribergroups: SubscriberGroup[];
  folderId: string | null;
  tags: string | null;
  updateDate: WorldAnvilDate | null;
  description?: string | null;
  excerpt?: string | null;
  isBook?: boolean;
  displayBookTitle?: boolean;
  isCollapsed?: boolean;
  position?: number | null;
  creationDate?: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  views?: number;
  custom1?: string | null;
  custom2?: string | null;
  custom3?: string | null;
  custom4?: string | null;
  custom5?: string | null;
  cssClasses?: string | null;
  systemMeta?: string | null;
  pagecover?: string | null;
  bookcover?: string | null;
  defaultarticlecover?: string | null;
  parent?: Category | null;
  world?: World;
  articleRedirect?: string | null;
  articles?: Article[] | null;
  editURL?: string;
  isEditable?: boolean;
  success?: boolean;
};
