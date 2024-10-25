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

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST,PUT");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
    );
    res.status(200).end();
    return;
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
    const responseData = await response.json(); // Parse the response body

    if (!response.ok) {
      throw new Error(responseData.error.summary); // Throw an error with the server's error message
    }

    res.status(200).json(responseData);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
