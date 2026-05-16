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
  apiKey:            "TU_API_KEY",
  authDomain:        "tu-proyecto.firebaseapp.com",
  projectId:         "tu-proyecto-id",
  storageBucket:     "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456789:web:abcdef123456"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db   = firebase.firestore();
