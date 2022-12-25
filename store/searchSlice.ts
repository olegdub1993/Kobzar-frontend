
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ITrack, } from '../types/track'
import { tracksAPI, playlistAPI } from "../API/api";
import { IPlaylist } from "../types/playlist";
import { IUser } from './../types/user';

export type SearchData = {
  tracks: ITrack[],
  playlists: IPlaylist[]
  users: IUser[]
}

// Type for our state
export interface SearchState {
  noContent: boolean,
  searchedData: SearchData | null,
  error: string,
}

// Initial state
const initialState: SearchState = {
  searchedData: null,
  noContent: false,
  error: "",
};

export const searchContent = createAsyncThunk(
  "search/searchContent",
  async (queryData: any, { rejectWithValue, dispatch }) => {
    try {
      const response = await tracksAPI.getSearchedTracks(queryData)
      if (response.data.length == 0 || (response.data.tracks?.length == 0 && response.data.playlists?.length == 0 && response.data.users?.length == 0)) {
        dispatch(setNoContent(true))
      } else {
        dispatch(setNoContent(false))
      }
      dispatch(setSearchedData(response.data))
    } catch (error) {
      dispatch(setError("Some Server erroor"))
    }
  }
);


export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {

    // Action to set the authentication status
    setSearchedData(state, action) {
      state.searchedData = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    },
    setNoContent(state, action) {
      state.noContent = action.payload
    },

  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.search,
      };
    },
  },

});

export const { setError, setNoContent, setSearchedData, } = searchSlice.actions;

export default searchSlice.reducer;