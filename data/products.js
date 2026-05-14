// ─────────────────────────────────────────────────────────────────────────────
// DATA MODEL
// Each product: name (EN), name_pl (PL), category, cycle_phase,
//               anti_inflammatory, endo_friendly, localAvailability
// localAvailability[country] = { regions: null | string[], months: [start, end] }
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

const ALL_PHASES = ['folikularna', 'owulacyjna', 'lutealna', 'menstruacyjna'];

// ── PRODUCTS ──────────────────────────────────────────────────────────────────
const products = [

  // ── GRAINS ─────────────────────────────────────────────────────────────────
  {
    name: 'Oats', name_pl: 'Owies', category: 'Grains',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Rye', name_pl: 'Żyto', category: 'Grains',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland: { regions: ['warmińsko-mazurskie','podlaskie','mazowieckie','lubuskie','kujawsko-pomorskie'], months: [1, 12] },
    },
  },
  {
    name: 'Wheat', name_pl: 'Pszenica', category: 'Grains',
    cycle_phase: ['folikularna'], anti_inflammatory: false, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Spelt', name_pl: 'Orkisz', category: 'Grains',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland: { regions: ['dolnośląskie','opolskie','śląskie','małopolskie','podkarpackie'], months: [1, 12] },
    },
  },
  {
    name: 'Barley', name_pl: 'Jęczmień', category: 'Grains',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Corn', name_pl: 'Kukurydza', category: 'Grains',
    cycle_phase: ['owulacyjna'], anti_inflammatory: false, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ['łódzkie','mazowieckie','lubelskie','kujawsko-pomorskie','wielkopolskie'], months: [7, 10] },
      Bulgaria: { regions: ALL_BULGARIA, months: [7, 10] },
    },
  },
  {
    name: 'Amaranth', name_pl: 'Amarantus', category: 'Grains',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Peru: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Quinoa', name_pl: 'Quinoa', category: 'Grains',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Peru: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Brown rice', name_pl: 'Ryż brązowy', category: 'Grains',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Thailand: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Millet', name_pl: 'Kasza jaglana', category: 'Grains',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      India: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Buckwheat', name_pl: 'Kasza gryczana', category: 'Grains',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland: { regions: ['podlaskie','warmińsko-mazurskie','mazowieckie','lubelskie','podkarpackie'], months: [1, 12] },
    },
  },
  {
    name: 'Wild rice', name_pl: 'Ryż dziki', category: 'Grains',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      USA: { regions: null, months: [1, 12] },
    },
  },

  // ── VEGETABLES ─────────────────────────────────────────────────────────────
  {
    name: 'Artichokes', name_pl: 'Karczochy', category: 'Vegetables',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Italy:    { regions: null, months: [1, 12] },
      Bulgaria: { regions: ['Plovdiv','Pazardzhik','Haskovo','Stara Zagora'], months: [4, 6] },
    },
  },
  {
    name: 'Broccoli', name_pl: 'Brokuły', category: 'Vegetables',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [6, 10] },
      Bulgaria: { regions: ALL_BULGARIA, months: [5, 10] },
    },
  },
  {
    name: 'Carrots', name_pl: 'Marchew', category: 'Vegetables',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [7, 11] },
      Bulgaria: { regions: ALL_BULGARIA, months: [6, 11] },
    },
  },
  {
    name: 'Lettuce', name_pl: 'Sałata', category: 'Vegetables',
    cycle_phase: ['folikularna'], anti_inflammatory: false, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [4, 10] },
      Bulgaria: { regions: ALL_BULGARIA, months: [3, 11] },
    },
  },
  {
    name: 'Parsley', name_pl: 'Pietruszka', category: 'Vegetables',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [6, 11] },
      Bulgaria: { regions: ALL_BULGARIA, months: [5, 11] },
    },
  },
  {
    name: 'Green peas', name_pl: 'Zielony groszek', category: 'Vegetables',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [5, 7] },
      Bulgaria: { regions: ALL_BULGARIA, months: [4, 6] },
    },
  },
  {
    name: 'Rhubarb', name_pl: 'Rabarbar', category: 'Vegetables',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland: { regions: ALL_POLAND, months: [4, 6] },
    },
  },
  {
    name: 'Green beans', name_pl: 'Fasolka szparagowa', category: 'Vegetables',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [6, 9] },
      Bulgaria: { regions: ALL_BULGARIA, months: [5, 9] },
    },
  },
  {
    name: 'Zucchini', name_pl: 'Cukinia', category: 'Vegetables',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [6, 9] },
      Bulgaria: { regions: ALL_BULGARIA, months: [5, 10] },
    },
  },
  {
    name: 'Arugula', name_pl: 'Rukola', category: 'Vegetables',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [4, 10] },
      Bulgaria: { regions: ALL_BULGARIA, months: [3, 11] },
    },
  },
  {
    name: 'Asparagus', name_pl: 'Szparagi', category: 'Vegetables',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ['dolnośląskie','kujawsko-pomorskie','wielkopolskie','łódzkie','lubuskie'], months: [4, 6] },
      Bulgaria: { regions: ['Plovdiv','Pazardzhik','Sofia Oblast','Kyustendil'], months: [3, 5] },
    },
  },
  {
    name: 'Red bell pepper', name_pl: 'Czerwona papryka', category: 'Vegetables',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ['lubelskie','mazowieckie','łódzkie','małopolskie','podkarpackie'], months: [7, 10] },
      Bulgaria: { regions: ALL_BULGARIA, months: [6, 10] },
    },
  },
  {
    name: 'Brussels sprouts', name_pl: 'Brukselka', category: 'Vegetables',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [9, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [9, 12] },
    },
  },
  {
    name: 'Celery', name_pl: 'Seler naciowy', category: 'Vegetables',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [6, 11] },
      Bulgaria: { regions: ALL_BULGARIA, months: [5, 11] },
    },
  },
  {
    name: 'Chard', name_pl: 'Botwinka', category: 'Vegetables',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [5, 8] },
      Bulgaria: { regions: ALL_BULGARIA, months: [4, 8] },
    },
  },
  {
    name: 'Chicory', name_pl: 'Cykoria', category: 'Vegetables',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [5, 10] },
      Bulgaria: { regions: ALL_BULGARIA, months: [4, 10] },
    },
  },
  {
    name: 'Endive', name_pl: 'Endywia', category: 'Vegetables',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [8, 11] },
      Bulgaria: { regions: ALL_BULGARIA, months: [7, 11] },
    },
  },
  {
    name: 'Escarole', name_pl: 'Eskariola', category: 'Vegetables',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [8, 11] },
      Bulgaria: { regions: ALL_BULGARIA, months: [7, 11] },
    },
  },
  {
    name: 'Okra', name_pl: 'Okra', category: 'Vegetables',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Bulgaria: { regions: ['Plovdiv','Haskovo','Kardzhali','Stara Zagora','Blagoevgrad'], months: [7, 10] },
      Spain:    { regions: null, months: [6, 10] },
    },
  },
  {
    name: 'Shallot', name_pl: 'Szalotka', category: 'Vegetables',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [6, 10] },
      Bulgaria: { regions: ALL_BULGARIA, months: [5, 10] },
    },
  },
  {
    name: 'Spinach', name_pl: 'Szpinak', category: 'Vegetables',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ['mazowieckie','wielkopolskie','dolnośląskie','kujawsko-pomorskie','łódzkie'], months: [4, 6] },
      Bulgaria: { regions: ALL_BULGARIA, months: [3, 5] },
    },
  },
  {
    name: 'Chives', name_pl: 'Szczypiorek', category: 'Vegetables',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [4, 10] },
      Bulgaria: { regions: ALL_BULGARIA, months: [3, 10] },
    },
  },
  {
    name: 'Dandelion', name_pl: 'Mniszek lekarski', category: 'Vegetables',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [3, 6] },
      Bulgaria: { regions: ALL_BULGARIA, months: [2, 5] },
    },
  },
  {
    name: 'Eggplant', name_pl: 'Bakłażan', category: 'Vegetables',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Spain:    { regions: null,         months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [6, 10] },
    },
  },
  {
    name: 'Tomato', name_pl: 'Pomidor', category: 'Vegetables',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ['łódzkie','mazowieckie','lubelskie','małopolskie','podkarpackie','świętokrzyskie'], months: [7, 9] },
      Bulgaria: { regions: ALL_BULGARIA, months: [6, 10] },
    },
  },
  {
    name: 'Pumpkin', name_pl: 'Dynia', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [9, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [8, 12] },
    },
  },
  {
    name: 'Cauliflower', name_pl: 'Kalafior', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [6, 10] },
      Bulgaria: { regions: ALL_BULGARIA, months: [5, 6] },
    },
  },
  {
    name: 'Cabbage', name_pl: 'Kapusta', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [8, 3] },
      Bulgaria: { regions: ALL_BULGARIA, months: [7, 3] },
    },
  },
  {
    name: 'Savoy cabbage', name_pl: 'Kapusta włoska', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [9, 2] },
      Bulgaria: { regions: ALL_BULGARIA, months: [9, 2] },
    },
  },
  {
    name: 'Celeriac', name_pl: 'Seler korzeniowy', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [9, 2] },
      Bulgaria: { regions: ALL_BULGARIA, months: [9, 2] },
    },
  },
  {
    name: 'Kale', name_pl: 'Jarmuż', category: 'Vegetables',
    cycle_phase: ['lutealna', 'menstruacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [9, 2] },
      Bulgaria: { regions: ALL_BULGARIA, months: [9, 2] },
    },
  },
  {
    name: 'Cucumber', name_pl: 'Ogórek', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [6, 9] },
      Bulgaria: { regions: ALL_BULGARIA, months: [5, 9] },
    },
  },
  {
    name: 'Garlic', name_pl: 'Czosnek', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ['lubelskie','mazowieckie','łódzkie','kujawsko-pomorskie','wielkopolskie'], months: [7, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [6, 12] },
    },
  },
  {
    name: 'Leek', name_pl: 'Por', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [9, 3] },
      Bulgaria: { regions: ALL_BULGARIA, months: [9, 3] },
    },
  },
  {
    name: 'Onion', name_pl: 'Cebula', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [7, 4] },
      Bulgaria: { regions: ALL_BULGARIA, months: [6, 4] },
    },
  },
  {
    name: 'Parsnip', name_pl: 'Pasternak', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [9, 3] },
      Bulgaria: { regions: ALL_BULGARIA, months: [9, 3] },
    },
  },
  {
    name: 'Radish', name_pl: 'Rzodkiewka', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [4, 10] },
      Bulgaria: { regions: ALL_BULGARIA, months: [3, 11] },
    },
  },
  {
    name: 'Daikon', name_pl: 'Biała rzodkiew', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [9, 3] },
      Bulgaria: { regions: ALL_BULGARIA, months: [9, 3] },
      China:    { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Marrow', name_pl: 'Kabaczek', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [6, 9] },
      Bulgaria: { regions: ALL_BULGARIA, months: [5, 9] },
    },
  },
  {
    name: 'Potato', name_pl: 'Ziemniak', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: false, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [7, 3] },
      Bulgaria: { regions: ALL_BULGARIA, months: [6, 3] },
    },
  },
  {
    name: 'Ginger', name_pl: 'Imbir', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      India: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Sweet potato', name_pl: 'Słodki ziemniak', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Peru: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Watercress', name_pl: 'Rukiew wodna', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [4, 10] },
      Bulgaria: { regions: ALL_BULGARIA, months: [3, 10] },
    },
  },
  {
    name: 'Beetroot', name_pl: 'Buraki', category: 'Vegetables',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [8, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [7, 12] },
    },
  },
  {
    name: 'Button mushroom', name_pl: 'Pieczarka', category: 'Vegetables',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Shiitake mushroom', name_pl: 'Shitake', category: 'Vegetables',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      China: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Burdock', name_pl: 'Łopian', category: 'Vegetables',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Japan:  { regions: null, months: [1, 12] },
      Poland: { regions: ALL_POLAND, months: [4, 6] },
    },
  },
  {
    name: 'Water chestnut', name_pl: 'Orzech wodny', category: 'Vegetables',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      China: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Water caltrop', name_pl: 'Kotewka', category: 'Vegetables',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ['warmińsko-mazurskie','podlaskie','mazowieckie','lubelskie'], months: [8, 10] },
      Bulgaria: { regions: ALL_BULGARIA, months: [8, 10] },
    },
  },
  // seaweed & algae — in Vegetables
  {
    name: 'Spirulina', name_pl: 'Spirulina', category: 'Vegetables',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      USA: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Chlorella', name_pl: 'Chlorella', category: 'Vegetables',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Japan: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Kelp', name_pl: 'Kelp', category: 'Vegetables',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Japan: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Kombu', name_pl: 'Kombu', category: 'Vegetables',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Japan: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Dulse', name_pl: 'Dulse', category: 'Vegetables',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Ireland: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Hijiki', name_pl: 'Hijiki', category: 'Vegetables',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Japan: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Wakame', name_pl: 'Wakame', category: 'Vegetables',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Japan: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Nori', name_pl: 'Nori', category: 'Vegetables',
    cycle_phase: ALL_PHASES, anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Japan: { regions: null, months: [1, 12] },
    },
  },

  // ── FRUITS ─────────────────────────────────────────────────────────────────
  {
    name: 'Avocado', name_pl: 'Awokado', category: 'Fruits',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Mexico: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Grapefruit', name_pl: 'Grejpfrut', category: 'Fruits',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Israel: { regions: null, months: [11, 4] },
    },
  },
  {
    name: 'Lemon', name_pl: 'Cytryna', category: 'Fruits',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Spain: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Lime', name_pl: 'Limonka', category: 'Fruits',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Mexico: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Orange', name_pl: 'Pomarańcza', category: 'Fruits',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Spain: { regions: null, months: [11, 4] },
    },
  },
  {
    name: 'Papaya', name_pl: 'Papaja', category: 'Fruits',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Brazil:  { regions: null, months: [1, 12] },
      Mexico:  { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Plum', name_pl: 'Śliwka', category: 'Fruits',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ['małopolskie','podkarpackie','świętokrzyskie','lubelskie','dolnośląskie'], months: [7, 10] },
      Bulgaria: { regions: ALL_BULGARIA, months: [7, 10] },
    },
  },
  {
    name: 'Pomegranate', name_pl: 'Granat', category: 'Fruits',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Turkey:   { regions: null, months: [9, 2] },
      Bulgaria: { regions: ['Plovdiv','Haskovo','Kardzhali','Stara Zagora','Pazardzhik'], months: [9, 11] },
    },
  },
  {
    name: 'Sour cherry', name_pl: 'Wiśnia', category: 'Fruits',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ['lubelskie','mazowieckie','łódzkie','świętokrzyskie','małopolskie'], months: [6, 7] },
      Bulgaria: { regions: ALL_BULGARIA, months: [5, 7] },
    },
  },
  {
    name: 'Lychee', name_pl: 'Liczi', category: 'Fruits',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      China:    { regions: null, months: [5, 8] },
      Thailand: { regions: null, months: [4, 7] },
    },
  },
  {
    name: 'Apricot', name_pl: 'Morela', category: 'Fruits',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ['dolnośląskie','małopolskie','podkarpackie','śląskie','opolskie'], months: [6, 8] },
      Bulgaria: { regions: ALL_BULGARIA, months: [5, 7] },
    },
  },
  {
    name: 'Cantaloupe', name_pl: 'Kantalupa', category: 'Fruits',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Spain:    { regions: null,         months: [6, 9] },
      Bulgaria: { regions: ALL_BULGARIA, months: [6, 9] },
    },
  },
  {
    name: 'Coconut', name_pl: 'Kokos', category: 'Fruits',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Thailand: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Fig', name_pl: 'Figi', category: 'Fruits',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Turkey:   { regions: null, months: [7, 10] },
      Bulgaria: { regions: ['Plovdiv','Haskovo','Kardzhali','Stara Zagora','Blagoevgrad','Smolyan'], months: [7, 10] },
    },
  },
  {
    name: 'Guava', name_pl: 'Gujawa', category: 'Fruits',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Brazil: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Persimmon', name_pl: 'Persymona', category: 'Fruits',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Spain:    { regions: null, months: [10, 1] },
      Bulgaria: { regions: ['Plovdiv','Haskovo','Kardzhali','Stara Zagora','Blagoevgrad'], months: [9, 12] },
    },
  },
  {
    name: 'Pineapple', name_pl: 'Ananas', category: 'Fruits',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      'Costa Rica': { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Raspberry', name_pl: 'Malina', category: 'Fruits',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [6, 9] },
      Bulgaria: { regions: ALL_BULGARIA, months: [6, 9] },
    },
  },
  {
    name: 'Strawberry', name_pl: 'Truskawka', category: 'Fruits',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ['mazowieckie','lubelskie','łódzkie','kujawsko-pomorskie','wielkopolskie'], months: [5, 7] },
      Bulgaria: { regions: ALL_BULGARIA, months: [4, 6] },
    },
  },
  {
    name: 'Apple', name_pl: 'Jabłko', category: 'Fruits',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [8, 3] },
      Bulgaria: { regions: ALL_BULGARIA, months: [8, 3] },
    },
  },
  {
    name: 'Banana', name_pl: 'Banan', category: 'Fruits',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Ecuador: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Dates', name_pl: 'Daktyle', category: 'Fruits',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Tunisia: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Peach', name_pl: 'Brzoskwinia', category: 'Fruits',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ['dolnośląskie','opolskie','śląskie','małopolskie','podkarpackie'], months: [7, 9] },
      Bulgaria: { regions: ALL_BULGARIA, months: [6, 9] },
    },
  },
  {
    name: 'Pear', name_pl: 'Gruszka', category: 'Fruits',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ['mazowieckie','łódzkie','lubelskie','świętokrzyskie','podkarpackie'], months: [8, 11] },
      Bulgaria: { regions: ALL_BULGARIA, months: [7, 11] },
    },
  },
  {
    name: 'Raisins', name_pl: 'Rodzynki', category: 'Fruits',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Turkey: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Blackberry', name_pl: 'Jeżyna', category: 'Fruits',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ['dolnośląskie','lubuskie','zachodniopomorskie','małopolskie','podkarpackie'], months: [7, 9] },
      Bulgaria: { regions: ALL_BULGARIA, months: [7, 9] },
    },
  },
  {
    name: 'Black currant', name_pl: 'Czarna porzeczka', category: 'Fruits',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [6, 8] },
      Bulgaria: { regions: ALL_BULGARIA, months: [6, 8] },
    },
  },
  {
    name: 'Blueberry', name_pl: 'Jagoda', category: 'Fruits',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ['warmińsko-mazurskie','podlaskie','pomorskie','zachodniopomorskie'], months: [6, 9] },
      Bulgaria: { regions: ['Smolyan','Kardzhali','Blagoevgrad','Kyustendil','Plovdiv'], months: [6, 9] },
    },
  },
  {
    name: 'Grapes', name_pl: 'Winogrona', category: 'Fruits',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ['dolnośląskie','lubuskie','opolskie','śląskie','małopolskie'], months: [8, 10] },
      Bulgaria: { regions: ALL_BULGARIA, months: [8, 10] },
    },
  },
  {
    name: 'Melon', name_pl: 'Melon', category: 'Fruits',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Spain:    { regions: null,         months: [5, 10] },
      Bulgaria: { regions: ALL_BULGARIA, months: [6, 9] },
    },
  },
  {
    name: 'Watermelon', name_pl: 'Arbuz', category: 'Fruits',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Bulgaria: { regions: ALL_BULGARIA, months: [6, 9] },
    },
  },
  {
    name: 'Rose hip', name_pl: 'Dzika róża', category: 'Fruits',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Bulgaria: { regions: ALL_BULGARIA, months: [8, 11] },
      Poland:   { regions: ALL_POLAND,   months: [8, 11] },
    },
  },

  // ── LEGUMES ────────────────────────────────────────────────────────────────
  {
    name: 'Peas', name_pl: 'Groch', category: 'Legumes',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Green lentils', name_pl: 'Soczewica zielona', category: 'Legumes',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Canada: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Lima beans', name_pl: 'Fasola Lima', category: 'Legumes',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      USA:      { regions: null, months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Mung beans', name_pl: 'Fasolka mung', category: 'Legumes',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      India: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Split peas', name_pl: 'Groch łuskany', category: 'Legumes',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Canada: { regions: null, months: [1, 12] },
      Poland: { regions: ALL_POLAND, months: [1, 12] },
    },
  },
  {
    name: 'Yard-long beans', name_pl: 'Wspięga wężowata', category: 'Legumes',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      China: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Red lentils', name_pl: 'Soczewica czerwona', category: 'Legumes',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Canada: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Edamame', name_pl: 'Edamame', category: 'Legumes',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Japan: { regions: null, months: [1, 12] },
      China: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Runner beans', name_pl: 'Fasola szparagowa', category: 'Legumes',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ['podkarpackie','małopolskie','lubelskie','świętokrzyskie','śląskie'], months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Chickpeas', name_pl: 'Ciecierzyca', category: 'Legumes',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      India:    { regions: null,         months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Azuki beans', name_pl: 'Fasola azuki', category: 'Legumes',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Japan: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Black beans', name_pl: 'Fasola czarna', category: 'Legumes',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Mexico: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Black soybeans', name_pl: 'Soja czarna', category: 'Legumes',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      China: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Kidney beans', name_pl: 'Fasola czerwona', category: 'Legumes',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Argentina: { regions: null, months: [1, 12] },
    },
  },

  // ── NUTS & SEEDS ───────────────────────────────────────────────────────────
  {
    name: 'Brazil nut', name_pl: 'Orzech brazylijski', category: 'Nuts & Seeds',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Brazil: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Cashew', name_pl: 'Orzech nerkowca', category: 'Nuts & Seeds',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Vietnam: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Chia seeds', name_pl: 'Nasiona chia', category: 'Nuts & Seeds',
    cycle_phase: ['folikularna', 'owulacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Mexico: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Flaxseed', name_pl: 'Siemię lniane', category: 'Nuts & Seeds',
    cycle_phase: ['folikularna', 'owulacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland: { regions: ['lubelskie','mazowieckie','kujawsko-pomorskie','łódzkie','wielkopolskie'], months: [1, 12] },
    },
  },
  {
    name: 'Hemp seeds', name_pl: 'Nasiona konopi', category: 'Nuts & Seeds',
    cycle_phase: ['folikularna', 'owulacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland: { regions: ALL_POLAND, months: [1, 12] },
    },
  },
  {
    name: 'Pumpkin seeds', name_pl: 'Pestki dyni', category: 'Nuts & Seeds',
    cycle_phase: ['folikularna', 'owulacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [9, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [9, 12] },
    },
  },
  {
    name: 'Almonds', name_pl: 'Migdały', category: 'Nuts & Seeds',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      USA: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Pecans', name_pl: 'Orzeszki pekan', category: 'Nuts & Seeds',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      USA: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Pistachios', name_pl: 'Pistacje', category: 'Nuts & Seeds',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Iran: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Pine nuts', name_pl: 'Orzeszki piniowe', category: 'Nuts & Seeds',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Italy: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Sesame', name_pl: 'Sezam', category: 'Nuts & Seeds',
    cycle_phase: ['lutealna', 'menstruacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Ethiopia: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Sunflower seeds', name_pl: 'Nasiona słonecznika', category: 'Nuts & Seeds',
    cycle_phase: ['lutealna', 'menstruacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ['lubelskie','mazowieckie','łódzkie','kujawsko-pomorskie','wielkopolskie'], months: [8, 11] },
      Bulgaria: { regions: ALL_BULGARIA, months: [8, 10] },
    },
  },
  {
    name: 'Walnuts', name_pl: 'Orzechy włoskie', category: 'Nuts & Seeds',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ['dolnośląskie','lubuskie','opolskie','śląskie','małopolskie'], months: [9, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [9, 12] },
    },
  },
  {
    name: 'Chestnuts', name_pl: 'Kasztany', category: 'Nuts & Seeds',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ['dolnośląskie','śląskie','małopolskie','opolskie','lubuskie'], months: [9, 11] },
      Bulgaria: { regions: ['Plovdiv','Smolyan','Kardzhali','Blagoevgrad','Kyustendil'], months: [9, 11] },
    },
  },

  // ── MEAT ───────────────────────────────────────────────────────────────────
  {
    name: 'Chicken', name_pl: 'Kurczak', category: 'Meat',
    cycle_phase: ['folikularna'], anti_inflammatory: false, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Eggs', name_pl: 'Jajka', category: 'Meat',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Lamb', name_pl: 'Jagnięcina', category: 'Meat',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ['podkarpackie','małopolskie','śląskie','lubelskie','warmińsko-mazurskie'], months: [3, 9] },
      Bulgaria: { regions: ALL_BULGARIA, months: [3, 9] },
    },
  },
  {
    name: 'Beef', name_pl: 'Wołowina', category: 'Meat',
    cycle_phase: ['lutealna'], anti_inflammatory: false, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ['podlaskie','mazowieckie','warmińsko-mazurskie','kujawsko-pomorskie','wielkopolskie'], months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Turkey', name_pl: 'Indyk', category: 'Meat',
    cycle_phase: ['lutealna'], anti_inflammatory: false, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ['wielkopolskie','kujawsko-pomorskie','mazowieckie','łódzkie','lubelskie'], months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Duck', name_pl: 'Kaczka', category: 'Meat',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: false, endo_friendly: false,
    localAvailability: {
      Poland: { regions: ['wielkopolskie','mazowieckie','kujawsko-pomorskie','podlaskie','łódzkie'], months: [1, 12] },
    },
  },
  {
    name: 'Pork', name_pl: 'Wieprzowina', category: 'Meat',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: false, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },

  // ── SEAFOOD ────────────────────────────────────────────────────────────────
  {
    name: 'Trout', name_pl: 'Pstrąg', category: 'Seafood',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ['małopolskie','podkarpackie','dolnośląskie','śląskie','świętokrzyskie','warmińsko-mazurskie'], months: [3, 10] },
      Bulgaria: { regions: ['Smolyan','Kardzhali','Blagoevgrad','Kyustendil','Vidin'], months: [3, 10] },
    },
  },
  {
    name: 'Mussels', name_pl: 'Małże', category: 'Seafood',
    cycle_phase: ['folikularna', 'menstruacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ['pomorskie','zachodniopomorskie'], months: [9, 4] },
      Bulgaria: { regions: ['Varna','Burgas'], months: [9, 4] },
    },
  },
  {
    name: 'Crabs', name_pl: 'Kraby', category: 'Seafood',
    cycle_phase: ['folikularna', 'menstruacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ['pomorskie','zachodniopomorskie'], months: [5, 11] },
      Bulgaria: { regions: ['Varna','Burgas'], months: [5, 10] },
    },
  },
  {
    name: 'Baltic salmon', name_pl: 'Łosoś bałtycki', category: 'Seafood',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland: { regions: ['pomorskie','zachodniopomorskie'], months: [6, 10] },
    },
  },
  {
    name: 'Norwegian salmon', name_pl: 'Łosoś norweski', category: 'Seafood',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Norway: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Shrimp', name_pl: 'Krewetki', category: 'Seafood',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Ecuador: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Sprat (Black Sea)', name_pl: 'Szprot (Morze Czarne)', category: 'Seafood',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Bulgaria: { regions: ['Varna','Burgas'], months: [10, 4] },
    },
  },
  {
    name: 'Tuna', name_pl: 'Tuńczyk', category: 'Seafood',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Thailand: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Cod', name_pl: 'Dorsz', category: 'Seafood',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland: { regions: ['pomorskie','zachodniopomorskie'], months: [10, 4] },
    },
  },
  {
    name: 'Flounder', name_pl: 'Flądra', category: 'Seafood',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ['pomorskie','zachodniopomorskie'], months: [4, 11] },
      Bulgaria: { regions: ['Varna','Burgas'], months: [4, 11] },
    },
  },
  {
    name: 'Halibut', name_pl: 'Halibut', category: 'Seafood',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Norway: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Anchovies', name_pl: 'Anchois', category: 'Seafood',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Portugal: { regions: null, months: [1, 12] },
      Spain:    { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Black Sea mackerel', name_pl: 'Makrela (Morze Czarne)', category: 'Seafood',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Bulgaria: { regions: ['Varna','Burgas'], months: [9, 11] },
    },
  },
  {
    name: 'Carp', name_pl: 'Karp', category: 'Seafood',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: false, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [10, 1] },
      Bulgaria: { regions: ALL_BULGARIA, months: [10, 1] },
    },
  },
  {
    name: 'Catfish', name_pl: 'Sum', category: 'Seafood',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: false, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [5, 10] },
      Bulgaria: { regions: ALL_BULGARIA, months: [5, 10] },
    },
  },
  {
    name: 'Herring', name_pl: 'Śledź', category: 'Seafood',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland: { regions: ['pomorskie','zachodniopomorskie','warmińsko-mazurskie'], months: [10, 3] },
    },
  },
  {
    name: 'Lobster', name_pl: 'Homar', category: 'Seafood',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      France:  { regions: null, months: [1, 12] },
      Norway:  { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Octopus', name_pl: 'Ośmiornica', category: 'Seafood',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Spain:    { regions: null, months: [1, 12] },
      Bulgaria: { regions: ['Varna','Burgas'], months: [5, 10] },
    },
  },
  {
    name: 'Oysters', name_pl: 'Ostrygi', category: 'Seafood',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      France: { regions: null, months: [9, 4] },
    },
  },
  {
    name: 'Sardines', name_pl: 'Sardynki', category: 'Seafood',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Portugal: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Scallops', name_pl: 'Przegrzebki', category: 'Seafood',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      France:   { regions: null, months: [9, 4] },
      Bulgaria: { regions: ['Varna','Burgas'], months: [5, 10] },
    },
  },
  {
    name: 'Squid', name_pl: 'Kalmary', category: 'Seafood',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Spain:    { regions: null, months: [1, 12] },
      Bulgaria: { regions: ['Varna','Burgas'], months: [5, 10] },
    },
  },

  // ── OILS ───────────────────────────────────────────────────────────────────
  {
    name: 'Extra virgin olive oil', name_pl: 'Oliwa z oliwek', category: 'Oils',
    cycle_phase: ALL_PHASES, anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Greece:   { regions: null, months: [1, 12] },
      Spain:    { regions: null, months: [1, 12] },
      Bulgaria: { regions: ['Plovdiv','Haskovo','Kardzhali','Stara Zagora','Pazardzhik'], months: [10, 12] },
    },
  },
  {
    name: 'Flaxseed oil', name_pl: 'Olej lniany', category: 'Oils',
    cycle_phase: ALL_PHASES, anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland: { regions: ALL_POLAND, months: [1, 12] },
    },
  },
  {
    name: 'Avocado oil', name_pl: 'Olej z awokado', category: 'Oils',
    cycle_phase: ALL_PHASES, anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Mexico: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Coconut oil', name_pl: 'Olej kokosowy', category: 'Oils',
    cycle_phase: ALL_PHASES, anti_inflammatory: false, endo_friendly: false,
    localAvailability: {
      Philippines: { regions: null, months: [1, 12] },
    },
  },

  // ── SPICES & HERBS ─────────────────────────────────────────────────────────
  {
    name: 'Turmeric', name_pl: 'Kurkuma', category: 'Spices',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      India: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Cinnamon', name_pl: 'Cynamon', category: 'Spices',
    cycle_phase: ALL_PHASES, anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      'Sri Lanka': { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Mint', name_pl: 'Mięta', category: 'Spices',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [5, 9] },
      Bulgaria: { regions: ALL_BULGARIA, months: [4, 10] },
    },
  },
  {
    name: 'Peppermint', name_pl: 'Mięta pieprzowa', category: 'Spices',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [6, 9] },
      Bulgaria: { regions: ALL_BULGARIA, months: [5, 9] },
    },
  },
  {
    name: 'Basil', name_pl: 'Bazylia', category: 'Spices',
    cycle_phase: ALL_PHASES, anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [6, 9] },
      Bulgaria: { regions: ALL_BULGARIA, months: [5, 10] },
    },
  },
  {
    name: 'Black pepper', name_pl: 'Czarny pieprz', category: 'Spices',
    cycle_phase: ALL_PHASES, anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      India:    { regions: null, months: [1, 12] },
      Vietnam:  { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Cardamom', name_pl: 'Kardamon', category: 'Spices',
    cycle_phase: ALL_PHASES, anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      India: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Chili', name_pl: 'Chili', category: 'Spices',
    cycle_phase: ALL_PHASES, anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Bulgaria: { regions: ALL_BULGARIA, months: [7, 10] },
      Spain:    { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Cloves', name_pl: 'Goździki', category: 'Spices',
    cycle_phase: ALL_PHASES, anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Indonesia: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Oregano', name_pl: 'Oregano', category: 'Spices',
    cycle_phase: ALL_PHASES, anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [6, 9] },
      Bulgaria: { regions: ALL_BULGARIA, months: [5, 9] },
    },
  },
  {
    name: 'Rosemary', name_pl: 'Rozmaryn', category: 'Spices',
    cycle_phase: ALL_PHASES, anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
      Spain:    { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Saffron', name_pl: 'Szafran', category: 'Spices',
    cycle_phase: ALL_PHASES, anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Iran:     { regions: null, months: [1, 12] },
      Bulgaria: { regions: ['Plovdiv','Pazardzhik','Stara Zagora'], months: [10, 11] },
    },
  },
  {
    name: 'Sage', name_pl: 'Szałwia', category: 'Spices',
    cycle_phase: ALL_PHASES, anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [5, 9] },
      Bulgaria: { regions: ALL_BULGARIA, months: [4, 9] },
    },
  },
  {
    name: 'Thyme', name_pl: 'Tymianek', category: 'Spices',
    cycle_phase: ALL_PHASES, anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [5, 10] },
      Bulgaria: { regions: ALL_BULGARIA, months: [4, 10] },
    },
  },

  // ── BEVERAGES ──────────────────────────────────────────────────────────────
  {
    name: 'Green tea', name_pl: 'Zielona herbata', category: 'Beverages',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      China:  { regions: null, months: [1, 12] },
      Japan:  { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Coffee', name_pl: 'Kawa', category: 'Beverages',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Brazil:   { regions: null, months: [1, 12] },
      Ethiopia: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Decaf coffee', name_pl: 'Kawa bezkofeinowa', category: 'Beverages',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Brazil: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Black tea', name_pl: 'Herbata czarna', category: 'Beverages',
    cycle_phase: ALL_PHASES, anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      China:      { regions: null, months: [1, 12] },
      'Sri Lanka':{ regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Kombucha', name_pl: 'Kombucha', category: 'Beverages',
    cycle_phase: ALL_PHASES, anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Rooibos', name_pl: 'Rooibos', category: 'Beverages',
    cycle_phase: ALL_PHASES, anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      'South Africa': { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'White tea', name_pl: 'Herbata biała', category: 'Beverages',
    cycle_phase: ALL_PHASES, anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      China: { regions: null, months: [1, 12] },
    },
  },

  // ── OTHER ──────────────────────────────────────────────────────────────────
  {
    name: 'Apple cider vinegar', name_pl: 'Ocet jabłkowy', category: 'Other',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Bulgarian yoghurt', name_pl: 'Jogurt bułgarski', category: 'Other',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Gherkins', name_pl: 'Korniszony', category: 'Other',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [7, 9] },
      Bulgaria: { regions: ALL_BULGARIA, months: [7, 9] },
    },
  },
  {
    name: 'Kefir', name_pl: 'Kefir', category: 'Other',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Kimchi', name_pl: 'Kimchi', category: 'Other',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Olives', name_pl: 'Oliwki', category: 'Other',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Greece:   { regions: null, months: [1, 12] },
      Bulgaria: { regions: ['Plovdiv','Haskovo','Kardzhali','Stara Zagora','Pazardzhik'], months: [10, 12] },
    },
  },
  {
    name: 'Peanut butter', name_pl: 'Masło orzechowe', category: 'Other',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      USA: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Rose petal jam', name_pl: 'Dżem z płatków róży', category: 'Other',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Bulgaria: { regions: ['Plovdiv','Kazanlak','Stara Zagora','Pazardzhik','Sofia Oblast'], months: [5, 6] },
    },
  },
  {
    name: 'Sauerkraut', name_pl: 'Kapusta kiszona', category: 'Other',
    cycle_phase: ['folikularna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Poland: { regions: ALL_POLAND, months: [10, 3] },
    },
  },
  {
    name: 'Dark chocolate', name_pl: 'Ciemna czekolada', category: 'Other',
    cycle_phase: ['owulacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Belgium: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Cottage cheese', name_pl: 'Twaróg', category: 'Other',
    cycle_phase: ['lutealna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [1, 12] },
      Bulgaria: { regions: ALL_BULGARIA, months: [1, 12] },
    },
  },
  {
    name: 'Miso', name_pl: 'Miso', category: 'Other',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: true,
    localAvailability: {
      Japan: { regions: null, months: [1, 12] },
    },
  },
  {
    name: 'Nettle', name_pl: 'Pokrzywa', category: 'Other',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Poland:   { regions: ALL_POLAND,   months: [3, 6] },
      Bulgaria: { regions: ALL_BULGARIA, months: [2, 5] },
    },
  },
  {
    name: 'Tamari', name_pl: 'Tamari', category: 'Other',
    cycle_phase: ['menstruacyjna'], anti_inflammatory: true, endo_friendly: false,
    localAvailability: {
      Japan: { regions: null, months: [1, 12] },
    },
  },
];
