import { useState } from "react";
import { Link } from "react-router-dom";
import { IDayTimeSelectorProps } from "../../types";
import { addPath } from "../../util";
import Spinner from "../Spinner/Spinner";
import Table from "../Table/Table";

const DayPicker: React.FC<IDayTimeSelectorProps> = ({ forecast }) => {
  const [selectedDate, setSelectedDate] = useState("");

  /**
   * When state is loading or data is not present
   */
  if (forecast.loading || !forecast.data) {
    /**
     * Handles error state
     */
    if (forecast.error) {
      return (
        <div className="block m-5 text-red-400 font-bold tracking-widest uppercase">
          {forecast.error}
        </div>
      );
    }
    return <Spinner text="Data is loading" />;
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

  /**
   * Adding one blank element in front of the list
   */
  listOfDays.unshift("");

  return (
    <div className="flex-col items-center space-y-5">
      <div>
        <div className="my-3 uppercase tracking-wider text-teal-500 font-bold">
          Data fetched successfully for {forecast.data.city.name}
        </div>
        <select
          className="form-select rounded-lg mt-2 py-3 px-4 bg-gray-50 focus:border-transparent focus:outline-none"
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
      <Link
        to={addPath("")}
        className="inline-block mb-8 lg:mb-16 py-3 px-6 rounded shadow-lg hover:shadow-2xl bg-gradient-to-br from-purple-500 to-purple-700 hover:to-purple-600 text-purple-100 hover:text-white font-bold text-md tracking-wide transition duration-500"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default DayPicker;
