export interface Dish {
  id: string;
  name: string;
  arabicName?: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  isPopular?: boolean;
  isChefSpecial?: boolean;
  isSpicy?: boolean;
  calories?: string;
  serves?: string;
  preparationTime?: string;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  arabicName?: string;
  description: string;
  itemCount: number;
  image: string;
}

export interface SpecialOffer {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice: number;
  discountBadge: string;
  serves: string;
  image: string;
  itemsIncluded: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  rating: number;
  comment: string;
  dishOrdered: string;
  date: string;
  avatar: string;
}

export interface CartItem {
  dish: Dish;
  quantity: number;
  selectedPortion: 'single' | 'double' | 'family';
  selectedRice?: string;
  specialInstructions?: string;
  itemTotal: number;
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  address: string;
  neighborhood: string;
  city: string;
  phone: string;
  whatsapp: string;
  email: string;
  googleRating?: number;
  googleReviewCount?: number;
  googleMapsUrl?: string;
  openingHours: {
    weekdays: string;
    weekends: string;
  };
  deliveryTime: string;
  minimumOrder: number;
  freeDeliveryThreshold: number;
}
