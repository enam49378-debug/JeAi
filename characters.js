// ════════════════════════════════════════════════════════════
//  CHARACTERS.JS — Almacenamiento en Firestore (JcAi)
// ════════════════════════════════════════════════════════════

const MAX_MEMORY = 40; // mensajes guardados por personaje

// ─── PERSONAJES POR DEFECTO ──────────────────────────────
function getDefaultCharacters() {
  return [
    {
      id: 'luna',
      name: 'Luna',
      emoji: '🌙',
      description: 'Una filósofa tranquila que habla con poesía y reflexión profunda.',
      tag: 'Filosófica',
      personality: 'Eres Luna, una filósofa tranquila y contemplativa. Hablas con calma, usas metáforas poéticas y reflexiones profundas. Amas la luna, las estrellas y los misterios del universo. Respondes de forma cálida pero con profundidad intelectual. Nunca eres brusca ni fría.',
      greeting: 'Hola, viajero... ¿qué pensamientos te traen hasta aquí esta noche? 🌙',
      createdAt: 1
    },
    {
      id: 'rex',
      name: 'Rex',
      emoji: '🔥',
      description: 'Un entrenador motivacional enérgico y directo al grano.',
      tag: 'Motivacional',
      personality: 'Eres Rex, un entrenador motivacional muy enérgico y directo. Hablas con mucha energía, usas frases cortas y poderosas, te emocionas con el progreso del usuario. Amas el esfuerzo, la disciplina y superar límites. A veces usas signos de exclamación y palabras de aliento.',
      greeting: '¡Oye! ¡Me alegra que estés aquí! ¿Listo para romper tus límites hoy? 🔥',
      createdAt: 2
    },
    {
      id: 'aria',
      name: 'Aria',
      emoji: '🤖',
      description: 'Una IA curiosa que hace preguntas interesantes sobre todo.',
      tag: 'Curiosa',
      personality: 'Eres Aria, una IA muy curiosa e inteligente. Te fascina todo lo que el usuario dice y siempre haces preguntas interesantes de vuelta. Piensas de forma lógica pero con calidez. Te gusta explorar ideas desde ángulos inesperados y desafiar suposiciones de forma amable.',
      greeting: 'Hola, humano interesante 👀 Tengo mil preguntas. ¿Por dónde empezamos?',
      createdAt: 3
    }
  ];
}

// ─── REF HELPERS ─────────────────────────────────────────
function charsRef(uid)         { return db.collection('users').doc(uid).collection('characters'); }
function historyRef(uid)       { return db.collection('users').doc(uid).collection('history'); }
function charRef(uid, charId)  { return charsRef(uid).doc(charId); }
function histRef(uid, charId)  { return historyRef(uid).doc(charId); }

// ─── CARGAR PERSONAJES ───────────────────────────────────
async function loadCharacters(uid) {
  const snap = await charsRef(uid).get();

  if (snap.empty) {
    // Primera vez: crear personajes por defecto
    const defaults = getDefaultCharacters();
    const batch = db.batch();
    defaults.forEach(c => batch.set(charRef(uid, c.id), c));
    await batch.commit();
    return defaults;
  }

  return snap.docs
    .map(d => d.data())
    .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
}

// ─── GUARDAR UN PERSONAJE ────────────────────────────────
async function saveCharacter(uid, char) {
  await charRef(uid, char.id).set(char, { merge: true });
}

// ─── ELIMINAR PERSONAJE ──────────────────────────────────
async function deleteCharacter(uid, charId) {
  await charRef(uid, charId).delete();
  await clearHistory(uid, charId);
}

// ─── HISTORIAL ───────────────────────────────────────────
async function loadHistory(uid, charId) {
  const doc = await histRef(uid, charId).get();
  return doc.exists ? (doc.data().messages || []) : [];
}

async function saveHistory(uid, charId, messages) {
  const trimmed = messages.slice(-MAX_MEMORY);
  await histRef(uid, charId).set({ messages: trimmed });
}

async function clearHistory(uid, charId) {
  await histRef(uid, charId).delete();
}

// ─── UTIL ────────────────────────────────────────────────
function generateId() {
  return 'char_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
}

// ─── BOTS COMPARTIDOS ────────────────────────────────────
// Guardamos en users/{uid}/sharedChars/{ownerUid_charId} → { ownerUid, charId, addedAt }
function sharedRef(uid) { return db.collection('users').doc(uid).collection('sharedChars'); }

async function addSharedChar(myUid, ownerUid, charId) {
  // Load the character from the owner's collection to cache its data
  const snap = await charRef(ownerUid, charId).get();
  if (!snap.exists) throw new Error('Personaje no encontrado');
  const charData = snap.data();
  // Save reference + cached data under the recipient's account
  const docId = ownerUid + '__' + charId;
  await sharedRef(myUid).doc(docId).set({
    ownerUid, charId, addedAt: Date.now(),
    // Cache basic display fields so it shows even if owner deletes
    name:        charData.name        || '',
    description: charData.description || charData.slogan || '',
    emoji:       charData.emoji       || '🤖',
    imageUrl:    charData.imageUrl    || '',
    tag:         charData.tag         || '',
  });
}

async function loadSharedChars(uid) {
  const snap = await sharedRef(uid).orderBy('addedAt', 'desc').get();
  return snap.docs.map(d => d.data());
}
