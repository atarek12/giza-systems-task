import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./App.tsx";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { ReduxProvider } from "./libs/redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </ReduxProvider>
  </React.StrictMode>,
);
