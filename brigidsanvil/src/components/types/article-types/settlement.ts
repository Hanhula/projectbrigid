import { Article, ArticleDisplay } from "../article";
import { Item } from "./item";
import { Location } from "./location";
import { Organisation } from "./organisation";
import { Person } from "./person";
import { Rank } from "./rank";
import { Vehicle } from "./vehicle";

type SettlementType = {
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

export type Settlement = Article & {
  alternativename: string | null;
  geography: string | null;
  naturalresources: string | null;
  population: string | null;
  areaSize: null;
  demographics: string | null;
  demonym: string | null;
  defences: string | null;
  infrastructure: string | null;
  guilds: string | null;
  history: string | null;
  tourism: string | null;
  industry: string | null;
  architecture: string | null;
  government: string | null;
  assets: string | null;
  constructed: string | null;
  ruined: string | null;
  florafauna: string | null;
  ecosystem: string | null;
  ecosystemCycles: string | null;
  localizedPhenomena: string | null;
  climate: string | null;
  alterations: string | null;
  purpose: string | null;
  design: string | null;
  entries: string | null;
  denizens: Person[] | null;
  valuables: Item[] | null;
  hazards: string | null;
  effects: string | null;
  sensory: string | null;
  properties: string | null;
  contents: string | null;
  pointOfInterest: string | null;
  district: string | null;
  parent: Location;
  type: SettlementType;
  person: Person;
  vehicle: Vehicle;
  rank: Rank;
  organization: Organisation;
  founders: Person[];
  additionalRulers: Person[];
};

export class SettlementDisplay extends ArticleDisplay {
  body: {
    content: string | null;
    demographics: string | null;
    government: string | null;
    defences: string | null;
    industryAndTrade: string | null;
    infrastructure: string | null;
    districts: string | null;
    assets: string | null;
    guildsAndFactions: string | null;
    tourism: string | null;
    architecture: string | null;
    geography: string | null;
    climate: string | null;
    naturalResources: string | null;
  };

  sidebar: {
    sidebarcontent: string | null;
    sidepanelcontenttop: string | null;
    ruinedSettlement: string | null;
    foundingDate: string | null;
    founders: string | null;
    alternativeNames: string | null;
    type: string | null;
    population: string | null;
    inhabitantDemonym: string | null;
    locationUnder: string | null;
    ownerOrRuler: string | null;
    additionalRulersOrOwners: string | null;
    rulingOrOwningRank: string | null;
    owningOrganisation: string | null;
    sidepanelcontent: string | null;
    sidebarcontentbottom: string | null;
  };

  constructor(settlement: Settlement) {
    super(settlement);

    this.body = {
      content: settlement.content ? settlement.content : null,
      demographics: settlement.demographics ? settlement.demographics : null,
      government: settlement.government ? settlement.government : null,
      defences: settlement.defences ? settlement.defences : null,
      industryAndTrade: settlement.industry ? settlement.industry : null,
      infrastructure: settlement.infrastructure ? settlement.infrastructure : null,
      districts: settlement.district ? settlement.district : null,
      assets: settlement.assets ? settlement.assets : null,
      guildsAndFactions: settlement.guilds ? settlement.guilds : null,
      tourism: settlement.tourism ? settlement.tourism : null,
      architecture: settlement.architecture ? settlement.architecture : null,
      geography: settlement.geography ? settlement.geography : null,
      climate: settlement.climate ? settlement.climate : null,
      naturalResources: settlement.naturalresources ? settlement.naturalresources : null,    
    };

    this.sidebar = {
      sidebarcontent: settlement.sidebarcontent ? settlement.sidebarcontent : null,
      sidepanelcontenttop: settlement.sidepanelcontenttop
        ? settlement.sidepanelcontenttop
        : null,
        ruinedSettlement: settlement.ruined ? settlement.ruined : null,
        foundingDate: settlement.constructed ? settlement.constructed : null,
        founders: settlement.founders ? this.formatMentions(settlement.founders) : null,
        alternativeNames: settlement.alternativename ? settlement.alternativename : null,
        type: settlement.type.title ? settlement.type.title : null,
        population: settlement.population ? settlement.population : null,
        inhabitantDemonym: settlement.demonym ? settlement.demonym : null,
        locationUnder: settlement.parent ? this.formatMention(settlement.parent) : null,
        ownerOrRuler: settlement.person ? this.formatMention(settlement.person) : null,
        additionalRulersOrOwners: settlement.additionalRulers ? this.formatMentions(settlement.additionalRulers) : null,
        rulingOrOwningRank: settlement.rank ? this.formatMention(settlement.rank) : null,
        owningOrganisation: settlement.organization ? this.formatMention(settlement.organization) : null,
       
      sidepanelcontent: settlement.sidepanelcontent ? settlement.sidepanelcontent : null,
      sidebarcontentbottom: settlement.sidebarcontentbottom
        ? settlement.sidebarcontentbottom
        : null,
    };
  }
}
