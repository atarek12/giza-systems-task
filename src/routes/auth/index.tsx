import { Outlet, RouteObject } from "react-router-dom";

const LoginRoute: RouteObject = {
  path: "login",
  lazy: () => import("./Login"),
};

const SignupRoute: RouteObject = {
  path: "signup",
  lazy: () => import("./Signup"),
};

export const AuthRoute: RouteObject = {
  path: "",
  element: <Outlet />,
  children: [LoginRoute, SignupRoute],
};
