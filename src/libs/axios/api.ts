import * as postsApi from "./posts-api";
import * as usersApi from "./users-api";

export const api = {
  ...postsApi,
  ...usersApi,
};
