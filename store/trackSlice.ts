
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ITrack, } from '../types/track'
import axios from "axios";
import { tracksAPI,playlistAPI} from "../API/api";
import { IPlaylist } from "../types/playlist";
// Type for our state
export interface TrackState { 
  trackForPage:ITrack
  playlists:any[]
  tracks: ITrack[]
  error: string
  morePopup:string
}

// Initial state
const initialState: TrackState = {
  trackForPage:{} as ITrack,
  tracks: [],
  error: "",
  playlists:[],
  morePopup:""
};
export const fetchTracks = createAsyncThunk(
  "track/fetchTracks",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await  axios.get(process.env.NEXT_PUBLIC_BASIC_URL+"tracks")
    // const response = await  axios.get('http://192.168.1.102:5000/'+"tracks")
      // const response =  await tracksAPI.getTracks()
      //no localeStorage
      dispatch(setTracks(response.data)) 
    } catch (error) {
      console.log("dddd")
      dispatch(setError("Some Server erroor"))
    }
  } 
); 
export const fetchTrack = createAsyncThunk(
  "track/fetchTrack", 
  async (id:string, { rejectWithValue, dispatch }) => {
    try {
     const response = await  axios.get(process.env.NEXT_PUBLIC_BASIC_URL+"tracks/"+id)
     //const response = await  axios.get('http://192.168.1.102:5000/'+"tracks/"+id)
      // const response =  await tracksAPI.getTrack(id)
      //no localeStorage
      dispatch(setTrackForPage(response.data)) 
    } catch (error) {
      dispatch(setError("Some Server erroor"))
    }
  }
);
export const fetchPlaylists = createAsyncThunk(
  "track/fetchPlaylists",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_BASIC_URL+"playlists")
      // const response = await  axios.get('192.168.1.102:5000/'+"playlists")
      // playlistAPI.getPlaylists()
      //no localeStorage
      dispatch(setPlaylists(response.data))
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

    setTrackForPage(state, action) {
      state.trackForPage = action.payload
    },
    setPlaylists(state, action) {
      state.playlists = action.payload
      // console.log("insettracks",  state.tracks )
    },
    setError(state, action) {
      state.error = action.payload
    },
    setMorePopup(state, action) {
      state.morePopup = action.payload
    },
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.track,
      };
    },
  },

});

export const { setTracks, setError,setMorePopup, setPlaylists, setTrackForPage} = trackSlice.actions;

export default trackSlice.reducer;