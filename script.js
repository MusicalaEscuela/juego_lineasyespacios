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
  currentLevelId: null,  // null = modo libre

  // Juego activo
  currentNote:    null,
  lastNoteId:     null,
  score:          0,
  combo:          0,
  maxCombo:       0,
  lives:          3,
  timeRemaining:  0,
  timerInterval:  null,
  totalAnswers:   0,
  correctAnswers: 0,
  startedAt:      null,
  lastDurationSeconds: 0,
  lastNotesPerSecond: 0,
  lastFluencyPercent: 0,
  gameActive:     false,
  answering:      false,

  // Config modo libre (se guarda entre sesiones)
  freeConfig: {
    clef:            'treble',
    noteType:        'all',
    selectedNoteIds: new Set(['E4','F4','G4','A4','B4','C5','D5','E5','F5']),
    timeLimit:       60,
    lives:           3,
  }
};

// ----------------------------------------------------------------
// 4. GESTIÓN DE PANTALLAS
// ----------------------------------------------------------------

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(`screen-${id}`);
  if (el) {
    el.classList.add('active');
    el.scrollTop = 0;
  }
  if (id === 'levels')  renderLevelsGrid();
  if (id === 'config')  renderConfigScreen();
  if (id === 'records') renderRecords();
}

// ----------------------------------------------------------------
// 5. PANTALLA DE NIVELES
// ----------------------------------------------------------------

function renderLevelsGrid() {
  const progress = loadProgress();
  const grid = document.getElementById('levels-grid');

  grid.innerHTML = LEVELS.map((level) => {
    const locked    = !canPlayLevel(level.id, progress);
    const lp        = progress[level.id] || null;
    const completed = lp && lp.bestAccuracy >= level.requiredAccuracy;
    const barWidth  = lp ? Math.min(100, Math.round(lp.bestAccuracy)) : 0;
    const stars     = getStars(lp && lp.bestAccuracy);
    const prevLevel = LEVELS.find(l => l.id === level.id - 1);
    const reqText   = prevLevel ? `Necesitas ${prevLevel.requiredAccuracy}% en Niv.${prevLevel.id}` : '';

    return `<div class="level-card ${locked ? 'locked' : ''} ${completed ? 'completed' : ''}"
                 onclick="${locked ? 'lockedLevelFeedback()' : `startLevel(${level.id})`}">
      <div class="level-header">
        <span class="level-icon">${level.icon}</span>
        <span class="level-num">Nivel ${level.id}</span>
      </div>
      <div class="level-name">${level.name}</div>
      <div class="level-sub">${level.subtitle}</div>
      <div class="level-meta">
        <span>⏱ ${formatTime(level.timeLimit)}</span>
        <span>❤️ ${level.lives}</span>
      </div>
      <div class="level-progress-bar">
        <div class="level-progress-fill" style="width:${barWidth}%"></div>
      </div>
      ${lp ? `<div class="level-req">Mejor: <span>${Math.round(lp.bestAccuracy)}%</span> · ${lp.bestScore} pts</div>` : ''}
      ${locked   ? `<span class="level-lock-icon" title="${reqText}">🔒</span>` : ''}
      ${completed ? `<span class="level-stars">${stars}</span>` : ''}
    </div>`;
  }).join('');
}

function canPlayLevel(levelId, progress) {
  if (levelId === 1) return true;
  const prevLevel = LEVELS.find(l => l.id === levelId - 1);
  if (!prevLevel) return false;
  const prevProg = progress[levelId - 1];
  return prevProg && prevProg.bestAccuracy >= prevLevel.requiredAccuracy;
}

function getStars(accuracy) {
  if (!accuracy && accuracy !== 0) return '';
  if (accuracy >= 90) return '⭐⭐⭐';
  if (accuracy >= 75) return '⭐⭐';
  return '⭐';
}

function lockedLevelFeedback() {
  // Pequeño shake visual en el card tocado — sin alert
}

function startLevel(levelId) {
  const level = LEVELS.find(l => l.id === levelId);
  if (!level) return;
  state.currentLevelId = levelId;
  startGame(level.noteIds, level.timeLimit, level.lives);
}

// ----------------------------------------------------------------
// 6. PANTALLA CONFIG (MODO LIBRE)
// ----------------------------------------------------------------

function renderConfigScreen() {
  syncToggle('clef-toggle', state.freeConfig.clef);
  syncToggle('type-toggle', state.freeConfig.noteType);
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
  const picker = document.getElementById('note-picker');

  picker.innerHTML = notes.map(note => {
    const selected   = selectedNoteIds.has(note.id);
    const clefSymbol = getClefSymbol(note.clef);
    const typeLabel  = note.type === 'line' ? '—' : '○';
    return `<div class="note-chip ${selected ? 'selected' : ''}"
                 onclick="toggleNote('${note.id}')"
                 title="${note.id}">
      ${note.name}
      <span class="chip-sub">${clefSymbol}${typeLabel}</span>
    </div>`;
  }).join('');
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
  } else {
    sel.add(noteId);
  }
  updateNotePicker();
}

function selectAllNotes() {
  const notes = getFilteredNotes(state.freeConfig.clef, state.freeConfig.noteType);
  state.freeConfig.selectedNoteIds = new Set(notes.map(n => n.id));
  updateNotePicker();
}

function clearAllNotes() {
  const notes = getFilteredNotes(state.freeConfig.clef, state.freeConfig.noteType);
  if (notes.length > 0) {
    state.freeConfig.selectedNoteIds = new Set([notes[0].id]);
  }
  updateNotePicker();
}

function startFreeGame() {
  const timeLimit = parseInt(document.getElementById('config-time').value);
  const lives     = parseInt(document.getElementById('config-lives').value);
  const noteIds   = [...state.freeConfig.selectedNoteIds];

  if (noteIds.length === 0) {
    alert('Selecciona al menos una nota para jugar.');
    return;
  }
  if (noteIds.length < 2) {
    // Con una sola nota no hay desafío, pero lo permitimos (práctica de reconocimiento)
  }

  state.currentLevelId = null;
  startGame(noteIds, timeLimit, lives);
}

// ----------------------------------------------------------------
// 7. LOOP DEL JUEGO
// ----------------------------------------------------------------

function startGame(noteIds, timeLimit, lives) {
  // Limpiar timer previo
  if (state.timerInterval) clearInterval(state.timerInterval);

  // Inicializar estado
  Object.assign(state, {
    activeNoteIds:  noteIds,
    timeLimit,
    livesCount:     lives,
    score:          0,
    combo:          0,
    maxCombo:       0,
    lives,
    timeRemaining:  timeLimit,
    totalAnswers:   0,
    correctAnswers: 0,
    startedAt:      Date.now(),
    lastDurationSeconds: 0,
    lastNotesPerSecond: 0,
    lastFluencyPercent: 0,
    gameActive:     true,
    answering:      false,
    lastNoteId:     null,
  });

  showScreen('game');
  updateHUD();
  document.getElementById('combo-display').classList.add('hidden');
  clearFeedback();

  if (timeLimit > 0) {
    startTimer();
  } else {
    document.getElementById('hud-time').textContent = '∞';
    document.getElementById('hud-time').classList.remove('time-warning');
  }

  newRound();
}

function newRound() {
  if (!state.gameActive) return;

  state.answering = false;
  clearFeedback();

  // Elegir nota evitando repetir la última
  let candidates = state.activeNoteIds.filter(id => id !== state.lastNoteId);
  if (candidates.length === 0) candidates = state.activeNoteIds;
  const noteId = candidates[Math.floor(Math.random() * candidates.length)];

  state.currentNote = getNoteById(noteId);
  state.lastNoteId  = noteId;

  renderStaff(state.currentNote, 'normal');
  renderAnswerButtons();
}

function renderAnswerButtons() {
  const container = document.getElementById('answer-buttons');
  container.innerHTML = NOTE_NAMES.map(name =>
    `<button class="answer-btn" onclick="checkAnswer('${name}')">${name}</button>`
  ).join('');
}

function checkAnswer(noteName) {
  if (!state.gameActive || state.answering) return;
  state.answering = true;
  state.totalAnswers++;

  disableAnswerButtons();

  const correct = noteName === state.currentNote.name;

  if (correct) {
    state.correctAnswers++;
    state.combo++;
    state.maxCombo = Math.max(state.maxCombo, state.combo);

    const mult = getMultiplier(state.combo);
    const pts  = 10 * mult;
    state.score += pts;

    showFeedback(`✅ ¡Correcto!  +${pts} pts`, 'correct');
    renderStaff(state.currentNote, 'correct');
    updateComboDisplay();
    updateHUD();
    playNote(state.currentNote.tone);
    animateStaffContainer('pulse');

    setTimeout(newRound, 650);

  } else {
    state.combo = 0;
    if (state.livesCount > 0) state.lives--;

    highlightAnswers(noteName, state.currentNote.name);
    showFeedback(`❌ Era ${state.currentNote.name}`, 'wrong');
    renderStaff(state.currentNote, 'wrong');
    updateComboDisplay();
    updateHUD();
    playError();
    animateStaffContainer('shake');

    if (state.livesCount > 0 && state.lives <= 0) {
      setTimeout(() => endGame('lives'), 1300);
    } else {
      setTimeout(newRound, 1300);
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
  const el     = document.getElementById('combo-display');
  const textEl = document.getElementById('combo-text');

  if (state.combo >= 3) {
    const mult = getMultiplier(state.combo);
    textEl.textContent = `🔥 Racha de ${state.combo}  ×${mult}`;
    el.classList.remove('hidden');
    // Retrigger animation
    el.style.animation = 'none';
    void el.offsetHeight;
    el.style.animation = 'comboPop .3s cubic-bezier(.34,1.56,.64,1)';
  } else {
    el.classList.add('hidden');
  }
}

function highlightAnswers(wrong, correct) {
  document.querySelectorAll('.answer-btn').forEach(btn => {
    if (btn.textContent === wrong)   btn.classList.add('wrong-answer');
    if (btn.textContent === correct) btn.classList.add('correct-answer');
  });
}

function disableAnswerButtons() {
  document.querySelectorAll('.answer-btn').forEach(btn => btn.disabled = true);
}

function showFeedback(msg, type) {
  const el = document.getElementById('feedback-msg');
  el.textContent = msg;
  el.className = `feedback-msg ${type}`;
}

function clearFeedback() {
  const el = document.getElementById('feedback-msg');
  el.textContent = '';
  el.className   = 'feedback-msg';
}

function updateHUD() {
  document.getElementById('hud-score').textContent = state.score;

  const livesEl = document.getElementById('hud-lives');
  if (state.livesCount === 0) {
    livesEl.textContent = '∞';
  } else {
    const filled = Math.max(0, state.lives);
    const empty  = Math.max(0, state.livesCount - filled);
    livesEl.textContent = '❤️'.repeat(filled) + (empty > 0 ? '🖤'.repeat(empty) : '');
  }
}

function animateStaffContainer(cls) {
  const el = document.getElementById('staff-container');
  el.classList.remove('shake', 'pulse');
  void el.offsetHeight;
  el.classList.add(cls);
  setTimeout(() => el.classList.remove(cls), 500);
}

// ----------------------------------------------------------------
// 8. CRONÓMETRO
// ----------------------------------------------------------------

function startTimer() {
  const timeEl = document.getElementById('hud-time');
  timeEl.textContent = formatTime(state.timeRemaining);
  timeEl.classList.remove('time-warning');

  state.timerInterval = setInterval(() => {
    if (!state.gameActive) { clearInterval(state.timerInterval); return; }
    state.timeRemaining--;
    timeEl.textContent = formatTime(state.timeRemaining);

    if (state.timeRemaining <= 10) timeEl.classList.add('time-warning');
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
  clearInterval(state.timerInterval);

  const accuracy = state.totalAnswers > 0
    ? Math.round((state.correctAnswers / state.totalAnswers) * 100)
    : 0;

  const performance = calculateReadingBenchmark();

  if (reason === 'lives') playGameOver();
  else                    playVictory();

  if (state.currentLevelId) {
    saveProgress(state.currentLevelId, state.score, accuracy);
  }
  saveRecord({
    score:    state.score,
    accuracy,
    levelId:  state.currentLevelId,
    correct:  state.correctAnswers,
    total:    state.totalAnswers,
    speedNps: performance.notesPerSecond,
    fluencyPercent: performance.fluencyPercent,
    durationSeconds: performance.elapsedSeconds,
    date:     new Date().toLocaleDateString('es-CO'),
  });

  setTimeout(() => showResults(reason, accuracy), 700);
}

function calculateReadingBenchmark() {
  const startedAt = state.startedAt || Date.now();
  const elapsedSeconds = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
  const notesPerSecond = state.correctAnswers > 0
    ? state.correctAnswers / elapsedSeconds
    : 0;
  const fluencyPercent = Math.round((notesPerSecond / FLUENCY_GOAL_NOTES_PER_SECOND) * 100);

  state.lastDurationSeconds = elapsedSeconds;
  state.lastNotesPerSecond  = notesPerSecond;
  state.lastFluencyPercent      = fluencyPercent;

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

function showResults(reason, accuracy) {
  let emoji = '🎉', title = '¡Bien hecho!';
  if (reason === 'lives')   { emoji = '💔'; title = '¡Se acabaron las vidas!'; }
  else if (accuracy >= 95)  { emoji = '🏆'; title = '¡Increíble!'; }
  else if (accuracy >= 85)  { emoji = '⭐'; title = '¡Excelente!'; }
  else if (accuracy >= 70)  { emoji = '🎵'; title = '¡Muy bien!'; }
  else if (accuracy < 50)   { emoji = '💪'; title = '¡Sigue practicando!'; }

  document.getElementById('results-emoji').textContent    = emoji;
  document.getElementById('results-title').textContent    = title;
  document.getElementById('res-score').textContent        = state.score;
  document.getElementById('res-accuracy').textContent     = `${accuracy}%`;
  document.getElementById('res-combo').textContent        = `×${state.maxCombo}`;
  document.getElementById('res-answers').textContent      = `${state.correctAnswers}/${state.totalAnswers}`;
  document.getElementById('res-speed').textContent        = formatNotesPerSecond(state.lastNotesPerSecond);

  const proEl = document.getElementById('pro-comparison');
  proEl.innerHTML = `
    <div class="pro-badge">${state.lastFluencyPercent}% de la meta de fluidez</div>
    <p>${getBenchmarkMessage(state.lastFluencyPercent, state.lastNotesPerSecond)}</p>
    <small>Meta del juego: leer 1 nota correcta por segundo. Es una meta sencilla y clara para ver tu avance. Con la práctica podrás leer cada vez más rápido.</small>
  `;

  // Mensaje de desbloqueo
  const unlockEl = document.getElementById('level-unlock-msg');
  if (state.currentLevelId) {
    const level     = LEVELS.find(l => l.id === state.currentLevelId);
    const nextLevel = LEVELS.find(l => l.id === state.currentLevelId + 1);
    if (nextLevel && accuracy >= level.requiredAccuracy) {
      unlockEl.innerHTML = `🔓 ¡Desbloqueaste el Nivel ${nextLevel.id}: <b>${nextLevel.name}</b>!`;
      unlockEl.classList.remove('hidden');
    } else if (state.currentLevelId && accuracy < level.requiredAccuracy) {
      unlockEl.innerHTML = `Necesitas ${level.requiredAccuracy}% para desbloquear el siguiente nivel. ¡Casi!`;
      unlockEl.style.borderColor = 'var(--accent)';
      unlockEl.style.color       = 'var(--accent)';
      unlockEl.style.background  = 'rgba(255,209,102,.08)';
      unlockEl.classList.remove('hidden');
    } else {
      unlockEl.classList.add('hidden');
    }
  } else {
    unlockEl.classList.add('hidden');
  }

  showScreen('results');
}

function playAgain() {
  if (state.currentLevelId) {
    startLevel(state.currentLevelId);
  } else {
    // Leer los valores actuales del formulario de config
    const timeLimit = parseInt(document.getElementById('config-time').value);
    const lives     = parseInt(document.getElementById('config-lives').value);
    const noteIds   = [...state.freeConfig.selectedNoteIds];
    startGame(noteIds, timeLimit, lives);
  }
}

function confirmQuit() {
  if (confirm('¿Seguro que quieres salir del juego?')) {
    clearInterval(state.timerInterval);
    state.gameActive = false;
    showScreen('mode');
  }
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

const BASS_CLEF_SVG = { symbol: '&#x1D122;', x: 82, y: 150, fontSize: 140 };
const ALTO_CLEF_SVG = { symbol: '&#x1D121;', x: 86, y: 132, fontSize: 108 };

function posToY(staffPos) {
  return 135 - staffPos * 10;
}

function renderStaff(note, noteState) {
  document.getElementById('staff-svg').innerHTML = buildStaffSVG(note, noteState);
}

function buildStaffSVG(note, noteState) {
  const staffLeft  = 82;
  const staffRight = 510;
  let   html       = '';

  // ── Líneas del pentagrama ──────────────────────────────────────
  SVG_LINE_YS.forEach(y => {
    html += `<line x1="${staffLeft}" y1="${y}" x2="${staffRight}" y2="${y}"
      stroke="#2a2a2a" stroke-width="1.5"/>`;
  });

  // ── Símbolo de clave ───────────────────────────────────────────
  // Fuente con soporte de símbolos musicales (Unicode U+1D11E y U+1D122)
  const musicFont = `'Segoe UI Symbol', 'Apple Symbols', 'Noto Music', FreeSerif, serif`;

  if (note.clef === 'treble') {
    // 𝄞 (U+1D11E) — el rizo G queda en la 2ª línea (y≈115)
    html += `<text x="86" y="130"
      font-size="106" font-family="${musicFont}"
      fill="#222222" style="line-height:1">&#x1D11E;</text>`;
  } else if (note.clef === 'bass') {
    // 𝄢 (U+1D122) — los puntos quedan entre líneas 3 y 4 (y≈65-75)
    html += `<text x="${BASS_CLEF_SVG.x}" y="${BASS_CLEF_SVG.y}"
      font-size="${BASS_CLEF_SVG.fontSize}" font-family="${musicFont}"
      fill="#222222" style="line-height:1">${BASS_CLEF_SVG.symbol}</text>`;
  } else if (note.clef === 'alto') {
    // 𝄡 (U+1D121) — clave de Do en 3ª línea: la línea central es Do4.
    html += `<text x="${ALTO_CLEF_SVG.x}" y="${ALTO_CLEF_SVG.y}"
      font-size="${ALTO_CLEF_SVG.fontSize}" font-family="${musicFont}"
      fill="#222222" style="line-height:1">${ALTO_CLEF_SVG.symbol}</text>`;
    html += `<circle cx="132" cy="95" r="4" fill="#222222" opacity=".75"/>`;
  }

  // ── Nota ───────────────────────────────────────────────────────
  const noteY  = posToY(note.staffPos);
  const stemUp = note.staffPos < 4;  // debajo de la línea central: plica arriba

  const colors = {
    normal:  '#1a1830',
    correct: '#06D6A0',
    wrong:   '#EF476F',
  };
  const fill = colors[noteState] || colors.normal;

  // Cabeza de nota (elipse inclinada -15°)
  html += `<ellipse
    cx="${SVG_NOTE_X}" cy="${noteY}"
    rx="12.5" ry="9"
    transform="rotate(-15 ${SVG_NOTE_X} ${noteY})"
    fill="${fill}"/>`;

  // Plica (stem)
  const stemX    = stemUp ? SVG_NOTE_X + 11 : SVG_NOTE_X - 11;
  const stemEndY = stemUp ? noteY - 56 : noteY + 56;
  html += `<line
    x1="${stemX}" y1="${noteY}"
    x2="${stemX}" y2="${stemEndY}"
    stroke="${fill}" stroke-width="2"/>`;

  // Líneas adicionales si la nota estuviera fuera del pentagrama
  // (No aplica para las 9 posiciones actuales, pero se deja preparado)
  if (note.staffPos < 0) {
    for (let sp = -2; sp >= note.staffPos; sp -= 2) {
      const ly = posToY(sp);
      html += `<line x1="${SVG_NOTE_X-16}" y1="${ly}" x2="${SVG_NOTE_X+16}" y2="${ly}"
        stroke="#2a2a2a" stroke-width="1.5"/>`;
    }
  }
  if (note.staffPos > 8) {
    for (let sp = 10; sp <= note.staffPos; sp += 2) {
      const ly = posToY(sp);
      html += `<line x1="${SVG_NOTE_X-16}" y1="${ly}" x2="${SVG_NOTE_X+16}" y2="${ly}"
        stroke="#2a2a2a" stroke-width="1.5"/>`;
    }
  }

  return html;
}

// ----------------------------------------------------------------
// 11. AUDIO (Tone.js)
// ----------------------------------------------------------------

// Instrumentos: una voz "piano" cálida para las notas, una voz de coro para
// acordes de premio y un ruido suave para el error. Se crean perezosamente.
let _piano = null, _pad = null, _reverb = null, _audioReady = false;

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
  if (_audioReady) return;
  try {
    await Tone.start();
    buildAudio();
    _audioReady = true;
  } catch (_) {}
}

function playNote(tone) {
  if (!_audioReady) { unlockAudio().then(() => _piano && _piano.triggerAttackRelease(tone, '4n')); return; }
  try { _piano.triggerAttackRelease(tone, '4n'); } catch (_) {}
}

// Sonido de error: dos notas graves disonantes y cortas, claras pero no agresivas.
function playError() {
  unlockAudio().then(() => {
    if (!_audioReady) return;
    try {
      _piano.triggerAttackRelease(['F#3', 'G3'], '16n');
    } catch (_) {}
  });
}

function playGameOver() {
  unlockAudio().then(() => {
    if (!_audioReady) return;
    try {
      ['D4', 'B3', 'G3', 'D3'].forEach((n, i) =>
        setTimeout(() => _piano.triggerAttackRelease(n, '4n'), i * 220)
      );
    } catch (_) {}
  });
}

function playVictory() {
  unlockAudio().then(() => {
    if (!_audioReady) return;
    try {
      // Arpegio ascendente + acorde mayor final = sensación de logro.
      ['C5', 'E5', 'G5', 'C6'].forEach((n, i) =>
        setTimeout(() => _piano.triggerAttackRelease(n, '8n'), i * 120)
      );
      setTimeout(() => _pad.triggerAttackRelease(['C5', 'E5', 'G5'], '2n'), 520);
    } catch (_) {}
  });
}

// ----------------------------------------------------------------
// 12. ALMACENAMIENTO (localStorage)
// ----------------------------------------------------------------

const STORAGE_PROGRESS = 'musinotas_progress_v2';
const STORAGE_RECORDS  = 'musinotas_records_v2';

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_PROGRESS) || '{}'); }
  catch (_) { return {}; }
}

function saveProgress(levelId, score, accuracy) {
  const data = loadProgress();
  const prev = data[levelId] || { bestScore: 0, bestAccuracy: 0 };
  data[levelId] = {
    bestScore:    Math.max(prev.bestScore, score),
    bestAccuracy: Math.max(prev.bestAccuracy, accuracy),
  };
  localStorage.setItem(STORAGE_PROGRESS, JSON.stringify(data));
}

function saveRecord(entry) {
  try {
    const records = loadRawRecords();
    records.push(entry);
    records.sort((a, b) => b.score - a.score);
    records.splice(15); // máximo 15 récords
    localStorage.setItem(STORAGE_RECORDS, JSON.stringify(records));
  } catch (_) {}
}

function loadRawRecords() {
  try { return JSON.parse(localStorage.getItem(STORAGE_RECORDS) || '[]'); }
  catch (_) { return []; }
}

function renderRecords() {
  const records = loadRawRecords();
  const list    = document.getElementById('records-list');

  if (records.length === 0) {
    list.innerHTML = `<p style="color:var(--text2);text-align:center;padding:40px 0">
      Aún no hay récords. ¡Ve a jugar! 🎵</p>`;
    return;
  }

  const medals = ['🥇','🥈','🥉'];
  list.innerHTML = records.map((r, i) => {
    const levelName = r.levelId
      ? (LEVELS.find(l => l.id === r.levelId)?.name || `Nivel ${r.levelId}`)
      : 'Modo Libre';
    const medal = medals[i] || `${i+1}.`;
    return `<div class="record-item">
      <div class="record-left">
        <div class="record-name">${medal} ${levelName}</div>
        <div class="record-sub">${r.date} · ${r.accuracy}% precisión · ${r.correct}/${r.total}${r.speedNps ? ` · ${formatNotesPerSecond(r.speedNps)} notas/s` : ''}</div>
      </div>
      <div class="record-score">${r.score} pts</div>
    </div>`;
  }).join('');
}

function clearRecords() {
  if (confirm('¿Borrar todos los récords y el progreso? No se puede deshacer.')) {
    localStorage.removeItem(STORAGE_RECORDS);
    localStorage.removeItem(STORAGE_PROGRESS);
    renderRecords();
  }
}

// ----------------------------------------------------------------
// 13. INIT
// ----------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  showScreen('home');
  // Desbloquear el audio en el primer toque/click en cualquier parte.
  const unlock = () => { unlockAudio(); };
  document.addEventListener('pointerdown', unlock, { once: true });
  document.addEventListener('keydown', unlock, { once: true });
});
