enum CallType {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
}

const API_ORIGIN = "brigids-longhammer";
const API_URL = "https://brigid.istralar.com/api";

async function callBrigid(endpoint: string, callType: string, body?: string) {
  let options: {};
  const authToken = await storage.getItem("local:authToken");

  if (body) {
    options = {
      method: callType,
      headers: {
        authorization: authToken,
        origin: API_ORIGIN,
      },
      body: body,
    };
  } else {
    options = {
      method: callType,
      headers: {
        authorization: authToken,
        origin: API_ORIGIN,
      },
    };
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
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

export async function verifyIdentity() {
  const endpoint = `/identity`;
  const data = await callBrigid(endpoint, CallType.GET);
  return data;
}

export async function getWorlds(worldId: string) {
  let params = {
    id: worldId,
    granularity: 0,
  };
  const endpoint = `/user/worlds?id=${params.id}`;
  const data = await callBrigid(endpoint, CallType.POST);
  return data;
}
