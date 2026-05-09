// ── Language detection ────────────────────────────────────
const lang = navigator.language.startsWith('pl') ? 'pl' : 'en';

// ── Translations ──────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    cycleLabel:     'Cycle',
    seasonLabel:    'Season',
    placeLabel:     'Place',
    inflammatory:   'Inflammatory',
    cyclePageTitle: 'Cycle phase',
    locating:       'Locating…',
    unknown:        'Unknown',
    empty:          'No products for selected criteria.',
    phases: {
      Menstrual:  'Menstrual',
      Follicular: 'Follicular',
      Ovulation:  'Ovulation',
      Luteal:     'Luteal',
    },
    categories: {
      fruits:    'Fruits',
      vegies:    'Vegies',
      veggies:   'Veggies',
      vegetables:'Vegetables',
      meat:      'Meat',
      fish:      'Fish',
      seafood:   'Seafood',
      grains:    'Grains',
      dairy:     'Dairy',
      nuts:      'Nuts',
      legumes:   'Legumes',
      herbs:     'Herbs',
      oils:      'Oils',
      seeds:     'Seeds',
      eggs:      'Eggs',
    },
  },
  pl: {
    cycleLabel:     'Cykl',
    seasonLabel:    'Sezon',
    placeLabel:     'Miejsce',
    inflammatory:   'Przeciwzapalna',
    cyclePageTitle: 'Faza cyklu',
    locating:       'Wykrywam…',
    unknown:        'Nieznane',
    empty:          'Brak produktów dla wybranych kryteriów.',
    phases: {
      Menstrual:  'Menstruacyjna',
      Follicular: 'Folikularna',
      Ovulation:  'Owulacyjna',
      Luteal:     'Lutealna',
    },
    categories: {
      fruits:    'Owoce',
      vegies:    'Warzywa',
      veggies:   'Warzywa',
      vegetables:'Warzywa',
      meat:      'Mięso',
      fish:      'Ryby',
      seafood:   'Owoce morza',
      grains:    'Zboża',
      dairy:     'Nabiał',
      nuts:      'Orzechy',
      legumes:   'Strączki',
      herbs:     'Zioła',
      oils:      'Oleje',
      seeds:     'Nasiona',
      eggs:      'Jajka',
    },
  },
};

const t = TRANSLATIONS[lang];

// ── Helper: nested key lookup, e.g. tr('phases.Luteal') ──
function tr(key) {
  return key.split('.').reduce((obj, k) => obj?.[k], t) ?? key;
}

// ── Helper: translate category name ──────────────────────
function trCategory(cat) {
  return t.categories[cat.toLowerCase()] || cat;
}

// ── Apply static translations via data-i18n attrs ────────
function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const value = tr(key);
    if (value !== key) el.textContent = value;
  });
}

// ── Locale for date formatting ────────────────────────────
const dateLocale = lang === 'pl' ? 'pl-PL' : 'en-US';
