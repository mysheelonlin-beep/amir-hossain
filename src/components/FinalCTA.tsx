import { ArrowRight, Flame, Sparkles, Clock, Phone } from 'lucide-react';
import { heroMandiImg, RESTAURANT_INFO } from '../data/restaurantData';

interface FinalCTAProps {
  onOrderNow: () => void;
  onViewMenu: () => void;
}

export default function FinalCTA({ onOrderNow, onViewMenu }: FinalCTAProps) {
  return (
    <section className="py-16 sm:py-24 bg-[#0D0D0D] text-white relative overflow-hidden">
      {/* Warm ambient radial lights */}
      <div 
        className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#D95F25]/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-[#151515] border border-white/10 p-8 sm:p-12 lg:p-16 overflow-hidden relative shadow-2xl">
          {/* Subtle Arabesque pattern */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#D99A3D_1px,transparent_1px)] [background-size:24px_24px]" 
            aria-hidden="true" 
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D95F25]/20 border border-[#D95F25]/30 text-[#D99A3D] text-xs font-bold tracking-wider uppercase mb-5 select-none">
                <Flame className="w-3.5 h-3.5" />
                <span>HOT & SMOKED TO ORDER</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display leading-[1.15] mb-4 tracking-tight">
                Ready for a{' '}
                <span className="text-[#D95F25]">Mandi Feast?</span>
              </h2>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-xl mb-8">
                Freshly prepared. Rich in flavor. Made for sharing. Order online right now and enjoy complimentary spicy daqoos, garlic labneh, and insulated hot delivery straight to your table.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-6">
                <button
                  id="final-cta-order-now"
                  onClick={onOrderNow}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#D95F25] hover:bg-[#C94F1F] active:scale-[0.98] text-white font-bold text-base shadow-xl shadow-[#D95F25]/30 transition-all duration-200"
                >
                  <span>Order Now</span>
                  <ArrowRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={onViewMenu}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-base transition-all duration-200"
                >
                  <span>View Menu</span>
                </button>
              </div>

              {/* Call support note */}
              <div className="flex items-center gap-2 text-xs text-white/60">
                <Phone className="w-3.5 h-3.5 text-[#D99A3D]" />
                <span>Prefer to order by phone? Call {RESTAURANT_INFO.phone}</span>
              </div>
            </div>

            {/* Right Food Visual */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden border border-white/15 shadow-2xl group">
                <img
                  src={heroMandiImg}
                  alt="Al Jalsa Signature Mandi Platter"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#D95F25] flex items-center justify-center text-white">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-white">Estimated Delivery</span>
                      <span className="text-[11px] text-[#D99A3D] font-medium">30–45 Mins Average</span>
                    </div>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
                    Live Kitchen
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
