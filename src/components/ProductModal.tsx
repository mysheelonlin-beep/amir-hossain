import { useState } from 'react';
import { 
  X, 
  Star, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Flame, 
  Clock, 
  Users, 
  Check,
  Heart,
  Camera
} from 'lucide-react';
import { Dish } from '../types';

interface ProductModalProps {
  dish: Dish | null;
  onClose: () => void;
  onAddToCart: (
    dish: Dish,
    quantity: number,
    portion: 'single' | 'double' | 'family',
    rice: string,
    instructions: string
  ) => void;
  isFavorite: boolean;
  onToggleFavorite: (dishId: string) => void;
  onOpenUploadModal?: (dishId: string) => void;
}

export default function ProductModal({
  dish,
  onClose,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
  onOpenUploadModal,
}: ProductModalProps) {
  if (!dish) return null;

  const [quantity, setQuantity] = useState(1);
  const [portion, setPortion] = useState<'single' | 'double' | 'family'>('single');
  const [rice, setRice] = useState('Smoked Firewood Basmati');
  const [instructions, setInstructions] = useState('');

  // Portion price multiplier
  const portionMultiplier = portion === 'single' ? 1 : portion === 'double' ? 1.85 : 3.5;
  const unitPrice = Math.round(dish.price * portionMultiplier);
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(dish, quantity, portion, rice, instructions);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E7E0D8] my-8 transition-all animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#252525] hover:bg-white hover:text-[#D95F25] flex items-center justify-center shadow-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Heart Favorite Button */}
        <button
          onClick={() => onToggleFavorite(dish.id)}
          className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#252525] hover:text-[#D95F25] flex items-center justify-center shadow-md transition-colors"
          aria-label="Toggle favorite"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#D95F25] text-[#D95F25]' : 'text-[#77716B]'}`} />
        </button>

        {/* Change Photo Button */}
        {onOpenUploadModal && (
          <button
            type="button"
            onClick={() => onOpenUploadModal(dish.id)}
            className="absolute top-4 right-16 z-10 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#111827] hover:text-[#D95F25] flex items-center gap-1.5 shadow-md text-xs font-semibold backdrop-blur-md transition-all cursor-pointer"
            title="Upload authentic photo for this dish"
          >
            <Camera className="w-3.5 h-3.5 text-[#D95F25]" />
            <span className="hidden sm:inline">Change Photo</span>
          </button>
        )}

        {/* Top Dish Image */}
        <div className="relative h-64 sm:h-72 w-full bg-[#F2ECE4]">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between text-white">
            <div>
              {dish.arabicName && (
                <span className="text-xs text-[#D99A3D] font-medium block mb-0.5">
                  {dish.arabicName}
                </span>
              )}
              <h3 className="text-2xl font-bold font-display leading-tight">{dish.name}</h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-white/80 block">Base Price</span>
              <span className="text-2xl font-black text-[#D99A3D]">AED {dish.price}</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6">
          {/* Rating and Meta row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E7E0D8]">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-[#D99A3D]">
                <Star className="w-4 h-4 fill-[#D99A3D]" />
                <span className="text-sm font-bold text-[#151515]">{dish.rating}</span>
              </div>
              <span className="text-xs text-[#77716B]">({dish.reviewCount} customer reviews)</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#554F49]">
              {dish.serves && (
                <span className="flex items-center gap-1 bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-[#E7E0D8]">
                  <Users className="w-3.5 h-3.5 text-[#D95F25]" />
                  {dish.serves}
                </span>
              )}
              {dish.calories && (
                <span className="flex items-center gap-1 bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-[#E7E0D8]">
                  <Flame className="w-3.5 h-3.5 text-[#D99A3D]" />
                  {dish.calories}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-[#77716B] uppercase tracking-wider mb-1.5">
              Description & Preparation
            </h4>
            <p className="text-sm text-[#554F49] leading-relaxed">
              {dish.description} Served fresh with authentic spicy red daqoos tomato chili salsa, creamy garlic labneh sauce, and fresh lemon wedges.
            </p>
          </div>

          {/* Portion Size Selection */}
          <div>
            <h4 className="text-xs font-bold text-[#151515] uppercase tracking-wider mb-2.5">
              Select Portion Size
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'single', label: 'Single Portion', note: '1 Person', price: dish.price },
                { id: 'double', label: 'Double Portion', note: '2 Persons', price: Math.round(dish.price * 1.85) },
                { id: 'family', label: 'Family Platter', note: '4–5 Persons', price: Math.round(dish.price * 3.5) },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPortion(p.id as any)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    portion === p.id
                      ? 'border-[#D95F25] bg-[#D95F25]/5 ring-1 ring-[#D95F25]'
                      : 'border-[#E7E0D8] hover:border-[#D95F25]/40 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#151515]">{p.label}</span>
                    {portion === p.id && <Check className="w-3.5 h-3.5 text-[#D95F25]" />}
                  </div>
                  <span className="text-[11px] text-[#77716B] block">{p.note}</span>
                  <span className="text-xs font-bold text-[#D95F25] mt-1 block">AED {p.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Rice Option */}
          <div>
            <h4 className="text-xs font-bold text-[#151515] uppercase tracking-wider mb-2.5">
              Fragrant Basmati Rice Choice
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Smoked Firewood Basmati',
                'Traditional Saffron Yellow Rice',
              ].map((riceOption) => (
                <button
                  key={riceOption}
                  onClick={() => setRice(riceOption)}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                    rice === riceOption
                      ? 'border-[#D95F25] bg-[#D95F25]/5 text-[#D95F25]'
                      : 'border-[#E7E0D8] text-[#554F49] hover:border-[#D95F25]/30'
                  }`}
                >
                  <span>{riceOption}</span>
                  {rice === riceOption && <Check className="w-4 h-4 text-[#D95F25]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="text-xs font-bold text-[#151515] uppercase tracking-wider block mb-1.5">
              Special Instructions (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Extra spicy daqoos, fried almonds on the side, no onions..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#E7E0D8] text-xs text-[#252525] placeholder-[#77716B] focus:outline-none focus:border-[#D95F25]"
            />
          </div>
        </div>

        {/* Modal Footer (Quantity + Add to Cart) */}
        <div className="p-6 bg-[#FAF7F2] border-t border-[#E7E0D8] flex items-center justify-between gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full border border-[#E7E0D8] shadow-xs">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-7 h-7 rounded-full text-[#77716B] hover:text-[#151515] hover:bg-[#F2ECE4] flex items-center justify-center transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-sm font-bold text-[#151515] w-6 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-7 h-7 rounded-full text-[#77716B] hover:text-[#151515] hover:bg-[#F2ECE4] flex items-center justify-center transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Order Button */}
          <button
            onClick={handleAdd}
            className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#D95F25] hover:bg-[#C94F1F] active:scale-[0.98] text-white font-bold text-sm shadow-md shadow-[#D95F25]/30 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Order • AED {totalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
