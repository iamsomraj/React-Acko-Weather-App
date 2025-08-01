function PromoCard() {
  return (
    <div className="flex justify-center animate-fade-in">
      <div className="relative">
        <span
          className="animate-ping absolute -top-2 -left-2 inline-flex h-4 w-4 rounded-full bg-success opacity-75"
          aria-hidden="true"
        ></span>
        <span
          className="absolute -top-2 -left-2 inline-flex h-4 w-4 rounded-full bg-success"
          aria-hidden="true"
        ></span>
      </div>
      <div
        className="py-6 px-6 lg:w-2/3 xl:w-1/2 rounded-xl shadow-lg border-t-4 border-success bg-success/5 text-success-foreground font-medium leading-relaxed transition-all hover:shadow-xl hover:scale-105"
        role="complementary"
        aria-label="Weather service promotion"
      >
        <p className="text-foreground">
          <span className="text-2xl mr-2" role="img" aria-label="sparkles">
            ✨
          </span>
          Get accurate weather forecasts instantly with our
          <span className="text-success font-semibold mx-1">real-time</span>
          weather service.
          <span className="text-muted-foreground font-normal block mt-2">
            Your trusted weather companion!
          </span>
        </p>
      </div>
    </div>
  )
}

export default PromoCard
