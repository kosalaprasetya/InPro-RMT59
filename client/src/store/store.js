import { configureStore } from "@reduxjs/toolkit";
import stationsReducer from "../features/stationsSlice";

export const store = configureStore({
  reducer: {
    stations: stationsReducer, 
  },
});