export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  dietaryTags: ('vegetarian' | 'vegan' | 'gluten-free')[];
};

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  image: string;
  menu: MenuItem[];
};

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Bella Italia',
    cuisine: 'Italian',
    rating: 4,
    priceRange: '$$',
    image: 'https://placehold.co/400x250.png',
    menu: [
      { id: '1-1', name: 'Margherita Pizza', description: 'Classic pizza with tomato, mozzarella, and basil.', price: 12.99, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegetarian'] },
      { id: '1-2', name: 'Spaghetti Carbonara', description: 'Pasta with eggs, cheese, pancetta, and pepper.', price: 15.50, image: 'https://placehold.co/300x200.png', dietaryTags: [] },
      { id: '1-3', name: 'Mushroom Risotto', description: 'Creamy risotto with wild mushrooms.', price: 16.00, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegetarian', 'gluten-free'] },
    ],
  },
  {
    id: '2',
    name: 'Kyoto Sushi',
    cuisine: 'Japanese',
    rating: 5,
    priceRange: '$$$',
    image: 'https://placehold.co/400x250.png',
    menu: [
      { id: '2-1', name: 'California Roll', description: 'Crab, avocado, and cucumber rolled in seaweed and rice.', price: 8.00, image: 'https://placehold.co/300x200.png', dietaryTags: [] },
      { id: '2-2', name: 'Tuna Nigiri', description: 'Fresh tuna slice over vinegared rice.', price: 6.50, image: 'https://placehold.co/300x200.png', dietaryTags: ['gluten-free'] },
      { id: '2-3', name: 'Avocado Roll', description: 'Avocado rolled in seaweed and rice.', price: 5.00, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegan', 'vegetarian', 'gluten-free'] },
    ],
  },
  {
    id: '3',
    name: 'El Fuego',
    cuisine: 'Mexican',
    rating: 4,
    priceRange: '$$',
    image: 'https://placehold.co/400x250.png',
    menu: [
      { id: '3-1', name: 'Carne Asada Tacos', description: 'Grilled steak tacos with onion and cilantro.', price: 11.99, image: 'https://placehold.co/300x200.png', dietaryTags: [] },
      { id: '3-2', name: 'Veggie Burrito', description: 'Large burrito filled with beans, rice, and vegetables.', price: 10.50, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegetarian'] },
      { id: '3-3', name: 'Guacamole & Chips', description: 'Freshly made guacamole with crispy tortilla chips.', price: 7.00, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegan', 'vegetarian', 'gluten-free'] },
    ],
  },
  {
    id: '4',
    name: 'Green Leaf Cafe',
    cuisine: 'Vegan',
    rating: 5,
    priceRange: '$',
    image: 'https://placehold.co/400x250.png',
    menu: [
      { id: '4-1', name: 'Quinoa Salad', description: 'Healthy salad with quinoa, veggies, and a lemon vinaigrette.', price: 9.50, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegan', 'vegetarian', 'gluten-free'] },
      { id: '4-2', name: 'Beyond Burger', description: 'Plant-based burger patty on a vegan bun.', price: 14.00, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegan', 'vegetarian'] },
      { id: '4-3', name: 'Lentil Soup', description: 'Hearty and warm lentil soup.', price: 6.00, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegan', 'vegetarian', 'gluten-free'] },
    ],
  },
    {
    id: '5',
    name: 'The Sizzling Grill',
    cuisine: 'American',
    rating: 3,
    priceRange: '$$',
    image: 'https://placehold.co/400x250.png',
    menu: [
      { id: '5-1', name: 'Classic Cheeseburger', description: 'All-beef patty with cheddar cheese, lettuce, and tomato.', price: 13.50, image: 'https://placehold.co/300x200.png', dietaryTags: [] },
      { id: '5-2', name: 'BBQ Ribs', description: 'Slow-cooked ribs with a tangy BBQ sauce.', price: 19.99, image: 'https://placehold.co/300x200.png', dietaryTags: [] },
      { id: '5-3', name: 'Caesar Salad', description: 'Crisp romaine, parmesan, croutons, and Caesar dressing.', price: 10.00, image: 'https://placehold.co/300x200.png', dietaryTags: [] },
    ],
  },
  {
    id: '6',
    name: 'Mumbai Spice',
    cuisine: 'Indian',
    rating: 5,
    priceRange: '$$$',
    image: 'https://placehold.co/400x250.png',
    menu: [
      { id: '6-1', name: 'Chicken Tikka Masala', description: 'Creamy tomato-based curry with grilled chicken.', price: 17.00, image: 'https://placehold.co/300x200.png', dietaryTags: [] },
      { id: '6-2', name: 'Paneer Butter Masala', description: 'Indian cheese cubes in a rich, buttery sauce.', price: 16.00, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegetarian'] },
      { id: '6-3', name: 'Aloo Gobi', description: 'Cauliflower and potatoes cooked with Indian spices.', price: 14.50, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegan', 'vegetarian', 'gluten-free'] },
    ],
  },
];
