import { Article, ArticleDisplay } from "../article";
import { Item } from "./item";
import { Location } from "./location";
import { Profession } from "./profession";
import { Species } from "./species";
import { Technology } from "./technology";

export type Material = Article & {
  history: string | null;
  type: string | null;
  discovery: string | null;
  useCommon: string | null;
  useCultural: string | null;
  useIndustrial: string | null;
  characteristics: string | null;
  properties: string | null;
  compounds: string | null;
  geo: string | null;
  origin: string | null;
  halflife: string | null;
  expiry: null;
  meltingpoint: string | null;
  freezingpoint: string | null;
  elementNumber: string | null;
  elementWeight: string | null;
  elementAbbreviation: string | null;
  density: string | null;
  commonState: string | null;
  taste: string | null;
  odor: string | null;
  colour: string | null;
  refinement: string | null;
  products: string | null;
  manufacturing: string | null;
  hazards: string | null;
  environment: string | null;
  reusability: string | null;
  value: string | null;
  rarity: string | null;
  market: string | null;
  storage: string | null;
  regulation: string | null;
  species: Species[] | null;
  locations: Location[] | null;
  items: Item[] | null;
  technologies: Technology[] | null;
  professions: Profession[] | null;
};

export class MaterialDisplay extends ArticleDisplay {
  body: {
    content: string | null;
    materialCharacteristics: string | null;
    physicalChemicalProperties: string | null;
    compounds: string | null;
    geologyAndGeography: string | null;
    originAndSource: string | null;
    lifeAndExpiration: string | null;
    history: string | null;
    discovery: string | null;
    everydayUse: string | null;
    culturalSignificanceAndUsage: string | null;
    industrialUse: string | null;
    refinement: string | null;
    manufacturingAndProducts: string | null;
    byproductsAndSideproducts: string | null;
    hazards: string | null;
    environmentalImpact: string | null;
    reusabilityAndRecycling: string | null;
    tradeAndMarket: string | null;
    storage: string | null;
    lawAndRegulation: string | null;
  };

  sidebar: {
    sidebarcontent: string | null;
    sidepanelcontenttop: string | null;
    elementNumber: string | null;
    elementAbbreviation: string | null;
    elementWeight: string | null;
    type: string | null;
    value: string | null;
    rarity: string | null;
    odour: string | null;
    taste: string | null;
    colour: string | null;
    boilingOrCondensationPoint: string | null;
    meltingOrFreezingPoint: string | null;
    density: string | null;
    commonState: string | null;
    relatedLocations: string | null;
    relatedSpecies: string | null;
    relatedItems: string | null;
    relatedTechnologies: string | null;
    relatedProfessions: string | null;
    sidepanelcontent: string | null;
    sidebarcontentbottom: string | null;
  };

  constructor(material: Material) {
    super(material);

    this.body = {
      content: material.content ? material.content : null,
      materialCharacteristics: material.characteristics
        ? material.characteristics
        : null,
      physicalChemicalProperties: material.properties
        ? material.properties
        : null,
      compounds: material.compounds ? material.compounds : null,
      geologyAndGeography: material.geo ? material.geo : null,
      originAndSource: material.origin ? material.origin : null,
      lifeAndExpiration: material.expiry ? material.expiry : null,
      history: material.history ? material.history : null,
      discovery: material.discovery ? material.discovery : null,
      everydayUse: material.useCommon ? material.useCommon : null,
      culturalSignificanceAndUsage: material.useCultural
        ? material.useCultural
        : null,
      industrialUse: material.useIndustrial ? material.useIndustrial : null,
      refinement: material.refinement ? material.refinement : null,
      manufacturingAndProducts: material.manufacturing
        ? material.manufacturing
        : null,
      byproductsAndSideproducts: material.products ? material.products : null,
      hazards: material.hazards ? material.hazards : null,
      environmentalImpact: material.environment ? material.environment : null,
      reusabilityAndRecycling: material.reusability
        ? material.reusability
        : null,
      tradeAndMarket: material.market ? material.market : null,
      storage: material.storage ? material.storage : null,
      lawAndRegulation: material.regulation ? material.regulation : null,
    };

    this.sidebar = {
      sidebarcontent: material.sidebarcontent ? material.sidebarcontent : null,
      sidepanelcontenttop: material.sidepanelcontenttop
        ? material.sidepanelcontenttop
        : null,
      elementNumber: material.elementNumber ? material.elementNumber : null,
      elementAbbreviation: material.elementAbbreviation
        ? material.elementAbbreviation
        : null,
      elementWeight: material.elementWeight ? material.elementWeight : null,
      type: material.type ? material.type : null,
      value: material.value ? material.value : null,
      rarity: material.rarity ? material.rarity : null,
      odour: material.odor ? material.odor : null,
      taste: material.taste ? material.taste : null,
      colour: material.colour ? material.colour : null,
      boilingOrCondensationPoint: material.meltingpoint
        ? material.meltingpoint
        : null,
      meltingOrFreezingPoint: material.freezingpoint
        ? material.freezingpoint
        : null,
      density: material.density ? material.density : null,
      commonState: material.commonState ? material.commonState : null,
      relatedLocations: material.locations
        ? this.formatMentions(material.locations)
        : null,
      relatedSpecies: material.species
        ? this.formatMentions(material.species)
        : null,
      relatedItems: material.items ? this.formatMentions(material.items) : null,
      relatedTechnologies: material.technologies
        ? this.formatMentions(material.technologies)
        : null,
      relatedProfessions: material.professions
        ? this.formatMentions(material.professions)
        : null,

      sidepanelcontent: material.sidepanelcontent
        ? material.sidepanelcontent
        : null,
      sidebarcontentbottom: material.sidebarcontentbottom
        ? material.sidebarcontentbottom
        : null,
    };
  }
}
