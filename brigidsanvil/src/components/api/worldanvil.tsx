import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Article,
  CreateArticle,
  WorldArticle,
  WorldArticles,
} from "../types/article";
import {
  selectIdentity,
  setIdentity,
  setWorld,
  setWorlds,
  selectWorld,
  setLoadingArticles,
  setArticleFetchProgress,
  resetArticleFetchProgress,
  selectArticleFetchProgress,
} from "@/components/store/apiSlice";
import { selectAuthToken } from "../store/authSlice";
import {
  selectCurrentDetailStateByWorld,
  selectWorldArticleMapByWorld,
  selectWorldArticlesByWorld,
  setWorldArticles,
  updateArticleById,
} from "../store/articlesSlice";
import _ from "lodash";

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
  const currentArticleMap = useSelector(selectWorldArticleMapByWorld(world.id));
  const currentArticles = worldArticles!.articles;
  const articleFetchProgress = useSelector(selectArticleFetchProgress);
  const currentDetailState = useSelector(
    selectCurrentDetailStateByWorld(world.id),
  );
  const fetchRequestIdRef = useRef(0);

  let articleFetch: Article[] = [];

  useEffect(() => {
    fetchRequestIdRef.current += 1;
    dispatch(resetArticleFetchProgress());
  }, [dispatch, world.id]);

  async function callWorldAnvil(
    endpoint: string,
    callType: string,
    body?: string,
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
      const responseData = await response.json();
      if (!response.ok) {
        const serverErrorMessage = responseData.error;
        const errorMessage = `API request failed with status ${response.status} (${response.statusText}) for URL: ${response.url}. Server error: ${serverErrorMessage}`;
        throw new Error(errorMessage);
      }

      return responseData;
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
      granularity: 1,
    };
    const endpoint = `/world?id=${params.id}&granularity=${params.granularity}`;
    await callWorldAnvil(endpoint, CallType.GET).then((data) => {
      dispatch(setWorld(data));
    });
  }

  async function testFinishArticles(
    articlesFetched: Article[],
    requestId: number,
    totalCount?: number,
  ) {
    if (fetchRequestIdRef.current !== requestId) {
      return;
    }

    const { articles: checkedArticles, totalCount: resolvedTotalCount } =
      await checkArticleState(
        articlesFetched,
        totalCount ?? articleFetch.length,
        requestId,
      );

    articleFetch = checkedArticles;

    let fetchedArticles: WorldArticles = {
      world: world,
      articles: articleFetch,
    };

    dispatch(setWorldArticles(fetchedArticles));
    dispatch(
      setArticleFetchProgress({
        worldId: world.id,
        totalCount: resolvedTotalCount ?? articleFetch.length,
        loadedCount: resolvedTotalCount ?? articleFetch.length,
        offset: articleFetch.length,
        isComplete: true,
      }),
    );
    dispatch(setLoadingArticles(false));
  }

  async function getArticles(
    limit: number,
    offset: number,
    numLoop: number,
    articleCount?: number,
    requestId?: number,
  ) {
    const isInitialFetch = numLoop === 0;
    const activeRequestId = requestId ?? ++fetchRequestIdRef.current;
    const shouldResumeFromCheckpoint =
      articleCount !== undefined &&
      !isInitialFetch &&
      articleFetchProgress.worldId === world.id &&
      !articleFetchProgress.isComplete &&
      articleFetchProgress.offset > 0 &&
      articleFetchProgress.loadedCount > 0;

    const resumeOffset = shouldResumeFromCheckpoint
      ? articleFetchProgress.offset
      : offset;

    const preloadedArticles = shouldResumeFromCheckpoint
      ? Object.values(currentArticleMap)
      : [];

    if (isInitialFetch) {
      articleFetch = [];
      dispatch(resetArticleFetchProgress());
    }

    if (fetchRequestIdRef.current !== activeRequestId) {
      return;
    }

    dispatch(setLoadingArticles(true));
    dispatch(
      setArticleFetchProgress({
        worldId: world.id,
        totalCount: articleCount ?? 0,
        loadedCount: isInitialFetch ? 0 : articleFetch.length,
        offset: resumeOffset,
        isComplete: false,
      }),
    );

    const endpoint = `/world/articles?id=${world.id}`;

    let trueLimit: number;
    if (articleCount && numLoop === 0 && articleCount >= limit) {
      trueLimit = Math.min(articleCount, 50);
    } else {
      trueLimit = limit;
    }

    const body = JSON.stringify({
      limit: trueLimit,
      offset: resumeOffset,
    });

    const articles = await callWorldAnvil(endpoint, CallType.POST, body);

    if (fetchRequestIdRef.current !== activeRequestId) {
      return;
    }

    if (articles.entities) {
      if (articleCount) {
        let newArticles;
        if (numLoop === 0) {
          newArticles = articles.entities;
          articleFetch = shouldResumeFromCheckpoint
            ? [...preloadedArticles, ...newArticles]
            : newArticles;
        } else {
          newArticles = articles.entities;
          articleFetch = [...articleFetch, ...newArticles];
        }

        dispatch(
          setWorldArticles({
            world: world,
            articles: articleFetch,
          }),
        );

        dispatch(
          setArticleFetchProgress({
            worldId: world.id,
            totalCount: articleCount,
            loadedCount: articleFetch.length,
            offset: resumeOffset + newArticles.length,
            isComplete: false,
          }),
        );

        if (articleFetch.length < articleCount && newArticles.length !== 0) {
          let remainingArticles = articleCount - articleFetch.length;
          let nextFetchLimit = Math.min(50, remainingArticles);
          await getArticles(
            nextFetchLimit,
            resumeOffset + newArticles.length,
            numLoop + 1,
            articleCount,
            activeRequestId,
          );
        } else {
          testFinishArticles(articleFetch, activeRequestId, articleCount);
        }
      } else {
        testFinishArticles(
          articles.entities,
          activeRequestId,
          articleCount ?? articles.entities.length,
        );
      }
    }
  }

  async function checkArticleState(
    articles: Article[],
    articleCount: number | undefined,
    requestId: number,
  ) {
    const currentArticleMapRecord = currentArticleMap ?? {};

    let articleArray: Article[] = [];
    const articlesToUpdate: Article[] = [];

    for (const article of articles) {
      const matchingArticle = currentArticleMapRecord[article.id];
      const shouldUpdate = shouldArticleUpdate(article, matchingArticle);

      if (shouldUpdate) {
        articlesToUpdate.push(article);
      } else {
        articleArray.push(matchingArticle || article);
      }
    }

    if (currentDetailState && currentDetailState.isFullDetail) {
      const detailTotal =
        (articleCount ?? articles.length) + articlesToUpdate.length;
      dispatch(
        setArticleFetchProgress({
          worldId: world.id,
          totalCount: detailTotal,
          loadedCount: articleFetch.length,
          offset: articleFetchProgress.offset,
          isComplete: false,
        }),
      );
      if (articlesToUpdate.length > 0) {
        const updatedArticles = await getFullArticles(
          articlesToUpdate,
          requestId,
          detailTotal,
          articleFetch.length,
        );
        articleArray.push(...updatedArticles);
      }
    } else {
      articleArray.push(...articlesToUpdate);
    }

    return {
      articles: articleArray,
      totalCount:
        currentDetailState && currentDetailState.isFullDetail
          ? (articleCount ?? articles.length) + articlesToUpdate.length
          : articleCount ?? articleArray.length,
    };
  }

  function shouldArticleUpdate(
    newArticle: Article,
    existingArticle: Article | undefined,
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

  async function getFullArticles(
    articles: Article[],
    requestId: number,
    totalCount: number,
    loadedBase: number,
  ) {
    const articleIds = articles.map((article) => article.id);
    const updatedArticles: Article[] = [];
    let queueIndex = 0;
    let completedCount = loadedBase;

    async function processQueue() {
      while (queueIndex < articleIds.length) {
        const articleId = articleIds[queueIndex];
        queueIndex += 1;

        try {
          const updatedArticle = await getArticle(articleId!, false);
          updatedArticles.push(updatedArticle);
          completedCount += 1;
          if (fetchRequestIdRef.current === requestId) {
            dispatch(
              setArticleFetchProgress({
                worldId: world.id,
                totalCount,
                loadedCount: completedCount,
                offset: articleFetchProgress.offset,
                isComplete: false,
              }),
            );
          }
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
    shouldDispatch: boolean,
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
        let worldArticle: WorldArticle = {
          world: world,
          article: data,
        };
        dispatch(updateArticleById(worldArticle));
      }
      return data;
    } catch (error) {
      console.error("Error getting article:", error);
      throw error;
    }
  }

  async function updateArticleByField(
    articleID: string,
    fieldToUpdate: string,
    dataToUpdate: string,
  ) {
    const params = {
      id: articleID,
    };
    const endpoint = `/article?id=${params.id}`;

    const updateBody: Record<string, any> = {};
    updateBody[fieldToUpdate] = dataToUpdate;

    try {
      const data = await callWorldAnvil(
        endpoint,
        CallType.PATCH,
        JSON.stringify(updateBody),
      );
      console.log("Article to update: ", data);

      let worldArticle: WorldArticle = {
        world: world,
        article: data,
      };
      dispatch(updateArticleById(worldArticle));
      return data;
    } catch (error) {
      console.error("Error getting article:", error);
      throw error;
    }
  }

  async function createArticle(article: CreateArticle): Promise<Article> {
    const endpoint = `/article`;

    try {
      const data = await callWorldAnvil(
        endpoint,
        CallType.PUT,
        JSON.stringify(article),
      );
      return data;
    } catch (error) {
      console.error("Error getting article:", error);
      throw error;
    }
  }

  return {
    callWorldAnvil: async (
      url: string,
      callType: string,
      body: string | undefined,
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
      articleCount: number,
    ) => {
      return await getArticles(limit, offset, numLoop, articleCount);
    },
    getArticle: async (id: string, shouldDispatch: boolean) => {
      return await getArticle(id, shouldDispatch);
    },
    createArticle: async (article: CreateArticle) => {
      return await createArticle(article);
    },
    updateArticleByField: async (
      articleID: string,
      fieldToUpdate: string,
      dataToUpdate: any,
    ) => {
      return await updateArticleByField(articleID, fieldToUpdate, dataToUpdate);
    },
  };
}
