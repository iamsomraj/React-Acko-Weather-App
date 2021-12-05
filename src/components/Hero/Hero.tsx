import data from "../../data";
import { IHeroProps } from "../../types";
import ActionButton from "../ActionButton/ActionButton";

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
          <div className="flex justify-center">
            <div className="relative">
              <span className="animate-ping absolute -top-2 -left-2 inline-flex h-5 w-5 rounded-full bg-yellow-600 opacity-90"></span>
            </div>
            <div className="py-5 px-4 lg:w-1/2 rounded-b-xl shadow-xl border-t-4 border-yellow-800 bg-yellow-200 text-yellow-500 font-bold leading-relaxed">
              Hurry! We are keeping our services
              <span className="text-yellow-600"> FREE </span>for next{" "}
              <span className="text-yellow-600"> 90 </span> days!
              <span className="font-medium opacity-80">
                {" "}
                You are very important to us!{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
