import data from "../../data";
import { IHeroProps } from "../../types";
import ActionButton from "../ActionButton/ActionButton";
import PromoCard from "../PromoCard/PromoCard";

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
        <div>
          <div>
            <ActionButton
              path={data.hero.mainAction.path}
              body={data.hero.mainAction.text}
            />
          </div>
          <PromoCard />
        </div>
      </div>
    </div>
  );
};

export default Hero;
