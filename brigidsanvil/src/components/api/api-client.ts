export const CallType = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export async function callWorldAnvil(
  authToken: string,
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
