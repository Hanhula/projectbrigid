enum CallType {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
}

async function callBrigid(endpoint: string, callType: string, body?: string) {
  let options: {};
  const authToken = await storage.getItem("local:authToken");

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
    const response = await fetch(
      `https://brigid.istralar.com/api${endpoint}`,
      options
    );
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
