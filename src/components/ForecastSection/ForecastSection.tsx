import { IForecastSectionProps, IFormProp } from "../../types";
import DayTimeSelector from "../DayTimeSelector/DayTimeSelector";
import Form from "../Form/Form";

const ForecastSection: React.FC<IForecastSectionProps & IFormProp> = ({
  forecastData,
  isUserDenied,
  onChange,
  onInit,
  onSubmit,
  term,
  state,
}) => {
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
        <div>
          <DayTimeSelector forecast={forecastData} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <DayTimeSelector forecast={forecastData} />
    </div>
  );
};

export default ForecastSection;
