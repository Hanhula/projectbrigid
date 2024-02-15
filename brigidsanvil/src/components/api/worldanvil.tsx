import { Article, WorldArticle, WorldArticles } from "../types/article";
import _ from "lodash";
import {
  fetchArticle,
  fetchArticles,
  fetchCategories,
  fetchCategory,
  fetchIdentity,
  fetchWorld,
  fetchWorlds,
  updateArticleField,
  updateCategoryField,
} from "./apicalls";
import { useWorldAnvilState } from "./statelogic";
import { checkArticleState, checkCategoryState } from "./apiutils";
import { Category, WorldCategories, WorldCategory } from "../types/category";

export const CallType = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
};

export function useWorldAnvilAPI() {
  const {
    dispatch,
    identity,
    authToken,
    world,
    currentArticles,
    currentCategories,
    currentDetailState,
    currentCategoryDetailState,
    setIdentity,
    setWorld,
    setWorlds,
    setLoadingArticles,
    setLoadingCategories,
    setWorldArticles,
    setWorldCategories,
    updateArticleById,
    updateCategoryById,
  } = useWorldAnvilState();

  let articleFetch: Article[] = [];
  let categoryFetch: Category[] = [];

  function dispatchUpdateArticle(data: Article) {
    let worldArticle: WorldArticle = {
      world: world,
      article: data,
    };
    dispatch(updateArticleById(worldArticle));
  }

  function dispatchUpdateCategory(data: Category) {
    let worldCategory: WorldCategory = {
      world: world,
      category: data,
    };
    dispatch(updateCategoryById(worldCategory));
  }

  async function verifyIdentity() {
    const data = await fetchIdentity(authToken);
    dispatch(setIdentity(data));
    return data;
  }

  async function getWorlds(worldId: string) {
    const data = await fetchWorlds(authToken, worldId, identity.id);
    dispatch(setWorlds(data));
  }

  async function getWorld(worldID: string) {
    const data = await fetchWorld(authToken, worldID);
    dispatch(setWorld(data));
  }

  async function testFinishArticles(articlesFetched: Article[]) {
    articleFetch = await checkArticleState(
      articlesFetched,
      getArticle,
      currentArticles,
      currentDetailState
    );

    let fetchedArticles: WorldArticles = {
      world: world,
      articles: articleFetch,
    };

    dispatch(setWorldArticles(fetchedArticles));
    dispatch(setLoadingArticles(false));
  }

  async function testFinishCategories(categoriesFetched: Category[]) {
    categoryFetch = await checkCategoryState(
      categoriesFetched,
      getCategory,
      currentCategories,
      currentCategoryDetailState
    );

    let fetchedCategories: WorldCategories = {
      world: world,
      categories: categoryFetch,
    };

    dispatch(setWorldCategories(fetchedCategories));
    dispatch(setLoadingCategories(false));
  }

  async function getArticles(
    limit: number,
    offset: number,
    numLoop: number,
    articleCount?: number
  ) {
    dispatch(setLoadingArticles(true));

    let trueLimit: number;
    if (articleCount && numLoop === 0 && articleCount >= limit) {
      trueLimit = Math.min(articleCount, 50);
    } else {
      trueLimit = limit;
    }

    const articles = await fetchArticles(
      authToken,
      world.id,
      trueLimit,
      offset
    );

    if (articles.entities) {
      if (articleCount) {
        let newArticles;
        if (numLoop === 0) {
          newArticles = articles.entities;
          articleFetch = newArticles;
        } else {
          newArticles = articles.entities;
          articleFetch = articleFetch.concat(newArticles);
        }

        if (articleFetch.length < articleCount && newArticles.length !== 0) {
          let remainingArticles = articleCount - articleFetch.length;
          let nextFetchLimit = Math.min(50, remainingArticles);
          await getArticles(
            nextFetchLimit,
            offset + newArticles.length,
            numLoop + 1,
            articleCount
          );
        } else {
          testFinishArticles(articleFetch);
        }
      } else {
        testFinishArticles(articles.entities);
      }
    }
  }

  async function getCategories(limit: number, offset: number, numLoop: number) {
    dispatch(setLoadingCategories(true));

    let trueLimit: number = limit;

    const categories = await fetchCategories(
      authToken,
      world.id,
      trueLimit,
      offset
    );

    if (categories.entities) {
      let newCategories;
      if (numLoop === 0) {
        newCategories = categories.entities;
        categoryFetch = newCategories;
      } else {
        newCategories = categories.entities;
        categoryFetch = categoryFetch.concat(newCategories);
      }

      if (newCategories.length !== 0) {
        let nextFetchLimit = Math.min(50, newCategories.length);
        await getCategories(
          nextFetchLimit,
          offset + newCategories.length,
          numLoop + 1
        );
      } else {
        testFinishCategories(categoryFetch);
      }
    }
  }

  async function getArticle(
    articleId: string,
    shouldDispatch: boolean
  ): Promise<Article> {
    try {
      const data = await fetchArticle(authToken, articleId);
      console.log("Article to update: ", data);
      if (shouldDispatch) {
        dispatchUpdateArticle(data);
      }
      return data;
    } catch (error) {
      console.error("Error getting article:", error);
      throw error;
    }
  }

  async function getCategory(
    categoryID: string,
    shouldDispatch: boolean
  ): Promise<Category> {
    try {
      const data = await fetchCategory(authToken, categoryID);
      console.log("Category to update: ", data);
      if (shouldDispatch) {
        dispatchUpdateCategory(data);
      }
      return data;
    } catch (error) {
      console.error("Error getting category:", error);
      throw error;
    }
  }

  async function updateArticleByField(
    articleID: string,
    fieldToUpdate: string,
    dataToUpdate: any
  ) {
    try {
      const data = await updateArticleField(
        authToken,
        articleID,
        fieldToUpdate,
        dataToUpdate
      );
      console.log("Article to update: ", data);
      dispatchUpdateArticle(data);
      return data;
    } catch (error) {
      console.error("Error getting article:", error);
      throw error;
    }
  }

  async function updateCategoryByField(
    categoryID: string,
    fieldToUpdate: string,
    dataToUpdate: any
  ) {
    try {
      const data = await updateCategoryField(
        authToken,
        categoryID,
        fieldToUpdate,
        dataToUpdate
      );
      console.log("Category to update: ", data);
      dispatchUpdateCategory(data);
      return data;
    } catch (error) {
      console.error("Error getting category:", error);
      throw error;
    }
  }

  return {
    verifyIdentity,
    getWorlds,
    getWorld,
    getArticles,
    getCategories,
    getArticle,
    getCategory,
    updateArticleByField,
    updateCategoryByField,
  };
}
