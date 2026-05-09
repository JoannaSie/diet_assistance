// ── State ─────────────────────────────────────────────────
// dateLocale i tr() są dostępne z i18n.js (ładowanego wcześniej)
const currentMonth    = new Date().toLocaleString(dateLocale, { month: 'long' });
const currentMonthNum = new Date().getMonth() + 1;

const state = {
  cycle:    'Luteal',
  season:   currentMonth,
  location: { city: '', region: 'dolnośląskie', country: 'Poland' },
  diet:     'Inflammatory',
};

// Zastosuj statyczne tłumaczenia z data-i18n
applyTranslations();

// Ustaw miesiąc i etykietę fazy w aktualnym języku
document.getElementById('season-label').textContent = state.season;
document.getElementById('cycle-label').textContent  = tr(`phases.${state.cycle}`);

// ── Mapowania ──────────────────────────────────────────────
const CYCLE_MAP = {
  Luteal:     'lutealna',
  Follicular: 'folikularna',
  Ovulation:  'owulacyjna',
  Menstrual:  'menstruacyjna',
};

const REGION_MAP = {
  'Lower Silesian Voivodeship':      'dolnośląskie',
  'Kuyavian-Pomeranian Voivodeship': 'kujawsko-pomorskie',
  'Lublin Voivodeship':              'lubelskie',
  'Lubusz Voivodeship':              'lubuskie',
  'Łódź Voivodeship':                'łódzkie',
  'Lodz Voivodeship':                'łódzkie',
  'Lesser Poland Voivodeship':       'małopolskie',
  'Masovian Voivodeship':            'mazowieckie',
  'Opole Voivodeship':               'opolskie',
  'Subcarpathian Voivodeship':       'podkarpackie',
  'Podlaskie Voivodeship':           'podlaskie',
  'Pomeranian Voivodeship':          'pomorskie',
  'Silesian Voivodeship':            'śląskie',
  'Świętokrzyskie Voivodeship':      'świętokrzyskie',
  'Swietokrzyskie Voivodeship':      'świętokrzyskie',
  'Warmian-Masurian Voivodeship':    'warmińsko-mazurskie',
  'Greater Poland Voivodeship':      'wielkopolskie',
  'West Pomeranian Voivodeship':     'zachodniopomorskie',
};

// ── SVG icons ─────────────────────────────────────────────
const SUN_SVG = `<svg class="food-item__icon" width="20" height="20" viewBox="0 0 256 256" fill="#d4724a" aria-hidden="true">
  <path d="M120,40V24a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.1,64.1,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48,48,0,0,0,176,128ZM58.3,69.7,46.3,57.7A8.1,8.1,0,0,1,57.7,46.3L69.7,58.3A8.1,8.1,0,0,1,58.3,69.7Zm0,116.6A8.1,8.1,0,0,1,69.7,197.7L57.7,209.7A8.1,8.1,0,0,1,46.3,198.3ZM224,120h-16a8,8,0,0,0,0,16h16a8,8,0,0,0,0-16ZM40,120H24a8,8,0,0,0,0,16H40a8,8,0,0,0,0-16ZM197.7,57.7a8.1,8.1,0,0,1,11.4,11.4L197.7,81.1a8.1,8.1,0,0,1-11.4-11.4Zm0,140.6-11.4-11.4a8.1,8.1,0,0,1,11.4-11.4l11.4,11.4A8.1,8.1,0,0,1,197.7,198.3ZM120,216v16a8,8,0,0,0,16,0V216a8,8,0,0,0-16,0Z"/>
</svg>`;

const PIN_SVG = `<svg class="food-item__icon" width="20" height="20" viewBox="0 0 256 256" fill="#3a8a6e" aria-hidden="true">
  <path d="M128,24A80,80,0,1,0,208,104c0,72-80,128-80,128S48,176,48,104A80,80,0,0,1,128,24Zm0,112a32,32,0,1,0-32-32A32,32,0,0,0,128,136Z"/>
</svg>`;

// ── Food slider — filtrowanie i render ────────────────────
function renderFoodSlider() {
  const slider   = document.getElementById('food-slider');
  const cycleKey = CYCLE_MAP[state.cycle] || 'lutealna';

  const countryName = typeof state.location === 'object'
    ? state.location.country || 'Polska'
    : 'Polska';

  const filtered = products
    .filter(p => p.cycle_phase.includes(cycleKey))
    .map(p => ({
      ...p,
      inSeason: isInSeason(p.months, currentMonthNum),
      isLocal:  p.country === countryName,
    }));

  const grouped = {};
  filtered.forEach(p => {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  });
  Object.keys(grouped).forEach(cat => {
    grouped[cat].sort((a, b) => {
      if (b.isLocal  !== a.isLocal)  return b.isLocal  - a.isLocal;
      if (b.inSeason !== a.inSeason) return b.inSeason - a.inSeason;
      return (b.regions !== null ? 1 : 0) - (a.regions !== null ? 1 : 0);
    });
    grouped[cat] = grouped[cat].map(p => ({
      name:     p.name,
      inSeason: p.inSeason,
      isLocal:  p.isLocal,
    }));
  });

  const categories = Object.keys(grouped);

  if (categories.length === 0) {
    slider.innerHTML = `<p class="food-slider--empty">${t.empty}</p>`;
    return;
  }

  slider.innerHTML = categories.map(cat => `
    <div class="food-category">
      <span class="food-category__name">${trCategory(cat)}</span>
      <div class="food-category__list">
        ${grouped[cat].map(({ name, inSeason, isLocal }) => `
          <div class="food-item">
            <span class="food-item__name">${name}</span>
            ${inSeason ? SUN_SVG : ''}
            ${isLocal  ? PIN_SVG : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

renderFoodSlider();

// ── Cycle page ────────────────────────────────────────────
const pageCycle  = document.getElementById('page-cycle');
const cycleLabel = document.getElementById('cycle-label');

function openCyclePage() {
  pageCycle.classList.add('page--open');
  pageCycle.removeAttribute('aria-hidden');
  updateCycleOptions();
}

function closeCyclePage() {
  pageCycle.classList.remove('page--open');
  pageCycle.setAttribute('aria-hidden', 'true');
}

function updateCycleOptions() {
  document.querySelectorAll('.cycle-option').forEach(btn => {
    btn.classList.toggle('cycle-option--selected', btn.dataset.value === state.cycle);
  });
}

document.getElementById('chip-cycle').addEventListener('click', openCyclePage);
document.getElementById('cycle-close').addEventListener('click', closeCyclePage);

document.querySelectorAll('.cycle-option').forEach(btn => {
  btn.addEventListener('click', () => {
    state.cycle = btn.dataset.value;
    cycleLabel.textContent = tr(`phases.${state.cycle}`);
    closeCyclePage();
    renderFoodSlider();
  });
});

// ── Location — geolocation + BigDataCloud reverse geocoding ──
const locationLabel = document.getElementById('location-label');

function fetchLocation() {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => reverseGeocode(coords.latitude, coords.longitude),
    () => {},
    { timeout: 10000 }
  );
}

async function reverseGeocode(lat, lon) {
  try {
    const url  = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
    const res  = await fetch(url);
    const data = await res.json();

    const rawRegion = data.principalSubdivision || '';
    state.location = {
      city:    data.city || data.locality || '',
      region:  REGION_MAP[rawRegion] || rawRegion.toLowerCase(),
      country: data.countryName || '',
    };

    locationLabel.textContent = state.location.country || state.location.city || t.unknown;
    renderFoodSlider();
  } catch {
    locationLabel.textContent = state.location.country || t.unknown;
  }
}

fetchLocation();
