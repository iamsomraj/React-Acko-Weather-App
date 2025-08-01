import FunElement from '@/components/FunElement/FunElement'
import Hero from '@/components/Hero/Hero'
import UtilContainer from '@/components/UtilContainer/UtilContainer'

const HomeContainer = () => {
  return (
    <UtilContainer isHome={true}>
      <FunElement
        position="top-24 left-0"
        translate="translate-x-4 translate-y-4"
      />
      <Hero />
      <FunElement
        position="bottom-0 right-0"
        translate="-translate-x-80 -translate-y-80"
      />
    </UtilContainer>
  )
}

export default HomeContainer
