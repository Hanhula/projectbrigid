import { WorldAnvilDate } from "./date";
import { SubscriberGroup } from "./subscribergroup";
import { User } from "./user";
import { World } from "./world";

export type Image = {
  id: string;
  title: string;
  slug: string | null;
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
  // granularity 0
  filename?: string;
  path?: string;
  size?: number;
  width?: number;
  height?: number;
  extension?: string;
  description?: string;
  alt?: string;
  creditArtistName?: string;
  creditArtistWebsite?: string;
  creditArtTitle?: string;
  creditArtUrl?: string;
  creationDate?: WorldAnvilDate;
  views?: number | null;
  likes?: number | null;
  isFeatured?: boolean;
  linkUrl?: string;
  pageUrl?: string;
  // granularity 2
  article?: { id: string } | null;
  owner?: User;
  world?: World;
  character?: unknown;
  isEditable?: boolean;
  success?: boolean;
};

// Fields the WA API accepts on PATCH /image?id= - the binary itself cannot be replaced.
export type ImageUpdate = {
  title?: string;
  tags?: string;
  description?: string;
  alt?: string;
  creditArtistName?: string;
  creditArtistWebsite?: string;
  creditArtTitle?: string;
  creditArtUrl?: string;
  isFeatured?: boolean;
  linkUrl?: string;
  folderId?: string;
};

export type WorldImages = {
  world: World;
  images: Image[];
};
