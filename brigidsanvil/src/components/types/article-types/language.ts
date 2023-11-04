import { Article, ArticleDisplay } from "../article";
import { Ethnicity } from "./ethnicity";
import { Organisation } from "./organisation";
import { Person } from "./person";

type Dictionary = {
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

export type Language = Article & {
    phrases: string | null;
    malenames: string | null;
    femalenames: string | null;
    unisexnames: string | null;
    familynames: string | null;
    alphabet: string | null;
    geographicdistribution: string | null;
    phonology: string | null;
    morphology: string | null;
    syntax: string | null;
    vocabulary: string | null;
    phonetics: string | null;
    sentenceStructure: string | null;
    adjectiveOrder: string | null;
    structuralMarkers: string | null;
    tenses: string | null;
    dictionary: Dictionary | null;
    parents: Language[];
    ethnicities: Ethnicity[];
    organizations: Organisation[];
}

export class LanguageDisplay extends ArticleDisplay {
    body: {
      content: string | null;
      writingSystem: string | null;
      geographicalDistribution: string | null;
      phonology: string | null;
      morphology: string | null;
      syntax: string | null;
      vocabulary: string | null;
      phonetics: string | null;
      tenses: string | null;
      sentenceStructure: string | null;
      adjectiveOrder: string | null;
      structuralMarkers: string | null;
    };
  
    sidebar: {
      sidebarcontent: string | null;
      sidepanelcontenttop: string | null;
      // eventually dictionary needs to go here, but not now.
      rootLanguages: string | null;
      spokenBy: string | null;
      commonPhrases: string | null;
      commonFemaleNames: string | null;
      commonMaleNames: string | null;
      commonUnisexNames: string | null;
      commonFamilyNames: string | null;
      sidepanelcontent: string | null;
      sidebarcontentbottom: string | null;
    };
  
    constructor(language: Language) {
      super(language);
  
      this.body = {
        content: language.content ? language.content : null,
        writingSystem: language.alphabet ? language.alphabet : null,
        geographicalDistribution: language.geographicdistribution ? language.geographicdistribution : null,
        phonology: language.phonology ? language.phonology : null,
        morphology: language.morphology ? language.morphology : null,
        syntax: language.syntax ? language.syntax : null,
        vocabulary: language.vocabulary ? language.vocabulary : null,
        phonetics: language.phonetics ? language.phonetics : null,
        tenses: language.tenses ? language.tenses : null,
        sentenceStructure: language.sentenceStructure ? language.sentenceStructure : null,
        adjectiveOrder: language.adjectiveOrder ? language.adjectiveOrder : null,
        structuralMarkers: language.structuralMarkers ? language.structuralMarkers : null,
      };
  
      this.sidebar = {
        sidebarcontent: language.sidebarcontent ? language.sidebarcontent : null,
        sidepanelcontenttop: language.sidepanelcontenttop ? language.sidepanelcontenttop : null,
        rootLanguages: language.parents ? this.formatMentions(language.parents)  : null,
        spokenBy: language.ethnicities ? this.formatMentions(language.ethnicities) : null,
        commonPhrases: language.phrases ? language.phrases : null,
        commonFemaleNames: language.femalenames ? language.femalenames : null,
        commonMaleNames: language.malenames ? language.malenames : null,
        commonUnisexNames: language.unisexnames ? language.unisexnames : null,
        commonFamilyNames: language.familynames ? language.familynames : null,
        sidepanelcontent: language.sidepanelcontent ? language.sidepanelcontent : null,
        sidebarcontentbottom: language.sidebarcontentbottom ? language.sidebarcontentbottom : null,
      };
    }
  }