'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Sparkles } from 'lucide-react';

import { foodRecommendation } from '@/ai/flows/food-recommendation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const recommenderSchema = z.object({
  dietaryPreferences: z
    .string()
    .min(3, 'Please describe your preferences in a bit more detail.')
    .max(200, 'Please keep your preferences under 200 characters.'),
});

export function AiRecommender() {
  const [recommendations, setRecommendations] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof recommenderSchema>>({
    resolver: zodResolver(recommenderSchema),
    defaultValues: {
      dietaryPreferences: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof recommenderSchema>) => {
    setIsLoading(true);
    setRecommendations('');
    try {
      // For demonstration, we use a hardcoded order history.
      // In a real application, this would be fetched for the logged-in user.
      const orderHistory = 'Pizza, Burger, Salad, Pasta, Sushi, Tacos';
      const result = await foodRecommendation({
        dietaryPreferences: data.dietaryPreferences,
        orderHistory,
      });
      setRecommendations(result.recommendations);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      // Optionally set an error state to show in the UI
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Sparkles className="h-8 w-8 text-accent" />
          <CardTitle className="font-headline text-3xl">AI Food Recommender</CardTitle>
        </div>
        <CardDescription>
          Tell us your tastes, and we'll suggest something delicious based on popular items.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="dietaryPreferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dietary Preferences or Cravings</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'vegetarian, spicy, and craving Italian food' or 'gluten-free and looking for a light lunch'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              {isLoading && (
                <Sparkles className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isLoading ? 'Thinking...' : 'Get Recommendations'}
            </Button>
          </form>
        </Form>
      </CardContent>
      {(isLoading || recommendations) && (
        <CardFooter>
            {recommendations && !isLoading && (
            <div className="mt-4 p-4 bg-primary/10 rounded-lg w-full">
                <h4 className="font-headline text-lg text-primary">Our Suggestions for You:</h4>
                <p className="mt-2 text-primary/80">{recommendations}</p>
            </div>
            )}
        </CardFooter>
        )}
    </Card>
  );
}
