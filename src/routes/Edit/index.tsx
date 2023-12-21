import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Edit = lazy(() => import("./Edit"));

export const EditRoute: RouteObject = {
  path: ":flightId",
  element: <Edit />,
};
