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
            About WeatherNow
          </div>
          <div className="leading-relaxed text-lg text-justify">
            WeatherNow is a{' '}
            <Highlighter>modern weather application</Highlighter> that provides
            accurate and real-time weather forecasts for locations worldwide.
            Built with cutting-edge technology, our platform offers an intuitive
            interface that makes checking weather conditions effortless and
            efficient.
            <br />
            <br />
            Our application supports{' '}
            <Highlighter>two convenient modes</Highlighter>: automatic location
            detection using your device's GPS, and manual city search for any
            location globally. Whether you're planning your day or tracking
            weather patterns, WeatherNow delivers{' '}
            <Highlighter>reliable meteorological data</Highlighter> with
            detailed forecasts, temperature readings, humidity levels, and wind
            conditions.
            <br />
            <br />
            Experience weather forecasting reimagined with our responsive design
            that works seamlessly across all devices, ensuring you have access
            to critical weather information whenever you need it.
          </div>
          <ActionButton path={addPath('')} body="Back to Home" />
        </div>
      </div>
    </UtilContainer>
  )
}

export default AboutContainer
