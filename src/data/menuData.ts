import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // COFFEE & BEVERAGES (8 items)
  {
    id: 'c1',
    name: 'Gazebo Signature Special Brew',
    category: 'Coffee & Beverages',
    description: 'Double shot espresso infused with raw honey, cardamom, and velvety steamed oat milk topped with cinnamon dust.',
    price: 5.50,
    badge: "Chef's Special",
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80',
    calories: '180 kcal',
    isPopular: true
  },
  {
    id: 'c2',
    name: 'Caramel Macchiato',
    category: 'Coffee & Beverages',
    description: 'Freshly pulled espresso layered over sweet vanilla syrup and warm milk, drizzled with buttery artisan caramel sauce.',
    price: 4.75,
    badge: 'Most Popular',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=80',
    calories: '220 kcal',
    isPopular: true
  },
  {
    id: 'c3',
    name: 'Classic Flat White',
    category: 'Coffee & Beverages',
    description: 'Rich ristretto espresso blend combined with microfoam milk for a silky smooth espresso texture.',
    price: 4.25,
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80',
    calories: '120 kcal'
  },
  {
    id: 'c4',
    name: 'Matcha Green Tea Latte',
    category: 'Coffee & Beverages',
    description: 'Premium ceremonial grade Uji matcha whisked with warm milk and a touch of organic agave nectar.',
    price: 5.25,
    badge: 'Vegan Option',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
    calories: '150 kcal'
  },
  {
    id: 'c5',
    name: 'Cold Brew Nitro Reserve',
    category: 'Coffee & Beverages',
    description: 'Steeped for 24 hours in cold filtered water and infused with nitrogen for a naturally sweet, Guinness-like cascade.',
    price: 5.00,
    badge: 'Most Popular',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    calories: '5 kcal'
  },
  {
    id: 'c6',
    name: 'Mocha Dark Chocolate',
    category: 'Coffee & Beverages',
    description: 'Single origin espresso folded into melted 70% Belgian dark chocolate, steamed whole milk, and whipped cream.',
    price: 4.95,
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=600&q=80',
    calories: '290 kcal'
  },
  {
    id: 'c7',
    name: 'Golden Turmeric Latte',
    category: 'Coffee & Beverages',
    description: 'Warming blend of organic turmeric, ginger, black pepper, and almond milk with a hint of coconut sugar.',
    price: 4.80,
    badge: 'Vegan Option',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
    calories: '110 kcal'
  },
  {
    id: 'c8',
    name: 'Iced Rose Hibiscus Refresher',
    category: 'Coffee & Beverages',
    description: 'Chilled herbal hibiscus tea muddled with fresh mint, rose water, and wild raspberry syrup.',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80',
    calories: '90 kcal'
  },

  // BREAKFAST (7 items)
  {
    id: 'b1',
    name: 'Gazebo Royal Avocado Toast',
    category: 'Breakfast',
    description: 'Toasted sourdough, smashed avocado, heirloom cherry tomatoes, poached free-range eggs, feta crumble, and chili oil.',
    price: 8.50,
    badge: "Chef's Special",
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
    calories: '420 kcal',
    isPopular: true
  },
  {
    id: 'b2',
    name: 'Eggs Benedict Royale',
    category: 'Breakfast',
    description: 'Soft poached eggs over lightly smoked salmon or crispy maple bacon on toasted brioche with rich lemon hollandaise.',
    price: 9.75,
    badge: 'Most Popular',
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=600&q=80',
    calories: '510 kcal',
    isPopular: true
  },
  {
    id: 'b3',
    name: 'Fluffy Brioche French Toast',
    category: 'Breakfast',
    description: 'Thick cut brioche bread soaked in vanilla custard, served with berry compote, whipped maple butter, and candied pecans.',
    price: 8.25,
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=600&q=80',
    calories: '560 kcal'
  },
  {
    id: 'b4',
    name: 'Classic Breakfast Platter',
    category: 'Breakfast',
    description: 'Two eggs cooked your way, crispy hash browns, artisan sausage, sauteed garlic mushrooms, and buttered grain toast.',
    price: 10.50,
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80',
    calories: '680 kcal'
  },
  {
    id: 'b5',
    name: 'Organic Berry Acai Bowl',
    category: 'Breakfast',
    description: 'Blended organic acai berries topped with house-made honey granola, chia seeds, fresh dragonfruit, and almond butter drizzle.',
    price: 7.95,
    badge: 'Vegan Option',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80',
    calories: '340 kcal'
  },
  {
    id: 'b6',
    name: 'Truffle & Mushroom Croissant Egg',
    category: 'Breakfast',
    description: 'Warm flaky French croissant stuffed with creamy truffle scrambled eggs, sharp cheddar, and fresh baby spinach.',
    price: 8.75,
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80',
    calories: '490 kcal'
  },

  // SNACKS & PASTRIES (7 items)
  {
    id: 's1',
    name: 'Butter Croissant Flake',
    category: 'Snacks & Pastries',
    description: 'Traditional French butter croissant baked fresh every morning with golden crispy layers and a soft airy interior.',
    price: 3.50,
    badge: 'Most Popular',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    calories: '280 kcal'
  },
  {
    id: 's2',
    name: 'Artisan Grilled Cheese & Tomato Pesto',
    category: 'Snacks & Pastries',
    description: 'Aged gruyere, sharp cheddar, and fresh basil pesto melted inside crispy parmesan-crusted sourdough.',
    price: 6.95,
    badge: "Chef's Special",
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    calories: '520 kcal',
    isPopular: true
  },
  {
    id: 's3',
    name: 'Almond Pistachio Danish',
    category: 'Snacks & Pastries',
    description: 'Delicate puff pastry folded over rich almond frangipane cream and topped with crushed green pistachios.',
    price: 4.25,
    image: 'https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&w=600&q=80',
    calories: '320 kcal'
  },
  {
    id: 's4',
    name: 'Smoked Turkey & Cranberry Panini',
    category: 'Snacks & Pastries',
    description: 'Slow-roasted smoked turkey, creamy brie, arugula, and tangy house cranberry chutney on pressed ciabatta.',
    price: 7.75,
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80',
    calories: '480 kcal'
  },
  {
    id: 's5',
    name: 'Wild Blueberry Scone',
    category: 'Snacks & Pastries',
    description: 'Warm crumbly blueberry scone served with clotted double cream and sweet strawberry preserves.',
    price: 3.95,
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=600&q=80',
    calories: '310 kcal'
  },
  {
    id: 's6',
    name: 'Spinach & Feta Empanadas',
    category: 'Snacks & Pastries',
    description: 'Golden baked flaky pastry parcels filled with fresh spinach, roasted pine nuts, dill, and tangy Greek feta cheese.',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    calories: '290 kcal'
  },

  // DESSERTS (6 items)
  {
    id: 'd1',
    name: 'Classic Espresso Tiramisu',
    category: 'Desserts',
    description: 'House-made savoiardi ladyfingers soaked in Gazebo espresso, layered with whipped mascarpone and dark cocoa powder.',
    price: 6.50,
    badge: "Chef's Special",
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
    calories: '410 kcal',
    isPopular: true
  },
  {
    id: 'd2',
    name: 'Molten Belgian Chocolate Lava Cake',
    category: 'Desserts',
    description: 'Warm chocolate cake with a molten oozing dark fudge center, served with Madagascan vanilla bean gelati.',
    price: 7.25,
    badge: 'Most Popular',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    calories: '530 kcal'
  },
  {
    id: 'd3',
    name: 'New York Style Berry Cheesecake',
    category: 'Desserts',
    description: 'Creamy graham cracker crust cheesecake smothered in house-made wild raspberry and blackberry reduction.',
    price: 6.25,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80',
    calories: '460 kcal'
  },
  {
    id: 'd4',
    name: 'Salted Caramel Pecan Tart',
    category: 'Desserts',
    description: 'Crisp shortcrust shell filled with gooey caramel, toasted Georgia pecans, and sea salt flakes.',
    price: 5.95,
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80',
    calories: '440 kcal'
  },
  {
    id: 'd5',
    name: 'Macaron Assortment (4 Pieces)',
    category: 'Desserts',
    description: 'French almond macarons in Pistachio, Salted Caramel, Dark Chocolate, and Raspberry rose flavors.',
    price: 6.80,
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80',
    calories: '320 kcal'
  },

  // SPECIALS (6 items)
  {
    id: 'sp1',
    name: 'Gazebo Garden High Tea Set',
    category: 'Specials',
    description: 'Curated tasting board featuring mini cucumber sandwiches, lemon tartlets, macarons, and a pot of specialty loose-leaf tea.',
    price: 18.00,
    badge: "Chef's Special",
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
    calories: '650 kcal',
    isPopular: true
  },
  {
    id: 'sp2',
    name: 'Affogato al Caffe with Amaretto Crumble',
    category: 'Specials',
    description: 'Scoop of artisan vanilla bean gelato drowned in a shot of piping hot Gazebo ristretto with crunchy almond biscotti.',
    price: 5.80,
    badge: 'Most Popular',
    image: 'https://images.unsplash.com/photo-1592321675774-3de57f3ee0dc?auto=format&fit=crop&w=600&q=80',
    calories: '260 kcal'
  },
  {
    id: 'sp3',
    name: 'Honey Lavender Cold Foam Latte',
    category: 'Specials',
    description: 'Seasonal espresso sweetened with infused lavender flowers and local wild clover honey, crowned with thick cold cream foam.',
    price: 5.75,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    calories: '190 kcal'
  },
  {
    id: 'sp4',
    name: 'Saffron & Cardamom Milk Cake',
    category: 'Specials',
    description: 'Moist sponge cake soaked in saffron cardamom infused sweet milk, topped with crushed pistachio dust.',
    price: 7.50,
    badge: "Chef's Special",
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80',
    calories: '420 kcal'
  }
];
