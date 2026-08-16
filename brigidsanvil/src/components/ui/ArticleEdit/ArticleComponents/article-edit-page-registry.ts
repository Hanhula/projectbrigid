import ArticleEdit from "./article-edit";
import CharacterEdit from "./character-edit";
import ConditionEdit from "./condition-edit";
import DocumentEdit from "./document-edit";
import EthnicityEdit from "./ethnicity-edit";
import FormationEdit from "./formation-edit";
import ItemEdit from "./item-edit";
import LawEdit from "./law-edit";
import LandmarkEdit from "./landmark-edit";
import LanguageEdit from "./language-edit";
import LocationEdit from "./location-edit";
import MaterialEdit from "./material-edit";
import MythEdit from "./myth-edit";
import ProseEdit from "./prose-edit";
import RankEdit from "./rank-edit";
import RitualEdit from "./ritual-edit";
import SpellEdit from "./spell-edit";
import SpeciesEdit from "./species-edit";
import TechnologyEdit from "./technology-edit";
import VehicleEdit from "./vehicle-edit";
import * as articleRegistry from "./article-edit-registry";
import * as characterRegistry from "./character-edit-registry";
import * as conditionRegistry from "./condition-edit-registry";
import * as documentRegistry from "./document-edit-registry";
import * as ethnicityRegistry from "./ethnicity-edit-registry";
import * as formationRegistry from "./formation-edit-registry";
import * as itemRegistry from "./item-edit-registry";
import * as lawRegistry from "./law-edit-registry";
import * as landmarkRegistry from "./landmark-edit-registry";
import * as languageRegistry from "./language-edit-registry";
import * as locationRegistry from "./location-edit-registry";
import * as materialRegistry from "./material-edit-registry";
import * as mythRegistry from "./myth-edit-registry";
import * as proseRegistry from "./prose-edit-registry";
import * as rankRegistry from "./rank-edit-registry";
import * as ritualRegistry from "./ritual-edit-registry";
import * as spellRegistry from "./spell-edit-registry";
import * as speciesRegistry from "./species-edit-registry";
import * as technologyRegistry from "./technology-edit-registry";
import * as vehicleRegistry from "./vehicle-edit-registry";

type ArticleEditPageComponent = (props: {
  article: any;
  resetSignal?: number;
}) => JSX.Element;

export type BackupFieldConfig = {
  kind: string;
  fieldIdentifier?: string;
  valueAsReference?: boolean;
};

export type ArticleEditFieldRegistry = {
  bodyFieldRegistry?: BackupFieldConfig[];
  bodySubTabRegistry?: Array<{ fields: BackupFieldConfig[] }>;
  subtitleFieldRegistry?: BackupFieldConfig[];
  sidebarFieldRegistry?: BackupFieldConfig[];
  footerFieldRegistry?: BackupFieldConfig[];
  designFieldRegistry?: BackupFieldConfig[];
};

export type ArticleEditPageDefinition = {
  Component: ArticleEditPageComponent;
  fields: ArticleEditFieldRegistry;
};

export const articleEditPageRegistry: Record<
  string,
  ArticleEditPageDefinition
> = {
  Article: { Component: ArticleEdit, fields: articleRegistry },
  Condition: { Component: ConditionEdit, fields: conditionRegistry },
  Document: { Component: DocumentEdit, fields: documentRegistry },
  Ethnicity: { Component: EthnicityEdit, fields: ethnicityRegistry },
  Formation: { Component: FormationEdit, fields: formationRegistry },
  Item: { Component: ItemEdit, fields: itemRegistry },
  Law: { Component: LawEdit, fields: lawRegistry },
  Landmark: { Component: LandmarkEdit, fields: landmarkRegistry },
  Language: { Component: LanguageEdit, fields: languageRegistry },
  Location: { Component: LocationEdit, fields: locationRegistry },
  Material: { Component: MaterialEdit, fields: materialRegistry },
  Myth: { Component: MythEdit, fields: mythRegistry },
  Person: { Component: CharacterEdit, fields: characterRegistry },
  Prose: { Component: ProseEdit, fields: proseRegistry },
  Rank: { Component: RankEdit, fields: rankRegistry },
  Ritual: { Component: RitualEdit, fields: ritualRegistry },
  Spell: { Component: SpellEdit, fields: spellRegistry },
  Species: { Component: SpeciesEdit, fields: speciesRegistry },
  Technology: { Component: TechnologyEdit, fields: technologyRegistry },
  Vehicle: { Component: VehicleEdit, fields: vehicleRegistry },
};
