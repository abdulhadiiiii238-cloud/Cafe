export type MenuCategory = 'Coffee & Beverages' | 'Breakfast' | 'Snacks & Pastries' | 'Desserts' | 'Specials';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  price: number;
  image: string;
  badge?: "Chef's Special" | "Most Popular" | "New" | "Vegan Option";
  calories?: string;
  isPopular?: boolean;
}

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  orderType: 'Dine-in' | 'Takeaway' | 'Delivery';
  preSelectedItems: string[]; // item IDs
  specialRequests: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'All' | 'Interior' | 'Coffee' | 'Food';
  imageUrl: string;
  description: string;
}

export interface OpeningHour {
  day: string;
  hours: string;
  isToday?: boolean;
}
