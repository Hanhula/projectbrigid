// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const baseURL: string = "https://www.worldanvil.com/api/external/boromir";
const appKey: string | undefined = process.env.APP_KEY;
let authToken: string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!appKey) {
    return res.status(500).json({ error: "Application key not found" });
  }

  let { worldanvil } = req.query;
  const queryParameters = req.query;
  let apiEndpoint = worldanvil;
  let filteredQueryParams = { ...queryParameters };
  delete filteredQueryParams.worldanvil;

  const queryString = Object.entries(filteredQueryParams)
    .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
    .join("&");

  authToken = req.headers.authorization!;

  let additionalHeaders: HeadersInit = {
    "Content-Type": "application/json;charset=UTF-8",
    "x-auth-token": authToken as string,
    "x-application-key": appKey as string,
    "User-Agent": "HanApp/0.0.1",
    Accept: "application/json",
  };

  if (Array.isArray(apiEndpoint)) {
    apiEndpoint = apiEndpoint.join("/");
  }

  const url = `${baseURL}/${apiEndpoint}?${queryString}`;

  let options = {};
  if (req.method === "GET") {
    options = {
      method: req.method,
      headers: additionalHeaders,
    };
  } else {
    console.log(req.body);
    options = {
      method: req.method,
      headers: additionalHeaders,
      body: req.body,
    };
  }

  try {
    const response: Response = await fetch(url, options);
    const responseText = await response.text(); // Get the response as text

    try {
      const responseData = JSON.parse(responseText); // Try to parse the response as JSON

      if (!response.ok) {
        throw new Error(responseData.error.summary); // Throw an error with the server's error message
      }

      res.status(200).json(responseData);
    } catch (jsonError) {
      console.error("Failed to parse JSON response:", responseText);
      throw new Error("Invalid JSON response");
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
