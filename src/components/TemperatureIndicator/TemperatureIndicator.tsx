import { ITemperatureIndicatorProps } from "../../types";

const TemperatureIndicator: React.FC<ITemperatureIndicatorProps> = ({
  val,
  index,
}) => {
  if (index !== 2) return null;

  /**
   * index === 2 means Real Feel
   */
  if (index === 2) {
    if (val < 5) {
      return <span className={`block h-3 w-3 rounded-full bg-teal-500`}></span>;
    }

    if (val < 20) {
      return (
        <span className={`block h-3 w-3 rounded-full bg-green-500`}></span>
      );
    }

    if (val > 25) {
      return <span className={`block h-3 w-3 rounded-full bg-red-500`}></span>;
    }
  }

  return <span className={`block h-3 w-3 rounded-full bg-yellow-500`}></span>;
};

export default TemperatureIndicator;
