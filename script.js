// ================================================================
// MUSINOTAS — script.js
// Lectura de pentagrama · Claves de Sol, Fa y Do
// ================================================================

// ----------------------------------------------------------------
// 1. DATOS
// ----------------------------------------------------------------

const NOTES_DATA = {
  treble: [
    // Notas con líneas adicionales por debajo del pentagrama
    { id: 'C4', name: 'Do',  staffPos: -2, type: 'line',  clef: 'treble', tone: 'C4', ledger: true, central: true },
    { id: 'D4', name: 'Re',  staffPos: -1, type: 'space', clef: 'treble', tone: 'D4' },
    // Pentagrama (Mi inferior → Fa superior)
    { id: 'E4', name: 'Mi',  staffPos: 0, type: 'line',  clef: 'treble', tone: 'E4' },
    { id: 'F4', name: 'Fa',  staffPos: 1, type: 'space', clef: 'treble', tone: 'F4' },
    { id: 'G4', name: 'Sol', staffPos: 2, type: 'line',  clef: 'treble', tone: 'G4' },
    { id: 'A4', name: 'La',  staffPos: 3, type: 'space', clef: 'treble', tone: 'A4' },
    { id: 'B4', name: 'Si',  staffPos: 4, type: 'line',  clef: 'treble', tone: 'B4' },
    { id: 'C5', name: 'Do',  staffPos: 5, type: 'space', clef: 'treble', tone: 'C5' },
    { id: 'D5', name: 'Re',  staffPos: 6, type: 'line',  clef: 'treble', tone: 'D5' },
    { id: 'E5', name: 'Mi',  staffPos: 7, type: 'space', clef: 'treble', tone: 'E5' },
    { id: 'F5', name: 'Fa',  staffPos: 8, type: 'line',  clef: 'treble', tone: 'F5' },
    // Notas con líneas adicionales por encima del pentagrama
    { id: 'G5', name: 'Sol', staffPos: 9,  type: 'space', clef: 'treble', tone: 'G5' },
    { id: 'A5', name: 'La',  staffPos: 10, type: 'line',  clef: 'treble', tone: 'A5', ledger: true },
  ],
  bass: [
    { id: 'G2', name: 'Sol', staffPos: 0, type: 'line',  clef: 'bass', tone: 'G2' },
    { id: 'A2', name: 'La',  staffPos: 1, type: 'space', clef: 'bass', tone: 'A2' },
    { id: 'B2', name: 'Si',  staffPos: 2, type: 'line',  clef: 'bass', tone: 'B2' },
    { id: 'C3', name: 'Do',  staffPos: 3, type: 'space', clef: 'bass', tone: 'C3' },
    { id: 'D3', name: 'Re',  staffPos: 4, type: 'line',  clef: 'bass', tone: 'D3' },
    { id: 'E3', name: 'Mi',  staffPos: 5, type: 'space', clef: 'bass', tone: 'E3' },
    { id: 'F3', name: 'Fa',  staffPos: 6, type: 'line',  clef: 'bass', tone: 'F3' },
    { id: 'G3', name: 'Sol', staffPos: 7, type: 'space', clef: 'bass', tone: 'G3' },
    { id: 'A3', name: 'La',  staffPos: 8, type: 'line',  clef: 'bass', tone: 'A3' },
    // Notas con líneas adicionales por encima del pentagrama (Do central incluido)
    { id: 'bass-B3', name: 'Si', staffPos: 9,  type: 'space', clef: 'bass', tone: 'B3' },
    { id: 'bass-C4', name: 'Do', staffPos: 10, type: 'line',  clef: 'bass', tone: 'C4', ledger: true, central: true },
  ],
  alto: [
    // Clave de Do en tercera línea (clave de alto): la línea central es Do4.
    { id: 'alto-F3', name: 'Fa',  staffPos: 0, type: 'line',  clef: 'alto', tone: 'F3' },
    { id: 'alto-G3', name: 'Sol', staffPos: 1, type: 'space', clef: 'alto', tone: 'G3' },
    { id: 'alto-A3', name: 'La',  staffPos: 2, type: 'line',  clef: 'alto', tone: 'A3' },
    { id: 'alto-B3', name: 'Si',  staffPos: 3, type: 'space', clef: 'alto', tone: 'B3' },
    { id: 'alto-C4', name: 'Do',  staffPos: 4, type: 'line',  clef: 'alto', tone: 'C4', central: true },
    { id: 'alto-D4', name: 'Re',  staffPos: 5, type: 'space', clef: 'alto', tone: 'D4' },
    { id: 'alto-E4', name: 'Mi',  staffPos: 6, type: 'line',  clef: 'alto', tone: 'E4' },
    { id: 'alto-F4', name: 'Fa',  staffPos: 7, type: 'space', clef: 'alto', tone: 'F4' },
    { id: 'alto-G4', name: 'Sol', staffPos: 8, type: 'line',  clef: 'alto', tone: 'G4' },
  ]
};

const ALL_NOTES  = [...NOTES_DATA.treble, ...NOTES_DATA.bass, ...NOTES_DATA.alto];
const NOTE_NAMES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
const getNoteById = id => ALL_NOTES.find(n => n.id === id);

// Meta didáctica configurable para comparar fluidez al final.
// 1 nota correcta por segundo es una meta clara: sencilla de entender,
// motivadora y útil para medir el avance del estudiante.
const FLUENCY_GOAL_NOTES_PER_SECOND = 1;

// ----------------------------------------------------------------
// 2. NIVELES
// ----------------------------------------------------------------
// Cada nivel tiene: icono, nombre corto, descripción, noteIds,
// tiempo límite (seg), vidas, % precisión mínima para desbloquear el siguiente.

const LEVELS = [
  {
    id: 1, icon: '🌱',
    name: 'Primeras líneas',
    subtitle: 'Clave de Sol · Líneas (Mi·Sol·Si)',
    noteIds: ['E4','G4','B4'],
    timeLimit: 90, lives: 5, requiredAccuracy: 70,
    tip: 'Mi·Sol·Si: las tres líneas centrales'
  },
  {
    id: 2, icon: '🎵',
    name: 'Todas las líneas',
    subtitle: 'Clave de Sol · 5 líneas completas',
    noteIds: ['E4','G4','B4','D5','F5'],
    timeLimit: 90, lives: 5, requiredAccuracy: 70,
    tip: 'Desde Mi hasta Fa: Mi·Sol·Si·Re·Fa'
  },
  {
    id: 3, icon: '🎶',
    name: 'Los espacios',
    subtitle: 'Clave de Sol · Espacios (Fa·La·Do·Mi)',
    noteIds: ['F4','A4','C5','E5'],
    timeLimit: 90, lives: 5, requiredAccuracy: 70,
    tip: 'Fa·La·Do·Mi: los cuatro espacios'
  },
  {
    id: 4, icon: '⭐',
    name: 'Sol completa',
    subtitle: 'Clave de Sol · Líneas y espacios',
    noteIds: ['E4','F4','G4','A4','B4','C5','D5','E5','F5'],
    timeLimit: 120, lives: 4, requiredAccuracy: 75,
    tip: 'Todo el pentagrama en clave de Sol'
  },
  {
    id: 5, icon: '🌿',
    name: 'Fa: las líneas',
    subtitle: 'Clave de Fa · Líneas (Sol·Si·Re·Fa·La)',
    noteIds: ['G2','B2','D3','F3','A3'],
    timeLimit: 90, lives: 5, requiredAccuracy: 70,
    tip: 'Sol·Si·Re·Fa·La: las líneas de la clave de Fa'
  },
  {
    id: 6, icon: '🎸',
    name: 'Fa: los espacios',
    subtitle: 'Clave de Fa · Espacios (La·Do·Mi·Sol)',
    noteIds: ['A2','C3','E3','G3'],
    timeLimit: 90, lives: 5, requiredAccuracy: 70,
    tip: 'La·Do·Mi·Sol: los espacios de clave de Fa'
  },
  {
    id: 7, icon: '🔥',
    name: 'Fa completa',
    subtitle: 'Clave de Fa · Líneas y espacios',
    noteIds: ['G2','A2','B2','C3','D3','E3','F3','G3','A3'],
    timeLimit: 120, lives: 4, requiredAccuracy: 75,
    tip: 'Todo el pentagrama en clave de Fa'
  },
  {
    id: 8, icon: '🏆',
    name: '¡Las dos claves!',
    subtitle: 'Sol y Fa mezcladas · Nivel maestro',
    noteIds: ['E4','F4','G4','A4','B4','C5','D5','E5','F5','G2','A2','B2','C3','D3','E3','F3','G3','A3'],
    timeLimit: 150, lives: 3, requiredAccuracy: 80,
    tip: 'Identifica primero si estás en clave de Sol o de Fa'
  },
  {
    id: 9, icon: '🧭',
    name: 'Do: las líneas',
    subtitle: 'Clave de Do · Líneas (Fa·La·Do·Mi·Sol)',
    noteIds: ['alto-F3','alto-A3','alto-C4','alto-E4','alto-G4'],
    timeLimit: 90, lives: 5, requiredAccuracy: 70,
    tip: 'En clave de Do, la línea central marca Do'
  },
  {
    id: 10, icon: '🎻',
    name: 'Do: los espacios',
    subtitle: 'Clave de Do · Espacios (Sol·Si·Re·Fa)',
    noteIds: ['alto-G3','alto-B3','alto-D4','alto-F4'],
    timeLimit: 90, lives: 5, requiredAccuracy: 70,
    tip: 'Lee alrededor del Do central: Sol·Si·Re·Fa'
  },
  {
    id: 11, icon: '💫',
    name: 'Do completa',
    subtitle: 'Clave de Do · Líneas y espacios',
    noteIds: ['alto-F3','alto-G3','alto-A3','alto-B3','alto-C4','alto-D4','alto-E4','alto-F4','alto-G4'],
    timeLimit: 120, lives: 4, requiredAccuracy: 75,
    tip: 'Todo el pentagrama en clave de Do en tercera línea'
  },
  {
    id: 12, icon: '👑',
    name: 'Tres claves',
    subtitle: 'Sol, Fa y Do mezcladas · Reto maestro',
    noteIds: ['E4','F4','G4','A4','B4','C5','D5','E5','F5','G2','A2','B2','C3','D3','E3','F3','G3','A3','alto-F3','alto-G3','alto-A3','alto-B3','alto-C4','alto-D4','alto-E4','alto-F4','alto-G4'],
    timeLimit: 180, lives: 3, requiredAccuracy: 82,
    tip: 'El gran reto: identifica primero la clave y luego lee la nota'
  },
  {
    id: 13, icon: '🔵',
    name: 'El Do central',
    subtitle: 'La nota puente entre las tres claves',
    noteIds: ['C4', 'alto-C4', 'bass-C4'],
    timeLimit: 90, lives: 5, requiredAccuracy: 70,
    tip: 'El mismo Do central se escribe distinto en cada clave: con su línea adicional propia'
  },
  {
    id: 14, icon: '➕',
    name: 'Líneas adicionales · Sol',
    subtitle: 'Clave de Sol · Fuera del pentagrama',
    noteIds: ['C4', 'D4', 'E4', 'F5', 'G5', 'A5'],
    timeLimit: 100, lives: 4, requiredAccuracy: 72,
    tip: 'Las líneas adicionales extienden el pentagrama: Do·Re abajo, Sol·La arriba'
  },
  {
    id: 15, icon: '➕',
    name: 'Líneas adicionales · Fa',
    subtitle: 'Clave de Fa · Fuera del pentagrama',
    noteIds: ['G2', 'A2', 'A3', 'bass-B3', 'bass-C4'],
    timeLimit: 100, lives: 4, requiredAccuracy: 72,
    tip: 'En clave de Fa, el Do central sube sobre la primera línea adicional superior'
  },
];

// ----------------------------------------------------------------
// 3. ESTADO DEL JUEGO
// ----------------------------------------------------------------

const state = {
  // Config del juego en curso
  activeNoteIds: [],
  timeLimit:     60,
  livesCount:    3,
  currentLevelId: null,  // null = no es un nivel del modo progresivo
  mode:          'free', // 'level' | 'free' | 'weak' | 'blitz' | 'review'
  label:         '',
  lastGame:      null,   // para "Otra vez"

  // Juego activo
  currentNote:    null,
  lastNoteId:     null,
  score:          0,
  combo:          0,
  maxCombo:       0,
  lives:          3,
  timeRemaining:  0,
  timerInterval:  null,
  roundTimer:     null,
  totalAnswers:   0,
  correctAnswers: 0,
  missed:         {},    // noteId → veces fallada en esta partida
  weights:        {},    // noteId → peso extra para repetirla más seguido
  startedAt:      null,
  paused:         false,
  pauseStart:     0,
  pausedMs:       0,
  lastDurationSeconds: 0,
  lastNotesPerSecond: 0,
  lastFluencyPercent: 0,
  gameActive:     false,
  answering:      false,

  recordsTab: 'global',

  // Config modo libre (se guarda entre sesiones)
  freeConfig: {
    clef:            'treble',
    noteType:        'all',
    selectedNoteIds: new Set(['E4','F4','G4','A4','B4','C5','D5','E5','F5']),
    timeLimit:       60,
    lives:           3,
  }
};

const $ = id => document.getElementById(id);

// ----------------------------------------------------------------
// 4. GESTIÓN DE PANTALLAS
// ----------------------------------------------------------------

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = $(`screen-${id}`);
  if (el) {
    el.classList.add('active');
    el.scrollTop = 0;
    window.scrollTo(0, 0);
  }
  if (id === 'home')    renderHome();
  if (id === 'mode')    renderModeScreen();
  if (id === 'levels')  renderLevelsGrid();
  if (id === 'config')  renderConfigScreen();
  if (id === 'records') renderRecords();
  if (id === 'learn')   renderLearnStaffs();
  // Fuera de una partida es buen momento para buscar una versión nueva.
  if ((id === 'home' || id === 'mode') && window.checkForUpdate) window.checkForUpdate();
}

function activeScreenId() {
  const el = document.querySelector('.screen.active');
  return el ? el.id.replace('screen-', '') : '';
}

// ---- Home ----
function renderHome() {
  const progress = loadProgress();
  const done     = LEVELS.filter(l => isLevelCompleted(l, progress)).length;
  const stars    = totalStars(progress);
  const streak   = currentStreak();
  const pills    = [];

  if (done > 0 || stars > 0) {
    pills.push(`<span class="stat-pill">⭐ <b>${stars}</b>/${LEVELS.length * 3}</span>`);
    pills.push(`<span class="stat-pill">🎯 <b>${done}</b>/${LEVELS.length} niveles</span>`);
  }
  if (streak > 0) {
    pills.push(`<span class="stat-pill">🔥 <b>${streak}</b> ${streak === 1 ? 'día' : 'días seguidos'}</span>`);
  }
  $('home-stats').innerHTML = pills.join('');

  // Botón "Continuar" cuando ya hay avance en el modo progresivo.
  const next = nextLevelToPlay(progress);
  const cont = $('btn-continue');
  const play = $('btn-play');
  if (Object.keys(progress).length > 0 && next) {
    cont.textContent = `▶ Continuar · Nivel ${next.id}`;
    cont.classList.remove('hidden');
    play.className = 'btn-secondary';
  } else {
    cont.classList.add('hidden');
    play.className = 'btn-primary';
  }

  $('app-version').textContent = window.APP_VERSION ? `v${window.APP_VERSION}` : '';
  syncSoundButtons();
}

function renderModeScreen() {
  $('mode-levels-badge').textContent = `${LEVELS.length} niveles`;
  const weak = getWeakNoteIds();
  $('mode-weak-badge').textContent = weak.length >= MIN_WEAK_NOTES
    ? `${weak.length} notas para reforzar`
    : 'Tus notas difíciles';
}

// El primer nivel desbloqueado que aún no se ha superado (o el último si ya están todos).
function nextLevelToPlay(progress = loadProgress()) {
  return LEVELS.find(l => canPlayLevel(l.id, progress) && !isLevelCompleted(l, progress))
      || LEVELS[LEVELS.length - 1];
}

function continueProgress() {
  const next = nextLevelToPlay();
  if (next) startLevel(next.id);
}

// ----------------------------------------------------------------
// 5. PANTALLA DE NIVELES
// ----------------------------------------------------------------

function isLevelCompleted(level, progress) {
  const lp = progress[level.id];
  return !!lp && lp.bestAccuracy >= level.requiredAccuracy;
}

// 0 a 3 estrellas según la mejor precisión (0 si aún no se supera el nivel).
function starCount(level, accuracy) {
  if (accuracy == null || accuracy < level.requiredAccuracy) return 0;
  if (accuracy >= 90) return 3;
  if (accuracy >= 75) return 2;
  return 1;
}

function starsHtml(n) {
  return [1, 2, 3].map(i => `<span class="${i <= n ? '' : 'off'}">⭐</span>`).join('');
}

function totalStars(progress = loadProgress()) {
  return LEVELS.reduce((sum, l) => {
    const lp = progress[l.id];
    return sum + (lp ? starCount(l, lp.bestAccuracy) : 0);
  }, 0);
}

function renderLevelsGrid() {
  const progress = loadProgress();
  const grid     = $('levels-grid');
  const current  = nextLevelToPlay(progress);
  const done     = LEVELS.filter(l => isLevelCompleted(l, progress)).length;

  $('levels-summary').innerHTML = `
    <span>🎯 ${done}/${LEVELS.length}</span>
    <div class="bar"><div style="width:${Math.round(done / LEVELS.length * 100)}%"></div></div>
    <span>⭐ ${totalStars(progress)}/${LEVELS.length * 3}</span>`;

  grid.innerHTML = LEVELS.map((level) => {
    const locked    = !canPlayLevel(level.id, progress);
    const lp        = progress[level.id] || null;
    const completed = isLevelCompleted(level, progress);
    const isCurrent = !locked && !completed && current && current.id === level.id;
    const barWidth  = lp ? Math.min(100, Math.round(lp.bestAccuracy)) : 0;

    let corner = '';
    if (locked)         corner = '🔒';
    else if (completed) corner = starsHtml(starCount(level, lp.bestAccuracy));
    else if (isCurrent) corner = '<span class="level-tag">Sigue aquí</span>';

    return `<button class="level-card ${locked ? 'locked' : ''} ${completed ? 'completed' : ''} ${isCurrent ? 'current' : ''}"
                 ${locked ? 'aria-disabled="true"' : ''}
                 onclick="${locked ? `lockedLevelFeedback(this, ${level.id})` : `startLevel(${level.id})`}">
      <div class="level-header">
        <span class="level-icon">${level.icon}</span>
        <span class="level-num">Nivel ${level.id}</span>
      </div>
      <div class="level-name">${level.name}</div>
      <div class="level-sub">${level.subtitle}</div>
      <div class="level-meta">
        <span>⏱ ${formatTime(level.timeLimit)}</span>
        <span>❤️ ${level.lives}</span>
        <span>🎯 ${level.requiredAccuracy}%</span>
      </div>
      <div class="level-progress-bar">
        <div class="level-progress-fill" style="width:${barWidth}%"></div>
      </div>
      ${lp ? `<div class="level-req">Mejor: <span>${Math.round(lp.bestAccuracy)}%</span> · ${lp.bestScore} pts</div>` : ''}
      <span class="level-corner">${corner}</span>
    </button>`;
  }).join('');
}

function canPlayLevel(levelId, progress) {
  if (levelId === 1) return true;
  const prevLevel = LEVELS.find(l => l.id === levelId - 1);
  if (!prevLevel) return false;
  return isLevelCompleted(prevLevel, progress);
}

function lockedLevelFeedback(card, levelId) {
  const prev = LEVELS.find(l => l.id === levelId - 1);
  if (card) {
    card.classList.remove('shake');
    void card.offsetHeight;
    card.classList.add('shake');
  }
  if (prev) showToast(`🔒 Logra ${prev.requiredAccuracy}% en el Nivel ${prev.id} para desbloquearlo`);
}

function startLevel(levelId) {
  const level = LEVELS.find(l => l.id === levelId);
  if (!level) return;
  startGame({
    noteIds:   level.noteIds,
    timeLimit: level.timeLimit,
    lives:     level.lives,
    levelId,
    mode:      'level',
    label:     `${level.icon} Nivel ${level.id} · ${level.name}`,
    tip:       level.tip,
  });
}

// ----------------------------------------------------------------
// 6. PANTALLA CONFIG (MODO LIBRE) Y MODOS ESPECIALES
// ----------------------------------------------------------------

function renderConfigScreen() {
  syncToggle('clef-toggle', state.freeConfig.clef);
  syncToggle('type-toggle', state.freeConfig.noteType);
  $('config-time').value  = String(state.freeConfig.timeLimit);
  $('config-lives').value = String(state.freeConfig.lives);
  updateNotePicker();
}

function syncToggle(groupId, value) {
  document.querySelectorAll(`#${groupId} .toggle-btn`).forEach(btn => {
    btn.classList.toggle('active', btn.dataset.value === value);
  });
}

function setConfigClef(clef) {
  state.freeConfig.clef = clef;
  // Seleccionar todas las notas disponibles con el nuevo filtro
  const notes = getFilteredNotes(clef, state.freeConfig.noteType);
  state.freeConfig.selectedNoteIds = new Set(notes.map(n => n.id));
  syncToggle('clef-toggle', clef);
  updateNotePicker();
  saveFreeConfig();
}

function setConfigType(type) {
  state.freeConfig.noteType = type;
  const notes    = getFilteredNotes(state.freeConfig.clef, type);
  const validIds = new Set(notes.map(n => n.id));
  // Mantener solo selecciones válidas
  state.freeConfig.selectedNoteIds = new Set(
    [...state.freeConfig.selectedNoteIds].filter(id => validIds.has(id))
  );
  if (state.freeConfig.selectedNoteIds.size === 0) {
    state.freeConfig.selectedNoteIds = new Set(notes.map(n => n.id));
  }
  syncToggle('type-toggle', type);
  updateNotePicker();
  saveFreeConfig();
}

function getFilteredNotes(clef, type) {
  let notes = [];
  if (clef === 'treble' || clef === 'both' || clef === 'all') notes = [...notes, ...NOTES_DATA.treble];
  if (clef === 'bass'   || clef === 'both' || clef === 'all') notes = [...notes, ...NOTES_DATA.bass];
  if (clef === 'alto'   || clef === 'all') notes = [...notes, ...NOTES_DATA.alto];
  if (type === 'line')  notes = notes.filter(n => n.type === 'line');
  if (type === 'space') notes = notes.filter(n => n.type === 'space');
  return notes;
}

function updateNotePicker() {
  const { clef, noteType, selectedNoteIds } = state.freeConfig;
  const notes  = getFilteredNotes(clef, noteType);
  const picker = $('note-picker');

  picker.innerHTML = notes.map(note => {
    const selected   = selectedNoteIds.has(note.id);
    const clefSymbol = getClefSymbol(note.clef);
    const typeLabel  = note.type === 'line' ? 'línea' : 'espacio';
    return `<button class="note-chip ${selected ? 'selected' : ''}"
                 aria-pressed="${selected}"
                 onclick="toggleNote('${note.id}')"
                 title="${note.name} · ${typeLabel}">
      ${note.name}
      <span class="chip-sub">${clefSymbol}${note.type === 'line' ? '—' : '○'}</span>
    </button>`;
  }).join('');

  const count = notes.filter(n => selectedNoteIds.has(n.id)).length;
  $('picker-count').textContent = `${count} de ${notes.length} notas`;
}

function getClefSymbol(clef) {
  if (clef === 'treble') return '𝄞';
  if (clef === 'bass') return '𝄢';
  if (clef === 'alto') return '𝄡';
  return '♪';
}

function toggleNote(noteId) {
  const sel = state.freeConfig.selectedNoteIds;
  if (sel.has(noteId)) {
    if (sel.size > 1) sel.delete(noteId);
    else showToast('Deja al menos una nota seleccionada 🎵');
  } else {
    sel.add(noteId);
  }
  updateNotePicker();
  saveFreeConfig();
}

function selectAllNotes() {
  const notes = getFilteredNotes(state.freeConfig.clef, state.freeConfig.noteType);
  state.freeConfig.selectedNoteIds = new Set(notes.map(n => n.id));
  updateNotePicker();
  saveFreeConfig();
}

function clearAllNotes() {
  const notes = getFilteredNotes(state.freeConfig.clef, state.freeConfig.noteType);
  if (notes.length > 0) {
    state.freeConfig.selectedNoteIds = new Set([notes[0].id]);
  }
  updateNotePicker();
  saveFreeConfig();
}

function startFreeGame() {
  saveFreeConfig();
  const noteIds = [...state.freeConfig.selectedNoteIds];
  if (noteIds.length === 0) {
    showToast('Selecciona al menos una nota para jugar 🎵');
    return;
  }
  startGame({
    noteIds,
    timeLimit: state.freeConfig.timeLimit,
    lives:     state.freeConfig.lives,
    mode:      'free',
    label:     '🎨 Modo Libre',
  });
}

// ---- Repaso inteligente: las notas con más errores acumulados ----
const MIN_WEAK_NOTES = 3;
const MAX_WEAK_NOTES = 8;

function getWeakNoteIds() {
  const stats = loadNoteStats();
  return Object.keys(stats)
    .filter(id => getNoteById(id) && stats[id].bad > 0)
    .map(id => {
      const s = stats[id];
      // Tasa de error suavizada: pesa más lo que se falla seguido.
      return { id, rate: (s.bad + 1) / (s.ok + s.bad + 2) };
    })
    .filter(x => x.rate >= 0.15)
    .sort((a, b) => b.rate - a.rate)
    .slice(0, MAX_WEAK_NOTES)
    .map(x => x.id);
}

function startWeakNotesGame() {
  const ids = getWeakNoteIds();
  if (ids.length < MIN_WEAK_NOTES) {
    showToast('🧠 Juega algunos niveles primero: aquí aparecerán las notas que más te cuesten.');
    return;
  }
  startGame({
    noteIds: ids, timeLimit: 90, lives: 0,
    mode: 'weak', label: '🧠 Repaso inteligente',
    tip: 'Sin vidas que perder: tómate tu tiempo y fija cada posición',
  });
}

// ---- Reto relámpago: 60 s con todo lo que ya se superó ----
function startBlitzGame() {
  const progress = loadProgress();
  const ids = new Set();
  LEVELS.filter(l => isLevelCompleted(l, progress)).forEach(l => l.noteIds.forEach(id => ids.add(id)));
  if (ids.size === 0) LEVELS[0].noteIds.forEach(id => ids.add(id));
  startGame({
    noteIds: [...ids], timeLimit: 60, lives: 0,
    mode: 'blitz', label: '⚡ Reto relámpago',
    tip: `${ids.size} notas en juego · ¡lee lo más rápido que puedas!`,
  });
}

// ---- Practicar los errores de la última partida ----
function practiceMistakes() {
  const ids = Object.keys(state.missed);
  if (ids.length === 0) return;
  startGame({
    noteIds: ids, timeLimit: 60, lives: 0,
    mode: 'review', label: '🧠 Repaso de errores',
  });
}

// ----------------------------------------------------------------
// 7. LOOP DEL JUEGO
// ----------------------------------------------------------------

function startGame(cfg) {
  clearInterval(state.timerInterval);
  clearTimeout(state.roundTimer);
  closeModal();

  const { noteIds, timeLimit, lives } = cfg;

  Object.assign(state, {
    activeNoteIds:  noteIds,
    timeLimit,
    livesCount:     lives,
    currentLevelId: cfg.levelId || null,
    mode:           cfg.mode || 'free',
    label:          cfg.label || '',
    lastGame:       cfg,
    score:          0,
    combo:          0,
    maxCombo:       0,
    lives,
    timeRemaining:  timeLimit,
    totalAnswers:   0,
    correctAnswers: 0,
    missed:         {},
    weights:        {},
    startedAt:      Date.now(),
    paused:         false,
    pausedMs:       0,
    lastDurationSeconds: 0,
    lastNotesPerSecond: 0,
    lastFluencyPercent: 0,
    gameActive:     true,
    answering:      false,
    lastNoteId:     null,
  });
  window.MUSINOTAS_PLAYING = true;

  showScreen('game');
  updateHUD();
  $('game-label').textContent = state.label;
  $('combo-display').classList.add('hidden');
  $('staff-container').classList.remove('is-correct', 'is-wrong');
  clearFeedback();
  syncSoundButtons();

  const timeEl = $('hud-time');
  timeEl.classList.remove('time-warning');
  $('time-bar').classList.remove('warning');
  $('time-bar').classList.toggle('off', timeLimit <= 0);
  $('time-bar-fill').style.width = '100%';
  if (timeLimit > 0) startTimer();
  else timeEl.textContent = '∞';

  if (cfg.tip) showToast(`💡 ${cfg.tip}`, 3200);

  newRound();
}

// Elige la siguiente nota: evita repetir la última y repite más seguido
// las que se han fallado en esta partida.
function pickNextNoteId() {
  let candidates = state.activeNoteIds.filter(id => id !== state.lastNoteId);
  if (candidates.length === 0) candidates = state.activeNoteIds;

  const weights = candidates.map(id => 1 + Math.min(3, state.weights[id] || 0));
  const total   = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < candidates.length; i++) {
    r -= weights[i];
    if (r <= 0) return candidates[i];
  }
  return candidates[candidates.length - 1];
}

function newRound() {
  if (!state.gameActive) return;

  state.answering = false;
  clearFeedback();
  $('staff-container').classList.remove('is-correct', 'is-wrong');

  const noteId = pickNextNoteId();
  state.currentNote = getNoteById(noteId);
  state.lastNoteId  = noteId;

  renderStaff(state.currentNote, 'normal', true);
  renderAnswerButtons();
}

function renderAnswerButtons() {
  $('answer-buttons').innerHTML = NOTE_NAMES.map((name, i) =>
    `<button class="answer-btn" data-name="${name}" onclick="checkAnswer('${name}')">${name}<kbd>${i + 1}</kbd></button>`
  ).join('');
}

function checkAnswer(noteName) {
  if (!state.gameActive || state.answering || state.paused) return;
  state.answering = true;
  state.totalAnswers++;

  disableAnswerButtons();

  const note    = state.currentNote;
  const correct = noteName === note.name;
  recordNoteStat(note.id, correct);

  if (correct) {
    state.correctAnswers++;
    state.combo++;
    state.maxCombo = Math.max(state.maxCombo, state.combo);
    if (state.weights[note.id]) state.weights[note.id] = Math.max(0, state.weights[note.id] - 0.75);

    const mult = getMultiplier(state.combo);
    const pts  = 10 * mult;
    state.score += pts;

    highlightAnswers(null, note.name);
    showFeedback(`¡Correcto!  +${pts}`, 'correct');
    renderStaff(note, 'correct');
    $('staff-container').classList.add('is-correct');
    updateComboDisplay();
    updateHUD(true);
    playNote(note.tone);
    animateStaffContainer('pulse');

    state.roundTimer = setTimeout(newRound, 600);

  } else {
    state.combo = 0;
    if (state.livesCount > 0) state.lives--;
    state.missed[note.id]  = (state.missed[note.id] || 0) + 1;
    state.weights[note.id] = (state.weights[note.id] || 0) + 1.5;

    highlightAnswers(noteName, note.name);
    showFeedback(`Era ${note.name}`, 'wrong');
    renderStaff(note, 'wrong');
    $('staff-container').classList.add('is-wrong');
    updateComboDisplay();
    updateHUD();
    playError();
    if (navigator.vibrate) { try { navigator.vibrate(70); } catch (_) {} }
    animateStaffContainer('shake');

    if (state.livesCount > 0 && state.lives <= 0) {
      state.roundTimer = setTimeout(() => endGame('lives'), 1300);
    } else {
      state.roundTimer = setTimeout(newRound, 1300);
    }
  }
}

function getMultiplier(combo) {
  if (combo >= 10) return 4;
  if (combo >= 6)  return 3;
  if (combo >= 3)  return 2;
  return 1;
}

function updateComboDisplay() {
  const el = $('combo-display');
  if (state.combo >= 3) {
    $('combo-text').textContent = `🔥 ${state.combo} seguidas · ×${getMultiplier(state.combo)}`;
    el.classList.remove('hidden');
    el.style.animation = 'none';
    void el.offsetHeight;
    el.style.animation = '';
  } else {
    el.classList.add('hidden');
  }
}

function highlightAnswers(wrong, correct) {
  document.querySelectorAll('.answer-btn').forEach(btn => {
    if (btn.dataset.name === wrong)   btn.classList.add('wrong-answer');
    if (btn.dataset.name === correct) btn.classList.add('correct-answer');
  });
}

function disableAnswerButtons() {
  document.querySelectorAll('.answer-btn').forEach(btn => btn.disabled = true);
}

function showFeedback(msg, type) {
  const el = $('feedback-msg');
  el.textContent = msg;
  el.className = `feedback-msg ${type}`;
}

function clearFeedback() {
  const el = $('feedback-msg');
  el.textContent = '';
  el.className   = 'feedback-msg';
}

function updateHUD(bump) {
  const scoreEl = $('hud-score');
  scoreEl.textContent = state.score;
  if (bump) {
    scoreEl.classList.remove('bump');
    void scoreEl.offsetHeight;
    scoreEl.classList.add('bump');
  }

  const livesEl = $('hud-lives');
  if (state.livesCount === 0) {
    livesEl.textContent = '∞';
  } else if (state.livesCount > 4) {
    livesEl.textContent = `❤️ ×${Math.max(0, state.lives)}`;
  } else {
    const filled = Math.max(0, state.lives);
    const empty  = Math.max(0, state.livesCount - filled);
    livesEl.textContent = '❤️'.repeat(filled) + '🖤'.repeat(empty);
  }
}

function animateStaffContainer(cls) {
  const el = $('staff-container');
  el.classList.remove('shake', 'pulse');
  void el.offsetHeight;
  el.classList.add(cls);
  setTimeout(() => el.classList.remove(cls), 500);
}

// ---- Pausa ----
async function pauseGame() {
  if (!state.gameActive || state.paused) return;
  state.paused     = true;
  state.pauseStart = Date.now();

  const choice = await openModal({
    emoji: '⏸',
    title: 'Juego en pausa',
    text:  'El tiempo está detenido. ¿Qué quieres hacer?',
    escValue: 'resume',
    buttons: [
      { label: '▶ Continuar',  value: 'resume',  kind: 'primary' },
      { label: '🔄 Reiniciar', value: 'restart' },
      { label: '🚪 Salir al menú', value: 'quit' },
    ],
  });

  if (state.paused) {
    state.pausedMs += Date.now() - state.pauseStart;
    state.paused = false;
  }
  if (choice === 'restart') playAgain();
  else if (choice === 'quit') quitGame();
}

function quitGame() {
  clearInterval(state.timerInterval);
  clearTimeout(state.roundTimer);
  state.gameActive = false;
  window.MUSINOTAS_PLAYING = false;
  showScreen('mode');
}

// ----------------------------------------------------------------
// 8. CRONÓMETRO
// ----------------------------------------------------------------

function startTimer() {
  const timeEl = $('hud-time');
  const bar    = $('time-bar');
  const fill   = $('time-bar-fill');
  timeEl.textContent = formatTime(state.timeRemaining);

  state.timerInterval = setInterval(() => {
    if (!state.gameActive) { clearInterval(state.timerInterval); return; }
    if (state.paused) return;
    state.timeRemaining--;
    timeEl.textContent = formatTime(state.timeRemaining);
    fill.style.width   = `${Math.max(0, state.timeRemaining / state.timeLimit * 100)}%`;

    if (state.timeRemaining <= 10) {
      timeEl.classList.add('time-warning');
      bar.classList.add('warning');
    }
    if (state.timeRemaining <= 0) {
      clearInterval(state.timerInterval);
      endGame('time');
    }
  }, 1000);
}

function formatTime(s) {
  if (s <= 0) return '0:00';
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

// ----------------------------------------------------------------
// 9. FIN DEL JUEGO Y RESULTADOS
// ----------------------------------------------------------------

function endGame(reason) {
  if (!state.gameActive) return;
  state.gameActive = false;
  window.MUSINOTAS_PLAYING = false;
  clearInterval(state.timerInterval);
  clearTimeout(state.roundTimer);
  closeModal();

  const accuracy = state.totalAnswers > 0
    ? Math.round((state.correctAnswers / state.totalAnswers) * 100)
    : 0;

  const performance = calculateReadingBenchmark();

  if (reason === 'lives') playGameOver();
  else                    playVictory();

  // Mejor marca anterior (para avisar si hay récord personal).
  let prevBest = 0;
  if (state.currentLevelId) {
    const lp = loadProgress()[state.currentLevelId];
    prevBest = lp ? lp.bestScore : 0;
    saveProgress(state.currentLevelId, state.score, accuracy);
  } else if (state.mode === 'blitz') {
    prevBest = loadJSON(STORAGE_BLITZ, 0) || 0;
    if (state.score > prevBest) saveJSON(STORAGE_BLITZ, state.score);
  }
  const newBest = prevBest > 0 && state.score > prevBest;

  if (state.correctAnswers > 0) touchStreak();

  const record = {
    name:     getPlayerName() || 'Anónimo',
    score:    state.score,
    accuracy,
    levelId:  state.currentLevelId,
    correct:  state.correctAnswers,
    total:    state.totalAnswers,
    speedNps: performance.notesPerSecond,
    fluencyPercent: performance.fluencyPercent,
    durationSeconds: performance.elapsedSeconds,
    date:     new Date().toLocaleDateString('es-CO'),
  };

  setTimeout(() => {
    showResults(reason, accuracy, newBest);
    finalizeRecord(record, state.mode);
  }, 700);
}

// Pide el nombre (solo la primera vez) y guarda el récord local y global.
async function finalizeRecord(record, mode) {
  if (record.score <= 0) return;
  if (!getPlayerName()) {
    const name = await askPlayerName('¿Cómo te llamas?', 'Tu nombre aparecerá en la tabla de récords 🏆');
    if (name) record.name = name;
  }
  saveRecord({ ...record, mode });  // respaldo local de este dispositivo
  saveGlobalRecord(record);         // lista global compartida
}

function calculateReadingBenchmark() {
  const startedAt = state.startedAt || Date.now();
  const activeMs  = Date.now() - startedAt - state.pausedMs;
  const elapsedSeconds = Math.max(1, Math.round(activeMs / 1000));
  const notesPerSecond = state.correctAnswers > 0
    ? state.correctAnswers / elapsedSeconds
    : 0;
  const fluencyPercent = Math.round((notesPerSecond / FLUENCY_GOAL_NOTES_PER_SECOND) * 100);

  state.lastDurationSeconds = elapsedSeconds;
  state.lastNotesPerSecond  = notesPerSecond;
  state.lastFluencyPercent  = fluencyPercent;

  return { elapsedSeconds, notesPerSecond, fluencyPercent };
}

function formatNotesPerSecond(value) {
  return value.toFixed(2).replace('.', ',');
}

function getBenchmarkMessage(fluencyPercent, notesPerSecond) {
  const speed = formatNotesPerSecond(notesPerSecond);

  if (fluencyPercent >= 150) {
    return `🚀 Leíste ${speed} notas correctas por segundo. ¡Vas al ${fluencyPercent}% de la meta de lectura fluida! Estás volando en este reto.`;
  }
  if (fluencyPercent >= 100) {
    return `🏆 Leíste ${speed} notas correctas por segundo. ¡Llegaste a la meta de lectura fluida! Eso ya se siente seguro y musical.`;
  }
  if (fluencyPercent >= 75) {
    return `⭐ Leíste ${speed} notas correctas por segundo. Vas al ${fluencyPercent}% de la meta. Estás cerquita de leer con mucha más soltura.`;
  }
  if (fluencyPercent >= 50) {
    return `🎵 Leíste ${speed} notas correctas por segundo. Vas al ${fluencyPercent}% de la meta. ¡Ya se nota tu avance! Sigue practicando y cada vez será más fácil.`;
  }
  return `🌱 Leíste ${speed} notas correctas por segundo. Vas al ${fluencyPercent}% de la meta. Recuerda: primero reconoces cada nota y poco a poco vas más rápido.`;
}

function showResults(reason, accuracy, newBest) {
  let emoji = '🎉', title = '¡Bien hecho!';
  if (reason === 'lives')   { emoji = '💔'; title = '¡Se acabaron las vidas!'; }
  else if (accuracy >= 95)  { emoji = '🏆'; title = '¡Increíble!'; }
  else if (accuracy >= 85)  { emoji = '⭐'; title = '¡Excelente!'; }
  else if (accuracy >= 70)  { emoji = '🎵'; title = '¡Muy bien!'; }
  else if (accuracy < 50)   { emoji = '💪'; title = '¡Sigue practicando!'; }

  $('results-emoji').textContent = emoji;
  $('results-title').textContent = title;
  $('results-sub').textContent   = state.label;
  $('res-score').textContent     = state.score;
  $('res-accuracy').textContent  = `${accuracy}%`;
  $('res-combo').textContent     = `×${state.maxCombo}`;
  $('res-answers').textContent   = `${state.correctAnswers}/${state.totalAnswers}`;
  $('res-speed').textContent     = formatNotesPerSecond(state.lastNotesPerSecond);
  $('new-best').classList.toggle('hidden', !newBest);

  const meter = Math.min(100, state.lastFluencyPercent);
  $('pro-comparison').innerHTML = `
    <div class="pro-badge">${state.lastFluencyPercent}% de la meta de fluidez</div>
    <p>${getBenchmarkMessage(state.lastFluencyPercent, state.lastNotesPerSecond)}</p>
    <small>Meta del juego: leer 1 nota correcta por segundo. Con la práctica podrás leer cada vez más rápido.</small>
    <div class="fluency-meter"><div style="width:0%"></div></div>`;
  setTimeout(() => {
    const m = document.querySelector('.fluency-meter > div');
    if (m) m.style.width = `${meter}%`;
  }, 80);

  // Nivel: estrellas, desbloqueo y botón de siguiente nivel
  const unlockEl = $('level-unlock-msg');
  const starsEl  = $('results-stars');
  const nextBtn  = $('btn-next-level');
  const againBtn = $('btn-again');
  let passed = false;

  unlockEl.className = 'level-unlock-msg hidden';
  nextBtn.classList.add('hidden');
  againBtn.className = 'btn-primary';
  starsEl.innerHTML  = '';

  if (state.currentLevelId) {
    const level     = LEVELS.find(l => l.id === state.currentLevelId);
    const nextLevel = LEVELS.find(l => l.id === state.currentLevelId + 1);
    passed = accuracy >= level.requiredAccuracy && state.totalAnswers > 0;
    starsEl.innerHTML = starsHtml(passed ? starCount(level, accuracy) : 0);

    if (passed && nextLevel) {
      unlockEl.innerHTML = `🔓 ¡Nivel ${nextLevel.id} desbloqueado: <b>${nextLevel.name}</b>!`;
      unlockEl.classList.remove('hidden');
      nextBtn.classList.remove('hidden');
      againBtn.className = 'btn-secondary';
    } else if (passed) {
      unlockEl.innerHTML = '👑 ¡Completaste todos los niveles! Ya lees en las tres claves.';
      unlockEl.classList.remove('hidden');
    } else {
      unlockEl.innerHTML = `Necesitas ${level.requiredAccuracy}% de precisión para superar este nivel. ¡Inténtalo otra vez!`;
      unlockEl.classList.add('pending');
      unlockEl.classList.remove('hidden');
    }
  }

  renderReviewBox();
  showScreen('results');

  if (passed || newBest || (accuracy >= 85 && state.totalAnswers >= 10 && reason !== 'lives')) launchConfetti();
}

// Muestra en el pentagrama las notas falladas para repasarlas.
function renderReviewBox() {
  const box = $('review-box');
  const ids = Object.keys(state.missed)
    .sort((a, b) => state.missed[b] - state.missed[a]);

  $('btn-review').classList.toggle('hidden', ids.length === 0);
  if (ids.length === 0) { box.classList.add('hidden'); return; }

  box.innerHTML = `
    <h3>🔍 Notas para repasar</h3>
    <p>Fíjate bien en la posición de cada una:</p>
    <div class="review-grid">
      ${ids.slice(0, 8).map(id => {
        const note  = getNoteById(id);
        const times = state.missed[id];
        return `<div class="review-note">
          <svg viewBox="76 18 214 168" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${note.name}">
            ${buildStaffSVG(note, 'normal', { noteX: 225, right: 284 })}
          </svg>
          <b>${note.name}</b>${times > 1 ? `<small>×${times}</small>` : ''}
        </div>`;
      }).join('')}
    </div>`;
  box.classList.remove('hidden');
}

function playAgain() {
  if (state.lastGame) startGame(state.lastGame);
  else showScreen('mode');
}

function playNextLevel() {
  const next = LEVELS.find(l => l.id === (state.currentLevelId || 0) + 1);
  if (next && canPlayLevel(next.id, loadProgress())) startLevel(next.id);
  else showScreen('levels');
}

// ----------------------------------------------------------------
// 10. RENDERIZADO DEL PENTAGRAMA (SVG)
// ----------------------------------------------------------------
// ViewBox: 0 0 520 200
// Líneas del pentagrama (de abajo a arriba):
//   staffPos 0 → y=135 (línea 1 / inferior)
//   staffPos 2 → y=115 (línea 2)
//   staffPos 4 → y=95  (línea 3 / central)
//   staffPos 6 → y=75  (línea 4)
//   staffPos 8 → y=55  (línea 5 / superior)
// Espacios: staffPos 1,3,5,7 → y=125,105,85,65
// Fórmula: noteY = 135 - staffPos * 10

const SVG_NOTE_X  = 300;
const SVG_LINE_YS = [135, 115, 95, 75, 55]; // índice 0 = línea inferior
const STAFF_INK   = '#2b2740';
const NOTE_COLORS = { normal: '#1a1830', correct: '#06B98A', wrong: '#EF476F' };

// Posición de cada clave según la fuente disponible.
// 'noto': fuente musical Noto Music (igual en todos los dispositivos).
// 'system': respaldo con la fuente de símbolos del sistema (si Noto no cargó).
const CLEF_FONT = `'Noto Music', 'Segoe UI Symbol', 'Apple Symbols', FreeSerif, serif`;
const CLEF_GLYPHS = {
  noto: {
    treble: { symbol: '&#x1D11E;', x: 90, y: 115, fontSize: 80 },
    bass:   { symbol: '&#x1D122;', x: 90, y: 75,  fontSize: 80 },
    alto:   { symbol: '&#x1D121;', x: 90, y: 95,  fontSize: 80 },
  },
  system: {
    treble: { symbol: '&#x1D11E;', x: 86, y: 130, fontSize: 106 },
    bass:   { symbol: '&#x1D122;', x: 82, y: 150, fontSize: 140 },
    alto:   { symbol: '&#x1D121;', x: 86, y: 132, fontSize: 108 },
  },
};
let clefSet = 'system';

function posToY(staffPos) {
  return 135 - staffPos * 10;
}

function renderStaff(note, noteState, animate) {
  $('staff-svg').innerHTML = buildStaffSVG(note, noteState, { animate });
}

// Pentagrama vacío con su clave.
function buildStaffBase(clef, left, right) {
  let html = '';
  SVG_LINE_YS.forEach(y => {
    html += `<line x1="${left}" y1="${y}" x2="${right}" y2="${y}"
      stroke="${STAFF_INK}" stroke-width="1.6" stroke-linecap="round"/>`;
  });
  // Barra inicial
  html += `<line x1="${left}" y1="55" x2="${left}" y2="135" stroke="${STAFF_INK}" stroke-width="1.6"/>`;

  const g = CLEF_GLYPHS[clefSet][clef];
  if (g) {
    html += `<text x="${g.x}" y="${g.y}" font-size="${g.fontSize}" font-family="${CLEF_FONT}"
      fill="${STAFF_INK}">${g.symbol}</text>`;
  }
  return html;
}

function ledgerLines(staffPos, x) {
  let html = '';
  const draw = sp => {
    const ly = posToY(sp);
    html += `<line x1="${x - 19}" y1="${ly}" x2="${x + 19}" y2="${ly}"
      stroke="${STAFF_INK}" stroke-width="1.6" stroke-linecap="round"/>`;
  };
  for (let sp = -2; sp >= staffPos; sp -= 2) draw(sp);
  for (let sp = 10; sp <= staffPos; sp += 2) draw(sp);
  return html;
}

function noteHead(x, staffPos, fill, withStem) {
  const y = posToY(staffPos);
  let html = `<ellipse cx="${x}" cy="${y}" rx="12.5" ry="9"
    transform="rotate(-18 ${x} ${y})" fill="${fill}"/>`;
  if (withStem) {
    const stemUp = staffPos < 4;  // debajo de la línea central: plica arriba
    const stemX  = stemUp ? x + 11.2 : x - 11.2;
    const endY   = stemUp ? y - 58 : y + 58;
    html += `<line x1="${stemX}" y1="${y}" x2="${stemX}" y2="${endY}"
      stroke="${fill}" stroke-width="2.2" stroke-linecap="round"/>`;
  }
  return html;
}

function buildStaffSVG(note, noteState, opts = {}) {
  const left  = 82;
  const right = opts.right || 510;
  const x     = opts.noteX || SVG_NOTE_X;
  const fill  = NOTE_COLORS[noteState] || NOTE_COLORS.normal;

  let html = buildStaffBase(note.clef, left, right);
  if (!opts.right) {
    // Doble barra final
    html += `<line x1="${right - 6}" y1="55" x2="${right - 6}" y2="135" stroke="${STAFF_INK}" stroke-width="1.4"/>`;
    html += `<line x1="${right}" y1="55" x2="${right}" y2="135" stroke="${STAFF_INK}" stroke-width="4"/>`;
  }
  html += ledgerLines(note.staffPos, x);
  html += `<g class="note-group ${opts.animate ? 'enter' : ''}">${noteHead(x, note.staffPos, fill, true)}</g>`;
  return html;
}

// Pentagrama de referencia (pantalla "Aprender"): las 9 notas con su nombre.
function buildReferenceStaff(clef) {
  const notes = NOTES_DATA[clef].filter(n => n.staffPos >= 0 && n.staffPos <= 8);
  let html = buildStaffBase(clef, 82, 510);
  notes.forEach((n, i) => {
    const x     = 172 + i * 39;
    const color = n.type === 'line' ? '#5B3DF5' : '#C2189B';
    html += noteHead(x, n.staffPos, color, false);
    html += `<text x="${x}" y="172" text-anchor="middle" font-family="Nunito, sans-serif"
      font-size="15" font-weight="800" fill="${color}">${n.name}</text>`;
  });
  return `<svg viewBox="76 34 440 148" xmlns="http://www.w3.org/2000/svg" role="img"
    aria-label="Notas en el pentagrama">${html}</svg>`;
}

function renderLearnStaffs() {
  document.querySelectorAll('.learn-staff').forEach(el => {
    el.innerHTML = buildReferenceStaff(el.dataset.clef);
  });
}

// Usa la fuente musical cuando termine de cargar (y redibuja lo visible).
function detectClefFont() {
  if (!document.fonts || !document.fonts.load) return;
  document.fonts.load(`80px 'Noto Music'`, '\u{1D11E}').then(faces => {
    if (!faces || faces.length === 0) return;
    clefSet = 'noto';
    if (state.currentNote && activeScreenId() === 'game') renderStaff(state.currentNote, 'normal');
    if (activeScreenId() === 'learn') renderLearnStaffs();
  }).catch(() => {});
}

// ----------------------------------------------------------------
// 11. AUDIO (Tone.js)
// ----------------------------------------------------------------

// Instrumentos: una voz "piano" cálida para las notas, una voz de coro para
// acordes de premio. Se crean perezosamente.
let _piano = null, _pad = null, _reverb = null, _audioReady = false;

function soundOn() {
  return settings.sound && typeof Tone !== 'undefined';
}

function buildAudio() {
  if (_piano) return;
  // Reverb sutil para que suene más bonito y "conecte" emocionalmente.
  _reverb = new Tone.Reverb({ decay: 1.6, wet: 0.22 }).toDestination();

  // Voz principal: FMSynth tipo campana/piano dulce.
  _piano = new Tone.PolySynth(Tone.FMSynth, {
    harmonicity: 2,
    modulationIndex: 6,
    oscillator: { type: 'sine' },
    envelope:   { attack: 0.005, decay: 0.5, sustain: 0.25, release: 1.1 },
    modulation: { type: 'triangle' },
    modulationEnvelope: { attack: 0.01, decay: 0.3, sustain: 0.1, release: 0.6 },
    volume: -6,
  }).connect(_reverb);

  // Voz de acordes/celebración.
  _pad = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'triangle' },
    envelope:   { attack: 0.01, decay: 0.2, sustain: 0.3, release: 0.8 },
    volume: -8,
  }).connect(_reverb);
}

// Desbloquea el audio en el primer gesto del usuario (requisito de los navegadores).
async function unlockAudio() {
  if (_audioReady || typeof Tone === 'undefined') return;
  try {
    await Tone.start();
    buildAudio();
    _audioReady = true;
  } catch (_) {}
}

function withAudio(fn) {
  if (!soundOn()) return;
  unlockAudio().then(() => {
    if (!_audioReady || !settings.sound) return;
    try { fn(); } catch (_) {}
  });
}

function playNote(tone) {
  withAudio(() => _piano.triggerAttackRelease(tone, '4n'));
}

// Sonido de error: dos notas graves disonantes y cortas, claras pero no agresivas.
function playError() {
  withAudio(() => _piano.triggerAttackRelease(['F#3', 'G3'], '16n'));
}

function playGameOver() {
  withAudio(() => {
    ['D4', 'B3', 'G3', 'D3'].forEach((n, i) =>
      setTimeout(() => _piano.triggerAttackRelease(n, '4n'), i * 220)
    );
  });
}

function playVictory() {
  withAudio(() => {
    // Arpegio ascendente + acorde mayor final = sensación de logro.
    ['C5', 'E5', 'G5', 'C6'].forEach((n, i) =>
      setTimeout(() => _piano.triggerAttackRelease(n, '8n'), i * 120)
    );
    setTimeout(() => _pad.triggerAttackRelease(['C5', 'E5', 'G5'], '2n'), 520);
  });
}

function toggleSound() {
  settings.sound = !settings.sound;
  saveJSON(STORAGE_SETTINGS, settings);
  syncSoundButtons();
  if (settings.sound) playNote('C5');
  showToast(settings.sound ? '🔊 Sonido activado' : '🔇 Sonido apagado', 1400);
}

function syncSoundButtons() {
  const on = settings.sound;
  const home = $('btn-sound-home');
  const game = $('btn-sound-game');
  if (home) home.textContent = on ? '🔊 Sonido' : '🔇 Sin sonido';
  if (game) game.textContent = on ? '🔊' : '🔇';
}

// ----------------------------------------------------------------
// 12. ALMACENAMIENTO (localStorage)
// ----------------------------------------------------------------

const STORAGE_PROGRESS = 'musinotas_progress_v2';
const STORAGE_RECORDS  = 'musinotas_records_v2';
const STORAGE_NAME     = 'musinotas_player_name';
const STORAGE_SETTINGS = 'musinotas_settings';
const STORAGE_FREECFG  = 'musinotas_free_config';
const STORAGE_STATS    = 'musinotas_note_stats';
const STORAGE_STREAK   = 'musinotas_streak';
const STORAGE_BLITZ    = 'musinotas_blitz_best';

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch (_) { return fallback; }
}

function saveJSON(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {}
}

const settings = Object.assign({ sound: true }, loadJSON(STORAGE_SETTINGS, {}));

// ---- Nombre del jugador (para récords globales) ----
function getPlayerName() {
  try { return (localStorage.getItem(STORAGE_NAME) || '').trim(); }
  catch (_) { return ''; }
}

function setPlayerName(name) {
  try { localStorage.setItem(STORAGE_NAME, name.trim().slice(0, 20)); }
  catch (_) {}
}

// Pide el nombre en una ventana del juego. Devuelve el nombre o '' si se cancela.
async function askPlayerName(title, text) {
  const input = await openModal({
    emoji: '🏆', title, text,
    input: { value: getPlayerName(), placeholder: 'Tu nombre', maxLength: 20 },
    escValue: null,
    buttons: [
      { label: 'Guardar', value: 'ok', kind: 'primary' },
      { label: 'Ahora no', value: null },
    ],
  });
  const name = (input || '').trim().slice(0, 20);
  if (name) setPlayerName(name);
  return name;
}

async function changePlayerName() {
  const name = await askPlayerName('Tu nombre', 'Así aparecerás en la tabla de récords.');
  if (name) {
    showToast(`¡Listo, ${name}! 🎵`, 1600);
    renderRecords();
  }
}

// ---- Progreso de niveles ----
function loadProgress() {
  const data = loadJSON(STORAGE_PROGRESS, {});
  return data && typeof data === 'object' ? data : {};
}

function saveProgress(levelId, score, accuracy) {
  const data = loadProgress();
  const prev = data[levelId] || { bestScore: 0, bestAccuracy: 0 };
  data[levelId] = {
    bestScore:    Math.max(prev.bestScore, score),
    bestAccuracy: Math.max(prev.bestAccuracy, accuracy),
  };
  saveJSON(STORAGE_PROGRESS, data);
}

// ---- Modo libre ----
function saveFreeConfig() {
  const c = state.freeConfig;
  const timeEl = $('config-time'), livesEl = $('config-lives');
  if (timeEl && activeScreenId() === 'config') {
    c.timeLimit = parseInt(timeEl.value, 10) || 0;
    c.lives     = parseInt(livesEl.value, 10) || 0;
  }
  saveJSON(STORAGE_FREECFG, {
    clef: c.clef, noteType: c.noteType,
    selectedNoteIds: [...c.selectedNoteIds],
    timeLimit: c.timeLimit, lives: c.lives,
  });
}

function loadFreeConfig() {
  const saved = loadJSON(STORAGE_FREECFG, null);
  if (!saved || typeof saved !== 'object') return;
  const c = state.freeConfig;
  if (['treble', 'bass', 'alto', 'both', 'all'].includes(saved.clef)) c.clef = saved.clef;
  if (['all', 'line', 'space'].includes(saved.noteType)) c.noteType = saved.noteType;
  const valid = new Set(getFilteredNotes(c.clef, c.noteType).map(n => n.id));
  const ids   = (Array.isArray(saved.selectedNoteIds) ? saved.selectedNoteIds : []).filter(id => valid.has(id));
  c.selectedNoteIds = new Set(ids.length ? ids : valid);
  if ([0, 60, 120, 180, 300].includes(saved.timeLimit)) c.timeLimit = saved.timeLimit;
  if ([0, 3, 5, 10].includes(saved.lives)) c.lives = saved.lives;
}

// ---- Estadísticas por nota (alimentan el Repaso inteligente) ----
function loadNoteStats() {
  const data = loadJSON(STORAGE_STATS, {});
  return data && typeof data === 'object' ? data : {};
}

function recordNoteStat(noteId, correct) {
  const stats = loadNoteStats();
  const s = stats[noteId] || { ok: 0, bad: 0 };
  if (correct) s.ok++; else s.bad++;
  // Ventana móvil: lo reciente pesa más que lo antiguo.
  if (s.ok + s.bad > 30) { s.ok *= 0.8; s.bad *= 0.8; }
  stats[noteId] = s;
  saveJSON(STORAGE_STATS, stats);
}

// ---- Racha de días practicando ----
function dayKey(date) {
  const p = n => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}`;
}

function touchStreak() {
  const s = loadJSON(STORAGE_STREAK, { last: '', count: 0 }) || { last: '', count: 0 };
  const today = dayKey(new Date());
  if (s.last === today) return;
  const yesterday = dayKey(new Date(Date.now() - 86400000));
  s.count = s.last === yesterday ? (s.count || 0) + 1 : 1;
  s.last  = today;
  saveJSON(STORAGE_STREAK, s);
}

function currentStreak() {
  const s = loadJSON(STORAGE_STREAK, null);
  if (!s || !s.last) return 0;
  const today     = dayKey(new Date());
  const yesterday = dayKey(new Date(Date.now() - 86400000));
  return (s.last === today || s.last === yesterday) ? (s.count || 0) : 0;
}

// ---- Récords ----
function saveRecord(entry) {
  const records = loadRawRecords();
  records.push(entry);
  records.sort((a, b) => b.score - a.score);
  records.splice(15); // máximo 15 récords
  saveJSON(STORAGE_RECORDS, records);
}

function loadRawRecords() {
  const data = loadJSON(STORAGE_RECORDS, []);
  return Array.isArray(data) ? data : [];
}

// Guarda el récord en la lista global (si Firebase está disponible).
function saveGlobalRecord(entry) {
  if (!window.MusinotasDB) return;
  window.MusinotasDB.saveGlobalRecord(entry).catch(err => {
    console.warn('No se pudo guardar el récord global.', err);
  });
}

// Escapa texto para insertarlo con seguridad en el HTML.
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => (
    { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]
  ));
}

const MODE_NAMES = { weak: 'Repaso inteligente', blitz: 'Reto relámpago', review: 'Repaso de errores', free: 'Modo Libre' };

function recordItemHtml(r, i, markMine) {
  const medals = ['🥇','🥈','🥉'];
  const levelName = r.levelId
    ? (LEVELS.find(l => l.id === r.levelId)?.name || `Nivel ${r.levelId}`)
    : (MODE_NAMES[r.mode] || 'Modo Libre');
  const who  = String(r.name || 'Anónimo');
  const mine = getPlayerName();
  const isMe = markMine && mine && who.trim().toLowerCase() === mine.toLowerCase();
  const details = [levelName, r.date, `${Number(r.accuracy) || 0}%`];
  if (r.speedNps) details.push(`${formatNotesPerSecond(Number(r.speedNps))} notas/s`);

  return `<div class="record-item ${i < 3 ? 'top' : ''} ${isMe ? 'me' : ''}">
    <div class="record-rank">${medals[i] || i + 1}</div>
    <div class="record-left">
      <div class="record-name">${escapeHtml(who)}</div>
      <div class="record-sub">${details.filter(Boolean).map(escapeHtml).join(' · ')}</div>
    </div>
    <div class="record-score">${Number(r.score) || 0} <small>pts</small></div>
  </div>`;
}

function setRecordsTab(tab) {
  state.recordsTab = tab;
  renderRecords();
}

async function renderRecords() {
  const list = $('records-list');
  const desc = $('records-desc');
  const tabs = $('records-tabs');
  const hasGlobal = !!window.MusinotasDB;
  const tab = hasGlobal ? state.recordsTab : 'mine';

  tabs.classList.toggle('hidden', !hasGlobal);
  tabs.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));

  if (tab === 'mine') {
    desc.textContent = 'Tus mejores puntajes en este dispositivo.';
    const records = loadRawRecords();
    list.innerHTML = records.length === 0
      ? `<p class="empty-msg">Aún no tienes récords. ¡Ve a jugar! 🎵</p>`
      : records.map((r, i) => recordItemHtml(r, i, false)).join('');
    return;
  }

  desc.textContent = 'Los mejores puntajes de toda la comunidad Musicala.';
  list.innerHTML = `<p class="empty-msg">Cargando récords… ⏳</p>`;
  try {
    const records = await window.MusinotasDB.loadGlobalRecords(20);
    if (state.recordsTab !== 'global' || activeScreenId() !== 'records') return;
    list.innerHTML = records.length === 0
      ? `<p class="empty-msg">Aún no hay récords. ¡Estrena la tabla! 🎵</p>`
      : records.map((r, i) => recordItemHtml(r, i, true)).join('');
  } catch (err) {
    console.warn('No se pudieron cargar los récords globales.', err);
    list.innerHTML = `<p class="empty-msg">No se pudieron cargar los récords. Revisa tu conexión. 📡</p>`;
  }
}

// ----------------------------------------------------------------
// 13. VENTANAS, AVISOS Y CONFETI
// ----------------------------------------------------------------

let _modalResolve = null;

// Abre una ventana propia del juego (reemplaza alert/confirm/prompt).
// Devuelve una promesa con el `value` del botón elegido; si hay campo de
// texto, el botón principal devuelve el texto escrito.
function openModal({ emoji, title, text, input, buttons, escValue }) {
  closeModal();
  const root = $('modal-root');
  return new Promise(resolve => {
    root.innerHTML = `
      <div class="modal-backdrop">
        <div class="modal" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}">
          ${emoji ? `<div class="modal-emoji">${emoji}</div>` : ''}
          <h3>${escapeHtml(title)}</h3>
          ${text ? `<p>${escapeHtml(text)}</p>` : ''}
          ${input ? `<input type="text" id="modal-input" autocomplete="off" enterkeyhint="done"
                       maxlength="${input.maxLength || 40}"
                       placeholder="${escapeHtml(input.placeholder || '')}"
                       value="${escapeHtml(input.value || '')}">` : ''}
          <div class="modal-buttons">
            ${buttons.map((b, i) =>
              `<button class="${b.kind === 'primary' ? 'btn-primary' : 'btn-secondary'}" data-i="${i}">${escapeHtml(b.label)}</button>`
            ).join('')}
          </div>
        </div>
      </div>`;

    const inputEl = $('modal-input');
    const finish  = value => {
      if (_modalResolve !== done) return;
      _modalResolve = null;
      root.innerHTML = '';
      resolve(value);
    };
    const done = { finish, escValue };
    _modalResolve = done;

    const choose = b => finish(inputEl && b.kind === 'primary' ? inputEl.value : b.value);
    root.querySelectorAll('.modal-buttons button').forEach(btn => {
      btn.addEventListener('click', () => choose(buttons[Number(btn.dataset.i)]));
    });
    if (inputEl) {
      inputEl.addEventListener('keydown', e => {
        if (e.key === 'Enter') choose(buttons.find(b => b.kind === 'primary') || buttons[0]);
      });
      setTimeout(() => { inputEl.focus(); inputEl.select(); }, 60);
    } else {
      const first = root.querySelector('.modal-buttons button');
      if (first) first.focus();
    }
  });
}

function isModalOpen() { return !!_modalResolve; }

// Cierra la ventana abierta (si hay) resolviendo con su valor de escape.
function closeModal() {
  if (_modalResolve) _modalResolve.finish(_modalResolve.escValue);
}

let _toastTimer = null;
function showToast(msg, ms = 2600) {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  clearTimeout(_toastTimer);
  const el = document.createElement('div');
  el.className = 'toast';
  el.setAttribute('role', 'status');
  el.textContent = msg;
  document.body.appendChild(el);
  _toastTimer = setTimeout(() => {
    el.classList.add('out');
    setTimeout(() => el.remove(), 320);
  }, ms);
}

function launchConfetti() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const colors = ['#FFD166', '#06D6A0', '#EF476F', '#3FA9F5', '#9B72CF', '#FF9F1C'];
  const box = document.createElement('div');
  box.className = 'confetti';
  for (let i = 0; i < 60; i++) {
    const p = document.createElement('i');
    p.style.left = `${Math.random() * 100}%`;
    p.style.background = colors[i % colors.length];
    p.style.setProperty('--dx', `${(Math.random() - 0.5) * 240}px`);
    p.style.setProperty('--rot', `${(Math.random() - 0.5) * 1400}deg`);
    p.style.animationDuration = `${1.6 + Math.random() * 1.6}s`;
    p.style.animationDelay = `${Math.random() * 0.4}s`;
    box.appendChild(p);
  }
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 4200);
}

// ----------------------------------------------------------------
// 14. APP INSTALABLE (PWA)
// ----------------------------------------------------------------

let _installPrompt = null;

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  _installPrompt = e;
  const btn = $('btn-install');
  if (btn) btn.classList.remove('hidden');
});

window.addEventListener('appinstalled', () => {
  _installPrompt = null;
  const btn = $('btn-install');
  if (btn) btn.classList.add('hidden');
  showToast('✅ ¡Musinotas quedó instalada!');
});

async function installApp() {
  if (!_installPrompt) return;
  _installPrompt.prompt();
  try { await _installPrompt.userChoice; } catch (_) {}
  _installPrompt = null;
  $('btn-install').classList.add('hidden');
}

// ----------------------------------------------------------------
// 15. INIT
// ----------------------------------------------------------------

document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;

  if (e.key === 'Escape') {
    if (isModalOpen()) closeModal();
    else if (activeScreenId() === 'game') pauseGame();
    return;
  }
  if (isModalOpen() || activeScreenId() !== 'game') return;

  // Teclas 1–7 = Do, Re, Mi, Fa, Sol, La, Si
  const n = parseInt(e.key, 10);
  if (n >= 1 && n <= 7) {
    e.preventDefault();
    checkAnswer(NOTE_NAMES[n - 1]);
  } else if (e.key === 'p' || e.key === 'P') {
    pauseGame();
  }
});

// Pausa automática al salir de la app o cambiar de pestaña.
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden' && state.gameActive && !state.paused) pauseGame();
});

document.addEventListener('DOMContentLoaded', () => {
  loadFreeConfig();
  detectClefFont();
  showScreen('home');
  // Desbloquear el audio en el primer toque/click en cualquier parte.
  const unlock = () => { if (settings.sound) unlockAudio(); };
  document.addEventListener('pointerdown', unlock, { once: true });
  document.addEventListener('keydown', unlock, { once: true });
});
