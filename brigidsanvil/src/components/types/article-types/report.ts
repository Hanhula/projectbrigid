import { Article, ArticleDisplay } from "../article";
import { Location } from "./location";
import { Person } from "./person";
import { Plot } from "./plot";

export type Report = Article & {
  reportDate: {
    date: string | null;
    timezone_type: number;
    timezone: string | null;
  };
  rewards: string | null;
  quests: string | null;
  interactions: string | null;
  createdContent: string | null;
  relatedReports: string | null;
  reportNotes: string | null;
  session: string | null;
  campaign: string | null;
  primarygeographicLocation: Location;
  secondarygeographicLocation: Location;
  plots: Plot[];
  relatedPersons: Person[];
};

export class ReportDisplay extends ArticleDisplay {
  body: {
    content: string | null;
    rewardsGranted: string | null;
    missionsOrQuestsCompleted: string | null;
    charactersInteractedWith: string | null;
    createdContent: string | null;
    relatedReports: string | null;
    notes: string | null;
  };

  sidebar: {
    sidebarcontent: string | null;
    sidepanelcontenttop: string | null;
    reportDate: string | null;
    primaryLocation: string | null;
    secondaryLocation: string | null;
    relatedPlots: string | null;
    relatedCharacters: string | null;
    sidepanelcontent: string | null;
    sidebarcontentbottom: string | null;
  };

  constructor(report: Report) {
    super(report);

    this.body = {
      content: report.content ? report.content : null,
      rewardsGranted: report.rewards ? report.rewards : null,
      missionsOrQuestsCompleted: report.quests ? report.quests : null,
      charactersInteractedWith: report.interactions ? report.interactions : null,
      createdContent: report.createdContent ? report.createdContent : null,
      relatedReports: report.relatedReports ? report.relatedReports : null,
      notes: report.reportNotes ? report.reportNotes : null,
    };
    
    this.sidebar = {
      sidebarcontent: report.sidebarcontent ? report.sidebarcontent : null,
      sidepanelcontenttop: report.sidepanelcontenttop ? report.sidepanelcontenttop : null,
      reportDate: report.reportDate.date ? report.reportDate.date : null,
      primaryLocation: report.primarygeographicLocation ? this.formatMention(report.primarygeographicLocation) : null,
      secondaryLocation: report.secondarygeographicLocation ? this.formatMention(report.secondarygeographicLocation) : null,
      relatedPlots: report.plots ? this.formatMentions(report.plots) : null,
      relatedCharacters: report.relatedPersons ? this.formatMentions(report.relatedPersons) : null,
      sidepanelcontent: report.sidepanelcontent ? report.sidepanelcontent : null,
      sidebarcontentbottom: report.sidebarcontentbottom ? report.sidebarcontentbottom : null,
    };
  }
}
