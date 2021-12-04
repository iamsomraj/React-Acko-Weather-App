import { ITableHeaderProps } from "../../types";

const TableHeader: React.FC<ITableHeaderProps> = ({ rows }) => {
  /**
   * helps to render table headers based on object keys dynamically
   */
  const headList = rows.map((head) => (
    <th
      key={head}
      scope="col"
      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      {head}
    </th>
  ));

  return <>{headList}</>;
};

export default TableHeader;
