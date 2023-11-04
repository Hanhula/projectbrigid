import { Article, ArticleDisplay } from "../article";
import { Item } from "./item";
import { Material } from "./material";
import { Profession } from "./profession";
import { Species } from "./species";
import { Vehicle } from "./vehicle";

export type Technology = Article & {
    inventor: string | null;
    discovery: string | null;
    access: string | null;
    complexity: string | null;
    utility: string | null;
    manufacturing: string | null;
    socialImpact: string | null;
    items: Item[];
    usedInVehicles: Vehicle[];
    professions: Profession[];
    parents: Technology[];
    materials: Material[];
    relatedSpecies: Species[];
}

export class TechnologyDisplay extends ArticleDisplay {
    body: {
      content: string | null;
      utility: string | null;
      manufacturing: string | null;
      socialImpact: string | null;
    };
  
    sidebar: {
      sidebarcontent: string | null;
      sidepanelcontenttop: string | null;
      parentTechnologies: string | null;
      inventors: string | null;
      accessAndAvailability: string | null;
      complexity: string | null;
      discovery: string | null;
      relatedItems: string | null;
      relatedMaterials: string | null;
      relatedVehicles: string | null;
      relatedSpecies: string | null;
      sidepanelcontent: string | null;
      sidebarcontentbottom: string | null;
    };
  
    constructor(technology: Technology) {
      super(technology);
  
      this.body = {
        content: technology.content ? technology.content : null,
        utility: technology.utility ? technology.utility : null,
        manufacturing: technology.manufacturing ? technology.manufacturing : null,
        socialImpact: technology.socialImpact ? technology.socialImpact : null,
      };
      
      this.sidebar = {
        sidebarcontent: technology.sidebarcontent ? technology.sidebarcontent : null,
        sidepanelcontenttop: technology.sidepanelcontenttop ? technology.sidepanelcontenttop : null,
        parentTechnologies: technology.parents ? this.formatMentions(technology.parents) : null,
        inventors: technology.inventor ? technology.inventor : null,
        accessAndAvailability: technology.access ? technology.access : null,
        complexity: technology.complexity ? technology.complexity : null,
        discovery: technology.discovery ? technology.discovery : null,
        relatedItems: technology.items ? this.formatMentions(technology.items) : null,
        relatedMaterials: technology.materials ? this.formatMentions(technology.materials) : null,
        relatedVehicles: technology.usedInVehicles ? this.formatMentions(technology.usedInVehicles) : null,
        relatedSpecies: technology.relatedSpecies ? this.formatMentions(technology.relatedSpecies) : null,
        sidepanelcontent: technology.sidepanelcontent ? technology.sidepanelcontent : null,
        sidebarcontentbottom: technology.sidebarcontentbottom ? technology.sidebarcontentbottom : null,
      };
    }
  }