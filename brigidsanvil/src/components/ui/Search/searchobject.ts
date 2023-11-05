import { Article, ArticleTypes } from "@/components/types/article";
import { Organisation } from "@/components/types/article-types/organisation";

export const searchableFields = [
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

  switch (article.entityClass) {
    case ArticleTypes.Condition:
      break;
    case ArticleTypes.Document:
      break;
    case ArticleTypes.Ethnicity:
      break;
    case ArticleTypes.Formation:
      break;
    case ArticleTypes.Item:
      break;
    case ArticleTypes.Person:
      break;
    case ArticleTypes.Landmark:
      break;
    case ArticleTypes.Language:
      break;
    case ArticleTypes.Law:
      break;
    case ArticleTypes.Location:
      break;
    case ArticleTypes.Material:
      break;
    case ArticleTypes.MilitaryConflict:
      break;
    case ArticleTypes.Myth:
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
      break;
    case ArticleTypes.Profession:
      break;
    case ArticleTypes.Prose:
      break;
    case ArticleTypes.Rank:
      break;
    case ArticleTypes.Report:
      break;
    case ArticleTypes.Settlement:
      break;
    case ArticleTypes.Species:
      break;
    case ArticleTypes.Spell:
      break;
    case ArticleTypes.Technology:
      break;
    case ArticleTypes.Vehicle:
      break;
    default:
      break;
  }

  return searchObject;
}
