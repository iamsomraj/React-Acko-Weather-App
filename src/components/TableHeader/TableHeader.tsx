import { ITableHeaderProps } from '@/types'

const TableHeader: React.FC<ITableHeaderProps> = ({ rows }) => {
  /**
   * helps to render table headers based on object keys dynamically
   */
  const formatHeaderText = (header: string) => {
    // Convert camelCase to readable format
    return header
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim()
  }

  const getHeaderDescription = (header: string) => {
    const descriptions: Record<string, string> = {
      Time: 'Time of forecast',
      Temperature: 'Temperature in Celsius',
      'Real Feel': 'Perceived temperature in Celsius',
      Description: 'Weather conditions',
      Visibility: 'Visibility in meters',
      Humidity: 'Humidity percentage',
      Pressure: 'Atmospheric pressure in hPa',
      'Wind Speed': 'Wind speed in meters per second',
      'Cloud Cover': 'Cloud coverage percentage',
    }
    return (
      descriptions[formatHeaderText(header)] ||
      `${formatHeaderText(header)} data`
    )
  }

  const headList = rows.map((head) => (
    <th
      key={head}
      scope="col"
      className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-muted/20 first:rounded-tl-lg last:rounded-tr-lg"
      aria-label={getHeaderDescription(head)}
    >
      <span className="block lg:hidden">
        {formatHeaderText(head)
          .split(' ')
          .map((word) => word[0])
          .join('')}
      </span>
      <span className="hidden lg:block">{formatHeaderText(head)}</span>
    </th>
  ))

  return <>{headList}</>
}

export default TableHeader
