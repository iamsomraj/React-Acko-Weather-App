import ActionButton from '@/components/ActionButton/ActionButton'
import Highlighter from '@/components/Highlighter/Highlighter'
import UtilContainer from '@/components/UtilContainer/UtilContainer'

const TermsContainer = () => {
  return (
    <UtilContainer>
      <div className="flex justify-center items-center">
        <div className="w-full lg:w-1/2 space-y-5">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-600 to-purple-500">
            Privacy & Terms
          </div>
          <div className="text-justify space-y-3">
            <div>
              Your privacy is important to us. WeatherNow is committed to
              protecting your personal information and ensuring{' '}
              <Highlighter>transparent data practices</Highlighter>. We collect
              minimal information necessary to provide accurate weather
              forecasts and improve our services.
            </div>
            <div>
              When you use our location-based features, we temporarily access
              your GPS coordinates to deliver precise weather data for your
              area. This information is{' '}
              <Highlighter>never stored permanently</Highlighter> on our servers
              and is only used to fetch relevant weather information from our
              trusted data providers.
            </div>
            <div>
              We do not sell, trade, or share your personal information with
              third parties. Any data collected is used solely for{' '}
              <Highlighter>service functionality</Highlighter> and improving
              your weather forecasting experience. You have full control over
              location permissions and can revoke access at any time through
              your device settings.
            </div>
            <div>
              By using WeatherNow, you agree to our data practices as outlined
              here. We may update these terms occasionally to reflect service
              improvements or regulatory changes.
              <Highlighter>Your continued use</Highlighter> of the application
              constitutes acceptance of any updated terms.
            </div>
          </div>
          <ActionButton path="/" body="Back to Home" />
        </div>
      </div>
    </UtilContainer>
  )
}

export default TermsContainer
