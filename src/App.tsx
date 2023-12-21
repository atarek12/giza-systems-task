import { Navigate, createBrowserRouter } from "react-router-dom";
import { HomeRoute } from "./routes/Home";
import { Root } from "./routes/Root";
import { ErrorPage } from "./routes/Error";
import { EditRoute } from "./routes/Edit";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="flights" replace />,
  },
  {
    path: "flights",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [HomeRoute, EditRoute],
  },
]);
