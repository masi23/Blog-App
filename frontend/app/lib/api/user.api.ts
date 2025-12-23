import fetchApi from "./client";
import type {
  SafeUser,
  Post,
  Like,
  Comment,
  SavedList,
  Category,
} from "../types";
import endpoints from "./endpoints";

export const UserApi = {
  getAll: () => {
    return fetchApi<SafeUser>(endpoints.users, {
      method: "GET",
    });
  },
  getById: (id: number) => {
    return fetchApi<SafeUser>(`${endpoints.users}/${id}`, {
      method: "GET",
    });
  },
  update: (id: number, params: any[]) => {
    return fetchApi<SafeUser>(`${endpoints.users}/${id}`, {
      method: "PUT",
      body: {
        ...params,
      },
    });
  },
  remove: (id: number) => {
    return fetchApi<SafeUser>(`${endpoints.users}/${id}`, {
      method: "DELETE",
    });
  },
};
