import { Article, ArticleDisplay } from "../article";
import { Ethnicity } from "./ethnicity";
import { Location } from "./location";
import { Organisation } from "./organisation";

export type Ritual = Article & {
  components: string | null;
  history: string | null;
  execution: string | null;
  participants: string | null;
  observance: string | null;
  location: Location | null;
  organizations: Organisation[] | null;
  importantLocations: Location[] | null;
  ethnicities: Ethnicity[] | null;
};

export class RitualDisplay extends ArticleDisplay {
  body: {
    content: string | null;
    history: string | null;
    execution: string | null;
    participants: string | null;
    observance: string | null;
  };

  sidebar: {
    sidebarcontent: string | null;
    sidepanelcontenttop: string | null;
    primaryRelatedLocation: string | null;
    importantLocations: string | null;
    relatedOrganisations: string | null;
    relatedEthnicities: string | null;
    sidepanelcontent: string | null;
    sidebarcontentbottom: string | null;
  };

  constructor(ritual: Ritual) {
    super(ritual);

    this.body = {
      content: ritual.content ? ritual.content : null,
      history: ritual.history ? ritual.history : null,
      execution: ritual.execution ? ritual.execution : null,
      participants: ritual.participants ? ritual.participants : null,
      observance: ritual.observance ? ritual.observance : null,
    };

    this.sidebar = {
      sidebarcontent: ritual.sidebarcontent ? ritual.sidebarcontent : null,
      sidepanelcontenttop: ritual.sidepanelcontenttop
        ? ritual.sidepanelcontenttop
        : null,
      primaryRelatedLocation: ritual.location
        ? this.formatMention(ritual.location)
        : null,
      importantLocations: ritual.importantLocations
        ? this.formatMentions(ritual.importantLocations)
        : null,
      relatedOrganisations: ritual.organizations
        ? this.formatMentions(ritual.organizations)
        : null,
      relatedEthnicities: ritual.ethnicities
        ? this.formatMentions(ritual.ethnicities)
        : null,
      sidepanelcontent: ritual.sidepanelcontent
        ? ritual.sidepanelcontent
        : null,
      sidebarcontentbottom: ritual.sidebarcontentbottom
        ? ritual.sidebarcontentbottom
        : null,
    };
  }
}
