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
  weight: string | null;
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
  header: { subheading: string | null, fullName: string | null };

  body: {
    content: string | null;
    divineDomains: string | null;
    artifacts: string | null;
    holyBooksAndCodes: string | null;
    divineSymbolsAndSigils: string | null;
    tenetsOfFaith: string | null;
    holidays: string | null;
    divineGoalsAndAspirations: string | null;
    generalPhysicalCondition: string | null;
    bodyFeatures: string | null;
    facialFeatures: string | null;
    identifyingCharacteristics: string | null;
    physicalQuirks: string | null;
    specialAbilities: string | null;
    apparelAndAccessories: string | null;
    specialisedEquipment: string | null;
    personalHistory: string | null;
    genderIdentity: string | null;
    sexuality: string | null;
    education: string | null;
    employment: string | null;
    accomplishmentsAndAchievements: string | null;
    failuresAndEmbarrasments: string | null;
    mentalTrauma: string | null;
    intellectualCharacteristics: string | null;
    moralityAndPhilosophy: string | null;
    taboos: string | null;
    motivation: string | null;
    savviesAndIneptitudes: string | null;
    likesAndDislikes: string | null;
    virtuesAndPersonalityPerks: string | null;
    vicesAndPersonalityFlaws: string | null;
    personalityQuirks: string | null;
    hygiene: string | null;
    reign: string | null;
    contactsAndRelations: string | null;
    familyTies: string | null;
    religiousViews: string | null;
    socialAptitude: string | null;
    mannerisms: string | null;
    hobbies: string | null;
    speech: string | null;
    wealthAndFinancialState: string | null;
  };

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
    dateOfBirth: string | null;
    dateOfBirthDisplay: string | null;
    dateOfDeath: string | null;
    dateOfDeathDisplay: string | null;
    age: string | null;
    circumstancesOfBirth: string | null;
    circumstancesOfDeath: string | null;
    birthParents: string | null;
    adoptiveParents: string | null;
    surrogateParent: string | null;
    birthplace: string | null;
    placeOfDeath: string | null;
    currentResidence: string | null;
    pronouns: string | null;
    sex: string | null;
    gender: string | null;
    presentation: string | null;
    eyes: string | null;
    hair: string | null;
    skinToneAndPigmentation: string | null;
    height: string | null;
    weight: string | null;
    quotesAndCatchphrases: string | null;
    beliefOrDeity: string | null;
    knownLanguages: string | null;
    characterPrototype: string | null;
    sidepanelcontent: string | null;
    sidebarcontentbottom: string | null;
  };

  constructor(person: Person) {
    super(person);

    this.header = {
      subheading: person.subheading ? person.subheading : null,
      fullName: this.formatFullName(person)
    }

    this.body = {
      content: person.content ? person.content : null,
      divineDomains: person.domains ? person.domains : null,
      artifacts: person.artifacts ? person.artifacts : null,
      holyBooksAndCodes: person.codes ? person.codes : null,
      divineSymbolsAndSigils: person.holysymbols ? person.holysymbols : null,
      tenetsOfFaith: person.tenets ? person.tenets : null,
      holidays: person.holidays ? person.holidays : null,
      divineGoalsAndAspirations: person.goals ? person.goals : null,
      generalPhysicalCondition: person.physique ? person.physique : null,
      bodyFeatures: person.bodyFeatures ? person.bodyFeatures : null,
      facialFeatures: person.facialFeatures ? person.facialFeatures : null,
      identifyingCharacteristics: person.identifyingCharacteristics ? person.identifyingCharacteristics : null,
      physicalQuirks: person.quirksPhysical ? person.quirksPhysical : null,
      specialAbilities: person.specialAbilities ? person.specialAbilities : null,
      apparelAndAccessories: person.clothing ? person.clothing : null,
      specialisedEquipment: person.items ? person.items : null,
      personalHistory: person.history ? person.history : null,
      genderIdentity: person.genderidentity ? person.genderidentity : null,
      sexuality: person.sexuality ? person.sexuality : null,
      education: person.education ? person.education : null,
      employment: person.employment ? person.employment : null,
      accomplishmentsAndAchievements: person.achievements ? person.achievements : null,
      failuresAndEmbarrasments: person.failures ? person.failures : null,
      mentalTrauma: person.mentalTraumas ? person.mentalTraumas : null,
      intellectualCharacteristics: person.intellectualCharacteristics ? person.intellectualCharacteristics : null,
      moralityAndPhilosophy: person.morality ? person.morality : null,
      taboos: person.taboos ? person.taboos : null,
      motivation: person.motivation ? person.motivation : null,
      savviesAndIneptitudes: person.savviesIneptitudes ? person.savviesIneptitudes : null,
      likesAndDislikes: person.likesDislikes ? person.likesDislikes : null,
      virtuesAndPersonalityPerks: person.virtues ? person.virtues : null,
      vicesAndPersonalityFlaws: person.vices ? person.vices : null,
      personalityQuirks: person.quirksPersonality ? person.quirksPersonality : null,
      hygiene: person.hygiene ? person.hygiene : null,
      reign: person.reign ? person.reign : null,
      contactsAndRelations: person.relations ? person.relations : null,
      familyTies: person.family ? person.family : null,
      religiousViews: person.religion ? person.religion : null,
      socialAptitude: person.socialAptitude ? person.socialAptitude : null,
      mannerisms: person.mannerisms ? person.mannerisms : null,
      hobbies: person.hobbies ? person.hobbies : null,
      speech: person.speech ? person.speech : null,
      wealthAndFinancialState: person.wealth ? person.wealth : null,
    };

    this.sidebar = {
      sidebarcontent: person.sidebarcontent ? person.sidebarcontent : null,
      sidepanelcontenttop: person.sidepanelcontenttop
        ? person.sidepanelcontenttop
        : null,
      divineClassification: person.classification
        ? person.classification
        : null,
      alignment: person.rpgAlignment ? person.rpgAlignment : null,
      currentStatus: person.currentstatus ? person.currentstatus : null,
      species: person.species ? this.formatMention(person.species) : null,
      conditions:
        person.conditions && person.conditions.length > 0
          ? this.formatMentions(person.conditions)
          : null,
      ethnicity: person.ethnicity ? this.formatMention(person.ethnicity) : null,
      otherEthnicities:
        person.otherethnicities && person.otherethnicities.length > 0
          ? this.formatMentions(person.otherethnicities)
          : null,
      realm: person.realm ? this.formatMention(person.realm) : null,
      church: person.church ? this.formatMention(person.church) : null,
      titles: person.titles ? person.titles : null,
      dateOfBirth: person.dob ? person.dob : null,
      dateOfBirthDisplay: person.dobDisplay ? person.dobDisplay : null,
      dateOfDeath: person.dod ? person.dod : null,
      dateOfDeathDisplay: person.dodDisplay ? person.dodDisplay : null,
      age: person.age ? String(person.age) : null,
      circumstancesOfBirth: person.circumstancesBirth ? person.circumstancesBirth : null,
      circumstancesOfDeath: person.circumstancesDeath ? person.circumstancesDeath : null,
      birthParents: this.formatParents(person.parentBiological1, person.parentBiological2),
      adoptiveParents: this.formatParents(person.parentAdopting1, person.parentAdopting2),
      surrogateParent: person.parentSurrogate ? this.formatMention(person.parentSurrogate) : null,
      birthplace: person.birthplace ? person.birthplace : null,
      placeOfDeath: person.deathplace ? person.deathplace : null,
      currentResidence: person.residence ? person.residence : null,
      pronouns: person.pronouns ? person.pronouns : null,
      sex: person.sex ? person.sex : null,
      gender: person.gender ? person.gender : null,
      presentation: person.presentation ? person.presentation : null,
      eyes: person.eyes ? person.eyes : null,
      hair: person.hair ? person.hair : null,
      skinToneAndPigmentation: person.skin ? person.skin : null,
      height: person.height ? person.height : null,
      weight: person.weight ? person.weight : null,
      quotesAndCatchphrases: person.quotes ? person.quotes : null,
      beliefOrDeity: person.deity ? person.deity : null,
      knownLanguages: person.languages ? person.languages : null,
      characterPrototype: person.characterPrototype ? person.characterPrototype : null,
      sidepanelcontent: person.sidepanelcontent
        ? person.sidepanelcontent
        : null,
      sidebarcontentbottom: person.sidebarcontentbottom
        ? person.sidebarcontentbottom
        : null,
    };
  }

  formatParents(parent1: { title: string; entityClass: string; id: string } | null, parent2: { title: string; entityClass: string; id: string } | null): string | null {
    if (parent1 && parent2) {
      return `${this.formatMention(parent1)}, ${this.formatMention(parent2)}`;
    } else if (parent1) {
      return this.formatMention(parent1);
    } else if (parent2) {
      return this.formatMention(parent2);
    } else {
      return null;
    }
  }

  formatFullName(person: Person): string | null {
    const nameParts: string[] = [];

    if (person.honorific) {
      nameParts.push(person.honorific);
    }

    if (person.firstname) {
      nameParts.push(person.firstname);
    }

    if (person.middlename) {
      nameParts.push(person.middlename);
    }

    if (person.lastname) {
      nameParts.push(person.lastname);
    }

    if (person.maidenname) {
      nameParts.push(`née ${person.maidenname}`);
    }

    if (person.suffix) {
      nameParts.push(person.suffix);
    }

    if (person.nickname) {
      nameParts.push(`(a.k.a. ${person.nickname})`);
    }

    return nameParts.join(' ');
  }
}


