import data from '@/data'

function HeroPrimary() {
  return (
    <h1 className="mb-6 text-4xl lg:text-6xl font-extrabold leading-tight">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-500 block">
        {data.hero.mainHeading.first}
      </span>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-secondary-500 to-secondary-600 block">
        {data.hero.mainHeading.last}
      </span>
    </h1>
  )
}

export default HeroPrimary
