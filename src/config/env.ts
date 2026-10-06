/**
 * Centralised, typed access to build-time environment variables.
 * Missing values surface as a friendly runtime error from the API client
 * rather than crashing the whole bundle on import.
 */
export const env = {
  openWeatherApiKey: import.meta.env.VITE_OPENWEATHER_API_KEY?.trim() ?? '',
  openWeatherBaseUrl: 'https://api.openweathermap.org',
  siteUrl:
    import.meta.env.VITE_SITE_URL ??
    'https://react-acko-weather-app.vercel.app',
} as const

export const hasApiKey = () => env.openWeatherApiKey.length > 0
