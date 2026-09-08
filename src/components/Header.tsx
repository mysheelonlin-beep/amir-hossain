import { useState, useEffect } from 'react';
import { 
  Phone, 
  Clock, 
  ShoppingBag, 
  Search, 
  Menu as MenuIcon, 
  X, 
  Sparkles, 
  Truck, 
  ChevronRight,
  Flame,
  Camera
} from 'lucide-react';
import Logo from './Logo';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenOrderNow: () => void;
  onOpenReservation: () => void;
  activeSection: string;
  onOpenUploadModal?: () => void;
}

export default function Header({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenOrderNow,
  onOpenReservation,
  activeSection,
  onOpenUploadModal,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'Categories', href: '#main-menu-categories', id: 'main-menu-categories' },
    { label: 'About Us', href: '#restaurant-about', id: 'restaurant-about' },
    { label: 'Contact & Location', href: '#quick-contact-cards', id: 'quick-contact-cards' },
    { label: 'Full Menu', href: '#menu-section', id: 'menu-section' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* MAIN NAVIGATION */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2 sm:py-2.5 border-b border-[#E7E0D8]'
            : 'bg-[#FAF7F2] py-2.5 sm:py-3 border-b border-[#E7E0D8]/70'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Compact Top Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="flex-shrink-0"
            aria-label="Al Jalsa For Mandi Restaurant Home"
          >
            <Logo size="sm" />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-[#D95F25] bg-[#D95F25]/10 font-bold'
                      : 'text-[#252525] hover:text-[#D95F25] hover:bg-[#F2ECE4]/60'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right Action Icons & CTA Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Upload Dish Photo Icon Button */}
            {onOpenUploadModal && (
              <button
                id="header-upload-photo-btn"
                onClick={onOpenUploadModal}
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#252525] hover:text-[#D95F25] hover:bg-[#F2ECE4] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D95F25]/40"
                aria-label="Upload original dish photo"
                title="Upload authentic photo for dishes (ছবি আপলোড)"
              >
                <Camera className="w-5 h-5" />
              </button>
            )}

            {/* Search Icon Button */}
            <button
              id="header-search-btn"
              onClick={onOpenSearch}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#252525] hover:text-[#D95F25] hover:bg-[#F2ECE4] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D95F25]/40"
              aria-label="Search dishes and menu items"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* Cart Icon Button with Count Badge */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#252525] hover:text-[#D95F25] hover:bg-[#F2ECE4] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D95F25]/40"
              aria-label={`View your cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D95F25] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-scaleIn ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Prominent Orange Order Now Button (Desktop) */}
            <button
              id="header-order-now-desktop"
              onClick={onOpenOrderNow}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D95F25] hover:bg-[#C94F1F] active:scale-[0.98] text-white text-sm font-bold tracking-wide shadow-sm hover:shadow-[#D95F25]/30 hover:shadow-md transition-all duration-200"
            >
              <span>Order Now</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              id="header-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center text-[#252525] hover:bg-[#F2ECE4] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION DRAWER */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-full bg-white border-b border-[#E7E0D8] shadow-2xl px-6 py-6 transition-all duration-300 animate-fadeIn">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl text-base font-semibold text-[#252525] hover:text-[#D95F25] hover:bg-[#FAF7F2] transition-colors"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#77716B]" />
                </a>
              ))}

              <div className="pt-4 border-t border-[#E7E0D8] flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenOrderNow();
                  }}
                  className="w-full py-3 px-4 rounded-full bg-[#D95F25] hover:bg-[#C94F1F] text-white font-bold text-center flex items-center justify-center gap-2 shadow-md"
                >
                  <Flame className="w-4 h-4" />
                  <span>Order Mandi Now</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenReservation();
                  }}
                  className="w-full py-2.5 px-4 rounded-full border border-[#D95F25] text-[#D95F25] hover:bg-[#D95F25]/5 font-semibold text-center text-sm"
                >
                  Reserve Table / Majlis
                </button>

                <div className="flex items-center justify-center gap-2 pt-2 text-xs text-[#77716B]">
                  <Clock className="w-3.5 h-3.5 text-[#D99A3D]" />
                  <span>Open Daily: 11:30 AM – 01:30 AM</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
