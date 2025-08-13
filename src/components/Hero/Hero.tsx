import data from '@/data'
import { IHeroProps } from '@/types'
import { ActionButton } from '@/components/ActionButton/ActionButton'
import HeroPrimary from '@/components/HeroPrimary/HeroPrimary'
import HeroSecondary from '@/components/HeroSecondary/HeroSecondary'
import PromoCard from '@/components/PromoCard/PromoCard'

const Hero: React.FC<IHeroProps> = () => {
  /**
   * Landing page main component which illustrates main functionality of application
   */
  return (
    <section className="relative py-12 lg:py-24" aria-labelledby="hero-heading">
      <div className="container mx-auto px-4 md:px-6 lg:px-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <HeroPrimary />
          <HeroSecondary />

          <div className="space-y-8">
            <ActionButton
              path={data.hero.mainAction.path}
              body={data.hero.mainAction.text}
              size="lg"
            />
            <PromoCard />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
