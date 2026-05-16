// ─── STORAGE ───────────────────────────────────────────────
const STORAGE_KEY = 'jcai_characters';
const HISTORY_PREFIX = 'jcai_history_';
const MAX_MEMORY = 40; // mensajes guardados (entre 35-50)

function saveCharacters(chars) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chars));
}

function loadCharacters() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) return JSON.parse(raw);
  // Personajes por defecto
  return [
    {
      id: 'luna',
      name: 'Luna',
      emoji: '🌙',
      description: 'Una filósofa tranquila que habla con poesía y reflexión profunda.',
      tag: 'Filosófica',
      personality: 'Eres Luna, una filósofa tranquila y contemplativa. Hablas con calma, usas metáforas poéticas y reflexiones profundas. Amas la luna, las estrellas y los misterios del universo. Respondes de forma cálida pero con profundidad intelectual. Nunca eres brusca ni fría.',
      greeting: 'Hola, viajero... ¿qué pensamientos te traen hasta aquí esta noche? 🌙'
    },
    {
      id: 'rex',
      name: 'Rex',
      emoji: '🔥',
      description: 'Un entrenador motivacional enérgico y directo al grano.',
      tag: 'Motivacional',
      personality: 'Eres Rex, un entrenador motivacional muy enérgico y directo. Hablas con mucha energía, usas frases cortas y poderosas, te emocionas con el progreso del usuario. Amas el esfuerzo, la disciplina y superar límites. A veces usas signos de exclamación y palabras de aliento.',
      greeting: '¡Oye! ¡Me alegra que estés aquí! ¿Listo para romper tus límites hoy? 🔥'
    },
    {
      id: 'aria',
      name: 'Aria',
      emoji: '🤖',
      description: 'Una IA curiosa que hace preguntas interesantes sobre todo.',
      tag: 'Curiosa',
      personality: 'Eres Aria, una IA muy curiosa e inteligente. Te fascina todo lo que el usuario dice y siempre haces preguntas interesantes de vuelta. Piensas de forma lógica pero con calidez. Te gusta explorar ideas desde ángulos inesperados y desafiar suposiciones de forma amable.',
      greeting: 'Hola, humano interesante 👀 Tengo mil preguntas. ¿Por dónde empezamos?'
    }
  ];
}

function saveHistory(charId, messages) {
  // Guardar solo los últimos MAX_MEMORY mensajes
  const trimmed = messages.slice(-MAX_MEMORY);
  localStorage.setItem(HISTORY_PREFIX + charId, JSON.stringify(trimmed));
}

function loadHistory(charId) {
  const raw = localStorage.getItem(HISTORY_PREFIX + charId);
  return raw ? JSON.parse(raw) : [];
}

function clearHistory(charId) {
  localStorage.removeItem(HISTORY_PREFIX + charId);
}

function deleteCharacter(charId) {
  const chars = loadCharacters().filter(c => c.id !== charId);
  saveCharacters(chars);
  clearHistory(charId);
}

function generateId() {
  return 'char_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
}
