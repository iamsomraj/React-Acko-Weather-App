import { ITableDataRow } from "../../types";

const TableDataRow: React.FC<ITableDataRow> = ({ row }) => {
  return (
    <>
      {row.map((item) => (
        <tr key={item.Description + item.Temperature + item.Time}>
          {Object.values(item).map((val) => {
            return (
              <td key={val} className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{val}</div>
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
};

export default TableDataRow;
