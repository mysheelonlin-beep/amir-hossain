import { useState } from 'react';
import { ArrowRight, Tag, Copy, Check, Sparkles, Users } from 'lucide-react';
import { familyMandiImg } from '../data/restaurantData';

interface PromoBannerProps {
  onViewOffers: () => void;
}

export default function PromoBanner({ onViewOffers }: PromoBannerProps) {
  const [copied, setCopied] = useState(false);
  const promoCode = 'JALSA20';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#151515] text-white overflow-hidden shadow-2xl border border-white/10">
          {/* Subtle Arabic geometric backdrop pattern */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#D99A3D_1px,transparent_1px)] [background-size:20px_20px]" 
            aria-hidden="true" 
          />

          {/* Radial warm lighting glow */}
          <div 
            className="absolute -top-32 -left-32 w-96 h-96 bg-[#D95F25]/20 rounded-full blur-3xl pointer-events-none" 
            aria-hidden="true" 
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 p-8 sm:p-12 lg:p-14">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Offer Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D95F25]/20 border border-[#D95F25]/40 text-[#D99A3D] text-xs font-bold tracking-wider uppercase mb-5 select-none">
                <Sparkles className="w-3.5 h-3.5" />
                <span>LIMITED TIME FAMILY GATHERING OFFER</span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display leading-tight mb-4 tracking-tight">
                Bring the Family Together &{' '}
                <span className="text-[#D95F25]">Save</span>
              </h2>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-xl mb-8">
                Enjoy more mandi, more sharing, and more value on selected family meals. Freshly prepared, loaded with golden spiced meats, and designed to gather everyone around the platter.
              </p>

              {/* Promo Code & Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                {/* Promo Code Pill with Copy */}
                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md">
                  <Tag className="w-4 h-4 text-[#D99A3D]" />
                  <span className="text-xs text-white/70">Use Code:</span>
                  <span className="font-mono font-bold text-sm tracking-wider text-white">
                    {promoCode}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="ml-2 p-1.5 rounded-lg bg-white/10 hover:bg-[#D95F25] text-white/90 hover:text-white transition-colors"
                    title="Copy promo code"
                    aria-label="Copy promo code"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Primary CTA button */}
                <button
                  onClick={onViewOffers}
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#D95F25] hover:bg-[#C94F1F] active:scale-[0.98] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#D95F25]/30 transition-all duration-200"
                >
                  <span>View Offers</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Sub-note */}
              <span className="text-xs text-white/50 mt-4 block">
                * Valid on Family Platters and Diwan Feasts for online delivery & dine-in.
              </span>
            </div>

            {/* Right Photography Column */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 shadow-2xl group">
                <img
                  src={familyMandiImg}
                  alt="Al Jalsa Royal Family Mandi Feast Platter"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Floating Tag inside image */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 bg-[#D95F25] text-white font-bold px-3 py-1 rounded-full shadow-md">
                    <Users className="w-3.5 h-3.5" />
                    Serves 4–6 Guests
                  </span>
                  <span className="bg-black/60 backdrop-blur-xs text-white px-2.5 py-1 rounded-md font-medium">
                    20% Discount Applied
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
