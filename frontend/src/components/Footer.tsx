import React from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Sparkles, 
  Heart, 
  Facebook, 
  Instagram, 
  MessageCircle, 
  ArrowUp, 
  Wifi, 
  ShieldCheck, 
  Truck, 
  CreditCard,
  Utensils,
  Navigation
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-auto border-t-4 border-brand-amber bg-brand-brown text-white">
      {/* ── Top Highlights Banner ───────────────────────────────── */}
      <div className="border-b border-brand-brown/40 bg-brand-coffee/90 py-4 px-4">
        <div className="container mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-amber-100 font-medium">
            <Sparkles className="h-4 w-4 text-brand-amber shrink-0" />
            <span>Premium Fresh Ingredients</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-amber-100 font-medium">
            <Truck className="h-4 w-4 text-brand-orange shrink-0" />
            <span>Fast Pickup &amp; Local Delivery</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-amber-100 font-medium">
            <Wifi className="h-4 w-4 text-green-400 shrink-0" />
            <span>Free High-Speed Guest WiFi</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-amber-100 font-medium">
            <ShieldCheck className="h-4 w-4 text-amber-300 shrink-0" />
            <span>100% Quality &amp; Cleanliness</span>
          </div>
        </div>
      </div>

      {/* ── Main Footer Multi-Column Section ────────────────────── */}
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Column 1: Brand Info & Bio (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div 
              className="flex items-center gap-3 cursor-pointer group w-fit"
              onClick={() => onNavigate('home')}
            >
              <img 
                src="/public/images/IMG_2476.jpeg" 
                alt="Mr. Boy SpecialTea Logo" 
                className="h-12 w-12 rounded-full border-2 border-brand-amber object-cover shadow-md group-hover:scale-105 transition-transform"
              />
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight text-white group-hover:text-brand-amber transition-colors">
                  Mr. Boy SpecialTea
                </h3>
                <p className="text-xs text-amber-200/80">Handcrafted Drinks &bull; Dela Costa V</p>
              </div>
            </div>

            <p className="text-xs text-amber-100/80 leading-relaxed max-w-md">
              Dela Costa V&apos;s favorite neighborhood milktea &amp; coffee sanctuary. 
              We serve freshly brewed tea, bold barista espresso, ice-blended frappés, 
              and piping-hot crispy snacks starting at only <strong>₱29</strong>!
            </p>

            {/* Social Media Links */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-200">
                Connect With Us:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-brand-orange hover:text-white transition-all text-amber-100 shadow-sm"
                  title="Facebook Page"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-brand-orange hover:text-white transition-all text-amber-100 shadow-sm"
                  title="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://m.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-brand-orange hover:text-white transition-all text-amber-100 shadow-sm"
                  title="Messenger Chat"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Accepted Payments */}
            <div className="pt-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-200 mb-1.5 flex items-center gap-1.5">
                <CreditCard className="h-3.5 w-3.5" />
                <span>Accepted Payments:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="outline" className="bg-white/10 text-amber-100 text-[10px] border-white/20">
                  GCash
                </Badge>
                <Badge variant="outline" className="bg-white/10 text-amber-100 text-[10px] border-white/20">
                  Maya
                </Badge>
                <Badge variant="outline" className="bg-white/10 text-amber-100 text-[10px] border-white/20">
                  Cash on Counter
                </Badge>
                <Badge variant="outline" className="bg-white/10 text-amber-100 text-[10px] border-white/20">
                  Bank Transfer
                </Badge>
              </div>
            </div>
          </div>

          {/* Column 2: Store Location & Operating Hours (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-display text-base font-bold text-brand-amber border-b border-white/10 pb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-orange" />
              <span>Store Location &amp; Hours</span>
            </h4>
            
            <div className="space-y-3.5 text-xs text-amber-100/80">
              <div className="flex items-start gap-2.5">
                <Navigation className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Montalban Main Branch:</strong>
                  <span>Dela Costa Homes V, Burgos, Montalban, Rodriguez, Rizal 1860</span>
                  <span className="block text-[11px] text-amber-300/80 italic mt-0.5">
                    (Near Dela Costa Phase 1 Clubhouse &amp; Basketball Court)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-brand-amber shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Opening Hours:</strong>
                  <span>Mon &ndash; Sun: <strong>9:00 AM &ndash; 10:00 PM</strong></span>
                  <span className="block text-[11px] text-green-300 font-semibold mt-0.5">
                    ● Open Daily for Dine-in &amp; Takeaway
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Utensils className="h-4 w-4 text-amber-200 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Dine-in Amenities:</strong>
                  <span>Cozy seating, board games, free WiFi &amp; charging outlets.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Catering & Direct Inquiries (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-base font-bold text-brand-amber border-b border-white/10 pb-2 flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand-orange" />
              <span>Get in Touch</span>
            </h4>

            <div className="space-y-2.5 text-xs text-amber-100/80">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-brand-orange shrink-0" />
                <span>+63 912 345 6789</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-brand-amber shrink-0" />
                <span className="truncate">orders@mrboyspecialtea.com</span>
              </div>
            </div>

            {/* Quick Navigation Links */}
            <div className="pt-1 flex flex-wrap gap-2 text-xs">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="text-amber-200 hover:text-white hover:underline transition-colors"
              >
                Home
              </button>
              <span className="text-white/30">&bull;</span>
              <button
                type="button"
                onClick={() => onNavigate('menu')}
                className="text-amber-200 hover:text-white hover:underline transition-colors"
              >
                Menu
              </button>
              <span className="text-white/30">&bull;</span>
              <button
                type="button"
                onClick={() => onNavigate('cart')}
                className="text-amber-200 hover:text-white hover:underline transition-colors"
              >
                Order Cart
              </button>
              <span className="text-white/30">&bull;</span>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="text-amber-200 hover:text-white hover:underline transition-colors"
              >
                Contact
              </button>
            </div>

            {/* Catering Callout Box */}
            <div className="rounded-xl bg-black/20 p-3.5 border border-white/10 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <Sparkles className="h-3.5 w-3.5 text-brand-orange" />
                <span>Bulk &amp; Party Events</span>
              </div>
              <p className="text-[11px] text-amber-100/70 leading-relaxed">
                Hosting a birthday, school festival, or party? Inquire for special bulk cup pricing!
              </p>
              <Button
                variant="amber"
                size="sm"
                onClick={() => onNavigate('contact')}
                className="w-full h-8 text-xs font-bold shadow-sm"
              >
                Inquire Now
              </Button>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom Sub-Footer Bar ───────────────────────────────── */}
      <div className="border-t border-white/10 bg-black/30 py-4 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-100/70">
          <div className="text-center sm:text-left space-y-0.5">
            <p className="font-semibold text-amber-100">
              &copy; 2026 Mr. Boy SpecialTea &bull; All Rights Reserved.
            </p>
            <p className="text-[11px] text-amber-200/50">
              Designed and developed with <Heart className="inline h-3 w-3 text-red-400 fill-red-400 mx-0.5" /> by BREWCODE Group 4
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-amber-200/60 hidden md:inline">
              Dela Costa V, Montalban, Rodriguez Rizal
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="gap-1.5 text-xs text-amber-100 bg-white/10 border-white/20 hover:bg-white/20 hover:text-white"
              title="Back to Top"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>Back to Top</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};
