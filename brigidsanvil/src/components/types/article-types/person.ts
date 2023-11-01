import { Article, ArticleDisplay } from "../article";
import { Image } from "../image";
import { Condition } from "./condition";
import { Ethnicity } from "./ethnicity";
import { Location } from "./location";
import { Organisation } from "./organisation";
import { Species } from "./species";

export type Person = Article & {
    character: string | null;
    portrait: Image;
    firstname: string | null;
    lastname: string | null;
    middlename: string | null;
    maidenname: string | null;
    nickname: string | null;
    honorific: string | null;
    suffix: string | null;
    dobDisplay: string | null;
    dob: string | null;
    dod: string | null;
    dodDisplay: string | null;
    age: number | null;
    circumstancesBirth: string | null;
    circumstancesDeath: string | null;
    pronouns: string | null;
    eyes: string | null;
    hair: string | null;
    skin: string | null;
    height: string | null;
    birthplace: string | null;
    deathplace: string | null;
    residence: string | null;
    weight: number | null;
    gender: string | null;
    speciesDisplay: string | null;
    physique: string | null;
    bodyFeatures: string | null;
    facialFeatures: string | null;
    identifyingCharacteristics: string | null;
    quirksPhysical: string | null;
    perceptionPhysical: string | null;
    specialAbilities: string | null;
    clothing: string | null;
    items: string | null;
    characterPrototype: string | null;
    rpgAlignment: string | null;
    deity: string | null;
    currentstatus: string | null;
    history: string | null;
    employment: string | null;
    achievements: string | null;
    failures: string | null;
    mentalTraumas: string | null;
    intellectualCharacteristics: string | null;
    morality: string | null;
    taboos: string | null;
    presentation: string | null;
    sex: string | null;
    sexuality: string | null;
    genderidentity: string;
    education: string | null;
    languages: string | null;
    quotes: string | null;
    motivation: string | null;
    savviesIneptitudes: string | null;
    likesDislikes: string | null;
    virtues: string | null;
    vices: string | null;
    quirksPersonality: string | null;
    hygiene: string | null;
    relations: string | null;
    family: string | null;
    religion: string | null;
    titles: string | null;
    socialAptitude: string | null;
    mannerisms: string | null;
    hobbies: string | null;
    speech: string | null;
    wealth: string | null;
    classification: string | null;
    domains: string | null;
    codes: string | null;
    holysymbols: string | null;
    tenets: string | null;
    goals: string | null;
    holidays: string | null;
    artifacts: string | null;
    ggmtitle: string | null;
    ggmjob: string | null;
    ggmgoal: string | null;
    ggmuse: string | null;
    ggmgoaladditional: string | null;
    ggmquirk: string | null;
    ggmequipment: string | null;
    ggmtype: string | null;
    ggmsubtype: string | null;
    ggmlikeability: string | null;
    ggmcompetence: string | null;
    ggmproactivity: string | null;
    ggmcoolness: string | null;
    ggmdesire: string | null;
    ggmfear: string | null;
    ggmwhyfollowing: string | null;
    ggmbiography: string | null;
    ggmdescfacial: string | null;
    ggmdescspeech: string | null;
    ggmdescbody: string | null;
    ggmdescsight: string | null;
    ggmdescsound: string | null;
    ggmdescsmell: string | null;
    ggmdesctouch: string | null;
    ggmdescemotional: string | null;
    ggmdeschappy: string | null;
    ggmdescsad: string | null;
    ggmdescangry: string | null;
    reign: string | null;
    datasheet: string | null;
    vehicle: string | null;
    parentBiological1: Person | null;
    parentBiological2: Person | null;
    parentAdopting1: Person | null;
    parentAdopting2: Person | null;
    parentSurrogate: Person | null;
    church: Organisation | null;
    realm: Location | null;
    organization: Organisation | null;
    familyorganization: Organisation | null;
    ethnicity: Ethnicity | null;
    otherethnicities: Ethnicity[] | null;
    species: Species | null;
    currentLocation: Location | null;
    conditions: Condition[] | null;
  };

  export class PersonDisplay extends ArticleDisplay {
    body: {
    content: string | null,
      physique: string | null,
      family: string | null,
      religion: string | null,
      socialAptitude: string | null,
      mannerisms: string | null,
      hobbies: string | null,
      speech: string | null,
      wealth: string | null,
    }

    sidebar: {
      sidebarcontent: string | null;
      sidepanelcontenttop: string | null;
      divineClassification: string | null;
      alignment: string | null;
      currentStatus: string | null;
      species: string | null;
      conditions: string | null;
      ethnicity: string | null;
      otherEthnicities: string | null;
      realm: string | null;
      church: string | null;
      titles: string | null;
      sidepanelcontent: string | null;
      sidebarcontentbottom: string | null;
    }
  
    constructor(person: Person) {
      super(person);

      this.body = {
        content: person.content ? person.content : null,
        physique: person.physique ? person.physique : null,
        family: person.family ? person.family : null,
        religion: person.religion ? person.religion : null,
        socialAptitude: person.socialAptitude ? person.socialAptitude : null,
        mannerisms: person.mannerisms ? person.mannerisms : null,
        hobbies: person.hobbies ? person.hobbies : null,
        speech: person.speech ? person.speech : null,
        wealth: person.wealth ? person.wealth : null,
      };

      this.sidebar = {
        sidebarcontent: person.sidebarcontent ? person.sidebarcontent : null,
        sidepanelcontenttop: person.sidepanelcontenttop ? person.sidepanelcontenttop : null,
        divineClassification: person.classification ? person.classification : null,
        alignment: person.rpgAlignment ? person.rpgAlignment : null,
        currentStatus: person.currentstatus ? person.currentstatus : null,
        species: person.species ? this.formatMention(person.species) : null,
        conditions: person.conditions && person.conditions.length > 0
        ? this.formatMentions(person.conditions)
        : null,
        ethnicity: person.ethnicity ? this.formatMention(person.ethnicity) : null,
        otherEthnicities: person.otherethnicities && person.otherethnicities.length > 0? this.formatMentions(person.otherethnicities) : null,
        realm: person.realm ? this.formatMention(person.realm) : null,
        church: person.church ? this.formatMention(person.church) : null,
        titles: person.titles ? person.titles : null,
        sidepanelcontent: person.sidepanelcontent ? person.sidepanelcontent : null,
        sidebarcontentbottom: person.sidebarcontentbottom ? person.sidebarcontentbottom : null,
      }
    }
  }