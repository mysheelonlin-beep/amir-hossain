import { ArrowRight, Flame, Heart, Sparkles, Award } from 'lucide-react';
import { ABOUT_STATS, heroMandiImg } from '../data/restaurantData';

interface AboutSectionProps {
  onReserveTable: () => void;
  onExploreMenu: () => void;
}

export default function AboutSection({ onReserveTable, onExploreMenu }: AboutSectionProps) {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 bg-[#D99A3D]/5 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Visual Storytelling & Image Mosaic */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#E7E0D8] shadow-2xl shadow-black/5 aspect-[4/3] group">
              <img
                src={heroMandiImg}
                alt="Traditional firewood Mandi preparation at Al Jalsa"
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Floating Story Pill */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E7E0D8] shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D95F25]/10 text-[#D95F25] flex items-center justify-center">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#151515] block">Firewood Pit Cooking</span>
                    <p className="text-[11px] text-[#77716B]">Smoked in subterranean clay ovens</p>
                  </div>
                </div>

                <span className="text-xs font-black text-[#D95F25] px-2.5 py-1 bg-[#D95F25]/10 rounded-lg">
                  Est. 2011
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Editable Stats */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D95F25] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D99A3D]" />
              <span>OUR HERITAGE & PASSION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#151515] font-display leading-[1.15] mb-5">
              A Taste of Tradition,{' '}
              <span className="text-[#D95F25]">Served With Heart</span>
            </h2>

            <p className="text-base text-[#554F49] leading-relaxed mb-4">
              At <strong className="text-[#151515]">Al Jalsa Mandi</strong>, every dish is rooted in centuries-old Arabian culinary rituals. The word <em>Al Jalsa</em> means "The Gathering" — a sacred tradition where families, friends, and travelers assemble around a single grand platter to share food, laughter, and hospitality.
            </p>

            <p className="text-base text-[#554F49] leading-relaxed mb-8">
              We never cut corners. Our whole meats are marinated in authentic dry rubs of green cardamom, cloves, dried lime, and saffron before slow-steaming over aromatic wood embers. The juices naturally drip down onto long-grain basmati rice, creating an unmistakable smoky, rich flavor profile.
            </p>

            {/* Editable Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 w-full py-6 border-y border-[#E7E0D8] mb-8">
              {ABOUT_STATS.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-black text-[#D95F25] font-display">
                    {stat.value}
                  </span>
                  <span className="text-xs font-bold text-[#151515] mt-0.5">{stat.label}</span>
                  <span className="text-[11px] text-[#77716B] leading-tight mt-0.5">
                    {stat.description}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onReserveTable}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#151515] hover:bg-[#252525] text-white text-sm font-bold shadow-md transition-all"
              >
                <span>Reserve Table / Majlis</span>
                <ArrowRight className="w-4 h-4 text-[#D99A3D]" />
              </button>

              <button
                onClick={onExploreMenu}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FAF7F2] hover:bg-[#F2ECE4] border border-[#E7E0D8] text-[#252525] text-sm font-semibold transition-all"
              >
                <span>Explore Full Menu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
