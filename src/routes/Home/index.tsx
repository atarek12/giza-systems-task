import { RouteObject } from "react-router-dom";

export const HomeRoute: RouteObject = {
  index: true,
  lazy: () => import("./Home"),
};
