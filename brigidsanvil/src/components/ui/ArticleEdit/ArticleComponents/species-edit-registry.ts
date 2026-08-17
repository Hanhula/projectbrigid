import { ArticleFieldConfig } from "../EditComponents/article-edit-field-renderer";
import {
  createCommonBodyFieldRegistry,
  createCommonFooterFieldRegistry,
  createCommonSidebarFieldRegistry,
  createCommonSubtitleFieldRegistry,
  createCommonDesignFieldRegistry,
} from "../EditComponents/article-edit-registry-common";
import { Species } from "@/components/types/article-types/species";

export type SpeciesBodySubTabConfig = {
  eventKey: string;
  title: string;
  fields: ArticleFieldConfig<Species>[];
};

export const bodyFieldRegistry: ArticleFieldConfig<Species>[] = [
  ...createCommonBodyFieldRegistry<Species>(),
];

export const bodySubTabRegistry: SpeciesBodySubTabConfig[] = [
  {
    eventKey: "basic-information",
    title: "Basic Information",
    fields: [
      {
        key: "body-anatomy",
        kind: "bbcode",
        fieldIdentifier: "anatomy",
        label: "Anatomy",
      },
      {
        key: "body-traits",
        kind: "bbcode",
        fieldIdentifier: "traits",
        label: "Biological Traits",
      },
      {
        key: "body-genetics",
        kind: "bbcode",
        fieldIdentifier: "genetics",
        label: "Genetics and Reproduction",
      },
      {
        key: "body-growthrate",
        kind: "bbcode",
        fieldIdentifier: "growthrate",
        label: "Growth Rate & Stages",
      },
      {
        key: "body-ecology",
        kind: "bbcode",
        fieldIdentifier: "ecology",
        label: "Ecology and Habitats",
      },
      {
        key: "body-diet",
        kind: "bbcode",
        fieldIdentifier: "diet",
        label: "Dietary Needs and Habits",
      },
      {
        key: "body-biocycle",
        kind: "bbcode",
        fieldIdentifier: "biocycle",
        label: "Biological Cycle",
      },
      {
        key: "body-behaviour",
        kind: "bbcode",
        fieldIdentifier: "behaviour",
        label: "Behaviour",
      },
    ],
  },
  {
    eventKey: "additional-information",
    title: "Additional Information",
    fields: [
      {
        key: "body-socialstructure",
        kind: "bbcode",
        fieldIdentifier: "socialstructure",
        label: "Social Structure",
      },
      {
        key: "body-domestication",
        kind: "bbcode",
        fieldIdentifier: "domestication",
        label: "Domestication",
      },
      {
        key: "body-uses",
        kind: "bbcode",
        fieldIdentifier: "uses",
        label: "Uses, Products, & Exploitation",
      },
      {
        key: "body-facialCharacteristics",
        kind: "bbcode",
        fieldIdentifier: "facialCharacteristics",
        label: "Facial Characteristics",
      },
      {
        key: "body-geographicalOrigin",
        kind: "bbcode",
        fieldIdentifier: "geographicalOrigin",
        label: "Geographical Origin",
      },
      {
        key: "body-averageIntelligence",
        kind: "bbcode",
        fieldIdentifier: "averageIntelligence",
        label: "Average Intelligence",
      },
      {
        key: "body-perception",
        kind: "bbcode",
        fieldIdentifier: "perception",
        label: "Perception",
      },
      {
        key: "body-symbiotic",
        kind: "bbcode",
        fieldIdentifier: "symbiotic",
        label: "Symbiotic and Parasitic Organisms",
      },
    ],
  },
  {
    eventKey: "civilisation-culture",
    title: "Civilisation & Culture",
    fields: [
      {
        key: "body-namingTraditions",
        kind: "bbcode",
        fieldIdentifier: "namingTraditions",
        label: "Naming Traditions",
      },
      {
        key: "body-majorOrganizations",
        kind: "bbcode",
        fieldIdentifier: "majorOrganizations",
        label: "Major Organisations",
      },
      {
        key: "body-beautyIdeals",
        kind: "bbcode",
        fieldIdentifier: "beautyIdeals",
        label: "Beauty Ideals",
      },
      {
        key: "body-genderIdeals",
        kind: "bbcode",
        fieldIdentifier: "genderIdeals",
        label: "Gender Ideals",
      },
      {
        key: "body-courtshipIdeals",
        kind: "bbcode",
        fieldIdentifier: "courtshipIdeals",
        label: "Courtship Ideals",
      },
      {
        key: "body-relationshipsIdeals",
        kind: "bbcode",
        fieldIdentifier: "relationshipsIdeals",
        label: "Relationship Ideals",
      },
      {
        key: "body-technologicalLevel",
        kind: "bbcode",
        fieldIdentifier: "technologicalLevel",
        label: "Average Technological Level",
      },
      {
        key: "body-languages",
        kind: "bbcode",
        fieldIdentifier: "languages",
        label: "Major Language Groups and Dialects",
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
        fieldIdentifier: "dresscode",
        label: "Common Dress Code",
      },
      {
        key: "body-culture",
        kind: "bbcode",
        fieldIdentifier: "culture",
        label: "Culture and Cultural Heritage",
      },
      {
        key: "body-customs",
        kind: "bbcode",
        fieldIdentifier: "customs",
        label: "Common Customs, Traditions, and Rituals",
      },
      {
        key: "body-taboos",
        kind: "bbcode",
        fieldIdentifier: "taboos",
        label: "Common Taboos",
      },
      {
        key: "body-history",
        kind: "bbcode",
        fieldIdentifier: "history",
        label: "History",
      },
      {
        key: "body-historicalFigures",
        kind: "bbcode",
        fieldIdentifier: "historicalFigures",
        label: "Historical Figures",
      },
      {
        key: "body-mythsAndLegends",
        kind: "bbcode",
        fieldIdentifier: "mythsAndLegends",
        label: "Common Myths and Legends",
      },
      {
        key: "body-interspeciesRelations",
        kind: "bbcode",
        fieldIdentifier: "interspeciesRelations",
        label: "Interspecies Relations and Assumptions",
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
        key: "sidebar-isExtinct",
        kind: "checkbox",
        fieldIdentifier: "isExtinct",
        label: "Is Extinct?",
        header: "Extinction Status",
      },
      {
        key: "sidebar-parents",
        kind: "dropdown",
        fieldIdentifier: "parents",
        label: "Genetic Ancestor(s)",
        entityClass: ["Species"],
        isMulti: true,
      },
      {
        key: "sidebar-trinominal",
        kind: "text",
        fieldIdentifier: "trinominal",
        label: "Scientific Name",
      },
      {
        key: "sidebar-ancestry",
        kind: "text",
        fieldIdentifier: "ancenstry", // WA spells this wrong...
        label: "Origin/Ancestry",
      },
      {
        key: "sidebar-lifespan",
        kind: "text",
        fieldIdentifier: "lifespan",
        label: "Lifespan",
      },
      {
        key: "sidebar-conservation",
        kind: "text",
        fieldIdentifier: "conservation",
        label: "Conservation Status",
      },
      {
        key: "sidebar-averageHeight",
        kind: "text",
        fieldIdentifier: "averageHeight",
        label: "Average Height",
      },
      {
        key: "sidebar-averageWeight",
        kind: "text",
        fieldIdentifier: "averageWeight",
        label: "Average Weight",
      },
      {
        key: "sidebar-averageLength",
        kind: "text",
        fieldIdentifier: "averageLength",
        label: "Average Length",
      },
      {
        key: "sidebar-averagePhysique",
        kind: "text",
        fieldIdentifier: "averagePhysique",
        label: "Average Physique",
      },
      {
        key: "sidebar-skinHairColor",
        kind: "text",
        fieldIdentifier: "skinHairColor",
        label: "Body Tint, Colouring and Marking",
      },
      {
        key: "sidebar-locations",
        kind: "dropdown",
        fieldIdentifier: "locations",
        label: "Geographic Distribution",
        entityClass: ["Location", "Landmark", "Settlement"],
        isMulti: true,
      },
      {
        key: "sidebar-ethnicities",
        kind: "dropdown",
        fieldIdentifier: "ethnicities",
        label: "Related Ethnicities",
        entityClass: ["Ethnicity"],
        isMulti: true,
      },
      {
        key: "sidebar-discoverer",
        kind: "dropdown",
        fieldIdentifier: "discoverer",
        label: "Discovered By",
        entityClass: ["Person"],
      },
    ],
  },
];

export const subtitleFieldRegistry: ArticleFieldConfig<Species>[] = [
  ...createCommonSubtitleFieldRegistry<Species>(),
];

export const sidebarFieldRegistry: ArticleFieldConfig<Species>[] = [
  ...createCommonSidebarFieldRegistry<Species>(),
];

export const footerFieldRegistry: ArticleFieldConfig<Species>[] = [
  ...createCommonFooterFieldRegistry<Species>(),
];

export const designFieldRegistry: ArticleFieldConfig<Species>[] = [
  ...createCommonDesignFieldRegistry<Species>(),
];
