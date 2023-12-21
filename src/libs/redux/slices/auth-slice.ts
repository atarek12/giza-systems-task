import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TUser } from "../../../shared/types";
import { api } from "../../axios";
import type { RootState } from "..";

const USER_KEY = "user";

type TAuthState = {
  user: TUser | undefined;
  loading: boolean;
  error: string | undefined;
};

const initialState: TAuthState = {
  user: undefined,
  loading: false,
  error: undefined,
};

export const loginAction = createAsyncThunk("login", api.login);
export const signupAction = createAsyncThunk("signup", api.signup);
export const checkAuthAction = createAsyncThunk(
  "check-auth",
  (args, { getState }) => {
    const state = (getState() as RootState).auth;
    if (state.user) return state.user;
    const savedUser = localStorage.getItem(USER_KEY);
    if (savedUser) {
      return JSON.parse(savedUser) as TUser;
    }
  },
);

export const authSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    logoutAction: (state) => {
      localStorage.removeItem(USER_KEY);
      state.user = undefined;
      state.error = undefined;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        localStorage.setItem(USER_KEY, JSON.stringify(action.payload));
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // SIGNUP
      .addCase(signupAction.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(signupAction.fulfilled, (state, action) => {
        localStorage.setItem(USER_KEY, JSON.stringify(action.payload));
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // CHECK AUTH
      .addCase(checkAuthAction.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logoutAction } = authSlice.actions;
export default authSlice.reducer;
