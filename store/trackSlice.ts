
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ITrack, } from '../types/track'
import axios from "axios";
import { tracksAPI,playlistAPI} from "../API/api";
import { IPlaylist } from "../types/playlist";
// Type for our state
export interface TrackState { 
  playlistForPage:IPlaylist
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
  playlistForPage:{} as IPlaylist,
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
     const response = await  axios.get(process.env.NEXT_PUBLIC_BASIC_URL+"tracks")
      // const response =  await tracksAPI.getTracks()
      //no localeStorage
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
      const response = await axios.get(process.env.NEXT_PUBLIC_BASIC_URL+"playlists")
      // playlistAPI.getPlaylists()
      //no localeStorage
      dispatch(setPlaylists(response.data))
    } catch (error) {
      dispatch(setError("Some Server erroor"))
    }
  }
);
export const searchTracks = createAsyncThunk(
  "track/searchTracks",
  async (query:string, { rejectWithValue, dispatch }) => {
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
export const fetchPlaylist = createAsyncThunk(
  "track/fetchPlaylist",
  async (id:string, { rejectWithValue, dispatch }) => {
    try {
      const response= await axios.get(process.env.NEXT_PUBLIC_BASIC_URL + "playlists/" + id)
      let playlist=response.data
      let tracks=playlist.tracks.map((t:any,index:any)=>({...t,index})) 
      playlist.tracks=tracks
      dispatch(setPlaylistForPage(playlist))
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
    setPlaylistForPage(state, action) {
      state.playlistForPage = action.payload
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
      return {
        ...state,
        ...action.payload.track,
      };
    },
  },

});

export const { setTracks, setError,setMorePopup, setPlaylists, setNoTracks, setSearchedTracks, setPlaylistForPage} = trackSlice.actions;

export default trackSlice.reducer;