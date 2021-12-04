import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchWeatherByLatAndLong,
  initState,
} from "../state/action-creators/weatherActionCreators";

const useWeatherDispatch = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ fetchWeatherByLatAndLong, initState }, dispatch);
};

export default useWeatherDispatch;
