const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import endpoints from "./endpoints";

async function fetchApi<T>(
  endpoint: string,
  options?: {
    method: "GET" | "POST" | "PUT" | "DELETE";
    body?: unknown;
  }
): Promise<T> {
  if (apiUrl === undefined) {
    console.error("Api url not set.");
    throw new Error("Something went wrong, please try again later");
  }
  const { method = "GET", body } = options || {};

  const response = await fetch(apiUrl + endpoint, {
    method: method,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    ...(body !== undefined && { body: JSON.stringify(body) }),
  });

  if (response.status === 204 || response.status === 304) {
    return null as T;
  }

  const text = await response.text();
  if (!text) {
    return null as T;
  }

  if (!response.ok) {
    switch (response.status) {
      case 400:
        if (endpoint === endpoints.login) {
          throw new Error("Invalid email or password.");
        }
        throw new Error("Something went wrong. Please try again.");
        break;
      case 401:
        throw new Error("You must authenticate to access this content.");
        break;
      case 404:
        if (endpoint === endpoints.login) {
          throw new Error("Account not found.");
        }
        throw new Error("404. Content not found.");
        break;
      default:
        console.error(`Fetch (${method})to ${apiUrl + endpoint} failed.`);
        throw new Error("Something went wrong. Please try again later");
    }
  }

  // return await response.json();
  return JSON.parse(text) as T;
}

export default fetchApi;
