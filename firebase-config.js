// ════════════════════════════════════════════════════════════
//  CONFIGURACIÓN DE FIREBASE — JcAi
// ════════════════════════════════════════════════════════════
//
//  PASOS PARA CONFIGURAR:
//
//  1. Ve a https://console.firebase.google.com
//  2. Crea un nuevo proyecto (ej: "jcai-app")
//  3. Click en el ícono </> para agregar una app Web
//  4. Copia la configuración que te da Firebase aquí abajo
//
//  5. En Firebase Console → Authentication → Sign-in method:
//     ✓ Habilita "Google"
//     ✓ Habilita "Correo electrónico/contraseña"
//
//  6. En Firebase Console → Firestore Database:
//     → Crear base de datos → Modo de producción
//     → En la pestaña "Reglas", pega esto:
//
//     rules_version = '2';
//     service cloud.firestore {
//       match /databases/{database}/documents {
//         match /users/{uid}/{document=**} {
//           allow read, write: if request.auth != null
//                              && request.auth.uid == uid;
//         }
//       }
//     }
//
// ════════════════════════════════════════════════════════════

const firebaseConfig = {
  apiKey:            "AIzaSyBPdlwhC7VZRgREOGIQbygXDXDpK5ZAowY",
  authDomain:        "jcai-ad008.firebaseapp.com",
  projectId:         "jcai-ad008",
  storageBucket:     "jcai-ad008.firebasestorage.app",
  messagingSenderId: "961245994075",
  appId:             "1:961245994075:web:126f1e818843e54630f37e"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db   = firebase.firestore();
