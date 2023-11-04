import { Article, ArticleDisplay } from "../article";
import { Landmark } from "./landmark";
import { Location } from "./location";
import { Myth } from "./myth";
import { Organisation } from "./organisation";
import { Person } from "./person";
import { Profession } from "./profession";
import { Technology } from "./technology";

export type Vehicle = Article & {
  class: Vehicle | null;
  nickname: string | null;
  designation: string | null;
  motto: string | null;
  price: string | null;
  rarity: string | null;
  length: string | null;
  beam: string | null;
  height: string | null;
  weight: string | null;
  speed: string | null;
  compliment: string | null;
  power: string | null;
  propulsion: string | null;
  armament: string | null;
  defenses: string | null;
  communication: string | null;
  sensors: string | null;
  systems: string | null;
  hangar: string | null;
  cargocapacity: string | null;
  datasheet: null;
  vehicleCreationDate: string | null;
  vehicleDecommissionDate: string | null;
  vehicleDestructionDate: string | null;
  rooms: Landmark[];
  parent: Vehicle;
  manufacturer: Organisation;
  organization: Organisation;
  owner: Person;
  vehicleLocation: Location;
  technologiesUsed: Technology[];
  myths: Myth[];
  professions: Profession[];
};

export class VehicleDisplay extends ArticleDisplay {
  body: {
    content: string | null;
    powerGeneration: string | null;
    propulsion: string | null;
    weaponsAndArmament: string | null;
    armourAndDefence: string | null;
    communicationToolsAndSystems: string | null;
    sensors: string | null;
    additionalAndAuxiliarySystems: string | null;
    hangarsAndDockedVessels: string | null;
  };

  sidebar: {
    sidebarcontent: string | null;
    sidepanelcontenttop: string | null;
    class: string | null;
    nickname: string | null;
    designation: string | null;
    motto: string | null;
    compartments: string | null;
    manufacturer: string | null;
    creationDate: string | null;
    decommissionDate: string | null;
    destructionDate: string | null;
    owner: string | null;
    owningOrganisation: string | null;
    currentLocation: string | null;
    relatedMyths: string | null;
    relatedProfessions: string | null;
    price: string | null;
    rarity: string | null;
    relatedTechnologies: string | null;
    beam: string | null;
    length: string | null;
    height: string | null;
    weight: string | null;
    speed: string | null;
    complementOrCrew: string | null;
    cargoAndPassengerCapacity: string | null;
    sidepanelcontent: string | null;
    sidebarcontentbottom: string | null;
  };

  constructor(vehicle: Vehicle) {
    super(vehicle);

    this.body = {
      content: vehicle.content ? vehicle.content : null,
      powerGeneration: vehicle.power ? vehicle.power : null,
      propulsion: vehicle.propulsion ? vehicle.propulsion : null,
      weaponsAndArmament: vehicle.armament ? vehicle.armament : null,
      armourAndDefence: vehicle.defenses ? vehicle.defenses : null,
      communicationToolsAndSystems: vehicle.communication
        ? vehicle.communication
        : null,
      sensors: vehicle.sensors ? vehicle.sensors : null,
      additionalAndAuxiliarySystems: vehicle.systems ? vehicle.systems : null,
      hangarsAndDockedVessels: vehicle.hangar ? vehicle.hangar : null,
    };

    this.sidebar = {
      sidebarcontent: vehicle.sidebarcontent ? vehicle.sidebarcontent : null,
      sidepanelcontenttop: vehicle.sidepanelcontenttop
        ? vehicle.sidepanelcontenttop
        : null,
      class: vehicle.parent ? this.formatMention(vehicle.parent) : null,
      nickname: vehicle.nickname ? vehicle.nickname : null,
      designation: vehicle.designation ? vehicle.designation : null,
      motto: vehicle.motto ? vehicle.motto : null,
      compartments: vehicle.rooms ? this.formatMentions(vehicle.rooms) : null,
      manufacturer: vehicle.manufacturer
        ? this.formatMention(vehicle.manufacturer)
        : null,
      creationDate: vehicle.vehicleCreationDate
        ? vehicle.vehicleCreationDate
        : null,
      decommissionDate: vehicle.vehicleDecommissionDate
        ? vehicle.vehicleDecommissionDate
        : null,
      destructionDate: vehicle.vehicleDestructionDate
        ? vehicle.vehicleDestructionDate
        : null,
      owner: vehicle.owner ? this.formatMention(vehicle.owner) : null,
      owningOrganisation: vehicle.organization
        ? this.formatMention(vehicle.organization)
        : null,
      currentLocation: vehicle.vehicleLocation
        ? this.formatMention(vehicle.vehicleLocation)
        : null,
      relatedMyths: vehicle.myths ? this.formatMentions(vehicle.myths) : null,
      relatedProfessions: vehicle.professions
        ? this.formatMentions(vehicle.professions)
        : null,
      price: vehicle.price ? vehicle.price : null,
      rarity: vehicle.rarity ? vehicle.rarity : null,
      relatedTechnologies: vehicle.technologiesUsed
        ? this.formatMentions(vehicle.technologiesUsed)
        : null,
      beam: vehicle.beam ? vehicle.beam : null,
      length: vehicle.length ? vehicle.length : null,
      height: vehicle.height ? vehicle.height : null,
      weight: vehicle.weight ? vehicle.weight : null,
      speed: vehicle.speed ? vehicle.speed : null,
      complementOrCrew: vehicle.compliment ? vehicle.compliment : null,
      cargoAndPassengerCapacity: vehicle.cargocapacity
        ? vehicle.cargocapacity
        : null,
      sidepanelcontent: vehicle.sidepanelcontent
        ? vehicle.sidepanelcontent
        : null,
      sidebarcontentbottom: vehicle.sidebarcontentbottom
        ? vehicle.sidebarcontentbottom
        : null,
    };
  }
}
