import React from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  ArrowUp, 
  Facebook, 
  Instagram, 
  MessageCircle 
} from 'lucide-react';
import { Button } from './ui/button';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-auto border-t-2 border-brand-amber/60 bg-brand-brown text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Main Row: Brand, Nav Links & Socials */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
          
          {/* Brand Logo & Name */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <img 
              src="/public/images/IMG_2476.jpeg" 
              alt="Mr. Boy SpecialTea" 
              className="h-10 w-10 rounded-full border-2 border-brand-amber object-cover shadow"
            />
            <div>
              <h3 className="font-display text-lg font-bold text-white group-hover:text-brand-amber transition-colors">
                Mr. Boy SpecialTea
              </h3>
              <p className="text-[11px] text-amber-200/80">Dela Costa Homes V, Burgos, Montalban</p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-amber-100/90">
            <button 
              onClick={() => onNavigate('home')} 
              className="hover:text-brand-amber transition-colors"
            >
              Home
            </button>
            <span className="text-white/20">&bull;</span>
            <button 
              onClick={() => onNavigate('menu')} 
              className="hover:text-brand-amber transition-colors"
            >
              Menu
            </button>
            <span className="text-white/20">&bull;</span>
            <button 
              onClick={() => onNavigate('cart')} 
              className="hover:text-brand-amber transition-colors"
            >
              Order Cart
            </button>
            <span className="text-white/20">&bull;</span>
            <button 
              onClick={() => onNavigate('contact')} 
              className="hover:text-brand-amber transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-brand-orange text-amber-100 hover:text-white transition-all shadow-xs"
              title="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-brand-orange text-amber-100 hover:text-white transition-all shadow-xs"
              title="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://m.me"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-brand-orange text-amber-100 hover:text-white transition-all shadow-xs"
              title="Messenger"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Essential Info Strip: Location, Hours, Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 text-xs text-amber-100/80 text-center sm:text-left border-b border-white/10">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <MapPin className="h-4 w-4 text-brand-orange shrink-0" />
            <span>Dela Costa Homes V, Burgos, Montalban, Rizal</span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Clock className="h-4 w-4 text-brand-amber shrink-0" />
            <span>Mon – Sun: <strong>9:00 AM – 10:00 PM</strong></span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Phone className="h-4 w-4 text-brand-orange shrink-0" />
            <span>0917 888 4737 &bull; orders@mrboyspecialtea.com</span>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 text-[11px] text-amber-200/60">
          <p>&copy; 2026 Mr. Boy SpecialTea &bull; All Rights Reserved.</p>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="h-7 px-2 text-[11px] text-amber-100 hover:text-white hover:bg-white/10 gap-1"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            <span>Back to Top</span>
          </Button>
        </div>
      </div>
    </footer>
  );
};
