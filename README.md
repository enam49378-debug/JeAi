# JcAi 🤖✨

Plataforma de personajes IA — similar a Character.AI pero tuya.

## Archivos

| Archivo | Descripción |
|---|---|
| `index.html` | Página principal con lista de personajes |
| `chat.html` | Pantalla de chat con el personaje |
| `style.css` | Estilos globales |
| `characters.js` | Lógica de almacenamiento y datos |

## Cómo usar

1. Abre `index.html` en el navegador
2. Los personajes por defecto ya están listos (Luna, Rex, Aria)
3. Haz click en un personaje para chatear
4. Crea tus propios personajes con el botón **"+ Nuevo personaje"**

## Memoria

- Guarda entre **35 y 50 mensajes** por personaje en `localStorage`
- Los mensajes más antiguos se borran automáticamente al superar el límite
- Puedes limpiar el historial desde la pantalla de chat

## API Key

El proyecto usa la API de Anthropic (Claude). El navegador la toma automáticamente del entorno de Claude.ai si se abre desde ahí.

Si lo usas de forma independiente, necesitarás agregar tu API key en `chat.html` en los headers de la petición.
