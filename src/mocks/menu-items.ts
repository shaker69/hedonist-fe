import { tags } from "./tags";

const BASE_URL = `https://${process.env.S3_URL || 'hedonist-media.s3.eu-west-1.amazonaws.com'}/menu`;

export const menuItems: MenuItem[] = [
  {
    MenuItemId: 'item-1',
    CategoryIds: ['cat-1'],
    IngredientIds: ['ing-1', 'ing-2', 'ing-3', 'ing-4'],
    PictureURL: `${BASE_URL}/Full_english.jpg`,
    PictureObjectPosition: [100, 100],
    Name: {
      en: 'Full english',
      ru: 'Full english',
      ka: 'Full english',
    },
    Subtitle: {
      en: 'sausage, mushrooms, bacon, eggs',
      ru: 'sausage, mushrooms, bacon, eggs',
      ka: 'sausage, mushrooms, bacon, eggs',
    },
    Price: 24,
    Currency: 'GEL',
    Weight: 330,
    Description: {
      en: 'It is a traditional feast for the senses that has warmed hearts and homes for generations. A plate featuring crispy bacon, premium sausages, perfectly fried eggs, golden hashbrowns, and tenderly sautéed mushrooms.',
      ru: 'Это традиционный праздник чувств, который согревал сердца и дома на протяжении нескольких поколений. Тарелка с хрустящим беконом, колбасками премиум-класса, идеальной яичницей, золотистыми оладьями и нежно обжаренными грибами.',
      ka: 'ეს არის გრძნობების ტრადიციული დღესასწაული, რომელიც თაობების განმავლობაში ათბობს გულებსა და სახლებს. თეფშზე გამოსახულია ხრაშუნა ბეკონი, პრემიუმ ძეხვეული, იდეალურად შემწვარი კვერცხი, ოქროსფერი ჰეშბრაუნი და ნაზად შემწვარი სოკო.',
    },
    Rating: 0,
    isRecommended: false,
    TagIds: [tags[2].TagId],
  },
  {
    MenuItemId: 'item-2',
    CategoryIds: ['cat-1'],
    IngredientIds: ['ing-5', 'ing-6', 'ing-7', 'ing-8'],
    PictureURL: `${BASE_URL}/Nordic.jpg`,
    Name: {
      en: 'Nordic',
      ru: 'Nordic',
      ka: 'Nordic',
    },
    Subtitle: {
      en: 'salmon, salads, shrimp spread, scramble',
      ru: 'salmon, salads, shrimp spread, scramble',
      ka: 'salmon, salads, shrimp spread, scramble',
    },
    Price: 24,
    Currency: 'GEL',
    Weight: undefined,
    Description: {
      en: '',
      ru: '',
      ka: '',
    },
    Rating: 0,
    isRecommended: false,
    TagIds: []
  },
  {
    MenuItemId: 'item-3',
    CategoryIds: ['cat-1'],
    IngredientIds: ['ing-9', 'ing-10', 'ing-11'],
    PictureURL: `${BASE_URL}/Kartuli.jpg`,
    Name: {
      en: 'Kartuli',
      ru: 'Kartuli',
      ka: 'Kartuli',
    },
    Subtitle: {
      en: 'layered khachapuri, bazhe, imeruli omelette',
      ru: 'layered khachapuri, bazhe, imeruli omelette',
      ka: 'layered khachapuri, bazhe, imeruli omelette',
    },
    Price: 24,
    Currency: 'GEL',
    Weight: undefined,
    Description: {
      en: '',
      ru: '',
      ka: '',
    },
    Rating: 0,
    isRecommended: true,
    TagIds: []
  },
  {
    MenuItemId: 'item-4',
    CategoryIds: ['cat-2'],
    IngredientIds: ['ing-12', 'ing-13', 'ing-14'],
    PictureURL: `${BASE_URL}/Cheddar_mustard_beef.jpg`,
    Name: {
      en: 'Cheddar mustard beef',
      ru: 'Cheddar mustard beef',
      ka: 'Cheddar mustard beef',
    },
    Subtitle: {
      en: 'sunny-dried-up egg, minced beef, tomato sauce',
      ru: 'sunny-dried-up egg, minced beef, tomato sauce',
      ka: 'sunny-dried-up egg, minced beef, tomato sauce',
    },
    Price: 20,
    Currency: 'GEL',
    Weight: undefined,
    Description: {
      en: '',
      ru: '',
      ka: '',
    },
    Rating: 0,
    isRecommended: true,
    TagIds: []
  },
  {
    MenuItemId: 'item-5',
    CategoryIds: ['cat-2'],
    IngredientIds: ['ing-14', 'ing-12', 'ing-15'],
    PictureURL: `${BASE_URL}/Ramiro_imeruli_cheese.jpg`,
    Name: {
      en: 'Ramiro imeruli cheese',
      ru: 'Ramiro imeruli cheese',
      ka: 'Ramiro imeruli cheese',
    },
    Subtitle: {
      en: 'tomato sauce, sunny-dried-up egg, spinach',
      ru: 'tomato sauce, sunny-dried-up egg, spinach',
      ka: 'tomato sauce, sunny-dried-up egg, spinach',
    },
    Price: 20,
    Currency: 'GEL',
    Weight: undefined,
    Description: {
      en: '',
      ru: '',
      ka: '',
    },
    Rating: 0,
    isRecommended: false,
    TagIds: []
  },
  {
    MenuItemId: 'item-6',
    CategoryIds: ['cat-2'],
    IngredientIds: ['ing-16', 'ing-17', 'ing-18'],
    PictureURL: `${BASE_URL}/Salmon_whiiped_labne.jpg`,
    Name: {
      en: 'Salmon whipped labne',
      ru: 'Salmon whipped labne',
      ka: 'Salmon whipped labne',
    },
    Subtitle: {
      en: 'guacamole, whipped labne, poached eggs',
      ru: 'guacamole, whipped labne, poached eggs',
      ka: 'guacamole, whipped labne, poached eggs',
    },
    Price: 20,
    Currency: 'GEL',
    Weight: undefined,
    Description: {
      en: '',
      ru: '',
      ka: '',
    },
    Rating: 0,
    isRecommended: false,
    TagIds: []
  },
  {
    MenuItemId: 'item-7',
    CategoryIds: ['cat-2'],
    IngredientIds: ['ing-16', 'ing-19', 'ing-18'],
    PictureURL: `${BASE_URL}/Shrimp_mayo_shriracha.jpg`,
    Name: {
      en: 'Shrimp mayo-shriracha',
      ru: 'Shrimp mayo-shriracha',
      ka: 'Shrimp mayo-shriracha',
    },
    Subtitle: {
      en: 'guacamole, dried tomatoes, poached eggs',
      ru: 'guacamole, dried tomatoes, poached eggs',
      ka: 'guacamole, dried tomatoes, poached eggs',
    },
    Price: 20,
    Currency: 'GEL',
    Weight: undefined,
    Description: {
      en: '',
      ru: '',
      ka: '',
    },
    Rating: 0,
    isRecommended: false,
    TagIds: []
  },
  {
    MenuItemId: 'item-8',
    CategoryIds: ['cat-3'],
    IngredientIds: ['ing-3', 'ing-20', 'ing-21', 'ing-22'],
    PictureURL: `${BASE_URL}/BLT.jpg`,
    Name: {
      en: 'BLT',
      ru: 'BLT',
      ka: 'BLT',
    },
    Subtitle: {
      en: 'bacon, lettuce, tomato, special sauce',
      ru: 'bacon, lettuce, tomato, special sauce',
      ka: 'bacon, lettuce, tomato, special sauce',
    },
    Price: 16,
    Currency: 'GEL',
    Weight: undefined,
    Description: {
      en: '',
      ru: '',
      ka: '',
    },
    Rating: 0,
    isRecommended: false,
    TagIds: []
  },
  {
    MenuItemId: 'item-9',
    CategoryIds: ['cat-3'],
    IngredientIds: ['ing-23', 'ing-24', 'ing-25'],
    PictureURL: `${BASE_URL}/Chiken.jpg`,
    Name: {
      en: 'Chicken',
      ru: 'Chicken',
      ka: 'Chicken',
    },
    Subtitle: {
      en: 'pulled chicken, coleslaw, pickled flowers',
      ru: 'pulled chicken, coleslaw, pickled flowers',
      ka: 'pulled chicken, coleslaw, pickled flowers',
    },
    Price: 16,
    Currency: 'GEL',
    Weight: undefined,
    Description: {
      en: '',
      ru: '',
      ka: '',
    },
    Rating: 0,
    isRecommended: false,
    TagIds: []
  },
  {
    MenuItemId: 'item-10',
    CategoryIds: ['cat-3'],
    IngredientIds: ['ing-2', 'ing-26', 'ing-27', 'ing-28',],
    PictureURL: `${BASE_URL}/Truffle.jpg`,
    Name: {
      en: 'Truffle',
      ru: 'Truffle',
      ka: 'Truffle',
    },
    Subtitle: {
      en: 'mushrooms, grilled spinach, cheddar, truffle sauce',
      ru: 'mushrooms, grilled spinach, cheddar, truffle sauce',
      ka: 'mushrooms, grilled spinach, cheddar, truffle sauce',
    },
    Price: 15,
    Currency: 'GEL',
    Weight: undefined,
    Description: {
      en: '',
      ru: '',
      ka: '',
    },
    Rating: 0,
    isRecommended: false,
    TagIds: []
  },
  {
    MenuItemId: 'item-11',
    CategoryIds: ['cat-3'],
    IngredientIds: ['ing-29', 'ing-30', 'ing-31', 'ing-10', 'ing-32'],
    PictureURL: `${BASE_URL}/Veg_cheese.jpg`,
    Name: {
      en: 'Veg cheese',
      ru: 'Veg cheese',
      ka: 'Veg cheese',
    },
    Subtitle: {
      en: 'eggplant, salads mix, labne, bazhe, tomato slices',
      ru: 'eggplant, salads mix, labne, bazhe, tomato slices',
      ka: 'eggplant, salads mix, labne, bazhe, tomato slices',
    },
    Price: 15,
    Currency: 'GEL',
    Weight: undefined,
    Description: {
      en: '',
      ru: '',
      ka: '',
    },
    Rating: 0,
    isRecommended: false,
    TagIds: []
  },
  {
    MenuItemId: 'item-12',
    CategoryIds: ['cat-4'],
    IngredientIds: [],
    PictureURL: `${BASE_URL}/Rustic_cheese_cake.jpg`,
    Name: {
      en: 'Rustic cheese cake',
      ru: 'Rustic cheese cake',
      ka: 'Rustic cheese cake',
    },
    Subtitle: {
      en: 'goes with berry jam / sour cream / salty caramel',
      ru: 'goes with berry jam / sour cream / salty caramel',
      ka: 'goes with berry jam / sour cream / salty caramel',
    },
    Price: 11,
    Currency: 'GEL',
    Weight: undefined,
    Description: {
      en: '',
      ru: '',
      ka: '',
    },
    Rating: 0,
    isRecommended: true,
    TagIds: []
  },
  {
    MenuItemId: 'item-13',
    CategoryIds: ['cat-4'],
    PictureURL: `${BASE_URL}/Croissant.jpg`,
    Name: {
      en: 'Croissant',
      ru: 'Croissant',
      ka: 'Croissant',
    },
    Price: 6,
    Currency: 'GEL',
    Weight: undefined,
    Description: {
      en: '',
      ru: '',
      ka: '',
    },
    Rating: 0,
    isRecommended: true,
    TagIds: []
  },
]
