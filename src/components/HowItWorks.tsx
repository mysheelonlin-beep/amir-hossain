import { 
  UtensilsCrossed, 
  Sliders, 
  CreditCard, 
  Smile, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ORDERING_STEPS } from '../data/restaurantData';

export default function HowItWorks() {
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5" />;
      case 'Sliders':
        return <Sliders className="w-5 h-5" />;
      case 'CreditCard':
        return <CreditCard className="w-5 h-5" />;
      case 'Smile':
        return <Smile className="w-5 h-5" />;
      default:
        return <UtensilsCrossed className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#E7E0D8]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D95F25] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D99A3D]" />
            <span>EFFORTLESS CONVENIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#151515] font-display">
            Order Your Favorite Mandi in Minutes
          </h2>
          <p className="text-base text-[#77716B] mt-2">
            From our firewood pits straight to your dining table in four seamless steps.
          </p>
        </div>

        {/* 4 Steps Container */}
        <div className="relative">
          {/* Desktop Connecting Line behind cards */}
          <div 
            className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] h-0.5 -translate-y-6 bg-gradient-to-r from-[#D95F25]/20 via-[#D95F25] to-[#D99A3D]/20 -z-0"
            aria-hidden="true" 
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {ORDERING_STEPS.map((step, idx) => (
              <div
                key={step.number}
                className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E0D8] hover:border-[#D95F25]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
              >
                {/* Step Number Badge */}
                <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E7E0D8] text-[#D95F25] group-hover:bg-[#D95F25] group-hover:text-white group-hover:border-[#D95F25] flex items-center justify-center font-black text-base transition-all duration-300 mb-5 shadow-xs">
                  {getStepIcon(step.icon)}
                </div>

                <span className="text-[11px] font-mono font-bold text-[#D99A3D] uppercase tracking-widest mb-1.5">
                  Step {step.number}
                </span>

                <h3 className="text-lg font-bold text-[#151515] mb-2 font-display">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#77716B] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
