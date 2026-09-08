import React, { useState, useMemo } from 'react';
import { Coffee, Flame, Sparkles, CupSoda, Cookie, UtensilsCrossed, Plus, Search, Check } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { MENU_ITEMS } from '../data/menu';
import { MenuItem } from '../types';

interface MenuProps {
  onAddToCart: (itemName: string, size: string, price: number) => void;
}

export const Menu: React.FC<MenuProps> = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Items', icon: UtensilsCrossed },
    { id: 'milktea', label: 'Milktea', icon: Sparkles },
    { id: 'coffee', label: 'Iced Coffee', icon: Coffee },
    { id: 'fruit', label: 'Fruit Tea', icon: CupSoda },
    { id: 'frappe', label: 'Frappé', icon: Flame },
    { id: 'hot', label: 'Hot Cups', icon: Coffee },
    { id: 'snack', label: 'Snacks', icon: Cookie },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = searchQuery.trim() === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAddWithFeedback = (name: string, size: string, price: number) => {
    onAddToCart(name, size, price);
    setAddedItemName(`${name} (${size})`);
    setTimeout(() => {
      setAddedItemName(null);
    }, 1800);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Toast Notification for Added Item */}
      {addedItemName && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-brand-brown text-white px-5 py-3 shadow-2xl animate-in slide-in-from-bottom-5 border border-brand-amber/30">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-orange text-white">
            <Check className="h-4 w-4" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-brand-amber">{addedItemName}</span> added to your cart!
          </div>
        </div>
      )}

      {/* Header & Search */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="font-display text-3xl font-bold tracking-tight text-brand-brown sm:text-4xl">
          Our Delicious Menu
        </h2>
        <p className="text-sm text-muted-foreground">
          Handcrafted drinks and crispy snacks starting at only <strong>₱29</strong>.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search Taro, Matcha, Americano, Fries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 h-11 rounded-full border-brand-brown/20 bg-white shadow-sm focus-visible:ring-brand-amber text-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground hover:text-brand-brown"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 overflow-x-auto pb-2">
        {categories.map(cat => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <Button
              key={cat.id}
              variant={isActive ? 'brand' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
              className={`gap-1.5 rounded-full px-4 shadow-sm transition-all ${
                isActive ? 'scale-105 shadow-md ring-2 ring-brand-orange/30' : 'bg-white hover:bg-brand-cream'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{cat.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-muted-foreground px-1 border-b pb-2">
        <span>Showing <strong>{filteredItems.length}</strong> items</span>
        {searchQuery && (
          <span>Search results for &ldquo;<strong>{searchQuery}</strong>&rdquo;</span>
        )}
      </div>

      {/* Product Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 space-y-3 bg-white rounded-3xl border border-brand-brown/10 p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-brand-coffee">
            <UtensilsCrossed className="h-8 w-8 text-brand-orange" />
          </div>
          <h3 className="text-lg font-bold text-brand-brown">No matching items found</h3>
          <p className="text-xs text-muted-foreground">Try clearing your search or picking a different category.</p>
          <Button variant="outline" size="sm" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredItems.map((item: MenuItem) => (
            <Card 
              key={item.id}
              className="group flex flex-col overflow-hidden border border-brand-brown/10 bg-white transition-all hover:-translate-y-1.5 hover:shadow-xl rounded-2xl"
            >
              {/* Item Image with Category Badge */}
              <div className="relative h-48 w-full overflow-hidden bg-brand-cream/80">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/public/images/IMG_2476.jpeg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <Badge 
                  variant="brand"
                  className="absolute top-3 right-3 capitalize backdrop-blur bg-brand-amber/95 text-brand-brown font-bold shadow-sm"
                >
                  {item.category}
                </Badge>
                <div className="absolute bottom-2 left-3 text-[11px] font-semibold text-white drop-shadow">
                  Starts at ₱{item.prices[0].price}
                </div>
              </div>

              {/* Item Info */}
              <CardHeader className="p-4 pb-1">
                <CardTitle className="line-clamp-1 text-base font-bold text-brand-brown">
                  {item.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 p-4 pt-1">
                <p className="text-xs text-muted-foreground">
                  Made fresh with premium ingredients &amp; balanced sweetness.
                </p>
              </CardContent>

              {/* Size Buttons */}
              <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
                {item.prices.map(p => (
                  <Button
                    key={p.size}
                    variant="default"
                    size="sm"
                    onClick={() => handleAddWithFeedback(item.name, p.size, p.price)}
                    className="flex-1 bg-brand-coffee text-white hover:bg-brand-brown gap-1 font-semibold text-xs py-2 shadow-sm active:scale-95 transition-transform"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>{p.size} &bull; ₱{p.price}</span>
                  </Button>
                ))}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
