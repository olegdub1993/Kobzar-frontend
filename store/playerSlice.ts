
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { ITrack } from '../types/track'
// Type for our state
export interface PlayerState {
  active: null | ITrack
  volume: number
  duration: number
  currentTime: number
  pause: boolean
  taken: boolean
}
// Initial state
const initialState: PlayerState = {
  active: null,
  volume: 50,
  duration: 0,
  currentTime: 0,
  pause: true,
  taken: false
};

// Actual Slice
export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    // Action to set the authentication status
    setPause(state, action) {
      state.pause = true
    },
    setPlay(state, action) {
      state.pause = false
    },
    setVolume(state, action) {
      state.volume = action.payload
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
    setTaken(state, action) {
      state.taken = true
    },
    setFree(state, action) {
      state.taken = false
    },
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state: PlayerState, action: any) => {
      return {
        ...state,
        ...action.payload.player,
      };
    },
  },
});

export const { setFree, setTaken, setPause, setPlay, setVolume, setCurrentTime, setDuration, setActiveTrack } = playerSlice.actions;

// export const selectPauseState = (state: AppState) => state.player.pause;

export default playerSlice.reducer;