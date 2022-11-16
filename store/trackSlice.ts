
import { createSlice, createAsyncThunk, Action } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { ITrack } from '../types/track'
import axios from "axios";
import { instance } from "../API/api";
// Type for our state
export interface TrackState {
  tracks: ITrack[]
  error: string
}

// Initial state
const initialState: TrackState = {
  tracks: [],
  error: ""
};
export const fetchTracks = createAsyncThunk(
  "track/fetchTracks",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get("http://localhost:5000/tracks")
      dispatch(setTracks(response.data))
    } catch (error) {
      dispatch(setError("Some Server erroor"))
    }
  }
);
export const searchTracks = createAsyncThunk(
  "track/searchTracks",
  async (query, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get("http://localhost:5000/tracks/search?query=" + query)
      dispatch(setTracks(response.data))
    } catch (error) {
      dispatch(setError("Some Server erroor"))
    }
  }
);
export const trackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {

    // Action to set the authentication status
    setTracks(state, action) {
      state.tracks = action.payload
      // console.log("insettracks",  state.tracks )
    },
    setError(state, action) {
      state.error = action.payload
    },
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log(state)
      return {
        ...state,
        ...action.payload.track,
      };
    },
  },

});

export const { setTracks, setError } = trackSlice.actions;

export default trackSlice.reducer;