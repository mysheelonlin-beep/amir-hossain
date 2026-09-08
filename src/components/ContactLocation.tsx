import { 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  MessageCircle, 
  Navigation, 
  ExternalLink,
  Calendar,
  Sparkles
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ContactLocationProps {
  onOrderNow: () => void;
  onReserveTable: () => void;
}

export default function ContactLocation({ onOrderNow, onReserveTable }: ContactLocationProps) {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D95F25] uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#D95F25]" />
            <span>VISIT US OR ORDER ONLINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#151515] font-display">
            Find Al Jalsa Mandi
          </h2>
          <p className="text-base text-[#77716B] mt-2">
            Located in Muwailah, Sharjah, UAE. Open 7 days a week for dine-in, takeaway, and rapid home delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Contact & Hours Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Address & Direct Actions */}
            <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-7 border border-[#E7E0D8]">
              <div className="flex items-start gap-3.5 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#D95F25]/10 text-[#D95F25] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#151515] font-display">Our Restaurant Location</h3>
                  <p className="text-sm text-[#554F49] mt-0.5 leading-relaxed">
                    {RESTAURANT_INFO.address}, {RESTAURANT_INFO.neighborhood}
                  </p>
                  <p className="text-xs text-[#77716B] mt-0.5">{RESTAURANT_INFO.city}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent('Al Jalsa Mandi Restaurant Muwailah Sharjah UAE')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-[#E7E0D8] hover:border-[#D95F25] text-xs font-bold text-[#151515] hover:text-[#D95F25] transition-all shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#D95F25]" />
                  <span>Get Directions</span>
                </a>

                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-[#E7E0D8] hover:border-[#D95F25] text-xs font-bold text-[#151515] hover:text-[#D95F25] transition-all shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D95F25]" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-7 border border-[#E7E0D8]">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#D99A3D]/15 text-[#D99A3D] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#151515] font-display">Opening Hours</h3>
                  <p className="text-xs text-[#77716B]">Serving lunch, dinner & late-night feasts</p>
                </div>
              </div>

              <div className="space-y-2 text-xs border-t border-[#E7E0D8] pt-4">
                <div className="flex justify-between items-center py-1">
                  <span className="font-semibold text-[#151515]">Sunday – Thursday:</span>
                  <span className="font-bold text-[#D95F25]">{RESTAURANT_INFO.openingHours.weekdays}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="font-semibold text-[#151515]">Friday – Saturday:</span>
                  <span className="font-bold text-[#D95F25]">{RESTAURANT_INFO.openingHours.weekends}</span>
                </div>
              </div>
            </div>

            {/* Instant WhatsApp Order Card */}
            <div className="bg-[#151515] text-white rounded-3xl p-6 sm:p-7 border border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">WhatsApp Direct Order</h4>
                  <p className="text-xs text-white/70">Chat with our hosting team</p>
                </div>
              </div>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Al%20Jalsa%20Mandi,%20I%20would%20like%20to%20place%20an%20order.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-colors"
              >
                Chat Now
              </a>
            </div>
          </div>

          {/* Right Interactive Map Showcase (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-full min-h-[380px] rounded-3xl overflow-hidden border border-[#E7E0D8] shadow-lg bg-[#EAE5DF]">
              {/* Styled Interactive / Visual Map */}
              <iframe
                title="Al Jalsa Mandi Restaurant Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14439.400508605485!2d55.2530188!3d25.2078696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f426210f92ff7%3A0xb366a6a117282f6e!2sJumeirah%202%20-%20Dubai!5e0!3m2!1sen!2sae!4v1710000000000!5m2!1sen!2sae"
                className="w-full h-full min-h-[400px] border-0 grayscale-[20%] contrast-[105%]"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Overlay Marker Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-[#E7E0D8] max-w-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D95F25] animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D95F25]">
                    Al Jalsa Mandi Branch
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#151515] font-display">
                  Al Wasl Road, Jumeirah 2, Dubai
                </h4>
                <p className="text-[11px] text-[#77716B] mt-0.5">
                  Valet parking available • Family Majlis seating
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={onOrderNow}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-[#D95F25] hover:bg-[#C94F1F] text-white text-xs font-bold text-center transition-colors"
                  >
                    Order Delivery
                  </button>
                  <button
                    onClick={onReserveTable}
                    className="py-1.5 px-3 rounded-lg bg-[#FAF7F2] border border-[#E7E0D8] hover:border-[#D95F25] text-xs font-semibold text-[#151515] transition-colors"
                  >
                    Book Table
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
