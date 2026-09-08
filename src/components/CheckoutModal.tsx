import { useState, type FormEvent } from 'react';
import { 
  X, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  CreditCard, 
  Banknote, 
  Clock, 
  ShoppingBag, 
  Flame, 
  Truck, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onOrderCompleted: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  total,
  onOrderCompleted,
}: CheckoutModalProps) {
  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) return;
    const generatedOrderNo = 'JALSA-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(generatedOrderNo);
    setStep('confirmed');
    onOrderCompleted();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E7E0D8] my-8 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E7E0D8] bg-[#FAF7F2] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#D95F25]/10 text-[#D95F25] flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#151515] font-display">
                {step === 'form' ? 'Checkout & Delivery' : 'Order Placed!'}
              </h3>
              <span className="text-xs text-[#77716B]">
                {step === 'form' ? 'Fast hot thermal delivery across Dubai' : 'Your feast is being prepared'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full text-[#77716B] hover:text-[#151515] hover:bg-[#E7E0D8]/60 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5">
            {/* Order summary pill */}
            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E7E0D8] flex items-center justify-between text-xs">
              <span className="text-[#554F49]">
                {items.length} dishes • Est. 30–45 Mins
              </span>
              <span className="font-bold text-[#D95F25] text-sm">
                Total: AED {total}
              </span>
            </div>

            {/* Name and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-xs font-bold text-[#151515] uppercase tracking-wider block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rashid Al-Nuaimi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E7E0D8] text-xs text-[#252525] focus:outline-none focus:border-[#D95F25] focus:ring-1 focus:ring-[#D95F25]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#151515] uppercase tracking-wider block mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+971 50 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E7E0D8] text-xs text-[#252525] focus:outline-none focus:border-[#D95F25] focus:ring-1 focus:ring-[#D95F25]"
                />
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <label className="text-xs font-bold text-[#151515] uppercase tracking-wider block mb-1">
                Delivery Address (Villa / Apt, Street, Area) *
              </label>
              <textarea
                required
                rows={2}
                placeholder="e.g. Villa 14, Al Wasl Road, Jumeirah 2, Near Boxpark, Dubai"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E7E0D8] text-xs text-[#252525] focus:outline-none focus:border-[#D95F25] focus:ring-1 focus:ring-[#D95F25]"
              />
            </div>

            {/* Delivery notes */}
            <div>
              <label className="text-xs font-bold text-[#151515] uppercase tracking-wider block mb-1">
                Delivery Instructions (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Ring bell, leave with security, extra spicy daqoos"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E7E0D8] text-xs text-[#252525] focus:outline-none focus:border-[#D95F25]"
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="text-xs font-bold text-[#151515] uppercase tracking-wider block mb-2">
                Select Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-colors ${
                    paymentMethod === 'cash'
                      ? 'border-[#D95F25] bg-[#D95F25]/5 text-[#D95F25] font-bold'
                      : 'border-[#E7E0D8] text-[#554F49]'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-[#D95F25]" />
                  <div>
                    <span className="text-xs block">Cash on Delivery</span>
                    <span className="text-[10px] text-[#77716B] font-normal">Pay driver in AED</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-[#D95F25] bg-[#D95F25]/5 text-[#D95F25] font-bold'
                      : 'border-[#E7E0D8] text-[#554F49]'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#D99A3D]" />
                  <div>
                    <span className="text-xs block">Card on Delivery</span>
                    <span className="text-[10px] text-[#77716B] font-normal">Wireless POS machine</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-full bg-[#D95F25] hover:bg-[#C94F1F] active:scale-[0.98] text-white font-bold text-sm shadow-md shadow-[#D95F25]/30 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>Confirm Order • AED {total}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Order Confirmed View */
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-[#D99A3D] uppercase tracking-wider block mb-1">
                ORDER #{orderNumber}
              </span>
              <h3 className="text-2xl font-bold text-[#151515] font-display">
                Thank You, {name}!
              </h3>
              <p className="text-xs sm:text-sm text-[#77716B] mt-1.5 max-w-sm mx-auto">
                We've received your order and our pit masters are roasting your meats over fragrant firewood.
              </p>
            </div>

            {/* Simulated Order Tracker */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7E0D8] text-left space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#E7E0D8]">
                <span className="font-bold text-[#151515]">Live Delivery Status</span>
                <span className="text-[#D95F25] font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 30–45 Mins
                </span>
              </div>

              {/* Progress Steps */}
              <div className="space-y-3 pt-1">
                {[
                  { label: 'Order Confirmed & Sent to Kitchen', status: 'done', icon: CheckCircle2 },
                  { label: 'Slow Firewood Steaming in Tandoor', status: 'active', icon: Flame },
                  { label: 'Thermal Packaging & Driver Dispatch', status: 'pending', icon: Truck },
                  { label: 'Delivered Hot to Your Table', status: 'pending', icon: Sparkles },
                ].map((st, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        st.status === 'done'
                          ? 'bg-emerald-500 text-white'
                          : st.status === 'active'
                          ? 'bg-[#D95F25] text-white animate-pulse'
                          : 'bg-[#E7E0D8] text-[#77716B]'
                      }`}
                    >
                      {i + 1}
                    </div>
                    <span
                      className={`font-medium ${
                        st.status === 'active'
                          ? 'text-[#D95F25] font-bold'
                          : st.status === 'done'
                          ? 'text-[#151515]'
                          : 'text-[#77716B]'
                      }`}
                    >
                      {st.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 px-4 rounded-full bg-[#151515] hover:bg-[#252525] text-white font-bold text-xs transition-colors"
            >
              Close & Return to Restaurant
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
