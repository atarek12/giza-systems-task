import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

interface BackButtonProps {}

const BackButton: React.FC<BackButtonProps> = ({}) => {
  return (
    <Button
      leftIcon={<ArrowBackIcon />}
      variant="link"
      as={Link}
      to="/"
      replace
      mb="20px"
    >
      GO BACK
    </Button>
  );
};

export default BackButton;
