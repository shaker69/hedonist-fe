import { tags } from "./tags";

const BASE_URL = `https://${process.env.S3_URL || 'hedonist-media.s3.eu-west-1.amazonaws.com'}/menu`;

console.log('process.env.S3_URL', process.env);

export const menuItems: MenuItem[] = [
  {
    id: 'item-1',
    categoryIds: ['cat-1'],
    ingredientIds: ['ing-1', 'ing-2', 'ing-3', 'ing-4'],
    pictureURL: `${BASE_URL}/Full_english.jpg`,
    objectPosition: [100, 100],
    name: {
      en: 'Full english',
      ru: 'Full english',
      ka: 'Full english',
    },
    sub: {
      en: 'sausage, mushrooms, bacon, eggs',
      ru: 'sausage, mushrooms, bacon, eggs',
      ka: 'sausage, mushrooms, bacon, eggs',
    },
    price: 24,
    currency: 'GEL',
    weight: 330,
    description: {
      en: 'It is a traditional feast for the senses that has warmed hearts and homes for generations. A plate featuring crispy bacon, premium sausages, perfectly fried eggs, golden hashbrowns, and tenderly sautéed mushrooms.',
      ru: 'Это традиционный праздник чувств, который согревал сердца и дома на протяжении нескольких поколений. Тарелка с хрустящим беконом, колбасками премиум-класса, идеальной яичницей, золотистыми оладьями и нежно обжаренными грибами.',
      ka: 'ეს არის გრძნობების ტრადიციული დღესასწაული, რომელიც თაობების განმავლობაში ათბობს გულებსა და სახლებს. თეფშზე გამოსახულია ხრაშუნა ბეკონი, პრემიუმ ძეხვეული, იდეალურად შემწვარი კვერცხი, ოქროსფერი ჰეშბრაუნი და ნაზად შემწვარი სოკო.',
    },
    rating: 0,
    hit: false,
    tags: [tags[2].id],
  },
  {
    id: 'item-2',
    categoryIds: ['cat-1'],
    ingredientIds: ['ing-5', 'ing-6', 'ing-7', 'ing-8'],
    pictureURL: `${BASE_URL}/Nordic.jpg`,
    name: {
      en: 'Nordic',
      ru: 'Nordic',
      ka: 'Nordic',
    },
    sub: {
      en: 'salmon, salads, shrimp spread, scramble',
      ru: 'salmon, salads, shrimp spread, scramble',
      ka: 'salmon, salads, shrimp spread, scramble',
    },
    price: 24,
    currency: 'GEL',
    weight: null,
    description: {
      en: '',
      ru: '',
      ka: '',
    },
    rating: 0,
    hit: false,
    tags: []
  },
  {
    id: 'item-3',
    categoryIds: ['cat-1'],
    ingredientIds: ['ing-9', 'ing-10', 'ing-11'],
    pictureURL: `${BASE_URL}/Kartuli.jpg`,
    name: {
      en: 'Kartuli',
      ru: 'Kartuli',
      ka: 'Kartuli',
    },
    sub: {
      en: 'layered khachapuri, bazhe, imeruli omelette',
      ru: 'layered khachapuri, bazhe, imeruli omelette',
      ka: 'layered khachapuri, bazhe, imeruli omelette',
    },
    price: 24,
    currency: 'GEL',
    weight: null,
    description: {
      en: '',
      ru: '',
      ka: '',
    },
    rating: 0,
    hit: true,
    tags: []
  },
  {
    id: 'item-4',
    categoryIds: ['cat-2'],
    ingredientIds: ['ing-12', 'ing-13', 'ing-14'],
    pictureURL: `${BASE_URL}/Cheddar_mustard_beef.jpg`,
    name: {
      en: 'Cheddar mustard beef',
      ru: 'Cheddar mustard beef',
      ka: 'Cheddar mustard beef',
    },
    sub: {
      en: 'sunny-dried-up egg, minced beef, tomato sauce',
      ru: 'sunny-dried-up egg, minced beef, tomato sauce',
      ka: 'sunny-dried-up egg, minced beef, tomato sauce',
    },
    price: 20,
    currency: 'GEL',
    weight: null,
    description: {
      en: '',
      ru: '',
      ka: '',
    },
    rating: 0,
    hit: true,
    tags: []
  },
  {
    id: 'item-5',
    categoryIds: ['cat-2'],
    ingredientIds: ['ing-14', 'ing-12', 'ing-15'],
    pictureURL: `${BASE_URL}/Ramiro_imeruli_cheese.jpg`,
    name: {
      en: 'Ramiro imeruli cheese',
      ru: 'Ramiro imeruli cheese',
      ka: 'Ramiro imeruli cheese',
    },
    sub: {
      en: 'tomato sauce, sunny-dried-up egg, spinach',
      ru: 'tomato sauce, sunny-dried-up egg, spinach',
      ka: 'tomato sauce, sunny-dried-up egg, spinach',
    },
    price: 20,
    currency: 'GEL',
    weight: null,
    description: {
      en: '',
      ru: '',
      ka: '',
    },
    rating: 0,
    hit: false,
    tags: []
  },
  {
    id: 'item-6',
    categoryIds: ['cat-2'],
    ingredientIds: ['ing-16', 'ing-17', 'ing-18'],
    pictureURL: `${BASE_URL}/Salmon_whiiped_labne.jpg`,
    name: {
      en: 'Salmon whipped labne',
      ru: 'Salmon whipped labne',
      ka: 'Salmon whipped labne',
    },
    sub: {
      en: 'guacamole, whipped labne, poached eggs',
      ru: 'guacamole, whipped labne, poached eggs',
      ka: 'guacamole, whipped labne, poached eggs',
    },
    price: 20,
    currency: 'GEL',
    weight: null,
    description: {
      en: '',
      ru: '',
      ka: '',
    },
    rating: 0,
    hit: false,
    tags: []
  },
  {
    id: 'item-7',
    categoryIds: ['cat-2'],
    ingredientIds: ['ing-16', 'ing-19', 'ing-18'],
    pictureURL: `${BASE_URL}/Shrimp_mayo_shriracha.jpg`,
    name: {
      en: 'Shrimp mayo-shriracha',
      ru: 'Shrimp mayo-shriracha',
      ka: 'Shrimp mayo-shriracha',
    },
    sub: {
      en: 'guacamole, dried tomatoes, poached eggs',
      ru: 'guacamole, dried tomatoes, poached eggs',
      ka: 'guacamole, dried tomatoes, poached eggs',
    },
    price: 20,
    currency: 'GEL',
    weight: null,
    description: {
      en: '',
      ru: '',
      ka: '',
    },
    rating: 0,
    hit: false,
    tags: []
  },
  {
    id: 'item-8',
    categoryIds: ['cat-3'],
    ingredientIds: ['ing-3', 'ing-20', 'ing-21', 'ing-22'],
    pictureURL: `${BASE_URL}/BLT.jpg`,
    name: {
      en: 'BLT',
      ru: 'BLT',
      ka: 'BLT',
    },
    sub: {
      en: 'bacon, lettuce, tomato, special sauce',
      ru: 'bacon, lettuce, tomato, special sauce',
      ka: 'bacon, lettuce, tomato, special sauce',
    },
    price: 16,
    currency: 'GEL',
    weight: null,
    description: {
      en: '',
      ru: '',
      ka: '',
    },
    rating: 0,
    hit: false,
    tags: []
  },
  {
    id: 'item-9',
    categoryIds: ['cat-3'],
    ingredientIds: ['ing-23', 'ing-24', 'ing-25'],
    pictureURL: `${BASE_URL}/Chiken.jpg`,
    name: {
      en: 'Chicken',
      ru: 'Chicken',
      ka: 'Chicken',
    },
    sub: {
      en: 'pulled chicken, coleslaw, pickled flowers',
      ru: 'pulled chicken, coleslaw, pickled flowers',
      ka: 'pulled chicken, coleslaw, pickled flowers',
    },
    price: 16,
    currency: 'GEL',
    weight: null,
    description: {
      en: '',
      ru: '',
      ka: '',
    },
    rating: 0,
    hit: false,
    tags: []
  },
  {
    id: 'item-10',
    categoryIds: ['cat-3'],
    ingredientIds: ['ing-2', 'ing-26', 'ing-27', 'ing-28',],
    pictureURL: `${BASE_URL}/Truffle.jpg`,
    name: {
      en: 'Truffle',
      ru: 'Truffle',
      ka: 'Truffle',
    },
    sub: {
      en: 'mushrooms, grilled spinach, cheddar, truffle sauce',
      ru: 'mushrooms, grilled spinach, cheddar, truffle sauce',
      ka: 'mushrooms, grilled spinach, cheddar, truffle sauce',
    },
    price: 15,
    currency: 'GEL',
    weight: null,
    description: {
      en: '',
      ru: '',
      ka: '',
    },
    rating: 0,
    hit: false,
    tags: []
  },
  {
    id: 'item-11',
    categoryIds: ['cat-3'],
    ingredientIds: ['ing-29', 'ing-30', 'ing-31', 'ing-10', 'ing-32'],
    pictureURL: `${BASE_URL}/Veg_cheese.jpg`,
    name: {
      en: 'Veg cheese',
      ru: 'Veg cheese',
      ka: 'Veg cheese',
    },
    sub: {
      en: 'eggplant, salads mix, labne, bazhe, tomato slices',
      ru: 'eggplant, salads mix, labne, bazhe, tomato slices',
      ka: 'eggplant, salads mix, labne, bazhe, tomato slices',
    },
    price: 15,
    currency: 'GEL',
    weight: null,
    description: {
      en: '',
      ru: '',
      ka: '',
    },
    rating: 0,
    hit: false,
    tags: []
  },
  {
    id: 'item-12',
    categoryIds: ['cat-4'],
    ingredientIds: [],
    pictureURL: `${BASE_URL}/Rustic_cheese_cake.jpg`,
    name: {
      en: 'Rustic cheese cake',
      ru: 'Rustic cheese cake',
      ka: 'Rustic cheese cake',
    },
    sub: {
      en: 'goes with berry jam / sour cream / salty caramel',
      ru: 'goes with berry jam / sour cream / salty caramel',
      ka: 'goes with berry jam / sour cream / salty caramel',
    },
    price: 11,
    currency: 'GEL',
    weight: null,
    description: {
      en: '',
      ru: '',
      ka: '',
    },
    rating: 0,
    hit: true,
    tags: []
  },
  {
    id: 'item-13',
    categoryIds: ['cat-4'],
    pictureURL: `${BASE_URL}/Croissant.jpg`,
    name: {
      en: 'Croissant',
      ru: 'Croissant',
      ka: 'Croissant',
    },
    price: 6,
    currency: 'GEL',
    weight: null,
    description: {
      en: '',
      ru: '',
      ka: '',
    },
    rating: 0,
    hit: true,
    tags: []
  },
]
