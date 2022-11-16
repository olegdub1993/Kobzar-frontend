
import { createSlice, createAsyncThunk, Action } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { ITrack } from '../types/track'
import axios from "axios";
import { IUser } from '../types/user';
import { authAPI, userAPI } from './../API/api';
import { setUser } from "./userSlice";

// Type for our state
export interface AuthState {
  auth: boolean
}

// Initial state
const initialState: AuthState = {
  auth: false
};
export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await authAPI.signin(data)
      dispatch(setAuth(true))
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      const responseWithUserData = await userAPI.getUserData();
      console.log(responseWithUserData.data)
      dispatch(setUser(responseWithUserData.data));
      // dispatch(setSignInError(""));
      // dispatch(setIsSignin(true));
    } catch (error) {
      console.log(error)
      // dispatch(setError("Some Server erroor"))
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    // Action to set the authentication status
    setAuth(state, action) {
      state.auth = action.payload
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
        ...action.payload.auth,
      };
    },
  },

});

export const { setAuth, } = authSlice.actions;

export default authSlice.reducer;