import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { IWeatherState, IWeatherResponse } from '@/types'
import axios from 'axios'
import { weatherAPIConfig } from '@/config/apiConfig'

const initialState: IWeatherState = {
  loading: false,
  data: null,
  error: null,
}

// Async thunk for fetching weather data by city name
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
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch weather data'
      )
    }
  }
)

// Async thunk for fetching weather data by coordinates
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
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch weather data'
      )
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
        state.error = action.payload as string
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
        state.error = action.payload as string
      })
  },
})

export const { initState, clearError } = weatherSlice.actions
export default weatherSlice.reducer
