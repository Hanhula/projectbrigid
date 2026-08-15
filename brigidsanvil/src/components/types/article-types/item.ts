import { Article, ArticleDisplay } from "../article";
import { Condition } from "./condition";
import { Ethnicity } from "./ethnicity";
import { Location } from "./location";
import { Myth } from "./myth";
import { Organisation } from "./organisation";
import { Person } from "./person";
import { Technology } from "./technology";

export type ItemType = {
  id: string;
  title: string;
  slug: string | null;
  state: string | null;
  isWip: boolean | null;
  isDraft: boolean | null;
  entityClass: string;
  icon: string | null;
  url: string | null;
  subscribergroups: string[];
  folderId: string | null;
  tags: string | null;
  updateDate: {
    date: string;
    timezone_type: number;
    timezone: string;
  } | null;
};

export type Item = Article & {
  manufacturingProcess: string | null;
  rawMaterials: string | null;
  rarity: string | null;
  history: string | null;
  itemCreationDate: string | null;
  itemDestructionDate: string | null;
  significance: string | null;
  tooling: string | null;
  mechanics: string | null;
  weight: string | null;
  dimensions: string | null;
  price: string | null;
  datasheet: string | null;
  parent: Item | null;
  type: ItemType | null;
  manufacturer: Organisation | null;
  creator: Person | null;
  organization: Organisation | null;
  condition: Condition | null;
  currentLocation: Location | null;
  currentHolder: Person | null;
  technologies: Technology[] | null;
  ethnicities: Ethnicity[] | null;
  myths: Myth[] | null;
};

export class ItemDisplay extends ArticleDisplay {
  body: {
    content: string | null;
    mechanicsAndInnerWorkings: string | null;
    manufacturingProcess: string | null;
    history: string | null;
    significance: string | null;
  };

  sidebar: {
    sidebarcontent: string | null;
    sidepanelcontenttop: string | null;
    type: string | null;
    creationDate: string | null;
    destructionDate: string | null;
    currentLocation: string | null;
    currentHolder: string | null;
    subtypeOrModel: string | null;
    manufacturer: string | null;
    creator: string | null;
    relatedTechnologies: string | null;
    relatedEthnicities: string | null;
    owningOrganisation: string | null;
    relatedCondition: string | null;
    rarity: string | null;
    weight: string | null;
    dimensions: string | null;
    basePrice: string | null;
    rawMaterialsAndComponents: string | null;
    tools: string | null;
    relatedMyths: string | null;
    sidepanelcontent: string | null;
    sidebarcontentbottom: string | null;
  };

  constructor(item: Item) {
    super(item);

    this.body = {
      content: item.content ? item.content : null,
      mechanicsAndInnerWorkings: item.mechanics ? item.mechanics : null,
      manufacturingProcess: item.manufacturingProcess
        ? item.manufacturingProcess
        : null,
      history: item.history ? item.history : null,
      significance: item.significance ? item.significance : null,
    };

    this.sidebar = {
      sidebarcontent: item.sidebarcontent ? item.sidebarcontent : null,
      sidepanelcontenttop: item.sidepanelcontenttop
        ? item.sidepanelcontenttop
        : null,
      type: item.type ? item.type.title : null,
      creationDate: item.itemCreationDate ? item.itemCreationDate : null,
      destructionDate: item.itemDestructionDate
        ? item.itemDestructionDate
        : null,
      currentLocation: item.currentLocation
        ? this.formatMention(item.currentLocation)
        : null,
      currentHolder: item.currentHolder
        ? this.formatMention(item.currentHolder)
        : null,
      subtypeOrModel: item.type ? item.type.slug : null,
      manufacturer: item.manufacturer
        ? this.formatMention(item.manufacturer)
        : null,
      creator: item.creator ? this.formatMention(item.creator) : null,
      relatedTechnologies: item.technologies
        ? this.formatMentions(item.technologies)
        : null,
      relatedEthnicities: item.ethnicities
        ? this.formatMentions(item.ethnicities)
        : null,
      owningOrganisation: item.organization
        ? this.formatMention(item.organization)
        : null,
      relatedCondition: item.condition
        ? this.formatMention(item.condition)
        : null,
      rarity: item.rarity ? item.rarity : null,
      weight: item.weight ? item.weight : null,
      dimensions: item.dimensions ? item.dimensions : null,
      basePrice: item.price ? item.price : null,
      rawMaterialsAndComponents: item.rawMaterials ? item.rawMaterials : null,
      tools: item.tooling ? item.tooling : null,
      relatedMyths: item.myths ? this.formatMentions(item.myths) : null,
      sidepanelcontent: item.sidepanelcontent ? item.sidepanelcontent : null,
      sidebarcontentbottom: item.sidebarcontentbottom
        ? item.sidebarcontentbottom
        : null,
    };
  }
}

export const ItemTypes: ItemType[] = [
  {
    id: "0995468e-75e6-4704-b942-68c2644ab8a0",
    title: "Ammunition",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "bd734775-7908-4edc-b687-8bcf1e6f4790",
    title: "Armor",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "55f4be8a-159f-4cc7-953f-10f8c4d85497",
    title: "Art",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "8e786a34-1768-46a4-ac6b-a32233f6146f",
    title: "Award",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "67e01c76-6d2a-4961-9b5c-3c5a0f5a6316",
    title: "Bionic",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "209eaa23-543a-4e41-bfdb-971599b2ccf2",
    title: "Book / Document",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "5cc45624-ad76-4cc0-bec2-ee7fc121bdf0",
    title: "Clothing / Accessory",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "1962aa54-a311-4805-8e83-1365773eddf3",
    title: "Communication",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "57507a47-b1ba-4f1c-a36c-fcb84fba6a37",
    title: "Component",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "9647520c-a6b1-4b2c-8058-35f90f305744",
    title: "Compound",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "fa353a40-437d-4a18-b519-324c20f9aa7b",
    title: "Consumable, Food / Drink",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "7f4bcaa9-7f5c-4b92-904a-ade5717f8995",
    title: "Consumable, Magical",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "42d5a30b-8155-497a-95ec-0f0ccbc7b0d4",
    title: "Currency & Deeds",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "8427094f-ca14-459b-8bcf-ea61f97c7e6d",
    title: "Cybernetic",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "92524675-c509-4257-9a7b-0a390ebf31d1",
    title: "Drug / Narcotic / Medicine",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "cae44ada-f927-4fed-9016-3721162e8175",
    title: "Electronic / Cybernetic",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "11c5796c-908d-4a71-8813-c276735bc03a",
    title: "Element, Chemical",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "250fbea9-5ddd-40a2-8732-917a78815c70",
    title: "Furniture",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "8617329f-c78c-499b-81b7-820fce73fc23",
    title: "Jewelry / Valuable",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "20e85f5e-4335-4b57-980e-f6fd91f7a669",
    title: "Magical",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "3906efab-c174-475d-91e1-83a75d766c55",
    title: "Mechanical",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "d3f24381-fc59-4f0e-ab99-c26d5fb7a502",
    title: "Medical",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "745d2d1f-9a91-469f-b1dc-c2137d957eea",
    title: "Miscellaneous",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "fda25c90-9083-45f9-a429-3e50bd06e044",
    title: "Musical Instrument",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "698e945e-082c-456f-b552-cfbdc9ef38ef",
    title: "Navigational Aid / Instrument",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "b5e368dd-6274-486d-87aa-91b61fc2e733",
    title: "Pataphysical",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "0ead559a-9c0b-45fd-82e6-32243eee44c4",
    title: "Power Storage / Generator",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "957b7ff0-224d-4176-8c59-7fb45e8fbfc1",
    title: "Raw Material",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "c90c5c76-9bd0-4cf4-9106-c7488e30f231",
    title: "Religious / Ritualistic",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "aedbda54-164e-42a6-9963-57de147b5a2e",
    title: "Robotic",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "2b41a5b8-ca53-4029-af99-fe9ce242228b",
    title: "Sensory / Aid",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "3910423c-2750-4fa3-85f9-3f06a0484f31",
    title: "Service",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "dc48c735-15e2-4056-a19a-6bec62db24d5",
    title: "Storage",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "729d5451-31de-47e0-b948-5e2609bd985f",
    title: "Survival",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "4ebc2816-0e2e-475e-939e-eec77d23faf4",
    title: "Tool",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "4812b807-b0f1-430c-b028-8a4ff08a594b",
    title: "Toy",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "b0689542-6e0b-4fa8-bfc1-50982adde213",
    title: "Trade/Manufactured good",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "777609ab-53c0-40fc-b687-22698076c640",
    title: "Trap",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "1d3575fa-485c-445a-b1c2-ddaa732c9b72",
    title: "Trophy",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "de0c4b91-bdf7-4c4b-ac13-4a8391b3647a",
    title: "Unique Artifact",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "f6af0b86-a1d5-4fca-b566-f513499c34dd",
    title: "Weapon, Explosive",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "761d4e54-515d-4b81-b910-371515eb8337",
    title: "Weapon, Melee",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "6fbc99de-e950-4a42-b52a-b1a231b9213f",
    title: "Weapon, Other",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
  {
    id: "9c3c14fc-7d7a-4e97-9667-cb5d067f7c5e",
    title: "Weapon, Ranged",
    slug: null,
    state: null,
    isWip: null,
    isDraft: null,
    entityClass: "ItemType",
    icon: null,
    url: null,
    subscribergroups: [],
    folderId: null,
    tags: null,
    updateDate: null,
  },
];
