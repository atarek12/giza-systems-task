import React, { useLayoutEffect, useRef } from "react";
import {
  getFlightAction,
  updateFlightAction,
  useAppDispatch,
  useAppSelector,
} from "../../libs/redux";
import { Container, Heading, SkeletonText, useToast } from "@chakra-ui/react";
import { Navigate, useParams } from "react-router-dom";
import { AddUpdateFlight, TFlightFormValues } from "../../shared/components";
import BackButton from "./BackButton";

interface EditProps {}

const Component: React.FC<EditProps> = ({}) => {
  const toast = useToast();
  const params = useParams();
  const dispatch = useAppDispatch();
  const isCalledRef = useRef(false);
  const { currentItem, loading } = useAppSelector((state) => state.flights);

  useLayoutEffect(() => {
    if (!currentItem && params.flightId && !isCalledRef.current) {
      isCalledRef.current = true;
      dispatch(getFlightAction({ flightId: params.flightId }));
    }
  }, [dispatch, currentItem, params.flightId]);

  const handleEdit = (values: TFlightFormValues) => {
    if (!params.flightId) return;
    dispatch(updateFlightAction({ ...values, flightId: params.flightId }));
    toast({
      title: "Flight updated.",
      description: "We've updated your flight.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  if (!params.flightId) {
    return <Navigate to="/flights" replace />;
  }

  return (
    <Container maxW="1400" paddingY="100px">
      <BackButton />

      {loading ? (
        <SkeletonText />
      ) : !currentItem ? (
        <Heading>This Flight Not Found</Heading>
      ) : (
        <AddUpdateFlight flight={currentItem} onSubmit={handleEdit} />
      )}
    </Container>
  );
};

Component.displayName = "Edit";
export { Component };
