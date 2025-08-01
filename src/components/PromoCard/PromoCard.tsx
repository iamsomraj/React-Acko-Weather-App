function PromoCard() {
  return (
    <div className="flex justify-center">
      <div className="relative">
        <span className="animate-ping absolute -top-2 -left-2 inline-flex h-5 w-5 rounded-full bg-green-600 opacity-90"></span>
      </div>
      <div className="py-5 px-4 lg:w-1/2 rounded-b-xl shadow-xl border-t-4 border-green-800 bg-green-100 text-green-700 font-bold leading-relaxed">
        ✨ Get accurate weather forecasts instantly with our
        <span className="text-green-800"> real-time </span>weather service.
        <span className="font-medium opacity-80">
          {' '}
          Your trusted weather companion!{' '}
        </span>
      </div>
    </div>
  )
}

export default PromoCard
