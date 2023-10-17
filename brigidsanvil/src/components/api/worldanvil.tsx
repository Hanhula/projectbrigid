import { useDispatch, useSelector } from "react-redux";
import { Article, WorldArticles } from "../types/article";
import {
  selectIdentity,
  setIdentity,
  setWorld,
  setWorlds,
  selectWorld,
  setLoadingArticles,
} from "@/components/store/apiSlice";
import { selectAuthToken } from "../store/authSlice";
import {
  selectCurrentDetailStateByWorld,
  selectWorldArticlesByWorld,
  setWorldArticles,
  updateArticleById,
} from "../store/articlesSlice";
import _, { concat } from "lodash";

const CallType = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
};

export function useWorldAnvilAPI() {
  const dispatch = useDispatch();
  const identity = useSelector(selectIdentity);
  const authToken = useSelector(selectAuthToken);
  const world = useSelector(selectWorld);
  const worldArticles = useSelector(selectWorldArticlesByWorld(world.id));
  const currentArticles = worldArticles!.articles;
  const currentDetailState = useSelector(
    selectCurrentDetailStateByWorld(world.id)
  );

  let articleFetch: Article[] = [];

  async function callWorldAnvil(
    endpoint: string,
    callType: string,
    body?: string
  ) {
    let options: {};
    if (body) {
      options = {
        method: callType,
        headers: {
          authorization: authToken,
        },
        body: body,
      };
    } else {
      options = {
        method: callType,
        headers: {
          authorization: authToken,
        },
      };
    }

    try {
      const response = await fetch(`/api${endpoint}`, options);
      if (!response.ok) {
        if (!response.ok) {
          const errorMessage = `API request failed with status ${response.status} (${response.statusText}) for URL: ${response.url}`;
          throw new Error(errorMessage);
        }
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function verifyIdentity() {
    const endpoint = `/identity`;
    const data = await callWorldAnvil(endpoint, CallType.GET);
    dispatch(setIdentity(data));
    return data;
  }

  async function getWorlds(worldId: string) {
    let params = {
      id: worldId ? worldId : identity.id,
      granularity: 0,
    };
    const endpoint = `/user/worlds?id=${params.id}`;
    await callWorldAnvil(endpoint, CallType.POST).then((data) => {
      dispatch(setWorlds(data));
    });
  }

  async function testCall() {
    try {
      const response = await fetch("/api/hello");
      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function getWorld(worldID: string) {
    let params = {
      id: worldID,
      granularity: 0,
    };
    const endpoint = `/world?id=${params.id}&granularity=${params.granularity}`;
    await callWorldAnvil(endpoint, CallType.GET).then((data) => {
      dispatch(setWorld(data));
    });
  }

  async function testFinishArticles(articlesFetched: Article[]) {
    articleFetch = await checkArticleState(articlesFetched);

    let fetchedArticles: WorldArticles = {
      world: world,
      articles: articleFetch,
    };

    dispatch(setWorldArticles(fetchedArticles));
    dispatch(setLoadingArticles(false));
  }

  async function getArticles(
    limit: number,
    offset: number,
    numLoop: number,
    articleCount?: number
  ) {
    dispatch(setLoadingArticles(true));

    const endpoint = `/world/articles?id=${world.id}`;

    let trueLimit: number;
    if (articleCount && numLoop === 0 && articleCount >= limit) {
      trueLimit = Math.min(articleCount, 50);
    } else {
      trueLimit = limit;
    }

    const body = JSON.stringify({
      limit: trueLimit,
      offset: offset,
    });

    const articles = await callWorldAnvil(endpoint, CallType.POST, body);

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

  async function checkArticleState(articles: Article[]) {
    const currentArticleMap = new Map(
      currentArticles.map((article) => [article.id, article])
    );

    let articleArray: Article[] = [];
    const articlesToUpdate: Article[] = [];

    for (const article of articles) {
      const matchingArticle = currentArticleMap.get(article.id);
      const shouldUpdate = shouldArticleUpdate(article, matchingArticle);

      if (shouldUpdate) {
        articlesToUpdate.push(article);
      } else {
        articleArray.push(matchingArticle || article);
      }
    }

    if (currentDetailState && currentDetailState.isFullDetail) {
      if (articlesToUpdate.length > 0) {
        const updatedArticles = await getFullArticles(articlesToUpdate);
        articleArray.push(...updatedArticles);
      }
    } else {
      articleArray = articleArray.concat(articlesToUpdate);
    }

    return articleArray;
  }

  function shouldArticleUpdate(
    newArticle: Article,
    existingArticle: Article | undefined
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

  const throttleDelay = 200;

  async function getFullArticles(articles: Article[]) {
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

  async function getArticle(
    articleId: string,
    shouldDispatch: boolean
  ): Promise<Article> {
    let params = {
      id: articleId,
      granularity: 2,
    };
    const endpoint = `/article?id=${params.id}&granularity=${params.granularity}`;

    try {
      const data = await callWorldAnvil(endpoint, CallType.GET);
      console.log("Article to update: ", data);
      if (shouldDispatch) {
        dispatch(updateArticleById(data));
      }
      return data;
    } catch (error) {
      // Handle any errors, e.g., network issues or API errors
      console.error("Error getting article:", error);
      throw error;
    }
  }

  return {
    callWorldAnvil: async (
      url: string,
      callType: string,
      body: string | undefined
    ) => {
      return await callWorldAnvil(url, callType, body);
    },
    verifyIdentity: async () => {
      return await verifyIdentity();
    },
    getWorlds: async (worldId: any) => {
      return await getWorlds(worldId);
    },
    testCall: async () => {
      return await testCall();
    },
    getWorld: async (id: string) => {
      return await getWorld(id);
    },
    getArticles: async (
      limit: number,
      offset: number,
      numLoop: number,
      articleCount: number
    ) => {
      return await getArticles(limit, offset, numLoop, articleCount);
    },
    getArticle: async (id: string, shouldDispatch: boolean) => {
      return await getArticle(id, shouldDispatch);
    },
  };
}
