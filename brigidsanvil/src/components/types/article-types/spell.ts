import { Article, ArticleDisplay } from "../article";
import { Organisation } from "./organisation";
import { Person } from "./person";

export type Spell = Article & {
  source: string;
  manifestation: string;
  effect: string;
  discovery: string;
  sideeffects: string;
  material: string;
  gestures: string;
  discipline: string;
  school: string;
  element: string;
  duration: string;
  castingtime: string;
  spellrange: string;
  level: string;
  restrictions: string;
  deity: Person;
  relatedorganizations: Organisation[];
};

export class SpellDisplay extends ArticleDisplay {
  body: {
    content: string | null;
    effect: string | null;
    sideOrSecondaryEffects: string | null;
    manifestation: string | null;
    source: string | null;
    discovery: string | null;
  };

  sidebar: {
    sidebarcontent: string | null;
    sidepanelcontenttop: string | null;
    relatedDeityOrHigherPower: string | null;
    relatedOrganisations: string | null;
    materialComponents: string | null;
    gesturesAndRituals: string | null;
    relatedDiscipline: string | null;
    relatedSchool: string | null;
    relatedElement: string | null;
    effectDuration: string | null;
    effectCastingTime: string | null;
    range: string | null;
    level: string | null;
    appliedRestriction: string | null;
    sidepanelcontent: string | null;
    sidebarcontentbottom: string | null;
  };

  constructor(spell: Spell) {
    super(spell);

    this.header = {
      subheading: spell.subheading ? spell.subheading : null,
    };

    this.body = {
      content: spell.content ? spell.content : null,
      effect: spell.effect ? spell.effect : null,
      sideOrSecondaryEffects: spell.sideeffects ? spell.sideeffects : null,
      manifestation: spell.manifestation ? spell.manifestation : null,
      source: spell.source ? spell.source : null,
      discovery: spell.discovery ? spell.discovery : null,
    };

    this.sidebar = {
      sidebarcontent: spell.sidebarcontent ? spell.sidebarcontent : null,
      sidepanelcontenttop: spell.sidepanelcontenttop
        ? spell.sidepanelcontenttop
        : null,
      relatedDeityOrHigherPower: spell.deity
        ? this.formatMention(spell.deity)
        : null,
      relatedOrganisations: spell.relatedorganizations
        ? this.formatMentions(spell.relatedorganizations)
        : null,
      materialComponents: spell.material ? spell.material : null,
      gesturesAndRituals: spell.gestures ? spell.gestures : null,
      relatedDiscipline: spell.discipline ? spell.discipline : null,
      relatedSchool: spell.school ? spell.school : null,
      relatedElement: spell.element ? spell.element : null,
      effectDuration: spell.duration ? spell.duration : null,
      effectCastingTime: spell.castingtime ? spell.castingtime : null,
      range: spell.spellrange ? spell.spellrange : null,
      level: spell.level ? spell.level : null,
      appliedRestriction: spell.restrictions ? spell.restrictions : null,
      sidepanelcontent: spell.sidepanelcontent ? spell.sidepanelcontent : null,
      sidebarcontentbottom: spell.sidebarcontentbottom
        ? spell.sidebarcontentbottom
        : null,
    };
  }
}
