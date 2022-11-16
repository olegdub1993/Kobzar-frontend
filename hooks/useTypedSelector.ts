import { AppState } from "../store/store";
import { useSelector,TypedUseSelectorHook } from 'react-redux';


export const useTypedSelector:TypedUseSelectorHook<AppState>=useSelector