'use client';

import * as React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { UserPlus, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
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
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters.'),
    email: z.string().email('Please enter a valid email address.'),
    password: z.string().min(6, 'Password must be at least 6 characters.'),
    confirmPassword: z.string(),
    address: z.string().min(10, 'Please enter a full address.'),
    city: z.string().min(2, 'Please enter a city.'),
    zipCode: z.string().min(4, 'Please enter a valid zip code.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      city: '',
      zipCode: '',
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    setIsSubmitting(true);
    console.log('Registration details:', values);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Registration Successful!',
        description: 'You can now log in with your new account.',
      });
      router.push('/login');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container flex min-h-[calc(100vh-10rem)] items-center justify-center py-12">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl flex items-center justify-center gap-2">
            <UserPlus className="h-7 w-7" />
            Create an Account
          </CardTitle>
          <CardDescription>
            Join Food Cravings to save your favorite orders and find restaurants near you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <h3 className="text-lg font-semibold">Account Details</h3>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="my-6" />
              
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="h-5 w-5"/>
                Delivery Address
              </h3>

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

              <Button type="submit" size="lg" className="w-full !mt-8 bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isSubmitting}>
                {isSubmitting ? 'Creating account...' : 'Register'}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold text-primary hover:underline"
            >
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
