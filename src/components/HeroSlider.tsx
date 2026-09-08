import { useState, useEffect, useRef, type TouchEvent } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Clock, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { 
  heroMandiImg, 
  muttonMandiImg, 
  fishMandiImg, 
  familyMandiImg, 
  restaurantInteriorImg,
  chickenMandiDishImg,
  RESTAURANT_INFO
} from '../data/restaurantData';

interface HeroSliderProps {
  onOrderNow?: () => void;
  onExploreMenu?: () => void;
}

const SLIDES = [
  {
    id: 'chicken-mandi',
    title: 'Traditional Roasted Chicken Mandi',
    arabicTitle: 'مندي دجاج تقليدي بالفرن الحطبي',
    tag: 'Signature House Special',
    price: 'AED 25',
    image: chickenMandiDishImg,
  },
  {
    id: 'mutton-mandi',
    title: 'Royal Mutton Lamb Shank Mandi',
    arabicTitle: 'مندي لحم ضأن ملكي طري',
    tag: 'Chef Signature Dish',
    price: 'AED 72',
    image: muttonMandiImg,
  },
  {
    id: 'fish-mandi',
    title: 'Charcoal Spiced Kingfish Mandi',
    arabicTitle: 'مندي سمك كنعد مشوي على الفحم',
    tag: 'Fresh Arabian Catch',
    price: 'AED 65',
    image: fishMandiImg,
  },
  {
    id: 'family-mandi',
    title: 'Al Jalsa Grand Family Gathering Feast',
    arabicTitle: 'وليمة الجلسة العائلية الملكية',
    tag: 'Sharing Platter (4-6 Guests)',
    price: 'AED 135',
    image: familyMandiImg,
  },
  {
    id: 'interior-majlis',
    title: 'Authentic Floor Majlis Seating',
    arabicTitle: 'جلسات عربية أصيلة وضيافة شرقية',
    tag: 'Traditional Arabian Dining',
    price: 'Complimentary Gahwa',
    image: restaurantInteriorImg,
  },
];

export default function HeroSlider({ onOrderNow, onExploreMenu }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-slide every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const slide = SLIDES[currentSlide];

  return (
    <section 
      id="hero" 
      className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F4EDE2] to-[#FAF7F2] pt-3 sm:pt-6 pb-4 sm:pb-6"
    >
      {/* Subtle Arabic geometric background accent */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#C94F1F_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        {/* MAIN HERO CONTAINER */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E7E0D8] shadow-lg shadow-black/5 overflow-hidden p-2.5 sm:p-4 md:p-5">
          
          {/* ============================================================ */}
          {/* IMAGE SLIDER (Full Width Showcase Banner)                   */}
          {/* ============================================================ */}
          <div 
            className="relative flex flex-col justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Slider Main Viewport */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] md:aspect-[2.4/1] rounded-xl sm:rounded-2xl overflow-hidden border border-[#E7E0D8] bg-[#151515] shadow-md group">
              {/* Slides with smooth transition */}
              <div className="relative w-full h-full">
                {SLIDES.map((item, index) => (
                  <div
                    key={item.id}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                      index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                    {/* Deep dark gradient overlay at bottom for typography contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  </div>
                ))}
              </div>

              {/* Slide Caption Info on Image */}
              <div className="absolute bottom-2.5 sm:bottom-4 left-3 sm:left-5 right-3 sm:right-5 z-20 flex items-end justify-between gap-2.5 text-white">
                <div className="max-w-[70%] sm:max-w-[75%]">
                  <div className="inline-block px-2 py-0.5 rounded bg-[#D95F25] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mb-1">
                    {slide.tag}
                  </div>
                  <h2 className="text-sm sm:text-xl md:text-2xl font-bold font-display leading-tight drop-shadow-sm text-white line-clamp-1">
                    {slide.title}
                  </h2>
                  <p className="text-[10px] sm:text-xs text-amber-200/90 font-arabic mt-0.5 line-clamp-1">
                    {slide.arabicTitle}
                  </p>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="inline-block px-2.5 sm:px-3.5 py-1 rounded-full bg-white text-[#151515] text-xs sm:text-sm font-black shadow-lg">
                    {slide.price}
                  </span>
                </div>
              </div>

              {/* Slider Previous Button */}
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-all opacity-80 group-hover:opacity-100 cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Slider Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-all opacity-80 group-hover:opacity-100 cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Slide Indicators (Dots) */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentSlide ? 'w-4 sm:w-5 bg-[#D95F25]' : 'w-1.5 bg-white/60 hover:bg-white'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* ============================================================ */}
            {/* 3 CORE FEATURE BADGES: GOOGLE REVIEWS | 100% HALAL | 15-25 MINS */}
            {/* ============================================================ */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3.5 md:gap-4 mt-3 sm:mt-4 w-full">
              
              {/* BADGE 1: GOOGLE REVIEWS (Dynamic from RESTAURANT_INFO) */}
              <a
                id="hero-google-reviews-badge"
                href={RESTAURANT_INFO.googleMapsUrl || "https://maps.app.goo.gl/voDi8LBbdxb4SwZ6A"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center text-center p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#FFF9F3] hover:bg-[#FFF3E8] border border-[#F5DCBE] hover:border-[#D95F25] transition-all group cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-1 mb-0.5">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-500 text-white flex items-center justify-center">
                    <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white text-white" />
                  </div>
                  <span className="text-xs sm:text-base font-black text-[#111827]">
                    {RESTAURANT_INFO.googleRating || 4.1} ★
                  </span>
                  <span className="text-[11px] text-[#555] font-semibold hidden sm:inline">
                    ({RESTAURANT_INFO.googleReviewCount || 361})
                  </span>
                </div>
                <span className="text-xs sm:text-[13px] font-bold text-[#D95F25] flex items-center gap-1 leading-tight">
                  <span>Google Reviews</span>
                  <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100" />
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-[#4B433C] leading-normal mt-0.5">
                  {RESTAURANT_INFO.googleReviewCount || 361} Reviews
                </span>
              </a>

              {/* BADGE 2: 100% HALAL */}
              <div 
                id="hero-halal-badge"
                className="flex flex-col items-center justify-center text-center p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#FFF9F3] border border-[#F5DCBE] shadow-xs"
              >
                <div className="flex items-center gap-1 mb-0.5">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  <span className="text-xs sm:text-base font-black text-[#111827]">100% Halal</span>
                </div>
                <span className="text-xs sm:text-[13px] font-bold text-emerald-800 leading-tight">
                  Fresh Meats
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-[#4B433C] leading-normal mt-0.5">
                  Daily Hand-Selected
                </span>
              </div>

              {/* BADGE 3: 15-25 MINS HOT DELIVERY (Updated from 30-45 Mins) */}
              <div 
                id="hero-delivery-badge"
                className="flex flex-col items-center justify-center text-center p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#FFF9F3] border border-[#F5DCBE] shadow-xs"
              >
                <div className="flex items-center gap-1 mb-0.5">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#D95F25]" />
                  <span className="text-xs sm:text-base font-black text-[#111827]">15–25 Mins</span>
                </div>
                <span className="text-xs sm:text-[13px] font-bold text-[#D95F25] leading-tight">
                  Hot Delivery
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-[#4B433C] leading-normal mt-0.5">
                  Fast To Your Door
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
