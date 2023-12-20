import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TFlight } from "../../../shared/types";
import { api } from "../../axios";

type TFlightsState = {
  items: TFlight[];
  loading: boolean;
  error: string | undefined;
};

const initialState: TFlightsState = {
  items: [],
  loading: false,
  error: undefined,
};

export const loadFlightsAction = createAsyncThunk("load", api.listFlights);
export const addFlightAction = createAsyncThunk("add", api.createFlight);
export const updateFlightAction = createAsyncThunk("update", api.updateFlight);
export const deleteFlightAction = createAsyncThunk("delete", api.deleteFlight);

export const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOAD FLIGHTS
      .addCase(loadFlightsAction.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loadFlightsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadFlightsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ADD FLIGHT
      .addCase(addFlightAction.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(addFlightAction.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(addFlightAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // UPDATE FLIGHT
      .addCase(updateFlightAction.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(updateFlightAction.fulfilled, (state, action) => {
        const index = state.items.findIndex((e) => e.id === action.payload.id);
        state.loading = false;
        state.items.splice(index, 1, action.payload);
      })
      .addCase(updateFlightAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // DELETE FLIGHT
      .addCase(deleteFlightAction.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(deleteFlightAction.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (i) => i.id !== action.payload.flightId
        );
      })
      .addCase(deleteFlightAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default flightsSlice.reducer;
