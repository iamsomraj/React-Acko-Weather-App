import { Link } from "react-router-dom";
import { IBrandProps } from "../../types";

const Brand: React.FC<IBrandProps> = ({ homePage, brandName }) => {
  return (
    <Link
      to={homePage}
      className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-600 to-purple-500"
    >
      {brandName}
    </Link>
  );
};

export default Brand;
