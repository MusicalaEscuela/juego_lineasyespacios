# juego_lineasyespacios

**Musinotas** — Juego para aprender a leer el pentagrama (líneas y espacios) en claves de Sol, Fa y Do.

Sitio estático (HTML + CSS + JS, con [Tone.js](https://tonejs.github.io/) para el audio). Se publica con GitHub Pages desde la rama `main`.

## Archivos
- `index.html` — estructura y pantallas.
- `styles.css` — estilos.
- `script.js` — lógica del juego, niveles, audio y pentagrama.
- `version.txt` — número de versión que dispara la auto-actualización.
- `logo.png` — logo de Musicala.

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
