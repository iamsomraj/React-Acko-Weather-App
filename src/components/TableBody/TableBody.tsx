import { ITableBodyProps } from '@/types'
import TemperatureIndicator from '@/components/TemperatureIndicator/TemperatureIndicator'

const TableBody: React.FC<ITableBodyProps> = ({ row }) => {
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
                  <div className="flex items-center space-x-2">
                    <TemperatureIndicator val={val} index={index} />
                    <div>{val}</div>
                  </div>
                </div>
              </td>
            )
          })}
        </tr>
      ))}
    </>
  )
}

export default TableBody
