import React from "react";
import { TFlight } from "../../types";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

interface FlightCardProps {
  index: number;
  flight: TFlight;
  hideButtons?: boolean;
}

const FlightCard: React.FC<FlightCardProps> = ({
  index,
  flight,
  hideButtons,
}) => {
  return (
    <Card border="1px solid" borderColor="blue.100">
      <CardHeader>
        <Flex flex="1" gap="4" alignItems="center">
          <Avatar name={`${index + 1}`} />
          <Box>
            <Heading size="sm">{flight.code}</Heading>
            <Text>FLIGHT ID: {flight.id}</Text>
          </Box>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>Capacity: {flight.capacity}</Text>
        <Text>Trip Date: {flight.date}</Text>
      </CardBody>

      {!hideButtons && (
        <CardFooter>
          <Button
            flex="1"
            mr="10px"
            leftIcon={<EditIcon />}
            as={Link}
            to={`flights/${flight.id}`}
            preventScrollReset
          >
            Edit
          </Button>
          <Button
            flex="1"
            colorScheme="blue"
            variant="outline"
            leftIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export { FlightCard };
