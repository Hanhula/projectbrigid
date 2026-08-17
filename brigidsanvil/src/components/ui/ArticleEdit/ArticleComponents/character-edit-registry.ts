import { Person } from "@/components/types/article-types/person";
import { ArticleFieldConfig } from "../EditComponents/article-edit-field-renderer";
import {
  createCommonBodyFieldRegistry,
  createCommonFooterFieldRegistry,
  createCommonSidebarFieldRegistry,
  createCommonSubtitleFieldRegistry,
  createCommonDesignFieldRegistry,
} from "../EditComponents/article-edit-registry-common";

export type CharacterBodySubTabConfig = {
  eventKey: string;
  title: string;
  fields: ArticleFieldConfig<Person>[];
};

export const bodyFieldRegistry: ArticleFieldConfig<Person>[] =
  createCommonBodyFieldRegistry<Person>();

export const bodySubTabRegistry: CharacterBodySubTabConfig[] = [
  {
    eventKey: "divine",
    title: "Divine Characteristics",
    fields: [
      {
        key: "body-divine-domains",
        kind: "bbcode",
        fieldIdentifier: "domains",
        label: "Divine Domains",
      },
      {
        key: "body-divine-artifacts",
        kind: "bbcode",
        fieldIdentifier: "artifacts",
        label: "Artifacts",
      },
      {
        key: "body-divine-codes",
        kind: "bbcode",
        fieldIdentifier: "codes",
        label: "Holy Books & Codes",
      },
      {
        key: "body-divine-holysymbols",
        kind: "bbcode",
        fieldIdentifier: "holysymbols",
        label: "Divine Symbols & Sigils",
      },
      {
        key: "body-divine-tenets",
        kind: "bbcode",
        fieldIdentifier: "tenets",
        label: "Tenets of Faith",
      },
      {
        key: "body-divine-holidays",
        kind: "bbcode",
        fieldIdentifier: "holidays",
        label: "Holidays",
      },
      {
        key: "body-divine-goals",
        kind: "bbcode",
        fieldIdentifier: "goals",
        label: "Divine Goals & Aspirations",
      },
      {
        key: "sidebar-realm",
        kind: "dropdown",
        fieldIdentifier: "realm",
        label: "Sidebar- Realm",
        entityClass: ["Settlement", "Landmark", "Location"],
      },
      {
        key: "sidebar-church",
        kind: "dropdown",
        fieldIdentifier: "church",
        entityClass: ["Organization"],
        label: "Sidebar - Church/Cult",
      },
      {
        key: "sidebar-classification",
        kind: "text",
        fieldIdentifier: "classification",
        label: "Sidebar - Divine Classification",
      },
      {
        key: "sidebar-religions-note",
        kind: "note",
        label: "Sidebar - Religions",
        message:
          "This field is added by the Organisation template's Deities field. It must be set there!",
        showWhen: (article) => Boolean(article.religions),
      },
    ],
  },
  {
    eventKey: "physDesc",
    title: "Physical Description",
    fields: [
      {
        key: "body-physique",
        kind: "bbcode",
        fieldIdentifier: "physique",
        label: "General Physical Condition",
      },
      {
        key: "body-bodyFeatures",
        kind: "bbcode",
        fieldIdentifier: "bodyFeatures",
        label: "Body Features",
      },
      {
        key: "body-facialFeatures",
        kind: "bbcode",
        fieldIdentifier: "facialFeatures",
        label: "Facial Features",
      },
      {
        key: "body-identifyingCharacteristics",
        kind: "bbcode",
        fieldIdentifier: "identifyingCharacteristics",
        label: "Identifying Characteristics",
      },
      {
        key: "body-quirksPhysical",
        kind: "bbcode",
        fieldIdentifier: "quirksPhysical",
        label: "Physical Quirks",
      },
      {
        key: "body-clothing",
        kind: "bbcode",
        fieldIdentifier: "clothing",
        label: "Apparel & Accessories",
      },
      {
        key: "body-items",
        kind: "bbcode",
        fieldIdentifier: "items",
        label: "Specialised Equipment",
      },
      {
        key: "body-specialAbilities",
        kind: "bbcode",
        fieldIdentifier: "specialAbilities",
        label: "Special Abilities",
      },
      {
        key: "body-prototype",
        kind: "bbcode",
        fieldIdentifier: "characterPrototype",
        label: "Character Prototype",
      },
    ],
  },
  {
    eventKey: "mental",
    title: "Mental Characteristics",
    fields: [
      {
        key: "body-history",
        kind: "bbcode",
        fieldIdentifier: "history",
        label: "Personal History",
      },
      {
        key: "body-genderidentity",
        kind: "bbcode",
        fieldIdentifier: "genderidentity",
        label: "Gender Identity",
      },
      {
        key: "body-sexuality",
        kind: "bbcode",
        fieldIdentifier: "sexuality",
        label: "Sexuality",
      },
      {
        key: "body-education",
        kind: "bbcode",
        fieldIdentifier: "education",
        label: "Education",
      },
      {
        key: "body-employment",
        kind: "bbcode",
        fieldIdentifier: "employment",
        label: "Employment",
      },
      {
        key: "body-achievements",
        kind: "bbcode",
        fieldIdentifier: "achievements",
        label: "Accomplishments & Achievements",
      },
      {
        key: "body-failures",
        kind: "bbcode",
        fieldIdentifier: "failures",
        label: "Failures & Embarrassments",
      },
      {
        key: "body-mentalTraumas",
        kind: "bbcode",
        fieldIdentifier: "mentalTraumas",
        label: "Mental Trauma",
      },
      {
        key: "body-intellectualCharacteristics",
        kind: "bbcode",
        fieldIdentifier: "intellectualCharacteristics",
        label: "Intellectual Characteristics",
      },
      {
        key: "body-morality",
        kind: "bbcode",
        fieldIdentifier: "morality",
        label: "Morality & Philosophy",
      },
      {
        key: "body-taboos",
        kind: "bbcode",
        fieldIdentifier: "taboos",
        label: "Taboos",
      },
      {
        key: "body-languages",
        kind: "bbcode",
        fieldIdentifier: "languages",
        label: "Known Languages",
      },
    ],
  },
  {
    eventKey: "personality",
    title: "Personality Characteristics",
    fields: [
      {
        key: "body-motivation",
        kind: "bbcode",
        fieldIdentifier: "motivation",
        label: "Motivation",
      },
      {
        key: "body-quotes",
        kind: "bbcode",
        fieldIdentifier: "quotes",
        label: "Famous Quotes & Catchphrases",
      },
      {
        key: "body-savviesIneptitudes",
        kind: "bbcode",
        fieldIdentifier: "savviesIneptitudes",
        label: "Savvies & Ineptitudes",
      },
      {
        key: "body-likesDislikes",
        kind: "bbcode",
        fieldIdentifier: "likesDislikes",
        label: "Likes & Dislikes",
      },
      {
        key: "body-virtues",
        kind: "bbcode",
        fieldIdentifier: "virtues",
        label: "Virtues & Personality Perks",
      },
      {
        key: "body-vices",
        kind: "bbcode",
        fieldIdentifier: "vices",
        label: "Vices & Personality Flaws",
      },
      {
        key: "body-quirksPersonality",
        kind: "bbcode",
        fieldIdentifier: "quirksPersonality",
        label: "Tics & Quirks",
      },
      {
        key: "body-hygiene",
        kind: "bbcode",
        fieldIdentifier: "hygiene",
        label: "Hygiene",
      },
      {
        key: "body-legacy",
        kind: "bbcode",
        fieldIdentifier: "representationLegacy",
        label: "Legacy",
      },
    ],
  },
  {
    eventKey: "social",
    title: "Social",
    fields: [
      {
        key: "body-titles",
        kind: "bbcode",
        fieldIdentifier: "titles",
        label: "Titles",
      },
      {
        key: "body-reign",
        kind: "bbcode",
        fieldIdentifier: "reign",
        label: "Reign",
      },
      {
        key: "body-wealth",
        kind: "bbcode",
        fieldIdentifier: "wealth",
        label: "Wealth & Financial State",
      },
      {
        key: "body-relations",
        kind: "bbcode",
        fieldIdentifier: "relations",
        label: "Contacts & Relations",
      },
      {
        key: "body-family",
        kind: "bbcode",
        fieldIdentifier: "family",
        label: "Family Ties",
      },
      {
        key: "body-religion",
        kind: "bbcode",
        fieldIdentifier: "religion",
        label: "Religious Views",
      },
      {
        key: "body-socialAptitude",
        kind: "bbcode",
        fieldIdentifier: "socialAptitude",
        label: "Social Aptitude",
      },
      {
        key: "body-mannerisms",
        kind: "bbcode",
        fieldIdentifier: "mannerisms",
        label: "Mannerisms",
      },
      {
        key: "body-hobbies",
        kind: "bbcode",
        fieldIdentifier: "hobbies",
        label: "Hobbies & Pets",
      },
      {
        key: "body-speech",
        kind: "bbcode",
        fieldIdentifier: "speech",
        label: "Speech",
      },
    ],
  },
  {
    eventKey: "sidebar-presentation-display",
    title: "Sidebar - Presentation",
    fields: [
      {
        key: "sidebar-portrait",
        kind: "numerical",
        fieldIdentifier: "portrait",
        label: "Portrait",
        valueAsReference: true,
        helpText: "Enter the numeric ID, like 7929092!",
      },
      {
        key: "sidebar-eyes",
        kind: "text",
        fieldIdentifier: "eyes",
        label: "Eyes",
      },
      {
        key: "sidebar-skin",
        kind: "text",
        fieldIdentifier: "skin",
        label: "Skin/Feathers/Fur Pigmentation",
      },
      {
        key: "sidebar-hair",
        kind: "text",
        fieldIdentifier: "hair",
        label: "Hair",
      },
      {
        key: "sidebar-height",
        kind: "text",
        fieldIdentifier: "height",
        label: "Height",
      },
      {
        key: "sidebar-weight",
        kind: "text",
        fieldIdentifier: "weight",
        label: "Weight",
      },
      {
        key: "sidebar-sex",
        kind: "text",
        fieldIdentifier: "sex",
        label: "Sex",
      },
      {
        key: "sidebar-gender",
        kind: "text",
        fieldIdentifier: "gender",
        label: "Gender",
      },
      {
        key: "sidebar-presentation",
        kind: "text",
        fieldIdentifier: "presentation",
        label: "Presentation",
      },
    ],
  },
  {
    eventKey: "sidebar-origins",
    title: "Sidebar - Origins",
    fields: [
      {
        key: "sidebar-age",
        kind: "text",
        fieldIdentifier: "age",
        label: "Age",
      },
      {
        key: "sidebar-pronouns",
        kind: "text",
        fieldIdentifier: "pronouns",
        label: "Pronouns",
      },
      {
        key: "sidebar-species",
        kind: "dropdown",
        fieldIdentifier: "species",
        label: "Species",
        entityClass: ["Species"],
      },
      {
        key: "sidebar-ethnicity",
        kind: "dropdown",
        fieldIdentifier: "ethnicity",
        label: "Ethnicity",
        entityClass: ["Ethnicity"],
      },
      {
        key: "sidebar-other-ethnicities",
        kind: "dropdown",
        fieldIdentifier: "otherethnicities",
        label: "Secondary Ethnicities/Cultures",
        entityClass: ["Ethnicity"],
        isMulti: true,
      },
      {
        key: "sidebar-family",
        kind: "dropdown",
        fieldIdentifier: "familyorganization",
        label: "Family",
        entityClass: ["Organization"],
      },
    ],
  },
  {
    eventKey: "sidebar-current-state",
    title: "Sidebar - Current State",
    fields: [
      {
        key: "sidebar-deity",
        kind: "text",
        fieldIdentifier: "deity",
        label: "Belief or Deity",
      },
      {
        key: "sidebar-currentstatus",
        kind: "text",
        fieldIdentifier: "currentstatus",
        label: "Current Status",
      },
      {
        key: "sidebar-currentLocation",
        kind: "dropdown",
        fieldIdentifier: "currentLocation",
        label: "Current Location",
        entityClass: ["Settlement", "Landmark", "Location"],
      },
      {
        key: "sidebar-vehicle",
        kind: "dropdown",
        fieldIdentifier: "vehicle",
        label: "Currently Boarded Vehicle",
        entityClass: ["Vehicle"],
      },
      {
        key: "sidebar-residence",
        kind: "bbcode",
        fieldIdentifier: "residence",
        label: "Residence",
      },
      {
        key: "sidebar-organization",
        kind: "dropdown",
        fieldIdentifier: "organization",
        label: "Affiliated Organisation, Primary",
        entityClass: ["Organization"],
      },
      {
        key: "sidebar-relatedorganizations",
        kind: "dropdown",
        fieldIdentifier: "relatedorganizations",
        label: "Affiliated Organisations, Secondary",
        entityClass: ["Organization"],
        isMulti: true,
      },
      {
        key: "sidebar-conditions",
        kind: "dropdown",
        fieldIdentifier: "conditions",
        label: "Conditions",
        entityClass: ["Condition"],
        isMulti: true,
      },
      {
        key: "sidebar-alignment",
        kind: "text",
        fieldIdentifier: "rpgAlignment",
        label: "Alignment",
      },
      {
        key: "sidebar-proses",
        kind: "dropdown",
        fieldIdentifier: "proses",
        label: "Related Prose Articles",
        entityClass: ["Prose"],
        isMulti: true,
      },
    ],
  },
  {
    eventKey: "sidebar-dates",
    title: "Sidebar - Dates",
    fields: [
      {
        key: "sidebar-birthday",
        kind: "text",
        fieldIdentifier: "dobDisplay",
        label: "Birthday Date",
      },
      {
        key: "sidebar-yearOfBirth",
        kind: "text",
        fieldIdentifier: "dob",
        label: "Year of Birth",
      },
      {
        key: "sidebar-placeOfBirth",
        kind: "text",
        fieldIdentifier: "birthplace",
        label: "Place of Birth",
      },
      {
        key: "sidebar-circumstancesBirth",
        kind: "text",
        fieldIdentifier: "circumstancesBirth",
        label: "Circumstances of Birth",
      },
      {
        key: "sidebar-deathday",
        kind: "text",
        fieldIdentifier: "dodDisplay",
        label: "Death Date",
      },
      {
        key: "sidebar-yearOfDeath",
        kind: "text",
        fieldIdentifier: "dod",
        label: "Year of Death",
      },
      {
        key: "sidebar-placeOfDeath",
        kind: "text",
        fieldIdentifier: "placeOfDeath",
        label: "Place of Death",
        mentions: true,
      },
      {
        key: "sidebar-circumstancesDeath",
        kind: "text",
        fieldIdentifier: "circumstancesDeath",
        label: "Circumstances of Death",
      },
    ],
  },
];

export const subtitleFieldRegistry: ArticleFieldConfig<Person>[] = [
  ...createCommonSubtitleFieldRegistry<Person>(),
  {
    key: "subtitle-honorific",
    kind: "text",
    fieldIdentifier: "honorific",
    label: "Honorific / Title",
  },
  {
    key: "subtitle-firstname",
    kind: "text",
    fieldIdentifier: "firstname",
    label: "First Name",
  },
  {
    key: "subtitle-middlename",
    kind: "text",
    fieldIdentifier: "middlename",
    label: "Middle Name",
  },
  {
    key: "subtitle-lastname",
    kind: "text",
    fieldIdentifier: "lastname",
    label: "Last Name",
  },
  {
    key: "subtitle-maidenname",
    kind: "text",
    fieldIdentifier: "maidenname",
    label: "Maiden Name",
  },
  {
    key: "subtitle-suffix",
    kind: "text",
    fieldIdentifier: "suffix",
    label: "Suffix",
  },
  {
    key: "subtitle-nickname",
    kind: "text",
    fieldIdentifier: "nickname",
    label: "Nickname / Alias",
  },
];

export const sidebarFieldRegistry: ArticleFieldConfig<Person>[] = [
  ...createCommonSidebarFieldRegistry<Person>(),
];

export const footerFieldRegistry: ArticleFieldConfig<Person>[] = [
  ...createCommonFooterFieldRegistry<Person>(),
];

export const designFieldRegistry: ArticleFieldConfig<Person>[] = [
  ...createCommonDesignFieldRegistry<Person>(),
];
