import React, { useState } from 'react';
import { Coffee, Instagram, Facebook, Twitter, Send, CheckCircle2, Heart, ShieldCheck, Lock } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) {
      setNewsletterError('Please enter your email address');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      setNewsletterError('Please enter a valid email');
      return;
    }

    setSubscribed(true);
    setNewsletterError('');
    setNewsletterEmail('');
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Book a Table', href: '#booking' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact & Hours', href: '#contact' }
  ];

  return (
    <footer className="bg-[#121212] text-[#FDF6EC] border-t border-[#2A2A2A] pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#2A2A2A]">
          
          {/* Brand Info (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#home" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D2691E] to-[#B22222] p-0.5">
                <div className="w-full h-full bg-[#1A1A1A] rounded-full flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-[#F4C430]" />
                </div>
              </div>
              <div>
                <span className="font-serif-title text-2xl font-bold text-white block leading-none">
                  Gazebo <span className="text-[#D2691E]">Cafe</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#F4C430] font-medium block mt-0.5">
                  Est. 2018
                </span>
              </div>
            </a>

            <p className="font-serif-title italic text-sm text-[#F4C430]">
              "Where Every Cup Tells a Story"
            </p>

            <p className="text-xs text-[#888888] leading-relaxed max-w-sm">
              Dedicated to serving artisan single-origin coffees, fresh daily bakery items, and cultivating a peaceful community atmosphere in our garden gazebo.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1A1A1A] border border-[#3A3A3A] flex items-center justify-center text-[#888888] hover:text-[#F4C430] hover:border-[#D2691E] hover:scale-110 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1A1A1A] border border-[#3A3A3A] flex items-center justify-center text-[#888888] hover:text-[#F4C430] hover:border-[#D2691E] hover:scale-110 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1A1A1A] border border-[#3A3A3A] flex items-center justify-center text-[#888888] hover:text-[#F4C430] hover:border-[#D2691E] hover:scale-110 transition-all"
                aria-label="Twitter X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (Col 5-7) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif-title text-base font-bold text-white uppercase tracking-wider text-xs border-l-2 border-[#D2691E] pl-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-[#888888] hover:text-[#D2691E] transition-colors flex items-center gap-1.5"
                  >
                    <span>›</span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
              {/* Admin Sign Up / Login Link */}
              <li className="pt-2 border-t border-[#2A2A2A]">
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="text-[#F4C430] hover:text-white transition-colors flex items-center gap-1.5 font-semibold cursor-pointer group"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D2691E] group-hover:scale-110 transition-transform" />
                  <span>Admin Sign Up & Login</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup (Col 8-12) */}
          <div className="lg:col-span-5 space-y-4 bg-[#1A1A1A] p-6 rounded-2xl border border-[#2A2A2A]">
            <h4 className="font-serif-title text-lg font-bold text-white">
              Join The Gazebo Coffee Club
            </h4>
            <p className="text-xs text-[#888888] leading-relaxed">
              Subscribe to receive exclusive invitation to seasonal tasting events, 10% off your first online table booking, and secret recipe reveals!
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you! You are now subscribed to the Gazebo Coffee Club.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      if (newsletterError) setNewsletterError('');
                    }}
                    className="flex-1 px-4 py-2.5 bg-[#242424] border border-[#3A3A3A] rounded-xl text-xs text-white placeholder-[#888888] focus:outline-none focus:border-[#D2691E]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-gradient-btn text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer hover:shadow-md shrink-0"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                {newsletterError && <p className="text-[11px] text-[#B22222] font-medium">{newsletterError}</p>}
              </form>
            )}

            <span className="text-[10px] text-[#555555] block">
              We respect your privacy. Unsubscribe anytime with one click.
            </span>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#666666] gap-4">
          <p>© 2026 Gazebo Cafe. All Rights Reserved.</p>
          
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenAdmin}
              className="px-3 py-1.5 rounded-lg bg-[#1A1A1A] border border-[#3A3A3A] hover:border-[#D2691E] text-[#D2691E] hover:text-[#F4C430] font-semibold text-[11px] flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Lock className="w-3 h-3 text-[#D2691E]" />
              <span>Admin Portal (Sign Up / Login)</span>
            </button>

            <div className="flex items-center gap-1 text-[11px]">
              <span>Crafted with</span>
              <Heart className="w-3 h-3 text-[#B22222] fill-[#B22222]" />
              <span>for coffee lovers everywhere</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
