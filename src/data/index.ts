import AboutContainer from '@/containers/AboutContainer/AboutContainer'
import HomeContainer from '@/containers/HomeContainer/HomeContainer'
import TermsContainer from '@/containers/TermsContainer/TermsContainer'
import WeatherContainer from '@/containers/WeatherContainer/WeatherContainer'
import { addPath, BASE_URL } from '@/util'

export { BASE_URL }

export const INITIAL_LAT_AND_LONG_VALUE = -99999

const data = {
  brand: {
    path: addPath(''),
    text: 'WeatherNow',
    container: HomeContainer,
  },
  navLinks: [
    {
      isPrimary: false,
      path: addPath('about'),
      text: 'About',
      container: AboutContainer,
    },
    {
      isPrimary: false,
      path: addPath('terms'),
      text: 'Privacy',
      container: TermsContainer,
    },
    {
      isPrimary: true,
      path: addPath('check-weather'),
      text: 'Weather Forecast',
      container: WeatherContainer,
    },
  ],
  hero: {
    mainHeading: {
      first: 'Weather',
      last: 'Forecast',
    },
    subHeading: {
      first: 'Get accurate weather information for any location.',
      second: 'Real-time data at your fingertips.',
    },
    mainAction: {
      path: addPath('check-weather'),
      text: 'Check Weather',
      container: WeatherContainer,
    },
  },
}

export default data
