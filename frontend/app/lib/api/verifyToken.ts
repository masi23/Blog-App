import fetchApi from "./client";
import type { UserStatus } from "../types";
import endpoints from "./endpoints";

export const Verify = {
  verifyToken: async () => {
    return fetchApi<UserStatus>(endpoints.verifyToken, {
      method: "GET",
    });
  },
};
