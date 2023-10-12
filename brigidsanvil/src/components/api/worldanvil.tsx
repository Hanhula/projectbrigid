import { useDispatch, useSelector } from "react-redux";
import { Article } from "../types/article";
import {
  selectIdentity,
  setArticles,
  setIdentity,
  setWorld,
  setWorlds,
  selectWorld,
  setLoadingArticles,
  updateArticleById,
} from "@/components/store/apiSlice";
import { selectAuthToken } from "../store/authSlice";

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

  let articleFetch: any[] = [];

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
      console.log(data);

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
      console.log(data);

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

    let body = JSON.stringify({
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
          dispatch(setArticles(articleFetch as Article[]));
          dispatch(setLoadingArticles(false));
        }
      } else {
        dispatch(setArticles(articles.entities as Article[]));
        dispatch(setLoadingArticles(false));
      }
    }
  }

  async function getArticle(articleId: string) {
    let params = {
      id: articleId,
      granularity: 2,
    };
    const endpoint = `/article?id=${params.id}&granularity=${params.granularity}`;
    await callWorldAnvil(endpoint, CallType.GET).then((data) => {
      console.log("Article to update: ", data);
      dispatch(updateArticleById(data));
    });
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
    getArticle: async (id: string) => {
      return await getArticle(id);
    },
  };
}
