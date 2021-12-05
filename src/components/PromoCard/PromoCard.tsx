function PromoCard() {
  return (
    <div className="flex justify-center">
      <div className="relative">
        <span className="animate-ping absolute -top-2 -left-2 inline-flex h-5 w-5 rounded-full bg-yellow-600 opacity-90"></span>
      </div>
      <div className="py-5 px-4 lg:w-1/2 rounded-b-xl shadow-xl border-t-4 border-yellow-800 bg-yellow-200 text-yellow-500 font-bold leading-relaxed">
        Hurry! We are keeping our services
        <span className="text-yellow-600"> FREE </span>for next{" "}
        <span className="text-yellow-600"> 90 </span> days!
        <span className="font-medium opacity-80">
          {" "}
          You are very important to us!{" "}
        </span>
      </div>
    </div>
  );
}

export default PromoCard;
