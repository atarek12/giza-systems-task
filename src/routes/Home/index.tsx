import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { loader, action } from "./Home";

const Home = lazy(() => import("./Home"));

export const HomeRoute: RouteObject = {
  index: true,
  element: <Home />,
  loader,
  action,
};
