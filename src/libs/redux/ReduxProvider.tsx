import { configureStore } from "@reduxjs/toolkit";
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import flightsReducer from "./slices/flights-slice";
import authSlice from "./slices/auth-slice";

const store = configureStore({
  reducer: {
    flights: flightsReducer,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type TReduxProviderProps = {
  children: React.ReactNode;
};
export function ReduxProvider({ children }: TReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
