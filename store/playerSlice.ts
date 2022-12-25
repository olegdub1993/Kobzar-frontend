
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { ITrack } from '../types/track'
// Type for our state
export interface PlayerState {
  allPlaylists: any[]
  activePlaylist: ITrack[]
  activePlaylistId: string
  active: ITrack | null
  volume: number
  duration: number
  currentTime: number
  disabled: boolean
  pause: boolean
  taken: boolean
  repeat: boolean
  prevVolume: number
  prevPlaylist: null | ITrack[]
  isShuffle: boolean
  activeTrackIndex: number
  prevActiveTrackIndex: number
}
// Initial state
const initialState: PlayerState = {
  active: null,
  activePlaylistId: "",
  allPlaylists: [],
  activePlaylist: [],
  volume: 50,
  duration: 0,
  currentTime: 0,
  pause: true,
  taken: false,
  disabled: false,
  repeat: false,
  prevVolume: 0,
  prevPlaylist: null,
  isShuffle: false,
  activeTrackIndex: 0,
  prevActiveTrackIndex: 0
};

// Actual Slice
export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    // Action to set the authentication status
    setPause(state) {
      state.pause = true
    },
    setPlay(state) {
      state.pause = false
    },
    setVolume(state, action) {
      state.volume = action.payload
    },
    setPrevVolume(state, action) {
      state.prevVolume = action.payload
    },
    setCurrentTime(state, action) {
      state.currentTime = action.payload
    },
    setDuration(state, action) {
      state.duration = action.payload
    },
    setActiveTrack(state, action) {
      state.active = action.payload
    },
    setActivePlaylist(state, action) {
      state.activePlaylist = action.payload
    },
    setPrevPlaylist(state, action) {
      state.prevPlaylist = action.payload
    },
    setTaken(state) {
      state.taken = true
    },
    setFree(state) {
      state.taken = false
    },
    setDisabled(state, action) {
      state.disabled = action.payload
    },

    setRepeat(state, action) {
      state.repeat = action.payload
    },
    setIsShuffle(state, action) {
      state.isShuffle = action.payload
    },
    setActiveTrackIndex(state, action) {
      state.activeTrackIndex = action.payload
    },
    setActivePlaylistId(state, action) {
      state.activePlaylistId = action.payload
    },
    setPrevActiveTrackIndex(state, action) {
      state.prevActiveTrackIndex = action.payload
    },
    // setAllPlaylists(state, action) {
    //   state.allPlaylists = [...state.allPlaylists, ...action.payload]
    // },
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    // [HYDRATE]: (state: PlayerState, action: any) => {
    //   return {
    //     ...state,
    //     ...action.payload.player,
    //   };
    // }, 
  },
});

export const { setActivePlaylist, setPrevActiveTrackIndex, setActiveTrackIndex, setActivePlaylistId, setIsShuffle, setRepeat, setPrevVolume, setPrevPlaylist, setDisabled, setFree, setTaken, setPause, setPlay, setVolume, setCurrentTime, setDuration, setActiveTrack } = playerSlice.actions;

// export const selectPauseState = (state: AppState) => state.player.pause;

export default playerSlice.reducer;