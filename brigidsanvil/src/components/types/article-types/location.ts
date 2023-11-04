import { Article, ArticleDisplay } from "../article";
import { Document } from "./document";
import { Ethnicity } from "./ethnicity";
import { Item } from "./item";
import { Landmark } from "./landmark";
import { Material } from "./material";
import { MilitaryConflict } from "./militaryconflict";
import { Myth } from "./myth";
import { Organisation } from "./organisation";
import { Person } from "./person";
import { Plot } from "./plot";
import { Profession } from "./profession";
import { Rank } from "./rank";
import { Report } from "./report";
import { Ritual } from "./ritual";
import { Species } from "./species";
import { Vehicle } from "./vehicle";

export type Location = Article & {
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
  architecture: string | null;
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
  children: Location[] | null;
  type: LocationType;
  rituals: Ritual[];
  items: Item[];
  documents: Document[];
  claimedCapitals: Organisation[];
  includedOrganizations: Organisation[];
  reportprimarylocations: Report[];
  conflicts: MilitaryConflict[];
  vehiclesPresent: Vehicle[] | null;
  person: Person | null;
  parent: Location | null;
  vehicle: Vehicle[] | null;
  rank: Rank | null;
  organization: Organisation | null;
  additionalRulers: Person[] | null;
  contenders: Organisation[] | null;
  rooms: Landmark[] | null;
  materials: Material[] | null;
  ranks: Rank[] | null;
  myths: Myth[] | null;
  plots: Plot[] | null;
  professions: Profession[] | null;
  ethnicities: Ethnicity[] | null;
  species: Species[] | null;
};

type LocationType = {
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

export class LocationDisplay extends ArticleDisplay {
  body: {
    content: string | null;
    geography: string | null;
    ecosystem: string | null;
    ecosystemCycles: string | null;
    localisedPhenomena: string | null;
    climate: string | null;
    faunaAndFlora: string | null;
    naturalResources: string | null;
    history: string | null;
    tourism: string | null;
  };

  sidebar: {
    sidebarcontent: string | null;
    sidepanelcontenttop: string | null;
    alternativeNames: string | null;
    type: string | null;
    vehiclesPresent: string | null;
    locationUnder: string | null;
    includedLocations: string | null;
    includedOrganisations: string | null;
    ownerOrRuler: string | null;
    additionalOwnersOrRulers: string | null;
    rulingOrOwningRank: string | null;
    owningOrganisation: string | null;
    relatedEthnicities: string | null;
    contestedBy: string | null;
    primaryRelatedTradition: string | null;
    primaryRelatedReports: string | null;
    inhabitingSpecies: string | null;
    relatedMyths: string | null;
    relatedPlots: string | null;
    relatedProfessions: string | null;
    relatedMaterials: string | null;
    sidepanelcontent: string | null;
    sidebarcontentbottom: string | null;
  };

  constructor(location: Location) {
    super(location);

    this.body = {
      content: location.content ? location.content : null,
      geography: location.geography ? location.geography : null,
      ecosystem: location.ecosystem ? location.ecosystem : null,
      ecosystemCycles: location.ecosystemCycles ? location.ecosystemCycles : null,
      localisedPhenomena: location.localizedPhenomena ? location.localizedPhenomena : null,
      climate: location.climate ? location.climate : null,
      faunaAndFlora: location.florafauna ? location.florafauna : null,
      naturalResources: location.naturalresources ? location.naturalresources : null,
      history: location.history ? location.history : null,
      tourism: location.tourism ? location.tourism : null,
    };

    this.sidebar = {
      sidebarcontent: location.sidebarcontent ? location.sidebarcontent : null,
      sidepanelcontenttop: location.sidepanelcontenttop
        ? location.sidepanelcontenttop
        : null,
      alternativeNames: location.alternativename ? location.alternativename : null,
      type: location.type ? location.type.title : null,
      vehiclesPresent: location.vehiclesPresent ? this.formatMentions(location.vehiclesPresent) : null,
      locationUnder: location.parent ? this.formatMention(location.parent) : null,
      includedLocations: location.children ? this.formatMentions(location.children) : null,
      includedOrganisations: location.includedOrganizations ? this.formatMentions(location.includedOrganizations) : null,
      ownerOrRuler: location.person ? this.formatMention(location.person) : null,
      additionalOwnersOrRulers: location.additionalRulers ? this.formatMentions(location.additionalRulers) : null,
      rulingOrOwningRank: location.rank ? this.formatMention(location.rank) : null,
      owningOrganisation: location.organization ? this.formatMention(location.organization) : null,
      relatedEthnicities: location.ethnicities ? this.formatMentions(location.ethnicities) : null,
      contestedBy: location.contenders ? this.formatMentions(location.contenders) : null,
      primaryRelatedTradition: location.rituals ? this.formatMentions(location.rituals) : null,
      primaryRelatedReports: location.reportprimarylocations ? this.formatMentions(location.reportprimarylocations) : null,
      inhabitingSpecies: location.species ? this.formatMentions(location.species) : null,
      relatedMyths: location.myths ? this.formatMentions(location.myths) : null,
      relatedPlots: location.plots ? this.formatMentions(location.plots) : null,
      relatedProfessions: location.professions ? this.formatMentions(location.professions) : null,
      relatedMaterials: location.materials ? this.formatMentions(location.materials) : null,
      sidepanelcontent: location.sidepanelcontent ? location.sidepanelcontent : null,
      sidebarcontentbottom: location.sidebarcontentbottom
        ? location.sidebarcontentbottom
        : null,
    };
  }
}