import type {
  OwmAirPollutionResponse,
  OwmCurrentWeatherResponse,
  OwmForecastItem,
  OwmForecastResponse,
  OwmGeocodingResponse,
} from '@/apiTypes'

/** 2026-10-06T00:00:00Z */
export const BASE_EPOCH = 1_791_244_800
/** UTC+5:30 (e.g. Mumbai) to exercise non-hour offsets. */
export const TZ_OFFSET = 19_800

export const makeForecastItem = (
  index: number,
  overrides: Partial<OwmForecastItem> = {}
): OwmForecastItem => {
  const dt = BASE_EPOCH + index * 3 * 3600
  return {
    dt,
    main: {
      temp: 20 + index,
      feels_like: 19 + index,
      temp_min: 20 + index,
      temp_max: 20 + index,
      pressure: 1012,
      humidity: 60,
    },
    weather: [
      { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
    ],
    clouds: { all: 0 },
    wind: { speed: 4, deg: 90, gust: 6 },
    visibility: 10_000,
    pop: 0,
    sys: { pod: 'd' },
    dt_txt: new Date(dt * 1000).toISOString().replace('T', ' ').slice(0, 19),
    ...overrides,
  }
}

export const forecastResponse = (
  items: OwmForecastItem[] = Array.from({ length: 16 }, (_, index) =>
    makeForecastItem(index)
  )
): OwmForecastResponse => ({
  cod: '200',
  message: 0,
  cnt: items.length,
  list: items,
  city: {
    id: 1275339,
    name: 'Mumbai',
    coord: { lat: 19.0761, lon: 72.8775 },
    country: 'IN',
    timezone: TZ_OFFSET,
    sunrise: BASE_EPOCH + 3600,
    sunset: BASE_EPOCH + 13 * 3600,
  },
})

export const currentWeatherResponse: OwmCurrentWeatherResponse = {
  coord: { lat: 19.0761, lon: 72.8775 },
  weather: [
    { id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03n' },
  ],
  base: 'stations',
  main: {
    temp: 28.4,
    feels_like: 32.1,
    temp_min: 27,
    temp_max: 29,
    pressure: 1009,
    humidity: 78,
  },
  visibility: 6000,
  wind: { speed: 5.1, deg: 250 },
  clouds: { all: 40 },
  rain: { '1h': 0.4 },
  dt: BASE_EPOCH,
  sys: {
    country: 'IN',
    sunrise: BASE_EPOCH + 3600,
    sunset: BASE_EPOCH + 13 * 3600,
  },
  timezone: TZ_OFFSET,
  id: 1275339,
  name: 'Mumbai',
  cod: 200,
}

export const airPollutionResponse: OwmAirPollutionResponse = {
  coord: { lat: 19.0761, lon: 72.8775 },
  list: [
    {
      dt: BASE_EPOCH,
      main: { aqi: 3 },
      components: {
        co: 400.5,
        no: 0.1,
        no2: 12.3,
        o3: 60.2,
        so2: 4.4,
        pm2_5: 35.6,
        pm10: 48.9,
        nh3: 3.1,
      },
    },
  ],
}

export const geocodingResponse: OwmGeocodingResponse = [
  {
    name: 'London',
    local_names: { en: 'London' },
    lat: 51.50735,
    lon: -0.12776,
    country: 'GB',
    state: 'England',
  },
  {
    name: 'London',
    lat: 51.50736,
    lon: -0.12777,
    country: 'GB',
    state: 'England',
  },
  {
    name: 'London',
    lat: 42.98339,
    lon: -81.23304,
    country: 'CA',
    state: 'Ontario',
  },
]
