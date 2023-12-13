import { createBrowserRouter } from "react-router-dom";
import { HomeRoute } from "./routes/Home";
import { Root } from "./routes/Root";
import { ErrorPage } from "./routes/Error";
import { UserRoute } from "./routes/User";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [HomeRoute, UserRoute],
  },
]);
