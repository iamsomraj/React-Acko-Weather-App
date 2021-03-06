import FooterBottom from "../FooterBottom/FooterBottom";
import FooterMain from "../FooterMain/FooterMain";

const FooterSection = () => {
  return (
    <div className="relative container mx-auto px-10 py-10">
      <FooterMain />
      <FooterBottom />
    </div>
  );
};

export default FooterSection;
