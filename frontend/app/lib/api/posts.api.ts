import type { Post } from "../types";
import fetchApi from "./client";
import endpoints from "./endpoints";

export const PostApi = {
  getAll: () => {
    return fetchApi<Post>(endpoints.posts, {
      method: "GET",
    });
  },
  getById: (id: number) => {
    return fetchApi<Post>(`${endpoints.posts}/${id}`, {
      method: "GET",
    });
  },
  create: (params: any[]) => {
    return fetchApi<Post>(endpoints.posts, {
      method: "POST",
    });
  },
  update: (id: number) => {
    return fetchApi<Post>(`${endpoints.posts}/${id}`, {
      method: "PUT",
    });
  },
  remove: (id: number) => {
    return fetchApi<Post>(`${endpoints.posts}/${id}`, {
      method: "DELETE",
    });
  },
};
