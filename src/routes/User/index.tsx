import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { loader } from "./User";

const User = lazy(() => import("./User"));

export const UserRoute: RouteObject = {
  path: "/users/:userId",
  element: <User />,
  loader,
};
