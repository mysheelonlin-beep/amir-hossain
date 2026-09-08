import { Drumstick, Beef, Fish, Flame, Users, Salad, CupSoda, Cake, ArrowUpRight } from 'lucide-react';

interface MainMenuCategoryGridProps {
  onSelectCategory: (categoryId: string) => void;
}

interface MenuCategoryItem {
  id: string;
  name: string;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  type: 'chicken' | 'mutton' | 'fish' | 'kebab' | 'family' | 'salad' | 'drinks' | 'sweets';
}

const MENU_ITEMS: MenuCategoryItem[] = [
  // Row 1
  {
    id: 'chicken',
    name: 'Chicken',
    iconBg: 'bg-amber-500/10',
    iconBorder: 'border-amber-500/20',
    iconColor: 'text-[#D95F25]',
    type: 'chicken',
  },
  {
    id: 'mutton',
    name: 'Mutton',
    iconBg: 'bg-rose-500/10',
    iconBorder: 'border-rose-500/20',
    iconColor: 'text-rose-600',
    type: 'mutton',
  },
  {
    id: 'fish',
    name: 'Fish',
    iconBg: 'bg-sky-500/10',
    iconBorder: 'border-sky-500/20',
    iconColor: 'text-sky-600',
    type: 'fish',
  },
  {
    id: 'kebab',
    name: 'Kebab',
    iconBg: 'bg-orange-500/10',
    iconBorder: 'border-orange-500/20',
    iconColor: 'text-[#D95F25]',
    type: 'kebab',
  },
  // Row 2
  {
    id: 'family',
    name: 'Family',
    iconBg: 'bg-amber-600/10',
    iconBorder: 'border-amber-600/20',
    iconColor: 'text-amber-700',
    type: 'family',
  },
  {
    id: 'salad',
    name: 'Salad',
    iconBg: 'bg-emerald-500/10',
    iconBorder: 'border-emerald-500/20',
    iconColor: 'text-emerald-600',
    type: 'salad',
  },
  {
    id: 'drinks',
    name: 'Drinks',
    iconBg: 'bg-purple-500/10',
    iconBorder: 'border-purple-500/20',
    iconColor: 'text-purple-600',
    type: 'drinks',
  },
  {
    id: 'sweets',
    name: 'Sweets',
    iconBg: 'bg-pink-500/10',
    iconBorder: 'border-pink-500/20',
    iconColor: 'text-pink-600',
    type: 'sweets',
  },
];

export default function MainMenuCategoryGrid({ onSelectCategory }: MainMenuCategoryGridProps) {
  const renderCategoryIcon = (type: MenuCategoryItem['type']) => {
    switch (type) {
      case 'chicken':
        return <Drumstick className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 stroke-[2] text-[#D95F25]" />;
      case 'mutton':
        return <Beef className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 stroke-[2] text-rose-600" />;
      case 'fish':
        return <Fish className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 stroke-[2] text-sky-600" />;
      case 'kebab':
        return <Flame className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 stroke-[2] text-[#D95F25]" />;
      case 'family':
        return <Users className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 stroke-[2] text-amber-700" />;
      case 'salad':
        return <Salad className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 stroke-[2] text-emerald-600" />;
      case 'drinks':
        return <CupSoda className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 stroke-[2] text-purple-600" />;
      case 'sweets':
        return <Cake className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 stroke-[2] text-pink-600" />;
      default:
        return <Drumstick className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 stroke-[2]" />;
    }
  };

  return (
    <section id="main-menu-categories" className="relative z-20 mt-3 sm:mt-5 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-2.5 px-1">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#D95F25]" />
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#151515] tracking-tight font-display">
            Main Menu Categories
          </h2>
        </div>
        <span className="text-xs font-semibold text-[#D95F25] hidden sm:inline-flex items-center gap-1">
          <span>Tap to view dishes</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>

      {/* 8 Compact & Elegant Category Buttons in 2 rows of 4 columns */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-3.5">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            id={`main-menu-btn-${item.id}`}
            onClick={() => onSelectCategory(item.id)}
            className="group relative bg-[#FFFDF9] hover:bg-[#FFF7EE] rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-3.5 border border-[#EEDBCA] hover:border-[#D95F25] shadow-xs hover:shadow-sm hover:shadow-[#D95F25]/15 transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer active:scale-[0.98] min-h-[72px] sm:min-h-[88px]"
          >
            {/* Elegant Icon Container */}
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg sm:rounded-xl ${item.iconBg} border ${item.iconBorder} flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}
            >
              {renderCategoryIcon(item.type)}
            </div>

            {/* Category Name (English Only) */}
            <h3 className="text-[11px] sm:text-xs md:text-sm font-bold text-[#1F2937] group-hover:text-[#D95F25] tracking-tight transition-colors mt-1 sm:mt-1.5 whitespace-nowrap">
              {item.name}
            </h3>
          </button>
        ))}
      </div>
    </section>
  );
}
