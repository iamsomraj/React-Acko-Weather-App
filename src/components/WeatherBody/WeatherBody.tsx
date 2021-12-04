/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { INITIAL_LAT_AND_LONG_VALUE } from "../../data";
import useWeatherDispatch from "../../hooks/useWeatherDispatch";
import { useWeatherSelector } from "../../hooks/useWeatherSelector";
import ForecastSection from "../ForecastSection/ForecastSection";

const WeatherBody: React.FC = () => {
  const [lat, setLat] = useState(INITIAL_LAT_AND_LONG_VALUE);
  const [long, setLong] = useState(INITIAL_LAT_AND_LONG_VALUE);
  const [isGeoPositionError, setIsGeoPositionError] =
    useState<GeolocationPositionError>();

  const { fetchWeatherByLatAndLong } = useWeatherDispatch();

  const data = useWeatherSelector((state) => state.weather);

  useEffect(() => {
    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
          fetchWeatherByLatAndLong(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          setIsGeoPositionError(error);
          console.log("WeatherBody: Error is ", error);
        }
      );
    };
    fetchLocation();
  }, [fetchWeatherByLatAndLong]);

  if (isGeoPositionError) {
    if (isGeoPositionError.code !== 1) {
      return <div>{isGeoPositionError.message}</div>;
    }
  }

  return (
    <ForecastSection
      forecastData={data}
      isUserDenied={!!isGeoPositionError && isGeoPositionError.code === 1}
    />
  );
};

export default WeatherBody;
