
import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
// import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { ITrack } from '../types/track'
import { IUser } from './../types/user';
import { playlistAPI, userAPI } from './../API/api';
import { setDisabled } from "./playerSlice";
import { fetchPlaylist } from "./playlistSlice";
import { IPlaylist } from './../types/playlist';
import axios from "axios";
import { setLoading } from "./authSlice";

// Type for our state
export interface UserState {
  user: null | any
  // likedPlaylists: IPlaylist[]
  liked: any[]
  alboms: null | any[]
  success: string
  userForPage: IUser
}

// Initial state
const initialState: UserState = {
  user: null,
  liked: [],
  // likedPlaylists:[],
  alboms: null,
  success: "",
  userForPage: {} as IUser
};

export const createSubscription = createAsyncThunk(
  "user/createSubscription",
  async (id: string, { rejectWithValue, dispatch }) => {
    dispatch(setDisabled(true))
    try {
      const response = await userAPI.createSubscription(id);
      dispatch(addToSubscriptionsId(response.data));
      dispatch(setSuccess('Ви успішно підписались'))
    } catch (error) {
      // dispatch(setError("Some Server erroor"))
    } finally {
      dispatch(setDisabled(false))
    }
  }
);
export const deleteSubscription = createAsyncThunk(
  "user/deleteSubscription",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await userAPI.deleteSubscription(id)
      dispatch(removeFromSubscriptionsId(response.data))
      dispatch(setSuccess('Ви успішно відписались'))
    } catch (error) {
      // dispatch(setError("Some Server erroor"))
    }
  }
);
export const addToLiked = createAsyncThunk(
  "user/addToLiked",
  async (data: any, { rejectWithValue, dispatch }) => {
    dispatch(setDisabled(true))
    try {
      const response = await userAPI.addToLiked(data);
      if (data.type === "track") {
        dispatch(addToLikedTracksId(response.data));
        dispatch(setSuccess('Додано до пісень, що сподобались'))
      }
      else {
        dispatch(setSuccess('Додано до сподобаних плейлистів'));
        dispatch(addToLikedPlaylistsId(response.data))
      }
    } catch (error) {
      // dispatch(setError("Some Server erroor"))
    } finally {
      dispatch(setDisabled(false))
    }
  }
);
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      await userAPI.updateProfile(data)
      dispatch(setSuccess('Ваш профіль успішно відредаговано'))
    } catch (error) {
      // dispatch(setError("Some Server erroor"))
    } finally {
      // dispatch(setDisabled(false))
    }
  }
);
export const addTrackToAlbom = createAsyncThunk(
  "user/addTrackToAlbom",
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      await playlistAPI.addTrackToPlaylist(data)
      dispatch(getUserPlaylists())
      dispatch(setSuccess('Додано до плейліста'))
    } catch (error) {
      // dispatch(setError("Some Server erroor"))
    } finally {
      // dispatch(setDisabled(false))
    }
  }
);
export const removeTrackFromPlaylist = createAsyncThunk(
  "user/removeTrackFromPlaylist",
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      await playlistAPI.removeTrackFromPlaylist(data)
      dispatch(setSuccess('Видалено до плейліста'))
      dispatch(fetchPlaylist(data.playlistId))
      // dispatch(addToLikedId(track._id))
    } catch (error) {
      // dispatch(setError("Some Server erroor"))
    } finally {
      // dispatch(setDisabled(false))
    }
  }
);

export const removeFromLiked = createAsyncThunk(
  "user/removeFromLiked",
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      const response = await userAPI.removeFromLiked(data)
      if (data.type === "track") {
        dispatch(setSuccess('Видалено з пісень, що сподобались'))
        dispatch(removeLikedId(response.data))
      }
      else {
        dispatch(setSuccess('Видалено із сподобаних плейлистів'));
        dispatch(removeLikedPlaylistsId(response.data))
      }

    } catch (error) {
      // dispatch(setError("Some Server erroor"))
    }
  }
);
export const createPlaylist = createAsyncThunk(
  "user/createPlaylist",
  async (data: any, { rejectWithValue, dispatch }) => {
    dispatch(setLoading(true))
    try {
      const response = await playlistAPI.createPlaylist(data)
      dispatch(setSuccess('Плейлист успішно створено!'))
      return response.data
    } catch (error) {
      // dispatch(setError("Some Server erroor"))
    }finally{
      dispatch(setLoading(false))
    }
  }
);
export const getLiked = createAsyncThunk(
  "user/getLiked",
  async (type: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await userAPI.getLiked(type)
      dispatch(setLiked(response.data))
    } catch (error) {
      // dispatch(setError("Some Server erroor"))
    }
  }
);
export const getUserPlaylists = createAsyncThunk(
  "user/getUserPlaylists",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await userAPI.getUserPlaylists()
      dispatch(setAlboms(response.data))
    } catch (error) {
      dispatch(setAlboms(null))
      // dispatch(setError("Some Server erroor"))
    }
  }
);
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (token, { rejectWithValue, dispatch }) => {
    try {
      // const response = await userAPI.getUserData(token)
      // console.log("dere", response.data)
      // dispatch(setUser(response.data))
      // dispatch(getUserAlboms())
    } catch (error) {
      // dispatch(setError("Some Server erroor"))
    }
  }
);
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_BASIC_URL + "users/" + id)
      // no locale storage
      // const response = await userAPI.getUserProfile(id)
      dispatch(setUserForPage(response.data))
      // dispatch(getUserAlboms())
    } catch (error) {
      // dispatch(setError("Some Server erroor"))
    }
  }
);
export const removePlaylist = createAsyncThunk(
  "user/removePlaylist",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await playlistAPI.removePlaylist(id)
      dispatch(setSuccess('Плейлист успішно видалено!'))
      // dispatch(setUser(response.data))
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
    setUserForPage(state, action) {
      state.userForPage = action.payload
    },
    setLiked(state, action) {
      state.liked = action.payload
    },
    // setLikedPlaylists(state, action) {
    //   state.likedPlaylists = action.payload
    // },
    addToSubscriptionsId(state, action) {
      if (state.user) {
        state.user = { ...state.user, subscriptions: [...state.user.subscriptions, action.payload] }
      }
    },
    removeFromSubscriptionsId(state, action) {
      if (state.user) {
        state.user = { ...state.user, subscriptions: state.user.subscriptions.filter((id:string) => id !== action.payload) }
      }
    },
    addToLikedTracksId(state, action) {
      if (state.user) {
        state.user = { ...state.user, liked: [...state.user.liked, action.payload] }
      }
    },
    addToLikedPlaylistsId(state, action) {
      if (state.user) {
        state.user = { ...state.user, likedPlaylists: [...state.user.likedPlaylists, action.payload] }
      }
    },
    removeLikedId(state, action) {
      if (state.user) {
        state.user = { ...state.user, liked: state.user.liked.filter((id:string) => id !== action.payload) }
      }
    },
    removeLikedPlaylistsId(state, action) {
      if (state.user) {
        state.user = { ...state.user, likedPlaylists: state.user.likedPlaylists.filter((id:string) => id !== action.payload) }
      }
    },
    setAlboms(state, action) {
      state.alboms = action.payload
    },
    setSuccess(state, action) {
      console.log("ddd", action.payload)
      state.success = action.payload
    },
    // setError(state, action) {
    //   state.error = action.payload
    // },
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  // could be errors, because was commented before
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload.user,
  //     };
  //   },
  // },

});

export const { setUser, removeFromSubscriptionsId, addToSubscriptionsId, setUserForPage, setLiked, setSuccess, setAlboms, addToLikedTracksId, addToLikedPlaylistsId, removeLikedId, removeLikedPlaylistsId } = userSlice.actions;

export default userSlice.reducer;