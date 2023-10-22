import { Article } from "../article";
import { Species } from "./species";

export type Location = Article & {
    alternativename: string | null;
    geography: string | null;
    naturalresources: string | null;
    population: string | null;
    areaSize: string | null;
    demographics: string | null;
    demonym: string | null;
    defences: string | null;
    infrastructure: string | null;
    guilds: string | null;
    history: string | null;
    tourism: string | null;
    industry: string | null;
    architecture: string | null;
    government: string | null;
    assets: string | null;
    locationTemplateType: string | null;
    constructed: string | null;
    ruined: string | null;
    florafauna: string | null;
    ecosystem: string | null;
    ecosystemCycles: string | null;
    localizedPhenomena: string | null;
    climate: string | null;
    alterations: string | null;
    purpose: string | null;
    design: string | null;
    entries: string | null;
    denizens: string | null;
    valuables: string | null;
    hazards: string | null;
    effects: string | null;
    sensory: string | null;
    properties: string | null;
    contents: string | null;
    pointOfInterest: string | null;
    district: string | null;
    parent: string | null;
    type: LocationType;
    person: string | null;
    vehicle: string | null;
    rank: string | null;
    organization: string | null;
    species: Species[];
}

type LocationType = {
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