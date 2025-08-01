import axios from 'axios'
import { Dispatch } from 'redux'
import { weatherAPIConfig } from '@/config/apiConfig'
import { WeatherActionType } from '@/state/action-types'
import { IWeatherAction } from '@/state/actions/weatherActions'

export const fetchWeatherByCity =
  (cityName: string) => async (dispatch: Dispatch<IWeatherAction>) => {
    dispatch({
      type: WeatherActionType.FETCH_WEATHER,
    })
    console.log({ state: WeatherActionType.FETCH_WEATHER })
    try {
      const { data } = await axios.get(weatherAPIConfig.URI, {
        params: { ...weatherAPIConfig.params, q: cityName },
      })
      dispatch({
        type: WeatherActionType.FETCH_WEATHER_SUCCESS,
        payload: data,
      })
      console.log({ state: WeatherActionType.FETCH_WEATHER_SUCCESS, data })
    } catch (error: any) {
      console.log({ state: WeatherActionType.FETCH_WEATHER_ERROR, error })
      dispatch({
        type: WeatherActionType.FETCH_WEATHER_ERROR,
        payload: error?.response?.data?.message || error?.message,
      })
    }
  }

export const fetchWeatherByLatAndLong =
  (lat: number, lon: number) => async (dispatch: Dispatch<IWeatherAction>) => {
    dispatch({
      type: WeatherActionType.FETCH_WEATHER,
    })
    console.log({ state: WeatherActionType.FETCH_WEATHER })
    try {
      const { data } = await axios.get(weatherAPIConfig.URI, {
        params: { ...weatherAPIConfig.params, lat, lon },
      })
      dispatch({
        type: WeatherActionType.FETCH_WEATHER_SUCCESS,
        payload: data,
      })
      console.log({ state: WeatherActionType.FETCH_WEATHER_SUCCESS, data })
    } catch (error: any) {
      console.log({ state: WeatherActionType.FETCH_WEATHER_ERROR, error })
      dispatch({
        type: WeatherActionType.FETCH_WEATHER_ERROR,
        payload: error?.response?.data?.message || error?.message,
      })
    }
  }

export const initState = () => {
  console.log(WeatherActionType.INIT_STATE)
  return {
    type: WeatherActionType.INIT_STATE,
  }
}
