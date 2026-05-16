# JcAi 🤖✨

Plataforma de personajes IA — similar a Character.AI pero tuya.

🔗 **Demo en vivo:** https://enam49378-debug.github.io/JeAi/

---

## Archivos

| Archivo | Descripción |
|---|---|
| `index.html` | Página principal con lista de personajes |
| `chat.html` | Pantalla de chat con el personaje |
| `profile.html` | Perfil y configuración de cuenta |
| `style.css` | Estilos globales |
| `characters.js` | Lógica de almacenamiento (Firestore) |
| `firebase-config.js` | Configuración de Firebase |
| `auth.js` | Autenticación (Google + Email) |

---

## Modos de chat

Cada personaje puede usarse en 3 modos distintos:

| Modo | Descripción |
|---|---|
| ⚡ **Rápido** | Respuestas cortas y directas. Puede cometer pequeños errores. Ideal para conversación casual. |
| 🧠 **Reflexivo** | Analiza la pregunta antes de responder. Respuestas más completas y elaboradas. |
| ✨ **Élite** | Máxima coherencia y detalle. Recuerda el contexto, respeta cada matiz del personaje. Como hablar con ChatGPT-4. |

El modo se selecciona dentro de cada chat y se guarda por personaje.

---

## Autenticación

- Login con **Google** (un clic)
- Login con **Correo + contraseña**
- Los personajes e historial se sincronizan entre dispositivos via **Firestore**
- Las API keys se guardan solo en el navegador (nunca en la nube)

---

## Configuración

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com)
2. Habilita Authentication → Google y Correo/contraseña
3. Crea una base de datos Firestore
4. Rellena `firebase-config.js` con tus credenciales
5. Agrega tu dominio en Authentication → Configuración → Dominios autorizados

---

## API Keys soportadas

El sistema intenta las APIs en este orden hasta que una funcione:

1. **OpenRouter** — Acceso a muchos modelos gratuitos (recomendado)
2. **Groq** — Ultra rápido, gratis
3. **Mistral** — Buena calidad, gratis
4. **Gemini** — De Google, gratis con límites

---

*Desarrollado con Firebase + Vanilla JS*
