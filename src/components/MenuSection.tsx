import { useState, useMemo, useEffect, type MouseEvent } from 'react';
import { 
  Star, 
  Heart, 
  Plus, 
  Check, 
  Users, 
  Utensils,
  ChevronDown,
  Camera
} from 'lucide-react';
import { POPULAR_DISHES } from '../data/restaurantData';
import { Dish } from '../types';

interface MenuSectionProps {
  onSelectDish: (dish: Dish) => void;
  onAddToCart: (dish: Dish, e?: MouseEvent) => void;
  favorites: string[];
  onToggleFavorite: (dishId: string) => void;
  selectedCategoryFilter?: string;
  dishes?: Dish[];
  onOpenUploadModal?: (dishId: string) => void;
}

const CATEGORY_INFO: Record<string, { title: string; subtitle: string; arabic: string }> = {
  chicken: {
    title: 'Chicken Mandi Dishes',
    subtitle: 'Slow-roasted succulent chicken over spiced firewood basmati rice',
    arabic: 'أطباق مندي دجاج',
  },
  mutton: {
    title: 'Tender Mutton & Lamb Dishes',
    subtitle: 'Succulent lamb shanks and slow-braised ribs falling off the bone',
    arabic: 'أطباق مندي لحم ضأن',
  },
  fish: {
    title: 'Fresh Fish & Seafood Dishes',
    subtitle: 'Arabian Gulf Kingfish, Hamour, and Jumbo Tiger Prawns',
    arabic: 'أطباق أسماك وثمار البحر',
  },
  kebab: {
    title: 'Charcoal Kebab & Grills',
    subtitle: 'Flame-grilled Shish Tawook, Lamb Seekh, and royal mixed platters',
    arabic: 'مشاوي وكباب عربي',
  },
  family: {
    title: 'Family Sharing Platters',
    subtitle: 'Grand communal Mandi feasts for gatherings, families, and celebrations',
    arabic: 'ولائم وصواني عائلية',
  },
  salad: {
    title: 'Fresh Arabian Salads & Mezzes',
    subtitle: 'Crisp Fattoush, creamy Hummus, Mutabbal, and chilled appetizers',
    arabic: 'سلطات ومقبلات طازجة',
  },
  drinks: {
    title: 'Beverages & Fresh Juices',
    subtitle: 'Signature mint lemonade, Arabian Vimto, mango nectar, and hot Karak tea',
    arabic: 'عصائر ومشروبات منعشة',
  },
  sweets: {
    title: 'Arabic Desserts & Kunafa',
    subtitle: 'Fresh hot cheese kunafa, royal ashta, baklava, and traditional Umm Ali',
    arabic: 'حلويات شرقية وكنافة',
  },
};

export default function MenuSection({
  onSelectDish,
  onAddToCart,
  favorites,
  onToggleFavorite,
  selectedCategoryFilter,
  dishes = POPULAR_DISHES,
  onOpenUploadModal,
}: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>(
    selectedCategoryFilter && selectedCategoryFilter !== 'all' ? selectedCategoryFilter : 'chicken'
  );
  const [showAll, setShowAll] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Sync activeCategory whenever selectedCategoryFilter changes from parent & reset showAll
  useEffect(() => {
    if (selectedCategoryFilter) {
      setActiveCategory(selectedCategoryFilter);
      setShowAll(false);
    }
  }, [selectedCategoryFilter]);

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      return activeCategory === 'all' || dish.category === activeCategory;
    });
  }, [activeCategory, dishes]);

  const visibleDishes = showAll ? filteredDishes : filteredDishes.slice(0, 6);
  const hasMore = filteredDishes.length > 6;

  const currentCategoryMeta = CATEGORY_INFO[activeCategory] || {
    title: `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Dishes`,
    subtitle: 'Authentic flavors prepared fresh daily',
    arabic: '',
  };

  const handleAddClick = (dish: Dish, e: MouseEvent) => {
    e.stopPropagation();
    onAddToCart(dish, e);
    setRecentlyAddedId(dish.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1200);
  };

  return (
    <section id="menu-section" className="py-8 sm:py-12 bg-[#FAF7F2] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#EEDBCA]/60 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#151515] font-display">
                {currentCategoryMeta.title}
              </h2>
              {currentCategoryMeta.arabic && (
                <span className="text-sm sm:text-base font-arabic font-bold text-[#8D5726]">
                  ({currentCategoryMeta.arabic})
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-[#77716B] mt-0.5">
              {currentCategoryMeta.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {onOpenUploadModal && (
              <button
                type="button"
                onClick={() => onOpenUploadModal('chicken-madhfoon')}
                className="text-xs font-semibold text-[#D95F25] bg-[#D95F25]/10 hover:bg-[#D95F25]/20 px-3 py-1.5 rounded-full border border-[#D95F25]/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Upload original dish photo"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Upload Dish Photo (ছবি যুক্ত করুন)</span>
              </button>
            )}
            <div className="text-xs font-semibold text-[#8D5726] bg-[#F5EFE4] px-3 py-1.5 rounded-full border border-[#EEDBCA]">
              {filteredDishes.length} items available
            </div>
          </div>
        </div>

        {/* Dish Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E7E0D8] p-8">
            <Utensils className="w-12 h-12 text-[#D99A3D] mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-[#151515]">No dishes found</h3>
            <p className="text-sm text-[#77716B] mt-1">
              Please choose a category from the Main Menu Categories above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
            {visibleDishes.map((dish) => {
              const isFav = favorites.includes(dish.id);
              const isRecentlyAdded = recentlyAddedId === dish.id;

              return (
                <div
                  key={dish.id}
                  id={`dish-card-${dish.id}`}
                  onClick={() => onSelectDish(dish)}
                  className="group bg-white rounded-2xl sm:rounded-3xl border border-[#EADBCC] hover:border-[#D95F25] shadow-xs hover:shadow-md hover:shadow-[#D95F25]/10 transition-all duration-200 overflow-hidden flex flex-col cursor-pointer"
                >
                  {/* Dish Image Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F2ECE4]">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />

                    {/* Gradient overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                      {dish.isChefSpecial && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#D95F25] text-white text-[11px] font-bold shadow-xs">
                          Chef Special
                        </span>
                      )}
                      {dish.isPopular && !dish.isChefSpecial && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#D99A3D] text-[#151515] text-[11px] font-bold shadow-xs">
                          Popular
                        </span>
                      )}
                    </div>

                    {/* Favorite Heart & Upload Button */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                      {onOpenUploadModal && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenUploadModal(dish.id);
                          }}
                          className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-[#252525] hover:text-[#D95F25] hover:bg-white flex items-center justify-center transition-all hover:scale-110 shadow-xs cursor-pointer"
                          aria-label="Upload Real Photo"
                          title="Upload Real Photo for this dish"
                        >
                          <Camera className="w-3.5 h-3.5 text-[#D95F25]" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(dish.id);
                        }}
                        className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-[#252525] hover:text-[#D95F25] flex items-center justify-center transition-all hover:scale-110 shadow-xs cursor-pointer"
                        aria-label="Toggle Favorite"
                      >
                        <Heart
                          className={`w-4 h-4 transition-colors ${
                            isFav ? 'fill-[#D95F25] text-[#D95F25]' : 'text-[#554F49]'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Arabic Name Pill */}
                    {dish.arabicName && (
                      <div className="absolute bottom-2.5 left-3 bg-black/60 backdrop-blur-xs px-2.5 py-0.5 rounded text-[11px] text-white font-medium">
                        {dish.arabicName}
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Rating & Portion Meta */}
                      <div className="flex items-center justify-between text-xs text-[#6B7280] mb-1.5">
                        <div className="flex items-center gap-1 text-[#D99A3D] font-bold">
                          <Star className="w-3.5 h-3.5 fill-[#D99A3D]" />
                          <span>{dish.rating}</span>
                          <span className="text-[#9CA3AF] font-normal">({dish.reviewCount})</span>
                        </div>

                        {dish.serves && (
                          <div className="flex items-center gap-1 text-[#6B7280]">
                            <Users className="w-3.5 h-3.5" />
                            <span>{dish.serves}</span>
                          </div>
                        )}
                      </div>

                      {/* Dish Title */}
                      <h3 className="text-base sm:text-lg font-bold text-[#111827] group-hover:text-[#D95F25] transition-colors line-clamp-1 font-display">
                        {dish.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#6B7280] line-clamp-2 mt-1 leading-relaxed font-normal">
                        {dish.description}
                      </p>
                    </div>

                    {/* Bottom Pricing & Action */}
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-base sm:text-lg font-black text-[#111827]">
                            AED {dish.price}
                          </span>
                          {dish.originalPrice && (
                            <span className="text-xs text-[#9CA3AF] line-through">
                              AED {dish.originalPrice}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#9CA3AF] block">Incl. 5% VAT</span>
                      </div>

                      {/* Add Button */}
                      <button
                        type="button"
                        id={`add-btn-${dish.id}`}
                        onClick={(e) => handleAddClick(dish, e)}
                        className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-200 active:scale-95 shadow-xs cursor-pointer ${
                          isRecentlyAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#111827] hover:bg-[#D95F25] text-white'
                        }`}
                      >
                        {isRecentlyAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
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

        {/* See More Button if more than 6 items */}
        {hasMore && (
          <div className="mt-8 sm:mt-10 flex justify-center">
            <button
              id="see-more-dishes-btn"
              onClick={() => setShowAll((prev) => !prev)}
              className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white hover:bg-[#D95F25] text-[#151515] hover:text-white border-2 border-[#EEDBCA] hover:border-[#D95F25] font-bold text-sm sm:text-base shadow-xs hover:shadow-md hover:shadow-[#D95F25]/20 transition-all duration-200 cursor-pointer active:scale-98"
            >
              <span>{showAll ? 'Show Less' : `See More (${filteredDishes.length - 6} more dishes)`}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showAll ? 'rotate-180' : 'group-hover:translate-y-0.5'}`} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
