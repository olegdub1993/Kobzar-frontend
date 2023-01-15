
import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
// import { AppState } from "./store";
// import { HYDRATE } from "next-redux-wrapper";
import { authAPI } from './../API/api';
import { getUserPlaylists, setUser } from "./userSlice";
import { setCookie } from "nookies";
// Type for our state
export interface AuthState {
  isAuth: boolean
  loading:boolean
  error:{name:string}
  restrictPopup:string
  message:string
}

// Initial state
const initialState: AuthState = {
  isAuth: false,
  loading:false,
  error:{name:""},
  restrictPopup:'',
  message:""
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
      setCookie(null, "accessToken", response.data.accessToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/"
      });
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
      setCookie(null, "accessToken", response.data.accessToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/"
      });
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
        dispatch(setError("Повинен бути і-мейл"))
      }
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (data:any, { rejectWithValue, dispatch }) => {
    try {
      const response = await authAPI.signin(data)
      setCookie(null, "accessToken", response.data.accessToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/"
      });
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
        dispatch(setError("Повинен бути і-мейл"))
      }
    }
  }
);
export const sendPasswordLink = createAsyncThunk(
  "auth/sendPasswordLink",
  async (data:any, { rejectWithValue, dispatch }) => {
    try {
      const response = await authAPI.sendPasswordLink(data)
      dispatch(setMessage(" Посилання для відновлення паролю успішно надіслано на вашу електронну пошту"))
    } catch (error:any) {
      if(typeof(error.response.data.message)==="string"){
        dispatch(setError(error.response.data.message))
      } else{
        dispatch(setError("Повинен бути і-мейл"))
      }
    }
  }
);
export const validateUser = createAsyncThunk(
  "auth/validateUser",
  async (data:any, { rejectWithValue, dispatch }) => {
    try {
      const response = await authAPI.validateUser(data)
    }  catch (error:any) {
      if(typeof(error.response.data.message)==="string"){
        dispatch(setError(error.response.data.message))
      } else{
        dispatch(setError("something else"))
      }
    }
  }
);
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data:any, { rejectWithValue, dispatch }) => {
    dispatch(setLoading(true))
    try {
      const response = await authAPI.changePassword(data)
      dispatch(login(response.data))
    } catch (error:any) {     
      dispatch(setError(error.response.data.message))
    }finally{
      dispatch(setLoading(false))
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
    setMessage(state, action){
      state.message=action.payload
    },
    setError(state, action) {
      state.error ={name:action.payload}
    },
    setRestrictPopup(state, action) {
      state.restrictPopup = action.payload
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

export const { setAuth, setMessage, setLoading, setError, setRestrictPopup} = authSlice.actions;

export default authSlice.reducer;