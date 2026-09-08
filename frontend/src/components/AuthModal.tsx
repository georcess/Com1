import React, { useState } from 'react';
import { Coffee, Sparkles, LogIn, UserPlus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
  onAuthSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'login',
  onAuthSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);

  // Login State
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register State
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const resetForm = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: loginIdentifier,
          password: loginPassword,
        }),
      });
      const data = await res.json();

      if (data.status === 'success' && data.user) {
        setSuccessMessage(data.message || 'Login successful!');
        setTimeout(() => {
          onAuthSuccess(data.user);
          onClose();
        }, 500);
      } else {
        setErrorMessage(data.message || 'Invalid credentials.');
      }
    } catch (err) {
      setErrorMessage('Could not connect to server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    if (regPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullname: regFullName,
          username: regUsername,
          email: regEmail,
          password: regPassword,
        }),
      });
      const data = await res.json();

      if (data.status === 'success' && data.user) {
        setSuccessMessage(data.message || 'Registration successful!');
        setTimeout(() => {
          onAuthSuccess(data.user);
          onClose();
        }, 600);
      } else {
        setErrorMessage(data.message || 'Registration failed.');
      }
    } catch (err) {
      setErrorMessage('Could not connect to server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white p-6 shadow-2xl rounded-2xl">
        <DialogHeader className="text-center space-y-1">
          <div className="mx-auto mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-brand-coffee">
            <Coffee className="h-6 w-6 text-brand-orange" />
          </div>
          <DialogTitle className="font-display text-2xl font-bold text-brand-brown">
            Mr. Boy SpecialTea
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Sign in to your account or register to start ordering
          </DialogDescription>
        </DialogHeader>

        {errorMessage && (
          <div className="rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-200">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="rounded-xl bg-green-50 p-3 text-xs text-green-700 border border-green-200">
            {successMessage}
          </div>
        )}

        <Tabs 
          value={activeTab} 
          onValueChange={(v) => {
            setActiveTab(v as 'login' | 'register');
            resetForm();
          }}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 bg-brand-cream">
            <TabsTrigger value="login" className="gap-1.5 font-bold">
              <LogIn className="h-4 w-4" />
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="gap-1.5 font-bold">
              <UserPlus className="h-4 w-4" />
              Register
            </TabsTrigger>
          </TabsList>

          {/* LOGIN TAB */}
          <TabsContent value="login" className="space-y-4 pt-4">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="auth-login-id">Username or Email</Label>
                <Input
                  id="auth-login-id"
                  required
                  placeholder="Enter your username or email"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="auth-login-pw">Password</Label>
                <Input
                  id="auth-login-pw"
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                variant="brand"
                disabled={isLoading}
                className="w-full gap-2 font-bold py-2.5 shadow-md"
              >
                <LogIn className="h-4 w-4" />
                {isLoading ? 'Logging in...' : 'Sign In'}
              </Button>
            </form>
          </TabsContent>

          {/* REGISTER TAB */}
          <TabsContent value="register" className="space-y-4 pt-4">
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <Label htmlFor="auth-reg-name">Full Name</Label>
                <Input
                  id="auth-reg-name"
                  required
                  placeholder="e.g. Maria Santos"
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="auth-reg-user">Username</Label>
                <Input
                  id="auth-reg-user"
                  required
                  placeholder="Choose a username"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="auth-reg-email">Email Address</Label>
                <Input
                  id="auth-reg-email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="auth-reg-pw">Password (min. 6 characters)</Label>
                <Input
                  id="auth-reg-pw"
                  type="password"
                  required
                  minLength={6}
                  placeholder="Create a password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                variant="brand"
                disabled={isLoading}
                className="w-full gap-2 font-bold py-2.5 shadow-md"
              >
                <Sparkles className="h-4 w-4" />
                {isLoading ? 'Creating account...' : 'Create Customer Account'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
