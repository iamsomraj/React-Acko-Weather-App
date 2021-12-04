import { IForecastSectionProps } from "../../types";

const ForecastSection: React.FC<IForecastSectionProps> = ({
  forecastData,
  isUserDenied,
}) => {
  if (isUserDenied) {
    return (
      <div>Search by city name as user denied permission ( Coming Soon )</div>
    );
  }

  return <div>{JSON.stringify(forecastData.data)}</div>;
};

export default ForecastSection;
