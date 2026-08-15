import { Article } from "@/components/types/article";
import * as articleRegistry from "../ArticleComponents/article-edit-registry";
import * as characterRegistry from "../ArticleComponents/character-edit-registry";
import * as conditionRegistry from "../ArticleComponents/condition-edit-registry";
import * as documentRegistry from "../ArticleComponents/document-edit-registry";
import * as ethnicityRegistry from "../ArticleComponents/ethnicity-edit-registry";
import * as formationRegistry from "../ArticleComponents/formation-edit-registry";
import * as itemRegistry from "../ArticleComponents/item-edit-registry";
import * as materialRegistry from "../ArticleComponents/material-edit-registry";
import * as ritualRegistry from "../ArticleComponents/ritual-edit-registry";
import * as vehicleRegistry from "../ArticleComponents/vehicle-edit-registry";

const BACKUP_FORMAT = "brigids-anvil-article-backup";
const BACKUP_VERSION = 1;

type BackupFieldConfig = {
  kind: string;
  fieldIdentifier?: string;
  valueAsReference?: boolean;
};

type RegistryModule = {
  bodyFieldRegistry?: BackupFieldConfig[];
  bodySubTabRegistry?: Array<{ fields: BackupFieldConfig[] }>;
  subtitleFieldRegistry?: BackupFieldConfig[];
  sidebarFieldRegistry?: BackupFieldConfig[];
  footerFieldRegistry?: BackupFieldConfig[];
  designFieldRegistry?: BackupFieldConfig[];
};

export type ArticleEditorBackup = {
  format: typeof BACKUP_FORMAT;
  version: typeof BACKUP_VERSION;
  exportedAt: string;
  worldId: string;
  articleId: string;
  entityClass: string;
  articleTitle: string;
  sourceUpdateDate?: string;
  sourceFields: Record<string, unknown>;
  editedFields: Record<string, unknown>;
};

const registryByEntityClass: Record<string, RegistryModule> = {
  Article: articleRegistry,
  Condition: conditionRegistry,
  Document: documentRegistry,
  Ethnicity: ethnicityRegistry,
  Formation: formationRegistry,
  Item: itemRegistry,
  Material: materialRegistry,
  Person: characterRegistry,
  Ritual: ritualRegistry,
  Vehicle: vehicleRegistry,
};

const allFieldsFor = (entityClass: string): BackupFieldConfig[] => {
  const registry = registryByEntityClass[entityClass];
  if (!registry) {
    return [];
  }

  return [
    ...(registry.bodyFieldRegistry ?? []),
    ...(registry.bodySubTabRegistry ?? []).flatMap((tab) => tab.fields),
    ...(registry.subtitleFieldRegistry ?? []),
    ...(registry.sidebarFieldRegistry ?? []),
    ...(registry.footerFieldRegistry ?? []),
    ...(registry.designFieldRegistry ?? []),
  ];
};

const asReference = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(asReference);
  }

  return typeof value === "object" && value !== null && "id" in value
    ? { id: String(value.id) }
    : value;
};

const sourceValueForField = (article: Article, field: BackupFieldConfig) => {
  const value = field.fieldIdentifier
    ? article[field.fieldIdentifier] ?? null
    : null;

  if (
    field.kind === "dropdown" ||
    (field.kind === "field-dropdown" && field.valueAsReference)
  ) {
    return asReference(value);
  }

  return value;
};

export const createArticleEditorBackup = ({
  article,
  worldId,
  editedFields,
}: {
  article: Article;
  worldId: string;
  editedFields: Record<string, unknown>;
}): ArticleEditorBackup => {
  const sourceFields: Record<string, unknown> = {};

  for (const field of allFieldsFor(article.entityClass)) {
    if (field.kind !== "note" && field.fieldIdentifier) {
      sourceFields[field.fieldIdentifier] = sourceValueForField(article, field);
    }
  }

  return {
    format: BACKUP_FORMAT,
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    worldId,
    articleId: article.id,
    entityClass: article.entityClass,
    articleTitle: article.title,
    sourceUpdateDate: article.updateDate?.date,
    sourceFields,
    editedFields,
  };
};

export const parseArticleEditorBackup = (
  value: unknown,
): ArticleEditorBackup => {
  if (!value || typeof value !== "object") {
    throw new Error("The selected file is not a Brigid article backup.");
  }

  const backup = value as Partial<ArticleEditorBackup>;
  if (backup.format !== BACKUP_FORMAT || backup.version !== BACKUP_VERSION) {
    throw new Error("This backup format or version is not supported.");
  }

  if (
    !backup.worldId ||
    !backup.articleId ||
    !backup.entityClass ||
    !backup.articleTitle ||
    !backup.sourceFields ||
    !backup.editedFields ||
    typeof backup.sourceFields !== "object" ||
    typeof backup.editedFields !== "object"
  ) {
    throw new Error("The selected backup is incomplete.");
  }

  return backup as ArticleEditorBackup;
};

export const articleBackupFilename = (article: Article) =>
  `brigid-${article.slug || article.id}-backup.json`;
