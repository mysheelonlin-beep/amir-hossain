import { useState } from 'react';
import { Tag, Check, Users, ShoppingBag, Clock, Sparkles } from 'lucide-react';
import { SPECIAL_OFFERS } from '../data/restaurantData';
import { SpecialOffer, Dish } from '../types';

interface SpecialOffersProps {
  onAddOfferToCart: (offer: SpecialOffer) => void;
}

export default function SpecialOffers({ onAddOfferToCart }: SpecialOffersProps) {
  const [claimedId, setClaimedId] = useState<string | null>(null);

  const handleClaim = (offer: SpecialOffer) => {
    onAddOfferToCart(offer);
    setClaimedId(offer.id);
    setTimeout(() => {
      setClaimedId(null);
    }, 1500);
  };

  return (
    <section id="offers" className="py-16 sm:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D95F25] uppercase tracking-wider mb-2">
            <Tag className="w-3.5 h-3.5" />
            <span>Limited Time Value Meals</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#151515] font-display">
            Special Offers & Feasts
          </h2>
          <p className="text-base text-[#77716B] mt-2">
            Signature feasts bundled with handcrafted sides and desserts at exclusive gathering prices.
          </p>
        </div>

        {/* 3 Offer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {SPECIAL_OFFERS.map((offer) => {
            const isClaimed = claimedId === offer.id;

            return (
              <div
                key={offer.id}
                className="group rounded-3xl bg-white border border-[#E7E0D8] hover:border-[#D95F25]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Offer Image */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#F2ECE4]">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                  {/* Discount Badge */}
                  <div className="absolute top-3.5 left-3.5 bg-[#D95F25] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {offer.discountBadge}
                  </div>

                  {/* Serving Size */}
                  <div className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur-xs text-[#151515] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                    <Users className="w-3.5 h-3.5 text-[#D95F25]" />
                    <span>{offer.serves}</span>
                  </div>

                  {/* Subtitle tag */}
                  <div className="absolute bottom-3 left-3.5 text-white text-xs font-medium drop-shadow-sm">
                    {offer.subtitle}
                  </div>
                </div>

                {/* Offer Body */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-bold text-[#151515] group-hover:text-[#D95F25] transition-colors font-display">
                      {offer.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#77716B] mt-1.5 leading-relaxed">
                      {offer.description}
                    </p>

                    {/* What's Included List */}
                    <div className="mt-4 pt-4 border-t border-[#E7E0D8]">
                      <span className="text-[11px] font-bold text-[#77716B] uppercase tracking-wider block mb-2">
                        Included in Feast:
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#554F49]">
                        {offer.itemsIncluded.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[#D95F25] flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-6 mt-6 border-t border-[#E7E0D8] flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-black text-[#D95F25]">
                          AED {offer.price}
                        </span>
                        <span className="text-xs text-[#77716B] line-through">
                          AED {offer.originalPrice}
                        </span>
                      </div>
                      <span className="text-[11px] text-emerald-600 font-bold block">
                        Save AED {offer.originalPrice - offer.price}
                      </span>
                    </div>

                    <button
                      onClick={() => handleClaim(offer)}
                      className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm ${
                        isClaimed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#D95F25] hover:bg-[#C94F1F] text-white shadow-[#D95F25]/20 hover:shadow-md'
                      }`}
                    >
                      {isClaimed ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Claimed!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Claim Offer</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
