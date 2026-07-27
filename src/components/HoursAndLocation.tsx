import React from 'react';
import { OPENING_HOURS, CONTACT_INFO } from '../data/cafeData';
import { MapPin, Phone, Mail, Clock, Navigation, ExternalLink, ShieldCheck } from 'lucide-react';

export const HoursAndLocation: React.FC = () => {
  // Determine current day of week to highlight
  const currentDayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday...
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = daysOfWeek[currentDayIndex];

  return (
    <section id="contact" className="py-20 bg-[#1A1A1A] text-[#FDF6EC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-[#D2691E] bg-[#D2691E]/10 px-3.5 py-1.5 rounded-full border border-[#D2691E]/20 inline-block">
            Visit & Contact Us
          </span>
          <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-[#FDF6EC]">
            Opening Hours & Location
          </h2>
          <p className="text-sm sm:text-base text-[#FDF6EC]/70">
            We are situated in the heart of the Coffee District. Drop by or reach out anytime!
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#D2691E] to-[#F4C430] mx-auto rounded-full" />
        </div>

        {/* 2-Column Grid */}
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Left Column: Hours Table & Direct Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Opening Hours Card */}
            <div className="bg-[#242424] rounded-3xl p-6 sm:p-8 border border-[#3A3A3A] shadow-xl">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#3A3A3A]">
                <div className="w-10 h-10 rounded-xl bg-[#D2691E]/20 flex items-center justify-center text-[#F4C430]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-title text-xl font-bold text-white">Opening Hours</h3>
                  <p className="text-xs text-[#888888]">Fresh coffee served daily</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                {OPENING_HOURS.map((item) => {
                  const isToday = item.day === todayName;
                  return (
                    <div
                      key={item.day}
                      className={`flex items-center justify-between py-2 px-3 rounded-xl transition-colors ${
                        isToday
                          ? 'bg-gradient-to-r from-[#D2691E]/30 to-[#B22222]/20 border border-[#D2691E]/50 text-white font-semibold'
                          : 'text-[#EAE3D9]/80 border border-transparent hover:bg-[#1A1A1A]/50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {item.day}
                        {isToday && (
                          <span className="text-[10px] bg-emerald-500 text-black px-2 py-0.5 rounded-full font-bold uppercase">
                            Today
                          </span>
                        )}
                      </span>
                      <span className={isToday ? 'text-[#F4C430] font-mono' : 'text-[#888888] font-mono'}>
                        {item.hours}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct Contact Details */}
            <div className="bg-[#242424] rounded-3xl p-6 sm:p-8 border border-[#3A3A3A] shadow-xl space-y-4">
              <h4 className="font-serif-title text-lg font-bold text-white mb-2">Direct Contact</h4>
              
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-[#D2691E] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-[#888888] block">Street Address</span>
                  <span className="text-white font-medium">{CONTACT_INFO.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <Phone className="w-5 h-5 text-[#D2691E] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-[#888888] block">Phone Line</span>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="text-[#F4C430] font-semibold hover:underline">
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <Mail className="w-5 h-5 text-[#D2691E] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-[#888888] block">Email Reservations & Inquiries</span>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-white hover:text-[#D2691E] hover:underline">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Styled Interactive Map View */}
          <div className="lg:col-span-7">
            <div className="bg-[#242424] rounded-3xl p-4 sm:p-6 border border-[#3A3A3A] shadow-xl h-full flex flex-col justify-between">
              
              {/* Map Canvas Placeholder */}
              <div className="relative w-full h-[380px] sm:h-[420px] rounded-2xl overflow-hidden bg-[#1A1A1A] border border-[#3A3A3A] group">
                {/* Styled Dark Map Image Background */}
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80"
                  alt="Gazebo Cafe Map Area"
                  className="w-full h-full object-cover filter brightness-50 contrast-125 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Map Overlay Grid */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-[#1A1A1A]/60" />

                {/* Animated Location Pin Pinpoint */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-[#D2691E] opacity-40 animate-ping absolute inset-0" />
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#D2691E] to-[#B22222] border-2 border-[#F4C430] shadow-2xl flex items-center justify-center text-white font-bold relative z-10">
                      ☕
                    </div>
                  </div>
                  
                  {/* Pin Popup Label */}
                  <div className="mt-2 bg-[#1A1A1A] text-white px-3 py-1.5 rounded-xl border border-[#D2691E] shadow-2xl text-center">
                    <span className="font-serif-title text-xs font-bold block text-[#F4C430]">Gazebo Cafe</span>
                    <span className="text-[10px] text-[#888888] block">428 Gazebo Way</span>
                  </div>
                </div>

                {/* Top Corner Badge */}
                <div className="absolute top-4 left-4 bg-[#1A1A1A]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#3A3A3A] text-xs font-medium text-white flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-[#F4C430]" />
                  <span>Coffee District Area</span>
                </div>
              </div>

              {/* Get Directions Button */}
              <div className="mt-4 pt-4 border-t border-[#3A3A3A] flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-[#888888] text-center sm:text-left">
                  Valet parking available on weekends. 2 mins walk from Central Transit Station.
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-btn hover:shadow-lg flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
