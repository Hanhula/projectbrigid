import { Person } from "@/components/types/article-types/person";
import { ArticleFieldConfig } from "./article-edit-field-renderer";
import {
  createCommonBodyFieldRegistry,
  createCommonFooterFieldRegistry,
  createCommonSidebarFieldRegistry,
  createCommonSubtitleFieldRegistry,
} from "./article-edit-registry-common";

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
    ],
  },
  {
    eventKey: "physDesc",
    title: "Physical Description",
    fields: [
      {
        key: "body-phys-physique",
        kind: "bbcode",
        fieldIdentifier: "physique",
        label: "General Physical Condition",
      },
      {
        key: "body-phys-bodyFeatures",
        kind: "bbcode",
        fieldIdentifier: "bodyFeatures",
        label: "Body Features",
      },
      {
        key: "body-phys-facialFeatures",
        kind: "bbcode",
        fieldIdentifier: "facialFeatures",
        label: "Facial Features",
      },
      {
        key: "body-phys-identifyingCharacteristics",
        kind: "bbcode",
        fieldIdentifier: "identifyingCharacteristics",
        label: "Identifying Characteristics",
      },
      {
        key: "body-phys-quirksPhysical",
        kind: "bbcode",
        fieldIdentifier: "quirksPhysical",
        label: "Physical Quirks",
      },
      {
        key: "body-phys-specialAbilities",
        kind: "bbcode",
        fieldIdentifier: "specialAbilities",
        label: "Special Abilities",
      },
      {
        key: "body-phys-clothing",
        kind: "bbcode",
        fieldIdentifier: "clothing",
        label: "Apparel & Accessories",
      },
      {
        key: "body-phys-items",
        kind: "bbcode",
        fieldIdentifier: "items",
        label: "Specialised Equipment",
      },
    ],
  },
  {
    eventKey: "mentalChara",
    title: "Mental Characteristics",
    fields: [
      {
        key: "body-mental-history",
        kind: "bbcode",
        fieldIdentifier: "history",
        label: "Personal History",
      },
      {
        key: "body-mental-genderidentity",
        kind: "bbcode",
        fieldIdentifier: "genderidentity",
        label: "Gender Identity",
      },
      {
        key: "body-mental-sexuality",
        kind: "bbcode",
        fieldIdentifier: "sexuality",
        label: "Sexuality",
      },
      {
        key: "body-mental-education",
        kind: "bbcode",
        fieldIdentifier: "education",
        label: "Education",
      },
      {
        key: "body-mental-employment",
        kind: "bbcode",
        fieldIdentifier: "employment",
        label: "Employment",
      },
      {
        key: "body-mental-achievements",
        kind: "bbcode",
        fieldIdentifier: "achievements",
        label: "Accomplishments & Achievements",
      },
      {
        key: "body-mental-failures",
        kind: "bbcode",
        fieldIdentifier: "failures",
        label: "Failures & Embarrassments",
      },
      {
        key: "body-mental-mentalTraumas",
        kind: "bbcode",
        fieldIdentifier: "mentalTraumas",
        label: "Mental Trauma",
      },
      {
        key: "body-mental-intellectualCharacteristics",
        kind: "bbcode",
        fieldIdentifier: "intellectualCharacteristics",
        label: "Intellectual Characteristics",
      },
      {
        key: "body-mental-morality",
        kind: "bbcode",
        fieldIdentifier: "morality",
        label: "Morality & Philosophy",
      },
      {
        key: "body-mental-taboos",
        kind: "bbcode",
        fieldIdentifier: "taboos",
        label: "Taboos",
      },
    ],
  },
  {
    eventKey: "personChara",
    title: "Personality Characteristics",
    fields: [
      {
        key: "body-personality-motivation",
        kind: "bbcode",
        fieldIdentifier: "motivation",
        label: "Motivation",
      },
      {
        key: "body-personality-savviesIneptitudes",
        kind: "bbcode",
        fieldIdentifier: "savviesIneptitudes",
        label: "Savvies & Ineptitudes",
      },
      {
        key: "body-personality-likesDislikes",
        kind: "bbcode",
        fieldIdentifier: "likesDislikes",
        label: "Likes & Dislikes",
      },
      {
        key: "body-personality-virtues",
        kind: "bbcode",
        fieldIdentifier: "virtues",
        label: "Virtues & Personality Perks",
      },
      {
        key: "body-personality-vices",
        kind: "bbcode",
        fieldIdentifier: "vices",
        label: "Vices & Personality Flaws",
      },
      {
        key: "body-personality-quirksPersonality",
        kind: "bbcode",
        fieldIdentifier: "quirksPersonality",
        label: "Personality Quirks",
      },
      {
        key: "body-personality-hygiene",
        kind: "bbcode",
        fieldIdentifier: "hygiene",
        label: "Hygiene",
      },
    ],
  },
  {
    eventKey: "socialChara",
    title: "Social",
    fields: [
      {
        key: "body-social-reign",
        kind: "bbcode",
        fieldIdentifier: "reign",
        label: "Reign",
      },
      {
        key: "body-social-relations",
        kind: "bbcode",
        fieldIdentifier: "relations",
        label: "Contacts & Relations",
      },
      {
        key: "body-social-family",
        kind: "bbcode",
        fieldIdentifier: "family",
        label: "Family Ties",
      },
      {
        key: "body-social-religion",
        kind: "bbcode",
        fieldIdentifier: "religion",
        label: "Religious Views",
      },
      {
        key: "body-social-socialAptitude",
        kind: "bbcode",
        fieldIdentifier: "socialAptitude",
        label: "Social Aptitude",
      },
      {
        key: "body-social-mannerisms",
        kind: "bbcode",
        fieldIdentifier: "mannerisms",
        label: "Mannerisms",
      },
      {
        key: "body-social-hobbies",
        kind: "bbcode",
        fieldIdentifier: "hobbies",
        label: "Hobbies & Pets",
      },
      {
        key: "body-social-speech",
        kind: "bbcode",
        fieldIdentifier: "speech",
        label: "Speech",
      },
      {
        key: "body-social-wealth",
        kind: "bbcode",
        fieldIdentifier: "wealth",
        label: "Wealth & Financial State",
      },
    ],
  },
  {
    eventKey: "sidebar-characteristics",
    title: "Sidebar Details",
    fields: [
      {
        key: "sidebar-classification",
        kind: "text",
        fieldIdentifier: "classification",
        label: "Divine Classification",
      },
      {
        key: "sidebar-religions-note",
        kind: "note",
        label: "Religions",
        message:
          "This field is added by the Organisation template's Deities field. It must be set there!",
        showWhen: (article) => Boolean(article.religions),
      },
      {
        key: "sidebar-alignment",
        kind: "text",
        fieldIdentifier: "rpgAlignment",
        label: "Alignment",
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
        entityClass: ["Settlement", "Landmark", "Building"],
      },
      {
        key: "sidebar-vehicle",
        kind: "dropdown",
        fieldIdentifier: "vehicle",
        label: "Currently Boarded Vehicle",
        entityClass: ["Vehicle"],
      },
      {
        key: "sidebar-species",
        kind: "dropdown",
        fieldIdentifier: "species",
        label: "Species",
        entityClass: ["Species"],
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
        key: "sidebar-ethnicity",
        kind: "dropdown",
        fieldIdentifier: "ethnicity",
        label: "Ethnicity",
        entityClass: ["Ethnicity"],
      },
      {
        key: "sidebar-otherethnicities",
        kind: "dropdown",
        fieldIdentifier: "otherethnicities",
        label: "Other Ethnicities/Cultures",
        entityClass: ["Ethnicity"],
        isMulti: true,
      },
      {
        key: "sidebar-realm-note",
        kind: "note",
        label: "Realm",
        message:
          "Not wired yet. Intended to map to the Realm relationship field.",
      },
      {
        key: "sidebar-church-note",
        kind: "note",
        label: "Church/Cult",
        message:
          "Not wired yet. Intended to map to the Church relationship field.",
      },
      {
        key: "sidebar-titles",
        kind: "text",
        fieldIdentifier: "titles",
        label: "Honorary & Occupational Titles",
      },
      {
        key: "sidebar-professions-note",
        kind: "note",
        label: "Professions",
        message:
          "Not wired yet. Intended to map to profession relationship entries.",
      },
      {
        key: "sidebar-held-titles-note",
        kind: "note",
        label: "Currently Held Titles",
        message: "Not wired yet.",
      },
      {
        key: "sidebar-prev-titles-note",
        kind: "note",
        label: "Previously Held Ranks & Titles",
        message: "Not wired yet.",
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
