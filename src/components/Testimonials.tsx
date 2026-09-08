import { Star, Quote, CheckCircle2, MessageSquare } from 'lucide-react';
import { TESTIMONIALS } from '../data/restaurantData';

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#E7E0D8]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D95F25] uppercase tracking-wider mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>GENUINE EXPERIENCES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#151515] font-display">
            What Our Guests Say
          </h2>
          <p className="text-base text-[#77716B] mt-2">
            Read firsthand impressions from families, food lovers, and travelers who dine at Al Jalsa.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E0D8] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* 5-Star Rating & Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#D99A3D]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D99A3D]" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#77716B]">{review.date}</span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#443E38] leading-relaxed italic mb-6">
                  "{review.comment}"
                </p>
              </div>

              {/* Author and Dish Ordered */}
              <div className="pt-4 border-t border-[#E7E0D8]">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[#E7E0D8]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-[#151515] truncate">
                        {review.name}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    </div>
                    <span className="text-[11px] text-[#77716B] block truncate">
                      {review.role}
                    </span>
                  </div>
                </div>

                <div className="mt-3 bg-[#FAF7F2] rounded-lg px-2.5 py-1 text-[11px] text-[#D95F25] font-semibold truncate">
                  Ordered: {review.dishOrdered}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
