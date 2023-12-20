import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TFlight } from "../../../shared/types";
import { api } from "../../axios";

type TFlightsState = {
  items: TFlight[];
  status: "idle" | "loading";
  error: string | undefined;
};

const initialState: TFlightsState = {
  items: [],
  status: "idle",
  error: undefined,
};

export const loadFlightsThunk = createAsyncThunk("load", api.listFlights);
export const addFlightThunk = createAsyncThunk("add", api.createFlight);
export const updateFlightThunk = createAsyncThunk("update", api.updateFlight);
export const deleteFlightThunk = createAsyncThunk("delete", api.deleteFlight);

export const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOAD FLIGHTS
      .addCase(loadFlightsThunk.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(loadFlightsThunk.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(loadFlightsThunk.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })

      // ADD FLIGHT
      .addCase(addFlightThunk.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(addFlightThunk.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.unshift(action.payload);
      })
      .addCase(addFlightThunk.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })

      // UPDATE FLIGHT
      .addCase(updateFlightThunk.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(updateFlightThunk.fulfilled, (state, action) => {
        const index = state.items.findIndex((e) => e.id === action.payload.id);
        state.status = "idle";
        state.items.splice(index, 1, action.payload);
      })
      .addCase(updateFlightThunk.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })

      // DELETE FLIGHT
      .addCase(deleteFlightThunk.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(deleteFlightThunk.fulfilled, (state, action) => {
        state.status = "idle";
        // state.items = state.items.filter(
        //   (i) => i.id !== action.payload.deletedId
        // );
      })
      .addCase(deleteFlightThunk.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      });
  },
});

export default flightsSlice.reducer;
