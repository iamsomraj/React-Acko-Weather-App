import { IActionButtonProps } from "../../types";
import { Link } from "react-router-dom";

const ActionButton: React.FC<IActionButtonProps> = ({ body, path }) => {
  return (
    <Link
      to={path}
      className="inline-block mb-8 lg:mb-16 py-3 px-12 rounded shadow-lg hover:shadow-2xl bg-gradient-to-br from-purple-500 to-purple-700 hover:to-purple-600 text-purple-100 hover:text-white font-bold text-md tracking-wide transition duration-500"
    >
      {body}
    </Link>
  );
};

export default ActionButton;
