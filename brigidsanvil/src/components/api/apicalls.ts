import { CallType } from "./worldanvil";

async function callWorldAnvil(
  endpoint: string,
  callType: string,
  authToken: string,
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

export async function fetchIdentity(authToken: string) {
  const endpoint = `/identity`;
  return callWorldAnvil(endpoint, CallType.GET, authToken);
}

export async function fetchWorlds(
  authToken: string,
  worldId: string,
  identityId: string
) {
  let params = {
    id: worldId ? worldId : identityId,
    granularity: 0,
  };
  const endpoint = `/user/worlds?id=${params.id}`;
  return callWorldAnvil(endpoint, CallType.POST, authToken);
}

export async function fetchWorld(authToken: string, worldID: string) {
  let params = {
    id: worldID,
    granularity: 0,
  };
  const endpoint = `/world?id=${params.id}&granularity=${params.granularity}`;
  return callWorldAnvil(endpoint, CallType.GET, authToken);
}

export async function fetchArticles(
  authToken: string,
  worldId: string,
  limit: number,
  offset: number
) {
  const endpoint = `/world/articles?id=${worldId}`;
  const body = JSON.stringify({
    limit: limit,
    offset: offset,
  });
  return callWorldAnvil(endpoint, CallType.POST, authToken, body);
}

export async function fetchArticle(authToken: string, articleId: string) {
  let params = {
    id: articleId,
    granularity: 2,
  };
  const endpoint = `/article?id=${params.id}&granularity=${params.granularity}`;
  return callWorldAnvil(endpoint, CallType.GET, authToken);
}

export async function updateArticleField(
  authToken: string,
  articleID: string,
  fieldToUpdate: string,
  dataToUpdate: any
) {
  const params = {
    id: articleID,
  };
  const endpoint = `/article?id=${params.id}`;

  const updateBody: Record<string, any> = {};
  updateBody[fieldToUpdate] = dataToUpdate;

  return callWorldAnvil(
    endpoint,
    CallType.PATCH,
    authToken,
    JSON.stringify(updateBody)
  );
}

export async function fetchCategories(
  authToken: string,
  worldId: string,
  limit: number,
  offset: number
) {
  const endpoint = `/world/categories?id=${worldId}`;
  const body = JSON.stringify({
    limit: limit,
    offset: offset,
  });
  return callWorldAnvil(endpoint, CallType.POST, authToken, body);
}

export async function fetchCategory(authToken: string, categoryID: string) {
  let params = {
    id: categoryID,
    granularity: 2,
  };
  const endpoint = `/category?id=${params.id}&granularity=${params.granularity}`;
  return callWorldAnvil(endpoint, CallType.GET, authToken);
}

export async function updateCategoryField(
  authToken: string,
  categoryID: string,
  fieldToUpdate: string,
  dataToUpdate: string
) {
  const params = {
    id: categoryID,
  };
  const endpoint = `/category?id=${params.id}`;

  const updateBody: Record<string, any> = {};
  updateBody[fieldToUpdate] = dataToUpdate;

  return callWorldAnvil(
    endpoint,
    CallType.PATCH,
    authToken,
    JSON.stringify(updateBody)
  );
}
