import data from "../../data";

function HeroPrimary() {
  return (
    <h1 className="mb-4 text-3xl lg:text-5xl font-extrabold">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-500">
        {data.hero.mainHeading.first}
      </span>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-600 to-purple-500">
        {data.hero.mainHeading.last}
      </span>
    </h1>
  );
}

export default HeroPrimary;
