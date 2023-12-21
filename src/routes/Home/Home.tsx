import { Box, Container, Heading, SkeletonText, Stack } from "@chakra-ui/react";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useToast } from "@chakra-ui/react";
import {
  addFlightAction,
  listFlightsAction,
  useAppDispatch,
  useAppSelector,
} from "../../libs/redux";
import {
  AddUpdateFlight,
  FlightsList,
  TFlightFormValues,
} from "../../shared/components";

interface HomeProps {}

const Component: React.FC<HomeProps> = ({}) => {
  const dispatch = useAppDispatch();
  const { items, error } = useAppSelector((state) => state.flights);
  const toast = useToast();
  const previousItemsLength = useRef(items.length || 0);

  useEffect(() => {
    // scroll down after creating a new flight
    if (items.length && previousItemsLength.current === 0) {
      previousItemsLength.current = items.length;
    }
    if (items.length > previousItemsLength.current) {
      previousItemsLength.current = items.length;
      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [items.length]);

  useLayoutEffect(() => {
    if (!items.length) {
      dispatch(listFlightsAction());
    }
  }, [dispatch, items.length]);

  const handleCreateFlight = (values: TFlightFormValues) => {
    dispatch(addFlightAction(values));
    toast({
      title: "Flight created.",
      description: "We've created your next flight.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <Container maxW="1400" paddingY="100px">
      <Stack direction="row" spacing="160px">
        <Stack spacing="16px" flex="1">
          <Heading>What's new...</Heading>
          {!items.length ? <SkeletonText /> : <FlightsList flights={items} />}
        </Stack>
        <Box flex="1" position="sticky" top="172px" height="434px">
          <AddUpdateFlight onSubmit={handleCreateFlight} />
        </Box>
      </Stack>
    </Container>
  );
};

Component.displayName = "Home";
export { Component };
