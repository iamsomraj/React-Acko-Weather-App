import { IUtilContainerProps } from "../../types";

const UtilContainer: React.FC<IUtilContainerProps> = ({ children, isHome }) => {
  if (isHome) {
    return (
      <div className="relative bg-gradient-to-br from-purple-100 to-purple-300">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-300">
      <div className="container mx-auto px-10 py-24 text-center">
        {children}
      </div>
    </div>
  );
};

export default UtilContainer;
