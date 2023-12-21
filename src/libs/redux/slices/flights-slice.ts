import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TFlight } from "../../../shared/types";
import { api } from "../../axios";
import type { RootState } from "..";
import { TGetFlightVariables } from "../../axios/flights-api";

type TFlightsState = {
  items: TFlight[];
  currentItem: TFlight | null;
  loading: boolean;
  error: string | undefined;
};

const initialState: TFlightsState = {
  items: [],
  currentItem: null,
  loading: false,
  error: undefined,
};

export const listFlightsAction = createAsyncThunk("list", api.listFlights);
export const addFlightAction = createAsyncThunk("add", api.createFlight);
export const updateFlightAction = createAsyncThunk("update", api.updateFlight);
export const deleteFlightAction = createAsyncThunk("delete", api.deleteFlight);
export const getFlightAction = createAsyncThunk(
  "get",
  async ({ flightId }: TGetFlightVariables, { getState }) => {
    const items = (getState() as RootState).flights.items;
    let existedItem = items.find((i) => i.id === flightId);
    if (!existedItem) {
      existedItem = await api.getFlight({ flightId });
    }
    return existedItem;
  },
);

export const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOAD FLIGHTS
      .addCase(listFlightsAction.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(listFlightsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(listFlightsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // GET FLIGHT
      .addCase(getFlightAction.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getFlightAction.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload;
      })
      .addCase(getFlightAction.rejected, (state, action) => {
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
        state.items.push(action.payload);
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
          (i) => i.id !== action.payload.flightId,
        );
      })
      .addCase(deleteFlightAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default flightsSlice.reducer;
