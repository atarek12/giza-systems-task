import React, { useLayoutEffect } from "react";
import {
  getFlightAction,
  updateFlightAction,
  useAppDispatch,
  useAppSelector,
} from "../../libs/redux";
import { Container, Heading, SkeletonText, Stack } from "@chakra-ui/react";
import { Navigate, useParams } from "react-router-dom";
import { AddUpdateFlight, TFlightFormValues } from "../../shared/components";
import BackButton from "./BackButton";

interface EditProps {}

const Edit: React.FC<EditProps> = ({}) => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { currentItem, loading } = useAppSelector((state) => state.flights);

  useLayoutEffect(() => {
    if (!currentItem && params.flightId) {
      dispatch(getFlightAction({ flightId: params.flightId }));
    }
  }, [dispatch, currentItem, params.flightId]);

  const handleEdit = (values: TFlightFormValues) => {
    if (!params.flightId) return;
    dispatch(updateFlightAction({ ...values, flightId: params.flightId }));
  };

  if (!params.flightId) {
    return <Navigate to="/flights" replace />;
  }

  return (
    <Container maxW="1400" paddingTop="60px">
      <BackButton />

      {loading ? (
        <SkeletonText />
      ) : !currentItem ? (
        <Stack align="start">
          <Heading>This Flight Not Found</Heading>
          <BackButton />
        </Stack>
      ) : (
        <AddUpdateFlight flight={currentItem} onSubmit={handleEdit} />
      )}
    </Container>
  );
};

export default Edit;
