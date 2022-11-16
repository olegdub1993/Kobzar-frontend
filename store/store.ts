import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { playerSlice } from "./playerSlice";
import { trackSlice } from "./trackSlice";
import { createWrapper } from "next-redux-wrapper";
import { userSlice } from './userSlice';
import { authSlice } from "./authSlice";
const makeStore = () =>
  configureStore({
    reducer: {
      [playerSlice.name]: playerSlice.reducer,
      [trackSlice.name]: trackSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [authSlice.name]: authSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);