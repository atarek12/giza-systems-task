import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { loader, action } from "./Comments";

const Comments = lazy(() => import("./Comments"));

export const CommentsRoute: RouteObject = {
  path: "posts/:postId/comments",
  element: <Comments />,
  loader,
  action,
};
