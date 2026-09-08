import React from 'react';
import { 
  ArrowRight, Sparkles, Heart, Leaf, ShieldCheck, 
  Coffee, CupSoda, Flame, Cookie, Star, Clock, 
  MapPin, Phone, ShoppingBag, CheckCircle, Award, 
  Zap, Gift, ThumbsUp 
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { FeaturedCarousel } from './FeaturedCarousel';

interface HomeProps {
  onStartOrdering: () => void;
  onAddToCart: (itemName: string, size: string, price: number) => void;
  onExploreCategory: (category: string) => void;
  onOpenAuth: (tab: 'login' | 'register') => void;
}

export const Home: React.FC<HomeProps> = ({
  onStartOrdering,
  onAddToCart,
  onExploreCategory,
  onOpenAuth,
}) => {
  const categories = [
    { id: 'milktea', name: 'Milktea', count: '19 Flavors', price: 'From ₱29', image: '/public/images/Taro.jpeg', icon: Sparkles, tag: 'Bestseller' },
    { id: 'coffee', name: 'Iced Coffee', count: '6 Variants', price: 'From ₱29', image: '/public/images/caramelmacchiato.jpg', icon: Coffee, tag: 'Daily Energy' },
    { id: 'fruit', name: 'Fruit Tea', count: '7 Flavors', price: 'From ₱29', image: '/public/images/passionfruit.jpg', icon: CupSoda, tag: 'Refreshing' },
    { id: 'frappe', name: 'Frappé', count: '5 Flavors', price: 'From ₱29', image: '/public/images/blueberryburstfrappee.jpg', icon: Flame, tag: 'Cream-based' },
    { id: 'hot', name: 'Hot Cups', count: '6 Choices', price: '₱35 Flat', image: '/public/images/Hotcoffee.jpeg', icon: Coffee, tag: 'Cozy Morning' },
    { id: 'snack', name: 'Snacks', count: 'Crispy Fries', price: 'From ₱29', image: '/public/images/fries.jpeg', icon: Cookie, tag: 'Perfect Pair' },
  ];

  const testimonials = [
    {
      name: 'Alyssa M.',
      role: 'Regular Customer • Dela Costa V',
      comment: 'The CreamCheese Purple Taro is hands down the best in Montalban! Perfect balance of creaminess and real taro flavor. Plus ₱29 is super sulit!',
      rating: 5,
      favorite: 'CreamCheese Purple Taro',
      avatar: '👩‍🦰',
    },
    {
      name: 'Mark Dave R.',
      role: 'College Student',
      comment: 'My go-to coffee fix before morning classes. The Caramel Macchiato tastes like expensive café coffee for only ₱29-₱39. Fast service too!',
      rating: 5,
      favorite: 'Iced Caramel Macchiato',
      avatar: '👨‍🎓',
    },
    {
      name: 'Bea Clarisse',
      role: 'Milk Tea Enthusiast',
      comment: 'Their Fruit Teas are so refreshing in the afternoon heat! The Passion Fruit with extra pearl is 10/10. Definitely ordering again!',
      rating: 5,
      favorite: 'Passion Fruit Tea + Pearl',
      avatar: '👧',
    },
  ];

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* ── 1. HERO BANNER SECTION ─────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-3xl bg-brand-brown py-16 sm:py-24 text-white shadow-2xl mx-4 sm:mx-6 mt-4 border border-brand-brown/30">
        {/* Background Image with Dark Gradient Mesh */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105 transition-transform duration-1000"
          style={{ backgroundImage: "url('/public/images/Boy.jpeg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-brown via-brand-brown/90 to-brand-coffee/85" />

        <div className="relative z-10 container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Hero Text & Call to Action */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-amber/20 border border-brand-amber/40 px-4 py-1.5 text-xs font-bold text-brand-amber backdrop-blur shadow-sm">
                <Sparkles className="h-4 w-4 text-brand-orange animate-spin" style={{ animationDuration: '4s' }} />
                <span>MONTALBAN'S FAVORITE SPECIALTEA SPOT</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-3">
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-md leading-tight">
                  Taste the <span className="text-brand-amber underline decoration-brand-orange decoration-wavy underline-offset-8">SpecialTea</span> in Every Sip.
                </h1>
                <p className="text-base sm:text-lg text-amber-100/90 max-w-xl leading-relaxed">
                  Handcrafted Milktea, artisan Iced Coffee, refreshing Fruit Teas, and hot snacks at student-friendly prices. Starting at only <strong>₱29</strong>!
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Button
                  variant="brand"
                  size="lg"
                  onClick={onStartOrdering}
                  className="group gap-2.5 rounded-full px-8 py-6 text-base font-extrabold shadow-xl hover:shadow-2xl active:scale-95 transition-all bg-gradient-to-r from-brand-orange to-amber-600 hover:from-brand-orange/90 hover:to-amber-600/90"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>Start Ordering Now</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    const feat = document.getElementById('featured-carousel-sec');
                    if (feat) feat.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="rounded-full px-6 py-6 text-base font-bold text-white border-white/30 bg-white/10 backdrop-blur hover:bg-white/20 active:scale-95"
                >
                  <span>🔥 Featured Specials</span>
                </Button>
              </div>

              {/* Social Proof Mini Stats */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-amber-100/80 border-t border-white/10">
                <div className="flex items-center gap-1.5 font-semibold">
                  <Star className="h-4 w-4 fill-brand-amber text-brand-amber" />
                  <span><strong>4.9/5</strong> Customer Rating</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span><strong>50+</strong> Drink Flavors</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold">
                  <Zap className="h-4 w-4 text-brand-amber" />
                  <span><strong>₱29</strong> Everyday Affordable</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card with Glowing Badge */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-brand-amber to-brand-orange opacity-40 blur-xl group-hover:opacity-75 transition duration-700" />
                
                <div className="relative rounded-3xl bg-white/10 backdrop-blur-md p-4 border border-white/20 shadow-2xl max-w-sm">
                  <div className="relative overflow-hidden rounded-2xl h-80 w-72 sm:w-80">
                    <img
                      src="/public/images/Taro.jpeg"
                      alt="Signature Mr. Boy Taro Milk Tea"
                      className="h-full w-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Floating Bestseller Tag */}
                    <Badge variant="brand" className="absolute top-3 left-3 bg-brand-orange text-white font-bold px-3 py-1 shadow-lg">
                      🔥 Top Seller
                    </Badge>

                    {/* Logo Overlay */}
                    <div className="absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white p-0.5 shadow-md">
                      <img src="/public/images/IMG_2476.jpeg" alt="Logo" className="h-full w-full rounded-full object-cover" />
                    </div>

                    {/* Bottom Card Caption */}
                    <div className="absolute bottom-3 left-3 right-3 text-left text-white">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-brand-amber">Signature Special</div>
                      <div className="font-display text-lg font-bold">CreamCheese Purple Taro</div>
                      <div className="flex items-center justify-between mt-1 text-xs">
                        <span className="text-amber-200">16oz ₱29 / 22oz ₱39</span>
                        <Button 
                          size="sm" 
                          variant="amber" 
                          onClick={() => onAddToCart('CreamCheese Purple Taro', '16oz', 29)}
                          className="h-7 text-xs px-2.5 font-bold shadow"
                        >
                          + Quick Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. QUICK CATEGORY DISCOVERY TILES ─────────────────────── */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-8">
          <Badge variant="outline" className="text-xs font-bold text-brand-coffee border-brand-coffee/20 px-3 py-0.5 uppercase">
            Browse By Category
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-brand-brown">
            What Are You Craving Today?
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            Click any category to jump directly to its complete menu items.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Card
                key={cat.id}
                onClick={() => onExploreCategory(cat.id)}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-brand-brown/10 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl text-center"
              >
                <div className="relative h-28 w-full overflow-hidden bg-brand-cream/60">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/public/images/IMG_2476.jpeg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-1.5 left-2 rounded-md bg-brand-amber/95 text-brand-brown px-1.5 py-0.5 text-[10px] font-extrabold shadow">
                    {cat.price}
                  </span>
                </div>

                <CardHeader className="p-3 pb-1">
                  <CardTitle className="text-sm font-bold text-brand-brown group-hover:text-brand-orange transition-colors flex items-center justify-center gap-1">
                    <Icon className="h-3.5 w-3.5 text-brand-coffee shrink-0" />
                    <span>{cat.name}</span>
                  </CardTitle>
                  <CardDescription className="text-[11px] text-muted-foreground font-medium">
                    {cat.count}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-3 pt-0">
                  <span className="text-[10px] font-bold text-brand-coffee group-hover:underline flex items-center justify-center gap-1">
                    <span>Explore</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ── 3. FEATURED PRODUCTS SLIDING CAROUSEL (1 PER CATEGORY) ──── */}
      <div id="featured-carousel-sec">
        <FeaturedCarousel
          onAddToCart={onAddToCart}
          onExploreCategory={onExploreCategory}
        />
      </div>

      {/* ── 4. WHY CHOOSE MR. BOY (THE SPECIALTEA DIFFERENCE) ───────── */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-b from-white to-brand-cream/80 p-8 sm:p-12 border border-brand-brown/10 shadow-lg space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <Badge variant="brand" className="text-xs font-bold uppercase">
              The Mr. Boy Difference
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-brand-brown">
              Why Our Customers Love Us
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              We brew every cup with passion, quality, and community at heart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="rounded-2xl border-none shadow-sm bg-white p-6 text-center space-y-3 hover:shadow-md transition-shadow">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-brand-orange shadow-inner">
                <Sparkles className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-base text-brand-brown">Authentic Tea Brew</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Brewed daily from real, premium loose-leaf teas for that rich and fragrant aroma in every sip.
              </p>
            </Card>

            <Card className="rounded-2xl border-none shadow-sm bg-white p-6 text-center space-y-3 hover:shadow-md transition-shadow">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-brand-coffee shadow-inner">
                <Award className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-base text-brand-brown">Signature Creamcheese</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Silky, rich, and savory-sweet cheese foam prepared fresh to pair perfectly with your favorite flavor.
              </p>
            </Card>

            <Card className="rounded-2xl border-none shadow-sm bg-white p-6 text-center space-y-3 hover:shadow-md transition-shadow">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700 shadow-inner">
                <Zap className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-base text-brand-brown">₱29 Everyday Sulit</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Premium café flavors at student and budget-friendly prices. Big taste that doesn't hurt your wallet.
              </p>
            </Card>

            <Card className="rounded-2xl border-none shadow-sm bg-white p-6 text-center space-y-3 hover:shadow-md transition-shadow">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600 shadow-inner">
                <Heart className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-base text-brand-brown">Balanced Sweetness</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Smooth, naturally flavorful, and formulated so you can enjoy every drop without sugary overload.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ── 5. HOW TO ORDER IN 3 EASY STEPS ────────────────────────── */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-10">
          <Badge variant="outline" className="text-xs font-bold text-brand-coffee border-brand-coffee/20 px-3 py-0.5 uppercase">
            Simple &amp; Fast
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-brand-brown">
            How to Order Online
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Get your drinks freshly prepared in 3 simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="relative rounded-2xl bg-white p-6 border border-brand-brown/10 shadow-md text-center space-y-3">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-orange font-bold text-white text-xs shadow">
              1
            </span>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-cream text-brand-coffee mt-2">
              <Coffee className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base text-brand-brown">Choose Your Drink</h3>
            <p className="text-xs text-muted-foreground">
              Browse our menu of Milktea, Iced Coffee, Fruit Teas, or snacks and pick your preferred size.
            </p>
          </div>

          <div className="relative rounded-2xl bg-white p-6 border border-brand-brown/10 shadow-md text-center space-y-3">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-orange font-bold text-white text-xs shadow">
              2
            </span>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-cream text-brand-coffee mt-2">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base text-brand-brown">Customize &amp; Add-ons</h3>
            <p className="text-xs text-muted-foreground">
              Add chewy pearls (+₱9) to customize your drinks and review your cart total.
            </p>
          </div>

          <div className="relative rounded-2xl bg-white p-6 border border-brand-brown/10 shadow-md text-center space-y-3">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-orange font-bold text-white text-xs shadow">
              3
            </span>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-cream text-brand-coffee mt-2">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base text-brand-brown">Get Instant Receipt</h3>
            <p className="text-xs text-muted-foreground">
              Submit your order to generate your official printable receipt and pick up fresh at our store!
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. REAL CUSTOMER REVIEWS & TESTIMONIALS ────────────────── */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-brand-coffee text-white p-8 sm:p-12 shadow-xl space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-amber uppercase tracking-wider">
              <ThumbsUp className="h-4 w-4" />
              <span>COMMUNITY LOVE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              What Locals Say About Us
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/80">
              Trusted by tea &amp; coffee enthusiasts across Montalban.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <Card key={idx} className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 text-white space-y-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex text-brand-amber">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-brand-amber text-brand-amber" />
                    ))}
                  </div>
                  <span className="text-2xl">{t.avatar}</span>
                </div>

                <p className="text-xs sm:text-sm italic text-amber-50/90 leading-relaxed">
                  &ldquo;{t.comment}&rdquo;
                </p>

                <div className="border-t border-white/15 pt-3 space-y-1">
                  <div className="font-bold text-sm text-amber-200">{t.name}</div>
                  <div className="text-[11px] text-amber-100/70">{t.role}</div>
                  <div className="text-[11px] text-brand-amber font-semibold">
                    Fav: {t.favorite}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. STORE VISIT & LOCATION BANNER ──────────────────────── */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center rounded-3xl bg-white border border-brand-brown/10 p-8 sm:p-10 shadow-lg">
          <div className="lg:col-span-8 space-y-4 text-left">
            <Badge variant="outline" className="text-xs font-bold text-brand-coffee border-brand-coffee/20 px-3 py-0.5 uppercase">
              Visit Our Store
            </Badge>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-brand-brown">
              Freshly Brewed in Dela Costa Homes V, Montalban
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Drop by with friends, study over coffee, or order your favorite snack while enjoying our cozy neighborhood vibe.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                <span className="text-brand-brown font-medium">Blk 14 Lot 4 Phase 1 Dela Costa Homes V, Burgos Rodriguez Rizal</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-brand-orange shrink-0" />
                <span className="text-brand-brown font-medium">Open Daily: 9:00 AM &ndash; 9:00 PM</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-brand-orange shrink-0" />
                <span className="text-brand-brown font-medium">0917 888 4737</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Gift className="h-4 w-4 text-brand-orange shrink-0" />
                <span className="text-brand-brown font-medium">Catering &amp; Group Orders Available</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3 justify-center text-center">
            <Button
              variant="brand"
              size="lg"
              onClick={onStartOrdering}
              className="gap-2 font-bold shadow-lg"
            >
              <ShoppingBag className="h-5 w-5" />
              Order For Pickup
            </Button>

            <a
              href="https://www.facebook.com/mrboyspecialteadelacostav"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 text-xs text-brand-coffee font-semibold hover:underline"
            >
              <span>Follow our Facebook for promos</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
