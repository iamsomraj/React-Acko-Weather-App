import { Link } from "react-router-dom";
import data from "../../data";
import { IHeroProps } from "../../types";

const Hero: React.FC<IHeroProps> = () => {
  /**
   * Landing page main component which illustrates main functionality of application
   */
  return (
    <div className="relative">
      <div className="container mx-auto px-10 py-24 text-center">
        <h1 className="mb-4 text-3xl lg:text-5xl font-extrabold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-500">
            {data.hero.mainHeading.first}
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-600 to-purple-500">
            {data.hero.mainHeading.last}
          </span>
        </h1>
        <div className="mb-8 text-md lg:text-2xl text-gray-700">
          <p>{data.hero.subHeading.first}</p>
          <p>{data.hero.subHeading.second}</p>
        </div>
        <Link
          to={data.hero.mainAction.path}
          className="inline-block mb-16 lg:mb-32 py-3 px-12 rounded shadow-lg hover:shadow-2xl bg-gradient-to-br from-purple-500 to-purple-700 hover:to-purple-600 text-purple-100 hover:text-white font-bold text-md tracking-wide transition duration-500"
        >
          {data.hero.mainAction.text}
        </Link>
      </div>
    </div>
  );
};

export default Hero;
