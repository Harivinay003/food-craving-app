'use client';

import Link from 'next/link';
import { UtensilsCrossed, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';

export function Header() {
  const { totalItems, setCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <UtensilsCrossed className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold font-headline tracking-wide">
            Menu Maestro
          </span>
        </Link>
        <Button
          variant="outline"
          size="icon"
          className="relative rounded-full"
          onClick={() => setCartOpen(true)}
          aria-label={`Open cart with ${totalItems} items`}
        >
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge
              variant="default"
              className="absolute -right-2 -top-2 h-6 w-6 justify-center rounded-full bg-accent text-accent-foreground p-0"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
}
