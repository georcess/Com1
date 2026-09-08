import React from 'react';
import { ShoppingBag, Trash2, Plus, Receipt, Sparkles, User as UserIcon, Lock, LogIn, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { CartItem, User } from '../types';

interface CartProps {
  cart: CartItem[];
  total: number;
  customerName: string;
  setCustomerName: (name: string) => void;
  currentUser: User | null;
  onAddAddonToLast: (name: string, price: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onOpenMenu: () => void;
  onOpenAuth: (tab: 'login' | 'register') => void;
  onGenerateReceipt: () => void;
  isSubmitting: boolean;
}

export const Cart: React.FC<CartProps> = ({
  cart,
  total,
  customerName,
  setCustomerName,
  currentUser,
  onAddAddonToLast,
  onRemoveItem,
  onClearCart,
  onOpenMenu,
  onOpenAuth,
  onGenerateReceipt,
  isSubmitting,
}) => {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <Card className="border border-brand-brown/10 shadow-xl rounded-2xl bg-white overflow-hidden">
        {/* Card Header */}
        <CardHeader className="bg-brand-coffee text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <ShoppingBag className="h-5 w-5 text-amber-200" />
              </div>
              <div>
                <CardTitle className="font-display text-2xl font-bold tracking-tight text-white">
                  Your Order Cart
                </CardTitle>
                <p className="text-xs text-amber-100/80">Review items before checkout</p>
              </div>
            </div>
            {cart.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={onClearCart}
                className="gap-1 text-xs"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Cancel Order</span>
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Auth Status Banner for Unauthenticated Users */}
          {!currentUser && (
            <div className="rounded-xl border border-amber-300 bg-amber-50/90 p-4 text-amber-900 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-200 text-amber-900 font-bold">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-brown">Account Login Required</h4>
                  <p className="text-xs text-amber-800">
                    You must be logged in to place an order and generate your official receipt.
                  </p>
                </div>
              </div>
              <Button
                variant="brand"
                size="sm"
                onClick={() => onOpenAuth('login')}
                className="shrink-0 gap-1.5 font-semibold shadow-sm"
              >
                <LogIn className="h-4 w-4" />
                <span>Log In / Register</span>
              </Button>
            </div>
          )}

          {/* Customer Name / Account Info */}
          <div className="space-y-3 rounded-xl bg-brand-cream/60 p-4 border border-brand-brown/10">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-sm font-bold text-brand-brown">
                <UserIcon className="h-4 w-4 text-brand-coffee" />
                Order Placed By:
              </span>
              {currentUser ? (
                <span className="text-xs text-green-700 font-bold flex items-center gap-1 bg-green-100/80 px-2 py-0.5 rounded-full border border-green-200">
                  <CheckCircle className="h-3.5 w-3.5" /> Account Bound &amp; Verified
                </span>
              ) : (
                <span className="text-xs text-amber-800 font-bold flex items-center gap-1 bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-300">
                  <Lock className="h-3.5 w-3.5" /> Login Required
                </span>
              )}
            </div>

            {currentUser ? (
              <div className="rounded-xl bg-white p-3.5 border border-brand-brown/10 shadow-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-brand-brown text-base">
                    {currentUser.fullname}
                  </span>
                  <span className="inline-flex items-center rounded-md bg-brand-cream px-2 py-0.5 text-xs font-bold text-brand-coffee">
                    @{currentUser.username}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-mono">
                  {currentUser.email}
                </p>
                <p className="text-[11px] text-green-700 pt-1 font-medium">
                  🔒 This order will be recorded under this authenticated account.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Input
                  id="cust-name"
                  placeholder="Please log in first"
                  value=""
                  disabled={true}
                  className="bg-white/50 opacity-60 cursor-not-allowed text-xs"
                />
                <p className="text-[11px] text-amber-800">
                  <button 
                    type="button" 
                    onClick={() => onOpenAuth('login')}
                    className="font-bold underline hover:text-brand-orange"
                  >
                    Click here to log in / register
                  </button> to link and protect your orders.
                </p>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          {cart.length === 0 ? (
            <div className="py-12 text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-brand-brown">Your cart is currently empty</h3>
                <p className="text-xs text-muted-foreground">Explore our menu and add your favorite drinks!</p>
              </div>
              <Button variant="brand" onClick={onOpenMenu} className="gap-2">
                <Plus className="h-4 w-4" />
                Browse Menu
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="divide-y rounded-xl border border-brand-brown/10 bg-white">
                {cart.map((item, idx) => (
                  <div key={item.id} className="flex items-start justify-between p-4 transition-colors hover:bg-slate-50">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-brand-brown text-base">
                          {item.item} ({item.size})
                        </span>
                        <span className="rounded-full bg-brand-cream px-2 py-0.5 text-xs font-semibold text-brand-coffee">
                          ₱{item.price}
                        </span>
                      </div>
                      {item.addons.length > 0 && (
                        <div className="space-y-0.5 pl-3 border-l-2 border-brand-amber">
                          {item.addons.map((add, aIdx) => (
                            <div key={aIdx} className="text-xs text-amber-800 flex items-center gap-1">
                              <Sparkles className="h-3 w-3" />
                              <span>+ {add.name} (₱{add.price})</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveItem(idx)}
                      className="text-red-500 hover:bg-red-50 hover:text-red-700"
                      title="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Add-ons section */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-amber-50/80 p-4 border border-amber-200">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-brand-brown">Popular Add-ons:</h4>
                  <p className="text-xs text-muted-foreground">Adds to the last item in your order</p>
                </div>
                <Button
                  variant="amber"
                  size="sm"
                  disabled={cart.length === 0}
                  onClick={() => onAddAddonToLast('Pearl', 9)}
                  className="gap-1.5 shadow-sm"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Pearl (+₱9)
                </Button>
              </div>

              {/* Total Price Banner */}
              <div className="flex items-center justify-between rounded-xl bg-brand-brown text-white p-4">
                <span className="text-lg font-bold">Total Amount:</span>
                <span className="font-display text-3xl font-extrabold text-brand-amber">
                  ₱{total.toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </CardContent>

        {cart.length > 0 && (
          <CardFooter className="flex flex-wrap items-center justify-between gap-3 bg-brand-cream/40 p-6 border-t">
            <Button variant="outline" onClick={onOpenMenu} className="gap-1.5">
              <Plus className="h-4 w-4" />
              Add More Items
            </Button>

            {currentUser ? (
              <Button
                variant="brand"
                size="lg"
                disabled={isSubmitting || cart.length === 0}
                onClick={onGenerateReceipt}
                className="gap-2 font-bold px-8 shadow-md"
              >
                <Receipt className="h-5 w-5" />
                {isSubmitting ? 'Saving Order...' : 'Generate Receipt & Submit'}
              </Button>
            ) : (
              <Button
                variant="brand"
                size="lg"
                onClick={() => onOpenAuth('login')}
                className="gap-2 font-bold px-8 shadow-md bg-amber-600 hover:bg-amber-700"
              >
                <LogIn className="h-5 w-5" />
                Log In to Place Order
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
};
