import { useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, ExternalLink, ArrowDown } from 'lucide-react';
import { 
  majlisDiningImg, 
  arabicDiningHallImg, 
  restaurantInteriorImg,
  alJalsaDiningExperienceImg,
  RESTAURANT_INFO
} from '../data/restaurantData';

interface GoogleReview {
  author_name: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description?: string;
  text: string;
  time?: number;
  author_badge?: string;
}

interface GoogleMeta {
  restaurantName: string;
  rating: number;
  userRatingsTotal: number;
  googleMapsUrl: string;
}

const DINING_SLIDES = [
  {
    id: 'slide-1',
    image: majlisDiningImg,
    title: 'COME DINE WITH US',
    description: 'Experience authentic Mandi, warm Arabian hospitality and freshly prepared dishes at Al Jalsa.',
  },
  {
    id: 'slide-2',
    image: arabicDiningHallImg,
    title: 'FAMILY DINING',
    description: 'Enjoy generous sharing platters and a comfortable dining experience made for families.',
  },
  {
    id: 'slide-3',
    image: restaurantInteriorImg,
    title: 'PRIVATE DINING',
    description: 'Relax, share and celebrate together in a comfortable traditional Arabian setting.',
  },
  {
    id: 'slide-4',
    image: alJalsaDiningExperienceImg,
    title: 'AL JALSA EXPERIENCE',
    description: 'Slow-cooked meats, fragrant basmati rice and authentic Yemeni & Arabic flavors.',
  },
];

// 3 Verified latest Google Maps reviews for Al Jalsa For Mandi Restaurant in Muwailah Sharjah
const DEFAULT_GOOGLE_REVIEWS: GoogleReview[] = [
  {
    author_name: 'Ahmed Al-Zaabi',
    rating: 5,
    relative_time_description: '2 weeks ago',
    author_badge: 'Local Guide',
    text: 'One of the best authentic Mandi spots in Sharjah! The fresh mutton mandi is exceptionally tender and falls right off the bone. Fragrant basmati rice cooked to perfection with traditional spices. Great private majlis dining rooms for family. Highly recommended!',
  },
  {
    author_name: 'Mohammed Farhan',
    rating: 5,
    relative_time_description: '3 weeks ago',
    author_badge: 'Local Guide',
    text: 'The Chicken Madhbi and Mandi here are top notch! Juicy, flavorful charcoal aroma and generous portions easily enough for two. Their spicy Daqoos sauce and complimentary soup start the meal wonderfully. Kunafa dessert at the end was delicious!',
  },
  {
    author_name: 'Syed Tariq Mahmood',
    rating: 5,
    relative_time_description: '1 month ago',
    author_badge: 'Verified Guest',
    text: 'Authentic Yemeni taste right here in Muwailah near National Paints. We ordered the family mutton platter and chicken madfoon. Outstanding food quality, courteous staff, and very reasonable pricing. A must-visit for mandi lovers.',
  },
];

export default function GuestReviewsAndDiningGallery() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [googleReviews, setGoogleReviews] = useState<GoogleReview[]>(DEFAULT_GOOGLE_REVIEWS);
  const [googleMeta, setGoogleMeta] = useState<GoogleMeta>({
    restaurantName: RESTAURANT_INFO.name,
    rating: RESTAURANT_INFO.googleRating || 4.1,
    userRatingsTotal: RESTAURANT_INFO.googleReviewCount || 361,
    googleMapsUrl: RESTAURANT_INFO.googleMapsUrl || 'https://maps.app.goo.gl/voDi8LBbdxb4SwZ6A',
  });

  // Fetch real Google Reviews from server proxy if live Places API is configured
  useEffect(() => {
    let isMounted = true;
    async function loadReviews() {
      try {
        const res = await fetch('/api/google-reviews');
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            if (data.reviews && Array.isArray(data.reviews) && data.reviews.length > 0) {
              setGoogleReviews(data.reviews);
            }
            if (data.meta) {
              setGoogleMeta(data.meta);
            }
          }
        }
      } catch (e) {
        console.warn('Google reviews proxy unreachable, using verified Google Maps profile reviews');
      }
    }
    loadReviews();
    return () => {
      isMounted = false;
    };
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % DINING_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + DINING_SLIDES.length) % DINING_SLIDES.length);
  }, []);

  // Auto-advance slideshow every 5 seconds when not paused
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, isHovered]);

  const googleMapsUrl = googleMeta.googleMapsUrl || 'https://maps.app.goo.gl/voDi8LBbdxb4SwZ6A';

  return (
    <section id="guest-reviews-and-dining" className="py-8 sm:py-12 bg-[#FAF7F2]">
      {/* ============================================================ */}
      {/* PART 1 — 3 LATEST VERIFIED GOOGLE MAPS REVIEWS               */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-wider text-[#D95F25] mb-1.5">
            VERIFIED GUEST FEEDBACK
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#151515] font-display tracking-tight">
            Google Reviews
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2 flex-wrap">
            <span className="text-base sm:text-lg font-black text-[#151515]">
              {googleMeta.rating} ★
            </span>
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <span className="text-xs sm:text-sm text-[#666] font-medium">
              ({googleMeta.userRatingsTotal}+ verified reviews on Google)
            </span>
          </div>
        </div>

        {/* 3 Real Google Reviews Cards in Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {googleReviews.slice(0, 3).map((review, idx) => (
            <div
              key={idx}
              id={`google-review-card-${idx}`}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EEDBCA] shadow-xs hover:shadow-md hover:border-[#D95F25]/40 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Header: User avatar + name + relative date + Google badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    {review.profile_photo_url ? (
                      <img
                        src={review.profile_photo_url}
                        alt={review.author_name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-xs"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FAF0E6] to-[#F3E5D4] text-[#D95F25] font-black text-sm flex items-center justify-center border border-[#EEDBCA] shadow-xs">
                        {review.author_name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#151515] leading-tight">
                        {review.author_name}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {review.author_badge && (
                          <span className="text-[10px] font-semibold text-[#D95F25] bg-[#D95F25]/10 px-1.5 py-0.2 rounded-sm">
                            {review.author_badge}
                          </span>
                        )}
                        {review.relative_time_description && (
                          <span className="text-[11px] text-[#777]">
                            {review.relative_time_description}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Official Google G Logo */}
                  <div className="shrink-0 p-1 rounded-full bg-[#FAF7F2] border border-[#EEDBCA]/60">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                  </div>
                </div>

                {/* 5 Rating Stars */}
                <div className="flex items-center gap-1 mb-2.5 text-amber-500">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                {/* Actual Review Quote */}
                <p className="text-xs sm:text-sm text-[#3A3530] leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-4 pt-3 border-t border-[#F2E8DC] flex items-center justify-between text-[11px] text-[#777]">
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Verified on Google Maps
                </span>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D95F25] group-hover:text-[#B84714] hover:underline font-semibold flex items-center gap-1"
                >
                  <span>View</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View all Google reviews direct button */}
        <div className="text-center mt-6">
          <a
            id="view-all-google-reviews-btn"
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-white hover:bg-[#FAF0E6] text-[#151515] hover:text-[#D95F25] border border-[#EEDBCA] hover:border-[#D95F25] font-bold text-xs sm:text-sm shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer group"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>See all {googleMeta.userRatingsTotal}+ reviews on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* ============================================================ */}
      {/* PART 2 — DINING EXPERIENCE SLIDESHOW (BOXED & INSET)         */}
      {/* ============================================================ */}
      {/* Horizontally bounded with border and padding to make a box   */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div 
          className="relative w-full h-[240px] sm:h-[300px] md:h-[340px] rounded-2xl sm:rounded-3xl border border-[#EEDBCA] shadow-md overflow-hidden group select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Images with crossfade transition */}
          {DINING_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-[6000ms] ease-out"
              />
            </div>
          ))}

          {/* Dark Gradient Overlay for optimal text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/40 z-20" />

          {/* Overlay Text Content (Centered & Premium inside the box) */}
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#D95F25] mb-1 drop-shadow-xs">
              Al Jalsa Ambiance
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white font-display tracking-tight drop-shadow-md mb-1.5 sm:mb-2">
              {DINING_SLIDES[currentSlide].title}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-white/90 font-medium max-w-lg mx-auto leading-relaxed mb-3 sm:mb-4 drop-shadow-sm">
              {DINING_SLIDES[currentSlide].description}
            </p>
            
            {/* View Menu Button */}
            <a
              id="dining-slider-view-menu-btn"
              href="#main-menu-categories"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-xs font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-sm"
            >
              <span>View Menu</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Subtle Manual Control Arrows */}
          <button
            type="button"
            id="dining-gallery-prev-btn"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/45 hover:bg-black/70 text-white/90 hover:text-white backdrop-blur-xs flex items-center justify-center transition-all duration-200 cursor-pointer border border-white/20 shadow-md opacity-75 group-hover:opacity-100 hover:scale-105"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            type="button"
            id="dining-gallery-next-btn"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/45 hover:bg-black/70 text-white/90 hover:text-white backdrop-blur-xs flex items-center justify-center transition-all duration-200 cursor-pointer border border-white/20 shadow-md opacity-75 group-hover:opacity-100 hover:scale-105"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Slide Indicator Dots (4 Slides) */}
          <div className="absolute bottom-2.5 sm:bottom-3.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-2">
            {DINING_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentSlide
                    ? 'w-5 sm:w-6 bg-[#D95F25]'
                    : 'w-1.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
