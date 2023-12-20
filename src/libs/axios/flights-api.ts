import { TFlight } from "../../shared/types";
import { axios } from "./axios";

export async function listFlights() {
  const res = await axios<TFlight[]>({
    method: "GET",
    url: `/flights`,
  });
  return res.data;
}

export type TGetFlightVariables = {
  flightId: string;
};
export async function getFlight(variables: TGetFlightVariables) {
  const { flightId } = variables;
  const res = await axios<TFlight>({
    method: "GET",
    url: `/flights/${flightId}`,
  });
  return res.data;
}

export type TCreateFlightVariables = {
  code: string;
  date: string;
  capacity: number;
};
export async function createFlight(variables: TCreateFlightVariables) {
  const { ...data } = variables;
  const res = await axios<TFlight>({ method: "POST", url: `/flights`, data });
  return res.data;
}

export type TUpdateFlightVariables = {
  flightId: string;
  code: string;
  date: string;
  capacity: number;
};
export async function updateFlight(variables: TUpdateFlightVariables) {
  const { flightId, ...data } = variables;
  const res = await axios<TFlight>({
    method: "PUT",
    url: `flights/${flightId}`,
    data,
  });
  return res.data;
}

export type TDeleteFlightVariables = {
  flightId: string;
};
export async function deleteFlight(variables: TDeleteFlightVariables) {
  const { flightId } = variables;
  const res = await axios<void>({
    method: "DELETE",
    url: `flights/${flightId}`,
  });
  return res.data;
}
