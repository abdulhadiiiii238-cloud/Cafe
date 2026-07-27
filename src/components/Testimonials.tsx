import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/cafeData';
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquarePlus } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-[#242424] text-[#FDF6EC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-[#F4C430] bg-[#F4C430]/10 px-3.5 py-1.5 rounded-full border border-[#F4C430]/20 inline-block">
            Loved By Coffee Enthusiasts
          </span>
          <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-[#FDF6EC]">
            What Our Guests Say
          </h2>
          <p className="text-sm sm:text-base text-[#FDF6EC]/70">
            Real stories from our cherished neighborhood community and daily coffee lovers.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#D2691E] to-[#F4C430] mx-auto rounded-full" />
        </div>

        {/* Highlight Featured Testimonial Carousel */}
        <div className="max-w-4xl mx-auto mb-16 relative">
          <div className="bg-[#1A1A1A] rounded-3xl p-8 sm:p-12 border border-[#3A3A3A] shadow-2xl relative overflow-hidden">
            <Quote className="absolute top-6 right-6 w-20 h-20 text-[#3A3A3A]/30 pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
              <img
                src={TESTIMONIALS[activeIndex].avatar}
                alt={TESTIMONIALS[activeIndex].name}
                className="w-20 h-20 rounded-full object-cover border-2 border-[#D2691E] shadow-md shrink-0"
                referrerPolicy="no-referrer"
              />

              <div className="space-y-4 text-center sm:text-left flex-1">
                {/* 5 Yellow Stars */}
                <div className="flex items-center justify-center sm:justify-start gap-1">
                  {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#F4C430] text-[#F4C430]" />
                  ))}
                </div>

                <p className="font-serif-title italic text-lg sm:text-xl text-[#FDF6EC] leading-relaxed">
                  "{TESTIMONIALS[activeIndex].comment}"
                </p>

                <div>
                  <h4 className="font-serif-title text-lg font-bold text-[#F4C430]">
                    {TESTIMONIALS[activeIndex].name}
                  </h4>
                  <p className="text-xs text-[#888888]">{TESTIMONIALS[activeIndex].role} • {TESTIMONIALS[activeIndex].date}</p>
                </div>
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="mt-8 pt-6 border-t border-[#3A3A3A] flex items-center justify-between">
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeIndex === idx ? 'w-8 bg-[#D2691E]' : 'w-2 bg-[#3A3A3A]'
                    }`}
                    aria-label={`Go to review ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-[#242424] text-white hover:bg-[#D2691E] transition-colors cursor-pointer border border-[#3A3A3A]"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-[#242424] text-white hover:bg-[#D2691E] transition-colors cursor-pointer border border-[#3A3A3A]"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* All Reviews Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-[#1A1A1A] p-6 rounded-2xl border border-[#3A3A3A]/70 hover:border-[#D2691E]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F4C430] text-[#F4C430]" />
                  ))}
                </div>
                <p className="text-xs text-[#FDF6EC]/80 leading-relaxed font-light mb-4 line-clamp-4 italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#3A3A3A]">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#D2691E]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h5 className="font-semibold text-xs text-white">{item.name}</h5>
                  <p className="text-[10px] text-[#888888]">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
