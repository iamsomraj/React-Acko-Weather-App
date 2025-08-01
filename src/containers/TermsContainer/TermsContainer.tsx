import ActionButton from '@/components/ActionButton/ActionButton'
import Highlighter from '@/components/Highlighter/Highlighter'
import UtilContainer from '@/components/UtilContainer/UtilContainer'
import { addPath } from '@/util'

const TermsContainer = () => {
  return (
    <UtilContainer>
      <div className="flex justify-center items-center">
        <div className="w-full lg:w-1/2 space-y-5">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-600 to-purple-500">
            Terms
          </div>
          <div className="text-justify space-y-3">
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non vel
              sequi, iure nihil ipsum ab <Highlighter> tempora </Highlighter>
              aliquid! Beatae, harum asperiores aut nihil commodi dolorem fugiat
              repudiandae saepe quasi velit facere!
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum culpa
              repudiandae aliquid minima dolor eligendi corrupti hic ex
              veritatis nostrum. Impedit accusantium esse ad?
              <Highlighter> Exercitationem </Highlighter>ullam eligendi laborum
              delectus sed!
            </div>
            <div>
              Lorem ipsum dolor sit amet{' '}
              <Highlighter> consectetur </Highlighter>
              adipisicing elit. Non vel sequi, iure nihil ipsum ab tempora
              aliquid! Beatae, harum asperiores aut nihil commodi dolorem fugiat
              repudiandae saepe quasi velit facere!
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum culpa
              repudiandae aliquid minima dolor eligendi corrupti hic ex
              veritatis nostrum. Impedit{' '}
              <Highlighter> accusantium </Highlighter>esse ad? Exercitationem
              ullam eligendi laborum delectus sed!
            </div>
          </div>
          <ActionButton path={addPath('')} body="Go Back Home" />
        </div>
      </div>
    </UtilContainer>
  )
}

export default TermsContainer
