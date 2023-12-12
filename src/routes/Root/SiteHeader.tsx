import { SunIcon } from "@chakra-ui/icons";
import { Avatar, Stack, Text } from "@chakra-ui/react";
import React from "react";

interface SiteHeaderProps {}

const SiteHeader: React.FC<SiteHeaderProps> = ({}) => {
  return (
    <Stack
      direction="row"
      justify="space-between"
      align="center"
      padding="12px 16px"
    >
      <Stack direction="row" align="center" spacing="6px">
        <SunIcon color="blue.500" boxSize="40px" />
        <Text
          color="blue.700"
          fontSize="32px"
          fontWeight="700"
          letterSpacing="-0.64px"
        >
          Giza Systems
        </Text>
      </Stack>

      <Avatar />
    </Stack>
  );
};

export default SiteHeader;
