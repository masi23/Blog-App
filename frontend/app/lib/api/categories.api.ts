import type { Category } from "../types";
import fetchApi from "./client";
import endpoints from "./endpoints";

export const CategoryApi = {
  getAll: () => {
    return fetchApi<Category[]>(endpoints.categories, {
      method: "GET",
    });
  },
  getById: (id: number) => {
    return fetchApi<Category>(`${endpoints.categories}/${id}`, {
      method: "GET",
    });
  },
  create: (params: any[]) => {
    return fetchApi<Category>(endpoints.categories, {
      method: "POST",
      body: {
        ...params,
      },
    });
  },
  update: (id: number, params: any[]) => {
    return fetchApi<Category>(`${endpoints.categories}/${id}`, {
      method: "PUT",
      body: {
        ...params,
      },
    });
  },
  remove: (id: number) => {
    return fetchApi<Category>(`${endpoints.categories}/${id}`, {
      method: "DELETE",
    });
  },
};
