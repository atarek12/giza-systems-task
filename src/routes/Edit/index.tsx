import { RouteObject } from "react-router-dom";

export const EditRoute: RouteObject = {
  path: ":flightId",
  lazy: () => import("./Edit"),
};
