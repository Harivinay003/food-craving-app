'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CreditCard, Truck } from 'lucide-react';

const deliverySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number.'),
  address: z.string().min(10, 'Please enter a full address.'),
  city: z.string().min(2, 'Please enter a city.'),
  zipCode: z.string().min(4, 'Please enter a valid zip code.'),
});

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof deliverySchema>>({
    resolver: zodResolver(deliverySchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zipCode: '',
    },
  });

  React.useEffect(() => {
    if (items.length === 0 && !isSubmitting) {
      router.push('/');
    }
  }, [items, router, isSubmitting]);

  const onSubmit = (values: z.infer<typeof deliverySchema>) => {
    setIsSubmitting(true);
    console.log('Order Details:', values);
    console.log('Ordered Items:', items);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Order Confirmed!',
        description: `Thank you, ${values.name}! Your order is on its way. A confirmation has been sent to ${values.email}.`,
        duration: 5000,
      });
      clearCart();
      router.push('/');
    }, 1500);
  };

  if (items.length === 0) {
    return null; // or a loading/redirecting indicator
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-headline mb-8 text-center">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Delivery Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl">
              <Truck className="h-6 w-6"/>
              Delivery Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem><FormLabel>Street Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="zipCode" render={({ field }) => (
                    <FormItem><FormLabel>Zip Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                 <Button type="submit" size="lg" className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isSubmitting}>
                  {isSubmitting ? 'Placing Order...' : `Place Order - RS ${totalPrice.toFixed(2)}`}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[25rem]">
              <div className="space-y-4 pr-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Image src={item.image} alt={item.name} width={64} height={64} data-ai-hint={item.hint} className="rounded-md object-cover"/>
                        <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                    </div>
                    <p className="font-medium">RS {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Separator />
            <div className="w-full flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>RS {totalPrice.toFixed(2)}</span>
            </div>
          </CardFooter>
        </Card>

      </div>
    </div>
  );
}
