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

export interface AdminAccount {
  id: string;
  email: string;
  fullName: string;
  created_at: string;
}

export interface BookingRecord {
  id?: string;
  booking_ref: string;
  full_name: string;
  email: string;
  phone: string;
  guests: number;
  booking_date: string;
  booking_time: string;
  order_type: string;
  pre_selected_items?: string[] | string | null;
  special_requests?: string | null;
  pre_order_total?: number;
  status: 'confirmed' | 'pending' | 'seated' | 'cancelled';
  created_at: string;
}
