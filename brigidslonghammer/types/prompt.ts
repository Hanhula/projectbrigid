import { SubscriberGroup } from "./subscribergroup";

export type Prompt = {
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