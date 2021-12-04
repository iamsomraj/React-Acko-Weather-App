import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchWeatherByLatAndLong,
  initState,
  fetchWeather,
} from "../state/action-creators/weatherActionCreators";

const useWeatherDispatch = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    { fetchWeatherByLatAndLong, fetchWeather, initState },
    dispatch
  );
};

export default useWeatherDispatch;
