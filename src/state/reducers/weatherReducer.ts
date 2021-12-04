import { IWeatherState } from "../../types";
import { WeatherActionType } from "../action-types";
import {
  IFetchWeatherAction,
  IFetchWeatherErrorAction,
  IFetchWeatherSuccessAction,
  IInitStateAction
} from "../actions/weatherActions";

export type IWeatherAction =
  | IFetchWeatherAction
  | IInitStateAction
  | IFetchWeatherSuccessAction
  | IFetchWeatherErrorAction;

const initialState: IWeatherState = {
  loading: false,
  data: null,
  error: null,
};

const weatherReducer = (
  state: IWeatherState = initialState,
  action: IWeatherAction
): IWeatherState => {
  const { type } = action;
  switch (type) {
    case WeatherActionType.FETCH_WEATHER:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case WeatherActionType.FETCH_WEATHER_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case WeatherActionType.FETCH_WEATHER_ERROR:
      return {
        loading: false,
        data: null,
        error: action.payload,
      };
    case WeatherActionType.INIT_STATE:
      return initialState;
    default:
      return state;
  }
};

export default weatherReducer;
