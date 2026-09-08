import React from 'react';
import { ArrowRight, Sparkles, Heart, Leaf, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card';

interface HeroProps {
  onStartOrdering: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartOrdering }) => {
  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-brand-brown py-20 text-center text-white shadow-xl">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          style={{ backgroundImage: "url('/public/images/Boy.jpeg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-brown via-brand-brown/80 to-transparent" />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-4">
          <div className="relative">
            <img
              src="/public/images/IMG_2476.jpeg"
              alt="Mr. Boy SpecialTea Logo"
              className="h-28 w-28 rounded-full border-4 border-white shadow-2xl object-cover ring-4 ring-brand-amber/50"
            />
            <span className="absolute -bottom-1 -right-1 rounded-full bg-brand-orange p-1.5 text-white shadow">
              <Sparkles className="h-4 w-4" />
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-amber-50 drop-shadow">
              Mr. Boy SpecialTea
            </h1>
            <p className="text-base text-amber-100/90 sm:text-lg">
              Dela Costa V, Burgos Montalban, Rodriguez Rizal
            </p>
          </div>

          <p className="max-w-xl text-sm italic text-amber-200/80 sm:text-base">
            “Welcome to Mr.Boy SpecialTea. Enjoy the taste of our drinks at an affordable price! From Milk Tea, Fruit Tea, to freshly brewed Coffee!”
          </p>

          <Button
            variant="brand"
            size="lg"
            onClick={onStartOrdering}
            className="group gap-2 rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl"
          >
            Start Ordering
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </section>

      {/* Our Approach Cards */}
      <section className="container mx-auto px-4">
        <div className="text-center space-y-2 mb-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-brand-brown">
            Our Approach
          </h2>
          <p className="text-sm text-muted-foreground">
            Here's how we make your every sip better.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-t-4 border-t-brand-amber bg-white/80 backdrop-blur transition-transform hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-brand-coffee">
                <Sparkles className="h-6 w-6 text-brand-orange" />
              </div>
              <CardTitle className="text-lg text-brand-brown">Simple Flavors</CardTitle>
              <CardDescription className="text-xs">
                Easy, balanced blends curated for maximum delight.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-t-4 border-t-brand-coffee bg-white/80 backdrop-blur transition-transform hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-brand-coffee">
                <ShieldCheck className="h-6 w-6 text-brand-coffee" />
              </div>
              <CardTitle className="text-lg text-brand-brown">Clean Labels</CardTitle>
              <CardDescription className="text-xs">
                Clear, honest, and high-quality ingredients you can trust.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-t-4 border-t-green-600 bg-white/80 backdrop-blur transition-transform hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
                <Leaf className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg text-brand-brown">Ethically Sourced</CardTitle>
              <CardDescription className="text-xs">
                Sourced sustainably from dedicated and fair farms.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-t-4 border-t-red-500 bg-white/80 backdrop-blur transition-transform hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                <Heart className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg text-brand-brown">Balanced Sweetness</CardTitle>
              <CardDescription className="text-xs">
                Naturally brewed, lightly sweetened to perfection.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  );
};
