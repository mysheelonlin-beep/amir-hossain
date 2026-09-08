import { ShoppingBag, Utensils, Phone, Calendar, Flame } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface MobileSalesBarProps {
  cartCount: number;
  onOpenCart: () => void;
  onExploreMenu: () => void;
  onOpenReservation: () => void;
}

export default function MobileSalesBar({
  cartCount,
  onOpenCart,
  onExploreMenu,
  onOpenReservation,
}: MobileSalesBarProps) {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E7E0D8] px-4 py-2.5 shadow-2xl safe-area-bottom">
      <div className="flex items-center justify-around gap-2 max-w-md mx-auto">
        {/* Menu link */}
        <button
          onClick={onExploreMenu}
          className="flex flex-col items-center justify-center flex-1 py-1 text-[#77716B] hover:text-[#D95F25] transition-colors"
        >
          <Utensils className="w-4.5 h-4.5 mb-0.5" />
          <span className="text-[10px] font-bold">Menu</span>
        </button>

        {/* Order / Cart Center Highlight button */}
        <button
          onClick={onOpenCart}
          className="relative flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#D95F25] text-white shadow-lg shadow-[#D95F25]/30 active:scale-95 transition-all flex-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="text-xs font-bold whitespace-nowrap">Order Mandi</span>
          {cartCount > 0 && (
            <span className="bg-white text-[#D95F25] text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs">
              {cartCount}
            </span>
          )}
        </button>

        {/* Call quick action */}
        <a
          href={`tel:${RESTAURANT_INFO.phone}`}
          className="flex flex-col items-center justify-center flex-1 py-1 text-[#77716B] hover:text-[#D95F25] transition-colors"
        >
          <Phone className="w-4.5 h-4.5 mb-0.5" />
          <span className="text-[10px] font-bold">Call Us</span>
        </a>

        {/* Reserve action */}
        <button
          onClick={onOpenReservation}
          className="flex flex-col items-center justify-center flex-1 py-1 text-[#77716B] hover:text-[#D95F25] transition-colors"
        >
          <Calendar className="w-4.5 h-4.5 mb-0.5" />
          <span className="text-[10px] font-bold">Reserve</span>
        </button>
      </div>
    </div>
  );
}
