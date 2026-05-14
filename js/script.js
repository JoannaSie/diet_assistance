// ── State ─────────────────────────────────────────────────
const currentMonth    = new Date().toLocaleString(dateLocale, { month: 'long' });
const currentMonthNum = new Date().getMonth() + 1;

const state = {
  cycle:    localStorage.getItem('cycle') || 'Luteal',
  season:   currentMonth,
  location: JSON.parse(localStorage.getItem('location') || 'null') || { city: '', region: 'dolnośląskie', country: 'Poland' },
  diets:    new Set(['cycle', 'anti_inflammatory']),
};

// Zastosuj statyczne tłumaczenia z data-i18n
applyTranslations();

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
const SUN_SVG = `<svg class="food-item__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4724a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M22 12H23M12 2V1M12 23V22M20 20L19 19M20 4L19 5M4 20L5 19M4 4L5 5M1 12H2M12 18C13.5913 18 15.1174 17.3679 16.2426 16.2426C17.3679 15.1174 18 13.5913 18 12C18 10.4087 17.3679 8.88258 16.2426 7.75736C15.1174 6.63214 13.5913 6 12 6C10.4087 6 8.88258 6.63214 7.75736 7.75736C6.63214 8.88258 6 10.4087 6 12C6 13.5913 6.63214 15.1174 7.75736 16.2426C8.88258 17.3679 10.4087 18 12 18Z"/>
</svg>`;

const PIN_SVG = `<svg class="food-item__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3a8a6e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M20 10C20 14.418 12 22 12 22C12 22 4 14.418 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z"/>
  <path d="M12 11C12.2652 11 12.5196 10.8946 12.7071 10.7071C12.8946 10.5196 13 10.2652 13 10C13 9.73478 12.8946 9.48043 12.7071 9.29289C12.5196 9.10536 12.2652 9 12 9C11.7348 9 11.4804 9.10536 11.2929 9.29289C11.1054 9.48043 11 9.73478 11 10C11 10.2652 11.1054 10.5196 11.2929 10.7071C11.4804 10.8946 11.7348 11 12 11Z" fill="#3a8a6e" stroke="#3a8a6e"/>
</svg>`;

const REMOVE_SVG = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M6.758 17.243L12.001 12L17.244 17.243M17.244 6.75702L12 12L6.758 6.75702"/>
</svg>`;

// ── Diet chip names ───────────────────────────────────────
const DIET_LABELS = {
  cycle:            () => tr('dietCycle'),
  anti_inflammatory:() => tr('dietAntiInflammatory'),
};

// ── Cycle chip visibility ─────────────────────────────────
function updateCycleChipVisibility() {
  document.getElementById('chip-cycle-wrapper').style.display =
    state.diets.has('cycle') ? '' : 'none';
}

// ── Render diet chips ─────────────────────────────────────
function renderDietChips() {
  const container = document.getElementById('diet-chips');
  container.innerHTML = [...state.diets]
    .filter(diet => diet !== 'cycle')
    .map(diet => `
    <div class="chip chip--diet">
      <span>${DIET_LABELS[diet]()}</span>
      <button class="chip__remove" data-diet="${diet}" aria-label="Remove">
        ${REMOVE_SVG}
      </button>
    </div>
  `).join('');

  container.querySelectorAll('.chip__remove').forEach(btn => {
    btn.addEventListener('click', () => {
      if (state.diets.size <= 1) return;
      state.diets.delete(btn.dataset.diet);
      renderDietChips();
      renderFoodSlider();
      updateDietOptions();
    });
  });
}

// ── Food slider — filtrowanie i render ────────────────────
function renderFoodSlider() {
  const slider   = document.getElementById('food-slider');
  const cycleKey = CYCLE_MAP[state.cycle] || 'lutealna';
  const countryName = typeof state.location === 'object'
    ? state.location.country || 'Poland'
    : 'Poland';

  let filtered = products;

  if (state.diets.has('cycle')) {
    filtered = filtered.filter(p => p.cycle_phase.includes(cycleKey));
  }
  if (state.diets.has('anti_inflammatory')) {
    filtered = filtered.filter(p => p.anti_inflammatory === true);
  }

  filtered = filtered.map(p => {
    const avail = p.localAvailability?.[countryName];
    return {
      ...p,
      inSeason: avail ? isInSeason(avail.months, currentMonthNum) : false,
      isLocal:  !!avail,
    };
  });

  const grouped = {};
  filtered.forEach(p => {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  });
  Object.keys(grouped).forEach(cat => {
    grouped[cat].sort((a, b) => {
      if (b.isLocal  !== a.isLocal)  return b.isLocal  - a.isLocal;
      if (b.inSeason !== a.inSeason) return b.inSeason - a.inSeason;
      return 0;
    });
    grouped[cat] = grouped[cat].map(p => ({
      name: lang === 'pl' ? (p.name_pl || p.name) : p.name,
      inSeason: p.inSeason, isLocal: p.isLocal,
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

document.getElementById('chip-cycle-remove').addEventListener('click', () => {
  state.diets.delete('cycle');
  updateCycleChipVisibility();
  updateDietOptions();
  renderFoodSlider();
});
document.getElementById('cycle-close').addEventListener('click', closeCyclePage);

document.querySelectorAll('.cycle-option').forEach(btn => {
  btn.addEventListener('click', () => {
    state.cycle = btn.dataset.value;
    localStorage.setItem('cycle', state.cycle);
    cycleLabel.textContent = tr(`phases.${state.cycle}`);
    closeCyclePage();
    renderFoodSlider();
  });
});

// ── Diet page ─────────────────────────────────────────────
const pageDiet = document.getElementById('page-diet');

function openDietPage() {
  pageDiet.classList.add('page--open');
  pageDiet.removeAttribute('aria-hidden');
  updateDietOptions();
}
function closeDietPage() {
  pageDiet.classList.remove('page--open');
  pageDiet.setAttribute('aria-hidden', 'true');
}
function updateDietOptions() {
  document.querySelectorAll('.diet-option').forEach(btn => {
    btn.classList.toggle('diet-option--selected', state.diets.has(btn.dataset.value));
  });
}

document.getElementById('btn-add-diet').addEventListener('click', openDietPage);
document.getElementById('diet-close').addEventListener('click', closeDietPage);

document.querySelectorAll('.diet-option').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.dataset.value;
    if (state.diets.has(val)) {
      if (state.diets.size <= 1) return;
      state.diets.delete(val);
    } else {
      state.diets.add(val);
    }
    updateDietOptions();
    updateCycleChipVisibility();
    renderDietChips();
    renderFoodSlider();
  });
});

// ── Location — geolocation + BigDataCloud reverse geocoding ──
const locationLabel = document.getElementById('location-label');

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
    localStorage.setItem('location', JSON.stringify(state.location));
    locationLabel.textContent = state.location.country || state.location.city || t.unknown;
    renderFoodSlider();
  } catch {
    locationLabel.textContent = state.location.country || t.unknown;
  }
}

if (!localStorage.getItem('location') && navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => reverseGeocode(coords.latitude, coords.longitude),
    () => {},
    { timeout: 10000 }
  );
}

// ── Header scroll shadow ──────────────────────────────────
const headerEl = document.querySelector('.header');
window.addEventListener('scroll', () => {
  headerEl.classList.toggle('header--scrolled', window.scrollY > 0);
}, { passive: true });

// ── Init ──────────────────────────────────────────────────
document.getElementById('location-label').textContent =
  state.location.country || state.location.city || 'Poland';
updateCycleChipVisibility();
renderDietChips();
renderFoodSlider();
