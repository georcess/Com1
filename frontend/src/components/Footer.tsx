import React from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  ArrowUp, 
  Facebook, 
  Instagram, 
  MessageCircle,
  Wifi,
  Sparkles,
  ShoppingBag,
  CreditCard,
  Heart
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
      {/* ── Top Feature Strip ─────────────────────────────────── */}
      <div className="border-b border-white/10 bg-black/20 py-2.5 px-4 text-xs text-amber-100/80">
        <div className="container mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-3 text-center">
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-brand-amber" />
              <span>100% Fresh Brewed Daily</span>
            </span>
            <span className="text-white/20 hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1">
              <Wifi className="h-3.5 w-3.5 text-green-400" />
              <span>Free Guest WiFi</span>
            </span>
            <span className="text-white/20 hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1">
              <ShoppingBag className="h-3.5 w-3.5 text-brand-orange" />
              <span>Dine-in &amp; Takeaway</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px]">
            <CreditCard className="h-3.5 w-3.5 text-amber-300" />
            <span>GCash &bull; Maya &bull; Cash Accepted</span>
          </div>
        </div>
      </div>

      {/* ── Main Footer Body ───────────────────────────────────── */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-6 border-b border-white/10">
          
          {/* Brand & Slogan (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div 
              className="flex items-center gap-3 cursor-pointer group w-fit"
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
                <p className="text-[11px] text-amber-200/80">Handcrafted Drinks &bull; Dela Costa V</p>
              </div>
            </div>

            <p className="text-xs text-amber-100/80 leading-relaxed max-w-sm">
              Your neighborhood specialtea spot in Montalban. Serving handcrafted milkteas, 
              iced coffees, fruit teas, frappés, and crispy fries starting at only <strong>₱29</strong>!
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-brand-orange text-amber-100 hover:text-white transition-all shadow-xs"
                title="Facebook"
              >
                <Facebook className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-brand-orange text-amber-100 hover:text-white transition-all shadow-xs"
                title="Instagram"
              >
                <Instagram className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://m.me"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-brand-orange text-amber-100 hover:text-white transition-all shadow-xs"
                title="Messenger"
              >
                <MessageCircle className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Location & Hours (4 cols) */}
          <div className="md:col-span-4 space-y-3 text-xs text-amber-100/80">
            <h4 className="font-display text-sm font-bold text-brand-amber uppercase tracking-wider">
              Store Information
            </h4>

            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-semibold block">Dela Costa Homes V, Burgos</span>
                <span>Montalban, Rodriguez, Rizal 1860</span>
                <span className="block text-[11px] text-amber-300/80 italic mt-0.5">
                  (Near Phase 1 Clubhouse)
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-brand-amber shrink-0 mt-0.5" />
              <div>
                <span>Mon – Sun: <strong>9:00 AM – 10:00 PM</strong></span>
                <span className="block text-[11px] text-green-300 font-medium">● Open Daily for Dine-in &amp; Takeaway</span>
              </div>
            </div>
          </div>

          {/* Contact & Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3 text-xs text-amber-100/80">
            <h4 className="font-display text-sm font-bold text-brand-amber uppercase tracking-wider">
              Quick Links &amp; Contact
            </h4>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-brand-orange shrink-0" />
                <span>0917 888 4737 / 0912 345 6789</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-brand-amber shrink-0" />
                <span className="truncate">orders@mrboyspecialtea.com</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2 text-xs font-medium">
              <button onClick={() => onNavigate('home')} className="text-amber-200 hover:text-white hover:underline transition-colors">
                Home
              </button>
              <span className="text-white/20">&bull;</span>
              <button onClick={() => onNavigate('menu')} className="text-amber-200 hover:text-white hover:underline transition-colors">
                Menu
              </button>
              <span className="text-white/20">&bull;</span>
              <button onClick={() => onNavigate('cart')} className="text-amber-200 hover:text-white hover:underline transition-colors">
                Order Cart
              </button>
              <span className="text-white/20">&bull;</span>
              <button onClick={() => onNavigate('contact')} className="text-amber-200 hover:text-white hover:underline transition-colors">
                Contact
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 text-[11px] text-amber-200/60">
          <p>&copy; 2026 Mr. Boy SpecialTea &bull; Crafted with <Heart className="inline h-3 w-3 text-red-400 fill-red-400 mx-0.5" /> by BREWCODE Group 4</p>
          
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
