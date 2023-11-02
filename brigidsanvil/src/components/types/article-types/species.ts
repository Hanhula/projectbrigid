import { Article, ArticleDisplay } from "../article";
import { Ethnicity } from "./ethnicity";
import { Location } from "./location";
import { Organisation } from "./organisation";
import { Person } from "./person";

export type Species = Article & {
  trinominal: string | null;
  ancenstry: string | null;
  lifespan: string | null;
  anatomy: string | null;
  perception: string | null;
  genetics: string | null;
  ecology: string | null;
  diet: string | null;
  domestication: string | null;
  uses: string | null;
  biocycle: string | null;
  growthrate: string | null;
  symbiotic: string | null;
  isSentient: boolean;
  isIntelligent: boolean;
  geographicalOrigin: string | null;
  averageIntelligence: string | null;
  averagePhysique: string | null;
  facialCharacteristics: string | null;
  skinHairColor: string | null;
  traits: string | null;
  averageHeight: string | null;
  averageWeight: string | null;
  averageLength: string | null;
  namingTraditions: string | null;
  firstnamesMale: string | null;
  firstnamesFemale: string | null;
  lastnames: string | null;
  majorReligions: string | null;
  majorOrganizations: string | null;
  beautyIdeals: string | null;
  genderIdeals: string | null;
  courtshipIdeals: string | null;
  relationshipsIdeals: string | null;
  technologicalLevel: string | null;
  languages: string | null;
  etiquette: string | null;
  dresscode: string | null;
  culture: string | null;
  customs: string | null;
  taboos: string | null;
  history: string | null;
  socialstructure: string | null;
  mythsAndLegends: string | null;
  historicalFigures: string | null;
  interspeciesRelations: string | null;
  isExtinct: boolean;
  conservation: string | null;
  behaviour: string | null;
  datasheet: string | null;
  discoverer: Person | null;
  locations: Location[];
  relatedOrganizations: Organisation[];
  ethnicities: Ethnicity[];
  parents: Species[];
};

export class SpeciesDisplay extends ArticleDisplay {
  body: {
    content: string | null;
    anatomy: string | null;
    biologicalTraits: string | null;
    geneticsAndReproduction: string | null;
    growthRateAndStages: string | null;
    ecologyAndHabits: string | null;
    dietaryNeedsAndHabits: string | null;
    biologicalCycle: string | null;
    behaviour: string | null;
    socialStructure: string | null;
    domestication: string | null;
    usesProductsAndExploitation: string | null;
    facialCharacteristics: string | null;
    geographicOriginAndDistribution: string | null;
    averageIntelligence: string | null;
    perceptionAndSensoryCapabilities: string | null;
    symbioticAndParasiticOrganisms: string | null;
    namingTraditions: string | null;
    majorOrganisations: string | null;
    beautyIdeals: string | null;
    genderIdeals: string | null;
    courtshipIdeals: string | null;
    relationshipIdeals: string | null;
    averageTechnologicalLevel: string | null;
    majorLanguageGroupsAndDialects: string | null;
    commonEtiquetteRules: string | null;
    commonDressCode: string | null;
    cultureAndCulturalHeritage: string | null;
    commonCustomsTraditionsAndRituals: string | null;
    commonTaboos: string | null;
    history: string | null;
    historicalFigures: string | null;
    commonMythsAndLegends: string | null;
    interspeciesRelationsAndAssumptions: string | null;
  };

  sidebar: {
    extinct: string | null;
    sidebarcontent: string | null;
    sidepanelcontenttop: string | null;
    geneticAncestors: string | null;
    scientificName: string | null;
    originAndOrAncestry: string | null;
    lifespan: string | null;
    conservationStatus: string | null;
    averageHeight: string | null;
    averageWeight: string | null;
    averageLength: string | null;
    averagePhysique: string | null;
    bodyTintColouringAndMarking: string | null;
    geographicDistribution: string | null;
    relatedOrganisations: string | null;
    relatedEthnicities: string | null;
    discoveredBy: string | null;
    sidepanelcontent: string | null;
    sidebarcontentbottom: string | null;
  };

  constructor(species: Species) {
    super(species);

    this.header = {
      subheading: species.subheading ? species.subheading : null,
    };

    this.body = {
      content: species.content ? species.content : null,
      anatomy: species.anatomy ? species.anatomy : null,
      biologicalTraits: species.traits ? species.traits : null,
      geneticsAndReproduction: species.genetics ? species.genetics : null,
      growthRateAndStages: species.growthrate ? species.growthrate : null,
      ecologyAndHabits: species.ecology ? species.ecology : null,
      dietaryNeedsAndHabits: species.diet ? species.diet : null,
      biologicalCycle: species.biocycle ? species.biocycle : null,
      behaviour: species.behaviour ? species.behaviour : null,
      socialStructure: species.socialstructure ? species.socialstructure : null,
      domestication: species.domestication ? species.domestication : null,
      usesProductsAndExploitation: species.uses ? species.uses : null,
      facialCharacteristics: species.facialCharacteristics ? species.facialCharacteristics : null,
      geographicOriginAndDistribution: species.geographicalOrigin ? species.geographicalOrigin : null,
      averageIntelligence: species.averageIntelligence ? species.averageIntelligence : null,
      perceptionAndSensoryCapabilities: species.perception ? species.perception : null,
      symbioticAndParasiticOrganisms: species.symbiotic ? species.symbiotic : null,
      namingTraditions: species.namingTraditions ? species.namingTraditions : null,
      majorOrganisations: species.majorOrganizations ? species.majorOrganizations : null,
      beautyIdeals: species.beautyIdeals ? species.beautyIdeals : null,
      genderIdeals: species.genderIdeals ? species.genderIdeals : null,
      courtshipIdeals: species.courtshipIdeals ? species.courtshipIdeals : null,
      relationshipIdeals: species.relationshipsIdeals ? species.relationshipsIdeals : null,
      averageTechnologicalLevel: species.technologicalLevel ? species.technologicalLevel : null,
      majorLanguageGroupsAndDialects: species.languages ? species.languages : null,
      commonEtiquetteRules: species.etiquette ? species.etiquette : null,
      commonDressCode: species.dresscode ? species.dresscode : null,
      cultureAndCulturalHeritage: species.culture ? species.culture : null,
      commonCustomsTraditionsAndRituals: species.customs ? species.customs : null,
      commonTaboos: species.taboos ? species.taboos : null,
      history: species.history ? species.history : null,
      historicalFigures: species.historicalFigures ? species.historicalFigures : null,
      commonMythsAndLegends: species.mythsAndLegends ? species.mythsAndLegends : null,
      interspeciesRelationsAndAssumptions: species.interspeciesRelations ? species.interspeciesRelations : null,
   
    };

    this.sidebar = {
      extinct: species.isExtinct ? "EXTINCT" : null,
      sidebarcontent: species.sidebarcontent ? species.sidebarcontent : null,
      sidepanelcontenttop: species.sidepanelcontenttop
        ? species.sidepanelcontenttop
        : null,
      geneticAncestors: species.parents ? this.formatMentions(species.parents) : null,
      scientificName: species.trinominal ? species.trinominal : null,
      originAndOrAncestry: species.ancenstry ? species.ancenstry : null,
      lifespan: species.lifespan ? species.lifespan : null,
      conservationStatus: species.conservation ? species.conservation : null,
      averageHeight: species.averageHeight ? species.averageHeight : null,
      averageWeight: species.averageWeight ? species.averageWeight : null,
      averageLength: species.averageLength ? species.averageLength : null,
      averagePhysique: species.averagePhysique ? species.averagePhysique : null,
      bodyTintColouringAndMarking: species.skinHairColor
        ? species.skinHairColor
        : null,
      geographicDistribution: species.locations
        ? this.formatMentions(species.locations)
        : null,
      relatedOrganisations: species.relatedOrganizations
        ? this.formatMentions(species.relatedOrganizations)
        : null,
      relatedEthnicities: species.ethnicities
        ? this.formatMentions(species.ethnicities)
        : null,
      discoveredBy: species.discoverer
        ? this.formatMention(species.discoverer)
        : null,
      sidepanelcontent: species.sidepanelcontent
        ? species.sidepanelcontent
        : null,
      sidebarcontentbottom: species.sidebarcontentbottom
        ? species.sidebarcontentbottom
        : null,
    };
  }
}
