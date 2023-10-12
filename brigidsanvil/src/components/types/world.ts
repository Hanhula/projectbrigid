import { Image } from "./image";
import { SubscriberGroup } from "./subscribergroup";
import { User } from "./user";

export type World = {
    id: string,
    title: string,
    slug: string,
    state: string,
    isWip: boolean,
    isDraft: boolean,
    entityClass: string,
    icon: string,
    url: string,
    subscribergroups: SubscriberGroup[],
    folderId: string,
    tags: string,
    updateDate: {
        date: string;
        timezone_type: number;
        timezone: string;
      },
    descriptionParsed: string,
    owner: User;
    countFollowers: number,
    countArticles: number,
    countMaps: number,
    countTimelines: number,
    subtitle: string,
    locale: string,
    description: string,
    excerpt: string,
    isStored: boolean,
    displayCss: string,
    displayPanelCss: string,
    copyright: string,
    worldSidebarContent: string,
    globalAnnouncement: string,
    globalHeader: string,
    globalSidebarFooter: string,
    globalArticleIntroduction: string,
    cover: Image,
    genre: null,
    theme: string,
    isEditable: boolean,
    success: boolean
  }