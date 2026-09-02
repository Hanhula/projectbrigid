import {
  ArticleEditFieldRegistry,
  articleEditPageRegistry,
} from "../../ArticleComponents/article-edit-page-registry";

// Fields whose content is prose (bbcode/text) but shouldn't count towards word count.
const EXCLUDED_FIELD_IDENTIFIERS = new Set(["excerpt", "cssClasses"]);

const wordCountableFieldIdentifiersCache = new Map<string, string[]>();

export const getWordCountableFieldIdentifiers = (
  entityClass: string,
): string[] => {
  const cached = wordCountableFieldIdentifiersCache.get(entityClass);
  if (cached) {
    return cached;
  }

  const registry: ArticleEditFieldRegistry | undefined =
    articleEditPageRegistry[entityClass]?.fields;

  const fields = registry
    ? [
        ...(registry.bodyFieldRegistry ?? []),
        ...(registry.bodySubTabRegistry ?? []).flatMap((tab) => tab.fields),
        ...(registry.subtitleFieldRegistry ?? []),
        ...(registry.sidebarFieldRegistry ?? []),
        ...(registry.footerFieldRegistry ?? []),
        ...(registry.designFieldRegistry ?? []),
      ]
    : [];

  const fieldIdentifiers = Array.from(
    new Set(
      fields
        .filter(
          (field) =>
            (field.kind === "bbcode" || field.kind === "text") &&
            field.fieldIdentifier &&
            !EXCLUDED_FIELD_IDENTIFIERS.has(field.fieldIdentifier),
        )
        .map((field) => field.fieldIdentifier as string),
    ),
  );

  wordCountableFieldIdentifiersCache.set(entityClass, fieldIdentifiers);
  return fieldIdentifiers;
};

export const countWordsWaApprox = (value: string): number => {
  if (!value) {
    return 0;
  }

  // WorldAnvil's own wordcounter doesn't strip BBCode tags or mentions, and
  // splits on punctuation (hyphens, apostrophes, brackets, etc.) rather than
  // just whitespace, so we match that behaviour here for rough parity with
  // article.wordcount.
  return value.split(/[^A-Za-zÀ-ÿ0-9]+/).filter(Boolean).length;
};

export const countWordsAccurate = (value: string): number => {
  if (!value) {
    return 0;
  }

  const plainText = value
    // @[Title](entityClass:id) mentions -> just the title text
    .replace(/@\[([^\]\n]+)\]\([^)]+\)/g, "$1")
    // any remaining BBCode tag, e.g. [b], [/quote], [img:123]
    .replace(/\[[^\]\n]*\]/g, " ");

  return plainText.trim().split(/\s+/).filter(Boolean).length;
};

// Backwards-compatible alias; matches WA's approximate behaviour.
export const countWords = countWordsWaApprox;

export type ArticleWordCounts = {
  accurate: number;
  waApprox: number;
};

export const computeArticleWordCounts = (
  article: Record<string, unknown> & { entityClass?: string },
  editedFields: Record<string, unknown> = {},
): ArticleWordCounts => {
  if (!article?.entityClass) {
    return { accurate: 0, waApprox: 0 };
  }

  const fieldIdentifiers = getWordCountableFieldIdentifiers(
    article.entityClass,
  );

  return fieldIdentifiers.reduce<ArticleWordCounts>(
    (totals, fieldIdentifier) => {
      const value = editedFields[fieldIdentifier] ?? article[fieldIdentifier];
      if (typeof value !== "string") {
        return totals;
      }

      return {
        accurate: totals.accurate + countWordsAccurate(value),
        waApprox: totals.waApprox + countWordsWaApprox(value),
      };
    },
    { accurate: 0, waApprox: 0 },
  );
};

export const computeArticleWordCount = (
  article: Record<string, unknown> & { entityClass?: string },
  editedFields: Record<string, unknown> = {},
): number => computeArticleWordCounts(article, editedFields).waApprox;
