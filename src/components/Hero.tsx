import { 
  ArrowRight, 
  Star, 
  Flame, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight,
  Award
} from 'lucide-react';
import { heroMandiImg } from '../data/restaurantData';

interface HeroProps {
  onOrderNow: () => void;
  onExploreMenu: () => void;
}

export default function Hero({ onOrderNow, onExploreMenu }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F5EFE6] to-[#FAF7F2] pt-8 pb-14 md:pt-14 md:pb-20"
    >
      {/* Subtle Arabic geometric backdrop accent */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#C94F1F_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* LEFT CONTENT COLUMN (6 cols on lg) */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D95F25]/10 border border-[#D95F25]/20 text-[#C94F1F] text-xs font-bold tracking-wider uppercase mb-5 select-none">
              <Sparkles className="w-3.5 h-3.5 text-[#D99A3D]" />
              <span>AUTHENTIC MIDDLE EASTERN FLAVORS</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#151515] leading-[1.12] tracking-tight mb-5 font-display">
              Authentic Mandi, Made to{' '}
              <span className="text-[#D95F25] relative inline-block">
                Bring Everyone
                <svg
                  className="absolute -bottom-1.5 left-0 w-full text-[#D99A3D]/40 h-2 -z-10"
                  viewBox="0 0 200 8"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path d="M0 6C50 1 150 1 200 6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>{' '}
              Together
            </h1>

            {/* Supporting Subtext */}
            <p className="text-base sm:text-lg text-[#554F49] leading-relaxed max-w-xl mb-7 font-normal">
              Experience rich Arabian flavors, slow-cooked tender meats, aromatic basmati rice smoked over charcoal pits, and freshly prepared mandi made for unforgettable gatherings with family and friends.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-9">
              <button
                id="hero-primary-cta"
                onClick={onOrderNow}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#D95F25] hover:bg-[#C94F1F] active:scale-[0.98] text-white font-bold text-base shadow-lg shadow-[#D95F25]/25 hover:shadow-[#D95F25]/40 transition-all duration-200"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-secondary-cta"
                onClick={onExploreMenu}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#F2ECE4] border border-[#E7E0D8] text-[#252525] font-semibold text-base shadow-xs hover:border-[#D95F25]/40 transition-all duration-200"
              >
                <span>Explore Menu</span>
                <ChevronRight className="w-4 h-4 text-[#77716B]" />
              </button>
            </div>

            {/* Trust Row & Rating */}
            <div className="pt-6 border-t border-[#E7E0D8] w-full">
              <div className="flex flex-wrap items-center gap-y-3 gap-x-6 sm:gap-x-8">
                {/* 5-Star Social Proof */}
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2 overflow-hidden">
                    <img
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                      alt="Guest avatar"
                      referrerPolicy="no-referrer"
                    />
                    <img
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                      alt="Guest avatar"
                      referrerPolicy="no-referrer"
                    />
                    <img
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80"
                      alt="Guest avatar"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-1 text-[#D99A3D]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#D99A3D]" />
                      ))}
                      <span className="ml-1 text-xs font-bold text-[#151515]">4.9</span>
                    </div>
                    <p className="text-xs text-[#77716B] font-medium">Loved by 12,000+ Food Lovers</p>
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="hidden sm:block h-8 w-px bg-[#E7E0D8]" />

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#554F49] font-medium">
                  <span className="inline-flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-[#D95F25]" />
                    Freshly Prepared
                  </span>
                  <span className="text-[#E7E0D8]">•</span>
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D99A3D]" />
                    100% Halal
                  </span>
                  <span className="text-[#E7E0D8]">•</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#D95F25]" />
                    Fast 35-Min Delivery
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FOOD PHOTOGRAPHY COLUMN (6 cols on lg) */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex justify-center items-center">
            {/* Ambient warm glow behind food platter */}
            <div 
              className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#D95F25]/20 via-[#D99A3D]/20 to-transparent blur-3xl -z-10" 
              aria-hidden="true" 
            />

            {/* Main Platter Showcase Container */}
            <div className="relative w-full max-w-[520px] aspect-[4/3] rounded-3xl p-2.5 sm:p-3 bg-white/70 backdrop-blur-xs border border-[#E7E0D8] shadow-xl shadow-black/5 group">
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <img
                  src={heroMandiImg}
                  alt="Al Jalsa Traditional Arabian Chicken Mandi Platter"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                
                {/* Subtle gradient overlay at bottom of image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                {/* Dish caption tag */}
                <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#D99A3D] block">
                      Signature House Special
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-display leading-tight drop-shadow-sm">
                      Traditional Roasted Chicken Mandi
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#D95F25] text-white text-xs font-bold shadow-md">
                    AED 48
                  </span>
                </div>
              </div>

              {/* FLOATING CARD 1: Top-Right (Fast Delivery) */}
              <div className="absolute -top-3 sm:-top-5 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-lg shadow-black/8 border border-[#E7E0D8] flex items-center gap-3 transition-transform hover:-translate-y-1 select-none animate-fadeIn">
                <div className="w-10 h-10 rounded-xl bg-[#D95F25]/10 text-[#D95F25] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-[#151515]">Fast Delivery</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <p className="text-[11px] text-[#77716B]">Hot at your door in 30-45m</p>
                </div>
              </div>

              {/* FLOATING CARD 2: Bottom-Left (Fresh & Hot) */}
              <div className="absolute -bottom-4 sm:-bottom-6 -left-2 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-lg shadow-black/8 border border-[#E7E0D8] flex items-center gap-3 transition-transform hover:-translate-y-1 select-none">
                <div className="w-10 h-10 rounded-xl bg-[#D99A3D]/15 text-[#C94F1F] flex items-center justify-center flex-shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#151515] block">Fresh & Steaming Hot</span>
                  <p className="text-[11px] text-[#77716B]">Firewood pit smoked daily</p>
                </div>
              </div>

              {/* FLOATING BADGE 3: Top-Left (Top Rated) */}
              <div className="hidden sm:flex absolute -top-3 -left-3 bg-[#151515] text-white rounded-full px-3.5 py-1.5 shadow-md items-center gap-1.5 border border-white/10 select-none">
                <Award className="w-3.5 h-3.5 text-[#D99A3D]" />
                <span className="text-xs font-bold">#1 Rated Mandi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
