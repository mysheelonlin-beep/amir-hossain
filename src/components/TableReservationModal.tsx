import { useState, type FormEvent } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2, Sparkles, Phone, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TableReservationModal({ isOpen, onClose }: TableReservationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [guestCount, setGuestCount] = useState('4 Guests');
  const [seatingType, setSeatingType] = useState('Traditional Floor Majlis');
  const [date, setDate] = useState('Today, Evening');
  const [time, setTime] = useState('08:00 PM');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
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
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#151515] font-display">
                {submitted ? 'Reservation Requested' : 'Reserve Majlis / Table'}
              </h3>
              <span className="text-xs text-[#77716B]">
                {submitted ? 'We look forward to hosting you' : 'Al Jalsa Mandi Dining & Gatherings'}
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

        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-4">
            {/* Seating Type */}
            <div>
              <label className="text-xs font-bold text-[#151515] uppercase tracking-wider block mb-2">
                Seating Atmosphere Preference
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  'Traditional Floor Majlis',
                  'Standard Dining Table',
                  'Private Family Suite',
                  'Outdoor Garden Terrace',
                ].map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setSeatingType(type)}
                    className={`p-2.5 rounded-xl border text-xs text-left transition-colors ${
                      seatingType === type
                        ? 'border-[#D95F25] bg-[#D95F25]/5 text-[#D95F25] font-bold ring-1 ring-[#D95F25]'
                        : 'border-[#E7E0D8] text-[#554F49] hover:border-[#D95F25]/30'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Count & Time */}
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="text-xs font-bold text-[#151515] uppercase tracking-wider block mb-1">
                  Party Size
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E7E0D8] text-xs text-[#252525] focus:outline-none focus:border-[#D95F25]"
                >
                  <option>1–2 Guests</option>
                  <option>3–4 Guests</option>
                  <option>5–8 Guests (Family Majlis)</option>
                  <option>9–14 Guests (Diwan Room)</option>
                  <option>15+ Large Banquet</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#151515] uppercase tracking-wider block mb-1">
                  Preferred Time Slot
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E7E0D8] text-xs text-[#252525] focus:outline-none focus:border-[#D95F25]"
                >
                  <option>01:00 PM (Lunch)</option>
                  <option>02:30 PM (Afternoon)</option>
                  <option>07:00 PM (Early Dinner)</option>
                  <option>08:30 PM (Prime Gathering)</option>
                  <option>10:00 PM (Late Dinner)</option>
                  <option>11:30 PM (Night Feast)</option>
                </select>
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div>
                <label className="text-xs font-bold text-[#151515] uppercase tracking-wider block mb-1">
                  Host Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Saeed Al-Maktoum"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E7E0D8] text-xs text-[#252525] focus:outline-none focus:border-[#D95F25]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#151515] uppercase tracking-wider block mb-1">
                  Contact Phone *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+971 50 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E7E0D8] text-xs text-[#252525] focus:outline-none focus:border-[#D95F25]"
                />
              </div>
            </div>

            <div className="p-3 bg-[#FAF7F2] rounded-xl text-[11px] text-[#77716B]">
              ★ Includes complimentary Arabic Gahwa & royal dates upon arrival.
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-full bg-[#D95F25] hover:bg-[#C94F1F] text-white font-bold text-xs shadow-md transition-all"
            >
              Request Table Reservation
            </button>
          </form>
        ) : (
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#151515] font-display">
                Reservation Confirmed, {name}!
              </h3>
              <p className="text-xs text-[#77716B] mt-1">
                We have saved a {seatingType} for {guestCount} at {time}. Our host will WhatsApp you a confirmation.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E7E0D8] text-xs text-left space-y-1 text-[#554F49]">
              <div className="flex justify-between">
                <span className="font-semibold">Restaurant:</span>
                <span>Al Jalsa Mandi (Jumeirah 2)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Seating:</span>
                <span>{seatingType}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Direct Phone:</span>
                <span>{RESTAURANT_INFO.phone}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-full bg-[#151515] text-white text-xs font-bold"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
