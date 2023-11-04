import { Article, ArticleDisplay } from "../article";
import { Location } from "./location";
import { Person } from "./person";
import { Rank } from "./rank";
import { Species } from "./species";
import { Language } from "./language";
import { Ethnicity } from "./ethnicity";
import { Formation } from "./formation";
import { Settlement } from "./settlement";

export type OrganisationType = {
  id: string;
  title: string;
  slug: string | null;
  state: string | null;
  isWip: boolean | null;
  isDraft: boolean | null;
  entityClass: string;
  icon: string | null;
  url: string | null;
  subscribergroups: string[];
  folderId: string | null;
  tags: string | null;
  updateDate: {
    date: string;
    timezone_type: number;
    timezone: string;
  } | null;
};

export type Organisation = Article & {
    motto: string | null;
    publicAgenda: string | null;
    alternativeNames: string | null;
    demonym: string | null;
    assets: string | null;
    structure: string | null;
    history: string | null;
    disbandment: string | null;
    demographics: string | null;
    veterancy: string | null;
    trainingLevel: string | null;
    governmentsystem: string | null;
    powerstructure: string | null;
    economicsystem: string | null;
    legislative: string | null;
    judicial: string | null;
    executive: string | null;
    gazetteer: string | null;
    currency: string | null;
    territory: string | null;
    military: string | null;
    religion: string | null;
    technology: string | null;
    foreignrelations: string | null;
    laws: string | null;
    culture: string | null;
    imports: string | null;
    exports: string | null;
    agricultureAndIndustry: string | null;
    tradeAndTransport: string | null;
    education: string | null;
    infrastructure: string | null;
    mythos: string | null;
    origins: string | null;
    cosmology: string | null;
    tenets: string | null;
    priesthood: string | null;
    ethics: string | null;
    divinepowers: string | null;
    intrigue: string | null;
    worship: string | null;
    sects: string | null;
    foundingDate: string | null;
    dissolutionDate: string | null;
    showDiplomacy: false;
    capital: Settlement | null;
    geographicLocation: Location | null;
    parent: Organisation | null;
    statereligion: Organisation | null;
    type: OrganisationType | null;
    formation: Formation | null;
    leader: Person | null;
    familyleader: Person | null;
    headofstate: Person | null;
    leadertitle: Rank | null;
    headofgovernment: Person | null;
    rulingorganization: Organisation | null;
    belligerents: Organisation[];
    neighbors: Organisation[];
    predecessors: Organisation[];
    successors: Organisation[];
    deities: Person[];
    languages: Language[];
    relatedSpecies: Species[];
    ethnicities: Ethnicity[];
    organizationformations: Formation[];
  };

  export class OrganisationDisplay extends ArticleDisplay {
    header: { subheading: string | null
    };
  
    body: {
      content: string | null;
      structure: string | null;
      culture: string | null;
      publicAgenda: string | null;
      assets: string | null;
      history: string | null;
      disbandment: string | null;
      demographyAndPopulation: string | null;
      territories: string | null;
      military: string | null;
      technologicalLevel: string | null;
      religion: string | null;
      foreignRelations: string | null;
      laws: string | null;
      agricultureAndIndustry: string | null;
      tradeAndTransport: string | null;
      education: string | null;
      infrastructure: string | null;
      mythologyAndLore: string | null;
      divineOrigins: string | null;
      cosmologicalViews: string | null;
      tenetsOfFaith: string | null;
      ethics: string | null;
      worship: string | null;
      priesthood: string | null;
      grantedDivinePowers: string | null;
      politicalInfluenceAndIntrigue: string | null;
      sects: string | null;
    };
  
    sidebar: {
      sidebarcontent: string | null;
      sidepanelcontenttop: string | null;
      sidepanelcontent: string | null;
      sidebarcontentbottom: string | null;
      disbanded: string | null;
      motto: string | null;
      foundingDate: string | null; 
      dissolutionDate: string | null;
      type: string | null;
      capital: string | null;
      alternativeNames: string | null;
      predecessorOrganisation: string | null;
      successorOrganisation: string | null;
      formationType: string | null;
      trainingLevel: string | null;
      veterancyLevel: string | null;
      demonym: string | null;
      leader: string | null;
      rulingOrganisation: string | null;
      leaderTitle: string | null;
      familyLeader: string | null;
      headOfState: string | null;
      governmentSystem: string | null;
      powerStructure: string | null;
      economicSystem: string | null;
      gazetteer: string | null;
      currency: string | null;
      majorExports: string | null;
      majorImports: string | null;
      legislativeBody: string | null;
      executiveBody: string | null;
      officialStateReligion: string | null;
      parentOrganisation: string | null;
      deities: string | null;
      location: string | null;
      officialLanguages: string | null;
      neighboringNations: string | null;
      relatedSpecies: string | null;
      relatedEthnicities: string | null;
    };
  
    constructor(organisation: Organisation) {
      super(organisation);
  
      this.header = {
        subheading: organisation.subheading ? organisation.subheading : null,
      }
  
      this.body = {
        content: organisation.content ? organisation.content : null,
        structure: organisation.structure ? organisation.structure : null,
        culture: organisation.culture ? organisation.culture : null,
        publicAgenda: organisation.publicAgenda ? organisation.publicAgenda : null,
        assets: organisation.assets ? organisation.assets : null,
        history: organisation.history ? organisation.history : null,
        disbandment: organisation.disbandment ? organisation.disbandment : null,
        demographyAndPopulation: organisation.demographics ? organisation.demographics : null,
        territories: organisation.territory ? organisation.territory : null,
        military: organisation.military ? organisation.military : null,
        technologicalLevel: organisation.technology ? organisation.technology : null,
        religion: organisation.religion ? organisation.religion : null,
        foreignRelations: organisation.foreignrelations ? organisation.foreignrelations : null,
        laws: organisation.laws ? organisation.laws : null,
        agricultureAndIndustry: organisation.agricultureAndIndustry ? organisation.agricultureAndIndustry : null,
        tradeAndTransport: organisation.tradeAndTransport ? organisation.tradeAndTransport : null,
        education: organisation.education ? organisation.education : null,
        infrastructure: organisation.infrastructure ? organisation.infrastructure : null,
        mythologyAndLore: organisation.mythos ? organisation.mythos : null,
        divineOrigins: organisation.origins ? organisation.origins : null,
        cosmologicalViews: organisation.cosmology ? organisation.cosmology : null,
        tenetsOfFaith: organisation.tenets ? organisation.tenets : null,
        ethics: organisation.ethics ? organisation.ethics : null,
        worship: organisation.worship ? organisation.worship : null,
        priesthood: organisation.priesthood ? organisation.priesthood : null,
        grantedDivinePowers: organisation.divinepowers ? organisation.divinepowers : null,
        politicalInfluenceAndIntrigue: organisation.intrigue ? organisation.intrigue : null,
        sects: organisation.sects ? organisation.sects : null,
      };
  
      this.sidebar = {
        sidebarcontent: organisation.sidebarcontent ? organisation.sidebarcontent : null,
        disbanded: organisation.disbandment ? "Disbanded / Dissolved" : null,
        motto: organisation.motto ? organisation.motto : null,
        sidepanelcontenttop: organisation.sidepanelcontenttop ? organisation.sidepanelcontenttop : null,
        foundingDate: organisation.foundingDate ? organisation.foundingDate : null,
        dissolutionDate: organisation.dissolutionDate ? organisation.dissolutionDate : null,
        type: organisation.type ? organisation.type.title : null,
        capital: organisation.capital ? this.formatMention(organisation.capital) : null,
        alternativeNames: organisation.alternativeNames ? organisation.alternativeNames : null,
        predecessorOrganisation: organisation.predecessors ? this.formatMentions(organisation.predecessors) : null,
        successorOrganisation: organisation.successors ? this.formatMentions(organisation.successors) : null,
        formationType: organisation.formation ? this.formatMention(organisation.formation) : null,
        trainingLevel: organisation.trainingLevel ? organisation.trainingLevel : null,
        veterancyLevel: organisation.veterancy ? organisation.veterancy : null,
        demonym: organisation.demonym ? organisation.demonym : null,
        leader: organisation.leader ? this.formatMention(organisation.leader) : null,
        rulingOrganisation: organisation.rulingorganization ? this.formatMention(organisation.rulingorganization) : null, 
        leaderTitle: organisation.leadertitle ? this.formatMention(organisation.leadertitle) : null,
        familyLeader: organisation.familyleader ? this.formatMention(organisation.familyleader) : null,
        headOfState: organisation.headofstate ? this.formatMention(organisation.headofstate) : null,
        governmentSystem: organisation.governmentsystem ? organisation.governmentsystem : null,
        powerStructure: organisation.powerstructure ? organisation.powerstructure : null,
        economicSystem: organisation.economicsystem ? organisation.economicsystem : null,
        gazetteer: organisation.gazetteer ? organisation.gazetteer : null,
        currency: organisation.currency ? organisation.currency : null,
        majorExports: organisation.exports ? organisation.exports : null,
        majorImports: organisation.imports ? organisation.imports : null,
        legislativeBody: organisation.legislative ? organisation.legislative : null,
        executiveBody: organisation.executive ? organisation.executive : null,
        officialStateReligion: organisation.statereligion ? this.formatMention(organisation.statereligion) : null,
        parentOrganisation: organisation.parent ? this.formatMention(organisation.parent) : null,
        deities: organisation.deities ? this.formatMentions(organisation.deities) : null,
        location: organisation.geographicLocation ? this.formatMention(organisation.geographicLocation) : null,
        officialLanguages: organisation.languages ? this.formatMentions(organisation.languages) : null,
        neighboringNations: organisation.neighbors ? this.formatMentions(organisation.neighbors) : null, 
        relatedSpecies: organisation.relatedSpecies ? this.formatMentions(organisation.relatedSpecies)  : null,
        relatedEthnicities: organisation.ethnicities ? this.formatMentions(organisation.ethnicities)  : null, 
        sidepanelcontent: organisation.sidepanelcontent ? organisation.sidepanelcontent : null,
        sidebarcontentbottom: organisation.sidebarcontentbottom ? organisation.sidebarcontentbottom : null,     
      };
    }
  }