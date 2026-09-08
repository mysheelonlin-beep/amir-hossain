import { useState } from 'react';
import { Search, X, Star, ArrowRight, Flame } from 'lucide-react';
import { POPULAR_DISHES } from '../data/restaurantData';
import { Dish } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDish: (dish: Dish) => void;
}

export default function SearchModal({ isOpen, onClose, onSelectDish }: SearchModalProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = POPULAR_DISHES.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase()) ||
    d.description.toLowerCase().includes(query.toLowerCase()) ||
    (d.arabicName && d.arabicName.includes(query)) ||
    d.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#E7E0D8] animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="p-4 sm:p-5 border-b border-[#E7E0D8] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#D95F25]" />
          <input
            type="text"
            autoFocus
            placeholder="Search for Mandi, Lamb Shank, Grills, Kunafa..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm sm:text-base font-medium text-[#151515] placeholder-[#77716B] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full text-[#77716B] hover:text-[#151515] hover:bg-[#FAF7F2] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-3 bg-[#FAF7F2] border-b border-[#E7E0D8] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[#77716B] font-semibold flex-shrink-0">Popular:</span>
          {['Chicken Mandi', 'Royal Mutton', 'Kunafa', 'Family Feast', 'Mixed Grill'].map((s) => (
            <button
              key={s}
              onClick={() => setQuery(s)}
              className="px-2.5 py-1 rounded-full bg-white border border-[#E7E0D8] hover:border-[#D95F25] text-[#252525] hover:text-[#D95F25] whitespace-nowrap transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2.5">
          {results.length === 0 ? (
            <div className="py-10 text-center text-xs text-[#77716B]">
              No dishes found for "{query}". Try searching for Chicken, Mutton or Kunafa.
            </div>
          ) : (
            results.map((dish) => (
              <div
                key={dish.id}
                onClick={() => {
                  onSelectDish(dish);
                  onClose();
                }}
                className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#FAF7F2] border border-transparent hover:border-[#E7E0D8] cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-14 h-14 rounded-xl object-cover flex-shrink-0 bg-[#F2ECE4]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-[#151515] group-hover:text-[#D95F25] truncate">
                      {dish.name}
                    </h4>
                    <p className="text-[11px] text-[#77716B] truncate max-w-xs sm:max-w-md">
                      {dish.description}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-bold text-[#D95F25]">AED {dish.price}</span>
                      <span className="text-[10px] text-[#D99A3D] font-bold flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-[#D99A3D]" /> {dish.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-white border border-[#E7E0D8] group-hover:bg-[#D95F25] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
