import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store/reducers";

// to avoid useSelector type error
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
