import data from '@/data'

function HeroSecondary() {
  return (
    <div className="mb-8 max-w-2xl mx-auto">
      <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-2">
        {data.hero.subHeading.first}
      </p>
      <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
        {data.hero.subHeading.second}
      </p>
    </div>
  )
}

export default HeroSecondary
