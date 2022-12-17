
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import axios from "axios";
import { playlistAPI} from "../API/api";
import { IPlaylist } from "../types/playlist";
import { setSuccess } from "./userSlice";
import { setError } from "./authSlice";
// Type for our state
export interface PlaylistState { 
  playlistForPage: IPlaylist
}

// Initial state
const initialState: PlaylistState = {
  playlistForPage:{} as IPlaylist,
};

export const fetchPlaylist = createAsyncThunk(
  "playlist/fetchPlaylist",
  async (id:string, { rejectWithValue, dispatch }) => {
    try {
       const response= await axios.get(process.env.NEXT_PUBLIC_BASIC_URL + "playlists/" + id)
      //const response = await  axios.get('http://172.19.0.3:5000/'+"playlists/"+id)
      let playlist=response.data
      let tracks=playlist.tracks.map((t:any,index:any)=>({...t,index})) 
      playlist.tracks=tracks
      dispatch(setPlaylistForPage(playlist))
    } catch (error) {
      dispatch(setError("Some Server erroor"))
    }
  }
);
export const updatePlaylist = createAsyncThunk(
  "playlist/updatePlaylist",
  async (data:any, { rejectWithValue, dispatch }) => {
    try {
     const response= await playlistAPI.updatePlaylist(data)
      let playlist=response.data
      let tracks=playlist.tracks.map((t:any,index:any)=>({...t,index})) 
      playlist.tracks=tracks
      dispatch(setPlaylistForPage(playlist))
      dispatch(setSuccess('Плейліст успішно відредаговано'))
    } catch (error) {
      // dispatch(setError("Some Server erroor"))
    }finally{
      // dispatch(setDisabled(false))
    }
  }
);

export const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {

    // Action to set the authentication status
    setPlaylistForPage(state, action) {
      state.playlistForPage = action.payload
    },

  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.playlist,
      };
    },
  },

});

export const {setPlaylistForPage } = playlistSlice.actions;

export default playlistSlice.reducer;