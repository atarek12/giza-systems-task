import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Home = lazy(() => import("./Home"));

export const HomeRoute: RouteObject = {
  index: true,
  element: <Home />,
};
