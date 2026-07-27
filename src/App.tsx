import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { MenuSection } from './components/MenuSection';
import { GallerySection } from './components/GallerySection';
import { BookingForm } from './components/BookingForm';
import { Testimonials } from './components/Testimonials';
import { HoursAndLocation } from './components/HoursAndLocation';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  const [selectedPreOrderIds, setSelectedPreOrderIds] = useState<string[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  const handleTogglePreOrderItem = (itemId: string) => {
    setSelectedPreOrderIds((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleClearPreOrders = () => {
    setSelectedPreOrderIds([]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#FDF6EC] font-sans antialiased selection:bg-[#D2691E] selection:text-white">
      {/* Sticky Top Header Navigation */}
      <Header onBookClick={() => scrollToSection('booking')} />

      {/* Main Single-Page Sections */}
      <main>
        <Hero
          onBookClick={() => scrollToSection('booking')}
          onMenuClick={() => scrollToSection('menu')}
        />

        <About />

        <MenuSection
          selectedPreOrderIds={selectedPreOrderIds}
          onTogglePreOrderItem={handleTogglePreOrderItem}
          onGoToBooking={() => scrollToSection('booking')}
        />

        <GallerySection />

        <BookingForm
          selectedPreOrderIds={selectedPreOrderIds}
          onTogglePreOrderItem={handleTogglePreOrderItem}
          onClearPreOrders={handleClearPreOrders}
        />

        <Testimonials />

        <HoursAndLocation />
      </main>

      {/* Footer with Admin Link */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Floating Scroll To Top Button */}
      <ScrollToTop />

      {/* Master Admin Panel Modal */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
