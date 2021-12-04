import UtilContainer from "../../components/UtilContainer/UtilContainer";

const AboutContainer = () => {
  return (
    <UtilContainer>
      <div className="flex justify-center items-center">
        <div className="w-full lg:w-1/2 space-y-5">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-600 to-purple-500">
            About
          </div>
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            unde maiores dolores architecto quas corporis provident dolor porro
            consectetur nobis veniam animi sequi fuga fugiat quasi, consequuntur
            nostrum, harum velit! Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Blanditiis ducimus minus enim ipsam sit vitae
            animi quasi facere cupiditate. Soluta provident mollitia commodi
            similique fugit amet quam quas in doloribus!
          </div>
        </div>
      </div>
    </UtilContainer>
  );
};

export default AboutContainer;
