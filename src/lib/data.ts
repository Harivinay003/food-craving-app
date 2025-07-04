export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  dietaryTags: ('vegetarian' | 'vegan' | 'gluten-free' | 'non-veg')[];
};

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  priceRange: 'RS' | 'RS RS' | 'RS RS RS';
  image: string;
  menu: MenuItem[];
};

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Mumbai Spice',
    cuisine: 'North Indian',
    rating: 5,
    priceRange: 'RS RS RS',
    image: 'https://placehold.co/400x250.png',
    menu: [
      { id: '1-1', name: 'Butter Chicken', description: 'Grilled chicken in a rich, creamy tomato sauce.', price: 450, image: 'https://placehold.co/300x200.png', dietaryTags: ['non-veg'] },
      { id: '1-2', name: 'Paneer Tikka Masala', description: 'Marinated paneer cheese in a spiced curry.', price: 380, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegetarian'] },
      { id: '1-3', name: 'Dal Makhani', description: 'Creamy black lentils cooked with butter and spices.', price: 320, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegetarian'] },
    ],
  },
  {
    id: '2',
    name: 'Delhi Darbar',
    cuisine: 'Mughlai',
    rating: 4,
    priceRange: 'RS RS',
    image: 'https://placehold.co/400x250.png',
    menu: [
      { id: '2-1', name: 'Chicken Biryani', description: 'Aromatic basmati rice with spiced chicken.', price: 420, image: 'https://placehold.co/300x200.png', dietaryTags: ['non-veg'] },
      { id: '2-2', name: 'Mutton Korma', description: 'Tender mutton in a creamy, nutty curry.', price: 550, image: 'https://placehold.co/300x200.png', dietaryTags: ['non-veg'] },
      { id: '2-3', name: 'Shahi Paneer', description: 'Royal cottage cheese curry in a rich, creamy gravy.', price: 400, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegetarian'] },
    ],
  },
  {
    id: '3',
    name: 'Chennai Express',
    cuisine: 'South Indian',
    rating: 4,
    priceRange: 'RS',
    image: 'https://placehold.co/400x250.png',
    menu: [
      { id: '3-1', name: 'Masala Dosa', description: 'Crispy rice crepe filled with spiced potatoes.', price: 150, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegetarian', 'vegan', 'gluten-free'] },
      { id: '3-2', name: 'Idli Sambar', description: 'Steamed rice cakes served with lentil soup.', price: 120, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegetarian', 'vegan', 'gluten-free'] },
      { id: '3-3', name: 'Pongal', description: 'Savory rice and lentil porridge.', price: 180, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegetarian', 'gluten-free'] },
    ],
  },
  {
    id: '4',
    name: 'Kolkata Kitchen',
    cuisine: 'Bengali',
    rating: 5,
    priceRange: 'RS RS',
    image: 'https://placehold.co/400x250.png',
    menu: [
      { id: '4-1', name: 'Macher Jhol', description: 'Traditional Bengali fish curry.', price: 350, image: 'https://placehold.co/300x200.png', dietaryTags: ['non-veg'] },
      { id: '4-2', name: 'Kosha Mangsho', description: 'Slow-cooked spicy mutton curry.', price: 580, image: 'https://placehold.co/300x200.png', dietaryTags: ['non-veg'] },
      { id: '4-3', name: 'Luchi Alur Dom', description: 'Fluffy fried bread with spicy potato curry.', price: 250, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegetarian'] },
    ],
  },
    {
    id: '5',
    name: 'Punjabi Tadka',
    cuisine: 'Punjabi',
    rating: 4,
    priceRange: 'RS RS RS',
    image: 'https://placehold.co/400x250.png',
    menu: [
      { id: '5-1', name: 'Amritsari Kulcha', description: 'Stuffed flatbread served with chole (chickpea curry).', price: 300, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegetarian'] },
      { id: '5-2', name: 'Tandoori Chicken', description: 'Chicken marinated in yogurt and spices, roasted in a tandoor.', price: 480, image: 'https://placehold.co/300x200.png', dietaryTags: ['non-veg', 'gluten-free'] },
      { id: '5-3', name: 'Sarson da Saag', description: 'Mustard greens curry served with cornmeal flatbread.', price: 350, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegetarian', 'gluten-free'] },
    ],
  },
  {
    id: '6',
    name: 'Goan Paradise',
    cuisine: 'Goan',
    rating: 5,
    priceRange: 'RS RS RS',
    image: 'https://placehold.co/400x250.png',
    menu: [
      { id: '6-1', name: 'Fish Curry Rice', description: 'Classic Goan fish curry with steamed rice.', price: 400, image: 'https://placehold.co/300x200.png', dietaryTags: ['non-veg'] },
      { id: '6-2', name: 'Pork Vindaloo', description: 'Spicy and tangy pork curry.', price: 520, image: 'https://placehold.co/300x200.png', dietaryTags: ['non-veg'] },
      { id: '6-3', name: 'Bebinca', description: 'Traditional multi-layered Goan pudding.', price: 200, image: 'https://placehold.co/300x200.png', dietaryTags: ['vegetarian'] },
    ],
  },
];
