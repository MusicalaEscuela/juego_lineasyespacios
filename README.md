# juego_lineasyespacios

**Musinotas** — Juego para aprender a leer el pentagrama (líneas y espacios) en claves de Sol, Fa y Do.

Sitio estático (HTML + CSS + JS, con [Tone.js](https://tonejs.github.io/) para el audio). Se publica con GitHub Pages desde la rama `main`.

## Archivos
- `index.html` — estructura y pantallas.
- `styles.css` — estilos.
- `script.js` — lógica del juego, niveles, audio y pentagrama.
- `version.txt` — número de versión que dispara la auto-actualización.
- `logo.png` — logo de Musicala.
- `manifest.webmanifest`, `icons/` — datos e íconos para instalar el juego como app (PWA).
- `sw.js` — service worker: permite instalar la app y jugar sin conexión. Usa "red primero",
  así que **no hay que tocarlo al publicar** y la auto-actualización sigue funcionando igual.
- `apk/` — proyecto Android (Capacitor) para generar el APK instalable. Ver más abajo.

## Instalar como app

**Desde el navegador (lo más fácil):** abre el juego en Chrome en el celular y toca
**«📲 Instalar la app»** en la pantalla de inicio (o menú ⋮ → *Agregar a pantalla principal*).
En iPhone: Safari → Compartir → *Agregar a inicio*.

**Como APK (Android):** el APK es una "cáscara" que abre el juego publicado en GitHub Pages
(`server.url` en `apk/capacitor.config.json`). Por eso **se actualiza solo** cada vez que se
publica la web: no hay que volver a compilar ni reenviar el APK. La primera vez necesita
internet; después funciona sin conexión.

Para generar el APK (requiere Node 20+, JDK 21 y Android Studio/SDK):
```bash
cd apk
npm install
npm run build
```
El archivo queda en `apk/dist/musinotas.apk`. Solo hay que recompilarlo si cambia el ícono,
el nombre de la app o la dirección web del juego (en ese caso sube también `versionCode` en
`apk/android/app/build.gradle`). Los íconos se regeneran con `python make-android-icons.py`.

⚠️ **Llave de firma:** `apk/signing/` (ignorada por git) contiene la llave con la que se firma
el APK. Guarda una copia en un lugar seguro: sin ella no se podrá publicar una actualización
del APK que se instale encima de la versión anterior.

## ⚠️ AL PUBLICAR CAMBIOS: subir la versión (OBLIGATORIO)

El juego tiene **auto-actualización**: cuando una persona vuelve a abrir la app o regresa a
la pestaña, compara su versión con `version.txt` y, si hay una nueva, **recarga sola** (sin
`Ctrl+F5`). Esto solo funciona si el número de versión se sube en **cada** publicación.

En cada cambio que se vaya a publicar, actualizar el número de versión (formato `AAAAMMDD`,
o `AAAAMMDD-2` si hay más de una publicación el mismo día) en **estos 3 lugares**, que deben
quedar siempre con el **mismo valor**:

1. `index.html` → `window.APP_VERSION = 'AAAAMMDD';`
2. `index.html` → los parámetros `?v=AAAAMMDD` de `styles.css` y `script.js`.
3. `version.txt` → el mismo número, solo.

Si los tres no coinciden, la recarga automática no funcionará bien.

## Publicar
```bash
git add -A
git commit -m "Descripción del cambio"
git push origin main
```
GitHub Pages reconstruye en 1–2 minutos. Gracias a la auto-actualización, las usuarias
reciben la versión nueva sin hacer nada.
