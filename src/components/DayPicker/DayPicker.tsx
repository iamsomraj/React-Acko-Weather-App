import { useState } from "react";
import { IDayTimeSelectorProps } from "../../types";
import Spinner from "../Spinner/Spinner";
import Table from "../Table/Table";

const DayPicker: React.FC<IDayTimeSelectorProps> = ({ forecast }) => {
  const [selectedDate, setSelectedDate] = useState("");
  if (forecast.loading || !forecast.data) {
    return <Spinner text="Data is still not fetched" />;
  }

  const { list } = forecast.data;

  const listOptions = list.map((item) => item);

  /**
   * Getting all the days
   */
  let listOfDays = listOptions.map((item) => item.dt_txt.split(" ")[0]);
  /**
   * Removing duplicate strings
   */
  listOfDays = listOfDays.filter(function (item, index, inputArray) {
    return inputArray.indexOf(item) === index;
  });
  listOfDays.unshift("");

  return (
    <div className="flex-col items-center space-y-5">
      <div>
        <div className="my-3 uppercase tracking-wider text-teal-500 font-bold">
          Data fetched successfully for {forecast.data.city.name}
        </div>
        <select
          className="form-select mt-2 py-2 px-3 focus:border-transparent focus:outline-none"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          {listOfDays.map((opt) => {
            return <option key={opt}>{opt}</option>;
          })}
        </select>
      </div>
      {selectedDate !== "" && (
        <div>
          <Table selected={selectedDate} forecast={forecast} />
        </div>
      )}
    </div>
  );
};

export default DayPicker;
