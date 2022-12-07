
import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
// import { AppState } from "./store";
// import { HYDRATE } from "next-redux-wrapper";
import { ITrack } from '../types/track'
import { IUser } from './../types/user';
import { albomAPI, userAPI } from './../API/api';
import { setDisabled } from "./playerSlice";

// Type for our state
export interface UserState {
  user: null | IUser
  liked: ITrack[]
  alboms:null| any[]
  success:string
}

// Initial state
const initialState: UserState = {
  user: null,
  liked:[],
  alboms: null,
  success:"",
};

export const addToLiked = createAsyncThunk(
  "user/addToLiked",
  async (trackId:string, { rejectWithValue, dispatch }) => {
    dispatch(setDisabled(true))
    try {
      await userAPI.addToLiked(trackId)
      dispatch(setSuccess('Додано до пісень, що сподобались'))
      dispatch(addToLikedId(trackId))
    } catch (error) {
      // dispatch(setError("Some Server erroor"))
    }finally{
      dispatch(setDisabled(false))
    }
  }
);
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      await userAPI.updateProfile(data)
      dispatch(setSuccess('Ваш профіль успішно відредаговано'))
    } catch (error) {
      // dispatch(setError("Some Server erroor"))
    }finally{
      // dispatch(setDisabled(false))
    }
  }
);
export const addTrackToAlbom= createAsyncThunk(
  "user/addTrackToAlbom",
  async (data:any, { rejectWithValue, dispatch }) => {
    try {
      await albomAPI.addTrackToAlbom(data)
      dispatch(setSuccess('Додано до плейліста'))
      // dispatch(addToLikedId(track._id))
    } catch (error) {
      // dispatch(setError("Some Server erroor"))
    }finally{
      // dispatch(setDisabled(false))
    }
  }
);
export const removeFromLiked = createAsyncThunk(
  "user/removeFromLiked",
  async (trackId:string, { rejectWithValue, dispatch }) => {
    try {
      await userAPI.removeFromLiked(trackId)
      dispatch(setSuccess('Видалено з пісень, що сподобались'))
      dispatch(removeLikedId(trackId))
    } catch (error) {
      // dispatch(setError("Some Server erroor"))
    }
  }
);
export const createPlaylist = createAsyncThunk(
  "user/createPlaylist",
  async (data:any, { rejectWithValue, dispatch }) => {
    try {
      await albomAPI.createAlbom(data)
      dispatch(setSuccess('Плейлист успішно створено!'))
    } catch (error) {
      // dispatch(setError("Some Server erroor"))
    }
  }
);
export const getLiked = createAsyncThunk(
  "user/getLiked",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await userAPI.getLiked()
      dispatch(setLiked(response.data))
    } catch (error) {
      // dispatch(setError("Some Server erroor"))
    }
  }
);
export const getUserAlboms = createAsyncThunk(
  "user/getUserAlboms",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await userAPI.getAlboms()
      dispatch(setAlboms(response.data))
    } catch (error) {
      // dispatch(setError("Some Server erroor"))
    }
  }
);
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await userAPI.getUserData()
      dispatch(setUser(response.data))
      // dispatch(getUserAlboms())
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
    setLiked(state, action) {
      state.liked = action.payload
    },
    addToLikedId(state, action) {
      console.log(action.payload)
      if(state.user){
      state.user = {...state.user, liked:[...state.user.liked, action.payload]}
      }
    },
    removeLikedId(state, action) {
      if(state.user){
      state.user = {...state.user, liked:state.user.liked.filter((id)=>id!==action.payload)}
      }
    },
    setAlboms(state, action) {
      state.alboms = action.payload
    },
    setSuccess(state, action) {
      console.log("ddd",action.payload)
      state.success = action.payload
    },
    // setError(state, action) {
    //   state.error = action.payload
    // },
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload.user,
  //     };
  //   },
  // },

});

export const { setUser,setLiked, setSuccess, setAlboms, addToLikedId, removeLikedId} = userSlice.actions;

export default userSlice.reducer;