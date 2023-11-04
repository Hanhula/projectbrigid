import { Article, ArticleDisplay } from "../article";
import { Organisation } from "./organisation";
import { Rank } from "./rank";

export type Formation = Article & {
    equipment: string | null;
    manpower: string | null;
    weaponry: string | null;
    vehicles: string | null;
    structure: string | null;
    training: string | null;
    tactics: string | null;
    logistics: string | null;
    support: string | null;
    upkeep: string | null;
    recruitment: string | null;
    foundingDate: string | null;
    dissolutionDate: string | null;
    history: string | null;
    loyalties: string | null;
    type: string | null;
    trainingLevel: string | null;
    veterancy: string | null;
    children: Formation[] | null;
    units: Formation[] | null;
    relatedorganizations: Organisation[] | null;
    relatedranks: Rank[] | null;
}

export class FormationDisplay extends ArticleDisplay {
    body: {
      content: string | null;
      manpower: string | null;
      equipment: string | null;
      weaponry: string | null;
      vehicles: string | null;
      structure: string | null;
      tactics: string | null;
      training: string | null;
      logisticalSupport: string | null;
      auxilia: string | null;
      recruitment: string | null;
      history: string | null;
      historicalLoyalties: string | null;
    };
  
    sidebar: {
      sidebarcontent: string | null;
      sidepanelcontenttop: string | null;
      type: string | null;
      overallTrainingLevel: string | null;
      assumedVeterancy: string | null;
      usedBy: string | null;
      ranksAndTitles: string | null;
      sidepanelcontent: string | null;
      sidebarcontentbottom: string | null;
    };
  
    constructor(formation: Formation) {
      super(formation);
  
      this.body = {
        content: formation.content ? formation.content : null,
        manpower: formation.manpower ? formation.manpower : null,
        equipment: formation.equipment ? formation.equipment : null,
        weaponry: formation.weaponry ? formation.weaponry : null,
        vehicles: formation.vehicles ? formation.vehicles : null,
        structure: formation.structure ? formation.structure : null,
        tactics: formation.tactics ? formation.tactics : null,
        training: formation.training ? formation.training : null,
        logisticalSupport: formation.logistics ? formation.logistics : null,
        auxilia: formation.support ? formation.support : null,
        recruitment: formation.recruitment ? formation.recruitment : null,
        history: formation.history ? formation.history : null,
        historicalLoyalties: formation.loyalties ? formation.loyalties : null,  
      };
  
      this.sidebar = {
        sidebarcontent: formation.sidebarcontent ? formation.sidebarcontent : null,
        sidepanelcontenttop: formation.sidepanelcontenttop
          ? formation.sidepanelcontenttop
          : null,
        type: formation.type ? formation.type : null,
        overallTrainingLevel: formation.trainingLevel ? formation.trainingLevel : null,
        assumedVeterancy: formation.veterancy ? formation.veterancy : null,
        usedBy: formation.relatedorganizations ? this.formatMentions(formation.relatedorganizations) : null,
        ranksAndTitles: formation.relatedranks ? this.formatMentions(formation.relatedranks) : null,
        sidepanelcontent: formation.sidepanelcontent ? formation.sidepanelcontent : null,
        sidebarcontentbottom: formation.sidebarcontentbottom
          ? formation.sidebarcontentbottom
          : null,
      };
    }
  }