export const weatherAPIConfig = {
  URI:
    import.meta.env.VITE_WEATHER_API_URL ||
    'https://api.openweathermap.org/data/2.5/forecast',
  params: {
    appid: import.meta.env.VITE_OPENWEATHER_API_KEY || '',
    units: import.meta.env.VITE_WEATHER_API_UNITS || 'metric',
  },
}

// Validate required environment variables
if (!import.meta.env.VITE_OPENWEATHER_API_KEY) {
  console.error(
    '⚠️  VITE_OPENWEATHER_API_KEY is not defined in environment variables. ' +
      'Please create a .env file and add your OpenWeatherMap API key.'
  )
}
