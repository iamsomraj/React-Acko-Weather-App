import { ISpinnerProps } from "../../types";

const Spinner: React.FC<ISpinnerProps> = ({ text }) => {
  /**
   * basic Spinner component for showing states as loading
   */
  return (
    <div className="flex items-center justify-center text-2xl text-purple">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 animate-spin inline-block mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        <span>{text ? text : ""}</span>
      </div>
    </div>
  );
};

export default Spinner;
