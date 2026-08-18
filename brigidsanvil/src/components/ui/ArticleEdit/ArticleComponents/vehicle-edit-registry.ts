import { Vehicle } from "@/components/types/article-types/vehicle";
import { ArticleFieldConfig } from "../EditComponents/article-edit-field-renderer";
import {
  createCommonBodyFieldRegistry,
  createCommonDesignFieldRegistry,
  createCommonFooterFieldRegistry,
  createCommonSidebarFieldRegistry,
  createCommonSubtitleFieldRegistry,
} from "../EditComponents/article-edit-registry-common";

export type VehicleBodySubTabConfig = {
  eventKey: string;
  title: string;
  fields: ArticleFieldConfig<Vehicle>[];
};

export const bodyFieldRegistry: ArticleFieldConfig<Vehicle>[] =
  createCommonBodyFieldRegistry<Vehicle>();

export const bodySubTabRegistry: VehicleBodySubTabConfig[] = [
  {
    eventKey: "identity",
    title: "Sidebar - Identity",
    fields: [
      {
        key: "sidebar-portrait",
        kind: "numerical",
        fieldIdentifier: "portrait",
        label: "Portrait",
        valueAsReference: true,
        helpText: "Enter the numeric ID, like 7929092",
      },
      {
        key: "body-class",
        kind: "dropdown",
        fieldIdentifier: "parent",
        label: "Vehicle Class",
        entityClass: ["Vehicle"],
      },
      {
        key: "body-owning-org",
        kind: "dropdown",
        fieldIdentifier: "organization",
        label: "Owning Organisation",
        entityClass: ["Organization"],
      },
      {
        key: "body-currentLocation",
        kind: "dropdown",
        fieldIdentifier: "vehicleLocation",
        label: "Current Location",
        entityClass: ["Location", "Landmark", "Settlement"],
      },
      {
        key: "body-related-tech",
        kind: "dropdown",
        fieldIdentifier: "technologiesUsed",
        label: "Related Technologies",
        entityClass: ["Technology"],
      },
      {
        key: "body-manufacturer",
        kind: "dropdown",
        fieldIdentifier: "manufacturer",
        label: "Manufacturer",
        entityClass: ["Organization"],
      },
      {
        key: "body-military-formation",
        kind: "dropdown",
        fieldIdentifier: "militaryFormationsUsage",
        label: "Military Formations Usage",
        entityClass: ["Formation"],
      },
      {
        key: "body-owner",
        kind: "dropdown",
        fieldIdentifier: "owner",
        label: "Owner",
        entityClass: ["Person"],
      },
      {
        key: "body-nickname",
        kind: "text",
        fieldIdentifier: "nickname",
        label: "Nickname",
      },
      {
        key: "body-creationDate",
        kind: "text",
        fieldIdentifier: "vehicleCreationDate",
        label: "Creation Date",
      },
      {
        key: "body-designation",
        kind: "text",
        fieldIdentifier: "designation",
        label: "Designation",
      },
      {
        key: "body-decommissionDate",
        kind: "text",
        fieldIdentifier: "vehicleDecommissionDate",
        label: "Decommission Date",
      },
      {
        key: "body-motto",
        kind: "text",
        fieldIdentifier: "motto",
        label: "Motto",
      },
      {
        key: "body-destructionDate",
        kind: "text",
        fieldIdentifier: "vehicleDestructionDate",
        label: "Destruction Date",
      },
    ],
  },
  {
    eventKey: "properties",
    title: "Sidebar - Properties",
    fields: [
      {
        key: "body-price",
        kind: "text",
        fieldIdentifier: "price",
        label: "Price",
      },
      {
        key: "body-rarity",
        kind: "text",
        fieldIdentifier: "rarity",
        label: "Rarity",
      },
      {
        key: "body-length",
        kind: "text",
        fieldIdentifier: "length",
        label: "Length",
      },
      {
        key: "body-speed",
        kind: "text",
        fieldIdentifier: "speed",
        label: "Speed",
      },
      {
        key: "body-beam",
        kind: "text",
        fieldIdentifier: "beam",
        label: "Width",
      },
      {
        key: "body-complementOrCrew",
        kind: "text",
        fieldIdentifier: "compliment",
        label: "Complement or Crew",
      },
      {
        key: "body-height",
        kind: "text",
        fieldIdentifier: "height",
        label: "Height",
      },
      {
        key: "body-cargoAndPassengerCapacity",
        kind: "text",
        fieldIdentifier: "cargocapacity",
        label: "Cargo and Passenger Capacity",
      },
    ],
  },
  {
    eventKey: "systems",
    title: "Body - Systems",
    fields: [
      {
        key: "body-power-generation",
        kind: "bbcode",
        fieldIdentifier: "power",
        label: "Power Generation",
      },
      {
        key: "body-propulsion",
        kind: "bbcode",
        fieldIdentifier: "propulsion",
        label: "Propulsion",
      },
      {
        key: "body-weapons",
        kind: "bbcode",
        fieldIdentifier: "armament",
        label: "Weapons & Armament",
      },
      {
        key: "body-defenses",
        kind: "bbcode",
        fieldIdentifier: "defenses",
        label: "Armour & Defences",
      },
      {
        key: "body-communication",
        kind: "bbcode",
        fieldIdentifier: "communication",
        label: "Communication Tools & Systems",
      },
      {
        key: "body-sensors",
        kind: "bbcode",
        fieldIdentifier: "sensors",
        label: "Sensors",
      },
      {
        key: "body-systems",
        kind: "bbcode",
        fieldIdentifier: "systems",
        label: "Additional & Auxiliary Systems",
      },
      {
        key: "body-hangar",
        kind: "bbcode",
        fieldIdentifier: "hangar",
        label: "Hangars & Docked Vessels",
      },
    ],
  },
];

export const subtitleFieldRegistry: ArticleFieldConfig<Vehicle>[] = [
  ...createCommonSubtitleFieldRegistry<Vehicle>(),
];

export const sidebarFieldRegistry: ArticleFieldConfig<Vehicle>[] = [
  ...createCommonSidebarFieldRegistry<Vehicle>(),
];

export const footerFieldRegistry: ArticleFieldConfig<Vehicle>[] = [
  ...createCommonFooterFieldRegistry<Vehicle>(),
];

export const designFieldRegistry: ArticleFieldConfig<Vehicle>[] = [
  ...createCommonDesignFieldRegistry<Vehicle>(),
];
