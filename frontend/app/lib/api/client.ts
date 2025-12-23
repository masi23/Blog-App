const apiUrl = process.env.API_URL;

async function fetchApi<T>(
  endpoint: string,
  options?: {
    method: "GET" | "POST" | "PUT" | "DELETE";
    body?: unknown;
  }
): Promise<T> {
  if (apiUrl === undefined) throw new Error("Api url not set.");
  const { method = "GET", body } = options || {};

  const response = await fetch(apiUrl, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    ...(body !== undefined && { body: JSON.stringify(body) }),
  });
  if (!response.ok)
    throw new Error(`Fetch (${method})to ${apiUrl + endpoint} failed.`);

  return await response.json();
}

export default fetchApi;
