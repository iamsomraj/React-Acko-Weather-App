import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../state/reducers";

export const useWeatherSelector: TypedUseSelectorHook<RootState> = useSelector;
