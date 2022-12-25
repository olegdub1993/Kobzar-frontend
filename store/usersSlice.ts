
import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
// import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { IUser } from '../types/user';
import axios from "axios";

// Type for our state
export interface UserState {
  userForPage:IUser
}

// Initial state
const initialState: UserState = {
  userForPage:{} as IUser
};

export const fetchUserProfile = createAsyncThunk(
  "users/fetchUserProfile",
  async (id:string, { rejectWithValue, dispatch }) => {
    try {
      const response = await  axios.get(process.env.NEXT_PUBLIC_BASIC_URL+"users/"+id)
      console.log(response.data)
      // no locale storage
      // const response = await userAPI.getUserProfile(id)
      dispatch(setUserForPage(response.data))
      // dispatch(getUserAlboms())
    } catch (error) {
      // dispatch(setError("Some Server erroor"))
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserForPage(state, action) {
      state.userForPage = action.payload
    },
  },
 // Special reducer for hydrating the state. Special case for next-redux-wrapper
  // could be errors, because was commented before
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.users,
      };
    },
  },

});

export const {setUserForPage} = usersSlice.actions;

export default usersSlice.reducer;