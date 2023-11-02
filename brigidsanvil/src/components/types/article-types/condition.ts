import { Article, ArticleDisplay } from "../article";
import { Species } from "./species";

export type Condition = Article & {
    causes: string | null;
    transmissionvectors: string | null;
    prognosis: string | null;
    symptoms: string | null;
    treatment: string | null;
    sequela: string | null;
    affectedgroups: string | null;
    prevention: string | null;
    epidemiology: string | null;
    history: string | null;
    reception: string | null;
    hosts: string | null;
    type: string | null;
    origin: string | null;
    rarity: string | null;
    cycle: string | null;
    children: Condition[] | null;
    parent: Condition | null;
    species: Species[] | null;
}

export class ConditionDisplay extends ArticleDisplay {
    body: {
      content: string | null;
      transmissionAndVectors: string | null;
      causes: string | null;
      symptoms: string | null;
      treatment: string | null;
      prognosis: string | null;
      sequela: string | null;
      affectedGroups: string | null;
      hostsAndCarriers: string | null;
      prevention: string | null;
      epidemiology: string | null;
      history: string | null;
      culturalReception: string | null;
    };
  
    sidebar: {
      sidebarcontent: string | null;
      sidepanelcontenttop: string | null;
      type: string | null;
      parent:  string | null;
      origin: string | null;
      cycle: string | null;
      rarity: string | null;
      affectedSpecies:  string | null;
      sidepanelcontent: string | null;
      sidebarcontentbottom: string | null;
    };
  
    constructor(condition: Condition) {
      super(condition);
  
      this.header = {
        subheading: condition.subheading ? condition.subheading : null,
      };
  
      this.body = {
        content: condition.content ? condition.content : null,
        transmissionAndVectors: condition.transmissionvectors ? condition.transmissionvectors : null,
        causes: condition.causes ? condition.causes : null,
        symptoms: condition.symptoms ? condition.symptoms : null,
        treatment: condition.treatment ? condition.treatment : null,
        prognosis: condition.prognosis ? condition.prognosis : null,
        sequela: condition.sequela ? condition.sequela : null,
        affectedGroups: condition.affectedgroups ? condition.affectedgroups : null,
        hostsAndCarriers: condition.hosts ? condition.hosts : null,
        prevention: condition.prevention ? condition.prevention : null,
        epidemiology: condition.epidemiology ? condition.epidemiology : null,
        history: condition.history ? condition.history : null,
        culturalReception: condition.reception ? condition.reception : null,
      };
  
      this.sidebar = {
        sidebarcontent: condition.sidebarcontent ? condition.sidebarcontent : null,
        sidepanelcontenttop: condition.sidepanelcontenttop
          ? condition.sidepanelcontenttop
          : null,
        type: condition.type ? condition.type : null,
        parent: condition.parent ? this.formatMention(condition.parent) : null,
        origin: condition.origin ? condition.origin : null,
        cycle: condition.cycle ? condition.cycle : null,
        rarity: condition.rarity ? condition.rarity : null,
        affectedSpecies: condition.species ? this.formatMentions(condition.species) : null,
        sidepanelcontent: condition.sidepanelcontent ? condition.sidepanelcontent : null,
        sidebarcontentbottom: condition.sidebarcontentbottom
          ? condition.sidebarcontentbottom
          : null,
      };
    }
  }