
import { createSlice, createAsyncThunk, Action } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { ITrack } from '../types/track'
import axios from "axios";
import { IUser } from './../types/user';

// Type for our state
export interface UserState {
  user: null | IUser
}

// Initial state
const initialState: UserState = {
  user: null
};
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get("http://localhost:5000/tracks")
      dispatch(setUser(response.data))
    } catch (error) {
      // dispatch(setError("Some Server erroor"))
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    // Action to set the authentication status
    setUser(state, action) {
      state.user = action.payload
    },
    // setError(state, action) {
    //   state.error = action.payload
    // },
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      };
    },
  },

});

export const { setUser, } = userSlice.actions;

export default userSlice.reducer;