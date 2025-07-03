'use client';

import * as React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { restaurants, Restaurant, MenuItem } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Star, Utensils, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

function MenuItemCard({ item }: { item: MenuItem }) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(item);
    toast({
      title: 'Added to cart!',
      description: `${item.name} is waiting for you.`,
    });
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-md transition-shadow hover:shadow-xl">
      <Image
        src={item.image}
        alt={item.name}
        width={300}
        height={200}
        data-ai-hint="food dish"
        className="w-full h-48 object-cover"
      />
      <CardHeader>
        <CardTitle className="font-headline text-xl">{item.name}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
            {item.dietaryTags.map(tag => (
                <Badge key={tag} variant="outline" className="capitalize">{tag}</Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="text-lg font-semibold text-primary">${item.price.toFixed(2)}</p>
        <Button onClick={handleAddToCart} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <PlusCircle className="mr-2 h-4 w-4"/>
            Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function MenuPage({ params }: { params: { id: string } }) {
  const [restaurant, setRestaurant] = React.useState<Restaurant | null>(null);

  React.useEffect(() => {
    const foundRestaurant = restaurants.find((r) => r.id === params.id);
    if (foundRestaurant) {
      setRestaurant(foundRestaurant);
    } else {
      // In a real app with data fetching, you might handle loading/error states here
      // For this mock data setup, we can assume if it's not found, it's a 404.
      notFound();
    }
  }, [params.id]);


  if (!restaurant) {
    // You can return a loading skeleton here
    return <div>Loading...</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8 overflow-hidden shadow-xl">
        <div className="relative">
            <Image
                src={restaurant.image}
                alt={restaurant.name}
                width={1200}
                height={400}
                data-ai-hint="restaurant interior"
                className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
                <h1 className="text-5xl font-headline text-white">{restaurant.name}</h1>
                <div className="flex items-center gap-4 mt-2 text-white/90">
                    <div className="flex items-center gap-2">
                        <Utensils className="h-5 w-5" />
                        <span>{restaurant.cuisine}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                            key={i}
                            className={cn(
                                'h-5 w-5',
                                i < restaurant.rating ? 'fill-accent text-accent' : 'fill-gray-400 text-gray-400'
                            )}
                            />
                        ))}
                    </div>
                    <Badge variant="secondary">{restaurant.priceRange}</Badge>
                </div>
            </div>
        </div>
      </Card>
      
      <h2 className="text-3xl font-headline mb-6">Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {restaurant.menu.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
