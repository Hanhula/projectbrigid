import { Article, ArticleDisplay } from "../article";
import { Formation } from "./formation";
import { Location } from "./location";
import { Organisation } from "./organisation";
import { Person } from "./person";
import { Profession } from "./profession";

export type Rank = Article & {
  alternativeTitle: string | null;
  type: string | null;
  lengthOfTerm: string | null;
  duties: string | null;
  qualifications: string | null;
  requirements: string | null;
  appointment: string | null;
  heredity: string | null;
  responsibilities: string | null;
  history: string | null;
  culturalSignificance: string | null;
  notableHolders: string | null;
  benefits: string | null;
  removal: string | null;
  equatesTo: string | null;
  equipment: string | null;
  heraldry: string | null;
  rankCreation: string | null;
  rankStatus: string | null;
  authoritySource: string | null;
  formofaddress: string | null;
  weight: number | null;
  leaders: Organisation[];
  firstholder: Person;
  parent: Rank;
  currentHolders: Person[];
  pastHolders: Person[];
  relatedorganizations: Organisation[];
  relatedlocations: Location[];
  rankformations: Formation[];
  professions: Profession[];
};

export class RankDisplay extends ArticleDisplay {
  body: {
    content: string | null;
    qualifications: string | null;
    requirements: string | null;
    appointment: string | null;
    duties: string | null;
    responsibilities: string | null;
    benefits: string | null;
    accoutrementsAndEquipment: string | null;
    groundsForRemovalOrDismissal: string | null;
    history: string | null;
    culturalSignificance: string | null;
    notableHolders: string | null;
  };

  sidebar: {
    sidebarcontent: string | null;
    sidepanelcontenttop: string | null;
    type: string | null;
    status: string | null;
    creation: string | null;
    formOfAddress: string | null;
    alternativeNaming: string | null;
    equatesTo: string | null;
    sourceOfAuthority: string | null;
    lengthOfTerm: string | null;
    firstHolder: string | null;
    currentHolders: string | null;
    pastHolders: string | null;
    reportsDirectlyTo: string | null;
    relatedLocations: string | null;
    relatedOrganisations: string | null;
    relatedProfessions: string | null;
    relatedMilitaryFormations: string | null;
    sidepanelcontent: string | null;
    sidebarcontentbottom: string | null;
  };

  constructor(rank: Rank) {
    super(rank);

    this.body = {
      content: rank.content ? rank.content : null,
      qualifications: rank.qualifications ? rank.qualifications : null,
      requirements: rank.requirements ? rank.requirements : null,
      appointment: rank.appointment ? rank.appointment : null,
      duties: rank.duties ? rank.duties : null,
      responsibilities: rank.responsibilities ? rank.responsibilities : null,
      benefits: rank.benefits ? rank.benefits : null,
      accoutrementsAndEquipment: rank.equipment ? rank.equipment : null,
      groundsForRemovalOrDismissal: rank.removal ? rank.removal : null,
      history: rank.history ? rank.history : null,
      culturalSignificance: rank.culturalSignificance
        ? rank.culturalSignificance
        : null,
      notableHolders: rank.notableHolders ? rank.notableHolders : null,
    };

    this.sidebar = {
      sidebarcontent: rank.sidebarcontent ? rank.sidebarcontent : null,
      sidepanelcontenttop: rank.sidepanelcontenttop
        ? rank.sidepanelcontenttop
        : null,
      type: rank.type ? rank.type : null,
      status: rank.rankStatus ? rank.rankStatus : null,
      creation: rank.rankCreation ? rank.rankCreation : null,
      formOfAddress: rank.formofaddress ? rank.formofaddress : null,
      alternativeNaming: rank.alternativeTitle ? rank.alternativeTitle : null,
      equatesTo: rank.equatesTo ? rank.equatesTo : null,
      sourceOfAuthority: rank.authoritySource ? rank.authoritySource : null,
      lengthOfTerm: rank.lengthOfTerm ? rank.lengthOfTerm : null,
      firstHolder: rank.firstholder
        ? this.formatMention(rank.firstholder)
        : null,
      currentHolders: rank.currentHolders
        ? this.formatMentions(rank.currentHolders)
        : null,
      pastHolders: rank.pastHolders
        ? this.formatMentions(rank.pastHolders)
        : null,
      reportsDirectlyTo: rank.parent ? this.formatMention(rank.parent) : null,
      relatedLocations: rank.relatedlocations
        ? this.formatMentions(rank.relatedlocations)
        : null,
      relatedOrganisations: rank.relatedorganizations
        ? this.formatMentions(rank.relatedorganizations)
        : null,
      relatedProfessions: rank.professions
        ? this.formatMentions(rank.professions)
        : null,
      relatedMilitaryFormations: rank.rankformations
        ? this.formatMentions(rank.rankformations)
        : null,
      sidepanelcontent: rank.sidepanelcontent ? rank.sidepanelcontent : null,
      sidebarcontentbottom: rank.sidebarcontentbottom
        ? rank.sidebarcontentbottom
        : null,
    };
  }
}
