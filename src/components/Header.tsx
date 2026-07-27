import React, { useState, useEffect } from 'react';
import { Coffee, Menu, X, Calendar, MapPin, Phone } from 'lucide-react';

interface HeaderProps {
  onBookClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Simple active section detection
      const sections = ['home', 'about', 'menu', 'gallery', 'booking', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Menu', href: '#menu', id: 'menu' },
    { name: 'Gallery', href: '#gallery', id: 'gallery' },
    { name: 'Book a Table', href: '#booking', id: 'booking' },
    { name: 'Testimonials', href: '#testimonials', id: 'testimonials' },
    { name: 'Contact', href: '#contact', id: 'contact' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#1A1A1A]/95 backdrop-blur-md py-3 shadow-xl border-b border-[#3A3A3A]/50'
          : 'bg-gradient-to-b from-[#1A1A1A]/90 to-transparent py-5'
      }`}
    >
      {/* Top micro banner for quick contact */}
      <div className="hidden lg:block text-xs border-b border-[#3A3A3A]/40 pb-2 mb-3 px-6 text-[#EAE3D9]/70">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 hover:text-[#F4C430] transition-colors">
              <MapPin className="w-3.5 h-3.5 text-[#D2691E]" /> 428 Gazebo Way, Coffee District
            </span>
            <span className="flex items-center gap-1.5 hover:text-[#F4C430] transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#D2691E]" /> +1 (555) 839-2233
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#F4C430] font-medium">★ 4.9 Rating (1,200+ Reviews)</span>
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Open Today: 7:00 AM – 9:00 PM
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2.5 group cursor-pointer"
          id="logo-link"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D2691E] to-[#B22222] p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#1A1A1A] rounded-full flex items-center justify-center">
              <Coffee className="w-5 h-5 text-[#F4C430] group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div>
            <span className="font-serif-title text-2xl font-bold tracking-tight text-[#FDF6EC] block leading-none">
              Gazebo <span className="text-[#D2691E]">Cafe</span>
            </span>
            <span className="text-[10px] tracking-widest uppercase text-[#F4C430]/90 font-medium block mt-0.5">
              Est. 2018
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                  isActive
                    ? 'text-[#F4C430] font-semibold'
                    : 'text-[#FDF6EC]/85 hover:text-[#D2691E] hover:bg-[#2A2A2A]/50'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#D2691E] rounded-full animate-fade-in" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Book Now Action & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const element = document.getElementById('booking');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
              onBookClick();
            }}
            id="header-book-btn"
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-btn hover:shadow-lg hover:shadow-[#D2691E]/20 transform active:scale-95 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Now</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#FDF6EC] hover:bg-[#2A2A2A] transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#F4C430]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1A1A1A] border-b border-[#3A3A3A] px-4 pt-3 pb-6 shadow-2xl animate-fade-in">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between ${
                  activeSection === link.id
                    ? 'bg-[#2A2A2A] text-[#F4C430] border-l-4 border-[#D2691E]'
                    : 'text-[#FDF6EC] hover:bg-[#2A2A2A]/60 hover:text-[#D2691E]'
                }`}
              >
                <span>{link.name}</span>
                <span className="text-xs text-[#3A3A3A] font-mono">→</span>
              </a>
            ))}
            <div className="pt-4 mt-2 border-t border-[#3A3A3A]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  const element = document.getElementById('booking');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                  onBookClick();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-base font-semibold text-white bg-gradient-btn shadow-md"
              >
                <Calendar className="w-5 h-5" />
                <span>Reserve a Table Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
