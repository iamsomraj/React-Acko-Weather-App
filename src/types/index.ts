/****** TYPES******/
/******START******/

import { ReactNode } from 'react'

/**
 * Utility Container Props
 */
export interface IUtilContainerProps {
  isHome?: boolean
  children: ReactNode
}

/**
 * Header Props
 */
export interface IHeaderProps {}

/**
 * Header Link Props
 */
export interface IHeaderLinkProps {
  isPrimary: boolean
  path: string
  text: string
  isMobile?: boolean
  onClick?: () => void
}

/**
 * Brand Props
 */
export interface IBrandProps {
  homePage: string
  brandName: string
}

/**
 * Hero Props
 */
export interface IHeroProps {}

/**
 * Fun Element Props
 */
export interface IFunElementProps {
  position: string
  translate: string
}

/**
 * Forecast Section Props
 */
export interface IForecastSectionProps {
  isUserDenied: boolean | undefined
  forecastData: IWeatherState
}

/**
 * Day Picker Props
 */
export interface IDayPickerProps {
  forecast: IWeatherState
}

/**
 * Table Props
 */
export interface ITableProps {
  forecast: IWeatherState
  selected: string
}

/**
 * Table Row Props
 */
export interface ITableHeaderProps {
  rows: string[]
}

/**
 * Table Body Row Props
 */
export interface ITableBodyProps {
  row: {
    Time: string
    Temperature: number
    RealFeel: number
    Description: string
    Visibility: number
    Humidity: number
    Pressure: number
    WindSpeed: number
    CloudCover: number
  }[]
}

/**
 * Form Props
 */
export interface IFormProps {
  term: string
  onChange: (value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  state: { loading: boolean; error: string | null }
  onClear: () => void
}

/**
 * Spinner Props
 */
export interface ISpinnerProps {
  text?: string
}

/**
 * Temp Indicator Props
 */
export interface ITemperatureIndicatorProps {
  val: string | number
  index: number
}

/**
 * Action Button Props
 */
export interface IActionButtonProps {
  path: string
  body: string
}

/******END******/
/******PROP TYPES******/

/*************************************************************** */
/*************************************************************** */
/*************************************************************** */

/******OTHER TYPES******/
/******START******/

/**
 * Weather List Item Response
 */
export interface IWeatherListItemResponse {
  dt: number
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    sea_level: number
    grnd_level: number
    humidity: number
    temp_kf: number
  }
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    },
  ]
  clouds: {
    all: number
  }
  wind: {
    speed: number
    deg: number
    gust: number
  }
  visibility: number
  pop: number
  rain: {
    '3h': number
  }
  sys: {
    pod: string
  }
  dt_txt: string
}

/**
 * Weather Response
 */
export interface IWeatherResponse {
  cod: string
  message: number
  cnt: number
  list: IWeatherListItemResponse[]
  city: {
    id: number
    name: string
    coord: {
      lat: number
      lon: number
    }
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
  }
}
/**
 * Weather Reducer State
 */
export interface IWeatherState {
  loading: boolean
  data: IWeatherResponse | null
  error: string | null
}

/******END******/
/******OTHER TYPES******/
