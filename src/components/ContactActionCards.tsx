import { Phone, MapPin, MessageCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export default function ContactActionCards() {
  const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello Al Jalsa Mandi! I would like to order directly.'
  )}`;

  const mapsUrl = RESTAURANT_INFO.googleMapsUrl || 'https://maps.app.goo.gl/voDi8LBbdxb4SwZ6A';

  return (
    <section id="quick-contact-cards" className="relative z-20 mt-3 sm:mt-6 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mb-5 sm:mb-10">
      {/* 3 Dark Charcoal Action Cards in one horizontal line on all devices */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-5">
        
        {/* ============================================================ */}
        {/* CARD 1: CALL US                                              */}
        {/* ============================================================ */}
        <a
          id="quick-card-contact"
          href={`tel:${RESTAURANT_INFO.phone}`}
          className="group bg-[#181614] hover:bg-[#221E1A] rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 border border-[#2E2822] hover:border-[#D95F25] shadow-md hover:shadow-lg hover:shadow-[#D95F25]/15 transition-all duration-200 flex flex-col items-center justify-center text-center gap-1 sm:gap-2 cursor-pointer min-h-[88px] sm:min-h-[110px]"
        >
          {/* Orange Phone Icon */}
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-[#D95F25]/10 border border-[#D95F25]/20 flex items-center justify-center text-[#D95F25] group-hover:scale-110 group-hover:bg-[#D95F25] group-hover:text-white transition-all duration-200">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          </div>

          <h3 className="text-xs sm:text-sm md:text-base font-bold text-white tracking-tight whitespace-nowrap group-hover:text-[#D95F25] transition-colors">
            Call Us
          </h3>

          <p className="text-[10px] sm:text-xs text-stone-400 font-normal truncate max-w-full">
            {RESTAURANT_INFO.phone}
          </p>
        </a>

        {/* ============================================================ */}
        {/* CARD 2: WHATSAPP (Unified Orange Theme)                      */}
        {/* ============================================================ */}
        <a
          id="quick-card-whatsapp"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-[#181614] hover:bg-[#221E1A] rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 border border-[#2E2822] hover:border-[#D95F25] shadow-md hover:shadow-lg hover:shadow-[#D95F25]/15 transition-all duration-200 flex flex-col items-center justify-center text-center gap-1 sm:gap-2 cursor-pointer min-h-[88px] sm:min-h-[110px]"
        >
          {/* Orange WhatsApp Icon */}
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-[#D95F25]/10 border border-[#D95F25]/20 flex items-center justify-center text-[#D95F25] group-hover:scale-110 group-hover:bg-[#D95F25] group-hover:text-white transition-all duration-200">
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          </div>

          <h3 className="text-xs sm:text-sm md:text-base font-bold text-white tracking-tight whitespace-nowrap group-hover:text-[#D95F25] transition-colors">
            WhatsApp
          </h3>

          <p className="text-[10px] sm:text-xs text-stone-400 font-normal truncate max-w-full">
            Order directly
          </p>
        </a>

        {/* ============================================================ */}
        {/* CARD 3: LOCATION (Unified Orange Theme)                      */}
        {/* ============================================================ */}
        <a
          id="quick-card-location"
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-[#181614] hover:bg-[#221E1A] rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 border border-[#2E2822] hover:border-[#D95F25] shadow-md hover:shadow-lg hover:shadow-[#D95F25]/15 transition-all duration-200 flex flex-col items-center justify-center text-center gap-1 sm:gap-2 cursor-pointer min-h-[88px] sm:min-h-[110px]"
        >
          {/* Orange Location Icon */}
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-[#D95F25]/10 border border-[#D95F25]/20 flex items-center justify-center text-[#D95F25] group-hover:scale-110 group-hover:bg-[#D95F25] group-hover:text-white transition-all duration-200">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          </div>

          <h3 className="text-xs sm:text-sm md:text-base font-bold text-white tracking-tight whitespace-nowrap group-hover:text-[#D95F25] transition-colors">
            Location
          </h3>

          <p className="text-[10px] sm:text-xs text-stone-400 font-normal truncate max-w-full">
            Muwailah, Sharjah
          </p>
        </a>

      </div>
    </section>
  );
}
