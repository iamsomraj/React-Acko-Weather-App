import { IFormProp } from "../../types";
import Spinner from "../Spinner/Spinner";

const Form: React.FC<IFormProp> = ({
  term,
  onChange,
  onSubmit,
  onInit,
  state,
}) => {
  const { loading, error } = state;
  /**
   * disables the button to prevent incorrect API usage
   */
  const isDisabled = term.trim().length === 0;

  /**
   * handles error state when Error response comes from API
   */
  const isError = error !== null;

  const formInputControlElement = (
    <div className="mb-4">
      <label
        className="block mb-2 font-semibold text-xl text-left text-gray-500"
        htmlFor="cityname"
      >
        City Name
      </label>
      <input
        autoComplete="off"
        id="cityname"
        className={`block w-full py-2 px-4 focus:outline-none rounded border placeholder-gray-400 text-gray-500 ${
          isError && "border-red-500"
        }`}
        placeholder="Search City"
        type="text"
        value={term}
        onChange={(e) => {
          onInit();
          onChange(e.target.value);
        }}
      />
      {isError && (
        <div className="py-1 text-xs text-red-500 text-left font-semibold">
          {error}
        </div>
      )}
    </div>
  );

  const formBtnControlElement = (
    <div className="mb-4">
      <button
        disabled={isDisabled}
        type="submit"
        className={`block py-1 w-full rounded-lg bg-blue-400 text-gray-100 font-semibold disabled:opacity-80 ${
          isDisabled && "cursor-not-allowed"
        }`}
      >
        {loading ? <Spinner /> : "Fetch"}
      </button>
    </div>
  );

  return (
    <div className="my-6 px-5 py-4 shadow-lg rounded-md bg-gray-200 text-blue-700 text-center">
      <form onSubmit={onSubmit}>
        {/* Input Element */}
        {formInputControlElement}
        {/* Button Element */}
        {formBtnControlElement}
      </form>
    </div>
  );
};

export default Form;
