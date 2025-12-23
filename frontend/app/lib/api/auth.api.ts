import fetchApi from "./client";
import type { SafeUser } from "../types";
import endpoints from "./endpoints";

//each method returns/forwards promise object
export const AuthApi = {
  login: (email: string, password: string) => {
    return fetchApi<SafeUser>(endpoints.login, {
      method: "POST",
      body: { email, password },
    });
  },
  register: (name: string, email: string, password: string) => {
    return fetchApi<SafeUser>(endpoints.register, {
      method: "POST",
      body: {
        name: name,
        email: email,
        password: password,
      },
    });
  },
};
