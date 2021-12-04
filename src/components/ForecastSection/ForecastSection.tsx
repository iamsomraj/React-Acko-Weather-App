import { IForecastSectionProps, IFormProp } from "../../types";
import DayPicker from "../DayPicker/DayPicker";
import Form from "../Form/Form";
import Spinner from "../Spinner/Spinner";

const ForecastSection: React.FC<IForecastSectionProps & IFormProp> = ({
  forecastData,
  isUserDenied,
  onChange,
  onInit,
  onSubmit,
  term,
  state,
}) => {

  /**
   * Handling when the user declines the location permission
   */
  if (isUserDenied) {
    return (
      <div>
        <div className="flex justify-center">
          <Form
            onChange={onChange}
            onInit={onInit}
            onSubmit={onSubmit}
            term={term}
            state={state}
          />
        </div>
        {forecastData.data && (
          <div>
            <DayPicker forecast={forecastData} />
          </div>
        )}
      </div>
    );
  }


  /**
   * Handling when user grants location permission
   */
  return forecastData.loading ? (
    <Spinner />
  ) : (
    <div>
      <DayPicker forecast={forecastData} />
    </div>
  );
};

export default ForecastSection;
