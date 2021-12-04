import { Link } from "react-router-dom";
import { IHeaderLinkProps } from "../../types";

const HeaderLink: React.FC<IHeaderLinkProps> = ({ path, text, isPrimary }) => {
  if (isPrimary) {
    return (
      <Link
        to={path}
        className="px-4 py-2 rounded-md  bg-purple-300 font-medium text-purple-600 hover:text-purple-800"
      >
        {text}
      </Link>
    );
  }

  return (
    <Link to={path} className="text-gray-400 hover:text-purple-600">
      {text}
    </Link>
  );
};

export default HeaderLink;
