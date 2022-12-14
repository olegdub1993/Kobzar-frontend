
import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
// import { AppState } from "./store";
// import { HYDRATE } from "next-redux-wrapper";
import { authAPI } from './../API/api';
import { getUserPlaylists, setUser } from "./userSlice";

// Type for our state
export interface AuthState {
  isAuth: boolean
  loading:boolean
  error:{name:string}
}

// Initial state
const initialState: AuthState = {
  isAuth: false,
  loading:false,
  error:{name:""}
};
export const logout= createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await authAPI.logout()
      dispatch(setAuth(false))
      localStorage.removeItem("token");
      dispatch(setUser(null));
      dispatch(getUserPlaylists())
      // const responseWithUserData = await userAPI.getUserData();
      // console.log(responseWithUserData.data)
      // dispatch(setUser(responseWithUserData.data));
      // dispatch(setSignInError(""));
      // dispatch(setIsSignin(true));
    } catch (error) {
      console.log(error)
      // dispatch(setError("Some Server erroor"))
    }
  }
);
export const checkAuth= createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue, dispatch }) => {
    dispatch(setLoading(true))
    try {
      const response = await authAPI.checkAuth()
      dispatch(setAuth(true))
      localStorage.setItem("token", response.data.accessToken);
      console.log(response.data.user)
      dispatch(setUser(response.data.user));
      // const responseWithUserData = await userAPI.getUserData();
      // console.log(responseWithUserData.data)
      // dispatch(setUser(responseWithUserData.data));
      // dispatch(setSignInError(""));
      // dispatch(setIsSignin(true));
    } catch (error) {
    
      
    }finally{
      dispatch(setLoading(false))
    }
  }
);
export const signup = createAsyncThunk(
  "auth/signup",
  async (data:any, { rejectWithValue, dispatch }) => {
    try {
      const response = await authAPI.signup(data)
      dispatch(setAuth(true))
      localStorage.setItem("token", response.data.accessToken);
      console.log(response.data.user)
      dispatch(setUser(response.data.user));
      // const responseWithUserData = await userAPI.getUserData();
      // console.log(responseWithUserData.data)
      // dispatch(setUser(responseWithUserData.data));
      // dispatch(setSignInError(""));
      // dispatch(setIsSignin(true));
    } catch (error:any) {
      if(typeof(error.response.data.message)==="string"){
        dispatch(setError(error.response.data.message))
      } else{
        dispatch(setError(error.response.data.message[0]))
      }
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (data:any, { rejectWithValue, dispatch }) => {
    try {
      const response = await authAPI.signin(data)
      dispatch(setAuth(true))
      localStorage.setItem("token", response.data.accessToken);
      console.log(response.data.user)
      dispatch(setUser(response.data.user));
      // const responseWithUserData = await userAPI.getUserData();
      // console.log(responseWithUserData.data)
      // dispatch(setUser(responseWithUserData.data));
      // dispatch(setSignInError(""));
      // dispatch(setIsSignin(true));
    } catch (error:any) {
      if(typeof(error.response.data.message)==="string"){
        dispatch(setError(error.response.data.message))
      } else{
        dispatch(setError(error.response.data.message[0]))
      }
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    // Action to set the authentication status
    setAuth(state, action) {
      state.isAuth = action.payload
    },
    setLoading(state, action){
      state.loading=action.payload
    },
    setError(state, action) {
      console.log(action.payload)
      state.error ={name:action.payload}
    },
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload.auth,
  //     };
  //   },
  // },

});

export const { setAuth, setLoading, setError} = authSlice.actions;

export default authSlice.reducer;