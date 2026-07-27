import React from 'react';
import { Coffee, Sparkles, Leaf, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { CAFE_HIGHLIGHTS } from '../data/cafeData';

export const About: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee':
        return <Coffee className="w-6 h-6 text-[#D2691E]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#F4C430]" />;
      case 'Leaf':
        return <Leaf className="w-6 h-6 text-emerald-400" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-[#B22222]" />;
      default:
        return <Coffee className="w-6 h-6 text-[#D2691E]" />;
    }
  };

  return (
    <section id="about" className="py-20 bg-[#242424] text-[#FDF6EC] relative overflow-hidden">
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D2691E]/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B22222]/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-[#D2691E] bg-[#D2691E]/10 px-3.5 py-1.5 rounded-full border border-[#D2691E]/20 inline-block">
            Our Heritage & Passion
          </span>
          <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-[#FDF6EC]">
            Crafting Warmth & Connection Since 2018
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#D2691E] to-[#F4C430] mx-auto rounded-full" />
        </div>

        {/* Story Grid: Text + Image */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Cafe Story Text */}
          <div className="lg:col-span-7 space-y-5 text-left text-[#FDF6EC]/90 leading-relaxed font-light text-base sm:text-lg">
            <p>
              <strong className="font-semibold text-white">Gazebo Cafe</strong> was born out of a simple, heartfelt dream: to build a tranquil neighborhood sanctuary where the aroma of freshly roasted coffee beans welcomes you like coming home. What started as a modest espresso cart nestled under an old oak gazebo has grown into one of the city's most beloved coffee destinations.
            </p>
            <p>
              We believe that coffee is more than just a morning routine — it is a ritual of comfort, creativity, and connection. Every batch of single-origin coffee beans is carefully selected from sustainable small-holder farms, roasted to highlight its distinct flavor notes, and brewed with meticulous craftsmanship by our expert baristas.
            </p>
            <p>
              Whether you are catching up with old friends in our leafy garden gazebo, settling in with a good book, or enjoying our daily hand-laminated pastries, Gazebo Cafe offers a warm and welcoming space designed to make every visit feel extraordinary.
            </p>

            <div className="pt-3 grid grid-cols-2 gap-3 text-sm font-medium text-[#FDF6EC]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#F4C430] shrink-0" />
                <span>Single-Origin Roast Specialty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#F4C430] shrink-0" />
                <span>Daily Handcrafted Bakery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#F4C430] shrink-0" />
                <span>Outdoor Garden Gazebo Terrace</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#F4C430] shrink-0" />
                <span>Community & Pet Friendly</span>
              </div>
            </div>
          </div>

          {/* Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#3A3A3A] group">
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80"
                alt="Barista at Gazebo Cafe"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-60" />
              
              {/* Overlay Stat Card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#1A1A1A]/90 border border-[#3A3A3A] backdrop-blur-md flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold font-serif-title text-[#F4C430]">250,000+</span>
                  <p className="text-xs text-[#EAE3D9]/80 font-medium">Cups Brewed With Love</p>
                </div>
                <div className="h-8 w-px bg-[#3A3A3A]" />
                <div>
                  <span className="text-2xl font-bold font-serif-title text-[#D2691E]">100%</span>
                  <p className="text-xs text-[#EAE3D9]/80 font-medium">Fair Trade Certified</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Highlight Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {CAFE_HIGHLIGHTS.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-[#1A1A1A] border border-[#3A3A3A]/70 hover:border-[#D2691E]/60 transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#2A2A2A] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {getIcon(item.iconName)}
              </div>
              <h3 className="font-serif-title text-lg font-bold text-white mb-2 group-hover:text-[#F4C430] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-[#FDF6EC]/70 leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
