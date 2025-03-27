import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../helpers/http"

const stationsSlice = createSlice({
  name: "stations",
  initialState: {
    data: [],
  },
  reducers: {
    setStations: (state, action) => {
      state.data = action.payload;
    }
  },
});

export const fetchStations = createAsyncThunk(
  "stations/fetchStations",
  async (_,{dispatch}) => {
    try {
      const response = await http({
        method: "GET",
        url: "/stations",
        headers:{
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })
      dispatch(setStations(response.data));
    } catch (error) {
      console.error(error)
    } 
  }
);

export const { setStations } = stationsSlice.actions;
export default stationsSlice.reducer;