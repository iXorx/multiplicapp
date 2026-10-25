import './style.css';

const STORAGE_KEY = 'zoo-de-taules.v1';
const THEME_KEY = 'zoo-de-taules.theme';
const SHOP_UNLOCK_POINTS = 60;
const FEED_COST = 5;
const ANIMAL_MILESTONE = 3;
const HUNGER_ERROR_THRESHOLD = 3;
const MAP_PRACTICE_REQUIRED = 10;
const MAP_LEVEL_KEYS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'all'];
const MAP_DURATION_MS = 40_000;
const ANIMALS = [
  { species: 'conill', name: 'Conill', emoji: '🐰', home: 'Prat verd', habitat: 'meadow', nicknames: ['Pastanaguet', 'Saltiró', 'Bunyolet'] },
  { species: 'tortuga', name: 'Tortuga', emoji: '🐢', home: 'Estany tranquil', habitat: 'lake', nicknames: ['Lenta McQueen', 'Closqueta', 'Turbo'] },
  { species: 'guineu', name: 'Guineu', emoji: '🦊', home: 'Bosc petit', habitat: 'forest', nicknames: ['Guineuet', 'Cua-roja', 'Fox Mulder'] },
  { species: 'elefant', name: 'Elefant', emoji: '🐘', home: 'Savana alegre', habitat: 'savanna', nicknames: ['Trompeta', 'Dumbolet', 'Mastegaxiclets'] },
  { species: 'panda', name: 'Panda', emoji: '🐼', home: 'Bosc de bambú', habitat: 'forest', nicknames: ['Bambunet', 'Oreo', 'Panxeta'] },
  { species: 'girafa', name: 'Girafa', emoji: '🦒', home: 'Savana alta', habitat: 'savanna', nicknames: ['Coll llarg', 'Semàfor', 'Torreta'] },
  { species: 'lleo', name: 'Lleó', emoji: '🦁', home: 'Rocallosa', habitat: 'savanna', nicknames: ['Melena', 'Rei Mandrós', 'Lleonet'] },
  { species: 'pingui', name: 'Pingüí', emoji: '🐧', home: 'Platja fresqueta', habitat: 'lake', nicknames: ['Patinets', 'Fracasset', 'Calfred'] },
  { species: 'mico', name: 'Mico', emoji: '🐵', home: 'Bosc dels arbres', habitat: 'forest', nicknames: ['Pessigolles', 'Plàtanet', 'Trapezista'] },
  { species: 'koala', name: 'Koala', emoji: '🐨', home: 'Bosc d’eucaliptus', habitat: 'forest', nicknames: ['Migdiades', 'Fullola', 'Koaleta'] },
  { species: 'zebra', name: 'Zebra', emoji: '🦓', home: 'Savana ratllada', habitat: 'savanna', nicknames: ['Ratlles', 'Codi de barres', 'Pijama'] },
  { species: 'hipopotam', name: 'Hipopòtam', emoji: '🦛', home: 'Riuet fresc', habitat: 'lake', nicknames: ['Hipo-potam', 'Banyetes', 'Xip-xap'] },
  { species: 'cocodril', name: 'Cocodril', emoji: '🐊', home: 'Riba del llac', habitat: 'lake', nicknames: ['Cocodril·la', 'Dentetes', 'Somriures'] },
  { species: 'flamenc', name: 'Flamenc', emoji: '🦩', home: 'Llac rosa', habitat: 'lake', nicknames: ['Cames llargues', 'Flamenqueta', 'Rosa Parks'] },
  { species: 'lludria', name: 'Llúdria', emoji: '🦦', home: 'Riu juganer', habitat: 'lake', nicknames: ['Bombolles', 'Rellisca', 'Llu-drieta'] },
  { species: 'peresos', name: 'Peresós', emoji: '🦥', home: 'Branques tranquil·les', habitat: 'forest', nicknames: ['Demà', 'Migdiada', 'Lentíssim'] },
  { species: 'suricata', name: 'Suricata', emoji: '🐿️', home: 'Prat vigilant', habitat: 'meadow', nicknames: ['Vigilet', 'Xafarder', 'Guaita'] },
  { species: 'lloro', name: 'Lloro', emoji: '🦜', home: 'Bosc tropical', habitat: 'forest', nicknames: ['Xerrameca', 'Repetiti', 'A veure, a veure!'] },
  { species: 'granota', name: 'Granota', emoji: '🐸', home: 'Estany dels salts', habitat: 'lake', nicknames: ['Croac Obama', 'Saltamarges', 'Granoteta'] },
  { species: 'cervol', name: 'Cérvol', emoji: '🦌', home: 'Clariana del bosc', habitat: 'forest', nicknames: ['Banyetes', 'Saltabosc', 'Rudolfet'] },
  { species: 'eriço', name: 'Eriçó', emoji: '🦔', home: 'Racó de fulles', habitat: 'forest', nicknames: ['Punxetes', 'Bolet', 'Pentinat'] },
  { species: 'esquirol', name: 'Esquirol', emoji: '🐿️', home: 'Alzinar', habitat: 'forest', nicknames: ['Ametlleta', 'Cua-bonica', 'Amaga-nous'] },
  { species: 'camell', name: 'Camell', emoji: '🐫', home: 'Dunes daurades', habitat: 'savanna', nicknames: ['Gepet', 'Camel·lícia', 'Desertini'] },
  { species: 'cangur', name: 'Cangur', emoji: '🦘', home: 'Prat saltador', habitat: 'meadow', nicknames: ['Butxaques', 'Saltamarges', 'Kangurú'] },
  { species: 'paó', name: 'Paó', emoji: '🦚', home: 'Jardí reial', habitat: 'forest', nicknames: ['Pavoneig', 'Ventall', 'Sua majestat'] },
  { species: 'gat', name: 'Gat', emoji: '🐈', home: 'Racó assolellat', habitat: 'meadow', nicknames: ['Smoke', 'Boleta', 'Miau'] },
  { species: 'rata', name: 'Rata', emoji: '🐀', home: 'Raconet del bosc', habitat: 'forest', nicknames: ['Puchi', 'Rateta', 'Ratita'] },
];
const setup = {
  answers: document.querySelector('#answers'),
  gameCard: document.querySelector('.game-card'),
  questionFirst: document.querySelector('#question-first'),
  questionSecond: document.querySelector('#question-second'),
  feedback: document.querySelector('#feedback'),
  nextButton: document.querySelector('#next-button'),
  tablePicker: document.querySelector('.table-picker'),
  selectedTables: Array.prototype.slice.call(document.querySelectorAll('.table-choice')),
  notice: document.querySelector('#save-notice'),
  questionPrompt: document.querySelector('#answer-prompt'),
  themeButton: document.querySelector('#theme-button'),
  mapToggleButton: document.querySelector('#map-toggle-button'),
  mapTimer: document.querySelector('#map-timer'),
  practiceGate: document.querySelector('#practice-gate'),
};

let state = loadState();
let currentTheme = loadTheme();
let selectedTable = state.activePracticeLevel === 'all' ? 'all' : Number(state.activePracticeLevel) || 2;
let currentQuestion = null;
const askedQuestions = new Set();
let answered = true;
let questionStartedAt = 0;
let shopPausedAt = 0;
let shopIsOpen = false;
let animalAnimationTimeout = 0;
let mapExpanded = false;
let mapOpenedAt = 0;
let mapEndsAt = 0;
let mapTimerInterval = 0;
let mapTimerTimeout = 0;
let nextQuestionTimeout = 0;
let mapSessionLevel = null;

function freshState() {
  return {
    coins: 0,
    lifetimePoints: 0,
    correct: 0,
    wrongAnswers: 0,
    streak: 0,
    answers: 0,
    animals: [],
    nextAnimalId: 1,
    buildProgress: 0,
    shopUnlocked: false,
    meals: 0,
    mapPracticeByLevel: {},
    questionsAskedByLevel: {},
    activePracticeLevel: null,
    hungerProgress: 0,
    pendingHunger: 0,
  };
}

function nicknameFor(species, count) {
  const nicknames = animalFor(species).nicknames;
  const nickname = nicknames[(count - 1) % nicknames.length];
  return count > nicknames.length ? `${nickname} ${count}` : nickname;
}

function loadState() {
  let saved;
  try {
    saved = window.localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    showSaveNotice('Aquest iPad no permet desar les dades. Pots jugar, però el zoo no es recordarà quan tanquis la pàgina.');
    return freshState();
  }
  if (!saved) return freshState();

  try {
    const data = JSON.parse(saved);
    if (!data || typeof data !== 'object' || !Array.isArray(data.animals)) {
      throw new Error('Les dades del zoo no tenen el format esperat.');
    }
    const defaults = freshState();
    const wrongAnswers = data.wrongAnswers === undefined
      ? Math.max(0, Number(data.answers || 0) - Number(data.correct || 0))
      : Math.max(0, Math.floor(Number(data.wrongAnswers) || 0));
    const hasSavedQuestionSets = data.questionsAskedByLevel && typeof data.questionsAskedByLevel === 'object';
    const mapPracticeByLevel = Object.fromEntries(
      MAP_LEVEL_KEYS.map((level) => [
        level,
        hasSavedQuestionSets
          ? Math.min(
            MAP_PRACTICE_REQUIRED,
            Math.max(0, Math.floor(Number(data.mapPracticeByLevel?.[level]) || 0)),
          )
          : 0,
      ]),
    );
    const questionsAskedByLevel = Object.fromEntries(
      MAP_LEVEL_KEYS.map((level) => [
        level,
        Array.isArray(data.questionsAskedByLevel?.[level])
          ? [...new Set(data.questionsAskedByLevel[level].filter((key) => typeof key === 'string'))]
          : [],
      ]),
    );
    const loaded = {
      coins: Math.max(0, Math.floor(Number(data.coins) || 0)),
      lifetimePoints: Math.max(0, Math.floor(Number(data.lifetimePoints) || 0)),
      correct: Math.max(0, Math.floor(Number(data.correct) || 0)),
      wrongAnswers,
      streak: Math.max(0, Math.floor(Number(data.streak) || 0)),
      answers: Math.max(0, Math.floor(Number(data.answers) || 0)),
      animals: data.animals
        .filter((animal) =>
          animal && typeof animal.id === 'number' && ANIMALS.some((species) => species.species === animal.species),
        )
        .map((animal, index, animals) => {
          const nicknameCount = animals.slice(0, index + 1).filter((entry) => entry.species === animal.species).length;
          return {
            ...animal,
            hungry: Boolean(animal.hungry),
            nickname: typeof animal.nickname === 'string' && animal.nickname.trim()
              ? animal.nickname
              : nicknameFor(animal.species, nicknameCount),
          };
        }),
      nextAnimalId: Math.max(1, Math.floor(Number(data.nextAnimalId) || 1)),
      buildProgress: Math.max(0, Math.floor(Number(data.buildProgress) || 0)) % ANIMAL_MILESTONE,
      shopUnlocked: Boolean(data.shopUnlocked),
      meals: Math.max(0, Math.floor(Number(data.meals) || 0)),
      hungerProgress: Math.max(
        0,
        Math.min(
          HUNGER_ERROR_THRESHOLD - 1,
          Math.floor(Number(data.hungerProgress) || wrongAnswers % HUNGER_ERROR_THRESHOLD),
        ),
      ),
      pendingHunger: Math.max(0, Math.floor(Number(data.pendingHunger) || 0)),
      mapPracticeByLevel,
      questionsAskedByLevel,
      activePracticeLevel: hasSavedQuestionSets && MAP_LEVEL_KEYS.includes(String(data.activePracticeLevel))
        ? String(data.activePracticeLevel)
        : null,
    };
    loaded.shopUnlocked = loaded.shopUnlocked || loaded.lifetimePoints >= SHOP_UNLOCK_POINTS;
    return Object.assign(defaults, loaded);
  } catch (error) {
    console.warn('No s’ha pogut llegir el progrés del zoo; se n’iniciarà un de nou.', error);
    showSaveNotice('No s’han pogut llegir les dades guardades. Comencem un zoo nou; prova de recarregar la pàgina si no t’ho esperaves.');
    return freshState();
  }
}

function loadTheme() {
  try {
    return window.localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark';
  } catch (error) {
    console.warn('No s’ha pogut llegir el tema desat; s’utilitzarà el mode fosc.', error);
    return 'dark';
  }
}

function updateTheme() {
  document.documentElement.dataset.theme = currentTheme;
  document.querySelector('meta[name="theme-color"]').content = currentTheme === 'dark' ? '#111a17' : '#f6f3e9';
  setup.themeButton.setAttribute('aria-label', `Canvia al mode ${currentTheme === 'dark' ? 'clar' : 'fosc'}`);
  setup.themeButton.querySelector('[aria-hidden="true"]').textContent = currentTheme === 'dark' ? '☀️' : '🌙';
  setup.themeButton.querySelector('.theme-label').textContent = currentTheme === 'dark' ? 'Mode clar' : 'Mode fosc';
}

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  updateTheme();
  try {
    window.localStorage.setItem(THEME_KEY, currentTheme);
  } catch (error) {
    showSaveNotice('No s’ha pogut desar el tema. Es mantindrà fins que tanquis aquesta pàgina.');
    console.error('No s’ha pogut desar el tema del zoo.', error);
  }
}

function showSaveNotice(message) {
  const notice = document.querySelector('#save-notice');
  notice.textContent = message;
  notice.hidden = false;
}

function saveState() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    showSaveNotice('No s’han pogut desar els canvis. Comprova l’espai lliure i la configuració de Safari.');
    console.error('No s’ha pogut desar el progrés del zoo.', error);
  }
}

function animalFor(species) {
  return ANIMALS.filter((animal) => animal.species === species)[0];
}

function makeAnimal(species) {
  const nicknameCount = state.animals.filter((animal) => animal.species === species).length + 1;
  const animal = {
    id: state.nextAnimalId,
    species,
    nickname: nicknameFor(species, nicknameCount),
    fedAt: 0,
    hungry: false,
  };
  if (state.pendingHunger > 0) {
    animal.hungry = true;
    state.pendingHunger -= 1;
  }
  state.nextAnimalId += 1;
  state.animals.push(animal);
  return animal;
}

function createAnimalCard(animal, inShop) {
  const species = animalFor(animal.species);
  const card = document.createElement('article');
  card.className = inShop ? 'animal-card shop-animal-card' : 'animal-card';

  const emoji = document.createElement('span');
  emoji.className = 'animal-emoji';
  emoji.setAttribute('aria-hidden', 'true');
  emoji.textContent = species.emoji;
  card.appendChild(emoji);

  const name = document.createElement('strong');
  name.className = 'animal-name';
  name.textContent = animal.nickname;
  card.appendChild(name);

  if (inShop) {
    if (animal.hungry) {
      const hungerStatus = document.createElement('span');
      hungerStatus.className = 'animal-hunger-status';
      hungerStatus.textContent = '🍽️ Tinc gana';
      card.appendChild(hungerStatus);
    }
    const feedButton = document.createElement('button');
    feedButton.className = 'feed-button';
    feedButton.type = 'button';
    feedButton.textContent = `Donar menjar · ${FEED_COST} 🪙`;
    feedButton.setAttribute('aria-label', `Donar menjar a ${animal.nickname}, ${species.name}, per ${FEED_COST} monedes`);
    feedButton.disabled = state.coins < FEED_COST;
    feedButton.addEventListener('click', () => feedAnimal(animal.id));
    card.appendChild(feedButton);
  }
  return card;
}

const HABITAT_POSITIONS = {
  meadow: [[29, 51], [41, 66], [19, 64], [38, 39], [47, 53]],
  lake: [[57, 66], [92, 66], [57, 89], [92, 89]],
  forest: [[21, 32], [80, 30], [24, 71], [37, 35], [88, 58], [39, 73]],
  savanna: [[55, 46], [68, 57], [49, 68], [62, 34], [88, 43]],
};

function createAnimalZone(animal, position) {
  const species = animalFor(animal.species);
  const zone = document.createElement('article');
  const recentlyFed = animal.fedAt && Date.now() - animal.fedAt < 1800;
  zone.className = ['map-animal', recentlyFed ? 'animal-moving' : '', animal.hungry ? 'animal-hungry' : '']
    .filter(Boolean)
    .join(' ');
  zone.style.left = `${position[0]}%`;
  zone.style.top = `${position[1]}%`;
  zone.setAttribute('aria-label', `${animal.nickname}, ${species.name}, ${animal.hungry ? 'té gana' : `a ${species.home}`}`);

  const emoji = document.createElement('span');
  emoji.className = 'animal-avatar';
  emoji.setAttribute('aria-hidden', 'true');
  emoji.textContent = species.emoji;
  zone.appendChild(emoji);

  const name = document.createElement('strong');
  name.className = 'animal-caption';
  name.textContent = animal.nickname;
  zone.appendChild(name);

  if (recentlyFed || animal.hungry) {
    const speech = document.createElement('span');
    speech.className = 'animal-speech';
    speech.textContent = animal.hungry ? 'Tinc gana!' : 'Nyam! Quin festí!';
    zone.appendChild(speech);
  }

  return zone;
}

function clearChildren(element) {
  while (element.firstChild) element.removeChild(element.firstChild);
}

function renderZoo() {
  const animalList = document.querySelector('#animal-list');
  clearChildren(animalList);
  window.clearTimeout(animalAnimationTimeout);
  const habitatCounts = { meadow: 0, lake: 0, forest: 0, savanna: 0 };
  state.animals.forEach((animal) => {
    const habitat = animalFor(animal.species).habitat;
    const positions = HABITAT_POSITIONS[habitat];
    const position = positions[habitatCounts[habitat] % positions.length];
    const repeatOffset = Math.floor(habitatCounts[habitat] / positions.length) * 4;
    habitatCounts[habitat] += 1;
    animalList.appendChild(createAnimalZone(animal, [Math.min(94, position[0] + repeatOffset), position[1]]));
  });
  const nextFeedExpiry = state.animals
    .filter((animal) => animal.fedAt && Date.now() - animal.fedAt < 1800)
    .reduce((earliest, animal) => Math.min(earliest, animal.fedAt + 1800), Infinity);
  if (Number.isFinite(nextFeedExpiry)) {
    animalAnimationTimeout = window.setTimeout(renderZoo, nextFeedExpiry - Date.now() + 20);
  }

  document.querySelector('#empty-zoo').hidden = state.animals.length > 0;
  document.querySelector('#animal-count').textContent = state.animals.length;
  document.querySelector('#animal-count-label').textContent = state.animals.length === 1 ? 'animal' : 'animals';
  const remaining = state.buildProgress === 0 ? ANIMAL_MILESTONE : ANIMAL_MILESTONE - state.buildProgress;
  document.querySelector('#build-count').textContent = `${state.buildProgress} / ${ANIMAL_MILESTONE}`;
  document.querySelector('.progress-track').setAttribute('aria-valuenow', String(state.buildProgress));
  document.querySelector('#progress-fill').style.width = `${state.buildProgress / ANIMAL_MILESTONE * 100}%`;
  document.querySelector('#build-message').textContent = state.animals.length === 0 && state.buildProgress === 0
    ? 'Contesta bé per construir el zoo'
    : `Un nou animal després de ${remaining} ${remaining === 1 ? 'encert' : 'encerts'}`;
  updateMapControls();

  const description = document.querySelector('#zoo-description');
  description.textContent = state.animals.length === 0
    ? 'Cada tres encerts, arriba un animal nou. Comencem a construir?'
    : state.animals.length === 1
      ? 'Ja tens un animalet! Fes-li companyia i amplia el zoo.'
      : `Ja tens ${state.animals.length} animalets! Fes-los companyia i amplia el zoo.`;
  renderShop();
}

function updateMapControls() {
  const progress = state.mapPracticeByLevel[String(selectedTable)] || 0;
  const ready = progress >= MAP_PRACTICE_REQUIRED;
  setup.mapToggleButton.disabled = !mapExpanded && !ready;
  setup.mapToggleButton.setAttribute('aria-expanded', String(mapExpanded));
  document.querySelector('#map-toggle-icon').textContent = mapExpanded ? '↙️' : ready ? '🗺️' : '🔒';
  document.querySelector('#map-toggle-label').textContent = mapExpanded
    ? 'Torna a practicar'
    : ready
      ? 'Ampliar mapa'
      : `Mapa · ${progress}/${MAP_PRACTICE_REQUIRED}`;
  document.querySelector('#open-shop-button').hidden = !mapExpanded;
  updateTablePicker();
}

function updateTablePicker() {
  const locked = mapExpanded || !answered || Boolean(state.activePracticeLevel);
  setup.tablePicker.hidden = locked;
  setup.selectedTables.forEach((button) => {
    button.disabled = locked;
  });
}

function updateMapTimer() {
  const seconds = Math.max(0, Math.ceil((mapEndsAt - Date.now()) / 1000));
  setup.mapTimer.textContent = `⏳ ${seconds} s`;
  if (seconds === 0) finishMapSession();
}

function enterMap() {
  const level = String(selectedTable);
  if (mapExpanded || (state.mapPracticeByLevel[level] || 0) < MAP_PRACTICE_REQUIRED) return;
  if (answered && nextQuestionTimeout) {
    window.clearTimeout(nextQuestionTimeout);
    nextQuestionTimeout = 0;
  }
  mapExpanded = true;
  mapOpenedAt = Date.now();
  mapEndsAt = mapOpenedAt + MAP_DURATION_MS;
  mapSessionLevel = level;
  shopIsOpen = false;
  state.mapPracticeByLevel[mapSessionLevel] = 0;
  state.questionsAskedByLevel[mapSessionLevel] = [];
  state.activePracticeLevel = null;
  saveState();
  document.querySelector('.app').classList.add('map-expanded');
  setup.mapTimer.hidden = false;
  updateMapControls();
  updateMapTimer();
  mapTimerInterval = window.setInterval(updateMapTimer, 1000);
  mapTimerTimeout = window.setTimeout(finishMapSession, MAP_DURATION_MS);
  renderShop();
}

function finishMapSession() {
  if (!mapExpanded) return;
  closeMapSession();
  setup.practiceGate.showModal();
}

function closeMapSession() {
  window.clearInterval(mapTimerInterval);
  window.clearTimeout(mapTimerTimeout);
  mapTimerInterval = 0;
  mapTimerTimeout = 0;
  if (!answered) questionStartedAt += Date.now() - mapOpenedAt;
  mapExpanded = false;
  shopIsOpen = false;
  shopPausedAt = 0;
  if (mapSessionLevel) state.mapPracticeByLevel[mapSessionLevel] = 0;
  mapSessionLevel = null;
  document.querySelector('.app').classList.remove('map-expanded');
  setup.mapTimer.hidden = true;
  saveState();
  updateMapControls();
  renderShop();
}

function collapseMapSession() {
  if (!mapExpanded) return;
  closeMapSession();
  if (answered) startNextQuestion();
  setup.mapToggleButton.focus();
}

function returnToPractice() {
  setup.practiceGate.close();
  setup.mapToggleButton.focus();
  if (answered) startNextQuestion();
}

function nextAnimalOffer() {
  return ANIMALS[state.animals.length % ANIMALS.length];
}

function animalPrice() {
  return 40 + state.animals.length * 25 + Math.floor(state.animals.length / 3) * 15;
}

function renderShop() {
  document.querySelector('#coin-count').textContent = state.coins;
  document.querySelector('#streak-count').textContent = state.streak;

  const button = document.querySelector('#open-shop-button');
  const label = document.querySelector('#shop-button-label');
  const lock = document.querySelector('#shop-lock');
  button.disabled = !state.shopUnlocked;
  lock.textContent = state.shopUnlocked ? '🛍️' : '🔒';
  label.textContent = state.shopUnlocked
    ? (shopIsOpen ? 'Torna al joc' : 'Visita la botiga')
    : `Botiga · ${Math.max(0, SHOP_UNLOCK_POINTS - state.lifetimePoints)} monedes per obrir`;
  button.setAttribute('aria-expanded', String(shopIsOpen));

  const shop = document.querySelector('#shop-view');
  shop.hidden = !mapExpanded || !shopIsOpen || !state.shopUnlocked;
  const species = nextAnimalOffer();
  const price = animalPrice();
  const offer = document.querySelector('#animal-offer');
  clearChildren(offer);
  const animalPreview = document.createElement('span');
  animalPreview.className = 'offer-animal-emoji';
  animalPreview.setAttribute('aria-hidden', 'true');
  animalPreview.textContent = species.emoji;
  offer.appendChild(animalPreview);

  const copy = document.createElement('div');
  copy.className = 'offer-copy';
  const name = document.createElement('strong');
  name.textContent = `Nova incorporació: ${species.name}`;
  copy.appendChild(name);
  offer.appendChild(copy);

  const buy = document.createElement('button');
  buy.className = 'buy-button';
  buy.type = 'button';
  buy.textContent = `${price} 🪙`;
  buy.disabled = state.coins < price;
  buy.setAttribute('aria-label', `Adoptar un altre ${species.name}, per ${price} monedes`);
  buy.addEventListener('click', buyAnimal);
  offer.appendChild(buy);

  const shopAnimals = document.querySelector('#shop-animal-list');
  if (shopAnimals) {
    clearChildren(shopAnimals);
    state.animals.forEach((animal) => shopAnimals.appendChild(createAnimalCard(animal, true)));
  }
}

function renderQuestion() {
  setup.gameCard.classList.add('is-question-active');
  let practiceStarted = false;
  if (!state.activePracticeLevel) {
    state.activePracticeLevel = String(selectedTable);
    if (state.mapPracticeByLevel[state.activePracticeLevel] >= MAP_PRACTICE_REQUIRED) {
      state.mapPracticeByLevel[state.activePracticeLevel] = 0;
    }
    state.questionsAskedByLevel[state.activePracticeLevel] = [];
    practiceStarted = true;
  } else {
    selectedTable = state.activePracticeLevel === 'all' ? 'all' : Number(state.activePracticeLevel);
  }
  if (practiceStarted) saveState();
  askedQuestions.clear();
  (state.questionsAskedByLevel[String(selectedTable)] || []).forEach((key) => askedQuestions.add(key));

  const questions = [];
  const questionKeys = new Set();
  const firstTables = selectedTable === 'all' ? Array.from({ length: 9 }, (_, index) => index + 2) : [selectedTable];
  firstTables.forEach((firstTable) => {
    for (let multiplier = 1; multiplier <= 10; multiplier += 1) {
      const key = `${Math.min(firstTable, multiplier)}x${Math.max(firstTable, multiplier)}`;
      if (questionKeys.has(key)) continue;
      questionKeys.add(key);
      questions.push({ first: firstTable, second: multiplier, key });
    }
  });
  let availableQuestions = questions.filter((question) => !askedQuestions.has(question.key));
  if (availableQuestions.length === 0) {
    askedQuestions.clear();
    availableQuestions = questions;
  }
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  const { first, second, key } = availableQuestions[questionIndex];
  const result = first * second;
  const options = [result];
  const maximumDistance = Math.max(5, 12 - state.streak);
  const distractors = [];
  for (let value = Math.max(1, result - maximumDistance); value <= result + maximumDistance; value += 1) {
    if (value !== result) distractors.push(value);
  }
  while (options.length < 6) {
    const index = Math.floor(Math.random() * distractors.length);
    options.push(distractors.splice(index, 1)[0]);
  }
  options.sort(() => Math.random() - 0.5);
  currentQuestion = { first, second, key, result, options };
  answered = false;
  questionStartedAt = Date.now();
  shopPausedAt = shopIsOpen ? questionStartedAt : 0;
  setup.questionFirst.textContent = first;
  setup.questionSecond.textContent = second;
  document.querySelector('#table-label').textContent = selectedTable === 'all' ? 'TAULES BARREJADES' : `TAULA DEL ${first}`;
  setup.questionPrompt.textContent = 'Toca la resposta correcta!';
  setup.feedback.textContent = '';
  setup.feedback.className = 'feedback';
  clearChildren(setup.answers);
  options.forEach((option) => {
    const button = document.createElement('button');
    button.className = 'answer-button';
    button.type = 'button';
    button.textContent = option;
    button.setAttribute('aria-label', String(option));
    button.addEventListener('click', () => checkAnswer(option, button));
    setup.answers.appendChild(button);
  });
  updateMapControls();
}

function pointsForAnswer(seconds) {
  if (seconds <= 2) return 15;
  if (seconds <= 4) return 12;
  if (seconds <= 7) return 9;
  if (seconds <= 12) return 6;
  return 4;
}

function checkAnswer(answer, selectedButton) {
  if (answered) return;
  answered = true;
  const practiceLevel = state.activePracticeLevel || String(selectedTable);
  if (!mapExpanded) {
    askedQuestions.add(currentQuestion.key);
    state.questionsAskedByLevel[practiceLevel] = Array.from(askedQuestions);
    state.mapPracticeByLevel[practiceLevel] = Math.min(
      MAP_PRACTICE_REQUIRED,
      (state.mapPracticeByLevel[practiceLevel] || 0) + 1,
    );
    if (state.mapPracticeByLevel[practiceLevel] >= MAP_PRACTICE_REQUIRED) {
      state.activePracticeLevel = null;
    }
  }
  let zooNeedsRefresh = false;
  setup.gameCard.classList.remove('is-question-active');
  setup.answers.querySelectorAll('button').forEach((button) => {
    button.disabled = true;
  });

  if (answer === currentQuestion.result) {
    const answerTime = shopPausedAt || Date.now();
    const elapsedSeconds = Math.max(0, (answerTime - questionStartedAt) / 1000);
    const points = pointsForAnswer(elapsedSeconds);
    state.correct += 1;
    state.streak += 1;
    state.answers += 1;
    state.coins += points;
    state.lifetimePoints += points;
    selectedButton.classList.add('answer-correct');
    setup.feedback.textContent = `Molt bé! +${points} monedes${elapsedSeconds <= 2 ? ' · Quina rapidesa!' : ''} 🪙`;
    setup.feedback.className = 'feedback feedback-correct';
    state.buildProgress += 1;
    if (state.buildProgress >= ANIMAL_MILESTONE) {
      const gained = makeAnimal(ANIMALS[Math.floor((state.correct - 1) / ANIMAL_MILESTONE) % ANIMALS.length].species);
      state.buildProgress = 0;
      setup.feedback.textContent += ` S’ha incorporat un animal nou: ${gained.nickname}!`;
      if (gained.hungry) setup.feedback.textContent += ` ${gained.nickname} ja té gana!`;
    }
    if (state.lifetimePoints >= SHOP_UNLOCK_POINTS) state.shopUnlocked = true;
    setup.questionPrompt.textContent = 'Molt bé! La següent pregunta ja ve...';
    saveState();
    renderZoo();
  } else {
    state.streak = 0;
    state.answers += 1;
    state.wrongAnswers += 1;
    state.hungerProgress += 1;
    selectedButton.classList.add('answer-incorrect');
    const correct = Array.prototype.slice.call(setup.answers.children).filter((button) => Number(button.textContent) === currentQuestion.result)[0];
    if (correct) correct.classList.add('answer-correct');
    setup.feedback.textContent = `Gairebé! Era ${currentQuestion.result}. No passa res, tornem-ho a provar!`;
    setup.feedback.className = 'feedback feedback-incorrect';
    if (state.hungerProgress >= HUNGER_ERROR_THRESHOLD) {
      state.hungerProgress -= HUNGER_ERROR_THRESHOLD;
      const hungryAnimal = state.animals.find((animal) => !animal.hungry);
      if (hungryAnimal) {
        hungryAnimal.hungry = true;
        zooNeedsRefresh = true;
        setup.feedback.textContent += ` ${hungryAnimal.nickname} té gana! Dona-li menjar a la botiga.`;
      } else {
        state.pendingHunger += 1;
        setup.feedback.textContent += ' El pròxim animal que arribi tindrà gana.';
      }
    }
    setup.questionPrompt.textContent = 'Aprendre també vol dir equivocar-se!';
    saveState();
  }

  updateMapControls();
  if (zooNeedsRefresh) renderZoo();
  else renderShop();
  const practiceLevelCompleted = !mapExpanded
    && !state.activePracticeLevel
    && state.mapPracticeByLevel[practiceLevel] >= MAP_PRACTICE_REQUIRED;
  if (practiceLevelCompleted) {
    setup.questionPrompt.textContent = 'Has acabat les 10 preguntes! Tria una altra taula o comença una nova ronda.';
    setup.nextButton.textContent = 'Començar una altra ronda';
    setup.nextButton.hidden = false;
  } else if (answer === currentQuestion.result) {
    setup.nextButton.hidden = true;
    nextQuestionTimeout = window.setTimeout(() => {
      nextQuestionTimeout = 0;
      startNextQuestion();
    }, 900);
  } else {
    setup.nextButton.textContent = 'Següent pregunta';
    setup.nextButton.hidden = false;
    setup.nextButton.focus();
  }
}

function startNextQuestion() {
  renderQuestion();
  setup.nextButton.hidden = true;
  const firstAnswer = setup.answers.querySelector('button');
  if (firstAnswer) {
    firstAnswer.focus();
    setup.gameCard.scrollIntoView({
      block: 'start',
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  }
}

function buyAnimal() {
  const price = animalPrice();
  if (state.coins < price) return;
  const species = nextAnimalOffer();
  state.coins -= price;
  const animal = makeAnimal(species.species);
  saveState();
  renderZoo();
  document.querySelector('#shop-message').textContent = `${animal.nickname} ja forma part del zoo!`;
  document.querySelector('#shop-message').className = 'shop-message shop-message-success';
  const buyButton = document.querySelector('#animal-offer .buy-button');
  if (buyButton) buyButton.focus();
}

function feedAnimal(animalId) {
  if (state.coins < FEED_COST) {
    document.querySelector('#shop-message').textContent = `Et falten ${FEED_COST - state.coins} monedes. Resolem una multiplicació!`;
    document.querySelector('#shop-message').className = 'shop-message shop-message-error';
    return;
  }
  const animal = state.animals.filter((entry) => entry.id === animalId)[0];
  if (!animal) {
    throw new Error('No s’ha trobat l’animal que vols alimentar.');
  }
  state.coins -= FEED_COST;
  state.meals += 1;
  animal.fedAt = Date.now();
  animal.hungry = false;
  saveState();
  renderZoo();
  document.querySelector('#shop-message').textContent = `${animal.nickname} està ben tip! Nyam!`;
  document.querySelector('#shop-message').className = 'shop-message shop-message-success';
  const fedButton = Array.prototype.slice.call(document.querySelectorAll('.feed-button'))[state.animals.indexOf(animal)];
  if (fedButton) fedButton.focus();
}

setup.themeButton.addEventListener('click', toggleTheme);

setup.mapToggleButton.addEventListener('click', () => {
  if (mapExpanded) collapseMapSession();
  else enterMap();
});

setup.practiceGate.addEventListener('cancel', (event) => {
  event.preventDefault();
});

document.querySelector('#return-to-practice-button').addEventListener('click', returnToPractice);

setup.selectedTables.forEach((button) => {
  button.addEventListener('click', () => {
    if (!answered || state.activePracticeLevel || mapExpanded) return;
    selectedTable = button.dataset.table === 'all' ? 'all' : Number(button.dataset.table);
    setup.selectedTables.forEach((choice) => {
      choice.setAttribute('aria-pressed', String(choice === button));
    });
    document.querySelector('#table-label').textContent = selectedTable === 'all' ? 'TAULES BARREJADES' : `TAULA DEL ${selectedTable}`;
    updateMapControls();
    if (state.mapPracticeByLevel[String(selectedTable)] >= MAP_PRACTICE_REQUIRED) {
      setup.nextButton.hidden = false;
      setup.nextButton.textContent = 'Començar una altra ronda';
    } else {
      setup.nextButton.hidden = false;
      setup.nextButton.textContent = 'Comencem!';
    }
  });
});

setup.nextButton.addEventListener('click', () => {
  if (answered) startNextQuestion();
});

document.querySelector('#open-shop-button').addEventListener('click', () => {
  if (!mapExpanded || !state.shopUnlocked) return;
  shopIsOpen = !shopIsOpen;
  if (!answered) {
    if (shopIsOpen) {
      shopPausedAt = Date.now();
    } else if (shopPausedAt) {
      questionStartedAt += Date.now() - shopPausedAt;
      shopPausedAt = 0;
    }
  }
  renderShop();
  if (shopIsOpen) document.querySelector('#close-shop-button').focus();
});

document.querySelector('#close-shop-button').addEventListener('click', () => {
  if (!mapExpanded) return;
  shopIsOpen = false;
  if (!answered && shopPausedAt) {
    questionStartedAt += Date.now() - shopPausedAt;
    shopPausedAt = 0;
  }
  renderShop();
  document.querySelector('#open-shop-button').focus();
});

renderZoo();
renderShop();
updateTheme();
setup.selectedTables.forEach((button) => {
  const table = button.dataset.table === 'all' ? 'all' : Number(button.dataset.table);
  button.setAttribute('aria-pressed', String(table === selectedTable));
});
