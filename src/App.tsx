import { Navigate, createBrowserRouter } from "react-router-dom";
import { HomeRoute } from "./routes/Home";
import { Root } from "./routes/Root";
import { ErrorPage } from "./routes/Error";
import { EditRoute } from "./routes/Edit";
import { AuthRoute } from "./routes/auth";
import { RequireAuth } from "./shared/components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="flights" replace />,
  },
  {
    path: "flights",
    element: (
      <RequireAuth>
        <Root />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
    children: [HomeRoute, EditRoute],
  },
  {
    path: "auth",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [AuthRoute],
  },
]);
