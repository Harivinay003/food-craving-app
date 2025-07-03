'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Utensils, Search, Filter } from 'lucide-react';

import { restaurants, Restaurant } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AiRecommender } from '@/components/AiRecommender';
import { Badge } from '@/components/ui/badge';

const cuisines = [...new Set(restaurants.map((r) => r.cuisine))];
const priceRanges = [...new Set(restaurants.map((r) => r.priceRange))].sort();

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Link href={`/menu/${restaurant.id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
        <div className="overflow-hidden">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            width={400}
            height={250}
            data-ai-hint="restaurant food"
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardHeader>
          <CardTitle className="font-headline text-2xl tracking-tight">{restaurant.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-muted-foreground">
            <div className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              <span>{restaurant.cuisine}</span>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-4 w-4',
                    i < restaurant.rating ? 'fill-accent text-accent' : 'fill-muted text-muted-foreground'
                  )}
                />
              ))}
            </div>
          </div>
           <div className="mt-4">
            <Badge variant="secondary">{restaurant.priceRange}</Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [cuisineFilter, setCuisineFilter] = React.useState('all');
  const [priceFilter, setPriceFilter] = React.useState('all');

  const filteredRestaurants = React.useMemo(() => {
    return restaurants.filter((restaurant) => {
      const matchesSearch = restaurant.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCuisine =
        cuisineFilter === 'all' || restaurant.cuisine === cuisineFilter;
      const matchesPrice =
        priceFilter === 'all' || restaurant.priceRange === priceFilter;
      return matchesSearch && matchesCuisine && matchesPrice;
    });
  }, [searchQuery, cuisineFilter, priceFilter]);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-headline tracking-wider text-primary">Welcome to Menu Maestro</h1>
        <p className="text-xl text-muted-foreground mt-2">Discover your next favorite meal.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-3">
          <AiRecommender />
        </div>
      </div>

      <Card className="mb-8 p-6 shadow-lg bg-card/80 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="md:col-span-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by cuisine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cuisines</SelectItem>
                {cuisines.map((cuisine) => (
                  <SelectItem key={cuisine} value={cuisine}>
                    {cuisine}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger>
                 <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                {priceRanges.map((price) => (
                  <SelectItem key={price} value={price}>
                    {price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {filteredRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-2xl font-headline text-muted-foreground">No restaurants match your criteria.</p>
          <p className="mt-2 text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
