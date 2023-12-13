import { SunIcon } from "@chakra-ui/icons";
import { Avatar, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

interface SiteHeaderProps {}

const SiteHeader: React.FC<SiteHeaderProps> = ({}) => {
  return (
    <Stack
      direction="row"
      justify="space-between"
      align="center"
      position="sticky"
      top="0"
      padding="12px 16px"
      background="gray.300"
      boxShadow="md"
      zIndex={1}
    >
      <Stack direction="row" align="center" spacing="6px" as={Link} to="/">
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
