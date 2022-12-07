
import { createSlice, createAsyncThunk, Action } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { ITrack } from '../types/track'
import axios from "axios";
import { tracksAPI } from "../API/api";
// Type for our state
export interface TrackState {
  playlists:any[]
  tracks: ITrack[]
  error: string
  noTracks:boolean,
  searchedTracks:ITrack[]
  mostSearchedTracks:ITrack[]
  morePopup:string
}

// Initial state
const initialState: TrackState = {
  tracks: [],
  searchedTracks:[],
  mostSearchedTracks:[],
  error: "",
  noTracks:false,
  playlists:[],
  morePopup:""
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

export const fetchPlaylists = createAsyncThunk(
  "track/fetchPlaylists",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get("http://localhost:5000/alboms")
      dispatch(setPlaylists(response.data))
    } catch (error) {
      dispatch(setError("Some Server erroor"))
    }
  }
);
export const searchTracks = createAsyncThunk(
  "track/searchTracks",
  async (query, { rejectWithValue, dispatch }) => {
    try {
      const response = await tracksAPI.getSearchedTracks(query)
      if(!response.data.length){
        dispatch(setNoTracks(true))
      }else{
        dispatch(setNoTracks(false))
      }
      dispatch(setSearchedTracks(response.data))
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
    setPlaylists(state, action) {
      state.playlists = action.payload
      // console.log("insettracks",  state.tracks )
    },
    setSearchedTracks(state, action) {
      state.searchedTracks = action.payload
      // console.log("insettracks",  state.tracks )
    },
    setError(state, action) {
      state.error = action.payload
    },
    setNoTracks(state, action) {
      state.noTracks = action.payload
    },
    setMorePopup(state, action) {
      state.morePopup = action.payload
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

export const { setTracks, setError,setMorePopup, setPlaylists, setNoTracks, setSearchedTracks} = trackSlice.actions;

export default trackSlice.reducer;