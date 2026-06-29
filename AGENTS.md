# Instrucciones para agentes (Claude Code, Codex, etc.)

Proyecto: **Musinotas**, sitio estático publicado con GitHub Pages desde `main`.

## REGLA OBLIGATORIA AL PUBLICAR: subir el número de versión

Este sitio tiene auto-actualización: el navegador compara la versión local contra
`version.txt` y recarga solo si cambió. **Si modificas `index.html`, `styles.css` o
`script.js` y vas a publicar (push a `main`), DEBES subir el número de versión** en los
3 lugares siguientes, todos con el **mismo valor** (formato `AAAAMMDD`, o `AAAAMMDD-2`,
`-3`… si hay varias publicaciones el mismo día):

1. `index.html` → `window.APP_VERSION = 'AAAAMMDD';`
2. `index.html` → `?v=AAAAMMDD` en las etiquetas `<link href="styles.css?v=...">` y `<script src="script.js?v=...">`.
3. `version.txt` → solo el número.

Hazlo **sin que el usuario lo pida**: es parte de publicar. Si los tres valores no
coinciden, la recarga automática para las usuarias se rompe.

## Idioma / tono
Todo el texto visible es para **estudiantes**: segunda persona, claro y motivador. No
incluir comentarios meta como "para no enredar a los estudiantes" ni bromas fuera de tono.
