import { ITempIndicatorProps } from "../../types";

const TempIndicator: React.FC<ITempIndicatorProps> = ({ val, index }) => {
  if (index !== 2) return null;

  let color = "yellow";

  /**
   * index === 2 means Real Feel
   */
  if (index === 2) {
    if (val < 5) {
      color = "teal";
    }

    if (val < 20) {
      color = "green";
    }
  }

  const background = `bg-${color}-500`;

  return <span className={`block h-3 w-3 rounded-full ${background}`}></span>;
};

export default TempIndicator;
