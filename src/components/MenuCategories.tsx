import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import { MENU_CATEGORIES } from '../data/restaurantData';
import { Category } from '../types';

interface MenuCategoriesProps {
  onSelectCategory: (categoryId: string) => void;
  selectedCategory: string;
}

export default function MenuCategories({ onSelectCategory, selectedCategory }: MenuCategoriesProps) {
  return (
    <section id="categories" className="py-16 sm:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D95F25] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D99A3D]" />
              <span>Authentic Culinary Categories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#151515] font-display">
              Explore Our Menu
            </h2>
            <p className="text-base text-[#77716B] mt-2 max-w-xl">
              Discover authentic flavors made for every appetite, from single roasted portions to royal family banquets.
            </p>
          </div>

          <a
            href="#popular-dishes"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#D95F25] hover:text-[#C94F1F] group transition-colors select-none"
          >
            <span>View all dishes</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Categories Grid (3 cols on md, 3 or 4 cols on lg/xl) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {MENU_CATEGORIES.map((cat: Category) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group cursor-pointer rounded-2xl sm:rounded-3xl bg-white border transition-all duration-300 overflow-hidden flex flex-col ${
                  isSelected
                    ? 'border-[#D95F25] ring-2 ring-[#D95F25]/20 shadow-xl -translate-y-1'
                    : 'border-[#E7E0D8] hover:border-[#D95F25]/40 hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {/* Food Image Container (~60% of top visual weight) */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#F2ECE4]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-108"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  {/* Item count chip */}
                  <div className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-[#151515] shadow-xs border border-white/40">
                    {cat.itemCount} items
                  </div>
                  {/* Subtle Arabic name pill */}
                  {cat.arabicName && (
                    <div className="absolute bottom-3 left-3.5 bg-black/50 backdrop-blur-sm px-2.5 py-0.5 rounded-md text-[11px] font-medium text-white/95 font-sans">
                      {cat.arabicName}
                    </div>
                  )}
                </div>

                {/* Content info bottom area */}
                <div className="p-5 sm:p-6 flex items-center justify-between gap-4 flex-1">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#151515] group-hover:text-[#D95F25] transition-colors font-display">
                      {cat.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#77716B] line-clamp-2 mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Circular Action Arrow Button */}
                  <div
                    className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#D95F25] text-white'
                        : 'bg-[#FAF7F2] text-[#252525] group-hover:bg-[#D95F25] group-hover:text-white group-hover:translate-x-0.5'
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
