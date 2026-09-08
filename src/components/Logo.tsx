interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  layout?: 'horizontal' | 'vertical';
  showText?: boolean;
  className?: string;
}

/**
 * Official Al Jalsa For Mandi Restaurant Logo
 * Faithfully reproduces the traditional Arabian Bedouin tent canopy,
 * double skewers with heat/aroma waves, and crystal-clear high-contrast typography
 * for effortless reading on all devices.
 */
export default function Logo({
  variant = 'light',
  size = 'sm',
  layout = 'horizontal',
  showText = true,
  className = '',
}: LogoProps) {
  const isDark = variant === 'dark';

  // Sizing configurations tailored for absolute clarity and high readability
  const iconSizes = {
    xs: 'w-8 h-8 sm:w-9 sm:h-9',
    sm: 'w-10 h-10 sm:w-11 sm:h-11',
    md: 'w-12 h-12 sm:w-14 sm:h-14',
    lg: 'w-16 h-16 sm:w-20 sm:h-20',
  };

  const textSizes = {
    xs: {
      arabic: 'text-[11px] sm:text-xs font-bold leading-tight',
      brand: 'text-xs sm:text-[13px] font-black tracking-wide leading-tight',
      sub: 'text-[9px] sm:text-[10px] font-bold tracking-[0.2em] leading-tight mt-0.5',
    },
    sm: {
      arabic: 'text-xs sm:text-[13px] font-bold leading-tight',
      brand: 'text-[13px] sm:text-[15px] font-black tracking-wide leading-tight',
      sub: 'text-[9.5px] sm:text-[11px] font-bold tracking-[0.22em] leading-tight mt-0.5',
    },
    md: {
      arabic: 'text-sm sm:text-base font-bold leading-tight',
      brand: 'text-base sm:text-lg font-black tracking-wide leading-tight',
      sub: 'text-[11px] sm:text-xs font-bold tracking-[0.25em] leading-tight mt-0.5',
    },
    lg: {
      arabic: 'text-lg sm:text-xl font-bold leading-tight',
      brand: 'text-xl sm:text-2xl font-black tracking-wider leading-tight',
      sub: 'text-xs sm:text-sm font-bold tracking-[0.28em] leading-tight mt-1',
    },
  };

  const currentText = textSizes[size];

  return (
    <div
      className={`flex select-none transition-all group ${
        layout === 'vertical'
          ? 'flex-col items-center text-center gap-1.5'
          : 'items-center gap-2 sm:gap-3 text-left'
      } ${className}`}
    >
      {/* Official Emblem: Bedouin Tent & Dual Skewers */}
      <div
        className={`relative ${iconSizes[size]} flex-shrink-0 flex items-center justify-center rounded-xl p-1 transition-transform duration-200 group-hover:scale-105 ${
          isDark
            ? 'bg-white/10 ring-1 ring-white/20'
            : 'bg-white border border-[#E2D8CE] shadow-xs hover:shadow-sm'
        }`}
        title="Al Jalsa For Mandi Restaurant"
      >
        <svg
          viewBox="0 0 240 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-contain"
        >
          {/* Arabian Traditional Bedouin Tent Canopy Roof */}
          <g fill={isDark ? '#F9FAFB' : '#2D3136'}>
            {/* Left tent curve */}
            <path d="M120 12 C85 12 45 30 12 62 C 8 66 6 64 8 60 C 16 38 56 16 118 10 C 121 10 121 12 120 12 Z" />
            <path d="M120 13 C88 22 55 38 18 66 C 14 69 11 67 12 63 C 20 44 58 24 116 16 C 119 16 121 13 120 13 Z" opacity="0.9" />

            {/* Right tent curve */}
            <path d="M120 12 C155 12 195 30 228 62 C 232 66 234 64 232 60 C 224 38 184 16 122 10 C 119 10 119 12 120 12 Z" />
            <path d="M120 13 C152 22 185 38 222 66 C 226 69 229 67 228 63 C 220 44 182 24 124 16 C 121 16 119 13 120 13 Z" opacity="0.9" />
          </g>

          {/* Dual Skewers, Crossbeam & Heat Aroma Waves */}
          <g stroke={isDark ? '#E5E7EB' : '#2D3136'} strokeLinecap="round" strokeLinejoin="round">
            {/* Left Skewer */}
            <path d="M46 54 L46 112" strokeWidth="3" />
            <path d="M43 54 L46 44 L49 54 Z" fill={isDark ? '#E5E7EB' : '#2D3136'} strokeWidth="1" />
            <path d="M36 102 L56 102" strokeWidth="4" />
            <circle cx="46" cy="102" r="3" fill={isDark ? '#E5E7EB' : '#2D3136'} />

            {/* Left Skewer Waves */}
            <path d="M33 76 C26 84 26 94 33 102" strokeWidth="2.2" fill="none" />
            <path d="M38 80 C33 86 33 92 38 98" strokeWidth="1.8" fill="none" />
            <path d="M59 76 C66 84 66 94 59 102" strokeWidth="2.2" fill="none" />
            <path d="M54 80 C59 86 59 92 54 98" strokeWidth="1.8" fill="none" />

            {/* Right Skewer */}
            <path d="M194 54 L194 112" strokeWidth="3" />
            <path d="M191 54 L194 44 L197 54 Z" fill={isDark ? '#E5E7EB' : '#2D3136'} strokeWidth="1" />
            <path d="M184 102 L204 102" strokeWidth="4" />
            <circle cx="194" cy="102" r="3" fill={isDark ? '#E5E7EB' : '#2D3136'} />

            {/* Right Skewer Waves */}
            <path d="M181 76 C174 84 174 94 181 102" strokeWidth="2.2" fill="none" />
            <path d="M186 80 C181 86 181 92 186 98" strokeWidth="1.8" fill="none" />
            <path d="M207 76 C214 84 214 94 207 102" strokeWidth="2.2" fill="none" />
            <path d="M202 80 C207 86 207 92 202 98" strokeWidth="1.8" fill="none" />

            {/* Connecting Crossbar */}
            <path d="M56 102 L184 102" strokeWidth="3.5" />
          </g>

          {/* Central Arabic Calligraphy: مطعم */}
          <text
            x="120"
            y="98"
            fontFamily="'Cairo', 'Amiri', 'Traditional Arabic', sans-serif"
            fontSize="32"
            fontWeight="bold"
            textAnchor="middle"
            fill={isDark ? '#F9FAFB' : '#2D3136'}
            letterSpacing="1"
          >
            مطعم
          </text>

          {/* Red Calligraphy: الجلسه للمندي */}
          <text
            x="120"
            y="142"
            fontFamily="'Cairo', 'Amiri', 'Traditional Arabic', sans-serif"
            fontSize="30"
            fontWeight="900"
            textAnchor="middle"
            fill={isDark ? '#EF4444' : '#C41E24'}
            letterSpacing="0.5"
          >
            الجلسه للمندي
          </text>
        </svg>
      </div>

      {/* Crystal Clear, High-Contrast Typography (Easy to read at a glance) */}
      {showText && (
        <div className={`flex flex-col ${layout === 'vertical' ? 'items-center text-center' : 'items-start text-left'}`}>
          {/* Top Line: Full Arabic Name (مطعم الجلسه للمندي) */}
          <div className="flex items-center gap-1 leading-none mb-0.5">
            <span
              className={`font-arabic font-bold ${
                size === 'xs' ? 'text-[10px]' : size === 'sm' ? 'text-xs sm:text-[13px]' : 'text-sm sm:text-base'
              } ${isDark ? 'text-gray-300' : 'text-[#374151]'}`}
              style={{ fontFamily: "'Cairo', 'Amiri', sans-serif" }}
            >
              مطعم
            </span>
            <span
              className={`font-arabic font-black ${
                size === 'xs' ? 'text-[11px]' : size === 'sm' ? 'text-[13px] sm:text-[15px]' : 'text-base sm:text-lg'
              } ${isDark ? 'text-red-400' : 'text-[#C41E24]'}`}
              style={{ fontFamily: "'Cairo', 'Amiri', sans-serif" }}
            >
              الجلسه للمندي
            </span>
          </div>

          {/* Main Brand Name (AL JALSA FOR MANDI) */}
          <span
            className={`font-display font-black tracking-normal leading-tight ${currentText.brand} ${
              isDark ? 'text-white' : 'text-[#B91C1C]'
            }`}
            style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
          >
            AL JALSA FOR MANDI
          </span>

          {/* Subtitle (RESTAURANT) */}
          <span
            className={`font-sans uppercase font-bold ${currentText.sub} ${
              isDark ? 'text-amber-400/90' : 'text-[#4B5563]'
            }`}
            style={{ letterSpacing: '0.22em' }}
          >
            RESTAURANT
          </span>
        </div>
      )}
    </div>
  );
}
