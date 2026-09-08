export default function RestaurantAbout() {
  return (
    <section
      id="restaurant-about"
      className="relative z-20 my-3 sm:my-5 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 scroll-mt-20 font-sans"
    >
      <div className="bg-[#181614] rounded-2xl sm:rounded-3xl px-5 py-6 sm:px-10 sm:py-8 border border-[#2E2822] shadow-lg text-center flex flex-col items-center justify-center max-w-4xl mx-auto relative overflow-hidden group">
        {/* Subtle decorative warm glow */}
        <div 
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#D95F25]/10 rounded-full blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Main Heading - Deep Charcoal Theme */}
        <h2 className="font-sans text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-tight uppercase">
          AL JALSA FOR MANDI RESTAURANT
        </h2>

        {/* Sub-heading - Red/Orange accent */}
        <h3 className="font-sans text-xs sm:text-sm md:text-base font-bold text-[#D95F25] mt-1.5 tracking-wide uppercase flex items-center gap-2">
          <span className="w-5 h-[1.5px] bg-[#D95F25]/60 hidden sm:inline-block" />
          <span>Best Arabic &amp; Yemeni Traditional Food</span>
          <span className="w-5 h-[1.5px] bg-[#D95F25]/60 hidden sm:inline-block" />
        </h3>

        {/* Paragraph - Off-white text with high readability */}
        <p className="font-sans text-xs sm:text-sm md:text-base text-stone-300 max-w-2xl leading-relaxed mt-3 font-normal">
          20 years of authentic Arabian &amp; Yemeni mandi in the heart of{' '}
          <span className="font-semibold text-white">Muweilah, Sharjah</span> — slow-cooked over firewood pits with fresh meats, daily.
        </p>
      </div>
    </section>
  );
}
