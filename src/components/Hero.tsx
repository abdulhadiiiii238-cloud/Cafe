import React from 'react';
import { Calendar, Utensils, Star, Award, ShieldCheck, Heart } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onMenuClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onMenuClick }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[#1A1A1A]">
      {/* Background Image with Dark Overlay Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=2000&q=80"
          alt="Gazebo Cafe Ambiance"
          className="w-full h-full object-cover object-center filter brightness-[0.38] scale-105 transform animate-pulse duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-[#1A1A1A]/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D2691E]/20 border border-[#D2691E]/40 text-[#F4C430] text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
              <Star className="w-3.5 h-3.5 fill-[#F4C430]" />
              <span>Voted Best Local Cafe 2025</span>
            </div>

            {/* Main Title & Tagline */}
            <div className="space-y-2">
              <h1 className="font-serif-title text-4xl sm:text-6xl lg:text-7xl font-bold text-[#FDF6EC] leading-none tracking-tight">
                Gazebo <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D2691E] via-[#F4C430] to-[#B22222]">Cafe</span>
              </h1>
              <p className="font-serif-title italic text-xl sm:text-2xl text-[#F4C430] font-medium tracking-wide pt-1">
                "Where Every Cup Tells a Story"
              </p>
            </div>

            {/* Welcoming Description */}
            <p className="text-base sm:text-lg text-[#FDF6EC]/85 max-w-2xl leading-relaxed font-light">
              Step into a warm sanctuary of rich aromas and artisan flavors. We hand-pick single-origin beans, bake golden pastries fresh daily, and cultivate a cozy garden gazebo ambiance where memories are shared over extraordinary coffee.
            </p>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onBookClick}
                id="hero-book-btn"
                className="px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-btn hover:shadow-xl hover:shadow-[#D2691E]/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 cursor-pointer group"
              >
                <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Book a Table</span>
              </button>

              <button
                onClick={onMenuClick}
                id="hero-menu-btn"
                className="px-8 py-4 rounded-xl text-base font-semibold text-[#FDF6EC] bg-[#2A2A2A]/80 hover:bg-[#3A3A3A] border border-[#3A3A3A] hover:border-[#D2691E] transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <Utensils className="w-5 h-5 text-[#F4C430]" />
                <span>View Our Menu</span>
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-8 border-t border-[#3A3A3A]/60 grid grid-cols-3 gap-4 text-xs text-[#EAE3D9]/80">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-[#2A2A2A] text-[#D2691E]">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-white block">100% Organic</span>
                  <span className="text-[11px] text-[#3A3A3A]/90">Ethical Sourcing</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-[#2A2A2A] text-[#F4C430]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-white block">Artisan Bakes</span>
                  <span className="text-[11px] text-[#3A3A3A]/90">Baked Daily at 6AM</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-[#2A2A2A] text-[#B22222]">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-white block">Cozy Garden</span>
                  <span className="text-[11px] text-[#3A3A3A]/90">Pet Friendly Terrace</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Floating Visual Card */}
          <div className="lg:col-span-5 hidden lg:block relative">
            <div className="relative mx-auto max-w-sm rounded-3xl p-2 bg-gradient-to-b from-[#D2691E]/30 to-[#3A3A3A]/30 border border-[#D2691E]/30 shadow-2xl backdrop-blur-md">
              <div className="overflow-hidden rounded-2xl relative group">
                <img
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
                  alt="Gazebo Special Pour"
                  className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-80" />
                
                {/* Floating Special Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#1A1A1A]/90 border border-[#3A3A3A] backdrop-blur-md p-4 rounded-xl flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#D2691E]/20 flex items-center justify-center text-[#F4C430] font-bold text-lg">
                    ☕
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#D2691E] font-bold block">Chef's Special</span>
                    <p className="text-sm font-medium text-white">Gazebo Cardamom Honey Brew</p>
                    <p className="text-xs text-[#F4C430] font-semibold mt-0.5">$5.50 • Fresh Batch</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
