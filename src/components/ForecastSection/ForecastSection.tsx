import { IForecastSectionProps } from "../../types";
import DayTimeSelector from "../DayTimeSelector/DayTimeSelector";

const ForecastSection: React.FC<IForecastSectionProps> = ({
  forecastData,
  isUserDenied,
}) => {
  if (isUserDenied) {
    return (
      <div>Search by city name as user denied permission ( Coming Soon )</div>
    );
  }

  return (
    <div>
      <DayTimeSelector forecast={forecastData} />
    </div>
  );
};

export default ForecastSection;
