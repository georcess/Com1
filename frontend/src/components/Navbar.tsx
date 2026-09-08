import React from 'react';
import { ShoppingBag, Coffee, User as UserIcon, LogOut, Shield, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { User } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  currentUser: User | null;
  onOpenAuth: (tab: 'login' | 'register') => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  currentUser,
  onOpenAuth,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-brand-brown/20 bg-brand-coffee text-white shadow-md backdrop-blur">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        {/* Brand Logo & Name */}
        <div 
          className="flex cursor-pointer items-center gap-3 transition-opacity hover:opacity-90"
          onClick={() => setActiveTab('home')}
        >
          <img 
            src="/public/images/IMG_2476.jpeg" 
            alt="Mr. Boy SpecialTea Logo" 
            className="h-10 w-10 rounded-full border-2 border-brand-amber object-cover shadow"
          />
          <div>
            <h1 className="font-display text-lg font-bold tracking-tight text-white sm:text-xl">
              Mr. Boy SpecialTea
            </h1>
            <p className="text-[11px] text-amber-100/80">Dela Costa V, Montalban</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap items-center gap-1 sm:gap-2">
          <Button
            variant={activeTab === 'home' ? 'amber' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('home')}
            className={activeTab === 'home' ? '' : 'text-white hover:bg-white/10 hover:text-white'}
          >
            Home
          </Button>

          <Button
            variant={activeTab === 'menu' ? 'amber' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('menu')}
            className={activeTab === 'menu' ? '' : 'text-white hover:bg-white/10 hover:text-white'}
          >
            <Coffee className="h-4 w-4 mr-1" />
            Menu
          </Button>

          <Button
            variant={activeTab === 'cart' ? 'amber' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('cart')}
            className={`relative ${activeTab === 'cart' ? '' : 'text-white hover:bg-white/10 hover:text-white'}`}
          >
            <ShoppingBag className="h-4 w-4 mr-1" />
            Order
            {cartCount > 0 && (
              <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-orange text-xs font-bold text-white shadow">
                {cartCount}
              </span>
            )}
          </Button>

          <Button
            variant={activeTab === 'team' ? 'amber' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('team')}
            className={activeTab === 'team' ? '' : 'text-white hover:bg-white/10 hover:text-white'}
          >
            <Users className="h-4 w-4 mr-1" />
            Team
          </Button>

          <Button
            variant={activeTab === 'about' ? 'amber' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('about')}
            className={activeTab === 'about' ? '' : 'text-white hover:bg-white/10 hover:text-white'}
          >
            About
          </Button>

          <Button
            variant={activeTab === 'contact' ? 'amber' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('contact')}
            className={activeTab === 'contact' ? '' : 'text-white hover:bg-white/10 hover:text-white'}
          >
            Contact
          </Button>

          <Button
            variant={activeTab === 'admin' ? 'amber' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('admin')}
            className={activeTab === 'admin' ? '' : 'text-white hover:bg-white/10 hover:text-white'}
          >
            <Shield className="h-3.5 w-3.5 mr-1" />
            Admin
          </Button>
        </nav>

        {/* User Auth Profile / Login Button */}
        <div className="flex items-center gap-2">
          {currentUser ? (
            <div className="flex items-center gap-2 rounded-lg bg-black/20 px-3 py-1.5 backdrop-blur">
              <div className="flex items-center gap-1.5 text-sm font-medium text-amber-50">
                <UserIcon className="h-4 w-4 text-brand-amber" />
                <span className="max-w-[120px] truncate sm:max-w-[160px]">{currentUser.fullname}</span>
                {currentUser.role === 'admin' && (
                  <Badge variant="brand" className="text-[10px] px-1.5 py-0 uppercase">
                    Admin
                  </Badge>
                )}
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={onLogout}
                className="h-7 px-2 text-xs"
                title="Logout"
              >
                <LogOut className="h-3.5 w-3.5" />
              </Button>
            </div>
          ) : (
            <Button
              variant="amber"
              size="sm"
              onClick={() => onOpenAuth('login')}
              className="gap-1.5 shadow"
            >
              <UserIcon className="h-4 w-4" />
              <span>Login / Register</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
