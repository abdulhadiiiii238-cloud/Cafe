import { GalleryItem, OpeningHour, Testimonial } from '../types';

export const CAFE_HIGHLIGHTS = [
  {
    title: 'Freshly Brewed Coffee',
    description: '100% Arabica beans ethically sourced from high-altitude single-origin farms and roasted weekly in-house.',
    iconName: 'Coffee'
  },
  {
    title: 'Cozy Ambiance',
    description: 'Thoughtfully designed interior with warm wood finishes, plush seating, soft lighting, and garden Gazebo nooks.',
    iconName: 'Sparkles'
  },
  {
    title: 'Locally Sourced Ingredients',
    description: 'Farm-fresh organic dairy, heirloom produce, and artisan sourdough baked daily by local craft bakers.',
    iconName: 'Leaf'
  },
  {
    title: 'Friendly Staff',
    description: 'Our passionate baristas and dedicated hospitality team treat every guest like cherished neighborhood family.',
    iconName: 'HeartHandshake'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'The Gazebo Sunlit Lounge',
    category: 'Interior',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    description: 'Warm natural light streaming into our cozy lounge with handcrafted oak tables.'
  },
  {
    id: 'g2',
    title: 'Artisan Latte Art',
    category: 'Coffee',
    imageUrl: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    description: 'Handcrafted rosette latte art prepared by our master baristas.'
  },
  {
    id: 'g3',
    title: 'Freshly Baked Croissants',
    category: 'Food',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    description: 'Golden, flaky butter croissants baked every morning at 6 AM.'
  },
  {
    id: 'g4',
    title: 'Outdoor Garden Gazebo',
    category: 'Interior',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    description: 'Lush greenery and serene seating in our peaceful garden gazebo courtyard.'
  },
  {
    id: 'g5',
    title: 'Signature Pour Over',
    category: 'Coffee',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    description: 'Precision pour-over brewing highlighting floral Ethiopian Yirgacheffe notes.'
  },
  {
    id: 'g6',
    title: 'Avocado Toast & Poached Egg',
    category: 'Food',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    description: 'Smashed organic avocado on toasted sourdough garnished with microgreens.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sophia Reynolds',
    role: 'Local Food Critic & Architect',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Gazebo Cafe is my ultimate sanctuary! The Gazebo Signature Brew is unmatched, and the ambiance makes remote work feel like a tranquil retreat. Unquestionably the best coffee spot in the city.',
    date: '2 days ago'
  },
  {
    id: 't2',
    name: 'Marcus Vance',
    role: 'Coffee Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'From the smooth caramel macchiato to the melt-in-your-mouth tiramisu, every item is crafted with unbelievable passion. The staff remembers your order after just two visits!',
    date: '1 week ago'
  },
  {
    id: 't3',
    name: 'Elena Rostova',
    role: 'Freelance Designer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'I booked a table for a Sunday brunch date with friends. The booking process was so seamless, and when we arrived our table in the garden gazebo was perfectly set. 10/10 experience!',
    date: '2 weeks ago'
  },
  {
    id: 't4',
    name: 'David Chen',
    role: 'Software Engineer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'The French Toast and Cold Brew Nitro are out of this world. Soft jazz music, friendly smiles, and blazing fast Wi-Fi. It’s my go-to morning stop every single weekday.',
    date: '3 weeks ago'
  }
];

export const OPENING_HOURS: OpeningHour[] = [
  { day: 'Monday', hours: '07:00 AM – 09:00 PM' },
  { day: 'Tuesday', hours: '07:00 AM – 09:00 PM' },
  { day: 'Wednesday', hours: '07:00 AM – 09:00 PM' },
  { day: 'Thursday', hours: '07:00 AM – 09:00 PM' },
  { day: 'Friday', hours: '07:00 AM – 10:00 PM' },
  { day: 'Saturday', hours: '08:00 AM – 10:00 PM' },
  { day: 'Sunday', hours: '08:00 AM – 08:30 PM' }
];

export const CONTACT_INFO = {
  address: '428 Gazebo Way, Coffee District, Suite 100',
  phone: '+1 (555) 839-2233',
  email: 'hello@gazebocafe.com',
  googleMapsUrl: 'https://maps.google.com'
};
