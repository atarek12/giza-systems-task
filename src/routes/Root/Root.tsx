import { Box } from "@chakra-ui/react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import SiteHeader from "./SiteHeader";

export function Root() {
  return (
    <Box>
      <SiteHeader />
      <Outlet />
      <ScrollRestoration />
    </Box>
  );
}
