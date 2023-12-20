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
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { ConfirmationModal } from "../ConfirmationModal";
import { deleteFlightAction, useAppDispatch } from "../../../libs/redux";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteFlightAction({ flightId: flight.id }));
    onClose();
  };

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
        <Text>Code: {flight.code}</Text>
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
          >
            Edit
          </Button>
          <Button
            flex="1"
            colorScheme="red"
            variant="outline"
            leftIcon={<DeleteIcon />}
            onClick={onOpen}
          >
            Delete
          </Button>
        </CardFooter>
      )}

      <ConfirmationModal
        isOpen={isOpen}
        onConfirm={handleDelete}
        onClose={onClose}
      />
    </Card>
  );
};

export { FlightCard };
