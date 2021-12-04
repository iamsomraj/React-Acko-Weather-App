import AboutContainer from "../containers/AboutContainer/AboutContainer";
import HomeContainer from "../containers/HomeContainer/HomeContainer";
import TermsContainer from "../containers/TermsContainer/TermsContainer";
import WeatherContainer from "../containers/WeatherContainer/WeatherContainer";
import { addPath } from "../util";

export const BASE_URL = "React-Acko-Weather-App";

export const INITIAL_LAT_AND_LONG_VALUE = -99999;

const data = {
  brand: {
    path: addPath(""),
    text: "Acko Weather",
    container: HomeContainer,
  },
  navLinks: [
    {
      isPrimary: false,
      path: addPath("about"),
      text: "About",
      container: AboutContainer,
    },
    {
      isPrimary: false,
      path: addPath("terms"),
      text: "Terms",
      container: TermsContainer,
    },
    {
      isPrimary: true,
      path: addPath("check-weather"),
      text: "Weather",
      container: WeatherContainer,
    },
  ],
  hero: {
    mainHeading: {
      first: "Acko",
      last: "Weather",
    },
    subHeading: {
      first: "Get all the weather information.",
      second: "Just one click away.",
    },
    mainAction: {
      path: addPath("check-weather"),
      text: "See Weather",
      container: WeatherContainer,
    },
  },
};

export default data;
