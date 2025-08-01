import WeatherPage from '@/components/WeatherPage/WeatherPage'

const WeatherContainer = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-purple-100 to-purple-300">
      <div className="container mx-auto px-10 py-24 text-center">
        <WeatherPage />
      </div>
    </div>
  )
}

export default WeatherContainer
