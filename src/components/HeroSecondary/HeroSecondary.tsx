import data from '@/data'

function HeroSecondary() {
  return (
    <div className="mb-8 text-md lg:text-2xl text-gray-700">
      <p>{data.hero.subHeading.first}</p>
      <p>{data.hero.subHeading.second}</p>
    </div>
  )
}

export default HeroSecondary
