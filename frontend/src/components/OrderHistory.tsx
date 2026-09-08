import React, { useEffect, useState } from 'react';
import { 
  ShoppingBag, Clock, CheckCircle2, AlertCircle, RefreshCw, 
  ArrowRight, Receipt, Coffee, Sparkles, User as UserIcon, Lock, 
  Calendar, Check, ChevronRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Order, User, CartItem } from '../types';

interface OrderHistoryProps {
  currentUser: User | null;
  onOpenAuth: (tab: 'login' | 'register') => void;
  onOpenMenu: () => void;
  onViewReceipt?: (order: Order) => void;
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({
  currentUser,
  onOpenAuth,
  onOpenMenu,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<Order | null>(null);

  const fetchUserOrders = async () => {
    if (!currentUser) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/fetch_orders.php?user_id=${currentUser.id}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setOrders(data);
      }
    } catch (err) {
      console.error('Failed to load user orders:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchUserOrders();
    }
  }, [currentUser]);

  // If user is not logged in, show login prompt gate
  if (!currentUser) {
    return (
      <div className="container mx-auto max-w-lg px-4 py-16 text-center animate-in fade-in duration-300">
        <Card className="rounded-3xl border border-brand-brown/10 shadow-xl bg-white p-8 space-y-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-brand-brown">
            <Lock className="h-10 w-10 text-brand-coffee" />
          </div>
          <div className="space-y-2">
            <CardTitle className="font-display text-2xl font-bold text-brand-brown">
              Sign In to View Order History
            </CardTitle>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Track your past handcrafted drinks, receipt summaries, and order statuses bound to your account.
            </p>
          </div>
          <Button
            variant="brand"
            size="lg"
            onClick={() => onOpenAuth('login')}
            className="w-full gap-2 font-bold shadow-md"
          >
            <UserIcon className="h-4 w-4" />
            Log In / Register
          </Button>
        </Card>
      </div>
    );
  }

  const totalSpent = orders.reduce((sum, o) => sum + Number(o.total_price || 0), 0);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-brown/10 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-coffee text-white shadow-sm">
              <ShoppingBag className="h-5 w-5 text-amber-200" />
            </div>
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-brand-brown">
                My Order History
              </h2>
              <p className="text-xs text-muted-foreground">
                All purchases linked to <strong>@{currentUser.username}</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchUserOrders}
            disabled={isLoading}
            className="gap-1.5 rounded-xl border-brand-brown/20 bg-white"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
          <Button
            variant="brand"
            size="sm"
            onClick={onOpenMenu}
            className="gap-1.5 rounded-xl shadow-sm"
          >
            <span>Order More</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Summary KPI Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="rounded-2xl border-brand-brown/10 bg-white p-4 shadow-sm">
          <div className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">
            Total Orders
          </div>
          <div className="font-display text-2xl font-bold text-brand-brown mt-1">
            {orders.length} {orders.length === 1 ? 'order' : 'orders'}
          </div>
        </Card>

        <Card className="rounded-2xl border-brand-brown/10 bg-white p-4 shadow-sm">
          <div className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">
            Total Amount Spent
          </div>
          <div className="font-display text-2xl font-bold text-brand-orange mt-1">
            ₱{totalSpent.toFixed(2)}
          </div>
        </Card>

        <Card className="rounded-2xl border-brand-brown/10 bg-white p-4 shadow-sm">
          <div className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">
            Verified Account
          </div>
          <div className="text-xs font-bold text-brand-coffee mt-1 truncate">
            {currentUser.fullname}
          </div>
          <div className="text-[11px] text-muted-foreground font-mono truncate">
            {currentUser.email}
          </div>
        </Card>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-brand-brown">
            Past Purchases
          </h3>
          <span className="text-xs text-muted-foreground">
            Showing {orders.length} record{orders.length === 1 ? '' : 's'}
          </span>
        </div>

        {orders.length === 0 ? (
          <Card className="rounded-3xl border border-dashed border-brand-brown/20 bg-white/60 p-12 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-600">
              <Coffee className="h-8 w-8" />
            </div>
            <div className="space-y-1 max-w-sm mx-auto">
              <h4 className="text-base font-bold text-brand-brown">No past orders yet</h4>
              <p className="text-xs text-muted-foreground">
                You haven&apos;t placed any orders with this account yet. Check out our handcrafted milk teas, iced coffees, and snacks!
              </p>
            </div>
            <Button variant="brand" onClick={onOpenMenu} className="gap-2 font-bold shadow-md">
              <Sparkles className="h-4 w-4" />
              Browse Menu &amp; Start Ordering
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const isCompleted = order.status === 'completed';
              return (
                <Card 
                  key={order.id} 
                  className="rounded-2xl border border-brand-brown/10 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <CardHeader className="p-4 bg-slate-50/80 border-b border-slate-100 flex flex-row items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-display font-bold text-sm text-brand-brown">
                        Order #{order.id}
                      </span>
                      <span className="text-slate-300">•</span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        <span>{order.order_date}</span>
                      </div>
                    </div>

                    <div>
                      <Badge
                        variant={isCompleted ? 'default' : 'outline'}
                        className={`text-[10px] uppercase font-bold ${
                          isCompleted
                            ? 'bg-green-600 text-white'
                            : 'text-amber-700 border-amber-300 bg-amber-50'
                        }`}
                      >
                        {isCompleted ? '✅ Completed' : '⏳ Pending / Preparing'}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="p-4 sm:p-5 space-y-3">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Order Items:
                      </div>
                      <div className="rounded-xl bg-brand-cream/40 p-3 border border-brand-brown/5 text-xs font-medium text-brand-brown leading-relaxed">
                        {order.order_details}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-100 gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground font-semibold">Total Paid:</span>
                        <span className="font-display text-lg font-extrabold text-brand-orange">
                          ₱{Number(order.total_price).toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedReceiptOrder(order)}
                          className="h-8 gap-1.5 text-xs font-semibold rounded-xl border-brand-brown/20 bg-white"
                        >
                          <Receipt className="h-3.5 w-3.5 text-brand-coffee" />
                          <span>View Receipt</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Mini Receipt Dialog for Past Orders */}
      {selectedReceiptOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in">
          <Card className="max-w-md w-full bg-white p-6 shadow-2xl rounded-3xl space-y-4 border border-brand-brown/10">
            <div className="text-center space-y-1">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-brand-brown">
                <Receipt className="h-6 w-6 text-brand-coffee" />
              </div>
              <h3 className="font-display text-xl font-bold text-brand-brown">
                Official Receipt Record
              </h3>
              <p className="text-xs text-muted-foreground">
                Mr. Boy SpecialTea • Order #{selectedReceiptOrder.id}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 border border-dashed border-slate-300 space-y-2.5 font-mono text-xs">
              <div className="flex justify-between border-b pb-1.5">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-semibold">{selectedReceiptOrder.order_date}</span>
              </div>
              <div className="flex justify-between border-b pb-1.5">
                <span className="text-muted-foreground">Customer:</span>
                <span className="font-bold text-brand-brown">{selectedReceiptOrder.customer_name}</span>
              </div>
              <div className="flex justify-between border-b pb-1.5 text-[11px]">
                <span className="text-muted-foreground">Account:</span>
                <span className="text-brand-coffee font-semibold">
                  @{selectedReceiptOrder.customer_username || currentUser.username}
                </span>
              </div>
              <div className="py-1">
                <div className="font-semibold text-muted-foreground uppercase text-[10px] pb-1">
                  Items:
                </div>
                <div className="text-xs text-brand-brown whitespace-pre-wrap font-sans bg-white p-2 rounded-lg border border-slate-200">
                  {selectedReceiptOrder.order_details}
                </div>
              </div>
              <div className="border-t-2 border-slate-400 pt-2 flex justify-between text-sm font-bold">
                <span className="text-brand-brown">TOTAL:</span>
                <span className="text-brand-orange text-base">
                  ₱{Number(selectedReceiptOrder.total_price).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="gap-1.5"
              >
                Print
              </Button>
              <Button
                variant="brand"
                size="sm"
                onClick={() => setSelectedReceiptOrder(null)}
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
