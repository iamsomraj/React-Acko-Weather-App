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
    try {
      const { data } = await axios.get(weatherAPIConfig.URI, {
        params: { ...weatherAPIConfig.params, q: cityName },
      })
      dispatch({
        type: WeatherActionType.FETCH_WEATHER_SUCCESS,
        payload: data,
      })
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : (error as { response?: { data?: { message?: string } } })?.response
              ?.data?.message || 'Unknown error'

      dispatch({
        type: WeatherActionType.FETCH_WEATHER_ERROR,
        payload: errorMessage,
      })
    }
  }

export const fetchWeatherByLatAndLong =
  (lat: number, lon: number) => async (dispatch: Dispatch<IWeatherAction>) => {
    dispatch({
      type: WeatherActionType.FETCH_WEATHER,
    })
    try {
      const { data } = await axios.get(weatherAPIConfig.URI, {
        params: { ...weatherAPIConfig.params, lat, lon },
      })
      dispatch({
        type: WeatherActionType.FETCH_WEATHER_SUCCESS,
        payload: data,
      })
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : (error as { response?: { data?: { message?: string } } })?.response
              ?.data?.message || 'Unknown error'

      dispatch({
        type: WeatherActionType.FETCH_WEATHER_ERROR,
        payload: errorMessage,
      })
    }
  }

export const initState = () => {
  return {
    type: WeatherActionType.INIT_STATE,
  }
}
