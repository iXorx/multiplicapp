import './style.css';

const STORAGE_KEY = 'zoo-de-taules.v1';
const THEME_KEY = 'zoo-de-taules.theme';
const FEED_COST = 5;
const STREAK_FOR_STAR = 5;
const CORRECT_ANSWER_ADVANCE_DELAY_MS = 900;
const HUNGER_ERROR_THRESHOLD = 3;
const MAP_PRACTICE_REQUIRED = 10;
const MAP_LEVEL_KEYS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'all'];
const MAP_DURATION_MS = 40_000;
const ANIMALS = [
  { species: 'conill', name: 'Conill', size: 'medium', emoji: '🐰', home: 'Prat verd', habitat: 'meadow', nicknames: ['Pastanaguet', 'Saltiró', 'Bunyolet'] },
  { species: 'tortuga', name: 'Tortuga', size: 'small', emoji: '🐢', home: 'Estany tranquil', habitat: 'lake', nicknames: ['Lenta McQueen', 'Closqueta', 'Turbo'] },
  { species: 'guineu', name: 'Guineu', size: 'medium', emoji: '🦊', home: 'Bosc petit', habitat: 'forest', nicknames: ['Guineuet', 'Cua-roja', 'Fox Mulder'] },
  { species: 'elefant', name: 'Elefant', size: 'large', emoji: '🐘', home: 'Savana alegre', habitat: 'savanna', nicknames: ['Trompeta', 'Dumbolet', 'Mastegaxiclets'] },
  { species: 'panda', name: 'Panda', size: 'medium', emoji: '🐼', home: 'Bosc de bambú', habitat: 'forest', nicknames: ['Bambunet', 'Oreo', 'Panxeta'] },
  { species: 'girafa', name: 'Girafa', size: 'large', emoji: '🦒', home: 'Savana alta', habitat: 'savanna', nicknames: ['Coll llarg', 'Semàfor', 'Torreta'] },
  { species: 'lleo', name: 'Lleó', size: 'large', emoji: '🦁', home: 'Rocallosa', habitat: 'savanna', nicknames: ['Melena', 'Rei Mandrós', 'Lleonet'] },
  { species: 'pingui', name: 'Pingüí', size: 'small', emoji: '🐧', home: 'Platja fresqueta', habitat: 'lake', nicknames: ['Patinets', 'Fracasset', 'Calfred'] },
  { species: 'mico', name: 'Mico', size: 'small', emoji: '🐵', home: 'Bosc dels arbres', habitat: 'forest', nicknames: ['Pessigolles', 'Plàtanet', 'Trapezista'] },
  { species: 'koala', name: 'Koala', size: 'small', emoji: '🐨', home: 'Bosc d’eucaliptus', habitat: 'forest', nicknames: ['Migdiades', 'Fullola', 'Koaleta'] },
  { species: 'zebra', name: 'Zebra', size: 'large', emoji: '🦓', home: 'Savana ratllada', habitat: 'savanna', nicknames: ['Ratlles', 'Codi de barres', 'Pijama'] },
  { species: 'hipopotam', name: 'Hipopòtam', size: 'large', emoji: '🐘', home: 'Riuet fresc', habitat: 'lake', nicknames: ['Hipo-potam', 'Banyetes', 'Xip-xap'] },
  { species: 'cocodril', name: 'Cocodril', size: 'large', emoji: '🐊', home: 'Riba del llac', habitat: 'lake', nicknames: ['Cocodril·la', 'Dentetes', 'Somriures'] },
  { species: 'flamenc', name: 'Flamenc', size: 'medium', emoji: '🦆', home: 'Llac rosa', habitat: 'lake', nicknames: ['Cames llargues', 'Flamenqueta', 'Rosa Parks'] },
  { species: 'lludria', name: 'Llúdria', size: 'medium', emoji: '🐬', home: 'Riu juganer', habitat: 'lake', nicknames: ['Bombolles', 'Rellisca', 'Llu-drieta'] },
  { species: 'peresos', name: 'Peresós', size: 'medium', emoji: '🐒', home: 'Branques tranquil·les', habitat: 'forest', nicknames: ['Demà', 'Migdiada', 'Lentíssim'] },
  { species: 'suricata', name: 'Suricata', size: 'small', emoji: '🐭', home: 'Prat vigilant', habitat: 'meadow', nicknames: ['Vigilet', 'Xafarder', 'Guaita'] },
  { species: 'lloro', name: 'Lloro', size: 'small', emoji: '🐦', home: 'Bosc tropical', habitat: 'forest', nicknames: ['Xerrameca', 'Repetiti', 'A veure, a veure!'] },
  { species: 'granota', name: 'Granota', size: 'small', emoji: '🐸', home: 'Estany dels salts', habitat: 'lake', nicknames: ['Croac Obama', 'Saltamarges', 'Granoteta'] },
  { species: 'cervol', name: 'Cérvol', size: 'medium', emoji: '🦌', home: 'Clariana del bosc', habitat: 'forest', nicknames: ['Banyetes', 'Saltabosc', 'Rudolfet'] },
  { species: 'eriço', name: 'Eriçó', size: 'small', emoji: '🐻', home: 'Racó de fulles', habitat: 'forest', nicknames: ['Punxetes', 'Bolet', 'Pentinat'] },
  { species: 'esquirol', name: 'Esquirol', size: 'small', emoji: '🐭', home: 'Alzinar', habitat: 'forest', nicknames: ['Ametlleta', 'Cua-bonica', 'Amaga-nous'] },
  { species: 'camell', name: 'Camell', size: 'large', emoji: '🐫', home: 'Dunes daurades', habitat: 'savanna', nicknames: ['Gepet', 'Camel·lícia', 'Desertini'] },
  { species: 'cangur', name: 'Cangur', size: 'medium', emoji: '🐴', home: 'Prat saltador', habitat: 'meadow', nicknames: ['Butxaques', 'Saltamarges', 'Kangurú'] },
  { species: 'paó', name: 'Paó', size: 'medium', emoji: '🦃', home: 'Jardí reial', habitat: 'forest', nicknames: ['Pavoneig', 'Ventall', 'Sua majestat'] },
  { species: 'gat', name: 'Gat', size: 'small', emoji: '🐱', home: 'Racó assolellat', habitat: 'meadow', nicknames: ['Smoke', 'Boleta', 'Miau'] },
  { species: 'rata', name: 'Rata', size: 'small', emoji: '🐀', home: 'Raconet del bosc', habitat: 'forest', nicknames: ['Puchi', 'Rateta', 'Ratita'] },
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
  restartButton: document.querySelector('#restart-button'),
  mapToggleButton: document.querySelector('#map-toggle-button'),
  mapTimer: document.querySelector('#map-timer'),
  practiceGate: document.querySelector('#practice-gate'),
  restartDialog: document.querySelector('#restart-dialog'),
  animalSelect: document.querySelector('#animal-select'),
};

let migratedSavedState = false;
let state = loadState();
let currentTheme = loadTheme();
if (migratedSavedState) saveState();
let selectedTable = state.activePracticeLevel === 'all' ? 'all' : Number(state.activePracticeLevel) || 2;
let currentQuestion = null;
const askedQuestions = new Set();
let answered = true;
let questionStartedAt = 0;
let questionAdvanceTimeout = 0;
let shopPausedAt = 0;
let shopIsOpen = false;
let animalAnimationTimeout = 0;
let mapExpanded = false;
let mapOpenedAt = 0;
let mapEndsAt = 0;
let mapTimerInterval = 0;
let mapTimerTimeout = 0;
let mapSessionLevel = null;
let selectedAnimalSpecies = null;

function freshState() {
  return {
    coins: 0,
    stars: 0,
    lifetimePoints: 0,
    correct: 0,
    wrongAnswers: 0,
    streak: 0,
    answers: 0,
    animals: [{
      id: 1,
      species: 'conill',
      nickname: nicknameFor('conill', 1),
      fedAt: 0,
      hungry: false,
    }],
    nextAnimalId: 2,
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
    const animals = data.animals
      .filter((animal) =>
        animal && typeof animal.id === 'number' && ANIMALS.some((species) => species.species === animal.species),
      )
      .map((animal, index, entries) => {
        const nicknameCount = entries.slice(0, index + 1).filter((entry) => entry.species === animal.species).length;
        const nickname = typeof animal.nickname === 'string' ? animal.nickname.trim() : '';
        const hasPlaceholderNickname = /^animal\s+\d+$/i.test(nickname);
        if (hasPlaceholderNickname) migratedSavedState = true;
        return {
          ...animal,
          hungry: Boolean(animal.hungry),
          nickname: nickname && !hasPlaceholderNickname ? nickname : nicknameFor(animal.species, nicknameCount),
        };
      });
    if (animals.length === 0) migratedSavedState = true;
    const loaded = {
      coins: Math.max(0, Math.floor(Number(data.coins) || 0)),
      stars: Math.max(0, Math.floor(Number(data.stars) || 0)),
      lifetimePoints: Math.max(0, Math.floor(Number(data.lifetimePoints) || 0)),
      correct: Math.max(0, Math.floor(Number(data.correct) || 0)),
      wrongAnswers,
      streak: Math.max(0, Math.floor(Number(data.streak) || 0)),
      answers: Math.max(0, Math.floor(Number(data.answers) || 0)),
      animals: animals.length > 0 ? animals : defaults.animals,
      nextAnimalId: Math.max(defaults.nextAnimalId, Math.floor(Number(data.nextAnimalId) || 1)),
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
  const themeLabel = `Canvia al mode ${currentTheme === 'dark' ? 'clar' : 'fosc'}`;
  setup.themeButton.setAttribute('aria-label', themeLabel);
  setup.themeButton.title = themeLabel;
  setup.themeButton.querySelector('[aria-hidden="true"]').textContent = currentTheme === 'dark' ? '☀️' : '🌙';
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

function createAnimalZone(animal) {
  const species = animalFor(animal.species);
  const zone = document.createElement('article');
  const recentlyFed = animal.fedAt && Date.now() - animal.fedAt < 1800;
  zone.className = ['map-animal', recentlyFed ? 'animal-moving' : '', animal.hungry ? 'animal-hungry' : '']
    .filter(Boolean)
    .join(' ');
  zone.setAttribute('aria-label', `${animal.nickname}, ${species.name}, ${animal.hungry ? 'té gana' : `a ${species.home}`}`);

  const emoji = document.createElement('span');
  emoji.className = 'animal-avatar';
  emoji.setAttribute('aria-hidden', 'true');
  emoji.textContent = species.emoji;
  zone.appendChild(emoji);

  const name = document.createElement('strong');
  name.className = 'animal-caption';
  name.textContent = animal.nickname;
  name.title = animal.nickname;
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
  state.animals.forEach((animal) => {
    animalList.appendChild(createAnimalZone(animal));
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
  updateMapControls();

  const description = document.querySelector('#zoo-description');
  description.textContent = state.animals.length === 0
    ? 'Cada cinc respostes correctes seguides guanyes una estrella per adoptar un animal.'
    : state.animals.length === 1
      ? 'El teu animal passeja lliurement pel zoo. Adopta’n més amb estrelles!'
      : `Els teus ${state.animals.length} animals passegen lliurement pel zoo. Adopta’n més amb estrelles!`;
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
  showModal(setup.practiceGate, document.querySelector('#return-to-practice-button'));
}

function closeMapSession() {
  window.clearInterval(mapTimerInterval);
  window.clearTimeout(mapTimerTimeout);
  window.clearTimeout(questionAdvanceTimeout);
  mapTimerInterval = 0;
  mapTimerTimeout = 0;
  questionAdvanceTimeout = 0;
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
  hideModal(setup.practiceGate);
  setup.mapToggleButton.focus();
  if (answered) startNextQuestion();
}

function showModal(modal, initialFocus) {
  modal.hidden = false;
  initialFocus.focus();
}

function hideModal(modal) {
  modal.hidden = true;
}

function restartGame() {
  window.clearInterval(mapTimerInterval);
  window.clearTimeout(mapTimerTimeout);
  window.clearTimeout(questionAdvanceTimeout);
  mapTimerInterval = 0;
  mapTimerTimeout = 0;
  questionAdvanceTimeout = 0;
  mapExpanded = false;
  mapOpenedAt = 0;
  mapEndsAt = 0;
  mapSessionLevel = null;
  shopIsOpen = false;
  shopPausedAt = 0;
  questionStartedAt = 0;
  state = freshState();
  selectedTable = 2;
  selectedAnimalSpecies = null;
  currentQuestion = null;
  answered = true;
  askedQuestions.clear();
  document.querySelector('.app').classList.remove('map-expanded');
  setup.gameCard.classList.remove('is-question-active');
  setup.mapTimer.hidden = true;
  hideModal(setup.practiceGate);
  hideModal(setup.restartDialog);
  setup.questionFirst.textContent = '2';
  setup.questionSecond.textContent = '3';
  document.querySelector('#table-label').textContent = 'TRIA UNA TAULA';
  setup.questionPrompt.textContent = 'Quan estiguis preparada, comencem!';
  setup.feedback.textContent = '';
  setup.feedback.className = 'feedback';
  clearChildren(setup.answers);
  document.querySelector('#coin-reward').hidden = true;
  document.querySelector('#coin-reward').classList.remove('coin-reward-active');
  setup.nextButton.innerHTML = 'Comencem! <span aria-hidden="true">→</span>';
  setup.nextButton.hidden = false;
  setup.selectedTables.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.table === '2'));
  });
  saveState();
  renderZoo();
  renderShop();
  updateMapControls();
  setup.restartButton.focus();
}

function animalPrice(animal) {
  return { small: 1, medium: 2, large: 3 }[animal.size];
}

function renderShop() {
  document.querySelector('#coin-count').textContent = state.coins;
  document.querySelector('#star-count').textContent = state.stars;
  document.querySelector('#streak-count').textContent = state.streak;
  const streakProgress = state.streak % STREAK_FOR_STAR;
  const remaining = STREAK_FOR_STAR - streakProgress;
  document.querySelector('#build-count').textContent = `${streakProgress} / ${STREAK_FOR_STAR}`;
  document.querySelector('.progress-track').setAttribute('aria-valuenow', String(streakProgress));
  document.querySelector('#progress-fill').style.width = `${streakProgress / STREAK_FOR_STAR * 100}%`;
  document.querySelector('#build-message').textContent = streakProgress === 0
    ? 'Una estrella cada cinc encerts seguits'
    : `Et falta ${remaining} ${remaining === 1 ? 'encert' : 'encerts'} per guanyar una estrella`;

  const button = document.querySelector('#open-shop-button');
  const label = document.querySelector('#shop-button-label');
  const lock = document.querySelector('#shop-lock');
  button.disabled = false;
  lock.textContent = shopIsOpen ? '↩️' : '🛍️';
  label.textContent = shopIsOpen ? 'Torna al joc' : 'Adopta un animal';
  button.setAttribute('aria-expanded', String(shopIsOpen));

  const shop = document.querySelector('#shop-view');
  shop.hidden = !mapExpanded || !shopIsOpen;
  if (selectedAnimalSpecies === null) {
    selectedAnimalSpecies = ANIMALS[state.animals.length % ANIMALS.length].species;
  }
  if (setup.animalSelect.options.length === 0) {
    ANIMALS.forEach((animal) => {
      const option = document.createElement('option');
      option.value = animal.species;
      option.textContent = `${animal.emoji} ${animal.name} · ${animalPrice(animal)} ⭐`;
      setup.animalSelect.appendChild(option);
    });
  }
  setup.animalSelect.value = selectedAnimalSpecies;
  const species = animalFor(selectedAnimalSpecies);
  const price = animalPrice(species);
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
  const sizeLabel = { small: 'petit', medium: 'mitjà', large: 'gran' }[species.size];
  name.textContent = `${species.name} · ${sizeLabel}`;
  copy.appendChild(name);
  offer.appendChild(copy);

  const buy = document.createElement('button');
  buy.className = 'buy-button';
  buy.type = 'button';
  buy.textContent = `${price} ⭐`;
  buy.disabled = state.stars < price;
  buy.setAttribute('aria-label', `Adoptar un ${species.name}, per ${price} ${price === 1 ? 'estrella' : 'estrelles'}`);
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
  setup.gameCard.classList.remove('is-round-complete');
  document.querySelector('#quiz-help').textContent = 'Tria entre sis respostes: com més encerts seguits, més s’assemblen!';
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
  const requiresTypedAnswer = state.streak % STREAK_FOR_STAR === STREAK_FOR_STAR - 1;
  const options = [];
  if (!requiresTypedAnswer) {
    options.push(result);
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
  }
  currentQuestion = { first, second, key, result, options, requiresTypedAnswer };
  answered = false;
  questionStartedAt = Date.now();
  shopPausedAt = shopIsOpen ? questionStartedAt : 0;
  setup.questionFirst.textContent = first;
  setup.questionSecond.textContent = second;
  document.querySelector('#table-label').textContent = selectedTable === 'all' ? 'TAULES BARREJADES' : `TAULA DEL ${first}`;
  setup.questionPrompt.textContent = requiresTypedAnswer
    ? 'Escriu el resultat i comprova’l!'
    : 'Toca la resposta correcta!';
  setup.feedback.textContent = '';
  setup.feedback.className = 'feedback';
  document.querySelector('#coin-reward').hidden = true;
  document.querySelector('#coin-reward').classList.remove('coin-reward-active');
  clearChildren(setup.answers);
  if (requiresTypedAnswer) {
    const input = document.createElement('input');
    input.className = 'answer-input';
    input.type = 'tel';
    input.inputMode = 'numeric';
    input.autocomplete = 'off';
    input.setAttribute('aria-label', 'Escriu el resultat');
    setup.answers.appendChild(input);

    const submit = document.createElement('button');
    submit.className = 'answer-button answer-submit';
    submit.type = 'button';
    submit.textContent = 'Comprova el resultat';
    submit.addEventListener('click', () => {
      const value = input.value.trim();
      if (!/^\d+$/.test(value)) {
        setup.feedback.textContent = 'Escriu el resultat amb xifres.';
        setup.feedback.className = 'feedback feedback-incorrect';
        input.focus();
        return;
      }
      checkAnswer(Number(value), input);
    });
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') submit.click();
    });
    setup.answers.appendChild(submit);
  } else {
    options.forEach((option) => {
      const button = document.createElement('button');
      button.className = 'answer-button';
      button.type = 'button';
      button.textContent = option;
      button.setAttribute('aria-label', String(option));
      button.addEventListener('click', () => checkAnswer(option, button));
      setup.answers.appendChild(button);
    });
  }
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
  setup.answers.querySelectorAll('button, input').forEach((control) => {
    control.disabled = true;
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
    const coinReward = document.querySelector('#coin-reward');
    coinReward.hidden = true;
    coinReward.classList.remove('coin-reward-active');
    coinReward.textContent = `+${points} 🪙`;
    void coinReward.offsetWidth;
    coinReward.hidden = false;
    coinReward.classList.add('coin-reward-active');
    if (state.streak % STREAK_FOR_STAR === 0) {
      state.stars += 1;
      setup.feedback.textContent += ' Has guanyat una estrella! ⭐';
    }
    setup.questionPrompt.textContent = 'Molt bé! Llegeix el resultat i continua quan estiguis a punt.';
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
    setup.gameCard.classList.remove('is-question-active');
    setup.gameCard.classList.add('is-round-complete');
    document.querySelector('#quiz-help').textContent = 'Has acabat la tanda de 10 preguntes! Tria una taula i comença una altra tanda.';
    setup.nextButton.textContent = 'Comencem!';
    setup.nextButton.hidden = false;
    setup.nextButton.focus();
  } else if (answer === currentQuestion.result) {
    setup.nextButton.textContent = 'Següent pregunta';
    setup.nextButton.hidden = true;
    questionAdvanceTimeout = window.setTimeout(startNextQuestion, CORRECT_ANSWER_ADVANCE_DELAY_MS);
  } else {
    setup.nextButton.textContent = 'Següent pregunta';
    setup.nextButton.hidden = false;
    setup.nextButton.focus();
  }
}

function startNextQuestion() {
  window.clearTimeout(questionAdvanceTimeout);
  questionAdvanceTimeout = 0;
  renderQuestion();
  setup.nextButton.hidden = true;
  const firstAnswer = setup.answers.querySelector('input, button');
  if (firstAnswer) {
    firstAnswer.focus();
    setup.gameCard.scrollIntoView({
      block: 'start',
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  }
}

function buyAnimal() {
  const species = animalFor(selectedAnimalSpecies);
  const price = animalPrice(species);
  if (state.stars < price) return;
  state.stars -= price;
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

document.querySelector('#restart-button').addEventListener('click', () => {
  showModal(setup.restartDialog, document.querySelector('#cancel-restart-button'));
});

document.querySelector('#cancel-restart-button').addEventListener('click', () => {
  hideModal(setup.restartDialog);
  document.querySelector('#restart-button').focus();
});

document.querySelector('#confirm-restart-button').addEventListener('click', restartGame);

document.querySelector('#return-to-practice-button').addEventListener('click', returnToPractice);

document.addEventListener('keydown', (event) => {
  const activeModal = [setup.practiceGate, setup.restartDialog].find((modal) => !modal.hidden);
  if (!activeModal) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    if (activeModal === setup.restartDialog) {
      hideModal(setup.restartDialog);
      setup.restartButton.focus();
    }
    return;
  }
  if (event.key !== 'Tab') return;
  const focusable = Array.prototype.slice.call(activeModal.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
  ));
  if (focusable.length === 0) {
    event.preventDefault();
    return;
  }
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

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
      setup.nextButton.textContent = 'Comencem!';
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
  if (!mapExpanded) return;
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

setup.animalSelect.addEventListener('change', () => {
  selectedAnimalSpecies = setup.animalSelect.value;
  renderShop();
});

renderZoo();
renderShop();
updateTheme();
setup.selectedTables.forEach((button) => {
  const table = button.dataset.table === 'all' ? 'all' : Number(button.dataset.table);
  button.setAttribute('aria-pressed', String(table === selectedTable));
});
