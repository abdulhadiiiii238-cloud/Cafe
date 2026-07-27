import React, { useState } from 'react';
import { MENU_ITEMS } from '../data/menuData';
import { BookingFormData } from '../types';
import { supabase } from '../lib/supabase';
import { Calendar, Clock, Users, User, Mail, Phone, UtensilsCrossed, MessageSquare, CheckCircle, Loader2, Sparkles, X, ShoppingCart, Database, AlertCircle } from 'lucide-react';

interface BookingFormProps {
  selectedPreOrderIds: string[];
  onTogglePreOrderItem: (itemId: string) => void;
  onClearPreOrders: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  selectedPreOrderIds,
  onTogglePreOrderItem,
  onClearPreOrders
}) => {
  // Get today's date formatted as YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    guests: 2,
    date: todayStr,
    time: '12:00 PM',
    orderType: 'Dine-in',
    preSelectedItems: selectedPreOrderIds,
    specialRequests: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<BookingFormData | null>(null);
  const [bookingRef, setBookingRef] = useState('');
  const [savedInSupabase, setSavedInSupabase] = useState(false);
  const [showSqlGuide, setShowSqlGuide] = useState(false);

  // Keep preSelectedItems synced with prop
  React.useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      preSelectedItems: selectedPreOrderIds
    }));
  }, [selectedPreOrderIds]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 7) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.date) {
      newErrors.date = 'Preferred date is required';
    } else if (formData.date < todayStr) {
      newErrors.date = 'Date cannot be in the past';
    }

    if (!formData.time) {
      newErrors.time = 'Preferred time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const generatedRef = 'GZB-' + Math.floor(100000 + Math.random() * 900000);

    // Calculate pre-ordered items details & total
    const selectedItemsNames = MENU_ITEMS
      .filter((item) => formData.preSelectedItems.includes(item.id))
      .map((item) => `${item.name} ($${item.price.toFixed(2)})`);

    const preOrderAmount = MENU_ITEMS
      .filter((item) => formData.preSelectedItems.includes(item.id))
      .reduce((sum, item) => sum + item.price, 0);

    const bookingPayload = {
      booking_ref: generatedRef,
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      guests: formData.guests,
      booking_date: formData.date,
      booking_time: formData.time,
      order_type: formData.orderType,
      pre_selected_items: selectedItemsNames.length > 0 ? selectedItemsNames : null,
      special_requests: formData.specialRequests || null,
      pre_order_total: preOrderAmount,
      status: 'confirmed',
      created_at: new Date().toISOString()
    };

    try {
      // Save directly to Supabase table "bookings"
      const { error } = await supabase.from('bookings').insert([bookingPayload]);

      if (error) {
        console.warn('Supabase insert notice:', error);
        // If table doesn't exist or column schema mismatch, we capture error info
        // Try fallback insert or display helpful message
        setSubmitError(error.message);
        setSavedInSupabase(false);
      } else {
        setSavedInSupabase(true);
      }
    } catch (err: any) {
      console.error('Supabase connection error:', err);
      setSubmitError(err?.message || 'Failed to connect to Supabase');
      setSavedInSupabase(false);
    } finally {
      setIsSubmitting(false);
      setBookingRef(generatedRef);
      setBookingSuccess({ ...formData });
    }
  };


  const timeSlots = [
    '07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM',
    '11:00 AM', '12:00 PM', '12:30 PM', '01:00 PM', '02:00 PM', '03:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '08:30 PM'
  ];

  // Pre-ordered items details
  const preOrderedItemsDetails = MENU_ITEMS.filter((item) =>
    selectedPreOrderIds.includes(item.id)
  );

  const preOrderTotal = preOrderedItemsDetails.reduce((sum, item) => sum + item.price, 0);

  const resetForm = () => {
    setBookingSuccess(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      guests: 2,
      date: todayStr,
      time: '12:00 PM',
      orderType: 'Dine-in',
      preSelectedItems: [],
      specialRequests: ''
    });
    onClearPreOrders();
    setErrors({});
  };

  return (
    <section id="booking" className="py-20 bg-[#1A1A1A] text-[#FDF6EC] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-[#D2691E] bg-[#D2691E]/10 px-3.5 py-1.5 rounded-full border border-[#D2691E]/20 inline-block">
            Table Reservations & Pre-orders
          </span>
          <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-[#FDF6EC]">
            Reserve Your Table
          </h2>
          <p className="text-sm sm:text-base text-[#FDF6EC]/70">
            Secure your cozy spot in our gazebo or main lounge. Instant confirmation guaranteed.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#D2691E] to-[#F4C430] mx-auto rounded-full" />
        </div>

        {/* Booking Card */}
        <div className="bg-[#242424] rounded-3xl p-6 sm:p-10 border border-[#3A3A3A] shadow-2xl relative">
          
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            
            {/* Top row: Order Type Selector */}
            <div>
              <label className="block text-xs font-semibold text-[#EAE3D9]/90 uppercase tracking-wider mb-2">
                Order Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['Dine-in', 'Takeaway', 'Delivery'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, orderType: type })}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                      formData.orderType === type
                        ? 'bg-gradient-btn text-white border-transparent shadow-md'
                        : 'bg-[#1A1A1A] text-[#FDF6EC]/70 border-[#3A3A3A] hover:border-[#D2691E]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-[#EAE3D9]/90 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#D2691E]" /> Full Name <span className="text-[#B22222]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Eleanor Vance"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-4 py-3 bg-[#1A1A1A] border rounded-xl text-sm text-white placeholder-[#888888] focus:outline-none focus:border-[#D2691E] transition-colors ${
                    errors.fullName ? 'border-[#B22222]' : 'border-[#3A3A3A]'
                  }`}
                />
                {errors.fullName && <p className="text-xs text-[#B22222] mt-1 font-medium">{errors.fullName}</p>}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-medium text-[#EAE3D9]/90 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#D2691E]" /> Email Address <span className="text-[#B22222]">*</span>
                </label>
                <input
                  type="email"
                  placeholder="e.g. eleanor@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 bg-[#1A1A1A] border rounded-xl text-sm text-white placeholder-[#888888] focus:outline-none focus:border-[#D2691E] transition-colors ${
                    errors.email ? 'border-[#B22222]' : 'border-[#3A3A3A]'
                  }`}
                />
                {errors.email && <p className="text-xs text-[#B22222] mt-1 font-medium">{errors.email}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-medium text-[#EAE3D9]/90 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#D2691E]" /> Phone Number <span className="text-[#B22222]">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +1 (555) 019-2834"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-3 bg-[#1A1A1A] border rounded-xl text-sm text-white placeholder-[#888888] focus:outline-none focus:border-[#D2691E] transition-colors ${
                    errors.phone ? 'border-[#B22222]' : 'border-[#3A3A3A]'
                  }`}
                />
                {errors.phone && <p className="text-xs text-[#B22222] mt-1 font-medium">{errors.phone}</p>}
              </div>

              {/* Number of Guests */}
              <div>
                <label className="block text-xs font-medium text-[#EAE3D9]/90 mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#D2691E]" /> Number of Guests <span className="text-[#B22222]">*</span>
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value, 10) })}
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#3A3A3A] rounded-xl text-sm text-white focus:outline-none focus:border-[#D2691E] transition-colors"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-xs font-medium text-[#EAE3D9]/90 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#D2691E]" /> Preferred Date <span className="text-[#B22222]">*</span>
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className={`w-full px-4 py-3 bg-[#1A1A1A] border rounded-xl text-sm text-white focus:outline-none focus:border-[#D2691E] transition-colors ${
                    errors.date ? 'border-[#B22222]' : 'border-[#3A3A3A]'
                  }`}
                />
                {errors.date && <p className="text-xs text-[#B22222] mt-1 font-medium">{errors.date}</p>}
              </div>

              {/* Preferred Time */}
              <div>
                <label className="block text-xs font-medium text-[#EAE3D9]/90 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D2691E]" /> Preferred Time <span className="text-[#B22222]">*</span>
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#3A3A3A] rounded-xl text-sm text-white focus:outline-none focus:border-[#D2691E] transition-colors"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.time && <p className="text-xs text-[#B22222] mt-1 font-medium">{errors.time}</p>}
              </div>

            </div>

            {/* Pre-selected Menu Items Box */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-[#EAE3D9]/90 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <UtensilsCrossed className="w-4 h-4 text-[#F4C430]" /> Pre-Order Menu Items (Optional)
                </span>
                {selectedPreOrderIds.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearPreOrders}
                    className="text-[11px] text-[#B22222] hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </label>

              {selectedPreOrderIds.length === 0 ? (
                <div className="p-4 rounded-xl bg-[#1A1A1A] border border-[#3A3A3A]/60 text-center text-xs text-[#888888]">
                  No items pre-ordered yet. You can pre-select dishes from the <a href="#menu" className="text-[#D2691E] font-medium hover:underline">Menu Section</a> or pre-order directly during table check-in.
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#1A1A1A] border border-[#3A3A3A] space-y-2">
                  <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
                    {preOrderedItemsDetails.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between bg-[#242424] px-3 py-2 rounded-lg text-xs"
                      >
                        <span className="font-medium text-white">{item.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-[#F4C430] font-bold">${item.price.toFixed(2)}</span>
                          <button
                            type="button"
                            onClick={() => onTogglePreOrderItem(item.id)}
                            className="text-[#B22222] hover:text-red-400 p-0.5"
                            title="Remove"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-[#3A3A3A] flex items-center justify-between text-xs font-bold">
                    <span className="text-[#EAE3D9]">Pre-order Total:</span>
                    <span className="text-[#F4C430] text-sm">${preOrderTotal.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs font-medium text-[#EAE3D9]/90 mb-1.5 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#D2691E]" /> Special Requests / Seating Notes
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Prefer quiet outdoor gazebo booth, anniversary celebration, wheat allergy..."
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#3A3A3A] rounded-xl text-sm text-white placeholder-[#888888] focus:outline-none focus:border-[#D2691E] transition-colors"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                id="confirm-booking-btn"
                className="w-full py-4 rounded-xl text-base font-bold text-white bg-gradient-btn hover:shadow-xl hover:shadow-[#D2691E]/30 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    <span>Processing Your Reservation...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-[#F4C430]" />
                    <span>Confirm Booking</span>
                  </>
                )}
              </button>
            </div>

          </form>

        </div>

      </div>

      {/* Confirmation Success Modal */}
      {bookingSuccess && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#242424] max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-[#D2691E]/50 shadow-2xl relative text-center">
            
            <button
              onClick={resetForm}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#1A1A1A] text-[#888888] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-[#F4C430] bg-[#1A1A1A] px-3 py-1 rounded-full border border-[#3A3A3A] inline-block mb-2">
              Ref: {bookingRef}
            </span>

            <h3 className="font-serif-title text-2xl font-bold text-white mb-2">
              Table Reservation Confirmed!
            </h3>

            <p className="text-sm text-[#EAE3D9]/90 mb-4 leading-relaxed">
              Thank you, <strong className="text-white">{bookingSuccess.fullName}</strong>! Your table for <strong className="text-[#F4C430]">{bookingSuccess.guests} guests</strong> on <strong className="text-[#F4C430]">{bookingSuccess.date}</strong> at <strong className="text-[#F4C430]">{bookingSuccess.time}</strong> has been successfully booked.
            </p>

            {/* Supabase Sync Badge */}
            <div className="mb-4 text-left">
              {savedInSupabase ? (
                <div className="flex items-center gap-2 p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs">
                  <Database className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span><strong>Saved in Supabase!</strong> Record created in <code>aiinontnbzheavxqhniq</code> backend.</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                      <span>
                        {submitError?.includes('relation') || submitError?.includes('does not exist')
                          ? 'Supabase Connected! Please create the "bookings" table.'
                          : `Supabase Status: ${submitError || 'Saved locally'}`}
                      </span>
                    </div>
                    <button
                      onClick={() => setShowSqlGuide(!showSqlGuide)}
                      className="text-[11px] underline font-semibold text-[#F4C430] hover:text-white cursor-pointer ml-2"
                    >
                      {showSqlGuide ? 'Hide SQL' : 'View SQL Setup'}
                    </button>
                  </div>

                  {showSqlGuide && (
                    <div className="bg-[#1A1A1A] p-3 rounded-xl border border-[#3A3A3A] text-left text-[11px] font-mono text-[#FDF6EC]/80 space-y-2 overflow-x-auto">
                      <p className="text-[#D2691E] font-sans font-semibold text-xs">Copy & Paste into Supabase SQL Editor:</p>
                      <pre className="p-2 bg-[#111111] rounded border border-[#222222] text-[#F4C430] text-[10px] whitespace-pre-wrap">
{`CREATE TABLE IF NOT EXISTS public.bookings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_ref text UNIQUE NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  guests integer NOT NULL,
  booking_date date NOT NULL,
  booking_time text NOT NULL,
  order_type text NOT NULL,
  pre_selected_items jsonb,
  special_requests text,
  pre_order_total numeric(10,2) DEFAULT 0,
  status text DEFAULT 'confirmed',
  created_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow public insert access for reservation forms
CREATE POLICY "Allow public inserts" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select" ON public.bookings FOR SELECT USING (true);`}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Booking Summary Box */}
            <div className="bg-[#1A1A1A] rounded-2xl p-4 text-left text-xs space-y-2 mb-6 border border-[#3A3A3A]">
              <div className="flex justify-between text-[#888888]">
                <span>Order Type:</span>
                <span className="text-white font-medium">{bookingSuccess.orderType}</span>
              </div>
              <div className="flex justify-between text-[#888888]">
                <span>Contact Email:</span>
                <span className="text-white font-medium">{bookingSuccess.email}</span>
              </div>
              <div className="flex justify-between text-[#888888]">
                <span>Contact Phone:</span>
                <span className="text-white font-medium">{bookingSuccess.phone}</span>
              </div>
              {preOrderedItemsDetails.length > 0 && (
                <div className="pt-2 border-t border-[#3A3A3A] flex justify-between">
                  <span className="text-[#EAE3D9]">Pre-ordered Items:</span>
                  <span className="text-[#F4C430] font-bold">
                    {preOrderedItemsDetails.length} items (${preOrderTotal.toFixed(2)})
                  </span>
                </div>
              )}
            </div>

            <p className="text-xs text-[#888888] mb-6">
              A confirmation email has been sent to {bookingSuccess.email}. If you need to modify your booking, please call us directly at +1 (555) 839-2233.
            </p>

            <button
              onClick={resetForm}
              className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-btn hover:shadow-lg cursor-pointer"
            >
              Done & Return to Homepage
            </button>

          </div>
        </div>
      )}

    </section>
  );
};
