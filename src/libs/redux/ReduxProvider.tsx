import { configureStore } from "@reduxjs/toolkit";
import flightsReducer from "./slices/flights-slice";
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

const store = configureStore({
  reducer: {
    flights: flightsReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type TReduxProviderProps = {
  children: React.ReactNode;
};
export function ReduxProvider({ children }: TReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
