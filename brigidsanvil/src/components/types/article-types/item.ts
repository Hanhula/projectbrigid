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
}

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
        manufacturingProcess: item.manufacturingProcess ? item.manufacturingProcess : null,
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
        destructionDate: item.itemDestructionDate ? item.itemDestructionDate : null,
        currentLocation: item.currentLocation ? this.formatMention(item.currentLocation) : null,
        currentHolder: item.currentHolder ? this.formatMention(item.currentHolder) : null,
        subtypeOrModel: item.type ? item.type.slug : null,
        manufacturer: item.manufacturer ? this.formatMention(item.manufacturer) : null,
        creator: item.creator ? this.formatMention(item.creator) : null,
        relatedTechnologies: item.technologies ? this.formatMentions(item.technologies) : null,
        relatedEthnicities: item.ethnicities ? this.formatMentions(item.ethnicities) : null,
        owningOrganisation: item.organization ? this.formatMention(item.organization) : null,
        relatedCondition: item.condition ? this.formatMention(item.condition) : null,
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