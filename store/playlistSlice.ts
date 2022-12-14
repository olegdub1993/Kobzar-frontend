
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ITrack, } from '../types/track'
import axios from "axios";
import { tracksAPI,playlistAPI} from "../API/api";
import { IPlaylist } from "../types/playlist";
import { setSuccess } from "./userSlice";
// Type for our state
export interface PlaylistState { 
  playlistForPage: IPlaylist
}

// Initial state
const initialState: PlaylistState = {
  playlistForPage:{} as IPlaylist,
};

export const updatePlaylist = createAsyncThunk(
  "playlist/updatePlaylist",
  async (data:any, { rejectWithValue, dispatch }) => {
    try {
      await playlistAPI.updatePlaylist(data)
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
        ...action.payload.track,
      };
    },
  },

});

export const {setPlaylistForPage } = playlistSlice.actions;

export default playlistSlice.reducer;