import React from "react";
import { TFlight } from "../../types";
import { Box, Stack } from "@chakra-ui/react";
import { FlightCard } from "./FlightCard";

interface FlightsListProps {
  flights: TFlight[];
  hideButtons?: boolean;
}

const FlightsList: React.FC<FlightsListProps> = ({ flights, hideButtons }) => {
  return (
    <Stack spacing="20px">
      {flights.map((flight) => (
        <Box key={flight.id}>
          <FlightCard flight={flight} hideButtons={hideButtons} />
        </Box>
      ))}
    </Stack>
  );
};

export { FlightsList };
