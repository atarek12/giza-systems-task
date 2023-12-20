import { Box, Container, Heading, SkeletonText, Stack } from "@chakra-ui/react";
import React, { useLayoutEffect } from "react";
import {
  addFlightAction,
  loadFlightsAction,
  useAppDispatch,
  useAppSelector,
} from "../../libs/redux";
import CreatePost, { TCreateFlightFormValues } from "./components/CreateFlight";
import { FlightsList } from "../../shared/components";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const dispatch = useAppDispatch();
  const { items, error } = useAppSelector((state) => state.flights);

  useLayoutEffect(() => {
    if (!items.length) {
      dispatch(loadFlightsAction());
    }
  }, [dispatch, items.length]);

  const handleCreatePost = (values: TCreateFlightFormValues) => {
    dispatch(addFlightAction(values));
  };

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <Container maxW="1400" paddingTop="60px">
      <Stack direction="row" spacing="160px">
        <Stack spacing="16px" flex="1">
          <Heading>What's new...</Heading>
          {!items.length ? <SkeletonText /> : <FlightsList flights={items} />}
        </Stack>
        <Box flex="1">
          <CreatePost onSubmit={handleCreatePost} />
        </Box>
      </Stack>
    </Container>
  );
};

export default Home;
