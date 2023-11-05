import { Article, ArticleTypes } from "@/components/types/article";
import { Condition } from "@/components/types/article-types/condition";
import { Document } from "@/components/types/article-types/document";
import { Ethnicity } from "@/components/types/article-types/ethnicity";
import { Formation } from "@/components/types/article-types/formation";
import { Item } from "@/components/types/article-types/item";
import { Landmark } from "@/components/types/article-types/landmark";
import { Language } from "@/components/types/article-types/language";
import { Law } from "@/components/types/article-types/law";
import { Location } from "@/components/types/article-types/location";
import { Material } from "@/components/types/article-types/material";
import { MilitaryConflict } from "@/components/types/article-types/militaryconflict";
import { Myth } from "@/components/types/article-types/myth";
import { Organisation } from "@/components/types/article-types/organisation";
import { Person } from "@/components/types/article-types/person";
import { Plot } from "@/components/types/article-types/plot";
import { Profession } from "@/components/types/article-types/profession";
import { Prose } from "@/components/types/article-types/prose";
import { Rank } from "@/components/types/article-types/rank";
import { Report } from "@/components/types/article-types/report";
import { Settlement } from "@/components/types/article-types/settlement";
import { Species } from "@/components/types/article-types/species";
import { Spell } from "@/components/types/article-types/spell";
import { Technology } from "@/components/types/article-types/technology";
import { Vehicle } from "@/components/types/article-types/vehicle";

export const searchableFields = [
  // Article
  "pronunciation",
  "snippet",
  "seeded",
  "sidebarcontent",
  "sidepanelcontenttop",
  "sidepanelcontent",
  "sidebarcontentbottom",
  "footnotes",
  "fullfooter",
  "authornotes",
  "scrapbook",
  "credits",
  // Condition
  "causes",
  "transmissionvectors",
  "prognosis",
  "symptoms",
  "treatment",
  "sequela",
  "affectedgroups",
  "prevention",
  "epidemiology",
  "history",
  "reception",
  "hosts",
  "type",
  "origin",
  "rarity",
  "cycle",
  "children",
  "parent",
  "species",
  // Document
  "contents",
  "background",
  "caveats",
  "clauses",
  "legality",
  "term",
  "publicity",
  "medium",
  "textreferences",
  "authoringDate",
  "ratificationDate",
  "expirationDate",
  "legacy",
  "purpose",
  "publicreaction",
  "myth",
  "relatedlocation",
  "documentauthors",
  "signatorycharacters",
  "signatoryorganizations",
  // Ethnicity
  "malenames",
  "femalenames",
  "familynames",
  "unisexnames",
  "othernames",
  "majorReligions",
  "majorOrganizations",
  "beautyIdeals",
  "genderIdeals",
  "courtshipIdeals",
  "relationshipsIdeals",
  "technologicalLevel",
  "languages",
  "birthrights",
  "comingofagerights",
  "etiquette",
  "dresscode",
  "culture",
  "customs",
  "sharedValues",
  "funeraryCustoms",
  "taboos",
  "mythsAndLegends",
  "historicalFigures",
  "art",
  "foodsAndCuisine",
  "parents",
  "locations",
  "myths",
  "organizations",
  // Formation
  "equipment",
  "manpower",
  "weaponry",
  "vehicles",
  "structure",
  "training",
  "tactics",
  "logistics",
  "support",
  "upkeep",
  "recruitment",
  "foundingDate",
  "dissolutionDate",
  "loyalties",
  "trainingLevel",
  "veterancy",
  "units",
  "relatedorganizations",
  "relatedranks",
  // Item
  "manufacturingProcess",
  "rawMaterials",
  "itemCreationDate",
  "itemDestructionDate",
  "significance",
  "tooling",
  "mechanics",
  "weight",
  "dimensions",
  "price",
  "datasheet",
  "manufacturer",
  "creator",
  "organization",
  "condition",
  "currentLocation",
  "currentHolder",
  "technologies",
  "ethnicities",
  // Landmark
  "alternativename",
  "geography",
  "naturalresources",
  "population",
  "areaSize",
  "demographics",
  "demonym",
  "defences",
  "infrastructure",
  "guilds",
  "tourism",
  "industry",
  "architecture",
  "government",
  "assets",
  "locationTemplateType",
  "constructed",
  "ruined",
  "florafauna",
  "ecosystem",
  "ecosystemCycles",
  "localizedPhenomena",
  "climate",
  "alterations",
  "design",
  "entries",
  "denizens",
  "valuables",
  "hazards",
  "effects",
  "sensory",
  "properties",
  "pointOfInterest",
  "district",
  "person",
  "vehicle",
  "rank",
  "additionalRulers",
  "contenders",
  "connectedRooms",
  // Language
  "phrases",
  "alphabet",
  "geographicdistribution",
  "phonology",
  "morphology",
  "syntax",
  "vocabulary",
  "phonetics",
  "sentenceStructure",
  "adjectiveOrder",
  "structuralMarkers",
  "tenses",
  "dictionary",
  // Law
  "localization",
  "manifestation",
  "lawtype",
  // Location
  "rituals",
  "items",
  "documents",
  "claimedCapitals",
  "includedOrganizations",
  "reportprimarylocations",
  "conflicts",
  "vehiclesPresent",
  "rooms",
  "materials",
  "ranks",
  "plots",
  "professions",
  // Material
  "discovery",
  "useCommon",
  "useCultural",
  "useIndustrial",
  "characteristics",
  "compounds",
  "geo",
  "halflife",
  "expiry",
  "meltingpoint",
  "freezingpoint",
  "elementNumber",
  "elementWeight",
  "elementAbbreviation",
  "density",
  "commonState",
  "taste",
  "odor",
  "colour",
  "refinement",
  "products",
  "manufacturing",
  "environment",
  "reusability",
  "value",
  "market",
  "storage",
  "regulation",
  // Military Conflict
  "startingDate",
  "endingDate",
  "result",
  "battlefieldtype",
  "prelude",
  "deployment",
  "battlefield",
  "conditions",
  "engagement",
  "outcome",
  "aftermath",
  "literature",
  "technology",
  "location",
  "belligerents",
  "maps",
  // Myth
  "summary",
  "historicalbasis",
  "spread",
  "variations",
  "culturalreception",
  "dateofsetting",
  "dateofrecording",
  "telling",
  "people",
  // Organisation
  "motto",
  "publicAgenda",
  "alternativeNames",
  "disbandment",
  "governmentsystem",
  "powerstructure",
  "economicsystem",
  "legislative",
  "judicial",
  "executive",
  "gazetteer",
  "currency",
  "territory",
  "military",
  "religion",
  "foreignrelations",
  "laws",
  "imports",
  "exports",
  "agricultureAndIndustry",
  "tradeAndTransport",
  "education",
  "mythos",
  "origins",
  "cosmology",
  "tenets",
  "priesthood",
  "ethics",
  "divinepowers",
  "intrigue",
  "worship",
  "sects",
  "capital",
  "geographicLocation",
  "statereligion",
  "formation",
  "leader",
  "familyleader",
  "headofstate",
  "leadertitle",
  "headofgovernment",
  "rulingorganization",
  // Person
  "character",
  "portrait",
  "firstname",
  "lastname",
  "middlename",
  "maidenname",
  "nickname",
  "honorific",
  "dobDisplay",
  "dob",
  "dod",
  "dodDisplay",
  "age",
  "circumstancesBirth",
  "circumstancesDeath",
  "pronouns",
  "eyes",
  "hair",
  "skin",
  "height",
  "birthplace",
  "deathplace",
  "residence",
  "gender",
  "speciesDisplay",
  "physique",
  "bodyFeatures",
  "facialFeatures",
  "identifyingCharacteristics",
  "quirksPhysical",
  "perceptionPhysical",
  "specialAbilities",
  "clothing",
  "characterPrototype",
  "rpgAlignment",
  "deity",
  "currentstatus",
  "employment",
  "achievements",
  "failures",
  "mentalTraumas",
  "intellectualCharacteristics",
  "morality",
  "presentation",
  "sex",
  "sexuality",
  "genderidentity",
  "quotes",
  "motivation",
  "savviesIneptitudes",
  "likesDislikes",
  "virtues",
  "vices",
  "quirksPersonality",
  "hygiene",
  "relations",
  "family",
  "titles",
  "socialAptitude",
  "mannerisms",
  "hobbies",
  "speech",
  "wealth",
  "classification",
  "domains",
  "codes",
  "holysymbols",
  "goals",
  "holidays",
  "artifacts",
  "ggmtitle",
  "ggmjob",
  "ggmgoal",
  "ggmuse",
  "ggmgoaladditional",
  "ggmquirk",
  "ggmequipment",
  "ggmtype",
  "ggmsubtype",
  "ggmlikeability",
  "ggmcompetence",
  "ggmproactivity",
  "ggmcoolness",
  "ggmdesire",
  "ggmfear",
  "ggmwhyfollowing",
  "ggmbiography",
  "ggmdescfacial",
  "ggmdescspeech",
  "ggmdescbody",
  "ggmdescsight",
  "ggmdescsound",
  "ggmdescsmell",
  "ggmdesctouch",
  "ggmdescemotional",
  "ggmdeschappy",
  "ggmdescsad",
  "ggmdescangry",
  "reign",
  "parentBiological1",
  "parentBiological2",
  "parentAdopting1",
  "parentAdopting2",
  "parentSurrogate",
  "church",
  "realm",
  "familyorganization",
  "ethnicity",
  "otherethnicities",
  // Plot
  "scenes",
  "themes",
  "completionDate",
  "exposition",
  "conflict",
  "risingaction",
  "climax",
  "fallingaction",
  "resolution",
  "hooks",
  "stakes",
  "moralquandaries",
  "crueltricks",
  "redherrings",
  "protagonists",
  "allies",
  "neutrals",
  "competitors",
  "adversaries",
  "threats",
  "encounters",
  "pastevents",
  "ggmadventureobjective",
  "ggmadventuretheme",
  "ggmadventuretype",
  "ggmadventurefocustype",
  "ggmadventureadversarytype",
  "ggmadventureopening",
  "ggmadventurecoolness",
  "ggmadventureexpectation",
  "ggmadventuresenses",
  "ggmadventurelearnings",
  "ggmadventure1goal",
  "ggmadventure1enemy",
  "ggmadventure1situation",
  "ggmadventure2setup",
  "ggmadventure2attempt",
  "ggmadventure3false",
  "ggmadventure3showdown",
  "ggmadventurenames",
  "ggmadventurechanges",
  "relatedpeople",
  "relatedlocations",
  "reports",
  // Profession
  "qualifications",
  "tools",
  "workplace",
  "services",
  "pay",
  "benefits",
  "socialStatus",
  "demand",
  "relatedvehicles",
  "relatedtechnologies",
  "holders",
  "relatedmaterials",
  // Prose
  "prose",
  "sidenotes",
  // Rank
  "alternativeTitle",
  "lengthOfTerm",
  "duties",
  "requirements",
  "appointment",
  "heredity",
  "responsibilities",
  "culturalSignificance",
  "notableHolders",
  "removal",
  "equatesTo",
  "heraldry",
  "rankCreation",
  "rankStatus",
  "authoritySource",
  "formofaddress",
  "leaders",
  "firstholder",
  "currentHolders",
  "pastHolders",
  "rankformations",
  // Report
  "reportDate",
  "rewards",
  "quests",
  "interactions",
  "createdContent",
  "relatedReports",
  "reportNotes",
  "session",
  "campaign",
  "primarygeographicLocation",
  "secondarygeographicLocation",
  "relatedPersons",
  // Ritual
  "components",
  "execution",
  "participants",
  "observance",
  "importantLocations",
  // Settlement
  "founders",
  // Species
  "trinominal",
  "ancenstry",
  "lifespan",
  "anatomy",
  "perception",
  "genetics",
  "ecology",
  "diet",
  "domestication",
  "uses",
  "biocycle",
  "growthrate",
  "symbiotic",
  "isSentient",
  "isIntelligent",
  "geographicalOrigin",
  "averageIntelligence",
  "averagePhysique",
  "facialCharacteristics",
  "skinHairColor",
  "traits",
  "averageHeight",
  "averageWeight",
  "averageLength",
  "namingTraditions",
  "firstnamesMale",
  "firstnamesFemale",
  "lastnames",
  "socialstructure",
  "interspeciesRelations",
  "isExtinct",
  "conservation",
  "behaviour",
  "discoverer",
  "relatedOrganizations",
  // Spell
  "source",
  "effect",
  "sideeffects",
  "material",
  "gestures",
  "discipline",
  "school",
  "element",
  "duration",
  "castingtime",
  "spellrange",
  "level",
  "restrictions",
  // Technology
  "inventor",
  "access",
  "complexity",
  "utility",
  "socialImpact",
  "usedInVehicles",
  "relatedSpecies",
  // Vehicle
  "class",
  "designation",
  "length",
  "beam",
  "speed",
  "compliment",
  "power",
  "propulsion",
  "armament",
  "defenses",
  "communication",
  "sensors",
  "systems",
  "hangar",
  "cargocapacity",
  "vehicleCreationDate",
  "vehicleDecommissionDate",
  "vehicleDestructionDate",
  "owner",
  "vehicleLocation",
  "technologiesUsed",
];

export function createSearchObject(article: Article): any {
  const searchObject: any = {
    id: article.id,
    title: article.title,
    content: article.content,
    fullFooter: article.fullfooter,
  };

  searchObject.pronunciation = article.pronunciation || null;
searchObject.snippet = article.snippet || null;
searchObject.seeded = article.seeded || null;
searchObject.sidebarcontent = article.sidebarcontent || null;
searchObject.sidepanelcontenttop = article.sidepanelcontenttop || null;
searchObject.sidepanelcontent = article.sidepanelcontent || null;
searchObject.sidebarcontentbottom = article.sidebarcontentbottom || null;
searchObject.footnotes = article.footnotes || null;
searchObject.fullfooter = article.fullfooter || null;
searchObject.authornotes = article.authornotes || null;
searchObject.scrapbook = article.scrapbook || null;
searchObject.credits = article.credits || null;
searchObject.manuscripts = article.manuscripts && article.manuscripts.length > 0
  ? article.manuscripts.map(manuscript => manuscript.title).join(", ")
  : null;

searchObject.secrets = article.secrets && article.secrets.length > 0
  ? article.secrets.map(secret => secret.title).join(", ")
  : null;

  switch (article.entityClass) {
    case ArticleTypes.Condition:
      let condition: Condition = article as Condition;
      searchObject.causes = condition.causes ? condition.causes : null;
      searchObject.transmissionvectors = condition.transmissionvectors
        ? condition.transmissionvectors
        : null;
      searchObject.prognosis = condition.prognosis ? condition.prognosis : null;
      searchObject.symptoms = condition.symptoms ? condition.symptoms : null;
      searchObject.treatment = condition.treatment ? condition.treatment : null;
      searchObject.sequela = condition.sequela ? condition.sequela : null;
      searchObject.affectedgroups = condition.affectedgroups
        ? condition.affectedgroups
        : null;
      searchObject.prevention = condition.prevention
        ? condition.prevention
        : null;
      searchObject.epidemiology = condition.epidemiology
        ? condition.epidemiology
        : null;
      searchObject.history = condition.history ? condition.history : null;
      searchObject.reception = condition.reception ? condition.reception : null;
      searchObject.hosts = condition.hosts ? condition.hosts : null;
      searchObject.type = condition.type ? condition.type : null;
      searchObject.origin = condition.origin ? condition.origin : null;
      searchObject.rarity = condition.rarity ? condition.rarity : null;
      searchObject.cycle = condition.cycle ? condition.cycle : null;
      searchObject.children = condition.children
        ? condition.children.map((obj) => obj.title).join(", ")
        : null;
      searchObject.parent = condition.parent ? condition.parent.title : null;
      searchObject.species = condition.species
        ? condition.species.map((obj) => obj.title).join(", ")
        : null;
      break;
    case ArticleTypes.Document:
      let document: Document = article as Document;
      searchObject.contents = document.contents ? document.contents : null;
      searchObject.background = document.background
        ? document.background
        : null;
      searchObject.caveats = document.caveats ? document.caveats : null;
      searchObject.clauses = document.clauses ? document.clauses : null;
      searchObject.legality = document.legality ? document.legality : null;
      searchObject.term = document.term ? document.term : null;
      searchObject.publicity = document.publicity ? document.publicity : null;
      searchObject.medium = document.medium ? document.medium : null;
      searchObject.textreferences = document.textreferences
        ? document.textreferences
        : null;
      searchObject.authoringDate = document.authoringDate
        ? document.authoringDate
        : null;
      searchObject.ratificationDate = document.ratificationDate
        ? document.ratificationDate
        : null;
      searchObject.expirationDate = document.expirationDate
        ? document.expirationDate
        : null;
      searchObject.legacy = document.legacy ? document.legacy : null;
      searchObject.purpose = document.purpose ? document.purpose : null;
      searchObject.publicreaction = document.publicreaction
        ? document.publicreaction
        : null;
      searchObject.type = document.type ? document.type : null;
      searchObject.history = document.history ? document.history : null;
      searchObject.myth = document.myth ? document.myth.title : null;
      searchObject.relatedlocation = document.relatedlocation
        ? document.relatedlocation.title
        : null;
      searchObject.documentauthors = document.documentauthors
        ? document.documentauthors.map((obj) => obj.title).join(", ")
        : null;
      searchObject.signatorycharacters = document.signatorycharacters
        ? document.signatorycharacters.map((obj) => obj.title).join(", ")
        : null;
      searchObject.signatoryorganizations = document.signatoryorganizations
        ? document.signatoryorganizations.map((obj) => obj.title).join(", ")
        : null;
      break;
    case ArticleTypes.Ethnicity:
      let ethnicity: Ethnicity = article as Ethnicity;
      searchObject.malenames = ethnicity.malenames ? ethnicity.malenames : null;
      searchObject.femalenames = ethnicity.femalenames
        ? ethnicity.femalenames
        : null;
      searchObject.familynames = ethnicity.familynames
        ? ethnicity.familynames
        : null;
      searchObject.unisexnames = ethnicity.unisexnames
        ? ethnicity.unisexnames
        : null;
      searchObject.othernames = ethnicity.othernames
        ? ethnicity.othernames
        : null;
      searchObject.majorReligions = ethnicity.majorReligions
        ? ethnicity.majorReligions
        : null;
      searchObject.majorOrganizations = ethnicity.majorOrganizations
        ? ethnicity.majorOrganizations
        : null;
      searchObject.beautyIdeals = ethnicity.beautyIdeals
        ? ethnicity.beautyIdeals
        : null;
      searchObject.genderIdeals = ethnicity.genderIdeals
        ? ethnicity.genderIdeals
        : null;
      searchObject.courtshipIdeals = ethnicity.courtshipIdeals
        ? ethnicity.courtshipIdeals
        : null;
      searchObject.relationshipsIdeals = ethnicity.relationshipsIdeals
        ? ethnicity.relationshipsIdeals
        : null;
      searchObject.technologicalLevel = ethnicity.technologicalLevel
        ? ethnicity.technologicalLevel
        : null;
      searchObject.languages = ethnicity.languages ? ethnicity.languages : null;
      searchObject.birthrights = ethnicity.birthrights
        ? ethnicity.birthrights
        : null;
      searchObject.comingofagerights = ethnicity.comingofagerights
        ? ethnicity.comingofagerights
        : null;
      searchObject.etiquette = ethnicity.etiquette ? ethnicity.etiquette : null;
      searchObject.dresscode = ethnicity.dresscode ? ethnicity.dresscode : null;
      searchObject.culture = ethnicity.culture ? ethnicity.culture : null;
      searchObject.customs = ethnicity.customs ? ethnicity.customs : null;
      searchObject.sharedValues = ethnicity.sharedValues
        ? ethnicity.sharedValues
        : null;
      searchObject.funeraryCustoms = ethnicity.funeraryCustoms
        ? ethnicity.funeraryCustoms
        : null;
      searchObject.taboos = ethnicity.taboos ? ethnicity.taboos : null;
      searchObject.mythsAndLegends = ethnicity.mythsAndLegends
        ? ethnicity.mythsAndLegends
        : null;
      searchObject.historicalFigures = ethnicity.historicalFigures
        ? ethnicity.historicalFigures
        : null;
      searchObject.art = ethnicity.art ? ethnicity.art : null;
      searchObject.foodsAndCuisine = ethnicity.foodsAndCuisine
        ? ethnicity.foodsAndCuisine
        : null;
      searchObject.parents =
        ethnicity.parents && ethnicity.parents.length > 0
          ? ethnicity.parents.map((parent) => parent.title).join(", ")
          : null;
      searchObject.locations =
        ethnicity.locations && ethnicity.locations.length > 0
          ? ethnicity.locations.map((location) => location.title).join(", ")
          : null;

      searchObject.myths =
        ethnicity.myths && ethnicity.myths.length > 0
          ? ethnicity.myths.map((myth) => myth.title).join(", ")
          : null;

      searchObject.organizations =
        ethnicity.organizations && ethnicity.organizations.length > 0
          ? ethnicity.organizations
              .map((organization) => organization.title)
              .join(", ")
          : null;

      searchObject.species =
        ethnicity.species && ethnicity.species.length > 0
          ? ethnicity.species.map((species) => species.title).join(", ")
          : null;
      break;
    case ArticleTypes.Formation:
      let formation: Formation = article as Formation;
      searchObject.equipment = formation.equipment ? formation.equipment : null;
      searchObject.manpower = formation.manpower ? formation.manpower : null;
      searchObject.weaponry = formation.weaponry ? formation.weaponry : null;
      searchObject.vehicles = formation.vehicles ? formation.vehicles : null;
      searchObject.structure = formation.structure ? formation.structure : null;
      searchObject.training = formation.training ? formation.training : null;
      searchObject.tactics = formation.tactics ? formation.tactics : null;
      searchObject.logistics = formation.logistics ? formation.logistics : null;
      searchObject.support = formation.support ? formation.support : null;
      searchObject.upkeep = formation.upkeep ? formation.upkeep : null;
      searchObject.recruitment = formation.recruitment
        ? formation.recruitment
        : null;
      searchObject.foundingDate = formation.foundingDate
        ? formation.foundingDate
        : null;
      searchObject.dissolutionDate = formation.dissolutionDate
        ? formation.dissolutionDate
        : null;
      searchObject.history = formation.history ? formation.history : null;
      searchObject.loyalties = formation.loyalties ? formation.loyalties : null;
      searchObject.type = formation.type ? formation.type : null;
      searchObject.trainingLevel = formation.trainingLevel
        ? formation.trainingLevel
        : null;
      searchObject.veterancy = formation.veterancy ? formation.veterancy : null;

      searchObject.children =
        formation.children && formation.children.length > 0
          ? formation.children.map((child) => child.title).join(", ")
          : null;

      searchObject.units =
        formation.units && formation.units.length > 0
          ? formation.units.map((unit) => unit.title).join(", ")
          : null;

      searchObject.relatedorganizations =
        formation.relatedorganizations &&
        formation.relatedorganizations.length > 0
          ? formation.relatedorganizations
              .map((organization) => organization.title)
              .join(", ")
          : null;

      searchObject.relatedranks =
        formation.relatedranks && formation.relatedranks.length > 0
          ? formation.relatedranks.map((rank) => rank.title).join(", ")
          : null;

      break;
    case ArticleTypes.Item:
      let item: Item = article as Item;

      searchObject.manufacturingProcess = item.manufacturingProcess || null;
      searchObject.rawMaterials = item.rawMaterials || null;
      searchObject.rarity = item.rarity || null;
      searchObject.history = item.history || null;
      searchObject.itemCreationDate = item.itemCreationDate || null;
      searchObject.itemDestructionDate = item.itemDestructionDate || null;
      searchObject.significance = item.significance || null;
      searchObject.tooling = item.tooling || null;
      searchObject.mechanics = item.mechanics || null;
      searchObject.weight = item.weight || null;
      searchObject.dimensions = item.dimensions || null;
      searchObject.price = item.price || null;
      searchObject.datasheet = item.datasheet || null;
      searchObject.type = item.type || null;

      searchObject.parent = item.parent ? item.parent.title : null;
      searchObject.manufacturer = item.manufacturer
        ? item.manufacturer.title
        : null;
      searchObject.creator = item.creator ? item.creator.title : null;
      searchObject.organization = item.organization
        ? item.organization.title
        : null;
      searchObject.condition = item.condition ? item.condition.title : null;
      searchObject.currentLocation = item.currentLocation
        ? item.currentLocation.title
        : null;
      searchObject.currentHolder = item.currentHolder
        ? item.currentHolder.title
        : null;

      searchObject.technologies =
        item.technologies && item.technologies.length > 0
          ? item.technologies.map((technology) => technology.title).join(", ")
          : null;

      searchObject.ethnicities =
        item.ethnicities && item.ethnicities.length > 0
          ? item.ethnicities.map((ethnicity) => ethnicity.title).join(", ")
          : null;

      searchObject.myths =
        item.myths && item.myths.length > 0
          ? item.myths.map((myth) => myth.title).join(", ")
          : null;
      break;
    case ArticleTypes.Person:
      let person: Person = article as Person;
      searchObject.character = person.character || null;
      searchObject.portrait = person.portrait;
      searchObject.firstname = person.firstname || null;
      searchObject.lastname = person.lastname || null;
      searchObject.middlename = person.middlename || null;
      searchObject.maidenname = person.maidenname || null;
      searchObject.nickname = person.nickname || null;
      searchObject.honorific = person.honorific || null;
      searchObject.suffix = person.suffix || null;
      searchObject.dobDisplay = person.dobDisplay || null;
      searchObject.dob = person.dob || null;
      searchObject.dod = person.dod || null;
      searchObject.dodDisplay = person.dodDisplay || null;
      searchObject.age = person.age || null;
      searchObject.circumstancesBirth = person.circumstancesBirth || null;
      searchObject.circumstancesDeath = person.circumstancesDeath || null;
      searchObject.pronouns = person.pronouns || null;
      searchObject.eyes = person.eyes || null;
      searchObject.hair = person.hair || null;
      searchObject.skin = person.skin || null;
      searchObject.height = person.height || null;
      searchObject.birthplace = person.birthplace || null;
      searchObject.deathplace = person.deathplace || null;
      searchObject.residence = person.residence || null;
      searchObject.weight = person.weight || null;
      searchObject.gender = person.gender || null;
      searchObject.speciesDisplay = person.speciesDisplay || null;
      searchObject.physique = person.physique || null;
      searchObject.bodyFeatures = person.bodyFeatures || null;
      searchObject.facialFeatures = person.facialFeatures || null;
      searchObject.identifyingCharacteristics =
        person.identifyingCharacteristics || null;
      searchObject.quirksPhysical = person.quirksPhysical || null;
      searchObject.perceptionPhysical = person.perceptionPhysical || null;
      searchObject.specialAbilities = person.specialAbilities || null;
      searchObject.clothing = person.clothing || null;
      searchObject.items = person.items || null;
      searchObject.characterPrototype = person.characterPrototype || null;
      searchObject.rpgAlignment = person.rpgAlignment || null;
      searchObject.deity = person.deity || null;
      searchObject.currentstatus = person.currentstatus || null;
      searchObject.history = person.history || null;
      searchObject.employment = person.employment || null;
      searchObject.achievements = person.achievements || null;
      searchObject.failures = person.failures || null;
      searchObject.mentalTraumas = person.mentalTraumas || null;
      searchObject.intellectualCharacteristics =
        person.intellectualCharacteristics || null;
      searchObject.morality = person.morality || null;
      searchObject.taboos = person.taboos || null;
      searchObject.presentation = person.presentation || null;
      searchObject.sex = person.sex || null;
      searchObject.sexuality = person.sexuality || null;
      searchObject.genderidentity = person.genderidentity;
      searchObject.education = person.education || null;
      searchObject.languages = person.languages || null;
      searchObject.quotes = person.quotes || null;
      searchObject.motivation = person.motivation || null;
      searchObject.savviesIneptitudes = person.savviesIneptitudes || null;
      searchObject.likesDislikes = person.likesDislikes || null;
      searchObject.virtues = person.virtues || null;
      searchObject.vices = person.vices || null;
      searchObject.quirksPersonality = person.quirksPersonality || null;
      searchObject.hygiene = person.hygiene || null;
      searchObject.relations = person.relations || null;
      searchObject.family = person.family || null;
      searchObject.religion = person.religion || null;
      searchObject.titles = person.titles || null;
      searchObject.socialAptitude = person.socialAptitude || null;
      searchObject.mannerisms = person.mannerisms || null;
      searchObject.hobbies = person.hobbies || null;
      searchObject.speech = person.speech || null;
      searchObject.wealth = person.wealth || null;
      searchObject.classification = person.classification || null;
      searchObject.domains = person.domains || null;
      searchObject.codes = person.codes || null;
      searchObject.holysymbols = person.holysymbols || null;
      searchObject.tenets = person.tenets || null;
      searchObject.goals = person.goals || null;
      searchObject.holidays = person.holidays || null;
      searchObject.artifacts = person.artifacts || null;
      searchObject.ggmtitle = person.ggmtitle || null;
      searchObject.ggmjob = person.ggmjob || null;
      searchObject.ggmgoal = person.ggmgoal || null;
      searchObject.ggmuse = person.ggmuse || null;
      searchObject.ggmgoaladditional = person.ggmgoaladditional || null;
      searchObject.ggmquirk = person.ggmquirk || null;
      searchObject.ggmequipment = person.ggmequipment || null;
      searchObject.ggmtype = person.ggmtype || null;
      searchObject.ggmsubtype = person.ggmsubtype || null;
      searchObject.ggmlikeability = person.ggmlikeability || null;
      searchObject.ggmcompetence = person.ggmcompetence || null;
      searchObject.ggmproactivity = person.ggmproactivity || null;
      searchObject.ggmcoolness = person.ggmcoolness || null;
      searchObject.ggmdesire = person.ggmdesire || null;
      searchObject.ggmfear = person.ggmfear || null;
      searchObject.ggmwhyfollowing = person.ggmwhyfollowing || null;
      searchObject.ggmbiography = person.ggmbiography || null;
      searchObject.ggmdescfacial = person.ggmdescfacial || null;
      searchObject.ggmdescspeech = person.ggmdescspeech || null;
      searchObject.ggmdescbody = person.ggmdescbody || null;
      searchObject.ggmdescsight = person.ggmdescsight || null;
      searchObject.ggmdescsound = person.ggmdescsound || null;
      searchObject.ggmdescsmell = person.ggmdescsmell || null;
      searchObject.ggmdesctouch = person.ggmdesctouch || null;
      searchObject.ggmdescemotional = person.ggmdescemotional || null;
      searchObject.ggmdeschappy = person.ggmdeschappy || null;
      searchObject.ggmdescsad = person.ggmdescsad || null;
      searchObject.ggmdescangry = person.ggmdescangry || null;
      searchObject.reign = person.reign || null;
      searchObject.datasheet = person.datasheet || null;
      searchObject.vehicle = person.vehicle || null;
      searchObject.parentBiological1 = person.parentBiological1
        ? person.parentBiological1.title
        : null;
      searchObject.parentBiological2 = person.parentBiological2
        ? person.parentBiological2.title
        : null;
      searchObject.parentAdopting1 = person.parentAdopting1
        ? person.parentAdopting1.title
        : null;
      searchObject.parentAdopting2 = person.parentAdopting2
        ? person.parentAdopting2.title
        : null;
      searchObject.parentSurrogate = person.parentSurrogate
        ? person.parentSurrogate.title
        : null;
      searchObject.church = person.church ? person.church.title : null;
      searchObject.realm = person.realm ? person.realm.title : null;
      searchObject.organization = person.organization
        ? person.organization.title
        : null;
      searchObject.familyorganization = person.familyorganization
        ? person.familyorganization.title
        : null;
      searchObject.ethnicity = person.ethnicity ? person.ethnicity.title : null;
      searchObject.otherethnicities =
        person.otherethnicities && person.otherethnicities.length > 0
          ? person.otherethnicities
              .map((ethnicity) => ethnicity.title)
              .join(", ")
          : null;
      searchObject.species = person.species ? person.species.title : null;
      searchObject.currentLocation = person.currentLocation
        ? person.currentLocation.title
        : null;
      searchObject.conditions =
        person.conditions && person.conditions.length > 0
          ? person.conditions.map((condition) => condition.title).join(", ")
          : null;
      break;
    case ArticleTypes.Landmark:
      let landmark: Landmark = article as Landmark;

      searchObject.alternativename = landmark.alternativename || null;
      searchObject.geography = landmark.geography || null;
      searchObject.naturalresources = landmark.naturalresources || null;
      searchObject.population = landmark.population || null;
      searchObject.areaSize = landmark.areaSize || null;
      searchObject.demographics = landmark.demographics || null;
      searchObject.demonym = landmark.demonym || null;
      searchObject.defences = landmark.defences || null;
      searchObject.infrastructure = landmark.infrastructure || null;
      searchObject.guilds = landmark.guilds || null;
      searchObject.history = landmark.history || null;
      searchObject.tourism = landmark.tourism || null;
      searchObject.industry = landmark.industry || null;
      searchObject.architecture = landmark.architecture || null;
      searchObject.government = landmark.government || null;
      searchObject.assets = landmark.assets || null;
      searchObject.locationTemplateType = landmark.locationTemplateType || null;
      searchObject.constructed = landmark.constructed || null;
      searchObject.ruined = landmark.ruined || null;
      searchObject.florafauna = landmark.florafauna || null;
      searchObject.ecosystem = landmark.ecosystem || null;
      searchObject.ecosystemCycles = landmark.ecosystemCycles || null;
      searchObject.localizedPhenomena = landmark.localizedPhenomena || null;
      searchObject.climate = landmark.climate || null;
      searchObject.alterations = landmark.alterations || null;
      searchObject.purpose = landmark.purpose || null;
      searchObject.design = landmark.design || null;
      searchObject.entries = landmark.entries || null;
      searchObject.denizens = landmark.denizens || null;
      searchObject.valuables = landmark.valuables || null;
      searchObject.hazards = landmark.hazards || null;
      searchObject.effects = landmark.effects || null;
      searchObject.sensory = landmark.sensory || null;
      searchObject.properties = landmark.properties || null;
      searchObject.contents = landmark.contents || null;
      searchObject.pointOfInterest = landmark.pointOfInterest || null;
      searchObject.district = landmark.district || null;

      searchObject.parent = landmark.parent ? landmark.parent.title : null;
      searchObject.type = landmark.type ? landmark.type : null;
      searchObject.person = landmark.person ? landmark.person.title : null;
      searchObject.vehicle = landmark.vehicle ? landmark.vehicle.title : null;
      searchObject.rank = landmark.rank ? landmark.rank.title : null;
      searchObject.organization = landmark.organization
        ? landmark.organization.title
        : null;
      searchObject.additionalRulers =
        landmark.additionalRulers && landmark.additionalRulers.length > 0
          ? landmark.additionalRulers.map((ruler) => ruler.title).join(", ")
          : null;

      searchObject.contenders =
        landmark.contenders && landmark.contenders.length > 0
          ? landmark.contenders.map((contender) => contender.title).join(", ")
          : null;

      searchObject.connectedRooms =
        landmark.connectedRooms && landmark.connectedRooms.length > 0
          ? landmark.connectedRooms.map((room) => room.title).join(", ")
          : null;

      break;
    case ArticleTypes.Language:
      let language: Language = article as Language;
      searchObject.phrases = language.phrases || null;
      searchObject.malenames = language.malenames || null;
      searchObject.femalenames = language.femalenames || null;
      searchObject.unisexnames = language.unisexnames || null;
      searchObject.familynames = language.familynames || null;
      searchObject.alphabet = language.alphabet || null;
      searchObject.geographicdistribution =
        language.geographicdistribution || null;
      searchObject.phonology = language.phonology || null;
      searchObject.morphology = language.morphology || null;
      searchObject.syntax = language.syntax || null;
      searchObject.vocabulary = language.vocabulary || null;
      searchObject.phonetics = language.phonetics || null;
      searchObject.sentenceStructure = language.sentenceStructure || null;
      searchObject.adjectiveOrder = language.adjectiveOrder || null;
      searchObject.structuralMarkers = language.structuralMarkers || null;
      searchObject.tenses = language.tenses || null;
      searchObject.dictionary = language.dictionary
        ? language.dictionary.title
        : null;
      searchObject.parents =
        language.parents && language.parents.length > 0
          ? language.parents.map((parent) => parent.title).join(", ")
          : null;
      searchObject.ethnicities =
        language.ethnicities && language.ethnicities.length > 0
          ? language.ethnicities.map((ethnicity) => ethnicity.title).join(", ")
          : null;
      searchObject.organizations =
        language.organizations && language.organizations.length > 0
          ? language.organizations
              .map((organization) => organization.title)
              .join(", ")
          : null;
      break;
    case ArticleTypes.Law:
      let law: Law = article as Law;
      searchObject.localization = law.localization || null;
      searchObject.manifestation = law.manifestation || null;
      searchObject.lawtype = law.lawtype || null;
      break;
    case ArticleTypes.Location:
      let location: Location = article as Location;
      searchObject.alternativename = location.alternativename || null;
      searchObject.geography = location.geography || null;
      searchObject.naturalresources = location.naturalresources || null;
      searchObject.population = location.population || null;
      searchObject.areaSize = location.areaSize || null;
      searchObject.demographics = location.demographics || null;
      searchObject.demonym = location.demonym || null;
      searchObject.defences = location.defences || null;
      searchObject.infrastructure = location.infrastructure || null;
      searchObject.guilds = location.guilds || null;
      searchObject.history = location.history || null;
      searchObject.tourism = location.tourism || null;
      searchObject.industry = location.industry || null;
      searchObject.architecture = location.architecture || null;
      searchObject.government = location.government || null;
      searchObject.assets = location.assets || null;
      searchObject.locationTemplateType = location.locationTemplateType || null;
      searchObject.constructed = location.constructed || null;
      searchObject.ruined = location.ruined || null;
      searchObject.florafauna = location.florafauna || null;
      searchObject.ecosystem = location.ecosystem || null;
      searchObject.ecosystemCycles = location.ecosystemCycles || null;
      searchObject.localizedPhenomena = location.localizedPhenomena || null;
      searchObject.climate = location.climate || null;
      searchObject.alterations = location.alterations || null;
      searchObject.purpose = location.purpose || null;
      searchObject.design = location.design || null;
      searchObject.entries = location.entries || null;
      searchObject.denizens = location.denizens || null;
      searchObject.valuables = location.valuables || null;
      searchObject.hazards = location.hazards || null;
      searchObject.effects = location.effects || null;
      searchObject.sensory = location.sensory || null;
      searchObject.properties = location.properties || null;
      searchObject.contents = location.contents || null;
      searchObject.pointOfInterest = location.pointOfInterest || null;
      searchObject.district = location.district || null;
      searchObject.children =
        location.children && location.children.length > 0
          ? location.children.map((child) => child.title).join(", ")
          : null;
      searchObject.type = location.type ? location.type.title : null;
      searchObject.rituals =
        location.rituals && location.rituals.length > 0
          ? location.rituals.map((ritual) => ritual.title).join(", ")
          : null;
      searchObject.items =
        location.items && location.items.length > 0
          ? location.items.map((item) => item.title).join(", ")
          : null;
      searchObject.documents =
        location.documents && location.documents.length > 0
          ? location.documents.map((document) => document.title).join(", ")
          : null;
      searchObject.claimedCapitals =
        location.claimedCapitals && location.claimedCapitals.length > 0
          ? location.claimedCapitals.map((capital) => capital.title).join(", ")
          : null;
      searchObject.includedOrganizations =
        location.includedOrganizations &&
        location.includedOrganizations.length > 0
          ? location.includedOrganizations.map((org) => org.title).join(", ")
          : null;
      searchObject.reportprimarylocations =
        location.reportprimarylocations &&
        location.reportprimarylocations.length > 0
          ? location.reportprimarylocations
              .map((report) => report.title)
              .join(", ")
          : null;
      searchObject.conflicts =
        location.conflicts && location.conflicts.length > 0
          ? location.conflicts.map((conflict) => conflict.title).join(", ")
          : null;
      searchObject.vehiclesPresent =
        location.vehiclesPresent && location.vehiclesPresent.length > 0
          ? location.vehiclesPresent.map((vehicle) => vehicle.title).join(", ")
          : null;
      searchObject.person = location.person ? location.person.title : null;
      searchObject.parent = location.parent ? location.parent.title : null;
      searchObject.vehicle =
        location.vehicle && location.vehicle.length > 0
          ? location.vehicle.map((v) => v.title)
          : null;
      searchObject.rank = location.rank ? location.rank.title : null;
      searchObject.organization = location.organization
        ? location.organization.title
        : null;
      searchObject.additionalRulers =
        location.additionalRulers && location.additionalRulers.length > 0
          ? location.additionalRulers.map((ruler) => ruler.title).join(", ")
          : null;
      searchObject.contenders =
        location.contenders && location.contenders.length > 0
          ? location.contenders.map((contender) => contender.title).join(", ")
          : null;
      searchObject.rooms =
        location.rooms && location.rooms.length > 0
          ? location.rooms.map((room) => room.title)
          : null;
      searchObject.materials =
        location.materials && location.materials.length > 0
          ? location.materials.map((material) => material.title).join(", ")
          : null;
      searchObject.ranks =
        location.ranks && location.ranks.length > 0
          ? location.ranks.map((rank) => rank.title).join(", ")
          : null;
      searchObject.myths =
        location.myths && location.myths.length > 0
          ? location.myths.map((myth) => myth.title).join(", ")
          : null;
      searchObject.plots =
        location.plots && location.plots.length > 0
          ? location.plots.map((plot) => plot.title).join(", ")
          : null;
      searchObject.professions =
        location.professions && location.professions.length > 0
          ? location.professions
              .map((profession) => profession.title)
              .join(", ")
          : null;
      searchObject.ethnicities =
        location.ethnicities && location.ethnicities.length > 0
          ? location.ethnicities.map((ethnicity) => ethnicity.title).join(", ")
          : null;
      searchObject.species =
        location.species && location.species.length > 0
          ? location.species.map((species) => species.title).join(", ")
          : null;
      searchObject.conflicts =
        location.conflicts && location.conflicts.length > 0
          ? location.conflicts.map((conflict) => conflict.title).join(", ")
          : null;
      break;
    case ArticleTypes.Material:
      let material: Material = article as Material;
      searchObject.history = material.history || null;
      searchObject.type = material.type || null;
      searchObject.discovery = material.discovery || null;
      searchObject.useCommon = material.useCommon || null;
      searchObject.useCultural = material.useCultural || null;
      searchObject.useIndustrial = material.useIndustrial || null;
      searchObject.characteristics = material.characteristics || null;
      searchObject.properties = material.properties || null;
      searchObject.compounds = material.compounds || null;
      searchObject.geo = material.geo || null;
      searchObject.origin = material.origin || null;
      searchObject.halflife = material.halflife || null;
      searchObject.expiry = material.expiry || null;
      searchObject.meltingpoint = material.meltingpoint || null;
      searchObject.freezingpoint = material.freezingpoint || null;
      searchObject.elementNumber = material.elementNumber || null;
      searchObject.elementWeight = material.elementWeight || null;
      searchObject.elementAbbreviation = material.elementAbbreviation || null;
      searchObject.density = material.density || null;
      searchObject.commonState = material.commonState || null;
      searchObject.taste = material.taste || null;
      searchObject.odor = material.odor || null;
      searchObject.colour = material.colour || null;
      searchObject.refinement = material.refinement || null;
      searchObject.products = material.products || null;
      searchObject.manufacturing = material.manufacturing || null;
      searchObject.hazards = material.hazards || null;
      searchObject.environment = material.environment || null;
      searchObject.reusability = material.reusability || null;
      searchObject.value = material.value || null;
      searchObject.rarity = material.rarity || null;
      searchObject.market = material.market || null;
      searchObject.storage = material.storage || null;
      searchObject.regulation = material.regulation || null;
      searchObject.species =
        material.species && material.species.length > 0
          ? material.species.map((species) => species.title).join(", ")
          : null;
      searchObject.locations =
        material.locations && material.locations.length > 0
          ? material.locations.map((location) => location.title).join(", ")
          : null;
      searchObject.items =
        material.items && material.items.length > 0
          ? material.items.map((item) => item.title).join(", ")
          : null;
      searchObject.technologies =
        material.technologies && material.technologies.length > 0
          ? material.technologies
              .map((technology) => technology.title)
              .join(", ")
          : null;
      searchObject.professions =
        material.professions && material.professions.length > 0
          ? material.professions
              .map((profession) => profession.title)
              .join(", ")
          : null;
      break;
    case ArticleTypes.MilitaryConflict:
      let militaryConflict: MilitaryConflict = article as MilitaryConflict;
      searchObject.startingDate = militaryConflict.startingDate || null;
      searchObject.endingDate = militaryConflict.endingDate || null;
      searchObject.result = militaryConflict.result || null;
      searchObject.type = militaryConflict.type || null;
      searchObject.battlefieldtype = militaryConflict.battlefieldtype || null;
      searchObject.prelude = militaryConflict.prelude || null;
      searchObject.deployment = militaryConflict.deployment || null;
      searchObject.battlefield = militaryConflict.battlefield || null;
      searchObject.conditions = militaryConflict.conditions || null;
      searchObject.engagement = militaryConflict.engagement || null;
      searchObject.outcome = militaryConflict.outcome || null;
      searchObject.legacy = militaryConflict.legacy || null;
      searchObject.aftermath = militaryConflict.aftermath || null;
      searchObject.history = militaryConflict.history || null;
      searchObject.literature = militaryConflict.literature || null;
      searchObject.technology = militaryConflict.technology || null;
      searchObject.location = militaryConflict.location
        ? militaryConflict.location.title
        : null;
      searchObject.parent = militaryConflict.parent
        ? militaryConflict.parent.title
        : null;
      searchObject.belligerents =
        militaryConflict.belligerents &&
        militaryConflict.belligerents.length > 0
          ? militaryConflict.belligerents
              .map((belligerent) => belligerent.title)
              .join(", ")
          : null;
      searchObject.maps =
        militaryConflict.maps && militaryConflict.maps.length > 0
          ? militaryConflict.maps.map((map) => map.title).join(", ")
          : null;
      break;
    case ArticleTypes.Myth:
      let myth: Myth = article as Myth;
      searchObject.summary = myth.summary || null;
      searchObject.historicalbasis = myth.historicalbasis || null;
      searchObject.spread = myth.spread || null;
      searchObject.variations = myth.variations || null;
      searchObject.culturalreception = myth.culturalreception || null;
      searchObject.literature = myth.literature || null;
      searchObject.art = myth.art || null;
      searchObject.dateofsetting = myth.dateofsetting || null;
      searchObject.dateofrecording = myth.dateofrecording || null;
      searchObject.telling = myth.telling ? myth.telling.title : null;
      searchObject.documents =
        myth.documents && myth.documents.length > 0
          ? myth.documents.map((document) => document.title).join(", ")
          : null;
      searchObject.ethnicities =
        myth.ethnicities && myth.ethnicities.length > 0
          ? myth.ethnicities.map((ethnicity) => ethnicity.title).join(", ")
          : null;
      searchObject.species =
        myth.species && myth.species.length > 0
          ? myth.species.map((species) => species.title).join(", ")
          : null;
      searchObject.locations =
        myth.locations && myth.locations.length > 0
          ? myth.locations.map((location) => location.title).join(", ")
          : null;
      searchObject.people =
        myth.people && myth.people.length > 0
          ? myth.people.map((person) => person.title).join(", ")
          : null;
      searchObject.organizations =
        myth.organizations && myth.organizations.length > 0
          ? myth.organizations
              .map((organization) => organization.title)
              .join(", ")
          : null;
      searchObject.items =
        myth.items && myth.items.length > 0
          ? myth.items.map((item) => item.title).join(", ")
          : null;
      searchObject.vehicles =
        myth.vehicles && myth.vehicles.length > 0
          ? myth.vehicles.map((vehicle) => vehicle.title).join(", ")
          : null;
      break;
    case ArticleTypes.Organisation:
      let organisation: Organisation = article as Organisation;
      searchObject.motto = organisation.motto ? organisation.motto : null;
      searchObject.disbanded = organisation.disbandment
        ? organisation.disbandment
        : null;
      searchObject.foundingDate = organisation.foundingDate
        ? organisation.foundingDate
        : null;
      searchObject.dissolutionDate = organisation.dissolutionDate
        ? organisation.dissolutionDate
        : null;
      searchObject.type = organisation.type ? organisation.type.title : null;
      searchObject.capital = organisation.capital
        ? organisation.capital.title
        : null;
      searchObject.alternativeNames = organisation.alternativeNames
        ? organisation.alternativeNames
        : null;
      searchObject.formation = organisation.formation
        ? organisation.formation.title
        : null;
      searchObject.trainingLevel = organisation.trainingLevel
        ? organisation.trainingLevel
        : null;
      searchObject.veterancy = organisation.veterancy
        ? organisation.veterancy
        : null;
      searchObject.demonym = organisation.demonym ? organisation.demonym : null;
      searchObject.leader = organisation.leader
        ? organisation.leader.title
        : null;
      searchObject.rulingorganization = organisation.rulingorganization
        ? organisation.rulingorganization.title
        : null;
      searchObject.leadertitle = organisation.leadertitle
        ? organisation.leadertitle.title
        : null;
      searchObject.familyleader = organisation.familyleader
        ? organisation.familyleader.title
        : null;
      searchObject.headofstate = organisation.headofstate
        ? organisation.headofstate.title
        : null;
      searchObject.governmentsystem = organisation.governmentsystem
        ? organisation.governmentsystem
        : null;
      searchObject.powerstructure = organisation.powerstructure
        ? organisation.powerstructure
        : null;
      searchObject.economicsystem = organisation.economicsystem
        ? organisation.economicsystem
        : null;
      searchObject.gazetteer = organisation.gazetteer
        ? organisation.gazetteer
        : null;
      searchObject.currency = organisation.currency
        ? organisation.currency
        : null;
      searchObject.exports = organisation.exports ? organisation.exports : null;
      searchObject.imports = organisation.imports ? organisation.imports : null;
      searchObject.legislative = organisation.legislative
        ? organisation.legislative
        : null;
      searchObject.executive = organisation.executive
        ? organisation.executive
        : null;
      searchObject.statereligion = organisation.statereligion
        ? organisation.statereligion.title
        : null;
      searchObject.parent = organisation.parent
        ? organisation.parent.title
        : null;
      searchObject.deities = organisation.deities
        ? organisation.deities.map((deity) => deity.title).join(", ")
        : null;
      searchObject.geographicLocation = organisation.geographicLocation
        ? organisation.geographicLocation.title
        : null;
      searchObject.languages = organisation.languages
        ? organisation.languages.map((language) => language.title).join(", ")
        : null;
      searchObject.neighbors = organisation.neighbors
        ? organisation.neighbors.map((neighbor) => neighbor.title).join(", ")
        : null;
      searchObject.relatedSpecies = organisation.relatedSpecies
        ? organisation.relatedSpecies.map((species) => species.title).join(", ")
        : null;
      searchObject.ethnicities = organisation.ethnicities
        ? organisation.ethnicities
            .map((ethnicity) => ethnicity.title)
            .join(", ")
        : null;
      searchObject.territory = organisation.territory
        ? organisation.territory
        : null;
      searchObject.military = organisation.military
        ? organisation.military
        : null;
      searchObject.technology = organisation.technology
        ? organisation.technology
        : null;
      searchObject.religion = organisation.religion
        ? organisation.religion
        : null;
      searchObject.foreignrelations = organisation.foreignrelations
        ? organisation.foreignrelations
        : null;
      searchObject.laws = organisation.laws ? organisation.laws : null;
      searchObject.agricultureAndIndustry = organisation.agricultureAndIndustry
        ? organisation.agricultureAndIndustry
        : null;
      searchObject.tradeAndTransport = organisation.tradeAndTransport
        ? organisation.tradeAndTransport
        : null;
      searchObject.education = organisation.education
        ? organisation.education
        : null;
      searchObject.infrastructure = organisation.infrastructure
        ? organisation.infrastructure
        : null;
      searchObject.mythos = organisation.mythos ? organisation.mythos : null;
      searchObject.origins = organisation.origins ? organisation.origins : null;
      searchObject.cosmology = organisation.cosmology
        ? organisation.cosmology
        : null;
      searchObject.tenets = organisation.tenets ? organisation.tenets : null;
      searchObject.ethics = organisation.ethics ? organisation.ethics : null;
      searchObject.worship = organisation.worship ? organisation.worship : null;
      searchObject.priesthood = organisation.priesthood
        ? organisation.priesthood
        : null;
      searchObject.divinepowers = organisation.divinepowers
        ? organisation.divinepowers
        : null;
      searchObject.intrigue = organisation.intrigue
        ? organisation.intrigue
        : null;
      searchObject.sects = organisation.sects ? organisation.sects : null;
      break;
    case ArticleTypes.Plot:
      let plot: Plot = article as Plot;
      searchObject.scenes = plot.scenes || null;
      searchObject.themes = plot.themes || null;
      searchObject.type = plot.type || null;
      searchObject.completionDate = plot.completionDate || null;
      searchObject.exposition = plot.exposition || null;
      searchObject.conflict = plot.conflict || null;
      searchObject.risingaction = plot.risingaction || null;
      searchObject.climax = plot.climax || null;
      searchObject.fallingaction = plot.fallingaction || null;
      searchObject.resolution = plot.resolution || null;
      searchObject.goals = plot.goals || null;
      searchObject.hooks = plot.hooks || null;
      searchObject.stakes = plot.stakes || null;
      searchObject.moralquandaries = plot.moralquandaries || null;
      searchObject.crueltricks = plot.crueltricks || null;
      searchObject.redherrings = plot.redherrings || null;
      searchObject.protagonists = plot.protagonists || null;
      searchObject.allies = plot.allies || null;
      searchObject.neutrals = plot.neutrals || null;
      searchObject.competitors = plot.competitors || null;
      searchObject.adversaries = plot.adversaries || null;
      searchObject.threats = plot.threats || null;
      searchObject.locations = plot.locations || null;
      searchObject.encounters = plot.encounters || null;
      searchObject.pastevents = plot.pastevents || null;
      searchObject.ggmtype = plot.ggmtype || null;
      searchObject.ggmadventureobjective = plot.ggmadventureobjective || null;
      searchObject.ggmadventuretheme = plot.ggmadventuretheme || null;
      searchObject.ggmadventuretype = plot.ggmadventuretype || null;
      searchObject.ggmadventurefocustype = plot.ggmadventurefocustype || null;
      searchObject.ggmadventureadversarytype =
        plot.ggmadventureadversarytype || null;
      searchObject.ggmadventureopening = plot.ggmadventureopening || null;
      searchObject.ggmadventurecoolness = plot.ggmadventurecoolness || null;
      searchObject.ggmadventureexpectation =
        plot.ggmadventureexpectation || null;
      searchObject.ggmadventuresenses = plot.ggmadventuresenses || null;
      searchObject.ggmadventurelearnings = plot.ggmadventurelearnings || null;
      searchObject.ggmadventure1goal = plot.ggmadventure1goal || null;
      searchObject.ggmadventure1enemy = plot.ggmadventure1enemy || null;
      searchObject.ggmadventure1situation = plot.ggmadventure1situation || null;
      searchObject.ggmadventure2setup = plot.ggmadventure2setup || null;
      searchObject.ggmadventure2attempt = plot.ggmadventure2attempt || null;
      searchObject.ggmadventure3false = plot.ggmadventure3false || null;
      searchObject.ggmadventure3showdown = plot.ggmadventure3showdown || null;
      searchObject.ggmadventurenames = plot.ggmadventurenames || null;
      searchObject.ggmadventurechanges = plot.ggmadventurechanges || null;
      searchObject.parent = plot.parent ? plot.parent.title : null;
      searchObject.relatedpeople =
        plot.relatedpeople && plot.relatedpeople.length > 0
          ? plot.relatedpeople.map((person) => person.title).join(", ")
          : null;
      searchObject.relatedorganizations =
        plot.relatedorganizations && plot.relatedorganizations.length > 0
          ? plot.relatedorganizations
              .map((organization) => organization.title)
              .join(", ")
          : null;
      searchObject.relatedlocations =
        plot.relatedlocations && plot.relatedlocations.length > 0
          ? plot.relatedlocations.map((location) => location.title).join(", ")
          : null;
      searchObject.reports =
        plot.reports && plot.reports.length > 0
          ? plot.reports.map((report) => report.title).join(", ")
          : null;
      break;
    case ArticleTypes.Profession:
      let profession: Profession = article as Profession;
      searchObject.alternativeNames = profession.alternativeNames || null;
      searchObject.type = profession.type || null;
      searchObject.purpose = profession.purpose || null;
      searchObject.qualifications = profession.qualifications || null;
      searchObject.tools = profession.tools || null;
      searchObject.materials = profession.materials || null;
      searchObject.workplace = profession.workplace || null;
      searchObject.structure = profession.structure || null;
      searchObject.services = profession.services || null;
      searchObject.pay = profession.pay || null;
      searchObject.benefits = profession.benefits || null;
      searchObject.socialStatus = profession.socialStatus || null;
      searchObject.demand = profession.demand || null;
      searchObject.history = profession.history || null;
      searchObject.demographics = profession.demographics || null;
      searchObject.hazards = profession.hazards || null;
      searchObject.legality = profession.legality || null;
      searchObject.relatedvehicles =
        profession.relatedvehicles && profession.relatedvehicles.length > 0
          ? profession.relatedvehicles
              .map((vehicle) => vehicle.title)
              .join(", ")
          : null;
      searchObject.relatedtechnologies =
        profession.relatedtechnologies &&
        profession.relatedtechnologies.length > 0
          ? profession.relatedtechnologies
              .map((technology) => technology.title)
              .join(", ")
          : null;
      searchObject.relatedranks =
        profession.relatedranks && profession.relatedranks.length > 0
          ? profession.relatedranks.map((rank) => rank.title).join(", ")
          : null;
      searchObject.relatedlocations =
        profession.relatedlocations && profession.relatedlocations.length > 0
          ? profession.relatedlocations
              .map((location) => location.title)
              .join(", ")
          : null;
      searchObject.holders =
        profession.holders && profession.holders.length > 0
          ? profession.holders.map((holder) => holder.title).join(", ")
          : null;
      searchObject.relatedorganizations =
        profession.relatedorganizations &&
        profession.relatedorganizations.length > 0
          ? profession.relatedorganizations
              .map((organization) => organization.title)
              .join(", ")
          : null;
      searchObject.relatedmaterials =
        profession.relatedmaterials && profession.relatedmaterials.length > 0
          ? profession.relatedmaterials
              .map((material) => material.title)
              .join(", ")
          : null;
      break;
    case ArticleTypes.Prose:
      let prose: Prose = article as Prose;
      searchObject.prose = prose.prose || null;
      searchObject.sidenotes = prose.sidenotes || null;
      searchObject.myths =
        prose.myths && prose.myths.length > 0
          ? prose.myths.map((myth) => myth.title).join(", ")
          : null;
      break;
    case ArticleTypes.Rank:
      let rank: Rank = article as Rank;
      searchObject.alternativeTitle = rank.alternativeTitle || null;
      searchObject.type = rank.type || null;
      searchObject.lengthOfTerm = rank.lengthOfTerm || null;
      searchObject.duties = rank.duties || null;
      searchObject.qualifications = rank.qualifications || null;
      searchObject.requirements = rank.requirements || null;
      searchObject.appointment = rank.appointment || null;
      searchObject.heredity = rank.heredity || null;
      searchObject.responsibilities = rank.responsibilities || null;
      searchObject.history = rank.history || null;
      searchObject.culturalSignificance = rank.culturalSignificance || null;
      searchObject.notableHolders = rank.notableHolders || null;
      searchObject.benefits = rank.benefits || null;
      searchObject.removal = rank.removal || null;
      searchObject.equatesTo = rank.equatesTo || null;
      searchObject.equipment = rank.equipment || null;
      searchObject.heraldry = rank.heraldry || null;
      searchObject.rankCreation = rank.rankCreation || null;
      searchObject.rankStatus = rank.rankStatus || null;
      searchObject.authoritySource = rank.authoritySource || null;
      searchObject.formofaddress = rank.formofaddress || null;
      searchObject.weight = rank.weight || null;
      searchObject.firstholder = rank.firstholder
        ? rank.firstholder.title
        : null;
      searchObject.parent = rank.parent ? rank.parent.title : null;
      searchObject.leaders =
        rank.leaders && rank.leaders.length > 0
          ? rank.leaders.map((leader) => leader.title).join(", ")
          : null;
      searchObject.currentHolders =
        rank.currentHolders && rank.currentHolders.length > 0
          ? rank.currentHolders.map((holder) => holder.title).join(", ")
          : null;
      searchObject.pastHolders =
        rank.pastHolders && rank.pastHolders.length > 0
          ? rank.pastHolders.map((holder) => holder.title).join(", ")
          : null;
      searchObject.relatedorganizations =
        rank.relatedorganizations && rank.relatedorganizations.length > 0
          ? rank.relatedorganizations
              .map((organization) => organization.title)
              .join(", ")
          : null;
      searchObject.relatedlocations =
        rank.relatedlocations && rank.relatedlocations.length > 0
          ? rank.relatedlocations.map((location) => location.title).join(", ")
          : null;
      searchObject.rankformations =
        rank.rankformations && rank.rankformations.length > 0
          ? rank.rankformations.map((formation) => formation.title).join(", ")
          : null;
      searchObject.professions =
        rank.professions && rank.professions.length > 0
          ? rank.professions.map((profession) => profession.title).join(", ")
          : null;
      break;
    case ArticleTypes.Report:
      let report: Report = article as Report;
      searchObject.reportDate = report.reportDate
        ? report.reportDate.date
        : null;
      searchObject.rewards = report.rewards || null;
      searchObject.quests = report.quests || null;
      searchObject.interactions = report.interactions || null;
      searchObject.createdContent = report.createdContent || null;
      searchObject.relatedReports = report.relatedReports || null;
      searchObject.reportNotes = report.reportNotes || null;
      searchObject.session = report.session || null;
      searchObject.campaign = report.campaign || null;
      searchObject.primarygeographicLocation = report.primarygeographicLocation
        ? report.primarygeographicLocation.title
        : null;
      searchObject.secondarygeographicLocation =
        report.secondarygeographicLocation
          ? report.secondarygeographicLocation.title
          : null;
      searchObject.plots =
        report.plots && report.plots.length > 0
          ? report.plots.map((plot) => plot.title).join(", ")
          : null;
      searchObject.relatedPersons =
        report.relatedPersons && report.relatedPersons.length > 0
          ? report.relatedPersons.map((person) => person.title).join(", ")
          : null;
      break;
    case ArticleTypes.Settlement:
      let settlement: Settlement = article as Settlement;
      searchObject.alternativename = settlement.alternativename || null;
      searchObject.geography = settlement.geography || null;
      searchObject.naturalresources = settlement.naturalresources || null;
      searchObject.population = settlement.population || null;
      searchObject.areaSize = settlement.areaSize || null;
      searchObject.demographics = settlement.demographics || null;
      searchObject.demonym = settlement.demonym || null;
      searchObject.defences = settlement.defences || null;
      searchObject.infrastructure = settlement.infrastructure || null;
      searchObject.guilds = settlement.guilds || null;
      searchObject.history = settlement.history || null;
      searchObject.tourism = settlement.tourism || null;
      searchObject.industry = settlement.industry || null;
      searchObject.architecture = settlement.architecture || null;
      searchObject.government = settlement.government || null;
      searchObject.assets = settlement.assets || null;
      searchObject.constructed = settlement.constructed || null;
      searchObject.ruined = settlement.ruined || null;
      searchObject.florafauna = settlement.florafauna || null;
      searchObject.ecosystem = settlement.ecosystem || null;
      searchObject.ecosystemCycles = settlement.ecosystemCycles || null;
      searchObject.localizedPhenomena = settlement.localizedPhenomena || null;
      searchObject.climate = settlement.climate || null;
      searchObject.alterations = settlement.alterations || null;
      searchObject.purpose = settlement.purpose || null;
      searchObject.design = settlement.design || null;
      searchObject.entries = settlement.entries || null;
      searchObject.district = settlement.district || null;
      searchObject.parent = settlement.parent ? settlement.parent.title : null;
      searchObject.type = settlement.type ? settlement.type.title : null;
      searchObject.person = settlement.person ? settlement.person.title : null;
      searchObject.vehicle = settlement.vehicle
        ? settlement.vehicle.title
        : null;
      searchObject.rank = settlement.rank ? settlement.rank.title : null;
      searchObject.organization = settlement.organization
        ? settlement.organization.title
        : null;
      searchObject.denizens =
        settlement.denizens && settlement.denizens.length > 0
          ? settlement.denizens.map((person) => person.title).join(", ")
          : null;
      searchObject.valuables =
        settlement.valuables && settlement.valuables.length > 0
          ? settlement.valuables.map((item) => item.title).join(", ")
          : null;
      searchObject.founders =
        settlement.founders && settlement.founders.length > 0
          ? settlement.founders.map((person) => person.title).join(", ")
          : null;
      searchObject.additionalRulers =
        settlement.additionalRulers && settlement.additionalRulers.length > 0
          ? settlement.additionalRulers.map((person) => person.title).join(", ")
          : null;
      searchObject.hazards = settlement.hazards || null;
      searchObject.effects = settlement.effects || null;
      searchObject.sensory = settlement.sensory || null;
      searchObject.properties = settlement.properties || null;
      searchObject.contents = settlement.contents || null;
      searchObject.pointOfInterest = settlement.pointOfInterest || null;
      break;
    case ArticleTypes.Species:
    case ArticleTypes.Species:
      let species: Species = article as Species;
      searchObject.trinominal = species.trinominal || null;
      searchObject.ancenstry = species.ancenstry || null;
      searchObject.lifespan = species.lifespan || null;
      searchObject.anatomy = species.anatomy || null;
      searchObject.perception = species.perception || null;
      searchObject.genetics = species.genetics || null;
      searchObject.ecology = species.ecology || null;
      searchObject.diet = species.diet || null;
      searchObject.domestication = species.domestication || null;
      searchObject.uses = species.uses || null;
      searchObject.biocycle = species.biocycle || null;
      searchObject.growthrate = species.growthrate || null;
      searchObject.symbiotic = species.symbiotic || null;
      searchObject.isSentient = species.isSentient || null;
      searchObject.isIntelligent = species.isIntelligent || null;
      searchObject.geographicalOrigin = species.geographicalOrigin || null;
      searchObject.averageIntelligence = species.averageIntelligence || null;
      searchObject.averagePhysique = species.averagePhysique || null;
      searchObject.facialCharacteristics =
        species.facialCharacteristics || null;
      searchObject.skinHairColor = species.skinHairColor || null;
      searchObject.traits = species.traits || null;
      searchObject.averageHeight = species.averageHeight || null;
      searchObject.averageWeight = species.averageWeight || null;
      searchObject.averageLength = species.averageLength || null;
      searchObject.namingTraditions = species.namingTraditions || null;
      searchObject.firstnamesMale = species.firstnamesMale || null;
      searchObject.firstnamesFemale = species.firstnamesFemale || null;
      searchObject.lastnames = species.lastnames || null;
      searchObject.majorReligions = species.majorReligions || null;
      searchObject.majorOrganizations = species.majorOrganizations || null;
      searchObject.beautyIdeals = species.beautyIdeals || null;
      searchObject.genderIdeals = species.genderIdeals || null;
      searchObject.courtshipIdeals = species.courtshipIdeals || null;
      searchObject.relationshipsIdeals = species.relationshipsIdeals || null;
      searchObject.technologicalLevel = species.technologicalLevel || null;
      searchObject.languages = species.languages || null;
      searchObject.etiquette = species.etiquette || null;
      searchObject.dresscode = species.dresscode || null;
      searchObject.culture = species.culture || null;
      searchObject.customs = species.customs || null;
      searchObject.taboos = species.taboos || null;
      searchObject.history = species.history || null;
      searchObject.socialstructure = species.socialstructure || null;
      searchObject.mythsAndLegends = species.mythsAndLegends || null;
      searchObject.historicalFigures = species.historicalFigures || null;
      searchObject.interspeciesRelations =
        species.interspeciesRelations || null;
      searchObject.isExtinct = species.isExtinct || null;
      searchObject.conservation = species.conservation || null;
      searchObject.behaviour = species.behaviour || null;
      searchObject.datasheet = species.datasheet || null;
      searchObject.discoverer = species.discoverer
        ? species.discoverer.title
        : null;
      searchObject.locations =
        species.locations && species.locations.length > 0
          ? species.locations.map((location) => location.title).join(", ")
          : null;
      searchObject.relatedOrganizations =
        species.relatedOrganizations && species.relatedOrganizations.length > 0
          ? species.relatedOrganizations
              .map((organization) => organization.title)
              .join(", ")
          : null;
      searchObject.ethnicities =
        species.ethnicities && species.ethnicities.length > 0
          ? species.ethnicities.map((ethnicity) => ethnicity.title).join(", ")
          : null;
      searchObject.parents =
        species.parents && species.parents.length > 0
          ? species.parents.map((parent) => parent.title).join(", ")
          : null;
      break;
    case ArticleTypes.Spell:
      let spell: Spell = article as Spell;
      searchObject.source = spell.source || null;
      searchObject.manifestation = spell.manifestation || null;
      searchObject.effect = spell.effect || null;
      searchObject.discovery = spell.discovery || null;
      searchObject.sideeffects = spell.sideeffects || null;
      searchObject.material = spell.material || null;
      searchObject.gestures = spell.gestures || null;
      searchObject.discipline = spell.discipline || null;
      searchObject.school = spell.school || null;
      searchObject.element = spell.element || null;
      searchObject.duration = spell.duration || null;
      searchObject.castingtime = spell.castingtime || null;
      searchObject.spellrange = spell.spellrange || null;
      searchObject.level = spell.level || null;
      searchObject.restrictions = spell.restrictions || null;
      searchObject.deity = spell.deity ? spell.deity.title : null;
      searchObject.relatedorganizations =
        spell.relatedorganizations && spell.relatedorganizations.length > 0
          ? spell.relatedorganizations
              .map((organization) => organization.title)
              .join(", ")
          : null;
      break;
    case ArticleTypes.Technology:
      let technology: Technology = article as Technology;
      searchObject.inventor = technology.inventor || null;
      searchObject.discovery = technology.discovery || null;
      searchObject.access = technology.access || null;
      searchObject.complexity = technology.complexity || null;
      searchObject.utility = technology.utility || null;
      searchObject.manufacturing = technology.manufacturing || null;
      searchObject.socialImpact = technology.socialImpact || null;
      searchObject.items =
        technology.items && technology.items.length > 0
          ? technology.items.map((item) => item.title).join(", ")
          : null;
      searchObject.usedInVehicles =
        technology.usedInVehicles && technology.usedInVehicles.length > 0
          ? technology.usedInVehicles.map((vehicle) => vehicle.title).join(", ")
          : null;
      searchObject.professions =
        technology.professions && technology.professions.length > 0
          ? technology.professions
              .map((profession) => profession.title)
              .join(", ")
          : null;
      searchObject.parents =
        technology.parents && technology.parents.length > 0
          ? technology.parents.map((parent) => parent.title).join(", ")
          : null;
      searchObject.materials =
        technology.materials && technology.materials.length > 0
          ? technology.materials.map((material) => material.title).join(", ")
          : null;
      searchObject.relatedSpecies =
        technology.relatedSpecies && technology.relatedSpecies.length > 0
          ? technology.relatedSpecies.map((species) => species.title).join(", ")
          : null;
      break;
    case ArticleTypes.Vehicle:
      let vehicle: Vehicle = article as Vehicle;
      searchObject.class = vehicle.class || null;
      searchObject.nickname = vehicle.nickname || null;
      searchObject.designation = vehicle.designation || null;
      searchObject.motto = vehicle.motto || null;
      searchObject.price = vehicle.price || null;
      searchObject.rarity = vehicle.rarity || null;
      searchObject.length = vehicle.length || null;
      searchObject.beam = vehicle.beam || null;
      searchObject.height = vehicle.height || null;
      searchObject.weight = vehicle.weight || null;
      searchObject.speed = vehicle.speed || null;
      searchObject.compliment = vehicle.compliment || null;
      searchObject.power = vehicle.power || null;
      searchObject.propulsion = vehicle.propulsion || null;
      searchObject.armament = vehicle.armament || null;
      searchObject.defenses = vehicle.defenses || null;
      searchObject.communication = vehicle.communication || null;
      searchObject.sensors = vehicle.sensors || null;
      searchObject.systems = vehicle.systems || null;
      searchObject.hangar = vehicle.hangar || null;
      searchObject.cargocapacity = vehicle.cargocapacity || null;
      searchObject.vehicleCreationDate = vehicle.vehicleCreationDate || null;
      searchObject.vehicleDecommissionDate =
        vehicle.vehicleDecommissionDate || null;
      searchObject.vehicleDestructionDate =
        vehicle.vehicleDestructionDate || null;
      searchObject.parent = vehicle.parent ? vehicle.parent.title : null;
      searchObject.manufacturer = vehicle.manufacturer
        ? vehicle.manufacturer.title
        : null;
      searchObject.organization = vehicle.organization
        ? vehicle.organization.title
        : null;
      searchObject.owner = vehicle.owner ? vehicle.owner.title : null;
      searchObject.vehicleLocation = vehicle.vehicleLocation
        ? vehicle.vehicleLocation.title
        : null;
      searchObject.rooms =
        vehicle.rooms && vehicle.rooms.length > 0
          ? vehicle.rooms.map((room) => room.title).join(", ")
          : null;
      searchObject.technologiesUsed =
        vehicle.technologiesUsed && vehicle.technologiesUsed.length > 0
          ? vehicle.technologiesUsed
              .map((technology) => technology.title)
              .join(", ")
          : null;
      searchObject.myths =
        vehicle.myths && vehicle.myths.length > 0
          ? vehicle.myths.map((myth) => myth.title).join(", ")
          : null;
      searchObject.professions =
        vehicle.professions && vehicle.professions.length > 0
          ? vehicle.professions.map((profession) => profession.title).join(", ")
          : null;
      break;
    default:
      break;
  }

  return searchObject;
}
