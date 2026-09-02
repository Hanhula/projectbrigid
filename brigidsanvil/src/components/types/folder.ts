import { WorldAnvilDate } from "./date";
import { SubscriberGroup } from "./subscribergroup";

export type Folder = {
  id: string;
  title: string;
  slug: string | null;
  state: string | null;
  isWip: boolean | null;
  isDraft: boolean | null;
  entityClass: string;
  icon: string | null;
  url: string | null;
  subscribergroups: SubscriberGroup[];
  folderId: string | null; // parent folder id, "-1" = world root
  tags: string | null;
  updateDate: WorldAnvilDate | null;
  // fields returned by GET /folder (superset of the list/create/update ref shape)
  description?: string | null;
  entityType?: string;
  world?: { id: string };
  parent?: { id: string };
  isEditable?: boolean;
  success?: boolean;
};

// Request body for PUT /folder
export type CreateFolder = {
  title: string;
  entityType: string;
  world: { id: string };
  parent?: { id: string };
  description?: string;
  tags?: string;
  state?: string;
  isWip?: boolean;
  isDraft?: boolean;
};

// Request body for PATCH /folder?id= - all fields optional, supply any subset
export type FolderUpdate = {
  title?: string;
  slug?: string;
  description?: string;
  state?: string;
  isWip?: boolean;
  isDraft?: boolean;
  tags?: string;
  parent?: { id: string };
};

export type WorldFolders = {
  world: { id: string };
  folders: Folder[];
};
