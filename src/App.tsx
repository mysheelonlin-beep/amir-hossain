/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import MainMenuCategoryGrid from './components/MainMenuCategoryGrid';
import RestaurantAbout from './components/RestaurantAbout';
import ContactActionCards from './components/ContactActionCards';
import MenuSection from './components/MenuSection';
import GuestReviewsAndDiningGallery from './components/GuestReviewsAndDiningGallery';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import TableReservationModal from './components/TableReservationModal';
import SearchModal from './components/SearchModal';
import MobileSalesBar from './components/MobileSalesBar';
import Toast, { ToastMessage } from './components/Toast';
import ImageUploadModal from './components/ImageUploadModal';

import { Dish, CartItem, SpecialOffer } from './types';
import { POPULAR_DISHES } from './data/restaurantData';

export default function App() {
  // State management
  const [allDishes, setAllDishes] = useState<Dish[]>(() => {
    // Check localStorage for any custom uploaded dish images
    return POPULAR_DISHES.map((dish) => {
      try {
        const storedImg = localStorage.getItem(`custom_dish_img_${dish.id}`);
        if (storedImg) {
          return { ...dish, image: storedImg };
        }
      } catch {
        // ignore
      }
      return dish;
    });
  });

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadDishId, setUploadDishId] = useState<string>('chicken-madhfoon');
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [favorites, setFavorites] = useState<string[]>(['traditional-chicken-mandi']);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const handleDishImageUpdated = (dishId: string, newImageUrl: string) => {
    setAllDishes((prev) =>
      prev.map((d) => (d.id === dishId ? { ...d, image: newImageUrl } : d))
    );
    if (selectedDish && selectedDish.id === dishId) {
      setSelectedDish((prev) => (prev ? { ...prev, image: newImageUrl } : null));
    }
    addToast('Photo Updated!', 'Your authentic dish photo is now active on the menu.', 'info');
  };

  const openUploadModalForDish = (dishId?: string) => {
    if (dishId) {
      setUploadDishId(dishId);
    }
    setIsUploadModalOpen(true);
  };

  // Add toast helper
  const addToast = (title: string, description?: string, type: 'cart' | 'fav' | 'info' = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Scroll spy for active navbar section
  useEffect(() => {
    const sectionIds = ['hero', 'main-menu-categories', 'restaurant-about', 'quick-contact-cards', 'menu-section'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart operations
  const handleAddToCart = (
    dish: Dish,
    quantity = 1,
    portion: 'single' | 'double' | 'family' = 'single',
    rice = 'Smoked Firewood Basmati',
    instructions = ''
  ) => {
    const multiplier = portion === 'single' ? 1 : portion === 'double' ? 1.85 : 3.5;
    const itemUnitPrice = Math.round(dish.price * multiplier);
    const itemTotal = itemUnitPrice * quantity;

    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (it) => it.dish.id === dish.id && it.selectedPortion === portion && it.selectedRice === rice
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        const updatedQty = updated[existingIdx].quantity + quantity;
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updatedQty,
          itemTotal: itemUnitPrice * updatedQty,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            dish,
            quantity,
            selectedPortion: portion,
            selectedRice: rice,
            specialInstructions: instructions,
            itemTotal,
          },
        ];
      }
    });

    addToast(
      `Added to Order!`,
      `${quantity}x ${dish.name} (${portion})`,
      'cart'
    );
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      const item = updated[index];
      const multiplier = item.selectedPortion === 'single' ? 1 : item.selectedPortion === 'double' ? 1.85 : 3.5;
      const unitPrice = Math.round(item.dish.price * multiplier);
      updated[index] = {
        ...item,
        quantity: newQty,
        itemTotal: unitPrice * newQty,
      };
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Add Offer to cart
  const handleAddOfferToCart = (offer: SpecialOffer) => {
    const mockDish: Dish = {
      id: offer.id,
      name: offer.title,
      category: 'special-offers',
      description: offer.description,
      price: offer.price,
      originalPrice: offer.originalPrice,
      rating: 5.0,
      reviewCount: 99,
      image: offer.image,
      serves: offer.serves,
    };

    setCartItems((prev) => [
      ...prev,
      {
        dish: mockDish,
        quantity: 1,
        selectedPortion: 'family',
        selectedRice: 'Smoked Firewood Basmati',
        itemTotal: offer.price,
      },
    ]);

    addToast('Offer Claimed!', `${offer.title} added to your basket`, 'cart');
    setIsCartOpen(true);
  };

  // Toggle favorite
  const handleToggleFavorite = (dishId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(dishId);
      const dish = POPULAR_DISHES.find((d) => d.id === dishId);
      const dishName = dish ? dish.name : 'Dish';

      if (exists) {
        addToast('Removed from favorites', dishName, 'fav');
        return prev.filter((id) => id !== dishId);
      } else {
        addToast('Saved to favorites!', dishName, 'fav');
        return [...prev, dishId];
      }
    });
  };

  // Promo code validation
  const handleApplyPromoCode = (code: string) => {
    const cleaned = code.trim().toUpperCase();
    if (cleaned === 'JALSA20' || cleaned === 'WELCOME20') {
      setAppliedPromoCode(cleaned);
      setAppliedDiscount(0.2); // 20% discount
      return { success: true, message: '20% Gathering discount applied successfully!' };
    } else if (cleaned === 'MANDI10') {
      setAppliedPromoCode(cleaned);
      setAppliedDiscount(0.1);
      return { success: true, message: '10% discount applied!' };
    } else {
      return { success: false, message: 'Invalid promo code. Try using JALSA20' };
    }
  };

  // Navigation helpers
  const scrollToMenu = () => {
    const el = document.getElementById('menu-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToOffers = () => {
    scrollToMenu();
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryFilter(categoryId);
    scrollToMenu();
  };

  const totalCartCount = cartItems.reduce((sum, it) => sum + it.quantity, 0);
  const rawSubtotal = cartItems.reduce((sum, it) => sum + it.itemTotal, 0);
  const discountAmount = Math.round(rawSubtotal * appliedDiscount);
  const subtotalAfterDiscount = rawSubtotal - discountAmount;
  const isFreeDelivery = subtotalAfterDiscount >= 100;
  const deliveryFee = cartItems.length === 0 ? 0 : isFreeDelivery ? 0 : 12;
  const grandTotal = subtotalAfterDiscount + deliveryFee;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#252525] flex flex-col selection:bg-[#D95F25] selection:text-white pb-14 md:pb-0">
      {/* 1 & 2: TOP UTILITY BAR & MAIN NAVIGATION */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenOrderNow={() => {
          if (cartItems.length > 0) {
            setIsCartOpen(true);
          } else {
            scrollToMenu();
          }
        }}
        onOpenReservation={() => setIsReservationOpen(true)}
        activeSection={activeSection}
        onOpenUploadModal={() => openUploadModalForDish('chicken-madhfoon')}
      />

      {/* MAIN BODY SECTIONS REQUESTED BY USER */}
      <main className="flex-grow">
        {/* 1: HERO WITH SPLIT 1: RESTAURANT ABOUT & 2: IMAGE SLIDER */}
        <HeroSlider
          onOrderNow={scrollToMenu}
          onExploreMenu={scrollToMenu}
        />

        {/* 2: MAIN MENU 6 CATEGORY BUTTONS (3 PER ROW IN 2 HORIZONTAL LINES) */}
        <MainMenuCategoryGrid onSelectCategory={handleSelectCategory} />

        {/* 3: RESTAURANT ABOUT (20+ YEARS HERITAGE, SHARJAH MUWEILAH) */}
        <RestaurantAbout />

        {/* 4: THREE CIRCLE/ACTION CARDS: CALL US, WHATSAPP, LOCATION */}
        <ContactActionCards />

        {/* 4: MENU: CHICKEN, MUTTON, FISH, KEBAB, SALAD, DRINKS */}
        <MenuSection
          dishes={allDishes}
          onSelectDish={(dish) => setSelectedDish(dish)}
          onAddToCart={(dish) => handleAddToCart(dish, 1, 'single')}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          selectedCategoryFilter={selectedCategoryFilter}
          onOpenUploadModal={(dishId) => openUploadModalForDish(dishId)}
        />

        {/* 5: CUSTOMER REVIEWS & AUTO-SLIDING DINING IMAGE GALLERY */}
        <GuestReviewsAndDiningGallery />
      </main>

      {/* 15: PREMIUM FOOTER */}
      <Footer
        onOpenOrderNow={scrollToMenu}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* MOBILE STICKY SALES BAR */}
      <MobileSalesBar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onExploreMenu={scrollToMenu}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* MODALS & OVERLAYS */}
      {/* Product Detail Modal */}
      <ProductModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToCart={(dish, qty, portion, rice, notes) =>
          handleAddToCart(dish, qty, portion, rice, notes)
        }
        isFavorite={selectedDish ? favorites.includes(selectedDish.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onOpenUploadModal={(dishId) => openUploadModalForDish(dishId)}
      />

      {/* Image Upload Modal for Real Food Photos */}
      <ImageUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        dishes={allDishes}
        defaultDishId={uploadDishId}
        onImageUpdated={handleDishImageUpdated}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedDiscount={appliedDiscount}
        onApplyPromoCode={handleApplyPromoCode}
        appliedPromoCode={appliedPromoCode}
      />

      {/* Interactive Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        total={grandTotal}
        onOrderCompleted={() => {
          setCartItems([]);
          addToast('Order Placed Successfully!', 'Your mandi is now smoking in the pit.', 'cart');
        }}
      />

      {/* Dine-in Table / Majlis Reservation Modal */}
      <TableReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectDish={(dish) => setSelectedDish(dish)}
      />

      {/* Toast notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
