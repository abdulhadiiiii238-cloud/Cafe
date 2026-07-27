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
  table_number?: string;
}

// Table Management System (TMS) Types
export type TableSection = 'Main Gazebo Floor' | 'Patio Terrace' | 'Garden Gazebo' | 'Bar Lounge';
export type TableStatus = 'available' | 'reserved' | 'occupied' | 'cleaning';

export interface RestaurantTable {
  id: string;
  table_number: string;
  section: TableSection;
  capacity: number;
  status: TableStatus;
  current_booking_ref?: string;
  current_customer_name?: string;
  assigned_waiter_id?: string;
  assigned_waiter_name?: string;
  seated_at?: string; // ISO string timestamp
  guests_count?: number;
}

// Kitchen Display System (KDS) Types
export type KitchenStation = 'Coffee & Beverage Bar' | 'Hot Kitchen' | 'Bakery & Pastry' | 'Cold Pantry';
export type TicketItemStatus = 'pending' | 'preparing' | 'ready';
export type KitchenTicketStatus = 'new' | 'preparing' | 'ready' | 'served';

export interface KitchenTicketItem {
  id: string;
  name: string;
  quantity: number;
  station: KitchenStation;
  status: TicketItemStatus;
  notes?: string;
}

export interface KitchenTicket {
  id: string;
  ticket_number: string;
  booking_ref?: string;
  table_number: string;
  order_type: 'Dine-in' | 'Takeaway' | 'Delivery';
  customer_name: string;
  waiter_name?: string;
  items: KitchenTicketItem[];
  status: KitchenTicketStatus;
  created_at: string; // ISO string
  priority?: 'normal' | 'high' | 'vip';
}

// Waiter & Server Management Types
export type WaiterRole = 'Head Waiter' | 'Floor Server' | 'Barista' | 'Food Runner';
export type WaiterStatus = 'active' | 'on_break' | 'off_shift';

export interface TableServiceCall {
  id: string;
  table_number: string;
  customer_name?: string;
  request_type: 'Water Refill' | 'Bill Request' | 'Order Assistance' | 'Clearing Table' | 'Special Request';
  created_at: string;
  status: 'pending' | 'in_progress' | 'completed';
  assigned_waiter_id?: string;
}

export interface WaiterStaff {
  id: string;
  name: string;
  role: WaiterRole;
  phone: string;
  status: WaiterStatus;
  assigned_section: TableSection;
  assigned_tables: string[]; // e.g. ['T-1', 'T-2', 'T-3']
  active_tables_count: number;
  completed_orders_today: number;
  avatar_color: string;
}

