import { Article } from "../types/article";
import { Category } from "../types/category";

const throttleDelay = 200;

export async function checkArticleState(
  articles: Article[],
  getArticle: Function,
  currentArticles: Article[],
  currentDetailState: any
) {
  const currentArticleMap = new Map(
    currentArticles.map((article) => [article.id, article])
  );

  let articleArray: Article[] = [];
  const articlesToUpdate: Article[] = [];

  for (const article of articles) {
    const matchingArticle = currentArticleMap.get(article.id);
    const shouldUpdate = shouldArticleUpdate(
      article,
      matchingArticle,
      currentDetailState
    );

    if (shouldUpdate) {
      articlesToUpdate.push(article);
    } else {
      articleArray.push(matchingArticle || article);
    }
  }

  if (currentDetailState && currentDetailState.isFullDetail) {
    if (articlesToUpdate.length > 0) {
      const updatedArticles = await getFullArticles(
        articlesToUpdate,
        getArticle
      );
      articleArray.push(...updatedArticles);
    }
  } else {
    articleArray = articleArray.concat(articlesToUpdate);
  }

  return articleArray;
}

export function shouldArticleUpdate(
  newArticle: Article,
  existingArticle: Article | undefined,
  currentDetailState: any
) {
  if (!existingArticle) {
    return true;
  }

  if (currentDetailState && currentDetailState.isFullDetail) {
    return (
      newArticle.updateDate.date > existingArticle.updateDate.date ||
      existingArticle.wordcount === undefined ||
      existingArticle.wordcount === null
    );
  }

  return newArticle.updateDate.date > existingArticle.updateDate.date;
}

export async function getFullArticles(
  articles: Article[],
  getArticle: Function
) {
  const articleIds = articles.map((article) => article.id);
  let updatedArticles: Article[] = [];

  const articleQueue = articleIds.slice();

  async function processQueue() {
    while (articleQueue.length > 0) {
      const articleId = articleQueue.shift();
      try {
        let updatedArticle = await getArticle(articleId!, false);
        updatedArticles.push(updatedArticle);
      } catch (error) {
        console.error("Error getting article: ", error);
      }
      await new Promise((resolve) => setTimeout(resolve, throttleDelay));
    }
  }

  await processQueue();

  return updatedArticles;
}

export async function checkCategoryState(
  categories: Category[],
  getCategory: Function,
  currentCategories: Category[],
  currentCategoryDetailState: any
) {
  const currentCategoryMap = new Map(
    currentCategories.map((category) => [category.id, category])
  );

  let categoryArray: Category[] = [];
  const categoriesToUpdate: Category[] = [];

  for (const category of categories) {
    const matchingCategory = currentCategoryMap.get(category.id);
    const shouldUpdate = shouldCategoryUpdate(
      category,
      matchingCategory,
      currentCategoryDetailState
    );

    if (shouldUpdate) {
      categoriesToUpdate.push(category);
    } else {
      categoryArray.push(matchingCategory || category);
    }
  }

  if (currentCategoryDetailState && currentCategoryDetailState.isFullDetail) {
    if (categoriesToUpdate.length > 0) {
      const updatedCategories = await getFullCategories(
        categoriesToUpdate,
        getCategory
      );
      categoryArray.push(...updatedCategories);
    }
  } else {
    categoryArray = categoryArray.concat(categoriesToUpdate);
  }

  return categoryArray;
}

export function shouldCategoryUpdate(
  newCategory: Category,
  existingCategory: Category | undefined,
  currentCategoryDetailState: any
) {
  if (
    !existingCategory ||
    !existingCategory.updateDate ||
    !newCategory.updateDate
  ) {
    return true;
  }

  if (currentCategoryDetailState && currentCategoryDetailState.isFullDetail) {
    return newCategory.updateDate.date > existingCategory.updateDate.date;
  }

  return newCategory.updateDate.date > existingCategory.updateDate.date;
}

export async function getFullCategories(
  categories: Category[],
  getCategory: Function
) {
  const categoryIDs = categories.map((category) => category.id);
  let updatedCategories: Category[] = [];

  const categoryQueue = categoryIDs.slice();

  async function processQueue() {
    while (categoryQueue.length > 0) {
      const categoryID = categoryQueue.shift();
      try {
        let updatedCategory = await getCategory(categoryID!, false);
        updatedCategories.push(updatedCategory);
      } catch (error) {
        console.error("Error getting category: ", error);
      }
      await new Promise((resolve) => setTimeout(resolve, throttleDelay));
    }
  }

  await processQueue();

  return updatedCategories;
}
