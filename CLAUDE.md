Ver AGENTS.md — contiene las instrucciones para agentes de este proyecto.

Lo más importante: **al publicar cambios (push a `main`), sube el número de versión**
(formato `AAAAMMDD`) en los 3 lugares, todos con el mismo valor, sin que el usuario lo pida:
1. `index.html` → `window.APP_VERSION`
2. `index.html` → `?v=` de `styles.css` y `script.js`
3. `version.txt`

Esto mantiene viva la auto-actualización que recarga el juego a las usuarias sin `Ctrl+F5`.
