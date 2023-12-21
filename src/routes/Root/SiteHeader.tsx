import { SunIcon } from "@chakra-ui/icons";
import { Avatar, Button, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutAction, useAppDispatch, useAppSelector } from "../../libs/redux";

interface SiteHeaderProps {}

const SiteHeader: React.FC<SiteHeaderProps> = ({}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/auth/login", { replace: true });
  };

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

      <Stack direction="row">
        {!!user && (
          <Button variant="link" colorScheme="black" onClick={handleLogout}>
            LOGOUT
          </Button>
        )}
        <Avatar name={user?.name} />
      </Stack>
    </Stack>
  );
};

export default SiteHeader;
