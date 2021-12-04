import data from "../../data";
import { IHeaderProps } from "../../types";
import Brand from "../Brand/Brand";
import HeaderLink from "../HeaderLink/HeaderLink";

const Header: React.FC<IHeaderProps> = () => {
  const { brand, navLinks } = data;

  const BrandSection = (
    <div className="flex items-center space-x-4">
      <Brand homePage={brand.path} brandName={brand.text} />
    </div>
  );

  const NavigationSection = (
    <div className="hidden lg:flex items-center space-x-4">
      {navLinks.map((link) => (
        <HeaderLink
          key={link.path + link.text}
          isPrimary={link.isPrimary}
          path={link.path}
          text={link.text}
        />
      ))}
    </div>
  );

  return (
    <div className="relative text-purple-200">
      <div className="container mx-auto flex justify-between px-10 py-6">
        {/* Brand Section */}
        {BrandSection}
        {/* Navigation Section */}
        {NavigationSection}
      </div>
    </div>
  );
};

export default Header;
