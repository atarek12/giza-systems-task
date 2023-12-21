import * as flightsApi from "./flights-api";
import * as authApi from "./auth-api";

export const api = {
  ...flightsApi,
  ...authApi,
};
