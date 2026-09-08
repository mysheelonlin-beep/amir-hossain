import { Users, Sparkles, Coffee, ShieldCheck, Calendar, ArrowRight } from 'lucide-react';
import { restaurantInteriorImg } from '../data/restaurantData';

interface RestaurantExperienceProps {
  onReserveTable: () => void;
}

export default function RestaurantExperience({ onReserveTable }: RestaurantExperienceProps) {
  const highlights = [
    {
      title: 'Traditional Floor Majlis & Private Rooms',
      desc: 'Authentic cushioned floor seating for private family gatherings and lively friend reunions.',
      icon: Users,
    },
    {
      title: 'Warm Arabic Hospitality',
      desc: 'Complimentary cardamom Gahwa (Arabic coffee) and fresh dates served to every guest upon arrival.',
      icon: Coffee,
    },
    {
      title: 'Grand Group Platters',
      desc: 'Mandi served in traditional large brass platters meant to be shared in authentic fellowship.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="experience" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D95F25] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D99A3D]" />
              <span>DINE-IN ATMOSPHERE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#151515] font-display leading-[1.15] mb-5">
              More Than a Meal —{' '}
              <span className="text-[#D95F25]">It's a Gathering</span>
            </h2>

            <p className="text-base text-[#554F49] leading-relaxed mb-8">
              Step inside Al Jalsa and experience an authentic Middle Eastern oasis. From glowing copper lanterns and carved mashrabiya woodwork to our spacious family majlis dining suites, we create an ambiance where every conversation lingers and every meal is celebrated.
            </p>

            {/* Highlights List */}
            <div className="space-y-4 sm:space-y-5 mb-8">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E7E0D8] text-[#D95F25] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#151515]">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-[#77716B] mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Button */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onReserveTable}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D95F25] hover:bg-[#C94F1F] text-white text-sm font-bold shadow-md shadow-[#D95F25]/30 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Majlis or Table</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#E7E0D8] shadow-2xl aspect-[4/3] group">
              <img
                src={restaurantInteriorImg}
                alt="Al Jalsa Mandi Dining Hall and Majlis"
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#D99A3D] uppercase tracking-wider block">
                    Jumeirah, Dubai
                  </span>
                  <h4 className="text-lg font-bold font-display">Al Jalsa Grand Dining Hall</h4>
                </div>
                <span className="text-xs bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white font-medium border border-white/30">
                  Walk-ins & Bookings
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
