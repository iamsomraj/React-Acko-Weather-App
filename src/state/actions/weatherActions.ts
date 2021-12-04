import { IWeatherResponse } from "../../types";
import { WeatherActionType } from "../action-types";

export interface IFetchWeatherAction {
  type: WeatherActionType.FETCH_WEATHER;
}

export interface IInitStateAction {
  type: WeatherActionType.INIT_STATE;
}

export interface IFetchWeatherSuccessAction {
  type: WeatherActionType.FETCH_WEATHER_SUCCESS;
  payload: IWeatherResponse;
}

export interface IFetchWeatherErrorAction {
  type: WeatherActionType.FETCH_WEATHER_ERROR;
  payload: string;
}
