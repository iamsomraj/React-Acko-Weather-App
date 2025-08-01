import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { IWeatherState, IWeatherResponse } from '@/types'
import axios from 'axios'
import { weatherAPIConfig } from '@/config/apiConfig'

const initialState: IWeatherState = {
  loading: false,
  data: null,
  error: null,
}

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (city: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(weatherAPIConfig.URI, {
        params: {
          ...weatherAPIConfig.params,
          q: city,
        },
      })
      return response.data as IWeatherResponse
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : (error as { response?: { data?: { message?: string } } })?.response
              ?.data?.message || 'Failed to fetch weather data'

      return rejectWithValue(errorMessage)
    }
  }
)

export const fetchWeatherDataByCoords = createAsyncThunk(
  'weather/fetchWeatherDataByCoords',
  async (coords: { lat: number; lng: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(weatherAPIConfig.URI, {
        params: {
          ...weatherAPIConfig.params,
          lat: coords.lat,
          lon: coords.lng,
        },
      })
      return response.data as IWeatherResponse
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : (error as { response?: { data?: { message?: string } } })?.response
              ?.data?.message || 'Failed to fetch weather data'

      return rejectWithValue(errorMessage)
    }
  }
)

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    initState: (state) => {
      state.loading = false
      state.data = null
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchWeatherData.fulfilled,
        (state, action: PayloadAction<IWeatherResponse>) => {
          state.loading = false
          state.data = action.payload
          state.error = null
        }
      )
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.error = action.payload
          ? String(action.payload)
          : 'Failed to fetch weather data'
      })
      .addCase(fetchWeatherDataByCoords.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchWeatherDataByCoords.fulfilled,
        (state, action: PayloadAction<IWeatherResponse>) => {
          state.loading = false
          state.data = action.payload
          state.error = null
        }
      )
      .addCase(fetchWeatherDataByCoords.rejected, (state, action) => {
        state.loading = false
        state.data = null
        state.error = action.payload
          ? String(action.payload)
          : 'Failed to fetch weather data'
      })
  },
})

export const { initState, clearError } = weatherSlice.actions
export default weatherSlice.reducer
