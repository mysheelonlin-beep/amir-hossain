import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Instagram, 
  Facebook, 
  Youtube 
} from 'lucide-react';
import Logo from './Logo';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  onOpenOrderNow?: () => void;
  onOpenReservation?: () => void;
}

export default function Footer({ onOpenOrderNow, onOpenReservation }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#151515] text-[#FAF7F2] relative overflow-hidden border-t border-white/10 font-sans">
      {/* Subtle Arabic geometric background pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#D99A3D_1px,transparent_1px)] [background-size:24px_24px]" 
        aria-hidden="true" 
      />

      {/* Main Footer Info Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Brand & Bio (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <Logo variant="dark" size="lg" className="mb-4" />
            <p className="text-sm text-white/70 leading-relaxed mb-6 max-w-lg">
              Authentic mandi and Middle Eastern flavors prepared fresh for every table. Slow-cooked meats, firewood-smoked fragrant basmati, and timeless Arabian hospitality in Muweilah, Sharjah.
            </p>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-[#D99A3D] font-medium mb-6">
              <ShieldCheck className="w-4 h-4 text-[#D99A3D]" />
              <span>100% Certified Fresh Halal Meats</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { name: 'Instagram', icon: Instagram, href: '#' },
                { name: 'Facebook', icon: Facebook, href: '#' },
                { name: 'Youtube', icon: Youtube, href: '#' },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={`Follow Al Jalsa on ${s.name}`}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D95F25] text-white flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Visit Us & Contact Details (5 cols) */}
          <div className="lg:col-span-5 bg-white/5 p-6 rounded-2xl border border-white/10">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#D99A3D] mb-4">
              Visit Us &amp; Contact
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm text-white/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D95F25] flex-shrink-0 mt-0.5" />
                <a 
                  href={RESTAURANT_INFO.googleMapsUrl || "https://maps.app.goo.gl/voDi8LBbdxb4SwZ6A"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#D95F25] transition-colors"
                >
                  {RESTAURANT_INFO.address}, {RESTAURANT_INFO.neighborhood}, {RESTAURANT_INFO.city}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D95F25] flex-shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-[#D95F25] transition-colors font-medium">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D95F25] flex-shrink-0" />
                <span>{RESTAURANT_INFO.email}</span>
              </div>
              <div className="flex items-start gap-3 pt-3 border-t border-white/10">
                <Clock className="w-4 h-4 text-[#D99A3D] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Opening Hours:</span>
                  <span className="text-white/70">Daily: 11:30 AM – 01:30 AM</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Row */}
      <div className="border-t border-white/10 py-6 text-xs text-white/50 relative z-10 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {currentYear} Al Jalsa Mandi Restaurant. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Delivery Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
