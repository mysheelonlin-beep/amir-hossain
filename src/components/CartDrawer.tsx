import { useState, type FormEvent } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Check, 
  Truck, 
  Sparkles 
} from 'lucide-react';
import { CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
  appliedDiscount: number;
  onApplyPromoCode: (code: string) => { success: boolean; message: string };
  appliedPromoCode: string | null;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedDiscount,
  onApplyPromoCode,
  appliedPromoCode,
}: CartDrawerProps) {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + item.itemTotal, 0);
  const discountAmount = Math.round(rawSubtotal * appliedDiscount);
  const subtotalAfterDiscount = rawSubtotal - discountAmount;
  const isFreeDelivery = subtotalAfterDiscount >= RESTAURANT_INFO.freeDeliveryThreshold;
  const deliveryFee = items.length === 0 ? 0 : isFreeDelivery ? 0 : 12;
  const grandTotal = subtotalAfterDiscount + deliveryFee;

  const handleApplyPromo = (e: FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = onApplyPromoCode(promoInput);
    setPromoMessage({ text: res.message, isError: !res.success });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-slideInRight"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div className="p-5 border-b border-[#E7E0D8] flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#D95F25]/10 text-[#D95F25] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#151515] font-display">Your Mandi Order</h3>
              <span className="text-xs text-[#77716B]">
                {items.length} {items.length === 1 ? 'item' : 'items'} in basket
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full text-[#77716B] hover:text-[#151515] hover:bg-[#E7E0D8]/60 flex items-center justify-center transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-[#E7E0D8]">
          {items.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#FAF7F2] text-[#D95F25] flex items-center justify-center mb-3">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <h4 className="text-base font-bold text-[#151515]">Your basket is empty</h4>
              <p className="text-xs text-[#77716B] mt-1 max-w-xs">
                Explore our authentic roasted mandi platters and customer favorites to start your order.
              </p>
              <button
                onClick={onClose}
                className="mt-5 px-5 py-2.5 rounded-full bg-[#D95F25] text-white text-xs font-bold shadow-md hover:bg-[#C94F1F] transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={idx} className="pt-4 first:pt-0 flex items-start gap-3.5 group">
                <img
                  src={item.dish.image}
                  alt={item.dish.name}
                  className="w-18 h-18 rounded-2xl object-cover flex-shrink-0 bg-[#F2ECE4] border border-[#E7E0D8]"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-[#151515] truncate font-display">
                      {item.dish.name}
                    </h4>
                    <button
                      onClick={() => onRemoveItem(idx)}
                      className="text-[#77716B] hover:text-rose-600 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                    <span className="text-[11px] font-semibold text-[#D95F25] bg-[#D95F25]/10 px-2 py-0.5 rounded capitalize">
                      {item.selectedPortion} Portion
                    </span>
                    {item.selectedRice && (
                      <span className="text-[10px] text-[#77716B] bg-[#FAF7F2] px-1.5 py-0.5 rounded border border-[#E7E0D8]">
                        {item.selectedRice}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 bg-[#FAF7F2] px-2 py-1 rounded-full border border-[#E7E0D8]">
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[#77716B] hover:text-[#151515]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-[#151515] w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[#77716B] hover:text-[#151515]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-sm font-black text-[#151515]">
                      AED {item.itemTotal}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Bottom Summary & Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#E7E0D8] bg-[#FAF7F2] space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-[#77716B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Promo code (e.g. JALSA20)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-[#E7E0D8] text-xs uppercase font-mono text-[#151515] placeholder-[#77716B] focus:outline-none focus:border-[#D95F25]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#151515] hover:bg-[#252525] text-white text-xs font-bold transition-colors"
              >
                Apply
              </button>
            </form>

            {promoMessage && (
              <p className={`text-xs ${promoMessage.isError ? 'text-rose-600' : 'text-emerald-600'}`}>
                {promoMessage.text}
              </p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#554F49]">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-[#151515]">AED {rawSubtotal}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount ({appliedPromoCode}):</span>
                  <span>- AED {discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#D95F25]" />
                  Delivery Fee:
                </span>
                {isFreeDelivery ? (
                  <span className="text-emerald-600 font-bold">FREE</span>
                ) : (
                  <span className="font-semibold text-[#151515]">AED {deliveryFee}</span>
                )}
              </div>

              {!isFreeDelivery && (
                <p className="text-[11px] text-[#77716B] pt-0.5">
                  Add AED {RESTAUANT_THRESHOLD_DIFF(subtotalAfterDiscount)} more for Free Delivery!
                </p>
              )}

              <div className="pt-2 border-t border-[#E7E0D8] flex justify-between items-baseline text-sm">
                <span className="font-bold text-[#151515]">Grand Total:</span>
                <span className="text-xl font-black text-[#D95F25]">AED {grandTotal}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 px-4 rounded-full bg-[#D95F25] hover:bg-[#C94F1F] active:scale-[0.98] text-white font-bold text-sm shadow-md shadow-[#D95F25]/30 flex items-center justify-center gap-2 transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function RESTAUANT_THRESHOLD_DIFF(current: number) {
  return Math.max(0, 100 - current);
}
