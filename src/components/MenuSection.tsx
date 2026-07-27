import React, { useState } from 'react';
import { MENU_ITEMS } from '../data/menuData';
import { MenuCategory, MenuItem } from '../types';
import { Coffee, Search, Plus, Check, Star, Sparkles, ShoppingBag } from 'lucide-react';

interface MenuSectionProps {
  selectedPreOrderIds: string[];
  onTogglePreOrderItem: (itemId: string) => void;
  onGoToBooking: () => void;
}

const CATEGORIES: MenuCategory[] = [
  'Coffee & Beverages',
  'Breakfast',
  'Snacks & Pastries',
  'Desserts',
  'Specials'
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  selectedPreOrderIds,
  onTogglePreOrderItem,
  onGoToBooking
}) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('Coffee & Beverages');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyPopular, setShowOnlyPopular] = useState(false);

  // Filter menu items based on category, search query, and popular flag
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPopular = showOnlyPopular ? item.isPopular || item.badge === "Chef's Special" || item.badge === 'Most Popular' : true;

    return matchesCategory && matchesSearch && matchesPopular;
  });

  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case "Chef's Special":
        return 'bg-gradient-to-r from-[#B22222] to-[#D2691E] text-white font-bold border-amber-300/30';
      case 'Most Popular':
        return 'bg-[#D2691E] text-white font-bold';
      case 'New':
        return 'bg-[#F4C430] text-[#1A1A1A] font-bold';
      case 'Vegan Option':
        return 'bg-emerald-800 text-emerald-100 font-medium';
      default:
        return 'bg-[#3A3A3A] text-white';
    }
  };

  return (
    <section id="menu" className="py-20 bg-[#1A1A1A] text-[#FDF6EC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-[#F4C430] bg-[#F4C430]/10 px-3.5 py-1.5 rounded-full border border-[#F4C430]/20 inline-block">
            Handcrafted Menu
          </span>
          <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-[#FDF6EC]">
            Savor Our Culinary Creations
          </h2>
          <p className="text-sm sm:text-base text-[#FDF6EC]/70">
            Every beverage is freshly pulled, every dish cooked to order with farm-fresh ingredients.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#D2691E] to-[#F4C430] mx-auto rounded-full" />
        </div>

        {/* Search & Pre-order Summary Banner */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4 bg-[#242424] p-4 rounded-2xl border border-[#3A3A3A]">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
            <input
              type="text"
              placeholder="Search coffee, toast, pastries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#1A1A1A] border border-[#3A3A3A] rounded-xl text-sm text-white placeholder-[#888888] focus:outline-none focus:border-[#D2691E] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#888888] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Filter Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <button
              onClick={() => setShowOnlyPopular(!showOnlyPopular)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                showOnlyPopular
                  ? 'bg-[#F4C430] text-[#1A1A1A] border-[#F4C430]'
                  : 'bg-[#1A1A1A] text-[#FDF6EC]/80 border-[#3A3A3A] hover:border-[#D2691E]'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${showOnlyPopular ? 'fill-[#1A1A1A]' : 'text-[#F4C430]'}`} />
              <span>Chef's Choice & Popular Only</span>
            </button>

            {/* Pre-order Cart Quick Button */}
            {selectedPreOrderIds.length > 0 && (
              <button
                onClick={onGoToBooking}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-btn flex items-center gap-2 shadow-lg animate-bounce"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Pre-ordered ({selectedPreOrderIds.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start md:justify-center overflow-x-auto gap-2 pb-4 mb-10 no-scrollbar">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            const categoryCount = MENU_ITEMS.filter((i) => i.category === category).length;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-btn text-white shadow-lg shadow-[#D2691E]/25 transform scale-105'
                    : 'bg-[#242424] text-[#FDF6EC]/75 hover:bg-[#2A2A2A] hover:text-white border border-[#3A3A3A]/60'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-mono ${
                    isActive ? 'bg-black/30 text-white' : 'bg-[#1A1A1A] text-[#888888]'
                  }`}
                >
                  {categoryCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#242424] rounded-2xl border border-[#3A3A3A]">
            <Coffee className="w-12 h-12 text-[#3A3A3A] mx-auto mb-3" />
            <p className="text-lg font-medium text-white">No items found matching your filter</p>
            <p className="text-sm text-[#888888] mt-1">Try clearing your search query or selecting a different category.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setShowOnlyPopular(false);
              }}
              className="mt-4 px-4 py-2 bg-[#3A3A3A] text-xs font-semibold text-white rounded-lg hover:bg-[#D2691E]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isPreSelected = selectedPreOrderIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="bg-[#242424] rounded-2xl overflow-hidden border border-[#3A3A3A]/80 hover:border-[#D2691E]/60 transition-all duration-300 hover:shadow-xl hover:shadow-[#D2691E]/10 flex flex-col group relative"
                >
                  {/* Item Image with Badge */}
                  <div className="relative h-48 overflow-hidden bg-[#1A1A1A]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#242424] via-transparent to-transparent opacity-80" />

                    {/* Badge */}
                    {item.badge && (
                      <span
                        className={`absolute top-3 left-3 text-[11px] px-2.5 py-1 rounded-md shadow-md border ${getBadgeStyle(
                          item.badge
                        )}`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {/* Price Tag */}
                    <span className="absolute bottom-3 right-3 text-lg font-bold font-serif-title text-[#F4C430] bg-[#1A1A1A]/90 px-3 py-1 rounded-xl border border-[#3A3A3A] shadow-md">
                      ${item.price.toFixed(2)}
                    </span>

                    {/* Calories info */}
                    {item.calories && (
                      <span className="absolute top-3 right-3 text-[10px] text-white/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs font-mono">
                        {item.calories}
                      </span>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif-title text-xl font-bold text-white mb-1.5 group-hover:text-[#F4C430] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#FDF6EC]/75 leading-relaxed font-light mb-4 line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Add to Pre-order Action */}
                    <div className="pt-3 border-t border-[#3A3A3A]/60 flex items-center justify-between mt-auto">
                      <span className="text-xs text-[#888888] italic">Freshly Prepared</span>
                      
                      <button
                        onClick={() => onTogglePreOrderItem(item.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                          isPreSelected
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-[#1A1A1A] text-[#FDF6EC] hover:bg-[#D2691E] hover:text-white border border-[#3A3A3A]'
                        }`}
                        title={isPreSelected ? 'Remove from pre-order' : 'Add to table booking pre-order'}
                      >
                        {isPreSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Pre-ordered</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Booking</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Menu Note & Booking Callout */}
        <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-[#242424] via-[#2D231A] to-[#242424] border border-[#D2691E]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D2691E]/20 flex items-center justify-center text-[#F4C430] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif-title text-lg font-bold text-white">Have Special Dietary Requirements?</h4>
              <p className="text-xs text-[#EAE3D9]/80">We offer oat, almond, soy milk substitutions and gluten-free pastries on request.</p>
            </div>
          </div>
          <button
            onClick={onGoToBooking}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-btn hover:shadow-md whitespace-nowrap cursor-pointer"
          >
            Reserve Table & Pre-Order
          </button>
        </div>

      </div>
    </section>
  );
};
