import { ITempIndicatorProps } from "../../types";

const TempIndicator: React.FC<ITempIndicatorProps> = ({ val, index }) => {
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
  }

  return <span className={`block h-3 w-3 rounded-full bg-yellow-500`}></span>;
};

export default TempIndicator;
