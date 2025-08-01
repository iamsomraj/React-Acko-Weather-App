import data from '@/data'
import { IHeroProps } from '@/types'
import ActionButton from '@/components/ActionButton/ActionButton'
import HeroPrimary from '@/components/HeroPrimary/HeroPrimary'
import HeroSecondary from '@/components/HeroSecondary/HeroSecondary'
import PromoCard from '@/components/PromoCard/PromoCard'

const Hero: React.FC<IHeroProps> = () => {
  /**
   * Landing page main component which illustrates main functionality of application
   */
  return (
    <div className="relative">
      <div className="container mx-auto px-10 py-24 text-center">
        <HeroPrimary />
        <HeroSecondary />
        <div>
          <div>
            <ActionButton
              path={data.hero.mainAction.path}
              body={data.hero.mainAction.text}
            />
          </div>
          <PromoCard />
        </div>
      </div>
    </div>
  )
}

export default Hero
