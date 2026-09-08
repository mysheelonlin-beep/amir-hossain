import { useState, useMemo, type MouseEvent } from 'react';
import { 
  Star, 
  Heart, 
  Plus, 
  Check, 
  Flame, 
  Sparkles, 
  Search, 
  SlidersHorizontal,
  Clock,
  Users
} from 'lucide-react';
import { POPULAR_DISHES } from '../data/restaurantData';
import { Dish } from '../types';

interface PopularDishesProps {
  onSelectDish: (dish: Dish) => void;
  onAddToCart: (dish: Dish, e?: MouseEvent) => void;
  favorites: string[];
  onToggleFavorite: (dishId: string) => void;
  selectedCategoryFilter?: string;
}

export default function PopularDishes({
  onSelectDish,
  onAddToCart,
  favorites,
  onToggleFavorite,
  selectedCategoryFilter,
}: PopularDishesProps) {
  const [activeFilter, setActiveFilter] = useState<string>(selectedCategoryFilter || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // If the parent passes selectedCategoryFilter and it changes
  if (selectedCategoryFilter && selectedCategoryFilter !== activeFilter && selectedCategoryFilter !== 'all') {
    // sync if needed
  }

  const filterTabs = [
    { id: 'all', label: 'All Favorites' },
    { id: 'chicken-mandi', label: 'Chicken Mandi' },
    { id: 'mutton-mandi', label: 'Mutton Mandi' },
    { id: 'family-mandi', label: 'Family Platters' },
    { id: 'grilled-favorites', label: 'Arabic Grills' },
    { id: 'desserts', label: 'Desserts' },
  ];

  const filteredDishes = useMemo(() => {
    return POPULAR_DISHES.filter((dish) => {
      const matchesFilter =
        activeFilter === 'all' ||
        dish.category === activeFilter ||
        (activeFilter === 'family-mandi' && (dish.category === 'family-mandi' || dish.serves?.includes('persons') && !dish.serves?.includes('1 person')));

      const matchesSearch =
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (dish.arabicName && dish.arabicName.includes(searchQuery));

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const handleAddClick = (dish: Dish, e: MouseEvent) => {
    e.stopPropagation();
    onAddToCart(dish, e);
    setRecentlyAddedId(dish.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1200);
  };

  return (
    <section id="popular-dishes" className="py-16 sm:py-24 bg-[#F2ECE4]/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D95F25] uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5 text-[#D95F25]" />
              <span>Handcrafted Arabian Specialties</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#151515] font-display">
              Customer Favorites
            </h2>
            <p className="text-base text-[#77716B] mt-2 max-w-xl">
              Our most-loved dishes, prepared fresh daily in firewood stone pits and served with authentic Arabic flavor.
            </p>
          </div>

          {/* Quick Search inside Popular Dishes */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#77716B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#E7E0D8] text-sm text-[#252525] placeholder-[#77716B] focus:outline-none focus:border-[#D95F25] focus:ring-2 focus:ring-[#D95F25]/20 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#77716B] hover:text-[#151515]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none select-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-[#151515] text-white shadow-md'
                  : 'bg-white text-[#554F49] border border-[#E7E0D8] hover:border-[#D95F25] hover:text-[#D95F25]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dishes Cards Grid (3 columns desktop, 2 tablet, 1 mobile) */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E7E0D8]">
            <p className="text-base text-[#77716B]">No dishes matched your filter or search query.</p>
            <button
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="mt-3 text-sm font-bold text-[#D95F25] hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDishes.map((dish) => {
              const isFav = favorites.includes(dish.id);
              const isJustAdded = recentlyAddedId === dish.id;

              return (
                <div
                  key={dish.id}
                  onClick={() => onSelectDish(dish)}
                  className="group cursor-pointer rounded-2xl sm:rounded-3xl bg-white border border-[#E7E0D8] hover:border-[#D95F25]/40 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Dish Image Container */}
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-[#F2ECE4]">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />

                    {/* Gradient bottom shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 items-start">
                      {dish.isPopular && (
                        <span className="bg-[#D95F25] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                          Popular
                        </span>
                      )}
                      {dish.isChefSpecial && !dish.isPopular && (
                        <span className="bg-[#D99A3D] text-[#151515] text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                          Chef's Pick
                        </span>
                      )}
                    </div>

                    {/* Heart Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(dish.id);
                      }}
                      className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#252525] hover:text-[#D95F25] shadow-sm transition-transform active:scale-90"
                      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart
                        className={`w-4.5 h-4.5 transition-colors ${
                          isFav ? 'fill-[#D95F25] text-[#D95F25]' : 'text-[#77716B]'
                        }`}
                      />
                    </button>

                    {/* Quick Specs Pill at Bottom of Image */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
                      {dish.serves && (
                        <span className="flex items-center gap-1 bg-black/45 backdrop-blur-xs px-2 py-0.5 rounded-md font-medium">
                          <Users className="w-3 h-3 text-[#D99A3D]" />
                          {dish.serves}
                        </span>
                      )}
                      {dish.preparationTime && (
                        <span className="flex items-center gap-1 bg-black/45 backdrop-blur-xs px-2 py-0.5 rounded-md font-medium">
                          <Clock className="w-3 h-3 text-[#D99A3D]" />
                          {dish.preparationTime}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Dish Details */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                    <div>
                      {/* Rating & Arabic subtitle */}
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-1 text-[#D99A3D]">
                          <Star className="w-3.5 h-3.5 fill-[#D99A3D]" />
                          <span className="text-xs font-bold text-[#151515]">{dish.rating}</span>
                          <span className="text-[11px] text-[#77716B]">({dish.reviewCount})</span>
                        </div>
                        {dish.arabicName && (
                          <span className="text-xs font-medium text-[#77716B] font-sans">
                            {dish.arabicName}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-[#151515] group-hover:text-[#D95F25] transition-colors leading-snug font-display">
                        {dish.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#77716B] line-clamp-2 mt-1.5 leading-relaxed">
                        {dish.description}
                      </p>
                    </div>

                    {/* Price and Add to Order Button */}
                    <div className="pt-5 mt-4 border-t border-[#E7E0D8] flex items-center justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl sm:text-2xl font-black text-[#D95F25] tracking-tight">
                          AED {dish.price}
                        </span>
                        {dish.originalPrice && (
                          <span className="text-xs text-[#77716B] line-through font-medium">
                            AED {dish.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Add to Order Button */}
                      <button
                        id={`add-to-order-${dish.id}`}
                        onClick={(e) => handleAddClick(dish, e)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 shadow-sm select-none ${
                          isJustAdded
                            ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                            : 'bg-[#FAF7F2] text-[#252525] border border-[#E7E0D8] hover:bg-[#D95F25] hover:text-white hover:border-[#D95F25] group-hover:shadow-md'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Add to Order</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
