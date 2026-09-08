import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Menu } from './components/Menu';
import { Cart } from './components/Cart';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Team } from './components/Team';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { ReceiptModal } from './components/ReceiptModal';
import { CartItem, User } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<string>('all');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [isReceiptOpen, setIsReceiptOpen] = useState<boolean>(false);

  // Check auth session on load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/current_user.php');
        const data = await res.json();
        if (data.logged_in && data.user) {
          setCurrentUser(data.user);
          setCustomerName(data.user.fullname);
        } else {
          const cached = localStorage.getItem('mr_boy_user');
          if (cached) {
            const parsed = JSON.parse(cached);
            setCurrentUser(parsed);
            setCustomerName(parsed.fullname);
          }
        }
      } catch (err) {
        const cached = localStorage.getItem('mr_boy_user');
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            setCurrentUser(parsed);
            setCustomerName(parsed.fullname);
          } catch (e) {
            // Ignore
          }
        }
      }
    };

    fetchUser();
  }, []);

  // Compute Cart Total
  const cartTotal = cart.reduce((sum, item) => {
    const addonsTotal = item.addons.reduce((aSum, a) => aSum + a.price, 0);
    return sum + item.price + addonsTotal;
  }, 0);

  // Add Item to Cart
  const handleAddToCart = (itemName: string, size: string, price: number) => {
    const newItem: CartItem = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      item: itemName,
      size,
      price,
      addons: [],
    };
    setCart((prev) => [...prev, newItem]);
  };

  // Add Addon to last item in cart
  const handleAddAddonToLast = (addonName: string, price: number) => {
    if (cart.length === 0) return;
    setCart((prev) => {
      const updated = [...prev];
      const last = { ...updated[updated.length - 1] };
      last.addons = [...last.addons, { name: addonName, price }];
      updated[updated.length - 1] = last;
      return updated;
    });
  };

  // Remove Item
  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Clear Cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Generate Receipt & Submit Order
  const handleGenerateReceipt = async () => {
    if (cart.length === 0) return;

    // Strict Auth Check: Require user login before submitting order
    if (!currentUser) {
      handleOpenAuth('login');
      return;
    }

    const nameToUse = (customerName || currentUser.fullname || '').trim();
    if (!nameToUse) {
      alert('Please enter your name before placing the order.');
      return;
    }

    setIsSubmitting(true);
    const orderDetails = cart
      .map((item) => {
        const adds = item.addons.map((a) => `+ ${a.name}`).join(' ');
        return `${item.item} (${item.size}) ${adds}`.trim();
      })
      .join(', ');

    try {
      const res = await fetch('/api/submit_order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: currentUser.id,
          customer_name: nameToUse,
          order_details: orderDetails,
          total_price: cartTotal,
        }),
      });
      const data = await res.json();

      if (data.status === 'success') {
        setIsReceiptOpen(true);
      } else {
        if (data.require_auth || res.status === 401) {
          handleOpenAuth('login');
        }
        alert(data.message || 'Failed to submit order.');
      }
    } catch (err) {
      alert('Failed to connect to server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auth Modal Triggers
  const handleOpenAuth = (tab: 'login' | 'register') => {
    setAuthTab(tab);
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setCustomerName(user.fullname);
    localStorage.setItem('mr_boy_user', JSON.stringify(user));
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout.php', { method: 'POST' });
    } finally {
      setCurrentUser(null);
      localStorage.removeItem('mr_boy_user');
      setActiveTab('home');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream/60 font-sans text-brand-brown">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cart.length}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="animate-in fade-in duration-300">
            <Home
              onStartOrdering={() => {
                setSelectedMenuCategory('all');
                setActiveTab('menu');
              }}
              onAddToCart={handleAddToCart}
              onExploreCategory={(cat) => {
                setSelectedMenuCategory(cat);
                setActiveTab('menu');
              }}
              onOpenAuth={handleOpenAuth}
            />
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="animate-in fade-in duration-300">
            <Menu
              onAddToCart={handleAddToCart}
              initialCategory={selectedMenuCategory}
            />
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="animate-in fade-in duration-300">
            <Cart
              cart={cart}
              total={cartTotal}
              customerName={customerName}
              setCustomerName={setCustomerName}
              currentUser={currentUser}
              onAddAddonToLast={handleAddAddonToLast}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
              onOpenMenu={() => setActiveTab('menu')}
              onOpenAuth={handleOpenAuth}
              onGenerateReceipt={handleGenerateReceipt}
              isSubmitting={isSubmitting}
            />
          </div>
        )}

        {activeTab === 'team' && (
          <div className="animate-in fade-in duration-300">
            <Team />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="animate-in fade-in duration-300">
            <About />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="animate-in fade-in duration-300">
            <Contact />
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="animate-in fade-in duration-300">
            <AdminDashboard
              currentUser={currentUser}
              onOpenAuth={handleOpenAuth}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-brand-brown/10 bg-brand-brown py-6 text-center text-xs text-amber-100/70">
        <div className="container mx-auto px-4 space-y-1">
          <p className="font-semibold text-amber-50">Mr. Boy SpecialTea &copy; 2026</p>
          <p>Crafted with love by BREWCODE Group 4 &bull; Built with React &amp; shadcn/ui</p>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        defaultTab={authTab}
        onAuthSuccess={handleAuthSuccess}
      />

      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => {
          setIsReceiptOpen(false);
          setCart([]);
        }}
        customerName={customerName}
        cartItems={cart}
        total={cartTotal}
      />
    </div>
  );
}

export default App;
