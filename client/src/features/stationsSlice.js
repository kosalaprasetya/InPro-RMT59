import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../helpers/http"

const stationsSlice = createSlice({
  name: "stations",
  initialState: {
    stations: [],
  },
  reducers: {
    addStations: (state, action) => {
      state.stations = action.payload;
    }
  },
});

export const fetchStations = createAsyncThunk(
  "stations/fetchStations",
  async () => {
    try {
      const response = await http({
        method: "GET",
        url: "/stations",
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      return response.data;
    } catch (error) {
      console.error(error)
    } 
  }
);

export const { addStations } = stationsSlice.actions;
export default stationsSlice.reducer;