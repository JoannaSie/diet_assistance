// ─────────────────────────────────────────────────────────────────────────────
// DATA MODEL — Option A: single file, multi-country localAvailability
// ─────────────────────────────────────────────────────────────────────────────
//
// Each product has:
//   name             — product name (string)
//   category         — category (string)
//   cycle_phase      — menstrual cycle phases (array)
//   anti_inflammatory — true / false
//   localAvailability — object keyed by country name:
//       regions: null   → available nationwide in that country (or imported)
//       regions: array  → available only in listed regions
//       months: [start, end] → season (if start > end, crosses January)
//
// To add a new country: add a new key inside localAvailability.
// Products available in only one country have a single key.
// Imported goods (no regional filtering) use regions: null.
// ─────────────────────────────────────────────────────────────────────────────

// ── HELPER: season check ──────────────────────────────────────────────────────
function isInSeason(months, currentMonth) {
  const [start, end] = months;
  if (start <= end) return currentMonth >= start && currentMonth <= end;
  return currentMonth >= start || currentMonth <= end;
}

// ── HELPER: availability check for a given country + region + month ───────────
function isAvailable(product, country, region, currentMonth) {
  const avail = product.localAvailability[country];
  if (!avail) return false;
  if (!isInSeason(avail.months, currentMonth)) return false;
  if (avail.regions === null) return true;
  return avail.regions.includes(region);
}

// ── REGION LISTS ──────────────────────────────────────────────────────────────
const ALL_POLAND = [
  'dolnośląskie', 'kujawsko-pomorskie', 'lubelskie', 'lubuskie',
  'łódzkie', 'małopolskie', 'mazowieckie', 'opolskie', 'podkarpackie',
  'podlaskie', 'pomorskie', 'śląskie', 'świętokrzyskie',
  'warmińsko-mazurskie', 'wielkopolskie', 'zachodniopomorskie',
];

const ALL_BULGARIA = [
  'Blagoevgrad', 'Burgas', 'Dobrich', 'Gabrovo', 'Haskovo',
  'Kardzhali', 'Kyustendil', 'Lovech', 'Montana', 'Pazardzhik',
  'Pernik', 'Pleven', 'Plovdiv', 'Razgrad', 'Ruse', 'Shumen',
  'Silistra', 'Sliven', 'Smolyan', 'Sofia', 'Sofia Oblast',
  'Stara Zagora', 'Targovishte', 'Varna', 'Veliko Tarnovo',
  'Vidin', 'Vratsa', 'Yambol',
];

// ── PRODUCTS ──────────────────────────────────────────────────────────────────
const products = [

  // ── GRAINS ─────────────────────────────────────────────────────────────────
  {
    name: 'Oats', category: 'Grains',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Rye', category: 'Grains',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Poland: { regions: ['warmińsko-mazurskie','podlaskie','mazowieckie','lubuskie','kujawsko-pomorskie'], months: [1, 12] },
    },
  },
  {
    name: 'Wheat', category: 'Grains',
    cycle_phase: ['folikularna'], anti_inflammatory: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Spelt', category: 'Grains',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Poland: { regions: ['dolnośląskie','opolskie','śląskie','małopolskie','podkarpackie'], months: [1, 12] },
    },
  },
  {
    name: 'Barley', category: 'Grains',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Corn', category: 'Grains',
    cycle_phase: ['owulacyjna'], anti_inflammatory: false,
    localAvailability: {
      Poland:   { regions: ['łódzkie','mazowieckie','lubelskie','kujawsko-pomorskie','wielkopolskie'], months: [7, 10] },
      Bulgaria: { regions: ALL_BULGARIA, months: [7, 10] },
    },
  },
  {
    name: 'Amaranth', category: 'Grains',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      Peru: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Quinoa', category: 'Grains',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      Peru: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Brown rice', category: 'Grains',
    cycle_phase: ['lutealna'], anti_inflammatory: false,
    localAvailability: {
      Thailand: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Millet', category: 'Grains',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      India: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Buckwheat', category: 'Grains',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true,
    localAvailability: {
      Poland: { regions: ['podlaskie','warmińsko-mazurskie','mazowieckie','lubelskie','podkarpackie'], months: [1, 12] },
    },
  },
  {
    name: 'Wild rice', category: 'Grains',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true,
    localAvailability: {
      USA: { regions: null, months: [1, 12] },
    },
  },

  // ── VEGETABLES ─────────────────────────────────────────────────────────────
  {
    name: 'Broccoli', category: 'Vegetables',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [6, 10] },
      Bulgaria: { regions: ALL_BULGARIA, months: [5, 10] },
    },
  },
  {
    name: 'Carrots', category: 'Vegetables',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [7, 11] },
      Bulgaria: { regions: ALL_BULGARIA, months: [6, 11] },
    },
  },
  {
    name: 'Lettuce', category: 'Vegetables',
    cycle_phase: ['folikularna'], anti_inflammatory: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [4, 10] },
      Bulgaria: { regions: ALL_BULGARIA, months: [3, 11] },
    },
  },
  {
    name: 'Parsley', category: 'Vegetables',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [6, 11] },
      Bulgaria: { regions: ALL_BULGARIA, months: [5, 11] },
    },
  },
  {
    name: 'Green peas', category: 'Vegetables',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [5, 7] },
      Bulgaria: { regions: ALL_BULGARIA, months: [4, 6] },
    },
  },
  {
    name: 'Rhubarb', category: 'Vegetables',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Poland: { regions: ALL_POLAND, months: [4, 6] },
    },
  },
  {
    name: 'Green beans', category: 'Vegetables',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [6, 9] },
      Bulgaria: { regions: ALL_BULGARIA, months: [5, 9] },
    },
  },
  {
    name: 'Zucchini', category: 'Vegetables',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [6, 9] },
      Bulgaria: { regions: ALL_BULGARIA, months: [5, 10] },
    },
  },
  {
    name: 'Artichokes', category: 'Vegetables',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Italy:    { regions: null, months: [1, 12] },
      Bulgaria: { regions: ['Plovdiv','Pazardzhik','Haskovo','Stara Zagora'], months: [4, 6] },
    },
  },
  {
    name: 'Asparagus', category: 'Vegetables',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ['dolnośląskie','kujawsko-pomorskie','wielkopolskie','łódzkie','lubuskie'], months: [4, 6] },
      Bulgaria: { regions: ['Plovdiv','Pazardzhik','Sofia Oblast','Kyustendil'], months: [3, 5] },
    },
  },
  {
    name: 'Red bell pepper', category: 'Vegetables',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ['lubelskie','mazowieckie','łódzkie','małopolskie','podkarpackie'], months: [7, 10] },
      Bulgaria: { regions: ALL_BULGARIA, months: [6, 10] },
    },
  },
  {
    name: 'Brussels sprouts', category: 'Vegetables',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [9, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [9, 12] },
    },
  },
  {
    name: 'Chard (botwinka)', category: 'Vegetables',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [5, 8] },
      Bulgaria: { regions: ALL_BULGARIA, months: [4, 8] },
    },
  },
  {
    name: 'Spinach', category: 'Vegetables',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ['mazowieckie','wielkopolskie','dolnośląskie','kujawsko-pomorskie','łódzkie'], months: [4, 6] },
      Bulgaria: { regions: ALL_BULGARIA, months: [3, 5] },
    },
  },
  {
    name: 'Tomato', category: 'Vegetables',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ['łódzkie','mazowieckie','lubelskie','małopolskie','podkarpackie','świętokrzyskie'], months: [7, 9] },
      Bulgaria: { regions: ALL_BULGARIA, months: [6, 10] },
    },
  },
  {
    name: 'Eggplant', category: 'Vegetables',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      Spain:    { regions: null,         months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [6, 10] },
    },
  },
  {
    name: 'Shallot', category: 'Vegetables',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [6, 10] },
      Bulgaria: { regions: ALL_BULGARIA, months: [5, 10] },
    },
  },
  {
    name: 'Chives', category: 'Vegetables',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [4, 10] },
      Bulgaria: { regions: ALL_BULGARIA, months: [3, 10] },
    },
  },
  {
    name: 'Dandelion', category: 'Vegetables',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [3, 6] },
      Bulgaria: { regions: ALL_BULGARIA, months: [2, 5] },
    },
  },
  {
    name: 'Pumpkin', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [9, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [8, 12] },
    },
  },
  {
    name: 'Cauliflower', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [6, 10] },
      Bulgaria: { regions: ALL_BULGARIA, months: [5, 6] },
    },
  },
  {
    name: 'Cabbage', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [8, 3] },
      Bulgaria: { regions: ALL_BULGARIA, months: [7, 3] },
    },
  },
  {
    name: 'Celeriac', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [9, 2] },
      Bulgaria: { regions: ALL_BULGARIA, months: [9, 2] },
    },
  },
  {
    name: 'Kale', category: 'Vegetables',
    cycle_phase: ['lutealna', 'menstruacyjna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [9, 2] },
      Bulgaria: { regions: ALL_BULGARIA, months: [9, 2] },
    },
  },
  {
    name: 'Cucumber', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [6, 9] },
      Bulgaria: { regions: ALL_BULGARIA, months: [5, 9] },
    },
  },
  {
    name: 'Garlic', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ['lubelskie','mazowieckie','łódzkie','kujawsko-pomorskie','wielkopolskie'], months: [7, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [6, 12] },
    },
  },
  {
    name: 'Leek', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [9, 3] },
      Bulgaria: { regions: ALL_BULGARIA, months: [9, 3] },
    },
  },
  {
    name: 'Onion', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [7, 4] },
      Bulgaria: { regions: ALL_BULGARIA, months: [6, 4] },
    },
  },
  {
    name: 'Parsnip', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [9, 3] },
      Bulgaria: { regions: ALL_BULGARIA, months: [9, 3] },
    },
  },
  {
    name: 'Radish', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [4, 10] },
      Bulgaria: { regions: ALL_BULGARIA, months: [3, 11] },
    },
  },
  {
    name: 'Marrow', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [6, 9] },
      Bulgaria: { regions: ALL_BULGARIA, months: [5, 9] },
    },
  },
  {
    name: 'Potato', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [7, 3] },
      Bulgaria: { regions: ALL_BULGARIA, months: [6, 3] },
    },
  },
  {
    name: 'Ginger', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      India: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Sweet potato', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      Peru: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Beetroot', category: 'Vegetables',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [8, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [7, 12] },
    },
  },
  {
    name: 'Button mushroom', category: 'Vegetables',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Shiitake mushroom', category: 'Vegetables',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true,
    localAvailability: {
      China: { regions: null, months: [1, 12] },
    },
  },

  // ── FRUITS ─────────────────────────────────────────────────────────────────
  {
    name: 'Sour cherry', category: 'Fruits',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ['lubelskie','mazowieckie','łódzkie','świętokrzyskie','małopolskie'], months: [6, 7] },
      Bulgaria: { regions: ALL_BULGARIA, months: [5, 7] },
    },
  },
  {
    name: 'Plum', category: 'Fruits',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ['małopolskie','podkarpackie','świętokrzyskie','lubelskie','dolnośląskie'], months: [7, 10] },
      Bulgaria: { regions: ALL_BULGARIA, months: [7, 10] },
    },
  },
  {
    name: 'Lemon', category: 'Fruits',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Spain: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Orange', category: 'Fruits',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Spain: { regions: null, months: [11, 4] },
    },
  },
  {
    name: 'Grapefruit', category: 'Fruits',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Israel: { regions: null, months: [11, 4] },
    },
  },
  {
    name: 'Avocado', category: 'Fruits',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Mexico: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Pomegranate', category: 'Fruits',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Turkey:   { regions: null, months: [9, 2] },
      Bulgaria: { regions: ['Plovdiv','Haskovo','Kardzhali','Stara Zagora','Pazardzhik'], months: [9, 11] },
    },
  },
  {
    name: 'Raspberry', category: 'Fruits',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [6, 9] },
      Bulgaria: { regions: ALL_BULGARIA, months: [6, 9] },
    },
  },
  {
    name: 'Strawberry', category: 'Fruits',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ['mazowieckie','lubelskie','łódzkie','kujawsko-pomorskie','wielkopolskie'], months: [5, 7] },
      Bulgaria: { regions: ALL_BULGARIA, months: [4, 6] },
    },
  },
  {
    name: 'Apricot', category: 'Fruits',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ['dolnośląskie','małopolskie','podkarpackie','śląskie','opolskie'], months: [6, 8] },
      Bulgaria: { regions: ALL_BULGARIA, months: [5, 7] },
    },
  },
  {
    name: 'Fig', category: 'Fruits',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      Turkey:   { regions: null, months: [7, 10] },
      Bulgaria: { regions: ['Plovdiv','Haskovo','Kardzhali','Stara Zagora','Blagoevgrad','Smolyan'], months: [7, 10] },
    },
  },
  {
    name: 'Coconut', category: 'Fruits',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      Thailand: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Apple', category: 'Fruits',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [8, 3] },
      Bulgaria: { regions: ALL_BULGARIA, months: [8, 3] },
    },
  },
  {
    name: 'Pear', category: 'Fruits',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ['mazowieckie','łódzkie','lubelskie','świętokrzyskie','podkarpackie'], months: [8, 11] },
      Bulgaria: { regions: ALL_BULGARIA, months: [7, 11] },
    },
  },
  {
    name: 'Peach', category: 'Fruits',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ['dolnośląskie','opolskie','śląskie','małopolskie','podkarpackie'], months: [7, 9] },
      Bulgaria: { regions: ALL_BULGARIA, months: [6, 9] },
    },
  },
  {
    name: 'Dates', category: 'Fruits',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      Tunisia: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Raisins', category: 'Fruits',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      Turkey: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Blackberry', category: 'Fruits',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ['dolnośląskie','lubuskie','zachodniopomorskie','małopolskie','podkarpackie'], months: [7, 9] },
      Bulgaria: { regions: ALL_BULGARIA, months: [7, 9] },
    },
  },
  {
    name: 'Blueberry', category: 'Fruits',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ['warmińsko-mazurskie','podlaskie','pomorskie','zachodniopomorskie'], months: [6, 9] },
      Bulgaria: { regions: ['Smolyan','Kardzhali','Blagoevgrad','Kyustendil','Plovdiv'], months: [6, 9] },
    },
  },
  {
    name: 'Grapes', category: 'Fruits',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ['dolnośląskie','lubuskie','opolskie','śląskie','małopolskie'], months: [8, 10] },
      Bulgaria: { regions: ALL_BULGARIA, months: [8, 10] },
    },
  },
  {
    name: 'Melon', category: 'Fruits',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true,
    localAvailability: {
      Spain:    { regions: null,         months: [5, 10] },
      Bulgaria: { regions: ALL_BULGARIA, months: [6, 9] },
    },
  },
  {
    name: 'Watermelon', category: 'Fruits',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true,
    localAvailability: {
      Bulgaria: { regions: ALL_BULGARIA, months: [6, 9] },
    },
  },
  {
    name: 'Rose hip', category: 'Fruits',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true,
    localAvailability: {
      Bulgaria: { regions: ALL_BULGARIA, months: [8, 11] },
    },
  },

  // ── LEGUMES ────────────────────────────────────────────────────────────────
  {
    name: 'Peas', category: 'Legumes',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Green lentils', category: 'Legumes',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Canada: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Mung beans', category: 'Legumes',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      India: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Red lentils', category: 'Legumes',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      Canada: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Runner beans', category: 'Legumes',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ['podkarpackie','małopolskie','lubelskie','świętokrzyskie','śląskie'], months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Chickpeas', category: 'Legumes',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      India:    { regions: null,         months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Black beans', category: 'Legumes',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true,
    localAvailability: {
      Mexico: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Kidney beans', category: 'Legumes',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true,
    localAvailability: {
      Argentina: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Azuki beans', category: 'Legumes',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true,
    localAvailability: {
      Japan: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Black soybeans', category: 'Legumes',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true,
    localAvailability: {
      China: { regions: null, months: [1, 12] },
    },
  },

  // ── NUTS & SEEDS ───────────────────────────────────────────────────────────
  {
    name: 'Flaxseed', category: 'Nuts & Seeds',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Poland: { regions: ['lubelskie','mazowieckie','kujawsko-pomorskie','łódzkie','wielkopolskie'], months: [1, 12] },
    },
  },
  {
    name: 'Pumpkin seeds', category: 'Nuts & Seeds',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [9, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [9, 12] },
    },
  },
  {
    name: 'Brazil nut', category: 'Nuts & Seeds',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Brazil: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Cashew', category: 'Nuts & Seeds',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Vietnam: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Almonds', category: 'Nuts & Seeds',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      USA: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Pistachios', category: 'Nuts & Seeds',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      Iran: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Pecans', category: 'Nuts & Seeds',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      USA: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Walnuts', category: 'Nuts & Seeds',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ['dolnośląskie','lubuskie','opolskie','śląskie','małopolskie'], months: [9, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [9, 12] },
    },
  },
  {
    name: 'Sesame', category: 'Nuts & Seeds',
    cycle_phase: ['lutealna', 'menstruacyjna'], anti_inflammatory: true,
    localAvailability: {
      Ethiopia: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Sunflower seeds', category: 'Nuts & Seeds',
    cycle_phase: ['lutealna', 'menstruacyjna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ['lubelskie','mazowieckie','łódzkie','kujawsko-pomorskie','wielkopolskie'], months: [8, 11] },
      Bulgaria: { regions: ALL_BULGARIA, months: [8, 10] },
    },
  },
  {
    name: 'Pine nuts', category: 'Nuts & Seeds',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      Italy: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Chestnuts', category: 'Nuts & Seeds',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ['dolnośląskie','śląskie','małopolskie','opolskie','lubuskie'], months: [9, 11] },
      Bulgaria: { regions: ['Plovdiv','Smolyan','Kardzhali','Blagoevgrad','Kyustendil'], months: [9, 11] },
    },
  },

  // ── MEAT ───────────────────────────────────────────────────────────────────
  {
    name: 'Chicken', category: 'Meat',
    cycle_phase: ['folikularna'], anti_inflammatory: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Lamb', category: 'Meat',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ['podkarpackie','małopolskie','śląskie','lubelskie','warmińsko-mazurskie'], months: [3, 9] },
      Bulgaria: { regions: ALL_BULGARIA, months: [3, 9] },
    },
  },
  {
    name: 'Beef', category: 'Meat',
    cycle_phase: ['lutealna'], anti_inflammatory: false,
    localAvailability: {
      Poland:   { regions: ['podlaskie','mazowieckie','warmińsko-mazurskie','kujawsko-pomorskie','wielkopolskie'], months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Turkey', category: 'Meat',
    cycle_phase: ['lutealna'], anti_inflammatory: false,
    localAvailability: {
      Poland:   { regions: ['wielkopolskie','kujawsko-pomorskie','mazowieckie','łódzkie','lubelskie'], months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Pork', category: 'Meat',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Duck', category: 'Meat',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: false,
    localAvailability: {
      Poland: { regions: ['wielkopolskie','mazowieckie','kujawsko-pomorskie','podlaskie','łódzkie'], months: [1, 12] },
    },
  },

  // ── SEAFOOD ────────────────────────────────────────────────────────────────
  {
    name: 'Trout', category: 'Seafood',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ['małopolskie','podkarpackie','dolnośląskie','śląskie','świętokrzyskie','warmińsko-mazurskie'], months: [3, 10] },
      Bulgaria: { regions: ['Smolyan','Kardzhali','Blagoevgrad','Kyustendil','Vidin'], months: [3, 10] },
    },
  },
  {
    name: 'Mussels', category: 'Seafood',
    cycle_phase: ['folikularna', 'menstruacyjna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ['pomorskie','zachodniopomorskie'], months: [9, 4] },
      Bulgaria: { regions: ['Varna','Burgas'], months: [9, 4] },
    },
  },
  {
    name: 'Crabs', category: 'Seafood',
    cycle_phase: ['folikularna', 'menstruacyjna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ['pomorskie','zachodniopomorskie'], months: [5, 11] },
      Bulgaria: { regions: ['Varna','Burgas'], months: [5, 10] },
    },
  },
  {
    name: 'Baltic salmon', category: 'Seafood',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      Poland: { regions: ['pomorskie','zachodniopomorskie'], months: [6, 10] },
    },
  },
  {
    name: 'Norwegian salmon', category: 'Seafood',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      Norway: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Shrimp', category: 'Seafood',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      Ecuador: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Tuna', category: 'Seafood',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      Thailand: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Sprat (Black Sea)', category: 'Seafood',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      Bulgaria: { regions: ['Varna','Burgas'], months: [10, 4] },
    },
  },
  {
    name: 'Cod', category: 'Seafood',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      Poland: { regions: ['pomorskie','zachodniopomorskie'], months: [10, 4] },
    },
  },
  {
    name: 'Flounder', category: 'Seafood',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ['pomorskie','zachodniopomorskie'], months: [4, 11] },
      Bulgaria: { regions: ['Varna','Burgas'], months: [4, 11] },
    },
  },
  {
    name: 'Halibut', category: 'Seafood',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      Norway: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Sardines', category: 'Seafood',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true,
    localAvailability: {
      Portugal: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Herring', category: 'Seafood',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true,
    localAvailability: {
      Poland: { regions: ['pomorskie','zachodniopomorskie','warmińsko-mazurskie'], months: [10, 3] },
    },
  },
  {
    name: 'Carp', category: 'Seafood',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [10, 1] },
      Bulgaria: { regions: ALL_BULGARIA, months: [10, 1] },
    },
  },
  {
    name: 'Oysters', category: 'Seafood',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true,
    localAvailability: {
      France: { regions: null, months: [9, 4] },
    },
  },
  {
    name: 'Black Sea mackerel', category: 'Seafood',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true,
    localAvailability: {
      Bulgaria: { regions: ['Varna','Burgas'], months: [9, 11] },
    },
  },

  // ── OTHER ──────────────────────────────────────────────────────────────────
  {
    name: 'Eggs', category: 'Other',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Sauerkraut', category: 'Other',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Poland: { regions: ALL_POLAND, months: [10, 3] },
    },
  },
  {
    name: 'Kefir', category: 'Other',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Bulgarian yoghurt', category: 'Other',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Peanut butter', category: 'Other',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      USA: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Olives', category: 'Other',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Greece:   { regions: null, months: [1, 12] },
      Bulgaria: { regions: ['Plovdiv','Haskovo','Kardzhali','Stara Zagora','Pazardzhik'], months: [10, 12] },
    },
  },
  {
    name: 'Turmeric', category: 'Other',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      India: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Dark chocolate', category: 'Other',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true,
    localAvailability: {
      Belgium: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Mint', category: 'Other',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [5, 9] },
      Bulgaria: { regions: ALL_BULGARIA, months: [4, 10] },
    },
  },
  {
    name: 'Cottage cheese', category: 'Other',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Spirulina', category: 'Other',
    cycle_phase: ['lutealna'], anti_inflammatory: true,
    localAvailability: {
      USA: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Nettle', category: 'Other',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [3, 6] },
      Bulgaria: { regions: ALL_BULGARIA, months: [2, 5] },
    },
  },
  {
    name: 'Green tea', category: 'Other',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true,
    localAvailability: {
      China: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Miso', category: 'Other',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true,
    localAvailability: {
      Japan: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Tamari', category: 'Other',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true,
    localAvailability: {
      Japan: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Rose petal jam', category: 'Other',
    cycle_phase: ['folikularna'], anti_inflammatory: true,
    localAvailability: {
      Bulgaria: { regions: ['Plovdiv','Kazanlak','Stara Zagora','Pazardzhik','Sofia Oblast'], months: [5, 6] },
    },
  },
];
