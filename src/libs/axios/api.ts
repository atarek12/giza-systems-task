import * as postsApi from "./posts-api";
import * as usersApi from "./users-api";
import * as flightsApi from "./flights-api";

export const api = {
  ...postsApi,
  ...usersApi,
  ...flightsApi,
};
