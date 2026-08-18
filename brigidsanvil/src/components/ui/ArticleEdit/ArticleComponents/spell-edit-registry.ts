import { ArticleFieldConfig } from "../EditComponents/article-edit-field-renderer";
import {
  createCommonBodyFieldRegistry,
  createCommonFooterFieldRegistry,
  createCommonSidebarFieldRegistry,
  createCommonSubtitleFieldRegistry,
  createCommonDesignFieldRegistry,
} from "../EditComponents/article-edit-registry-common";
import { Spell } from "@/components/types/article-types/spell";

export type SpellBodySubTabConfig = {
  eventKey: string;
  title: string;
  fields: ArticleFieldConfig<Spell>[];
};

export const bodyFieldRegistry: ArticleFieldConfig<Spell>[] = [
  ...createCommonBodyFieldRegistry<Spell>(),
];

export const bodySubTabRegistry: SpellBodySubTabConfig[] = [
  {
    eventKey: "information",
    title: "Information",
    fields: [
      {
        key: "body-effect",
        kind: "bbcode",
        fieldIdentifier: "effect",
        label: "Effect",
      },
      {
        key: "body-sideeffects",
        kind: "bbcode",
        fieldIdentifier: "sideeffects",
        label: "Side/Secondary Effects",
      },
      {
        key: "body-manifestation",
        kind: "bbcode",
        fieldIdentifier: "manifestation",
        label: "Manifestation",
      },
      {
        key: "body-source",
        kind: "bbcode",
        fieldIdentifier: "source",
        label: "Source",
      },
      {
        key: "body-discovery",
        kind: "bbcode",
        fieldIdentifier: "discovery",
        label: "Discovery",
      },
    ],
  },
  {
    eventKey: "sidebar-details",
    title: "Sidebar Details",
    fields: [
      {
        key: "body-deity",
        kind: "dropdown",
        fieldIdentifier: "deity",
        label: "Related Deity/Higher Power",
        entityClass: ["Person"],
      },
      {
        key: "body-relatedorganizations",
        kind: "dropdown",
        fieldIdentifier: "relatedorganizations",
        label: "Related Organisations",
        entityClass: ["Organization"],
        isMulti: true,
      },
      {
        key: "body-material",
        kind: "bbcode",
        fieldIdentifier: "material",
        label: "Material Components",
      },
      {
        key: "body-gestures",
        kind: "bbcode",
        fieldIdentifier: "gestures",
        label: "Gestures & Rituals",
      },
      {
        key: "body-discipline",
        kind: "bbcode",
        fieldIdentifier: "discipline",
        label: "Related Discipline",
      },
      {
        key: "body-school",
        kind: "bbcode",
        fieldIdentifier: "school",
        label: "Related School",
      },
      {
        key: "body-element",
        kind: "bbcode",
        fieldIdentifier: "element",
        label: "Related Element",
      },
      {
        key: "body-duration",
        kind: "text",
        fieldIdentifier: "duration",
        label: "Effect Duration",
      },
      {
        key: "body-castingtime",
        kind: "text",
        fieldIdentifier: "castingtime",
        label: "Casting Time",
      },
      {
        key: "body-spellrange",
        kind: "text",
        fieldIdentifier: "spellrange",
        label: "Spell Range",
      },
      {
        key: "body-level",
        kind: "text",
        fieldIdentifier: "level",
        label: "Level",
      },
      {
        key: "body-restrictions",
        kind: "bbcode",
        fieldIdentifier: "restrictions",
        label: "Applied Restriction",
      },
    ],
  },
];

export const subtitleFieldRegistry: ArticleFieldConfig<Spell>[] = [
  ...createCommonSubtitleFieldRegistry<Spell>(),
];

export const sidebarFieldRegistry: ArticleFieldConfig<Spell>[] = [
  ...createCommonSidebarFieldRegistry<Spell>(),
];

export const footerFieldRegistry: ArticleFieldConfig<Spell>[] = [
  ...createCommonFooterFieldRegistry<Spell>(),
];

export const designFieldRegistry: ArticleFieldConfig<Spell>[] = [
  ...createCommonDesignFieldRegistry<Spell>(),
];
