// ── Language detection ────────────────────────────────────
const lang = navigator.language.startsWith('pl') ? 'pl' : 'en';

// ── Translations ──────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    cycleLabel:     'Cycle',
    seasonLabel:    'Season',
    placeLabel:     'Place',
    inflammatory:   'Inflammatory',
    cyclePageTitle:       'Cycle phase',
    dietPageTitle:        'Diet filters',
    dietCycle:            'Cycle-based',
    dietAntiInflammatory: 'Anti-inflammatory',
    dietEndoFriendly:     'Endo-friendly',
    locating:             'Locating…',
    unknown:        'Unknown',
    empty:          'No products for selected criteria.',
    phases: {
      Menstrual:  'Menstrual',
      Follicular: 'Follicular',
      Ovulation:  'Ovulation',
      Luteal:     'Luteal',
    },
    categories: {
      grains:         'Grains',
      vegetables:     'Vegetables',
      fruits:         'Fruits',
      legumes:        'Legumes',
      'nuts & seeds': 'Nuts & Seeds',
      meat:           'Meat',
      seafood:        'Seafood',
      oils:           'Oils',
      spices:         'Spices & Herbs',
      beverages:      'Beverages',
      other:          'Other',
    },
  },
  pl: {
    cycleLabel:     'Cykl',
    seasonLabel:    'Sezon',
    placeLabel:     'Miejsce',
    inflammatory:   'Przeciwzapalna',
    cyclePageTitle:       'Faza cyklu',
    dietPageTitle:        'Filtry diety',
    dietCycle:            'Zgodna z cyklem',
    dietAntiInflammatory: 'Przeciwzapalna',
    dietEndoFriendly:     'Endo-przyjazna',
    locating:             'Wykrywam…',
    unknown:        'Nieznane',
    empty:          'Brak produktów dla wybranych kryteriów.',
    phases: {
      Menstrual:  'Menstruacyjna',
      Follicular: 'Folikularna',
      Ovulation:  'Owulacyjna',
      Luteal:     'Lutealna',
    },
    categories: {
      grains:         'Zboża',
      vegetables:     'Warzywa',
      fruits:         'Owoce',
      legumes:        'Strączkowe',
      'nuts & seeds': 'Orzechy i nasiona',
      meat:           'Mięso',
      seafood:        'Owoce morza',
      oils:           'Oleje',
      spices:         'Przyprawy i zioła',
      beverages:      'Napoje',
      other:          'Inne',
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
