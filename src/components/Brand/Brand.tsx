import { Link } from "react-router-dom";
import { IBrandProps } from "../../types";

const Brand: React.FC<IBrandProps> = ({ homePage, brandName }) => {
  return (
    <Link to={homePage} className="font-bold text-2xl text-teal-600">
      {brandName}
    </Link>
  );
};

export default Brand;
