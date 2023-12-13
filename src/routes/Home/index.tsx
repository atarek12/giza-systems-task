import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { loader, action } from "./Home";
import { CommentsRoute } from "./post-comments";

const Home = lazy(() => import("./Home"));

export const HomeRoute: RouteObject = {
  path: "/",
  element: <Home />,
  loader,
  action,
  children: [CommentsRoute],
  shouldRevalidate: () => false,
};
