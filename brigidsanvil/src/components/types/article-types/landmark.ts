import { Article, ArticleDisplay } from "../article";
import { Organisation } from "./organisation";
import { Person } from "./person";
import { Rank } from "./rank";
import { Vehicle } from "./vehicle";

export type LandmarkType = {
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

export type Landmark = Article & {
  alternativename: string | null;
  geography: string | null;
  naturalresources: string | null;
  population: string | null;
  areaSize: string | null;
  demographics: string | null;
  demonym: string | null;
  defences: string | null;
  infrastructure: string | null;
  guilds: string | null;
  history: string | null;
  tourism: string | null;
  industry: string | null;
  architecture: string;
  government: string | null;
  assets: string | null;
  locationTemplateType: string | null;
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
  denizens: string | null;
  valuables: string | null;
  hazards: string | null;
  effects: string | null;
  sensory: string | null;
  properties: string | null;
  contents: string | null;
  pointOfInterest: string | null;
  district: string | null;
  parent: Landmark | null;
  type: LandmarkType | null;
  person: Person | null;
  vehicle: Vehicle | null;
  rank: Rank | null;
  organization: Organisation | null;
  additionalRulers: Person[] | null;
  contenders: Organisation[] | null;
  connectedRooms: Landmark[] | null;
};

export class LandmarkDisplay extends ArticleDisplay {
  body: {
    content: string | null;
    purposeOrFunction: string | null;
    design: string | null;
    entries: string | null;
    sensoryAndAppearance: string | null;
    denizens: string | null;
    contentsAndFurnishings: string | null;
    valuables: string | null;
    hazardsAndTraps: string | null;
    specialProperties: string | null;
    alterations: string | null;
    architecture: string | null;
    defences: string | null;
    history: string | null;
    tourism: string | null;
  };

  sidebar: {
    sidebarcontent: string | null;
    sidepanelcontenttop: string | null;
    ruinedStructure: string | null;
    foundingDate: string | null;
    alternativeNames: string | null;
    type: string | null;
    parentLocation: string | null;
    environmentalEffects: string | null;
    connectedRooms: string | null;
    owner: string | null;
    additionalRulersOrOwners: string | null;
    rulingOrOwningRank: string | null;
    compartmentOfVehicle: string | null;
    owningOrganisation: string | null;
    contestedBy: string | null;
    sidepanelcontent: string | null;
    sidebarcontentbottom: string | null;
  };

  constructor(landmark: Landmark) {
    super(landmark);

    this.body = {
      content: landmark.content ? landmark.content : null,
      purposeOrFunction: landmark.purpose ? landmark.purpose : null,
      design: landmark.design ? landmark.design : null,
      entries: landmark.entries ? landmark.entries : null,
      sensoryAndAppearance: landmark.sensory ? landmark.sensory : null,
      denizens: landmark.denizens ? landmark.denizens : null,
      contentsAndFurnishings: landmark.contents ? landmark.contents : null,
      valuables: landmark.valuables ? landmark.valuables : null,
      hazardsAndTraps: landmark.hazards ? landmark.hazards : null,
      specialProperties: landmark.properties ? landmark.properties : null,
      alterations: landmark.alterations ? landmark.alterations : null,
      architecture: landmark.architecture ? landmark.architecture : null,
      defences: landmark.defences ? landmark.defences : null,
      history: landmark.history ? landmark.history : null,
      tourism: landmark.tourism ? landmark.tourism : null,
    };

    this.sidebar = {
      sidebarcontent: landmark.sidebarcontent ? landmark.sidebarcontent : null,
      sidepanelcontenttop: landmark.sidepanelcontenttop
        ? landmark.sidepanelcontenttop
        : null,
      ruinedStructure: landmark.ruined ? landmark.ruined : null,
      foundingDate: landmark.constructed ? landmark.constructed : null,
      alternativeNames: landmark.alternativename
        ? landmark.alternativename
        : null,
      type: landmark.type ? landmark.type.title : null,
      parentLocation: landmark.parent ? landmark.parent.title : null,
      environmentalEffects: landmark.ecosystemCycles
        ? landmark.ecosystemCycles
        : null,
      connectedRooms: landmark.connectedRooms
        ? this.formatMentions(landmark.connectedRooms)
        : null,
      owner: landmark.person ? this.formatMention(landmark.person) : null,
      additionalRulersOrOwners: landmark.additionalRulers
        ? this.formatMentions(landmark.additionalRulers)
        : null,
      rulingOrOwningRank: landmark.rank
        ? this.formatMention(landmark.rank)
        : null,
      compartmentOfVehicle: landmark.vehicle
        ? this.formatMention(landmark.vehicle)
        : null,
      owningOrganisation: landmark.organization
        ? this.formatMention(landmark.organization)
        : null,
      contestedBy: landmark.contenders
        ? this.formatMentions(landmark.contenders)
        : null,
      sidepanelcontent: landmark.sidepanelcontent
        ? landmark.sidepanelcontent
        : null,
      sidebarcontentbottom: landmark.sidebarcontentbottom
        ? landmark.sidebarcontentbottom
        : null,
    };
  }
}
