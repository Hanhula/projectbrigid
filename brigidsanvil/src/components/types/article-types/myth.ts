import { Article, ArticleDisplay } from "../article";
import { Document } from "./document";
import { Ethnicity } from "./ethnicity";
import { Item } from "./item";
import { Location } from "./location";
import { Organisation } from "./organisation";
import { Person } from "./person";
import { Prose } from "./prose";
import { Species } from "./species";
import { Vehicle } from "./vehicle";

export type Myth = Article & {
  summary: string | null;
  historicalbasis: string | null;
  spread: string | null;
  variations: string | null;
  culturalreception: string | null;
  literature: string | null;
  art: string | null;
  dateofsetting: string | null;
  dateofrecording: string | null;
  telling: Prose | null;
  documents: Document[] | null;
  ethnicities: Ethnicity[] | null;
  species: Species[] | null;
  locations: Location[] | null;
  people: Person[] | null;
  organizations: Organisation[] | null;
  items: Item[] | null;
  vehicles: Vehicle[] | null;
};

export class MythDisplay extends ArticleDisplay {
  body: {
    content: string | null;
    summary: string | null;
    historicalBasis: string | null;
    spread: string | null;
    variationsAndMutation: string | null;
    culturalReception: string | null;
    inLiterature: string | null;
    inArt: string | null;
  };

  sidebar: {
    sidebarcontent: string | null;
    sidepanelcontenttop: string | null;
    dateOfFirstRecording: string | null;
    dateOfSetting: string | null;
    tellingOrProse: string | null;
    relatedEthnicities: string | null;
    relatedSpecies: string | null;
    relatedLocations: string | null;
    relatedPeople: string | null;
    relatedOrganisations: string | null;
    relatedItems: string | null;
    relatedVehicles: string | null;
    sidepanelcontent: string | null;
    sidebarcontentbottom: string | null;
  };

  constructor(myth: Myth) {
    super(myth);

    this.body = {
      content: myth.content ? myth.content : null,
      summary: myth.summary ? myth.summary : null,
      historicalBasis: myth.historicalbasis ? myth.historicalbasis : null,
      spread: myth.spread ? myth.spread : null,
      variationsAndMutation: myth.variations ? myth.variations : null,
      culturalReception: myth.culturalreception ? myth.culturalreception : null,
      inLiterature: myth.literature ? myth.literature : null,
      inArt: myth.art ? myth.art : null,
    };

    this.sidebar = {
      sidebarcontent: myth.sidebarcontent ? myth.sidebarcontent : null,
      sidepanelcontenttop: myth.sidepanelcontenttop
        ? myth.sidepanelcontenttop
        : null,
        dateOfFirstRecording: myth.dateofrecording ? myth.dateofrecording : null,
        dateOfSetting: myth.dateofsetting ? myth.dateofsetting : null,
        tellingOrProse: myth.telling ? this.formatMention(myth.telling) : null,
        relatedEthnicities: myth.ethnicities ? this.formatMentions(myth.ethnicities) : null,
        relatedSpecies: myth.species ? this.formatMentions(myth.species) : null,
        relatedLocations: myth.locations ? this.formatMentions(myth.locations) : null,
        relatedPeople: myth.people ? this.formatMentions(myth.people) : null,
        relatedOrganisations: myth.organizations ? this.formatMentions(myth.organizations) : null,
        relatedItems: myth.items ? this.formatMentions(myth.items): null,
        relatedVehicles: myth.vehicles ? this.formatMentions(myth.vehicles) : null,
        
      sidepanelcontent: myth.sidepanelcontent ? myth.sidepanelcontent : null,
      sidebarcontentbottom: myth.sidebarcontentbottom
        ? myth.sidebarcontentbottom
        : null,
    };
  }
}
