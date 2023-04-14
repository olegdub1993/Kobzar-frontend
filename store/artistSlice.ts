
import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
// import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { IArtist } from '../types/artist';
import axios from "axios";

// Type for our state
export interface ArtistState {
  artist:IArtist
}

// Initial state
const initialState: ArtistState = {
  artist:{} as IArtist
};

export const fetchArtistProfile = createAsyncThunk(
  "users/fetchArtistProfile",
  async (id:string, { rejectWithValue, dispatch }) => {
    try {
      const response = await  axios.get(process.env.NEXT_PUBLIC_BASIC_URL+"artists/"+id)
      // no locale storage
      // const response = await userAPI.getUserProfile(id)
      dispatch(setArtist(response.data))
      // dispatch(getUserAlboms())
    } catch (error) {
      // dispatch(setError("Some Server erroor"))
    }
  }
);

export const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {
    setArtist(state, action) {
      state.artist = action.payload
    },
  },
 // Special reducer for hydrating the state. Special case for next-redux-wrapper
  // could be errors, because was commented before
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.artist,
      };
    },
  },

});

export const {setArtist} = artistSlice.actions;

export default artistSlice.reducer;