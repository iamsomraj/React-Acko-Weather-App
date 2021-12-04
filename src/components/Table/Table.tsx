import { ITableProps } from "../../types";
import { getTimeFromTimestamp } from "../../util";
import TableDataRow from "../TableDataRow/TableDataRow";
import TableHeaderRow from "../TableHeaderRow/TableHeaderRow";

const Table: React.FC<ITableProps> = ({ forecast, selected }) => {
  const filteredForecast = forecast.data?.list.filter((item) =>
    item.dt_txt.includes(selected)
  );

  const rowData = filteredForecast?.map((item) => {
    return {
      Time: item.dt_txt,
      Temperature: item.main.temp,
      "Real Feel": item.main.feels_like,
      Description: item.weather[0].description.toUpperCase(),
      Visibility: item.visibility,
      Humidity: item.main.humidity,
      Pressure: item.main.pressure,
    };
  });

  if (!rowData) {
    return <div>There are no rows of information</div>;
  }
  return (
    <div className="flex flex-col space-y-4">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <h2 className="mt-10 text-xl lg:text-3xl font-bold text-purple-700">
          {forecast.data?.city.name}
          <span className="px-2 text-xs font-bold text-gray-500">
            {forecast.data?.city.country}
          </span>
        </h2>
        <div className="flex justify-center space-x-3">
          <div className="mt-2 text-xs font-bold text-teal-600">
            Sunrise {getTimeFromTimestamp(forecast.data?.city.sunrise)}
          </div>
          <div className="mt-2 text-xs font-bold text-teal-600">
            Sunset {getTimeFromTimestamp(forecast.data?.city.sunset)}
          </div>
        </div>
      </div>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            className="
          shadow
          overflow-hidden
          border-b border-gray-200
          sm:rounded-lg
        "
          >
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <TableHeaderRow rows={Object.keys(rowData[0])} />
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <TableDataRow row={rowData} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
