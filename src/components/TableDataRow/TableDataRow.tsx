import { ITableDataRow } from "../../types";

const TableDataRow: React.FC<ITableDataRow> = ({ row }) => {
  /**
   * reusable row component which shows data in terms of row in table
   */
  return (
    <>
      {row.map((item) => (
        <tr key={item.Description + item.Temperature + item.Time}>
          {Object.values(item).map((val, index) => {
            return (
              <td
                key={`${val} ${index}`}
                className="px-6 py-4 whitespace-nowrap"
              >
                <div className="text-xs tracking-wider font-medium text-gray-500">
                  {val}
                </div>
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
};

export default TableDataRow;
