import { Article, ArticleDisplay } from "../article";
import { Location } from "./location";
import { Material } from "./material";
import { Organisation } from "./organisation";
import { Person } from "./person";
import { Rank } from "./rank";
import { Technology } from "./technology";
import { Vehicle } from "./vehicle";

export type Profession = Article & {
    alternativeNames: string | null;
    type: string | null;
    purpose: string | null;
    qualifications: string | null;
    tools: string | null;
    materials: string | null;
    workplace: string | null;
    structure: string | null;
    services: string | null;
    pay: string | null;
    benefits: string | null;
    socialStatus: string | null;
    demand: string | null;
    history: string | null;
    demographics: string | null;
    hazards: string | null;
    legality: string | null;
    relatedvehicles: Vehicle[];
    relatedtechnologies: Technology[];
    relatedranks: Rank[];
    relatedlocations: Location[];
    holders: Person[];
    relatedorganizations: Organisation[];
    relatedmaterials: Material[];
}

export class ProfessionDisplay extends ArticleDisplay {
    body: {
      content: string | null;
      qualifications: string | null;
      careerProgression: string | null;
      paymentAndReimbursement: string | null;
      otherBenefits: string | null;
      purpose: string | null;
      socialStatus: string | null;
      demographics: string | null;
      history: string | null;
      tools: string | null;
      materials: string | null;
      workplace: string | null;
      providedServices: string | null;
      dangersAndHazards: string | null;
    };
  
    sidebar: {
      sidebarcontent: string | null;
      sidepanelcontenttop: string | null;
      alternativeNames: string | null;
      type: string | null;
      demand: string | null;
      legality: string | null;
      famousInTheField: string | null;
      otherAssociatedProfessions: string | null;
      relatedLocations: string | null;
      usedBy: string | null;
      ranksAndTitles: string | null;
      relatedVehicles: string | null;
      relatedTechnologies: string | null;
      relatedMaterials: string | null;
      sidepanelcontent: string | null;
      sidebarcontentbottom: string | null;
    };
  
    constructor(profession: Profession) {
      super(profession);
  
      this.body = {
        content: profession.content ? profession.content : null,
        qualifications: profession.qualifications ? profession.qualifications : null,
        careerProgression: profession.structure ? profession.structure : null,
        paymentAndReimbursement: profession.pay ? profession.pay : null,
        otherBenefits: profession.benefits ? profession.benefits : null,
        purpose: profession.purpose ? profession.purpose : null,
        socialStatus: profession.socialStatus ? profession.socialStatus : null,
        demographics: profession.demographics ? profession.demographics : null,
        history: profession.history ? profession.history : null,
        tools: profession.tools ? profession.tools : null,
        materials: profession.materials ? profession.materials : null,
        workplace: profession.workplace ? profession.workplace : null,
        providedServices: profession.services ? profession.services : null,
        dangersAndHazards: profession.hazards ? profession.hazards : null,
      };
      
      this.sidebar = {
        sidebarcontent: profession.sidebarcontent ? profession.sidebarcontent : null,
        sidepanelcontenttop: profession.sidepanelcontenttop ? profession.sidepanelcontenttop : null,
        alternativeNames: profession.alternativeNames ? profession.alternativeNames : null,
        type: profession.type ? profession.type : null,
        demand: profession.demand ? profession.demand : null,
        legality: profession.legality ? profession.legality : null,
        famousInTheField: profession.holders ? this.formatMentions(profession.holders) : null,
        otherAssociatedProfessions: profession.relatedorganizations ? this.formatMentions(profession.relatedorganizations) : null,
        relatedLocations: profession.relatedlocations ? this.formatMentions(profession.relatedlocations) : null,
        usedBy: profession.relatedorganizations ? this.formatMentions(profession.relatedorganizations) : null,
        ranksAndTitles: profession.relatedranks ? this.formatMentions(profession.relatedranks) : null,
        relatedVehicles: profession.relatedvehicles ? this.formatMentions(profession.relatedvehicles) : null,
        relatedTechnologies: profession.relatedtechnologies ? this.formatMentions(profession.relatedtechnologies) : null,
        relatedMaterials: profession.relatedmaterials ? this.formatMentions(profession.relatedmaterials) : null,
        sidepanelcontent: profession.sidepanelcontent ? profession.sidepanelcontent : null,
        sidebarcontentbottom: profession.sidebarcontentbottom ? profession.sidebarcontentbottom : null,
      };
    }
  }