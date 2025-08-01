import WeatherMain from '@/components/WeatherMain/WeatherMain'

const WeatherContainer = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-purple-100 to-purple-300">
      <div className="container mx-auto px-10 py-24 text-center">
        <WeatherMain />
      </div>
    </div>
  )
}

export default WeatherContainer
