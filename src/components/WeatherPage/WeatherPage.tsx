import WeatherService from '@/components/WeatherService/WeatherService'
import WeatherHeader from '@/components/WeatherHeader/WeatherHeader'

/**
 * WeatherPage - Main weather page component
 * Replaces the old WeatherMain component with more descriptive naming
 */
function WeatherPage() {
  return (
    <>
      <WeatherHeader />
      <WeatherService />
    </>
  )
}

export default WeatherPage
