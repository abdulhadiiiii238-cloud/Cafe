import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/cafeData';
import { GalleryItem } from '../types';
import { Maximize2, X, Image as ImageIcon } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Interior' | 'Coffee' | 'Food'>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredGallery = GALLERY_ITEMS.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  );

  return (
    <section id="gallery" className="py-20 bg-[#242424] text-[#FDF6EC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-[#D2691E] bg-[#D2691E]/10 px-3.5 py-1.5 rounded-full border border-[#D2691E]/20 inline-block">
            Visual Experience
          </span>
          <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-[#FDF6EC]">
            A Glimpse Inside Gazebo
          </h2>
          <p className="text-sm sm:text-base text-[#FDF6EC]/70">
            Explore our cozy corners, handcrafted brews, and artisan culinary moments.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#D2691E] to-[#F4C430] mx-auto rounded-full" />
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {(['All', 'Interior', 'Coffee', 'Food'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#D2691E] text-white shadow-md'
                  : 'bg-[#1A1A1A] text-[#FDF6EC]/70 hover:text-white border border-[#3A3A3A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative h-72 rounded-2xl overflow-hidden border border-[#3A3A3A] cursor-pointer shadow-lg bg-[#1A1A1A]"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Dark Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#F4C430] mb-1">
                  {item.category}
                </span>
                <h3 className="font-serif-title text-xl font-bold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#EAE3D9]/90 line-clamp-2">
                  {item.description}
                </p>

                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#1A1A1A]/80 backdrop-blur-md flex items-center justify-center text-white border border-[#3A3A3A]">
                  <Maximize2 className="w-4 h-4 text-[#F4C430]" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-4xl w-full bg-[#1A1A1A] rounded-2xl overflow-hidden border border-[#3A3A3A] shadow-2xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-[#D2691E] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid md:grid-cols-12 gap-0">
              <div className="md:col-span-8 bg-black h-80 md:h-[500px]">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="md:col-span-4 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-[#F4C430] tracking-wider block mb-2">
                    {selectedImage.category}
                  </span>
                  <h3 className="font-serif-title text-2xl font-bold text-white mb-3">
                    {selectedImage.title}
                  </h3>
                  <p className="text-sm text-[#EAE3D9]/80 leading-relaxed font-light">
                    {selectedImage.description}
                  </p>
                </div>
                <div className="pt-6 border-t border-[#3A3A3A] mt-6 flex items-center justify-between text-xs text-[#888888]">
                  <span>Gazebo Cafe Gallery</span>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="text-[#D2691E] font-semibold hover:underline"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
