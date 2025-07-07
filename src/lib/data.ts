export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  dietaryTags: ('vegetarian' | 'vegan' | 'gluten-free' | 'non-veg')[];
  hint: string;
};

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  priceRange: 'RS' | 'RS RS' | 'RS RS RS';
  image: string;
  menu: MenuItem[];
  hint: string;
  latitude: number;
  longitude: number;
};

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Mumbai Spice',
    cuisine: 'North Indian',
    rating: 5,
    priceRange: 'RS RS RS',
    image: 'https://placehold.co/400x250.png',
    hint: 'indian restaurant',
    latitude: 19.0760,
    longitude: 72.8777,
    menu: [
      { id: '1-1', name: 'Samosa Chaat', description: 'Crushed samosas with yogurt, tamarind chutney, and spices.', price: 180, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegetarian'], hint: 'samosa chaat' },
      { id: '1-2', name: 'Aloo Tikki', description: 'Spiced potato patties, shallow-fried until golden brown.', price: 150, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegetarian', 'gluten-free'], hint: 'aloo tikki' },
      { id: '1-3', name: 'Chicken 65', description: 'Spicy, deep-fried chicken chunks bursting with flavor.', price: 280, image: 'https://placehold.co/300x200.png', dietaryTags: ['non-veg'], hint: 'chicken starter' },
    ],
  },
  {
    id: '2',
    name: 'Delhi Darbar',
    cuisine: 'Mughlai',
    rating: 4,
    priceRange: 'RS RS',
    image: 'https://placehold.co/400x250.png',
    hint: 'mughlai food',
    latitude: 28.7041,
    longitude: 77.1025,
    menu: [
      { id: '2-1', name: 'Seekh Kebab', description: 'Minced lamb mixed with spices, skewered and grilled.', price: 350, image: 'https://placehold.co/300x200.png', dietaryTags: ['non-veg', 'gluten-free'], hint: 'seekh kebab' },
      { id: '2-2', name: 'Malai Paneer Tikka', description: 'Creamy cottage cheese cubes marinated and grilled.', price: 320, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegetarian'], hint: 'paneer tikka' },
      { id: '2-3', name: 'Dahi Bhalla', description: 'Soft lentil dumplings soaked in creamy yogurt.', price: 160, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegetarian'], hint: 'dahi bhalla' },
    ],
  },
  {
    id: '3',
    name: 'Chennai Express',
    cuisine: 'South Indian',
    rating: 4,
    priceRange: 'RS',
    image: 'https://placehold.co/400x250.png',
    hint: 'south indian',
    latitude: 13.0827,
    longitude: 80.2707,
    menu: [
      { id: '3-1', name: 'Medu Vada', description: 'Savory, donut-shaped lentil fritters, crispy outside, soft inside.', price: 100, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegetarian', 'vegan'], hint: 'medu vada' },
      { id: '3-2', name: 'Chilli Gobi', description: 'Crispy cauliflower florets tossed in a spicy, tangy sauce.', price: 220, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegetarian'], hint: 'chilli gobi' },
      { id: '3-3', name: 'Podi Idli', description: 'Mini steamed rice cakes tossed in a spicy powder and ghee.', price: 140, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegetarian'], hint: 'podi idli' },
    ],
  },
  {
    id: '4',
    name: 'Kolkata Kitchen',
    cuisine: 'Bengali',
    rating: 5,
    priceRange: 'RS RS',
    image: 'https://placehold.co/400x250.png',
    hint: 'bengali food',
    latitude: 22.5726,
    longitude: 88.3639,
    menu: [
      { id: '4-1', name: 'Fish Fry', description: 'Crumb-coated Bhetki fish fillet, deep-fried to perfection.', price: 300, image: 'https://placehold.co/300x200.png', dietaryTags: ['non-veg'], hint: 'fish fry' },
      { id: '4-2', name: 'Mochar Chop', description: 'Spiced banana blossom croquettes, a Bengali delicacy.', price: 180, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegetarian'], hint: 'mochar chop' },
      { id: '4-3', name: 'Beguni', description: 'Thinly sliced eggplant dipped in gram flour batter and fried.', price: 120, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegetarian', 'vegan'], hint: 'beguni eggplant' },
    ],
  },
    {
    id: '5',
    name: 'Punjabi Tadka',
    cuisine: 'Punjabi',
    rating: 4,
    priceRange: 'RS RS RS',
    image: 'https://placehold.co/400x250.png',
    hint: 'punjabi food',
    latitude: 30.7333,
    longitude: 76.7794,
    menu: [
      { id: '5-1', name: 'Paneer Pakora', description: 'Cottage cheese slices battered and deep-fried.', price: 200, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegetarian'], hint: 'paneer pakora' },
      { id: '5-2', name: 'Hara Bhara Kebab', description: 'Patties made from spinach, peas, and potatoes.', price: 220, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegetarian'], hint: 'hara bhara kebab' },
      { id: '5-3', name: 'Chilli Chicken Dry', description: 'Indo-Chinese style spicy chicken stir-fry.', price: 320, image: 'https://placehold.co/300x200.png', dietaryTags: ['non-veg'], hint: 'chilli chicken' },
    ],
  },
  {
    id: '6',
    name: 'Goan Paradise',
    cuisine: 'Goan',
    rating: 5,
    priceRange: 'RS RS RS',
    image: 'https://placehold.co/400x250.png',
    hint: 'goan food',
    latitude: 15.4909,
    longitude: 73.8278,
    menu: [
      { id: '6-1', name: 'Prawn Rava Fry', description: 'Semolina-coated prawns, shallow-fried until crisp.', price: 380, image: 'https://placehold.co/300x200.png', dietaryTags: ['non-veg'], hint: 'prawn fry' },
      { id: '6-2', name: 'Chorizo Pao', description: 'Spicy Goan sausage stuffed in a local bread roll.', price: 250, image: 'https://placehold.co/300x200.png', dietaryTags: ['non-veg'], hint: 'chorizo pao' },
      { id: '6-3', name: 'Vegetable Rissois', description: 'Crispy, crescent-shaped pastries with a vegetable filling.', price: 180, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegetarian'], hint: 'vegetable pastry' },
    ],
  },
];
