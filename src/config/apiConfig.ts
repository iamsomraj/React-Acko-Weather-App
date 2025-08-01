export const weatherAPIConfig = {
  URI:
    import.meta.env.VITE_WEATHER_API_URL ||
    'https://api.openweathermap.org/data/2.5/forecast',
  params: {
    appid: (() => {
      if (!import.meta.env.VITE_OPENWEATHER_API_KEY) {
        throw new Error(
          '❌ VITE_OPENWEATHER_API_KEY is not defined in environment variables. ' +
          'Please create a .env file and add your OpenWeatherMap API key.'
        );
      }
      return import.meta.env.VITE_OPENWEATHER_API_KEY;
    })(),
    units: import.meta.env.VITE_WEATHER_API_UNITS || 'metric',
  },
}


