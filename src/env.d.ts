/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  readonly VITE_OPENWEATHER_API_KEY: string
  readonly VITE_WEATHER_API_URL: string
  readonly VITE_WEATHER_API_UNITS: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv
}
