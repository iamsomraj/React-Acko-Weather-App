/******PROP TYPES******/
/******START******/

/**
 * Utility Container Props
 */
export interface IUtilContainerProps {
  isHome?: boolean;
}

/**
 * Header Props
 */
export interface IHeaderProps {}

/**
 * Header Link Props
 */
export interface IHeaderLinkProps {
  isPrimary: boolean;
  path: string;
  text: string;
}

/**
 * Header Brand Props
 */
export interface IBrandProps {
  homePage: string;
  brandName: string;
}

/**
 * Hero Props
 */
export interface IHeroProps {}

/**
 * Fun Element Props
 */
export interface IFunElementProps {
  position: string;
  translate: string;
}

/**
 * Forecast Section Props
 */
export interface IForecastSectionProps {
  isUserDenied: boolean | undefined;
  forecastData: IWeatherState;
}

/******END******/
/******PROP TYPES******/

/******OTHER TYPES******/
/******START******/

/**
 * Weather List Item Response
 */
/**
 * Weather List Item Response
 */
export interface IWeatherListItemResponse {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain: {
    "3h": number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

/**
 * Weather Response
 */
export interface IWeatherResponse {
  cod: string;
  message: number;
  cnt: number;
  list: IWeatherListItemResponse[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}
/**
 * Weather Reducer State
 */
export interface IWeatherState {
  loading: boolean;
  data: IWeatherResponse | null;
  error: string | null;
}

/******END******/
/******OTHER TYPES******/
