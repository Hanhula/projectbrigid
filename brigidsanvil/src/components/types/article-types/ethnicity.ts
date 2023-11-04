import { Article, ArticleDisplay } from "../article";
import { Location } from "./location";
import { Myth } from "./myth";
import { Organisation } from "./organisation";
import { Species } from "./species";

export type Ethnicity = Article & {
  malenames: string | null;
  femalenames: string | null;
  familynames: string | null;
  unisexnames: string | null;
  othernames: string | null;
  majorReligions: string | null;
  majorOrganizations: string | null;
  beautyIdeals: string | null;
  genderIdeals: string | null;
  courtshipIdeals: string | null;
  relationshipsIdeals: string | null;
  technologicalLevel: string | null;
  languages: string | null;
  birthrights: string | null;
  comingofagerights: string | null;
  etiquette: string | null;
  dresscode: string | null;
  culture: string | null;
  customs: string | null;
  sharedValues: string | null;
  funeraryCustoms: string | null;
  taboos: string | null;
  mythsAndLegends: string | null;
  historicalFigures: string | null;
  art: string | null;
  foodsAndCuisine: string | null;
  parents: Ethnicity[] | null;
  locations: Location[] | null;
  myths: Myth[] | null;
  organizations: Organisation[] | null;
  species: Species[] | null;
};

export class EthnicityDisplay extends ArticleDisplay {
  body: {
    content: string | null;
    feminineNames: string | null;
    masculineNames: string | null;
    unisexNames: string | null;
    familyNames: string | null;
    otherNames: string | null;
    majorLanguageGroupsAndDialects: string | null;
    cultureAndCulturalHeritage: string | null;
    sharedCustomaryCodesAndValues: string | null;
    commonEtiquetteRules: string | null;
    commonDressCode: string | null;
    artAndArchitecture: string | null;
    foodsAndCuisine: string | null;
    commonCustomsAndTraditionsAndRituals: string | null;
    birthAndBaptismalRites: string | null;
    comingOfAgeRites: string | null;
    funeraryAndMemorialCustoms: string | null;
    beautyIdeals: string | null;
    genderIdeals: string | null;
    courtshipIdeals: string | null;
    relationshipIdeals: string | null;
    majorOrganisations: string | null;
  };

  sidebar: {
    sidebarcontent: string | null;
    sidepanelcontenttop: string | null;
    parentEthnicities: string | null;
    encompassedSpecies: string | null;
    relatedOrganisations: string | null;
    relatedMyths: string | null;
    relatedLocations: string | null;
    sidepanelcontent: string | null;
    sidebarcontentbottom: string | null;
  };

  constructor(ethnicity: Ethnicity) {
    super(ethnicity);

    this.body = {
      content: ethnicity.content ? ethnicity.content : null,
      feminineNames: ethnicity.femalenames ? ethnicity.femalenames : null,
      masculineNames: ethnicity.malenames ? ethnicity.malenames : null,
      unisexNames: ethnicity.unisexnames ? ethnicity.unisexnames : null,
      familyNames: ethnicity.familynames ? ethnicity.familynames : null,
      otherNames: ethnicity.othernames ? ethnicity.othernames : null,
      majorLanguageGroupsAndDialects: ethnicity.languages
        ? ethnicity.languages
        : null,
      cultureAndCulturalHeritage: ethnicity.culture ? ethnicity.culture : null,
      sharedCustomaryCodesAndValues: ethnicity.sharedValues
        ? ethnicity.sharedValues
        : null,
      commonEtiquetteRules: ethnicity.etiquette ? ethnicity.etiquette : null,
      commonDressCode: ethnicity.dresscode ? ethnicity.dresscode : null,
      artAndArchitecture: ethnicity.art ? ethnicity.art : null,
      foodsAndCuisine: ethnicity.foodsAndCuisine
        ? ethnicity.foodsAndCuisine
        : null,
      commonCustomsAndTraditionsAndRituals: ethnicity.customs
        ? ethnicity.customs
        : null,
      birthAndBaptismalRites: ethnicity.birthrights
        ? ethnicity.birthrights
        : null,
      comingOfAgeRites: ethnicity.comingofagerights
        ? ethnicity.comingofagerights
        : null,
      funeraryAndMemorialCustoms: ethnicity.funeraryCustoms
        ? ethnicity.funeraryCustoms
        : null,
      beautyIdeals: ethnicity.beautyIdeals ? ethnicity.beautyIdeals : null,
      genderIdeals: ethnicity.genderIdeals ? ethnicity.genderIdeals : null,
      courtshipIdeals: ethnicity.courtshipIdeals ? ethnicity.courtshipIdeals : null,
      relationshipIdeals: ethnicity.relationshipsIdeals ? ethnicity.relationshipsIdeals : null,
      majorOrganisations: ethnicity.majorOrganizations ? ethnicity.majorOrganizations : null,
    };

    this.sidebar = {
      sidebarcontent: ethnicity.sidebarcontent
        ? ethnicity.sidebarcontent
        : null,
      sidepanelcontenttop: ethnicity.sidepanelcontenttop
        ? ethnicity.sidepanelcontenttop
        : null,
        parentEthnicities: ethnicity.parents ? this.formatMentions(ethnicity.parents) : null,
        encompassedSpecies: ethnicity.species ? this.formatMentions(ethnicity.species) : null,
        relatedOrganisations: ethnicity.organizations ? this.formatMentions(ethnicity.organizations) : null,
        relatedMyths: ethnicity.myths ? this.formatMentions(ethnicity.myths) : null,
        relatedLocations: ethnicity.locations ? this.formatMentions(ethnicity.locations) : null,
      sidepanelcontent: ethnicity.sidepanelcontent
        ? ethnicity.sidepanelcontent
        : null,
      sidebarcontentbottom: ethnicity.sidebarcontentbottom
        ? ethnicity.sidebarcontentbottom
        : null,
    };
  }
}
