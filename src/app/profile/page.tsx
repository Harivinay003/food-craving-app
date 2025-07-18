
'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { User, KeyRound, Wallet, CreditCard, PlusCircle, MapPin } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { indianStates } from '@/lib/locationData';

const nameSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, 'Password must be at least 6 characters.'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords don't match",
    path: ['confirmPassword'],
  });

const paymentSchema = z.object({
    cardNumber: z.string().regex(/^\d{16}$/, 'Please enter a valid 16-digit card number.'),
    expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Please use MM/YY format.'),
    cvv: z.string().regex(/^\d{3,4}$/, 'Please enter a valid CVV.'),
});

const locationSchema = z.object({
  state: z.string().min(1, 'Please select a state.'),
  city: z.string().min(1, 'Please select a city.'),
});

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { isAuthenticated, user, updateUser } = useAuth();

  const tab = searchParams.get('tab') || 'account';
  const [selectedState, setSelectedState] = React.useState(user?.state || '');
  
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);
  
  const nameForm = useForm<z.infer<typeof nameSchema>>({
    resolver: zodResolver(nameSchema),
    defaultValues: { name: user?.name || '' },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  const paymentForm = useForm<z.infer<typeof paymentSchema>>({
      resolver: zodResolver(paymentSchema),
      defaultValues: { cardNumber: '', expiryDate: '', cvv: '' },
  });

  const locationForm = useForm<z.infer<typeof locationSchema>>({
    resolver: zodResolver(locationSchema),
    defaultValues: { state: user?.state || '', city: user?.city || '' },
  });

  const onNameSubmit = (data: z.infer<typeof nameSchema>) => {
    updateUser({ name: data.name });
    toast({ title: 'Success!', description: 'Your name has been updated.' });
  };

  const onPasswordSubmit = (data: z.infer<typeof passwordSchema>) => {
    console.log('Password change data:', data); // Mock action
    toast({ title: 'Success!', description: 'Your password has been changed.' });
    passwordForm.reset();
  };

  const onPaymentSubmit = (data: z.infer<typeof paymentSchema>) => {
      console.log('Payment method added:', data); // Mock action
      toast({ title: 'Success!', description: 'Your payment method has been added.' });
      paymentForm.reset();
  }
  
  const onLocationSubmit = (data: z.infer<typeof locationSchema>) => {
    // In a real app, you would geocode this to lat/lng and save it.
    updateUser({ state: data.state, city: data.city });
    toast({ title: 'Success!', description: 'Your location has been updated.' });
  };

  const handleTabChange = (value: string) => {
    router.push(`/profile?tab=${value}`, { scroll: false });
  }

  const states = Object.keys(indianStates);
  const cities = selectedState ? indianStates[selectedState] : [];

  if (!isAuthenticated) {
    return null; // or a loading spinner while redirecting
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-headline mb-4">My Profile</h1>
      <p className="text-muted-foreground mb-8">Manage your account settings, location, wallet, and payment methods.</p>
      
      <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 md:w-auto md:max-w-[60rem]">
          <TabsTrigger value="account"><User className="mr-2"/>Account</TabsTrigger>
          <TabsTrigger value="location"><MapPin className="mr-2"/>Location</TabsTrigger>
          <TabsTrigger value="wallet"><Wallet className="mr-2"/>Wallet</TabsTrigger>
          <TabsTrigger value="payment"><CreditCard className="mr-2"/>Payment</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Change Name Form */}
              <Form {...nameForm}>
                <form onSubmit={nameForm.handleSubmit(onNameSubmit)} className="space-y-4 md:w-1/2">
                  <FormField control={nameForm.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit">Save Changes</Button>
                </form>
              </Form>
              
              <Separator />

              {/* Change Password Form */}
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4 md:w-1/2">
                  <h3 className="font-semibold text-lg flex items-center gap-2"><KeyRound/> Change Password</h3>
                  <FormField control={passwordForm.control} name="currentPassword" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl><Input type="password" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                   <FormField control={passwordForm.control} name="newPassword" render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl><Input type="password" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                   <FormField control={passwordForm.control} name="confirmPassword" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl><Input type="password" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit">Update Password</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="location">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Location</CardTitle>
              <CardDescription>Set your default location for faster restaurant discovery.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...locationForm}>
                <form onSubmit={locationForm.handleSubmit(onLocationSubmit)} className="space-y-4 md:w-1/2">
                  <FormField
                    control={locationForm.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <Select onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedState(value);
                          locationForm.resetField('city');
                        }} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {states.map((stateName) => (
                              <SelectItem key={stateName} value={stateName}>{stateName}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={locationForm.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} disabled={!selectedState}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your city" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {cities.map((cityName) => (
                              <SelectItem key={cityName} value={cityName}>{cityName}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Save Location</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallet">
            <Card>
                <CardHeader>
                    <CardTitle>My Wallet</CardTitle>
                    <CardDescription>View your balance and add funds.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-6 bg-secondary rounded-lg flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Current Balance</p>
                            <p className="text-4xl font-bold">RS 500.00</p>
                        </div>
                        <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                            <PlusCircle className="mr-2"/> Add Money
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="payment">
            <Card>
                <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your saved payment methods for faster checkout.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    {/* Saved methods would be listed here */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Saved Cards</h3>
                        <div className="p-4 border rounded-md text-center text-muted-foreground">
                            You have no saved payment methods.
                        </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Add new payment method form */}
                    <Form {...paymentForm}>
                      <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-4 md:w-1/2">
                        <h3 className="font-semibold text-lg flex items-center gap-2"><CreditCard/> Add New Card</h3>
                        <FormField control={paymentForm.control} name="cardNumber" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={paymentForm.control} name="expiryDate" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expiry (MM/YY)</FormLabel>
                                <FormControl><Input placeholder="MM/YY" {...field} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={paymentForm.control} name="cvv" render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVV</FormLabel>
                                <FormControl><Input placeholder="•••" {...field} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                        </div>
                        <Button type="submit">Save Card</Button>
                      </form>
                    </Form>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
