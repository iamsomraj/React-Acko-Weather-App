import axios from "axios";
import { Dispatch } from "redux";
import { weatherAPIConfig } from "../../config/apiConfig";
import { WeatherActionType } from "../action-types";
import { IWeatherAction } from "../reducers/weatherReducer";

export const fetchWeather =
  (term: string) => async (dispatch: Dispatch<IWeatherAction>) => {
    dispatch({
      type: WeatherActionType.FETCH_WEATHER,
    });
    console.log({ state: WeatherActionType.FETCH_WEATHER });
    try {
      const { data } = await axios.get(weatherAPIConfig.URI, {
        params: { ...weatherAPIConfig.params, q: term },
      });
      dispatch({
        type: WeatherActionType.FETCH_WEATHER_SUCCESS,
        payload: data,
      });
      console.log({ state: WeatherActionType.FETCH_WEATHER_SUCCESS, data });
    } catch (error: any) {
      dispatch({
        type: WeatherActionType.FETCH_WEATHER_ERROR,
        payload: error.response.data.message,
      });
      console.log({ state: WeatherActionType.FETCH_WEATHER_ERROR, error });
    }
  };

export const fetchWeatherByLatAndLong =
  (lat: number, lon: number) => async (dispatch: Dispatch<IWeatherAction>) => {
    dispatch({
      type: WeatherActionType.FETCH_WEATHER,
    });
    console.log({ state: WeatherActionType.FETCH_WEATHER });
    try {
      const { data } = await axios.get(weatherAPIConfig.URI, {
        params: { ...weatherAPIConfig.params, lat, lon },
      });
      dispatch({
        type: WeatherActionType.FETCH_WEATHER_SUCCESS,
        payload: data,
      });
      console.log({ state: WeatherActionType.FETCH_WEATHER_SUCCESS, data });
    } catch (error: any) {
      dispatch({
        type: WeatherActionType.FETCH_WEATHER_ERROR,
        payload: error.response.data.message,
      });
      console.log({ state: WeatherActionType.FETCH_WEATHER_ERROR, error });
    }
  };

export const initState = () => {
  console.log(WeatherActionType.INIT_STATE);
  return {
    type: WeatherActionType.INIT_STATE,
  };
};
