import { IFunElementProps } from "../../types";

const FunElement: React.FC<IFunElementProps> = ({ position, translate }) => {
  return (
    <div className="hidden lg:block">
      <div className={`absolute ${position} transform ${translate} opacity-30`}>
        <div className="absolute bg-gradient-to-br from-teal-300 to-teal-400 w-48 h-48 rounded-3xl transform -rotate-2"></div>
        <div className="absolute ml-10 mt-10 bg-gradient-to-br from-purple-300 to-purple-400 w-48 h-48 rounded-3xl transform rotate-3"></div>
        <div className="absolute ml-24 bg-gradient-to-br from-red-100 to-red-200 w-48 h-48 rounded-3xl transform -rotate-6"></div>
      </div>
    </div>
  );
};

export default FunElement;
