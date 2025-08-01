import ActionButton from '@/components/ActionButton/ActionButton'
import Highlighter from '@/components/Highlighter/Highlighter'
import UtilContainer from '@/components/UtilContainer/UtilContainer'
import { addPath } from '@/util'

const AboutContainer = () => {
  return (
    <UtilContainer>
      <div className="flex justify-center items-center">
        <div className="w-full lg:w-1/2 space-y-5">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-600 to-purple-500">
            About
          </div>
          <div className="leading-relaxed text-lg text-justify">
            Lorem,<Highlighter> ipsum </Highlighter>dolor sit amet consectetur
            adipisicing elit. Ducimus unde maiores dolores architecto quas
            corporis provident dolor porro consectetur nobis veniam animi sequiz
            <Highlighter> fuga fugiat quasi </Highlighter>, consequuntur
            nostrum, harum velit! Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Blanditiis ducimus minus enim ipsam sit vitae
            animi quasi facere cupiditate. Soluta
            <Highlighter> provident </Highlighter>mollitia commodi similique
            fugit amet quam quas in doloribus!
          </div>
          <ActionButton path={addPath('')} body="Go Back Home" />
        </div>
      </div>
    </UtilContainer>
  )
}

export default AboutContainer
