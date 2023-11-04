import { Article, ArticleDisplay } from "../article";
import { Map } from "../map";
import { Location } from "./location";
import { Person } from "./person";

export type MilitaryConflict = Article & {
  startingDate: string | null;
  endingDate: string | null;
  result: string | null;
  type: string | null;
  battlefieldtype: string | null;
  prelude: string | null;
  deployment: string | null;
  battlefield: string | null;
  conditions: string | null;
  engagement: string | null;
  outcome: string | null;
  legacy: string | null;
  aftermath: string | null;
  history: string | null;
  literature: string | null;
  technology: string | null;
  location: Location | null;
  parent: Person | null;
  belligerents: Person[] | null; // will eventually need custom typing
  maps: Map[] | null;
};

export class MilitaryConflictDisplay extends ArticleDisplay {
  body: {
    content: string | null;
    prelude: string | null;
    deployment: string | null;
    battlefield: string | null;
    conditions: string | null;
    engagement: string | null;
    outcome: string | null;
    aftermath: string | null;
    historicalSignificance: string | null;
    legacy: string | null;
    inLiterature: string | null;
    technologicalAdvancement: string | null;
  };

  sidebar: {
    sidebarcontent: string | null;
    sidepanelcontenttop: string | null;
    includedUnderConflict: string | null;
    conflictType: string | null;
    battlefieldType: string | null;
    startDate: string | null;
    endingDate: string | null;
    conflictResult: string | null;
    location: string | null;
    belligerents: string | null;
    maps: string | null;
    sidepanelcontent: string | null;
    sidebarcontentbottom: string | null;
  };

  constructor(militaryConflict: MilitaryConflict) {
    super(militaryConflict);

    this.body = {
      content: militaryConflict.content ? militaryConflict.content : null,
      prelude: militaryConflict.prelude ? militaryConflict.prelude : null,
      deployment: militaryConflict.deployment
        ? militaryConflict.deployment
        : null,
      battlefield: militaryConflict.battlefield
        ? militaryConflict.battlefield
        : null,
      conditions: militaryConflict.conditions
        ? militaryConflict.conditions
        : null,
      engagement: militaryConflict.engagement
        ? militaryConflict.engagement
        : null,
      outcome: militaryConflict.outcome ? militaryConflict.outcome : null,
      aftermath: militaryConflict.aftermath ? militaryConflict.aftermath : null,
      historicalSignificance: militaryConflict.history
        ? militaryConflict.history
        : null,
      legacy: militaryConflict.legacy ? militaryConflict.legacy : null,
      inLiterature: militaryConflict.literature
        ? militaryConflict.literature
        : null,
      technologicalAdvancement: militaryConflict.technology
        ? militaryConflict.technology
        : null,
    };

    this.sidebar = {
      sidebarcontent: militaryConflict.sidebarcontent
        ? militaryConflict.sidebarcontent
        : null,
      sidepanelcontenttop: militaryConflict.sidepanelcontenttop
        ? militaryConflict.sidepanelcontenttop
        : null,
      includedUnderConflict: militaryConflict.parent
        ? this.formatMention(militaryConflict.parent)
        : null,
      conflictType: militaryConflict.type ? militaryConflict.type : null,
      battlefieldType: militaryConflict.battlefieldtype
        ? militaryConflict.battlefieldtype
        : null,
      startDate: militaryConflict.startingDate
        ? militaryConflict.startingDate
        : null,
      endingDate: militaryConflict.endingDate
        ? militaryConflict.endingDate
        : null,
      conflictResult: militaryConflict.result ? militaryConflict.result : null,
      location: militaryConflict.location
        ? this.formatMention(militaryConflict.location)
        : null,
      belligerents: militaryConflict.belligerents
        ? this.formatTitles(militaryConflict.belligerents)
        : null,
      maps: militaryConflict.maps
        ? this.formatLinks(militaryConflict.maps)
        : null,
      sidepanelcontent: militaryConflict.sidepanelcontent
        ? militaryConflict.sidepanelcontent
        : null,
      sidebarcontentbottom: militaryConflict.sidebarcontentbottom
        ? militaryConflict.sidebarcontentbottom
        : null,
    };
  }
}
