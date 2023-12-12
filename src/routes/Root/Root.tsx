import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SiteHeader from "./SiteHeader";

export function Root() {
  return (
    <Box>
      <SiteHeader />
      <Outlet />
    </Box>
  );
}
