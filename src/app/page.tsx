'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Utensils, Search, Filter, MapPin, Loader2 } from 'lucide-react';

import { restaurants, Restaurant } from '@/lib/data';
import { cn, getDistance } from '@/lib/utils';
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
import { useGeolocation } from '@/hooks/use-geolocation';

// Add distance to the props
function RestaurantCard({ restaurant, distance }: { restaurant: Restaurant; distance?: number }) {
  return (
    <Link href={`/menu/${restaurant.id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
        <div className="overflow-hidden">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            width={400}
            height={250}
            data-ai-hint={restaurant.hint}
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
           <div className="mt-4 flex justify-between items-center">
            <Badge variant="secondary">{restaurant.priceRange}</Badge>
            {distance !== undefined && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{distance.toFixed(1)} km away</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// Define the restaurant type with an optional distance
type RestaurantWithDistance = Restaurant & { distance?: number };

export default function HomePage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [cuisineFilter, setCuisineFilter] = React.useState('all');
  const [priceFilter, setPriceFilter] = React.useState('all');
  
  const { position, loading: locationLoading, error: locationError, locate } = useGeolocation();
  const [displayedRestaurants, setDisplayedRestaurants] = React.useState<RestaurantWithDistance[]>(restaurants);
  const [isSortedByDistance, setIsSortedByDistance] = React.useState(false);


  const cuisines = React.useMemo(() => {
    const allCuisines = restaurants.map((r) => r.cuisine);
    return [...new Set(allCuisines)].sort();
  }, []);

  const priceRanges = React.useMemo(() => {
    const allPriceRanges = restaurants.map((r) => r.priceRange);
    return [...new Set(allPriceRanges)].sort((a, b) => a.length - b.length);
  }, []);

  const handleLocate = () => {
    // Clear other filters to ensure all nearby restaurants are shown
    setSearchQuery('');
    setCuisineFilter('all');
    setPriceFilter('all');
    locate();
    setIsSortedByDistance(true);
  }

  React.useEffect(() => {
    let restaurantsToDisplay: RestaurantWithDistance[] = restaurants.filter((restaurant) => {
      const matchesSearch = restaurant.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCuisine =
        cuisineFilter === 'all' || restaurant.cuisine === cuisineFilter;
      const matchesPrice =
        priceFilter === 'all' || restaurant.priceRange === priceFilter;
      return matchesSearch && matchesCuisine && matchesPrice;
    });

    if (position && isSortedByDistance) {
        restaurantsToDisplay = restaurantsToDisplay.map(r => ({
            ...r,
            distance: getDistance(position.coords.latitude, position.coords.longitude, r.latitude, r.longitude)
        })).sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));
    }

    setDisplayedRestaurants(restaurantsToDisplay);

  }, [searchQuery, cuisineFilter, priceFilter, position, isSortedByDistance]);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-headline tracking-wider text-primary">Welcome to Food Cravings</h1>
        <p className="text-xl text-muted-foreground mt-2">Discover your next favorite meal.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-3">
          <AiRecommender />
        </div>
      </div>

      <Card className="mb-8 p-6 shadow-lg bg-card/80 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="md:col-span-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search restaurants..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSortedByDistance(false);
                }}
                className="pl-10"
              />
            </div>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select value={cuisineFilter} onValueChange={(value) => {
                setCuisineFilter(value);
                setIsSortedByDistance(false);
            }}>
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
            <Select value={priceFilter} onValueChange={(value) => {
                setPriceFilter(value);
                setIsSortedByDistance(false);
            }}>
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
          <div className="md:col-span-1">
            <Button onClick={handleLocate} disabled={locationLoading} className="w-full">
                {locationLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <MapPin className="mr-2 h-4 w-4" />
                )}
                {locationLoading ? 'Locating...' : 'Near Me'}
            </Button>
          </div>
        </div>
         {locationError && <p className="text-destructive text-center mt-4">Error: {locationError.message}. Please enable location services.</p>}
      </Card>

      {displayedRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} distance={restaurant.distance} />
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
