import { ITempIndicatorProps } from "../../types";

const TempIndicator: React.FC<ITempIndicatorProps> = ({ val, index }) => {
  if (index !== 2) return null;

  let background = `bg-yellow-500`;

  /**
   * index === 2 means Real Feel
   */
  if (index === 2) {
    if (val < 5) {
      background = `bg-teal-500`;
    }

    if (val < 20) {
      background = `bg-green-500`;
    }
  }

  return <span className={`block h-3 w-3 rounded-full ${background}`}></span>;
};

export default TempIndicator;
