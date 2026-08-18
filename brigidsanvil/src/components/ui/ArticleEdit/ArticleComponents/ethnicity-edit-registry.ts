import { ArticleFieldConfig } from "../EditComponents/article-edit-field-renderer";
import {
  createCommonBodyFieldRegistry,
  createCommonFooterFieldRegistry,
  createCommonSidebarFieldRegistry,
  createCommonSubtitleFieldRegistry,
  createCommonDesignFieldRegistry,
} from "../EditComponents/article-edit-registry-common";
import { Ethnicity } from "@/components/types/article-types/ethnicity";

export type EthnicityBodySubTabConfig = {
  eventKey: string;
  title: string;
  fields: ArticleFieldConfig<Ethnicity>[];
};

export const bodyFieldRegistry: ArticleFieldConfig<Ethnicity>[] = [
  ...createCommonBodyFieldRegistry<Ethnicity>(),
];

export const bodySubTabRegistry: EthnicityBodySubTabConfig[] = [
  {
    eventKey: "naming-traditions",
    title: "Naming Traditions",
    fields: [
      {
        key: "body-familynames",
        kind: "bbcode",
        fieldIdentifier: "familyNames",
        label: "Family Names",
      },
      {
        key: "body-femalenames",
        kind: "bbcode",
        fieldIdentifier: "femaleNames",
        label: "Feminine Names",
      },
      {
        key: "body-malenames",
        kind: "bbcode",
        fieldIdentifier: "maleNames",
        label: "Masculine Names",
      },
      {
        key: "body-unisexnames",
        kind: "bbcode",
        fieldIdentifier: "unisexNames",
        label: "Unisex Names",
      },
      {
        key: "body-othernames",
        kind: "bbcode",
        fieldIdentifier: "otherNames",
        label: "Other Names",
      },
    ],
  },
  {
    eventKey: "culture",
    title: "Culture",
    fields: [
      {
        key: "body-languages",
        kind: "bbcode",
        fieldIdentifier: "languages",
        label: "Major Language Groups and Dialects",
      },
      {
        key: "body-culture",
        kind: "bbcode",
        fieldIdentifier: "culture",
        label: "Culture & Cultural Heritage",
      },
      {
        key: "body-shared-values",
        kind: "bbcode",
        fieldIdentifier: "sharedValues",
        label: "Shared Customary Codes and Values",
      },
      {
        key: "body-etiquette",
        kind: "bbcode",
        fieldIdentifier: "etiquette",
        label: "Common Etiquette Rules",
      },
      {
        key: "body-dresscode",
        kind: "bbcode",
        fieldIdentifier: "dressCode",
        label: "Common Dress Code",
      },
      {
        key: "body-art",
        kind: "bbcode",
        fieldIdentifier: "art",
        label: "Art and Artistic Heritage",
      },
      {
        key: "body-foods-and-cuisine",
        kind: "bbcode",
        fieldIdentifier: "foodsAndCuisine",
        label: "Foods and Cuisine",
      },
      {
        key: "body-customs",
        kind: "bbcode",
        fieldIdentifier: "customs",
        label: "Common Customs, Traditions, and Rituals",
      },
      {
        key: "body-birthrights",
        kind: "bbcode",
        fieldIdentifier: "birthrights",
        label: "Birth and Baptismal Rites",
      },
      {
        key: "body-comingofagerights",
        kind: "bbcode",
        fieldIdentifier: "comingOfAgeRights",
        label: "Coming of Age Rites",
      },
      {
        key: "body-funeraryCustoms",
        kind: "bbcode",
        fieldIdentifier: "funeraryCustoms",
        label: "Funerary Customs",
      },
      {
        key: "body-taboos",
        kind: "bbcode",
        fieldIdentifier: "taboos",
        label: "Common Taboos",
      },
    ],
  },
  {
    eventKey: "ideals",
    title: "Ideals",
    fields: [
      {
        key: "body-beauty-ideals",
        kind: "bbcode",
        fieldIdentifier: "beautyIdeals",
        label: "Beauty Ideals",
      },
      {
        key: "body-gender-ideals",
        kind: "bbcode",
        fieldIdentifier: "genderIdeals",
        label: "Gender Ideals",
      },
      {
        key: "body-courtship-ideals",
        kind: "bbcode",
        fieldIdentifier: "courtshipIdeals",
        label: "Courtship Ideals",
      },
      {
        key: "body-etiquette",
        kind: "bbcode",
        fieldIdentifier: "etiquette",
        label: "Common Etiquette Rules",
      },
      {
        key: "body-organisations",
        kind: "bbcode",
        fieldIdentifier: "organisations",
        label: "Major Organisations",
      },
    ],
  },
  {
    eventKey: "sidebar-details",
    title: "Sidebar Details",
    fields: [
      {
        key: "sidebar-portrait",
        kind: "numerical",
        fieldIdentifier: "portrait",
        label: "Portrait",
        valueAsReference: true,
        helpText: "Enter the numeric ID, like 7929092",
      },
      {
        key: "body-parent-ethnicities",
        kind: "dropdown",
        fieldIdentifier: "parents",
        label: "Parent Ethnicities",
        entityClass: ["Ethnicity"],
        isMulti: true,
      },
      {
        key: "body-locations",
        kind: "dropdown",
        fieldIdentifier: "locations",
        label: "Related Locations",
        entityClass: ["Location", "Settlement", "Landmark"],
        isMulti: true,
      },
    ],
  },
];

export const subtitleFieldRegistry: ArticleFieldConfig<Ethnicity>[] = [
  ...createCommonSubtitleFieldRegistry<Ethnicity>(),
];

export const sidebarFieldRegistry: ArticleFieldConfig<Ethnicity>[] = [
  ...createCommonSidebarFieldRegistry<Ethnicity>(),
];

export const footerFieldRegistry: ArticleFieldConfig<Ethnicity>[] = [
  ...createCommonFooterFieldRegistry<Ethnicity>(),
];

export const designFieldRegistry: ArticleFieldConfig<Ethnicity>[] = [
  ...createCommonDesignFieldRegistry<Ethnicity>(),
];
