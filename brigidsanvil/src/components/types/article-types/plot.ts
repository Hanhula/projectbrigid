import { Article, ArticleDisplay } from "../article";
import { Location } from "./location";
import { Organisation } from "./organisation";
import { Person } from "./person";
import { Report } from "./report";

export type Plot = Article & {
  scenes: string | null;
  themes: string | null;
  type: string | null;
  completionDate: string | null;
  exposition: string | null;
  conflict: string | null;
  risingaction: string | null;
  climax: string | null;
  fallingaction: string | null;
  resolution: string | null;
  goals: string | null;
  hooks: string | null;
  stakes: string | null;
  moralquandaries: string | null;
  crueltricks: string | null;
  redherrings: string | null;
  protagonists: string | null;
  allies: string | null;
  neutrals: string | null;
  competitors: string | null;
  adversaries: string | null;
  threats: string | null;
  locations: string | null;
  encounters: string | null;
  pastevents: string | null;
  ggmtype: string | null;
  ggmadventureobjective: string | null;
  ggmadventuretheme: string | null;
  ggmadventuretype: string | null;
  ggmadventurefocustype: string | null;
  ggmadventureadversarytype: string | null;
  ggmadventureopening: string | null;
  ggmadventurecoolness: string | null;
  ggmadventureexpectation: string | null;
  ggmadventuresenses: string | null;
  ggmadventurelearnings: string | null;
  ggmadventure1goal: string | null;
  ggmadventure1enemy: string | null;
  ggmadventure1situation: string | null;
  ggmadventure2setup: string | null;
  ggmadventure2attempt: string | null;
  ggmadventure3false: string | null;
  ggmadventure3showdown: string | null;
  ggmadventurenames: string | null;
  ggmadventurechanges: string | null;
  parent: Plot | null;
  relatedpeople: Person[] | null;
  relatedorganizations: Organisation[] | null;
  relatedlocations: Location[] | null;
  reports: Report[];
};

export class PlotDisplay extends ArticleDisplay {
  body: {
    content: string | null;
    plotPointsOrScenes: string | null;
    themes: string | null;
    exposition: string | null;
    conflict: string | null;
    risingAction: string | null;
    climax: string | null;
    fallingAction: string | null;
    resolution: string | null;
    goals: string | null;
    hooks: string | null;
    stakes: string | null;
    moralQuandaries: string | null;
    cruelTricks: string | null;
    redHerrings: string | null;
    protagonists: string | null;
    allies: string | null;
    neutralsOrBystanders: string | null;
    competitors: string | null;
    adversaries: string | null;
    locations: string | null;
    threats: string | null;
    encounters: string | null;
    pastEvents: string | null;
  };

  sidebar: {
    sidebarcontent: string | null;
    sidepanelcontenttop: string | null;
    completionDate: string | null;
    plotType: string | null;
    parentPlot: string | null;
    relatedCharacters: string | null;
    relatedOrganisations: string | null;
    relatedLocations: string | null;
    relatedSessionReports: string | null;
    sidepanelcontent: string | null;
    sidebarcontentbottom: string | null;
  };

  constructor(plot: Plot) {
    super(plot);

    this.body = {
      content: plot.content ? plot.content : null,
      plotPointsOrScenes: plot.scenes ? plot.scenes : null,
      themes: plot.themes ? plot.themes : null,
      exposition: plot.exposition ? plot.exposition : null,
      conflict: plot.conflict ? plot.conflict : null,
      risingAction: plot.risingaction ? plot.risingaction : null,
      climax: plot.climax ? plot.climax : null,
      fallingAction: plot.fallingaction ? plot.fallingaction : null,
      resolution: plot.resolution ? plot.resolution : null,
      goals: plot.goals ? plot.goals : null,
      hooks: plot.hooks ? plot.hooks : null,
      stakes: plot.stakes ? plot.stakes : null,
      moralQuandaries: plot.moralquandaries ? plot.moralquandaries : null,
      cruelTricks: plot.crueltricks ? plot.crueltricks : null,
      redHerrings: plot.redherrings ? plot.redherrings : null,
      protagonists: plot.protagonists ? plot.protagonists : null,
      allies: plot.allies ? plot.allies : null,
      neutralsOrBystanders: plot.neutrals ? plot.neutrals : null,
      competitors: plot.competitors ? plot.competitors : null,
      adversaries: plot.adversaries ? plot.adversaries : null,
      locations: plot.locations ? plot.locations : null,
      threats: plot.threats ? plot.threats : null,
      encounters: plot.encounters ? plot.encounters : null,
      pastEvents: plot.pastevents ? plot.pastevents : null,
    };

    this.sidebar = {
      sidebarcontent: plot.sidebarcontent ? plot.sidebarcontent : null,
      sidepanelcontenttop: plot.sidepanelcontenttop
        ? plot.sidepanelcontenttop
        : null,
      completionDate: plot.completionDate ? plot.completionDate : null,
      plotType: plot.type ? plot.type : null,
      parentPlot: plot.parent ? plot.parent.title : null,
      relatedCharacters: plot.relatedpeople
        ? this.formatMentions(plot.relatedpeople)
        : null,
      relatedOrganisations: plot.relatedorganizations
        ? this.formatMentions(plot.relatedorganizations)
        : null,
      relatedLocations: plot.relatedlocations
        ? this.formatMentions(plot.relatedlocations)
        : null,
      relatedSessionReports: plot.reports
        ? this.formatMentions(plot.reports)
        : null,
      sidepanelcontent: plot.sidepanelcontent ? plot.sidepanelcontent : null,
      sidebarcontentbottom: plot.sidebarcontentbottom
        ? plot.sidebarcontentbottom
        : null,
    };
  }
}
