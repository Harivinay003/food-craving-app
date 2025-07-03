'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { MinusCircle, PlusCircle, Trash2, ShoppingCart } from 'lucide-react';
import { Badge } from './ui/badge';

export function Cart() {
  const {
    items,
    totalPrice,
    totalItems,
    updateQuantity,
    removeFromCart,
    isCartOpen,
    setCartOpen,
  } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle className="font-headline text-2xl">
            My Order ({totalItems})
          </SheetTitle>
        </SheetHeader>
        <Separator />
        {items.length > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-6 p-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      data-ai-hint="food item"
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                       </p>
                       <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 mt-2 text-muted-foreground hover:text-destructive"
                        onClick={() => removeFromCart(item.id)}
                       >
                         <Trash2 className="h-4 w-4"/>
                       </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="bg-secondary/50 p-6">
                <div className="w-full space-y-4">
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                     <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Link href="/checkout" onClick={() => setCartOpen(false)}>Proceed to Checkout</Link>
                    </Button>
                </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingCart className="h-20 w-20 text-muted-foreground/30" strokeWidth={1}/>
            <h3 className="font-headline text-2xl">Your cart is empty</h3>
            <p className="text-muted-foreground">Add some delicious food to get started!</p>
            <Button asChild variant="outline" onClick={() => setCartOpen(false)}>
              <Link href="/">Browse Restaurants</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
